import { AdContentDomain } from "../../domain/adContent/adContent";
import { AdcontentType } from "../../domain/adContent/types";
import { commonError } from "../../error/error";
import { UploadTwitterParam, UploadTwitterType } from "./types";

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
           embedded_code: data.embedded_code,
           description: data.description,
           time_start: today,
           time_expire: dateExpired,
           id_iklan: "twi-" + today.toString()
        }
  
        try {
           var result = await this.adContentDomain.uploadTwitter(dataTwitter)
        } catch (error) {
           throw (commonError.databaseError(error.message))
        }
  
        return Promise.resolve(result)
     }
}