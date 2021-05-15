import express from 'express';
import { Usecase } from '../../../../initial';
import {commonError} from "../../../../error/error";
import { LoginSchema, RegisterSchema } from './schema';

export class AccountHandler {
   async registerHandler(req: express.Request, res: express.Response, next: express.NextFunction) {

      try {
         await RegisterSchema().validateAsync(req.body)
      } catch (error) {
         return next(commonError.validationError(error.message))
      }

      try {
         await Usecase.account.register(req.body)
      } catch (error) {
         return next(error)
      }

      return res.send({success: true})
   }

   async loginHandler(req: express.Request, res: express.Response, next: express.NextFunction) {

      try {
         await LoginSchema().validateAsync(req.body)
      } catch (error) {
         return next(commonError.validationError(error.message))
      }

      try {
         var token = await Usecase.account.login(req.body);
      } catch (error) {
         return next(error);
      }

      return res.send({success: true, username: req.body.username, token: token})
   }

   async registerPubHandler(req: express.Request, res: express.Response, next: express.NextFunction) {

      try {
         await RegisterSchema().validateAsync(req.body)
      } catch (error) {
         return next(commonError.validationError(error.message))
      }

      try {
         await Usecase.account.registerPub(req.body)
      } catch (error) {
         return next(error)
      }

      return res.send({success: true})
   }

   async loginPubHandler(req: express.Request, res: express.Response, next: express.NextFunction) {

      try {
         await LoginSchema().validateAsync(req.body)
      } catch (error) {
         return next(commonError.validationError(error.message))
      }

      try {
         var token = await Usecase.account.loginPub(req.body);
      } catch (error) {
         return next(error);
      }

      try {
         var api_key = await Usecase.account.getAPIKey(req.body.username);
      } catch (error) {
         return next(error);
      }

      return res.send({success: true, username: req.body.username, token, api_key})
   }
   
}
