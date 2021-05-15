import { UploadTwitterType } from "../../Usecase/adCount/types";
import { AdcontentType } from "./types";

export interface AdContentResource {
   uploadTwitter(data: UploadTwitterType): Promise<AdcontentType>
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
 }