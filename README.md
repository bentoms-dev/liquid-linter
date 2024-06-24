# Liquid Linter

Liquid Linter tool built with Node.js and TypeScript to lint Shopify Liquid files.

## Installation

Install Node.js and npm on your machine. Then, clone this repository and install dependencies.

```bash
git clone <repository_url>
cd liquid-linter
npm install
```

## Usage
```bash
npm run lint -- -p path/to/shopify/theme
```
## Options
1. -p, --themePath: Path to the Shopify theme directory to lint (required).
2. -v, --verbose: Show verbose output including warnings (default: false).

## How it works

The tool reads all .liquid files in the specified theme directory and performs linting using custom linting rules defined in lint.ts. Errors and warnings (if --verbose is enabled) are logged to the console using colored output.
