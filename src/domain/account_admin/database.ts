import mongodb from 'mongodb';
import { AccountAdminResource } from "./account_admin";
import { AccountAdminType, AccountPubType } from './types';
import { commonError } from '../../error/error';

export class AccountAdminDBResource implements AccountAdminResource {
   private collection: mongodb.Collection<AccountAdminType>;
   private collectionPub: mongodb.Collection<AccountPubType>;
   private collectionName: string = 'admin_account';
   private collectionNamePub: string = 'publisher_account';

   constructor(db: mongodb.Db){
      this.collection = db.collection(this.collectionName);
      this.collectionPub = db.collection(this.collectionNamePub);
   }

   async insert(data: AccountAdminType): Promise<boolean> {
      try {
         await this.collection.insertOne(data);
      } catch (error) {
         return Promise.reject(error);
      }

      return Promise.resolve(true);
   }

   async insertPub(data: AccountPubType): Promise<boolean> {
      try {
         await this.collectionPub.insertOne(data);
      } catch (error) {
         return Promise.reject(error);
      }

      return Promise.resolve(true);
   }

   async getAccountAdmin(username: string): Promise<AccountAdminType | null>{
      try {
         var account = await this.collection.findOne({ username: username });
      } catch (error) {
         return Promise.reject(commonError.databaseError(error.message));
      }

      if (!account) {
         return Promise.resolve(null);
      }

      return Promise.resolve(account);
   }

   async getAccountPub(username: string): Promise<AccountAdminType | null>{
      try {
         var account = await this.collectionPub.findOne({ username: username });
      } catch (error) {
         return Promise.reject(commonError.databaseError(error.message));
      }

      if (!account) {
         return Promise.resolve(null);
      }

      return Promise.resolve(account);
   }

   async getAPIKey(username: string): Promise<string>{
      try {
         var account = await this.collectionPub.findOne({ username: username });
      } catch (error) {
         return Promise.reject(commonError.databaseError(error.message));
      }

      if (!account) {
         return Promise.reject(commonError.databaseError("error apikey"))
      }

      return Promise.resolve(account.api_key);
   }
}