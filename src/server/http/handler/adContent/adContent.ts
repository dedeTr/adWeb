import express from 'express';
import { commonError } from '../../../../error/error';
import { Usecase } from '../../../../initial';
import { TwitterGetSchema, TwitterUploadSchema } from './schema';

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

        var API_KEY = req.params.API_KEY
        var width = parseInt(req.params.width)
        var total_res = parseInt(req.params.total_res)
        
        try {
            var result = await Usecase.adContent.getTwitter(API_KEY, width, total_res )
        } catch (error) {
            return next(error)
        }

        return res.send({ success: true, data: result})
    }

    async getAllAdHandler(req: express.Request, res: express.Response, next: express.NextFunction) { 

        var username = req.user.username
        
        try {
            var result = await Usecase.adContent.getAllAd( username )
        } catch (error) {
            return next(error)
        }

        return res.send({ success: true, data: result})
    }
}