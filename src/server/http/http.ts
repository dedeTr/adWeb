import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
//import file_upload from 'express-fileupload'
import { AdwebError, commonError } from '../../error/error';
import { SessionMiddleware } from './middleware/session';
import { AccountHandler } from './handler/account/account';
import { AdContentHandler } from './handler/adContent/adContent';

const app = express();
app.enable('trust proxy')
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'])
app.use(cors())

app.set('views', path.join(__dirname, '../../../file/html'));
app.set('view engine', 'ejs');

// app.use(file_upload({
//    limits: { fileSize: 100 * 1024 * 1024 }
// }))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, '../../../file/assets')));

//app.use(logEventMiddleware)
app.get('/', function (req, res, next) {
   res.send('ok')
})

app.use(morgan('combined'));

function initHttpRoutes(){
   const sessionMiddleware = new SessionMiddleware()

   const accountHandler = new AccountHandler()
   const adContentHandler = new AdContentHandler()

    //pengiklan
    app.post('/register', accountHandler.registerHandler);
    app.post('/login', accountHandler.loginHandler);
    app.post('/upload/twitter', sessionMiddleware.validateSessionMiddleware, adContentHandler.twitterUploadHandler)
    
    //publisher
    app.post('/publisher-register', accountHandler.registerPubHandler);
    app.post('/publisher-login', accountHandler.loginPubHandler);
    app.get('/get/twitter', sessionMiddleware.validateSessionMiddleware, adContentHandler.twitterUploadHandler)

   //error handler
   app.use(function(err: AdwebError, req: express.Request, res: express.Response, next: express.NextFunction){
      console.error(`[AdwebError] ${JSON.stringify(err)}`);
      
      if(!err.httpStatus){
         console.error(`[AdwebError][InternalServerError] ${err.message}`);
         err = commonError.libraryError(err.message);
      }

      res.status(err.httpStatus).send({
         succes: false,
         error: err
      });
   });
}

function startHttpServer(){
   const port = process.env.PORT || 4000;
   app.listen(port, function(){
      console.log(`http server started on port ${port}`);
   });
}

export default {
   initHttpRoutes,
   startHttpServer
}