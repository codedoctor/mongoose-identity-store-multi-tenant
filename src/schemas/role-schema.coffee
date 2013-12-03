mongoose = require 'mongoose'

module.exports = RoleSchema = new mongoose.Schema
  accountId:
    type: mongoose.Schema.ObjectId
    require: true
  name:
    type : String
    unique: true
  description:
    type : String
  isInternal:
    type : Boolean
    default: false

