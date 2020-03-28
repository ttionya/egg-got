'use strict';

const assert = require('assert');
const mock = require('egg-mock');

describe('context', () => {
  let app;

  before(() => {
    app = mock.app();

    return app.ready();
  });

  after(() => app.close());

  it('should mount got function', () => {
    const ctx = app.mockContext();

    assert(typeof ctx.got === 'function', 'got don\'t mount on context');
    assert(typeof ctx.got.get === 'function', 'got miss get function');
    assert(typeof ctx.got.post === 'function', 'got miss post function');
    assert(typeof ctx.got.put === 'function', 'got miss put function');
    assert(typeof ctx.got.delete === 'function', 'got miss delete function');
    assert(typeof ctx.got.extend === 'function', 'got miss extend function');
  });
});
