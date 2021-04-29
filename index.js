const dotenv = require('dotenv')
const terser = require('terser')

function parseValue(value) {
  switch (true) {
    case value === '':
      return void 0
    case value === 'true':
      return true
    case value === 'false':
      return false
    case Number.isNaN(+value):
      return value
    default:
      return Number(value)
  }
}

function parseEvironments(environments) {
  var env = Object.prototype.toString.call(environments) === '[object Object]'
    ? environments
    : {}

  return Object.entries(env).reduce((acc, [key, value]) => ({...acc, [key]: parseValue(value)}), {})
}

class DotenvWebpackPlugin {
  constructor({ dotenv, property = 'env'} = {}) {
    this.dotenv = dotenv
    this.property = property
    this.template = false
  }

  async getTag() {
    const {error, parsed} = dotenv.config(this.dotenv)

    if (error) throw error

    return {
      tagName: 'script',
      closeTag: true,
      innerHTML: await this.getScript(parsed),
    }
  }

  async getScript(environments) {
    const properties = Object.entries(environments)
      .map(([key, value]) => `${key}: "${this.template ? `$${key}` : value}"`)
    const snippets = [
      `const environments = {${properties.join(',')}}`,
      parseValue.toString(),
      parseEvironments.toString(),
      `window.${this.property} = parseEvironments(environments)`,
    ]
    const {error, code} = await terser.minify(`!function() {${snippets.join(';')}}()`)

    if (error) throw (error)

    return code
  }

  apply(compiler) {
    this.template = compiler.options.mode === 'production' ? true : false

    compiler.hooks.compilation.tap('DotenvWebpackPlugin', compilation => {
      const HTMLWebpackPlugin = compiler.options.plugins
        .map(({ constructor }) => constructor)
        .find(plugin => plugin.name === 'HtmlWebpackPlugin')
      const alterAssetTags = HTMLWebpackPlugin.getHooks
        ? HTMLWebpackPlugin.getHooks(compilation).alterAssetTagGroups
        : compilation.hooks.htmlWebpackPluginAlterAssetTags

      alterAssetTags.tapAsync('DotenvWebpackPlugin', async (data, callback) => {
        const tag = await this.getTag()

        if (HTMLWebpackPlugin.getHooks) {
          data.headTags = [...data.headTags, tag]
        } else {
          data.head = [...data.head, tag]
        }

        callback(null, data)
      })
    })
  }
}

module.exports = DotenvWebpackPlugin
