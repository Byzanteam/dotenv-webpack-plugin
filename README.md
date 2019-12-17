# Dotenv for Webpack HTML Plugin

通过 `dotenv` 将环境变量挂在到浏览器 `window` 对象上。

## Installation

```bash
$ npm install -D webpack-plugin-dotenv
```

## Configuration

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPluginDotenv = require('webpack-plugin-dotenv')

module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin(),
    new WebpackPluginDotenv(),
  ],
  ...
}
```

## Options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| path | string | `'.env'` | Dotenv file path |
| property | string | `'env'` | Property name of environment object on window |
| template | boolean | `false` | Inject variable templates or values |
