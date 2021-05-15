import mongodb from 'mongodb';
//import minio = require('minio');
import { InternalToolsConfig } from './config/config';
import { AccountAdminDomain } from './domain/account_admin/account_admin';
import { AccountAdminDBResource } from './domain/account_admin/database';
import { AdContentDomain } from './domain/adContent/adContent';
import { AdContentDBResource } from './domain/adContent/database';
import http from './server/http/http';
import { AccountUsecase } from './Usecase/account/account';
import { AdContentUsecase } from './Usecase/adCount/adCount';


type InternalToolsUsecase = {
   account: AccountUsecase
   adContent: AdContentUsecase
}

export var Usecase: InternalToolsUsecase;

async function initInternalTools(config: InternalToolsConfig){
   const dbConnection = await mongodb.connect(config.MongoDB.uri, { useNewUrlParser: true, useUnifiedTopology: true });
   const db = dbConnection.db(config.MongoDB.dbName);

   //init resource
   const accountAdminDBResource = new AccountAdminDBResource(db);
   const adCountDBResource = new AdContentDBResource(db)

   //init domain
   const accountAdminDomain = new AccountAdminDomain(accountAdminDBResource);
   const adContentDomain = new AdContentDomain(adCountDBResource)

   //init usecase
   Usecase = {
      account: new AccountUsecase(accountAdminDomain, config.AuthSecret),
      adContent: new AdContentUsecase(adContentDomain)
   }
}

function startInternalTools(){
   http.initHttpRoutes();

   http.startHttpServer();
}

export default {
   initInternalTools,
   startInternalTools
}