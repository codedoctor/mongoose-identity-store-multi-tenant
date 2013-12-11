(function() {
  var ObjectId, PageResult, RoleMethods, errors, mongoose, mongooseRestHelper, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = require('underscore-ext');

  PageResult = require('simple-paginator').PageResult;

  errors = require('some-errors');

  mongoose = require("mongoose");

  ObjectId = mongoose.Types.ObjectId;

  mongooseRestHelper = require('mongoose-rest-helper');

  module.exports = RoleMethods = (function() {
    var UPDATE_FIELDS;

    UPDATE_FIELDS = ['name', 'description', 'isInternal'];

    function RoleMethods(models) {
      this.models = models;
      this.patch = __bind(this.patch, this);
      this.create = __bind(this.create, this);
      this.destroy = __bind(this.destroy, this);
      this.get = __bind(this.get, this);
      this.all = __bind(this.all, this);
    }

    RoleMethods.prototype.all = function(accountId, options, cb) {
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
      return mongooseRestHelper.all(this.models.Role, settings, options, cb);
    };

    /*
    Get a role for it's id.
    */


    RoleMethods.prototype.get = function(roleId, options, cb) {
      if (options == null) {
        options = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      if (!roleId) {
        return cb(new Error("roleId parameter is required."));
      }
      return mongooseRestHelper.getById(this.models.Role, roleId, null, options, cb);
    };

    /*
    Completely destroys an organization.
    */


    RoleMethods.prototype.destroy = function(roleId, options, cb) {
      var settings;
      if (options == null) {
        options = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      if (!roleId) {
        return cb(new Error("roleId parameter is required."));
      }
      settings = {};
      return mongooseRestHelper.destroy(this.models.Role, roleId, settings, {}, cb);
    };

    /*
    Create a new processDefinition
    */


    RoleMethods.prototype.create = function(accountId, objs, options, cb) {
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
      return mongooseRestHelper.create(this.models.Role, settings, objs, options, cb);
    };

    RoleMethods.prototype.patch = function(roleId, obj, options, cb) {
      var _this = this;
      if (obj == null) {
        obj = {};
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
      return this.models.Role.findOne({
        _id: roleId
      }, function(err, item) {
        if (err) {
          return cb(err);
        }
        if (!item) {
          return cb(new errors.NotFound("" + roleId));
        }
        _.extendFiltered(item, UPDATE_FIELDS, obj);
        return item.save(function(err) {
          if (err) {
            return cb(err);
          }
          return cb(null, item);
        });
      });
    };

    return RoleMethods;

  })();

}).call(this);

/*
//@ sourceMappingURL=role-methods.js.map
*/