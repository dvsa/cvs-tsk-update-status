// @ts-ignore
import * as yml from "node-yaml";
import { ERRORS } from "../models/enum";

class Configuration {
  private static instance: Configuration;
  private readonly config: any;

  constructor(configPath: string) {
    if (!process.env.BRANCH) {
      throw new Error(ERRORS.NoBranch);
    }
    this.config = yml.readSync(configPath);

    // Replace environment variable references
    let stringifiedConfig: string = JSON.stringify(this.config);
    const envRegex: RegExp = /\${(\w+\b):?(\w+\b)?}/g;
    const matches: RegExpMatchArray | null = stringifiedConfig.match(envRegex);

    if (matches) {
      matches.forEach((match) => {
        envRegex.lastIndex = 0;
        const captureGroups: RegExpExecArray = envRegex.exec(
          match
        ) as RegExpExecArray;

        // Insert the environment variable if available. If not, insert placeholder. If no placeholder, leave it as is.
        stringifiedConfig = stringifiedConfig.replace(
          match,
          process.env[captureGroups[1]] || captureGroups[2] || captureGroups[1]
        );
      });
    }

    this.config = JSON.parse(stringifiedConfig);
  }

  /**
   * Retrieves the singleton instance of Configuration
   * @returns Configuration
   */
  public static getInstance(): Configuration {
    if (!this.instance) {
      this.instance = new Configuration("../config/config.yml");
    }

    return Configuration.instance;
  }

  public getEndpoints(): any {
    if (!this.config.endpoints) {
      throw new Error("Endpoints were not defined in the config file.");
    }

    // Not defining BRANCH will default to local-global
    let env;
    switch (process.env.BRANCH) {
      case "local-global":
        env = "local-global";
        break;
      default:
        env = "remote";
    }

    return this.config.endpoints[env];
  }
}

export { Configuration };
