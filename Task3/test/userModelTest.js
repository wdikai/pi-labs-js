var assert = require('assert');
var Users = require('../models/usersModel');

describe('UsersModel', function() {
  describe('#Create and load model', function () {
    it('Create empty user model', function () {
      var users = new Users.Create();
      assert.equal(0, users.users.length);
    });
    it('Create model and load user list', function () {
      var users = new Users.Create().load();
      assert.notEqual(0, users.users.length);
    });
  });
  describe('#Valid method', function () {
    it('Check valid method from user model (valid data)', function () {
      var users = new Users.Create().load();
      var login = 'admin';
      var password = 'qwerty';
      assert.equal(true, users.valid(login, password));
    });
    it('Check valid method from user model (invalid login)', function () {
      var users = new Users.Create().load();
      var login = 'Vasya';
      var password = 'qwerty';
      assert.notEqual(true, users.valid(login, password));
    });
    it('Check valid method from user model (invalid password)', function () {
      var users = new Users.Create().load();
      var login = 'admin';
      var password = 'thrthrth';
      assert.notEqual(true, users.valid(login, password));
    });
    it('Check valid method from user model (invalid all parametr)', function () {
      var users = new Users.Create().load();
      var login = 'Vasya';
      var password = 'thrthrth';
      assert.notEqual(true, users.valid(login, password));
    });
  });
});