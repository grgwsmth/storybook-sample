/**
 * Token Loader - Parses and resolves W3C Design Tokens from JSON files
 * 
 * This module loads all token JSON files, merges them, and resolves references
 * to create a unified token system accessible in components.
 */

// Import all token JSON files
import colorStylesTokens from './color.styles.tokens.json';
import effectStylesTokens from './effect.styles.tokens.json';
import gridStylesTokens from './grid.styles.tokens.json';
import textStylesTokens from './text.styles.tokens.json';
import walmartTokens from './LD Design Tokens.Walmart.tokens.json';
import samsClubTokens from './LD Design Tokens.Sam\'s Club.tokens.json';
import walmartLegacyTokens from './LD Design Tokens.Walmart Legacy.tokens.json';
import bodegaTokens from './LD Design Tokens.Bodega.tokens.json';
import scale0to899Tokens from './LD Scale.0-899px.tokens.json';
import scale900PlusTokens from './LD Scale.900px+.tokens.json';
import scale0to899MegaTokens from './LD Scale.0-899px (Mega).tokens.json';
import scale900PlusMegaTokens from './LD Scale.900px+ (Mega).tokens.json';

type TokenValue = string | number | object | Array<any>;

/**
 * Deep merge multiple objects, with later objects taking precedence
 */
function deepMerge(...objects: any[]): any {
	const result: any = {};

	for (const obj of objects) {
		if (!obj || typeof obj !== 'object') continue;

		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (
					typeof obj[key] === 'object' &&
					!Array.isArray(obj[key]) &&
					obj[key] !== null &&
					!obj[key].$type && // Don't merge token objects
					result[key] &&
					typeof result[key] === 'object' &&
					!Array.isArray(result[key]) &&
					result[key] !== null &&
					!result[key].$type
				) {
					result[key] = deepMerge(result[key], obj[key]);
				} else {
					result[key] = obj[key];
				}
			}
		}
	}

	return result;
}

/**
 * Flatten a nested object into a path-based map
 * Example: { ld: { primitive: { color: { blue: { 5: "#f0f5ff" } } } } }
 * becomes: { "ld.primitive.color.blue.5": "#f0f5ff" }
 */
function flattenTokens(obj: any, prefix = '', result: Record<string, any> = {}): Record<string, any> {
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const path = prefix ? `${prefix}.${key}` : key;
			const value = obj[key];

			if (value && typeof value === 'object' && !Array.isArray(value) && !value.$type && !value.$value) {
				flattenTokens(value, path, result);
			} else {
				result[path] = value;
			}
		}
	}
	return result;
}

/**
 * Resolve token references in the format {token.path}
 */
function resolveReferences(
	value: TokenValue,
	flatTokens: Record<string, any>,
	resolved: Set<string> = new Set()
): TokenValue {
	if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
		const refPath = value.slice(1, -1);
		
		// Prevent circular references
		if (resolved.has(refPath)) {
			console.warn(`Circular reference detected: ${refPath}`);
			return value;
		}

		if (flatTokens[refPath]) {
			resolved.add(refPath);
			const resolvedValue = resolveReferences(flatTokens[refPath], flatTokens, resolved);
			resolved.delete(refPath);
			return resolvedValue;
		} else {
			console.warn(`Token reference not found: ${refPath}`);
			return value;
		}
	}

	if (typeof value === 'object' && value !== null) {
		if (Array.isArray(value)) {
			return value.map(item => resolveReferences(item, flatTokens, resolved));
		} else {
			const resolvedObj: Record<string, any> = {};
			for (const key in value) {
				if (value.hasOwnProperty(key)) {
					resolvedObj[key] = resolveReferences(value[key], flatTokens, resolved);
				}
			}
			return resolvedObj;
		}
	}

	return value;
}

/**
 * Extract the actual value from a token object
 * Handles both direct values and token objects with $value property
 */
function extractValue(token: any): any {
	if (token && typeof token === 'object') {
		if ('$value' in token) {
			return token.$value;
		}
		// If it's a token object without $value, return the whole object
		if ('$type' in token) {
			return token;
		}
	}
	return token;
}

/**
 * Process tokens: extract values and resolve references
 */
function processTokens(tokens: any): any {
	// First, flatten to resolve references
	const flatTokens = flattenTokens(tokens);
	
	// Extract $value from token objects in the flat structure
	const processedFlat: Record<string, any> = {};
	for (const [path, value] of Object.entries(flatTokens)) {
		processedFlat[path] = extractValue(value);
	}

	// Resolve all references
	const resolvedFlat: Record<string, any> = {};
	for (const [path, value] of Object.entries(processedFlat)) {
		resolvedFlat[path] = resolveReferences(value, processedFlat);
	}

	// Reconstruct nested structure
	return unflattenTokens(resolvedFlat);
}

