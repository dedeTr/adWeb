import mongodb from 'mongodb';
import { UploadTwitterType } from '../../Usecase/adCount/types';
import { AdContentResource } from './adContent';
import { AdcontentType } from './types';


export class AdContentDBResource implements AdContentResource {
    private collection: mongodb.Collection<AdcontentType>;
    private collectionName: string = 'adContent';
 
    constructor(db: mongodb.Db){
       this.collection = db.collection(this.collectionName);
    }
 
    async uploadTwitter(data: UploadTwitterType): Promise<AdcontentType> {
      try {
         await this.collection.insertOne(data);
      } catch (error) {
         return Promise.reject(error);
      }

      return Promise.resolve(data);
   }
 }