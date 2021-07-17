# Bicycle Library Common

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

Bicycle Library NodeJS develop by BBB-Team

### Component Service Approve
  - BBB-Auth
  - BBB-Notify
  - BBB-Billing
  - BBB-Support

### What dose this library have ?
Library is split with 3 main section include =>
- Component Authentication:
  - Jwt handler
  - Session handler
  - Grant permission, group permission
  - Library encrypt data
- Component Standard
  - Database: common function handler mongodb, redis ...
  - Error: group error common exception handler
  - Social: social network function support (facebook, google, twitter ...)
- Component Common
  - Util service: validator, string, object, mongoose util handler
  - Model: all model common from library
  - Logger: logging application

### How to used library
You need pull submodule with path specifield project: root_path_project/src/libs. Before config variable from file config.lib references file lib.config on src 

Note: Library only internal support service on BicycleBlueBook.
