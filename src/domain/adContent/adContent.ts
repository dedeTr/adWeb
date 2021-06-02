import { UploadTwitterType } from "../../Usecase/adContent/types";
import { AdcontentType } from "./types";

export interface AdContentResource {
   uploadTwitter(data: UploadTwitterType): Promise<AdcontentType>
   getDataTwitter(category: string, res_total: number): Promise<AdcontentType[]>
   countViewsTwitter(arrId: string[]): Promise<boolean>
   getAllAd(username: string): Promise<AdcontentType[]>
 }
 
 export class AdContentDomain{
    private dbResource: AdContentResource
 
    constructor(dbResource: AdContentResource){
       this.dbResource = dbResource;
    }
 
    async uploadTwitter(data: UploadTwitterType): Promise<AdcontentType>{
        try {
           var result = await this.dbResource.uploadTwitter(data)
        } catch (error) {
           throw (error)
        }
  
        return result
     }

     async getDataTwitter(category: string, total_res: number): Promise<AdcontentType[]>{
      try {
         var result = await this.dbResource.getDataTwitter(category, total_res)
      } catch (error) {
         throw (error)
      }

      return result
   }

   async countViewsTwitter(arrid: string[]): Promise<boolean>{
      try {
         var result = await this.dbResource.countViewsTwitter(arrid)
      } catch (error) {
         throw (error)
      }

      return result
   }

   async getAllAd(username: string): Promise<AdcontentType[]>{
      try {
         var result = await this.dbResource.getAllAd(username)
      } catch (error) {
         throw (error)
      }

      return result
   }
 }