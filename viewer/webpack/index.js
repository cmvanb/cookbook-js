#!/usr/bin/env node

require('@babel/register')({ presets: ['@babel/preset-env'] });

const base = require('./base.config').default;

module.exports = (env = {}, options) => {
    return base(env, options);
};
