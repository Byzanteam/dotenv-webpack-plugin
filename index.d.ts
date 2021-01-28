import { Compiler } from 'webpack'

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

declare class DotenvWebpackPlugin {
  constructor(options?: Partial<DotenvWebpackPluginOptions>)

  apply(compiler: Compiler): void
}

export default DotenvWebpackPlugin
