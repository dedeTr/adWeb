import express from 'express';
import { Usecase } from '../../../initial';

export class SessionMiddleware {
   async validateSessionMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
      const token = <string>req.header('adweb-token');

      try {
         var authData = await Usecase.account.validateSession(token);
      } catch (error) {
         throw next(error)
      }

      req.user = authData;
      return next();
   }

   async validateSessionFromQueryMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
      const token = <string>req.query.token

      try {
         var authData = await Usecase.account.validateSession(token);
      } catch (error) {
         throw next(error)
      }

      req.user = authData;
      return next();
   }
}