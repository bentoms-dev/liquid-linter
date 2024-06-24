// src/types/theme-lint.d.ts

declare module '@shopify/theme-lint' {
    export function lint(file: string, content: string): Promise<string[]>;
    // Add other typings if needed
  }