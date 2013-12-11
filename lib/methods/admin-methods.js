(function() {
  var AdminMethods, ObjectId, async, bcrypt, errors, mongoose, passgen, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = require('underscore-ext');

  errors = require('some-errors');

  mongoose = require("mongoose");

  ObjectId = mongoose.Types.ObjectId;

  bcrypt = require('bcryptjs');

  passgen = require('passgen');

  async = require('async');

  /*
  Provides methods to interact with scotties.
  */


  module.exports = AdminMethods = (function() {
    /*
    Initializes a new instance of the @see ScottyMethods class.
    @param {Object} models A collection of models that can be used.
    */

    function AdminMethods(models, users, oauthApps, oauthAuth, oauthScopes) {
      this.models = models;
      this.users = users;
      this.oauthApps = oauthApps;
      this.oauthAuth = oauthAuth;
      this.oauthScopes = oauthScopes;
      this.setup = __bind(this.setup, this);
      if (!this.models) {
        throw new Error("models parameter is required");
      }
      if (!this.users) {
        throw new Error("users parameter is required");
      }
      if (!this.oauthApps) {
        throw new Error("oauthApps parameter is required");
      }
      if (!this.oauthAuth) {
        throw new Error("oauthAuth parameter is required");
      }
      if (!this.oauthScopes) {
        throw new Error("oauthScopes parameter is required");
      }
    }

    /*
    Sets up an account ready for use.
    */


    AdminMethods.prototype.setup = function(accountId, appName, username, email, password, scopes, clientId, secret, options, cb) {
      var adminUser,
        _this = this;
      if (scopes == null) {
        scopes = [];
      }
      if (clientId == null) {
        clientId = null;
      }
      if (secret == null) {
        secret = null;
      }
      if (options == null) {
        options = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      if (_.isFunction(options)) {
        cb = options;
        options = {};
      }
      adminUser = {
        accountId: accountId,
        username: username,
        password: password,
        email: email
      };
      return this.users.create(accountId, adminUser, {}, function(err, user) {
        var appData, _createScope;
        if (err) {
          return cb(err);
        }
        appData = {
          accountId: accountId,
          name: appName,
          clientId: clientId,
          secret: secret,
          createdByUserId: user._id
        };
        _createScope = function(scope, cb) {
          return _this.oauthScopes.create(accountId, scope, null, cb);
        };
        return async.map(scopes, _createScope, function(err, createdScopes) {
          if (err) {
            return cb(err);
          }
          return _this.oauthApps.create(accountId, appData, {}, function(err, app) {
            if (err) {
              return cb(err);
            }
            clientId = app.clients[0].clientId;
            if (!clientId) {
              return cb(new Error("Failed to create app client"));
            }
            return _this.oauthAuth.createOrReuseTokenForUserId(user._id, clientId, null, null, null, function(err, token) {
              if (err) {
                return cb(err);
              }
              if (!token) {
                return cb(new Error("Failed to create token"));
              }
              token = {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken
              };
              return cb(null, app, user, token, createdScopes || []);
            });
          });
        });
      });
    };

    return AdminMethods;

  })();

}).call(this);

/*
//@ sourceMappingURL=admin-methods.js.map
*/