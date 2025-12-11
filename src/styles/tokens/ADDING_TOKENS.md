# Adding Design Tokens to Your Project

## Quick Start

You have **two main options** for adding tokens:

### Option 1: Add JSON Files (Recommended if you have them)

1. **Place your JSON files** in `src/styles/tokens/`:

   ```
   src/styles/tokens/
   ├── colors.json
   ├── spacing.json
   ├── typography.json
   ├── borderRadius.json
   ├── shadows.json
   └── ... (any other token files)
   ```

2. **Update `src/styles/design-tokens.ts`** to import them:

   ```typescript
   // Import JSON files
   import colorsJson from "./tokens/colors.json";
   import spacingJson from "./tokens/spacing.json";
   import typographyJson from "./tokens/typography.json";
   import borderRadiusJson from "./tokens/borderRadius.json";
   import shadowsJson from "./tokens/shadows.json";

   // Export with type safety
   export const colors = colorsJson as const;
   export const spacing = spacingJson as const;
   export const typography = typographyJson as const;
   export const borderRadius = borderRadiusJson as const;
   export const shadows = shadowsJson as const;
   ```

### Option 2: Add Tokens Directly to TypeScript

Simply add your tokens directly to `src/styles/design-tokens.ts`:

```typescript
export const yourNewTokens = {
	// your token values
} as const;
```

## JSON File Structure

Your JSON files should match the structure of your TypeScript tokens. Examples:

### colors.json

```json
{
	"primary": "#3B82F6",
	"secondary": "#8B5CF6",
	"success": "#10B981",
	"warning": "#F59E0B",
	"error": "#EF4444",
	"neutral": {
		"50": "#F9FAFB",
		"100": "#F3F4F6",
		"200": "#E5E7EB"
	}
}
```

### spacing.json

```json
{
	"xs": "0.25rem",
	"sm": "0.5rem",
	"md": "1rem",
	"lg": "1.5rem",
	"xl": "2rem",
	"xxl": "3rem"
}
```

## Merging with Existing Tokens

If you want to merge JSON tokens with existing TypeScript tokens:

```typescript
import { mergeTokens } from "./tokens/utils";
import { colors as baseColors } from "./design-tokens";
import colorsJson from "./tokens/colors.json";

export const colors = mergeTokens(baseColors, colorsJson);
```

## After Adding Tokens

1. **Update your components** to use the new tokens
2. **Update `DesignTokens.stories.tsx`** to showcase new tokens in Storybook
3. **Test in Storybook** to see your tokens displayed

## Common Token Categories

-  **Colors**: Primary, secondary, semantic colors, neutral palette
-  **Spacing**: Padding, margin, gap values
-  **Typography**: Font families, sizes, weights, line heights
-  **Border Radius**: Corner rounding values
-  **Shadows**: Box shadow definitions
-  **Breakpoints**: Responsive breakpoint values
-  **Z-Index**: Layer stacking values
-  **Transitions**: Animation durations and easing functions
