'use strict';

/**
 * get logger
 * @param {*} ctx - ctx
 * @return {*} - return EggLogger if custom logger is set
 */
module.exports = ctx => {
  const { name: loggerName, formatter } = ctx.app.config.got.logger;

  const gotLogger = ctx.getLogger(loggerName);

  if (!gotLogger) {
    return null;
  }

  [
    'ERROR',
    'WARN',
    'INFO',
    'DEBUG',
  ].forEach(level => {
    level = level.toLocaleLowerCase();

    const o = gotLogger[level];

    gotLogger[level] = message => {
      if (typeof message === 'string') {
        o.call(gotLogger, message);
      } else {
        o.call(gotLogger, (formatter || defaultFormatter)(message));
      }
    };
  });

  return gotLogger;
};

function defaultFormatter(data) {
  switch (data.type) {
    case 'init': {
      const { options } = data;
      return `init request [${options.method || 'GET'} ${options.url}]`;
    }
    case 'beforeRetry': {
      const { options, error, retryCount } = data;
      return `request [${options.method} ${options.url}] failed, retry attempt [#${retryCount}]: ${error}`;
    }
    case 'beforeError': {
      const { error, error: { options } } = data;
      return `request [${options.url}] failed: ${error}`;
    }
    case 'beforeRequest': {
      const { options } = data;
      return `start request [${options.method} ${options.url}]`;
    }
    case 'afterResponse': {
      const { response, response: { request: { options } } } = data;
      return `response [${options.method} ${options.url}] (${response.statusCode}) used ${response.timings.phases.total}ms`;
    }
    case 'beforeRedirect': {
      const { options } = data;
      return `redirect to ${options.location}`;
    }
    default:
      // no default
  }

  return '';
}
