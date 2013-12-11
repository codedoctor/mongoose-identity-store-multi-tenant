_ = require 'underscore-ext'
PageResult = require('simple-paginator').PageResult
errors = require 'some-errors'
mongoose = require "mongoose"
ObjectId = mongoose.Types.ObjectId
mongooseRestHelper = require 'mongoose-rest-helper'


module.exports = class RoleMethods
  UPDATE_EXCLUDEFIELDS = ['_id']

  constructor:(@models) ->

  all: (accountId,options = {},cb = ->) =>
    return cb new Error "accountId parameter is required." unless accountId

    settings = 
        baseQuery:
          accountId : mongooseRestHelper.asObjectId accountId
        defaultSort: 'name'
        defaultSelect: null
        defaultCount: 1000
    mongooseRestHelper.all @models.Role,settings,options, cb

  ###
  Get a role for it's id.
  ###
  get: (roleId,options = {}, cb = ->) =>
    return cb new Error "roleId parameter is required." unless roleId
    mongooseRestHelper.getById @models.Role,roleId,null,options, cb


  ###
  Completely destroys an organization.
  ###
  destroy: (roleId, options = {}, cb = ->) =>
    return cb new Error "roleId parameter is required." unless roleId
    settings = {}
    mongooseRestHelper.destroy @models.Role,roleId, settings,{}, cb





  ###
  Create a new processDefinition
  ###
  create:(accountId,objs = {}, options = {}, cb = ->) =>
    settings = {}
    objs.accountId = new ObjectId accountId.toString()
    mongooseRestHelper.create @models.Role,settings,objs,options,cb


  ###
  Updates a deployment
  ###
  patch: (scopeId, obj = {}, options = {}, cb = ->) =>
    return cb new Error "scopeId parameter is required." unless scopeId
    settings =
      exclude : UPDATE_EXCLUDEFIELDS
    mongooseRestHelper.patch @models.Role,scopeId, settings, obj, options, cb




