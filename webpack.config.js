const NODE_ENV = process.env.NODE_ENV;

const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const join = path.join;
const resolve = path.resolve;

const getConfig = require('hjs-webpack');

const root = resolve(__dirname);
const src = join(root, 'src');
const modules = join(root, 'node-modules');
const dest = join(root, 'dist');

const isDev = NODE_ENV === 'development';

const cssModulesNames = `${isDev ? '[path][name]__[local]__' : ''}[hash:base64:5]`;

const matchCssLoaders = /(^|!)(css-loader)($|!)/;

const findLoader = (loaders, match) => {
    const found = loaders.filter(l => l && l.loader && l.loader.match(match));
    return found ? found[0] : null;
}
// existing css loader
const cssloader = findLoader(config.module.loaders, matchCssLoaders)

var config = getConfig({
    isDev: isDev,
    in: join(__dirname, 'src/app.js'),
    out: dest,
    clearBeforeBuild: true
});

config.postcss = [].concat([
    require('precss')({}),
    require('autoprefixer')({}),
    require('cssnano')({})
]);

module.exports = config;