/**
 * Convert flat path-based object back to nested structure
 */
function unflattenTokens(flat: Record<string, any>): any {
	const result: any = {};

	for (const [path, value] of Object.entries(flat)) {
		const parts = path.split('.');
		let current = result;

		for (let i = 0; i < parts.length - 1; i++) {
			const part = parts[i];
			if (!current[part]) {
				current[part] = {};
			}
			current = current[part];
		}

		current[parts[parts.length - 1]] = value;
	}

	return result;
}

/**
 * Merge all token files into a single token tree
 * Style tokens are merged first, then design tokens override them
 */
const allTokens = deepMerge(
	colorStylesTokens,
	effectStylesTokens,
	gridStylesTokens,
	textStylesTokens,
	walmartTokens,
	samsClubTokens,
	walmartLegacyTokens,
	bodegaTokens,
	scale0to899Tokens,
	scale900PlusTokens,
	scale0to899MegaTokens,
	scale900PlusMegaTokens
);

/**
 * Processed tokens with all references resolved
 */
export const tokens = processTokens(allTokens);

/**
 * Get a token value by path
 * Example: getToken('ld.primitive.color.blue.5')
 */
export function getToken(path: string): any {
	const parts = path.split('.');
	let current: any = tokens;

	for (const part of parts) {
		if (current && typeof current === 'object' && part in current) {
			current = current[part];
		} else {
			return undefined;
		}
	}

	// Extract $value if it's a token object
	return extractValue(current);
}

/**
 * Get a color token value
 * Example: getColor('ld.primitive.color.blue.5')
 */
export function getColor(path: string): string | undefined {
	const value = getToken(path);
	if (typeof value === 'string' && (value.startsWith('#') || value.startsWith('rgb'))) {
		return value;
	}
	return undefined;
}

/**
 * Get a typography token value
 * Example: getTypography('ld.semantic.textStyle.heading.large.default')
 */
export function getTypography(path: string): any {
	return getToken(path);
}

/**
 * Get an effect (shadow) token value
 * Example: getEffect('ld.semantic.elevation.100')
 */
export function getEffect(path: string): any {
	return getToken(path);
}

/**
 * Convert shadow token array to CSS box-shadow string
 */
export function shadowToCSS(shadow: any): string {
	if (typeof shadow === 'string') {
		return shadow;
	}

	if (Array.isArray(shadow)) {
		return shadow
			.map((s: any) => {
				if (typeof s === 'string') return s;
				if (typeof s === 'object' && s.offsetX && s.offsetY && s.blur && s.color) {
					const spread = s.spread || '0px';
					return `${s.offsetX} ${s.offsetY} ${s.blur} ${spread} ${s.color}`;
				}
				return '';
			})
			.filter(Boolean)
			.join(', ');
	}

	return '';
}

/**
 * Convert typography token to CSS properties
 */
export function typographyToCSS(typography: any): Record<string, string | number> {
	if (typeof typography === 'string') {
		return {};
	}

	const css: Record<string, string | number> = {};

	if (typography.fontFamily) {
		// Resolve font family reference if needed
		const fontFamily = typeof typography.fontFamily === 'string' 
			? typography.fontFamily.replace(/[{}]/g, '') 
			: typography.fontFamily;
		css.fontFamily = typeof fontFamily === 'string' ? fontFamily : String(fontFamily);
	}

	if (typography.fontSize) {
		const fontSize = resolveReferences(typography.fontSize, flattenTokens(tokens));
		css.fontSize = typeof fontSize === 'string' ? fontSize : String(fontSize);
	}

	if (typography.fontWeight) {
		css.fontWeight = typography.fontWeight;
	}

	if (typography.lineHeight) {
		const lineHeight = resolveReferences(typography.lineHeight, flattenTokens(tokens));
		css.lineHeight = typeof lineHeight === 'string' || typeof lineHeight === 'number' 
			? lineHeight 
			: String(lineHeight);
	}

	if (typography.letterSpacing) {
		css.letterSpacing = typography.letterSpacing;
	}

	if (typography.textTransform) {
		css.textTransform = typography.textTransform;
	}

	if (typography.textDecoration) {
		css.textDecoration = typography.textDecoration;
	}

	return css;
}

// Export the raw merged tokens for advanced usage
export const rawTokens = allTokens;

