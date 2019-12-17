const dotenv = require('dotenv')
const terser = require('terser')

function parseValue(value) {
  switch (true) {
    case value === '':
      return void 0
    case value === 'true' || value === 'false':
      return Boolean(value)
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
  static options = {
    path: '.env',
    property: 'env',
  }

  constructor(options = {}) {
    Object.assign(this, {...DotenvWebpackPlugin.options, ...options})
  }

  getTag() {
    const {error, parsed} = dotenv.config({path: this.path})

    if (error) throw (error)

    return {
      tagName: 'script',
      closeTag: true,
      innerHTML: this.getContent(parsed),
    }
  }

  getContent(environments) {
    const properties = Object.entries(environments).map(([key, value]) => `${key}: "${value}"`)
    const snippets = [
      `const environments = {${properties.join(',')}}`,
      parseValue.toString(),
      parseEvironments.toString(),
      `window.${this.property} = parseEvironments(environments)`,
    ]
    const {error, code} = terser.minify(`!function() {${snippets.join(';')}}()`)

    if (error) throw (error)

    return code
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('DotenvWebpackPlugin', compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('DotenvWebpackPlugin', (data, callback) => {
        data.head = [...data.head, this.getTag()]

        callback(null, data)
      })
    })
  }
}

module.exports = DotenvWebpackPlugin
