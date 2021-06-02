import { string } from "@hapi/joi";
import { AccountAdminDomain } from "../../domain/account_admin/account_admin";
import { AdContentDomain } from "../../domain/adContent/adContent";
import { AdcontentType } from "../../domain/adContent/types";
import { commonError } from "../../error/error";
import { Usecase } from "../../initial";
import { GetTwitterParam, GetTwitterType, UploadTwitterParam, UploadTwitterType } from "./types";

export class AdContentUsecase{
    private adContentDomain: AdContentDomain;
 
    constructor(adContentDomain: AdContentDomain){
       this.adContentDomain = adContentDomain;
    }
 
    async uploadTwitter(username:string, data: UploadTwitterParam): Promise<AdcontentType> {
        const today = Date.now();
        var dateExpired = today + (data.expire * 86400 )
        
        const dataTwitter: UploadTwitterType = {
           username,
           category: "twitter",
           url: data.url,
           description: data.description,
           time_start: today,
           time_expire: dateExpired,
           id_iklan: "twi-" + today.toString(),
           views: 0
        }
  
        try {
           var result = await this.adContentDomain.uploadTwitter(dataTwitter)
        } catch (error) {
           throw (commonError.databaseError(error.message))
        }
  
        return Promise.resolve(result)
     }

     async getTwitter(API_KEY: string, width: number, total_res: number): Promise<GetTwitterType[]> {

      try {
         var dataPub = await Usecase.account.getAccountPubByAPIKey(API_KEY);
      } catch (error) {
         throw (commonError.databaseError(error.message))
      }

      if(!dataPub){
         throw (commonError.dataNotFound("API KEY"))
      }

      try {
         var result = await this.adContentDomain.getDataTwitter("twitter", total_res)
      } catch (error) {
         throw (commonError.databaseError(error.message))
      }

      //if()
      
      const tag: GetTwitterType[] = result.map( data => {
         let obj = {
            embed_code: `<div style="border:1px solid silver; width: ${width}px; position: relative; padding: 15px"><img style="margin:0 auto; display:block" src="https://images.cooltext.com/5529149.png"/><blockquote class="twitter-tweet"><p lang="en" dir="ltr"></p><div></div><a href="${data.url}"></a></blockquote></div>`,
            description: data.description,
            category: data.category,
            id_iklan: data.id_iklan
         }
         return obj
      })

      const idIklanArr: string[] = result.map( data => {
         return data.id_iklan
      })

      try {
         await Usecase.account.addViewsPub(API_KEY, total_res)
      } catch (error) {
         throw (commonError.databaseError(error.message))
      }

      try {
         await this.adContentDomain.countViewsTwitter(idIklanArr)
      } catch (error) {
         throw (commonError.databaseError(error.message))
      }

      return Promise.resolve(tag)
   }

   async getAllAd(username:string): Promise<AdcontentType[]> {
      try {
         var result = await this.adContentDomain.getAllAd(username)
      } catch (error) {
         throw (commonError.databaseError(error.message))
      }

      return Promise.resolve(result)
   }
}