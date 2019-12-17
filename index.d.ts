import { Plugin } from 'webpack'

interface DotenvWebpackPluginOptions {
  /**
   * Dotenv file path, based on current working directory.
   */
  path: string

  /**
   * Property name on global of environment object.
   */
  property: string

  /**
   * Insert variable template or value.
   */
  template: boolean
}

declare class DotenvWebpackPlugin extends Plugin {
  constructor(options?: Partial<DotenvWebpackPluginOptions>)
}

export default DotenvWebpackPlugin
