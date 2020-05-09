# Dotenv for Webpack HTML Plugin

通过 `dotenv` 将环境变量挂在到浏览器 `window` 对象上。

## Installation

```bash
$ npm install -D dotenv-webpack-plugin
```

## Configuration

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DotenvWebpackPlugin = require('dotenv-webpack-plugin')

module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin(),
    new DotenvWebpackPlugin(),
  ],
  ...
}
```

## Options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| dotenv | object | undefined | Dotenv configuration options |
| property | string | `'env'` | Property name of environment object on window |
