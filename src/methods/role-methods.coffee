_ = require 'underscore-ext'
PageResult = require('simple-paginator').PageResult
errors = require 'some-errors'
mongoose = require "mongoose"
ObjectId = mongoose.Types.ObjectId
mongooseRestHelper = require 'mongoose-rest-helper'


module.exports = class RoleMethods
  CREATE_FIELDS = ['_id','name','description','isInternal']
  UPDATE_FIELDS = ['name','description','isInternal']

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
    if _.isFunction(options)
      cb = options 
      options = {}

    objs.accountId = new ObjectId accountId.toString()

    model = new @models.Role(objs)
    model.save (err) =>
      return cb err if err
      cb null, model,true

  patch: (roleId, obj = {}, options={}, cb = ->) =>
    if _.isFunction(options)
      cb = options 
      options = {}

    @models.Role.findOne _id : roleId, (err,item) =>
      return cb err if err
      return cb new errors.NotFound("#{roleId}") unless item

      _.extendFiltered item, UPDATE_FIELDS, obj
      item.save (err) =>
        return cb err if err
        cb null, item


