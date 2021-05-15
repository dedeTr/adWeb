import dotenv from 'dotenv'
import initial from './initial';
import { InternalToolsConfig } from './config/config';
import { AuthPayloadData } from './Usecase/account/types';
//import { Client as MinioClient } from 'minio';

//extend express Request type definition
declare global {
   namespace Express{
      interface Request{
         user: AuthPayloadData
      }
   }
}

dotenv.config()
const config: InternalToolsConfig = require(`./../config/${process.env.ENV}.config.json`);
// var minioClient = new MinioClient({
//    endPoint: config.Minio.host,
//    accessKey: config.Minio.accessKey,
//    secretKey: config.Minio.secretKey
// });

initial.initInternalTools(config).then(result => {
   console.log('engine inintialized');

   initial.startInternalTools();
}).catch(error => {
   console.log(error);
})