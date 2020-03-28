'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, ' + this.app.plugins.got.name;
  }
}

module.exports = HomeController;
