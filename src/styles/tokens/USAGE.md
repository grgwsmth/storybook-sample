# Design Tokens Usage Guide

This guide shows how to use the JSON design tokens in your Storybook components.

## Importing Tokens

You can import tokens in several ways:

```typescript
// Import convenience accessors
import { ldTokens, getColor, getTypography, getShadowToken } from '../../styles/tokens';

// Or import the full token object
import { tokens, getToken } from '../../styles/tokens';
```

## Using Colors

### Method 1: Using Convenience Accessors

```typescript
import { ldTokens } from '../../styles/tokens';

// Access primitive colors
const blueColor = ldTokens.colors.blue[5]; // "#f0f5ff"

// Access semantic colors
const chartColor = ldTokens.semanticColors.chart.categorical[1];
```

### Method 2: Using Helper Functions

```typescript
import { getColor, getColorToken } from '../../styles/tokens';

// Get color by path
const blueColor = getColor('ld.primitive.color.blue.5');
const chartColor = getColor('ld.semantic.color.chart.categorical.1');
```

### Method 3: Direct Token Access

```typescript
import { tokens } from '../../styles/tokens';

const blueColor = tokens.ld.primitive.color.blue[5];
```

## Using Typography

### Method 1: Using Convenience Accessors

```typescript
import { ldTokens, typographyToCSS } from '../../styles/tokens';

// Get typography token
const headingStyle = ldTokens.textStyles.heading.large.default;

// Convert to CSS properties
const cssProps = typographyToCSS(headingStyle);
```

### Method 2: Using Helper Functions

```typescript
import { getTypography, typographyToCSS } from '../../styles/tokens';

const headingToken = getTypography('ld.semantic.textStyle.heading.large.default');
const cssProps = typographyToCSS(headingToken);
```

## Using Shadows/Elevation

### Method 1: Using Convenience Accessors

```typescript
import { ldTokens, shadowToCSS } from '../../styles/tokens';

// Get elevation token
const elevation100 = ldTokens.elevation[100];

// Convert to CSS
const boxShadow = shadowToCSS(elevation100);
```

### Method 2: Using Helper Functions

```typescript
import { getShadowToken } from '../../styles/tokens';

// Get shadow as CSS string
const boxShadow = getShadowToken('ld.semantic.elevation.100');
```

## Example: Using in a Component

```typescript
import React from 'react';
import { ldTokens, typographyToCSS, shadowToCSS } from '../../styles/tokens';

export const MyComponent: React.FC = () => {
  const styles: React.CSSProperties = {
    // Use color tokens
    backgroundColor: ldTokens.colors.blue[5],
    color: ldTokens.colors.blue[900],
    
    // Use typography tokens
    ...typographyToCSS(ldTokens.textStyles.heading.large.default),
    
    // Use elevation tokens
    boxShadow: shadowToCSS(ldTokens.elevation[200]),
    
    // Use spacing (from legacy tokens or grid tokens)
    padding: '16px',
  };

  return <div style={styles}>Hello World</div>;
};
```

## Example: Using in Inline Styles

```typescript
import { getColor, getShadowToken } from '../../styles/tokens';

const buttonStyle = {
  backgroundColor: getColor('ld.primitive.color.blue.500'),
  color: getColor('ld.primitive.color.white'),
  boxShadow: getShadowToken('ld.semantic.elevation.100'),
};
```

## Example: Using in CSS Modules

If you're using CSS modules, you can use CSS custom properties:

```typescript
// In your component
import { getColor } from '../../styles/tokens';
import styles from './MyComponent.module.css';

// Set CSS variables
const rootStyle = {
  '--primary-color': getColor('ld.primitive.color.blue.500'),
  '--shadow': getShadowToken('ld.semantic.elevation.100'),
} as React.CSSProperties;

return <div style={rootStyle} className={styles.container}>...</div>;
```

```css
/* In MyComponent.module.css */
.container {
  background-color: var(--primary-color);
  box-shadow: var(--shadow);
}
```

## Available Token Collections

Based on your manifest.json, you have access to:

1. **Style Tokens:**
   - `color.styles.tokens.json` - Color style tokens
   - `text.styles.tokens.json` - Typography style tokens
   - `effect.styles.tokens.json` - Shadow/elevation tokens
   - `grid.styles.tokens.json` - Grid/layout tokens

2. **Design Tokens (Brand Variants):**
   - `LD Design Tokens.Walmart.tokens.json`
   - `LD Design Tokens.Sam's Club.tokens.json`
   - `LD Design Tokens.Walmart Legacy.tokens.json`
   - `LD Design Tokens.Bodega.tokens.json`

3. **Scale Tokens (Responsive):**
   - `LD Scale.0-899px.tokens.json`
   - `LD Scale.900px+.tokens.json`
   - `LD Scale.0-899px (Mega).tokens.json`
   - `LD Scale.900px+ (Mega).tokens.json`

All tokens are merged and available under the `ld` namespace in the `tokens` object.

## Token Reference Resolution

The token loader automatically resolves references. For example, if a token references another token like `{ld.semantic.color.chart.categorical.1}`, it will be automatically resolved to the actual color value.

## TypeScript Support

All tokens are fully typed. You can use TypeScript autocomplete to discover available token paths:

```typescript
import { tokens } from '../../styles/tokens';

// TypeScript will autocomplete available paths
tokens.ld.primitive.color.blue[5]
```


