mongoose = require 'mongoose'

module.exports = ScopeSchema = new mongoose.Schema
    accountId:
      type: mongoose.Schema.ObjectId
      require: true
    name:
      type : String
    description:
      type : String
      default: ''
    developerDescription:
      type : String
      default: ''
    roles:
      type: [String]
      default: -> []
  ,
    strict: true
    collection: 'identitymt.scopes'

ScopeSchema.index({ accountId: 1,name: 1 },{ unique: true, sparse: false} );
