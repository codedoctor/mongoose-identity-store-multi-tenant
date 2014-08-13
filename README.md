[![Build Status](https://travis-ci.org/codedoctor/mongoose-identity-store-multi-tenant.svg?branch=master)](https://travis-ci.org/codedoctor/mongoose-identity-store-multi-tenant)
[![Coverage Status](https://img.shields.io/coveralls/codedoctor/mongoose-identity-store-multi-tenant.svg)](https://coveralls.io/r/codedoctor/mongoose-identity-store-multi-tenant)
[![Dependency Status](https://gemnasium.com/codedoctor/mongoose-identity-store-multi-tenant.svg)](https://gemnasium.com/codedoctor/mongoose-identity-store-multi-tenant)


mongoose-identity-store-multi-tenant
===========================

## DEPRECIATION WARNING

This module has been depreciated and is superseded by specific modules for [user management](https://www.npmjs.org/package/mongoose-user-store-multi-tenant) and [oauth management](https://www.npmjs.org/package/mongoose-oauth-store-multi-tenant):

[![NPM Version](http://img.shields.io/npm/v/mongoose-user-store-multi-tenant.svg)](https://www.npmjs.org/package/mongoose-user-store-multi-tenant)
[![NPM Version](http://img.shields.io/npm/v/mongoose-oauth-store-multi-tenant.svg)](https://www.npmjs.org/package/mongoose-oauth-store-multi-tenant)

Upgrading should be straight forward, except that accountId has been replaced with _tenantId in all schemas and the admin module has been split in two (basically, call the one in user first, then the one in oauth)

## Copyright

Copyright (c) 2012 Martin Wawrusch See LICENSE for
further details.


