import express from 'express';
import { commonError } from '../../../../error/error';
import { Usecase } from '../../../../initial';
import { TwitterUploadSchema } from './schema';

export class AdContentHandler{
    async twitterUploadHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            await TwitterUploadSchema().validateAsync(req.body)
        } catch (error) {
            return next(commonError.validationError(error.message))
        }
        
        try {
            var result = await Usecase.adContent.uploadTwitter(req.user.username, req.body)
        } catch (error) {
            return next(error)
        }

        return res.send({ success: true, data: result})
    }

    async twittergetHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            await TwitterUploadSchema().validateAsync(req.body)
        } catch (error) {
            return next(commonError.validationError(error.message))
        }
        
        try {
            var result = await Usecase.adContent.uploadTwitter(req.user.username, req.body)
        } catch (error) {
            return next(error)
        }

        return res.send({ success: true, data: result})
    }
}