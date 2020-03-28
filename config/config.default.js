'use strict';

/**
 * egg-got default config
 * @member Config#got
 * @property {number|Object} [timeout=5000] - got#timeout
 * @property {Object} logger
 * @property {string} [logger.name=gotLogger] - customLogger name for egg-got
 * @property {Function} [formatter] - logger formatter
 */
exports.got = {
  timeout: 1000 * 5,
  logger: {
    name: 'gotLogger',
    formatter: null,
  },
};
