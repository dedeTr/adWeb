import joi from "@hapi/joi"

export const TwitterUploadSchema = function () {
    return joi.object().keys({
       embedded_code: joi.string().required(),
       description: joi.string().required(),
       expire: joi.number().required()
    })
 }
 