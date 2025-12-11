/**
 * Utility functions for working with design tokens
 * These helpers can be used to merge JSON tokens with existing TypeScript tokens
 */

/**
 * Deep merge two objects, with the second object taking precedence
 */
export function mergeTokens<T extends Record<string, any>>(base: T, override: Partial<T>): T {
	const result = { ...base };

	for (const key in override) {
		if (
			override[key] &&
			typeof override[key] === "object" &&
			!Array.isArray(override[key]) &&
			base[key] &&
			typeof base[key] === "object" &&
			!Array.isArray(base[key])
		) {
			result[key] = mergeTokens(base[key], override[key]);
		} else {
			result[key] = override[key] as T[Extract<keyof T, string>];
		}
	}

	return result;
}

/**
 * Convert a flat token object to a nested structure
 * Useful if your JSON tokens come in a flat format like:
 * { "color.primary": "#3B82F6", "spacing.sm": "0.5rem" }
 */
export function nestTokens(flatTokens: Record<string, any>): Record<string, any> {
	const nested: Record<string, any> = {};

	for (const [key, value] of Object.entries(flatTokens)) {
		const parts = key.split(".");
		let current = nested;

		for (let i = 0; i < parts.length - 1; i++) {
			const part = parts[i];
			if (!current[part]) {
				current[part] = {};
			}
			current = current[part];
		}

		current[parts[parts.length - 1]] = value;
	}

	return nested;
}
