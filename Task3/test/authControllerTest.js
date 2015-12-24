var assert = require('assert');
var Auth = require('../controllers/authController');

describe('AuthController', function () {
  describe('#Login method', function () {
    it('Login with invalid data', function () {
      var req = {
        body:{},
        session: {}
      };
      var res = {
        redirect: function(path){ 
          assert.equal('/auth/login', path);
        }
      }
      Auth.login(req, res);
      assert.equal('undefined', typeof req.session.login);
    });
    it('Login with valid data', function () {
      var req = {
        body: {
          login: 'admin',
          password: 'qwerty'
        },
        session: {}
      };
      var res = {
        redirect: function(path){ 
          assert.equal('/', path);
        }
      }
      Auth.login(req, res);
      assert.notEqual('undefined', typeof req.session.login);
    });
  });
  describe('#Logout method', function () {
    it('Logout after login', function () {
      var req = {
        session: {
          login: 'admin',
          destroy: function(done) {
            delete this.login;
            var err = null;
            assert.equal(null, err)
            done(err);
          }
        }
      };
      var res = {
        redirect: function(path){ 
          assert.equal('/', path);
        }
      }
      assert.notEqual('undefined', typeof req.session.login);
      Auth.logout(req, res);
      assert.equal('undefined', typeof req.session.login);
    });
    it('Logout before the login', function () {
    
      var req = {
        session: {
          destroy: function(done) {
            var err = null;
            assert.equal(null, err)
            done(err);
          }
        }
      };
      var res = {
        redirect: function(path){ 
          assert.equal('/', path);
        }
      }
      assert.equal('undefined', typeof req.session.login);
      Auth.logout(req, res);
    });
  });
});