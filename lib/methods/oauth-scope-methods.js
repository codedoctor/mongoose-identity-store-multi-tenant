(function() {
  var OauthScopeMethods, ObjectId, PageResult, Scope, mongoose, mongooseRestHelper, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = require('underscore-ext');

  Scope = require('../scope').Scope;

  PageResult = require('simple-paginator').PageResult;

  mongoose = require("mongoose");

  ObjectId = mongoose.Types.ObjectId;

  mongooseRestHelper = require('mongoose-rest-helper');

  /*
  Provides methods to interact with the scope store.
  */


  module.exports = OauthScopeMethods = (function() {
    /*
    A hash of scopes.
    */

    OauthScopeMethods.prototype.loadedScopes = {};

    /*
    Initializes a new instance of the @see ScopeMethods class.
    @param {Object} models A collection of models to be used within the auth framework.
    @description
    The config object looks like this:
    ...
    scopes: [...]
    ...
    */


    function OauthScopeMethods(models, config) {
      var scope, scopeDefinition, _i, _len, _ref;
      this.models = models;
      this.create = __bind(this.create, this);
      this.getScope = __bind(this.getScope, this);
      this.allScopeNamesAsArray = __bind(this.allScopeNamesAsArray, this);
      this.get = __bind(this.get, this);
      this.all = __bind(this.all, this);
      if (config && config.scopes) {
        _ref = config.scopes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          scopeDefinition = _ref[_i];
          scope = new Scope(scopeDefinition);
          if (scope.isValid()) {
            this.loadedScopes[scope.name] = scope;
          } else {
            console.log("Invalid scope in config - skipped - " + (JSON.stringify(scopeDefinition)));
          }
        }
      }
    }

    OauthScopeMethods.prototype.all = function(accountId, options, cb) {
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
      options.count || (options.count = 25);
      options.offset || (options.offset = 0);
      return cb(null, new PageResult(this.loadedScopes || [], _.keys(this.loadedScopes).length, options.offset, options.count));
    };

    OauthScopeMethods.prototype.get = function(accountId, name, options, cb) {
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
      return cb(null, this.loadedScopes[name]);
    };

    /*
    Returns an array of all scope names
    @sync
    */


    OauthScopeMethods.prototype.allScopeNamesAsArray = function() {
      return _.pluck(_.values(this.loadedScopes), "name");
    };

    OauthScopeMethods.prototype.getScope = function(scope) {
      return this.loadedScopes[scope];
    };

    /*
    Create a new processDefinition
    */


    OauthScopeMethods.prototype.create = function(accountId, objs, options, cb) {
      var settings;
      if (objs == null) {
        objs = {};
      }
      if (options == null) {
        options = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      settings = {};
      objs.accountId = new ObjectId(accountId.toString());
      return mongooseRestHelper.create(this.models.Scope, settings, objs, options, cb);
    };

    return OauthScopeMethods;

  })();

}).call(this);

/*
//@ sourceMappingURL=oauth-scope-methods.js.map
*/