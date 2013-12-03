(function() {
  var OauthAppMethods, PageResult, errors, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = require('underscore-ext');

  errors = require('some-errors');

  PageResult = require('simple-paginator').PageResult;

  module.exports = OauthAppMethods = (function() {
    var APP_CREATE_FIELDS, KEY_LENGTH, SECRET_LENGTH;

    KEY_LENGTH = 20;

    SECRET_LENGTH = 40;

    APP_CREATE_FIELDS = ['name', 'websiteUrl', 'imageUrl', 'notes', 'tosAcceptanceDate', 'scope', 'description', 'acceptTermsOfService', 'isPublished', 'organizationName', 'organizationUrl'];

    function OauthAppMethods(models, scopeMethods) {
      this.models = models;
      this.scopeMethods = scopeMethods;
      this.updateApp = __bind(this.updateApp, this);
      this.update = __bind(this.update, this);
      this.resetAppKeys = __bind(this.resetAppKeys, this);
      this.deleteApp = __bind(this.deleteApp, this);
      this["delete"] = __bind(this["delete"], this);
      this.getApp = __bind(this.getApp, this);
      this.getAppsForUser = __bind(this.getAppsForUser, this);
      this.all = __bind(this.all, this);
      this.create = __bind(this.create, this);
      if (!this.models) {
        throw new Error("models parameter is required");
      }
      if (!this.scopeMethods) {
        throw new Error("scopeMethods parameter is required");
      }
    }

    OauthAppMethods.prototype.create = function(objs, actor, cb) {
      var data, model, oAuthClient, optionalClientId, optionalSecret,
        _this = this;
      if (objs == null) {
        objs = {};
      }
      if (!actor) {
        throw new Error("actor parameter is required");
      }
      optionalClientId = objs.clientId;
      optionalSecret = objs.secret;
      data = {};
      _.extendFiltered(data, APP_CREATE_FIELDS, objs);
      data.createdBy = actor;
      data.scopes = this.scopeMethods.allScopeNamesAsArray();
      model = new this.models.OauthApp(data);
      if (objs.callbackUrl) {
        model.redirectUrls.push(new this.models.OauthRedirectUri({
          uri: objs.callbackUrl
        }));
      }
      oAuthClient = new this.models.OauthClient();
      if (optionalClientId) {
        oAuthClient.clientId = optionalClientId;
      }
      if (optionalSecret) {
        oAuthClient.secret = optionalSecret;
      }
      model.clients.push(oAuthClient);
      return model.save(function(err) {
        if (err) {
          return cb(err);
        }
        return cb(null, model);
      });
    };

    OauthAppMethods.prototype.all = function(offset, count, cb) {
      var _this = this;
      if (offset == null) {
        offset = 0;
      }
      if (count == null) {
        count = 25;
      }
      return this.models.OauthApp.count(function(err, totalCount) {
        if (err) {
          return cb(err);
        }
        return _this.models.OauthApp.find({}, null, {
          skip: offset,
          limit: count
        }, function(err, items) {
          if (err) {
            return cb(err);
          }
          return cb(null, new PageResult(items || [], totalCount, offset, count));
        });
      });
    };

    OauthAppMethods.prototype.getAppsForUser = function(owningUserId, offset, count, cb) {
      var _this = this;
      if (offset == null) {
        offset = 0;
      }
      if (count == null) {
        count = 25;
      }
      owningUserId = owningUserId.toString();
      return this.models.OauthApp.find({
        'createdBy.actorId': owningUserId
      }).count(function(err, totalCount) {
        if (err) {
          return cb(err);
        }
        return _this.models.OauthApp.find({
          'createdBy.actorId': owningUserId
        }, null, {
          skip: offset,
          limit: count
        }, function(err, items) {
          if (err) {
            return cb(err);
          }
          return cb(null, new PageResult(items || [], totalCount, offset, count));
        });
      });
    };

    OauthAppMethods.prototype.getApp = function(oauthAppId, cb) {
      var _this = this;
      return this.models.OauthApp.findOne({
        _id: oauthAppId
      }, function(err, item) {
        if (err) {
          return cb(err);
        }
        return cb(null, item);
      });
    };

    OauthAppMethods.prototype["delete"] = function(oauthAppId, cb) {
      return this.deleteApp(oauthAppId, cb);
    };

    OauthAppMethods.prototype.deleteApp = function(oauthAppId, cb) {
      var _this = this;
      return this.models.OauthApp.remove({
        _id: oauthAppId
      }, function(err) {
        if (err) {
          return cb(err);
        }
        return cb(null);
      });
    };

    OauthAppMethods.prototype.resetAppKeys = function(oauthAppId, cb) {
      var _this = this;
      return this.models.OauthApp.findOne({
        _id: oauthAppId
      }, function(err, item) {
        if (err) {
          return cb(err);
        }
        item.clients[0].clientId = passgen.create(KEY_LENGTH);
        item.clients[0].secret = passgen.create(SECRET_LENGTH);
        return item.save(function(err) {
          if (err) {
            return cb(err);
          }
          return cb(null, item);
        });
      });
    };

    OauthAppMethods.prototype.update = function(oauthAppId, data, cb) {
      if (data == null) {
        data = {};
      }
      return this.updateApp(oauthAppId, data, cb);
    };

    OauthAppMethods.prototype.updateApp = function(oauthAppId, data, cb) {
      var _this = this;
      if (data == null) {
        data = {};
      }
      return this.models.OauthApp.findOne({
        _id: oauthAppId
      }, function(err, item) {
        if (err) {
          return cb(err);
        }
        _.extend(item, data);
        return item.save(function(err) {
          if (err) {
            return cb(err);
          }
          return cb(null, item);
        });
      });
    };

    return OauthAppMethods;

  })();

}).call(this);

/*
//@ sourceMappingURL=oauth-app-methods.js.map
*/