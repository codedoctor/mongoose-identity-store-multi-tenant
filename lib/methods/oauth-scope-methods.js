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
    var UPDATE_EXCLUDEFIELDS;

    UPDATE_EXCLUDEFIELDS = ['_id'];


    /*
    A hash of scopes.
     */


    /*
    Initializes a new instance of the @see ScopeMethods class.
    @param {Object} models A collection of models to be used within the auth framework.
    @description
    The config object looks like this:
    ...
    scopes: [...]
    ...
     */


    /*
    constructor:(@models, config) ->
      if config && config.scopes
        for scopeDefinition in config.scopes
          scope = new Scope(scopeDefinition)
    
          if scope.isValid()
            @loadedScopes[scope.name] = scope
          else
            console.log "Invalid scope in config - skipped - #{JSON.stringify(scopeDefinition)}"
             * Todo: Better logging, error handling
     */

    function OauthScopeMethods(models) {
      this.models = models;
      this.patch = __bind(this.patch, this);
      this.destroy = __bind(this.destroy, this);
      this.create = __bind(this.create, this);
      this.get = __bind(this.get, this);
      this.all = __bind(this.all, this);
    }


    /*
    Returns all the scopes for an account
     */

    OauthScopeMethods.prototype.all = function(accountId, options, cb) {
      var settings;
      if (options == null) {
        options = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      if (!accountId) {
        return cb(new Error("accountId parameter is required."));
      }
      settings = {
        baseQuery: {
          accountId: mongooseRestHelper.asObjectId(accountId)
        },
        defaultSort: 'name',
        defaultSelect: null,
        defaultCount: 1000
      };
      return mongooseRestHelper.all(this.models.Scope, settings, options, cb);
    };


    /*
    Get a scope for it's id.
     */

    OauthScopeMethods.prototype.get = function(scopeId, options, cb) {
      if (options == null) {
        options = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      if (!scopeId) {
        return cb(new Error("scopeId parameter is required."));
      }
      return mongooseRestHelper.getById(this.models.Scope, scopeId, null, options, cb);
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
      if (!accountId) {
        return cb(new Error("accountId parameter is required."));
      }
      settings = {};
      objs.accountId = new ObjectId(accountId.toString());
      return mongooseRestHelper.create(this.models.Scope, settings, objs, options, cb);
    };


    /*
    Completely destroys an organization.
     */

    OauthScopeMethods.prototype.destroy = function(scopeId, options, cb) {
      var settings;
      if (options == null) {
        options = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      if (!scopeId) {
        return cb(new Error("scopeId parameter is required."));
      }
      settings = {};
      return mongooseRestHelper.destroy(this.models.Scope, scopeId, settings, {}, cb);
    };


    /*
    Updates a deployment
     */

    OauthScopeMethods.prototype.patch = function(scopeId, obj, options, cb) {
      var settings;
      if (obj == null) {
        obj = {};
      }
      if (options == null) {
        options = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      if (!scopeId) {
        return cb(new Error("scopeId parameter is required."));
      }
      settings = {
        exclude: UPDATE_EXCLUDEFIELDS
      };
      return mongooseRestHelper.patch(this.models.Scope, scopeId, settings, obj, options, cb);
    };

    return OauthScopeMethods;

  })();

}).call(this);

//# sourceMappingURL=oauth-scope-methods.js.map
