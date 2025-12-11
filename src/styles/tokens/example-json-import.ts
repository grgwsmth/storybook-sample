/**
 * EXAMPLE: How to import tokens from JSON files
 *
 * This is a reference file showing how you would import JSON tokens.
 * Copy the pattern below into design-tokens.ts or create separate token files.
 */

// Example 1: Direct JSON import (if your JSON matches the structure)
// import colorsData from './colors.json';
// import spacingData from './spacing.json';
// import typographyData from './typography.json';

// Example 2: Import and merge with existing tokens
// import { mergeTokens } from './utils';
// import { colors as baseColors } from '../design-tokens';
// import colorsJson from './colors.json';
//
// export const colors = mergeTokens(baseColors, colorsJson);

// Example 3: Import from a single tokens.json file
// import tokensData from './tokens.json';
//
// export const colors = tokensData.colors;
// export const spacing = tokensData.spacing;
// export const typography = tokensData.typography;

/**
 * RECOMMENDED APPROACH:
 *
 * If you have JSON files, the best approach is:
 *
 * 1. Place your JSON files in src/styles/tokens/
 * 2. Import them in design-tokens.ts
 * 3. Export them with proper TypeScript types
 *
 * Example structure for your JSON files:
 *
 * colors.json:
 * {
 *   "primary": "#3B82F6",
 *   "secondary": "#8B5CF6",
 *   "neutral": {
 *     "50": "#F9FAFB",
 *     "100": "#F3F4F6"
 *   }
 * }
 *
 * Then in design-tokens.ts:
 * import colorsJson from './tokens/colors.json';
 * export const colors = colorsJson as const;
 */
