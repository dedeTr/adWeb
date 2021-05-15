import joi from '@hapi/joi';

export const LoginSchema = function () {
   return joi.object().keys({
      username: joi.string().required(),
      password: joi.string().required()
   });
}

export const RegisterSchema = function () {
   return joi.object().keys({
      username: joi.string().required(),
      full_name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required()
   })
}

