var assert = require('assert');
var check = require('../filters/checkUserFilter');

describe('CheckUserFilter', function () {
  describe('#checkUser method', function () {
    it('checkUser with invalid login', function () {
      var counter = 0;
      var req = {
        session: {}
      };
      var res = {
        redirect: function(path){ 
          assert.equal('/auth/login', path);
        }
      };
      var next = function(){
        counter++;
      };
      check(req, res, next);
      assert.ok (counter === 0, ' function next does not execut!');
    });
    it('checkUser with logined user', function () {
      var counter = 0;
      var req = {
        session: {login:'admin'}
      };
      var res = {
        redirect: function(path){ 
          counter++;
        }
      };
      var next = function(){
          assert.ok(true, 'function next does execut!');
      };
      check(req, res, next);
      assert.ok (counter === 0, 'function redirect does not execut!');
    });
  });
});