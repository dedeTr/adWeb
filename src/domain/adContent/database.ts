import mongodb from 'mongodb';
import { UploadTwitterType } from '../../Usecase/adContent/types';
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

   async getDataTwitter(category: string, res_total: number): Promise<AdcontentType[]> {
      try {
         var data = await this.collection.aggregate([{$match: { category: category }}, {$sample: { size: res_total}}]).toArray();
      } catch (error) {
         return Promise.reject(error);
      }

      return Promise.resolve(data);
   }

   async countViewsTwitter(arrId: string[]): Promise<boolean> {
      try {
         await this.collection.updateMany({id_iklan: {$in: arrId}}, { $inc: { views: 1 } })
      } catch (error) {
         return Promise.reject(error);
      }

      return Promise.resolve(true);
   }

   async getAllAd(username: string): Promise<AdcontentType[]> {
      try {
         var data = await this.collection.find({username}).toArray();
      } catch (error) {
         return Promise.reject(error);
      }

      return Promise.resolve(data);
   }
 }