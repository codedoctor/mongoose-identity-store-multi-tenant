_ = require 'underscore-ext'

Scope = require('../scope').Scope
PageResult = require('simple-paginator').PageResult
mongoose = require "mongoose"
ObjectId = mongoose.Types.ObjectId
mongooseRestHelper = require 'mongoose-rest-helper'


###
Provides methods to interact with the scope store.
###
module.exports = class OauthScopeMethods

  ###
  A hash of scopes.
  ###
  loadedScopes : {}

  ###
  Initializes a new instance of the @see ScopeMethods class.
  @param {Object} models A collection of models to be used within the auth framework.
  @description
  The config object looks like this:
  ...
  scopes: [...]
  ...
  ###
  constructor:(@models, config) ->
    if config && config.scopes
      for scopeDefinition in config.scopes
        scope = new Scope(scopeDefinition)

        if scope.isValid()
          @loadedScopes[scope.name] = scope
        else
          console.log "Invalid scope in config - skipped - #{JSON.stringify(scopeDefinition)}"
          # Todo: Better logging, error handling


  all:(accountId,options = {}, cb = ->) =>
    if _.isFunction(options)
      cb = options 
      options = {}

    options.count ||= 25
    options.offset ||= 0

    #TODO: when this is database driven, make sure you return the correct paging info
    cb null, new PageResult(@loadedScopes || [], _.keys(@loadedScopes).length, options.offset, options.count)

  get:(accountId,name, options = {}, cb = ->) =>
    if _.isFunction(options)
      cb = options 
      options = {}

    cb null, @loadedScopes[name]


  # INTERNAL FUNCTIONS
  ###
  Returns an array of all scope names
  @sync
  ###
  allScopeNamesAsArray: () =>
    _.pluck(_.values(@loadedScopes), "name")

  getScope:(scope) =>
    @loadedScopes[scope]


  ###
  Create a new processDefinition
  ###
  create:(accountId,objs = {}, options = {}, cb = ->) =>
    settings = {}
    objs.accountId = new ObjectId accountId.toString()
    mongooseRestHelper.create @models.Scope,settings,objs,options,cb


