// Central export for all design tokens
// This file imports tokens from various sources (JSON, TypeScript, etc.)

// Import from TypeScript files (legacy tokens)
import { colors } from "../design-tokens";
import { spacing } from "../design-tokens";
import { typography } from "../design-tokens";
import { borderRadius } from "../design-tokens";
import { shadows } from "../design-tokens";

// Import JSON token loader
import {
	tokens,
	getToken,
	getColor,
	getTypography,
	getEffect,
	shadowToCSS,
	typographyToCSS,
	rawTokens,
} from "./loader";

// Re-export legacy TypeScript tokens
export { colors, spacing, typography, borderRadius, shadows };

// Export JSON tokens and utilities
export {
	tokens,
	getToken,
	getColor,
	getTypography,
	getEffect,
	shadowToCSS,
	typographyToCSS,
	rawTokens,
};

/**
 * Convenience accessors for common token paths
 * These provide easy access to frequently used tokens
 */
export const ldTokens = {
	/**
	 * Access primitive colors
	 * Example: ldTokens.colors.blue[5]
	 */
	get colors() {
		return tokens?.ld?.primitive?.color || {};
	},

	/**
	 * Access semantic colors
	 * Example: ldTokens.semanticColors.chart.categorical[1]
	 */
	get semanticColors() {
		return tokens?.ld?.semantic?.color || {};
	},

	/**
	 * Access text styles
	 * Example: ldTokens.textStyles.heading.large.default
	 */
	get textStyles() {
		return tokens?.ld?.semantic?.textStyle || {};
	},

	/**
	 * Access elevation (shadows)
	 * Example: ldTokens.elevation[100]
	 */
	get elevation() {
		return tokens?.ld?.semantic?.elevation || {};
	},

	/**
	 * Access fonts
	 * Example: ldTokens.fonts.lineHeight[200]
	 */
	get fonts() {
		return tokens?.ld?.primitive?.font || {};
	},

	/**
	 * Access grid tokens
	 */
	get grid() {
		return tokens?.ld?.semantic?.grid || tokens?.ld?.primitive?.grid || {};
	},
};

/**
 * Helper to get a color value by path
 * Example: getColorToken('ld.primitive.color.blue.5')
 * Or use the convenience accessor: ldTokens.colors.blue[5]
 */
export function getColorToken(path: string): string | undefined {
	return getColor(path);
}

/**
 * Helper to get a typography style object
 * Example: getTypographyToken('ld.semantic.textStyle.heading.large.default')
 * Or use the convenience accessor: ldTokens.textStyles.heading.large.default
 */
export function getTypographyToken(path: string): any {
	return getTypography(path);
}

/**
 * Helper to get a shadow/elevation value
 * Example: getShadowToken('ld.semantic.elevation.100')
 * Or use the convenience accessor: ldTokens.elevation[100]
 */
export function getShadowToken(path: string): string {
	const effect = getEffect(path);
	return shadowToCSS(effect);
}
