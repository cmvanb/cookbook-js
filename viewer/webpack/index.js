#!/usr/bin/env node

const base = require('./base.config').default;

module.exports = (env = {}, options) => {
    return base(env, options);
};
