# Design Tokens

This directory is where you can store your design token files.

## Supported Formats

### Option 1: JSON Files

If you have JSON files exported from Figma or design tools, place them here:

-  `colors.json`
-  `spacing.json`
-  `typography.json`
-  `borderRadius.json`
-  `shadows.json`
-  etc.

Then update `index.ts` to import them.

### Option 2: TypeScript Files

You can also create TypeScript files for better type safety:

-  `colors.ts`
-  `spacing.ts`
-  `typography.ts`
-  etc.

## Example JSON Structure

If you're importing from JSON, your files should follow this structure:

**colors.json:**

```json
{
	"primary": "#3B82F6",
	"secondary": "#8B5CF6",
	"neutral": {
		"50": "#F9FAFB",
		"100": "#F3F4F6"
	}
}
```

**spacing.json:**

```json
{
	"xs": "0.25rem",
	"sm": "0.5rem",
	"md": "1rem"
}
```

## Usage

Import tokens in your components:

```typescript
import { colors, spacing } from "@/styles/tokens";
```
