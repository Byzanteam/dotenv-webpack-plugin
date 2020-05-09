import { Plugin } from 'webpack'

interface DotenvWebpackPluginOptions {
  /**
   * Dotenv configuration.
   */
  dotenv: string

  /**
   * Property name on global of environment object.
   */
  property: string
}

declare class DotenvWebpackPlugin extends Plugin {
  constructor(options?: Partial<DotenvWebpackPluginOptions>)
}

export default DotenvWebpackPlugin
