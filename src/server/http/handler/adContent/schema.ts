import joi from "@hapi/joi"

export const TwitterUploadSchema = function () {
    return joi.object().keys({
       url: joi.string().required(),
       description: joi.string().required(),
       expire: joi.number().required()
    })
 }

 export const TwitterGetSchema = function () {
   return joi.object().keys({
      url: joi.string().required(),
      width: joi.number().required(),
      total_res: joi.number().required(),
   })
}
 