import { AccountAdminType, AccountPubType } from "./types";

export interface AccountAdminResource {
   getAccountAdmin(username: string): Promise<AccountAdminType | null>
   getAccountPub(username: string): Promise<AccountAdminType | null>
   insert(data: AccountAdminType): Promise<boolean>
   insertPub(data: AccountAdminType): Promise<boolean>
   getAPIKey(username: string): Promise<string>
   getAccountPubByAPIKey(API_KEY: string): Promise<AccountAdminType | null>
   addViewsPub(API_KEY: string, count: number): Promise<boolean>
}

export class AccountAdminDomain{
   private dbResource: AccountAdminResource

   constructor(dbResource: AccountAdminResource){
      this.dbResource = dbResource;
   }

   getAccountAdmin(username: string): Promise<AccountAdminType | null>{
      return this.dbResource.getAccountAdmin(username);
   }

   getAccountPub(username: string): Promise<AccountAdminType | null>{
      return this.dbResource.getAccountPub(username);
   }

   getAccountPubByAPIKey(API_KEY: string): Promise<AccountAdminType | null>{
      return this.dbResource.getAccountPubByAPIKey(API_KEY);
   }

   getAPIKey(username: string): Promise<string>{
      return this.dbResource.getAPIKey(username);
   }

   addViewsPub(API_KEY: string, count: number): Promise<boolean>{
      return this.dbResource.addViewsPub(API_KEY, count);
   }

   async insert(data: AccountAdminType): Promise<boolean>{
      //tracing.addContext('AccountDomain.insert')
      try {
         var result = await this.dbResource.insert(data)
      } catch (error) {
         //tracing.finishContext()
         throw (error)
      }

      //tracing.finishContext()
      return result
   }

   async insertPub(data: AccountPubType): Promise<boolean>{
      //tracing.addContext('AccountDomain.insert')
      try {
         var result = await this.dbResource.insertPub(data)
      } catch (error) {
         //tracing.finishContext()
         throw (error)
      }

      //tracing.finishContext()
      return result
   }
}