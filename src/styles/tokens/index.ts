// Central export for all design tokens
// This file imports tokens from various sources (JSON, TypeScript, etc.)

// Option 1: Import from JSON files (if you have them)
// Uncomment and adjust paths if you have JSON token files:
// import colorsJson from './colors.json';
// import spacingJson from './spacing.json';
// import typographyJson from './typography.json';

// Option 2: Import from TypeScript files (current approach)
import { colors } from "../design-tokens";
import { spacing } from "../design-tokens";
import { typography } from "../design-tokens";
import { borderRadius } from "../design-tokens";
import { shadows } from "../design-tokens";

// Re-export all tokens for easy importing
export { colors, spacing, typography, borderRadius, shadows };

// You can also add additional tokens here if importing from JSON:
// export const colors = colorsJson;
// export const spacing = spacingJson;
// etc.
