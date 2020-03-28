'use strict';

const got = require('got');

/**
 * mount got to context
 * @param {*} ctx - ctx
 * @return {Got} - got
 */
module.exports = ctx => {
  const gotLogger = require('./logger')(ctx);
  const hasLogger = !!gotLogger;

  const gotConfig = Object.assign(
    {},
    ctx.app.config.got,
    {
      hooks: undefined,
      logger: undefined,
    }
  );

  const options = {
    ...gotConfig,

    hooks: {
      init: [
        options => {
          // Support axios params property
          if (options.params && !options.searchParams) {
            options.searchParams = options.params;
          }

          // Support axios data property
          if (options.data && !options.json) {
            options.json = options.data;
          }

          if (hasLogger) {
            gotLogger.info({ type: 'init', options });
          }
        },
      ],
    },
  };

  // add log hook only if logger is set
  if (hasLogger) {
    // beforeRetry
    options.hooks.beforeRetry = [
      (options, error, retryCount) => {
        gotLogger.warn({ type: 'beforeRetry', options, error, retryCount });
      },
    ];

    // beforeError
    options.hooks.beforeError = [
      error => {
        gotLogger.warn({ type: 'beforeError', error });

        return error;
      },
    ];

    // beforeRequest
    options.hooks.beforeRequest = [
      options => {
        gotLogger.info({ type: 'beforeRequest', options });
      },
    ];

    // afterResponse
    options.hooks.afterResponse = [
      response => {
        gotLogger.info({ type: 'afterResponse', response });

        return response;
      },
    ];

    // beforeRedirect
    options.hooks.beforeRedirect = [
      (options, response) => {
        gotLogger.info({ type: 'beforeRedirect', options, response });
      },
    ];
  }

  return got.extend(options);
};
