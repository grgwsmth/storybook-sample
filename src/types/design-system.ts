// Design System Types for Figma to React workflow

export interface DesignToken {
  name: string;
  value: string;
  type: 'color' | 'spacing' | 'typography' | 'border-radius' | 'shadow';
  description?: string;
}

export interface ComponentSpec {
  name: string;
  figmaUrl?: string;
  variants?: ComponentVariant[];
  props?: ComponentProps;
}

export interface ComponentVariant {
  name: string;
  properties: Record<string, any>;
}

export interface ComponentProps {
  [key: string]: {
    type: string;
    defaultValue?: any;
    description?: string;
  };
}

// Common design system interfaces
export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface Colors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  neutral: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
}

export interface Typography {
  fontFamily: string;
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}
