(function() {
  var AdminMethods, EmailSchema, EntityMethods, OauthAccessGrantSchema, OauthAccessTokenSchema, OauthAppMethods, OauthAppSchema, OauthAuthMethods, OauthClientSchema, OauthRedirectUriSchema, OauthScopeMethods, OrganizationMethods, OrganizationSchema, RoleMethods, RoleSchema, ScopeSchema, Store, UserIdentitySchema, UserImageSchema, UserMethods, UserProfileSchema, UserSchema, mongoose, _;

  mongoose = require('mongoose');

  _ = require('underscore');

  UserSchema = require('./schemas/user-schema');

  OrganizationSchema = require('./schemas/organization-schema');

  UserIdentitySchema = require('./schemas/user-identity-schema');

  UserImageSchema = require('./schemas/user-image-schema');

  UserProfileSchema = require('./schemas/user-profile-schema');

  EmailSchema = require('./schemas/email-schema');

  OauthAccessGrantSchema = require('./schemas/oauth-access-grant-schema');

  OauthAccessTokenSchema = require('./schemas/oauth-access-token-schema');

  OauthAppSchema = require('./schemas/oauth-app-schema');

  OauthRedirectUriSchema = require('./schemas/oauth-redirect-uri-schema');

  OauthClientSchema = require('./schemas/oauth-client-schema');

  RoleSchema = require('./schemas/role-schema');

  ScopeSchema = require('./schemas/scope-schema');

  UserMethods = require('./methods/user-methods');

  OrganizationMethods = require('./methods/organization-methods');

  EntityMethods = require('./methods/entity-methods');

  OauthAppMethods = require('./methods/oauth-app-methods');

  OauthAuthMethods = require('./methods/oauth-auth-methods');

  OauthScopeMethods = require('./methods/oauth-scope-methods');

  AdminMethods = require('./methods/admin-methods');

  RoleMethods = require('./methods/role-methods');

  module.exports = Store = (function() {
    /*
    Initializes a new instance of the {Store}
    @param [Object] settings configuration options for this store
    @param settings [Function] initializeSchema optional function that is called with the schema before it is converted to a model.
    @param settings [Boolean] autoIndex defaults to true and updates the db indexes on load. Should be off for production.
    */

    function Store(settings) {
      var m, schema, _i, _j, _len, _len1, _ref, _ref1;
      this.settings = settings != null ? settings : {};
      _.defaults(this.settings, {
        autoIndex: true,
        initializeSchema: function(schema) {}
      });
      this.schemas = [UserSchema, UserIdentitySchema, UserImageSchema, UserProfileSchema, EmailSchema, OrganizationSchema, OauthAccessGrantSchema, OauthAccessTokenSchema, OauthAppSchema, OauthRedirectUriSchema, OauthClientSchema, RoleSchema, ScopeSchema];
      _ref = this.schemas;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        schema = _ref[_i];
        this.settings.initializeSchema(schema);
      }
      _ref1 = this.schemas;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        schema = _ref1[_j];
        schema.set('autoIndex', this.settings.autoIndex);
      }
      m = mongoose;
      if (this.settings.connection) {
        m = this.settings.connection;
      }
      this.models = {
        User: m.model("User", UserSchema),
        Role: m.model("Role", RoleSchema),
        Organization: m.model("Organization", OrganizationSchema),
        OauthAccessGrant: m.model("OAuthAccessGrant", OauthAccessGrantSchema),
        OauthAccessToken: m.model("OauthAccessToken", OauthAccessTokenSchema),
        OauthApp: m.model("OauthApp", OauthAppSchema),
        Scope: m.model("Scope", ScopeSchema)
      };
      this.users = new UserMethods(this.models);
      this.organizations = new OrganizationMethods(this.models);
      this.entities = new EntityMethods(this.models);
      this.oauthScopes = new OauthScopeMethods(this.models);
      this.oauthApps = new OauthAppMethods(this.models, this.oauthScopes);
      this.oauthAuth = new OauthAuthMethods(this.models);
      this.admin = new AdminMethods(this.models, this.users, this.oauthApps, this.oauthAuth, this.oauthScopes);
      this.roles = new RoleMethods(this.models);
    }

    return Store;

  })();

}).call(this);

/*
//@ sourceMappingURL=store.js.map
*/