(function() {
  var ObjectId, OrganizationMethods, PageResult, bcrypt, errors, isObjectId, mongoose, mongooseRestHelper, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = require('underscore-ext');

  errors = require('some-errors');

  PageResult = require('simple-paginator').PageResult;

  mongoose = require("mongoose");

  ObjectId = mongoose.Types.ObjectId;

  bcrypt = require('bcryptjs');

  mongooseRestHelper = require('mongoose-rest-helper');

  isObjectId = require('mongodb-objectid-helper').isObjectId;

  /*
  Provides methods to interact with scotties.
  */


  module.exports = OrganizationMethods = (function() {
    var CREATE_FIELDS, UPDATE_FIELDS;

    CREATE_FIELDS = ['name'];

    UPDATE_FIELDS = ['name', 'description', 'tags'];

    /*
    Initializes a new instance of the @see ScottyMethods class.
    @param {Object} models A collection of models that can be used.
    */


    function OrganizationMethods(models) {
      this.models = models;
      this.getByNameOrId = __bind(this.getByNameOrId, this);
      this.getByName = __bind(this.getByName, this);
      this.destroy = __bind(this.destroy, this);
      this.get = __bind(this.get, this);
      this.all = __bind(this.all, this);
      if (!this.models) {
        throw new Error("models parameter is required");
      }
    }

    OrganizationMethods.prototype.all = function(accountId, options, cb) {
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
      return mongooseRestHelper.all(this.models.Organization, settings, options, cb);
    };

    /*
    Looks up a user by id.
    */


    OrganizationMethods.prototype.get = function(organizationId, options, cb) {
      if (options == null) {
        options = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      if (!organizationId) {
        return cb(new Error("organizationId parameter is required."));
      }
      return mongooseRestHelper.getById(this.models.Organization, organizationId, null, options, cb);
    };

    /*
    Completely destroys an organization.
    */


    OrganizationMethods.prototype.destroy = function(organizationId, options, cb) {
      var settings;
      if (options == null) {
        options = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      if (!organizationId) {
        return cb(new Error("organizationId parameter is required."));
      }
      settings = {};
      return mongooseRestHelper.destroy(this.models.Organization, organizationId, settings, {}, cb);
    };

    OrganizationMethods.prototype.getByName = function(accountId, name, options, cb) {
      var _this = this;
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
      return this.models.Organization.findOne({
        name: name
      }, function(err, item) {
        if (err) {
          return cb(err);
        }
        return cb(null, item);
      });
    };

    OrganizationMethods.prototype.getByNameOrId = function(accountId, nameOrId, options, cb) {
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
      if (isObjectId(nameOrId)) {
        return this.get(nameOrId, cb);
      } else {
        return this.getByName(nameOrId, cb);
      }
    };

    return OrganizationMethods;

  })();

}).call(this);

/*
//@ sourceMappingURL=organization-methods.js.map
*/