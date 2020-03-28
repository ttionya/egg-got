'use strict';

const mock = require('egg-mock');

describe('egg-got plugin', () => {
  let app;

  before(() => {
    app = mock.app({
      baseDir: 'apps/egg-got-test',
    });
    return app.ready();
  });

  after(() => app.close());

  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, got')
      .expect(200);
  });
});
