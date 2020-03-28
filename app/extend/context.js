'use strict';

const got = require('../../lib/got');

module.exports = {
  get got() {
    return got(this);
  },
};
