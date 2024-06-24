import { Command, flags } from '@oclif/command';
import * as fs from 'fs-extra';
import * as path from 'path';

export default class Lint extends Command {
  static description = 'Lint Shopify Liquid files';

  static flags = {
    help: flags.help({ char: 'h', description: 'Show help for the lint command' }),
    themePath: flags.string({
      char: 'p',
      description: 'Path to the Shopify theme directory to lint',
      required: true,
    }),
    verbose: flags.boolean({
      char: 'v',
      description: 'Show verbose output including warnings',
      default: false,
    }),
  };

  async run() {
    const { args, flags } = this.parse(Lint);
    const themePath = args.themePath;

    try {
      const files = await fs.readdir(themePath);
      const liquidFiles = files
        .filter((file: string) => file.endsWith('.liquid'))
        .map((file: string) => path.join(themePath, file));

      for (const file of liquidFiles) {
        const fileContent = await fs.readFile(file, 'utf-8');
        await this.lintLiquidFile(file, fileContent, flags.verbose);
      }
    } catch (error: any) {
      this.error(`Error: ${error.message}`);
    }
  }

  async lintLiquidFile(filePath: string, fileContent: string, verbose: boolean) {
    const lintResults = []; // Initialize array to collect linting results

    // Example linting rule: Check for unused variables
    const unusedVariables = fileContent.match(/{{\s*(\w+)\s*\|/g);
    if (unusedVariables) {
      lintResults.push(`Unused variables: ${unusedVariables.join(', ')}`);
    }

    // Example linting rule: Check for missing required liquid tags
    const requiredTags = ['shopify', 'paginate', 'schema'];
    for (const tag of requiredTags) {
      if (!fileContent.includes(`{% ${tag}`)) {
        lintResults.push(`Missing required tag: ${tag}`);
      }
    }

    // Output linting results
    if (lintResults.length > 0) {
      this.log(`Linting results for ${filePath}:`);
      lintResults.forEach(result => this.log(`- ${result}`));
    } else if (verbose) {
      this.log(`No issues found in ${filePath}`);
    }
  }
}
