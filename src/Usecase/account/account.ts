import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 

import { AccountAdminDomain } from "../../domain/account_admin/account_admin";
import {LoginParam, AuthPayloadData, RegisterParam, AdminProfileParam} from './types';
import { AdwebinternalError, commonError } from '../../error/error';
import {AccountAdminType, AccountPubType} from "../../domain/account_admin/types";

export class AccountUsecase{
   private accountAdminDomain: AccountAdminDomain;
   private authSecret: string;

   constructor(accountAdminDomain: AccountAdminDomain, authSecret: string){
      this.accountAdminDomain = accountAdminDomain;
      this.authSecret = authSecret;
   }

   async validateSession(token: string): Promise<AuthPayloadData>{
    try {
       var payload = <AuthPayloadData> jwt.verify(token, this.authSecret);
    } catch (error) {
       return Promise.reject(AdwebinternalError.unauthorized);
    }

    return Promise.resolve(payload);
   }

   async register(data: RegisterParam): Promise<void> {
      const accountAdmin: AccountAdminType = {
         username: data.username,
         full_name: data.full_name,
         email: data.email,
         password: await bcrypt.hash(data.password, 10),
         access: ""
      }

      try {
         var adminAccount = await this.accountAdminDomain.getAccountAdmin(data.username)
      } catch (error) {
         throw (commonError.databaseError(error.message))
      }

      if(adminAccount){
         throw (commonError.validationError("username is taken"))
      }

      try {
         await this.accountAdminDomain.insert(accountAdmin)
      } catch (error) {
         throw (commonError.databaseError(error.message))
      }

      return Promise.resolve()
   }

   async login(data: LoginParam): Promise<string> {
      try {
         var adminAccount = await this.accountAdminDomain.getAccountAdmin(data.username);
      } catch (error) {
         return Promise.reject(error);
      }

      if(!adminAccount){
         //tracing.finishContext()
         throw (commonError.validationError("Admin account not found!"))
      }

      if(!bcrypt.compareSync(data.password, adminAccount.password)){
         return Promise.reject(AdwebinternalError.wrongEmailOrPassword);
      }

      const payload: AuthPayloadData = {
         username: adminAccount.username,
         access: adminAccount.access
      }

      const token = jwt.sign(payload, this.authSecret, { expiresIn: '60m' });
      return Promise.resolve(token);
   }

   async registerPub(data: RegisterParam): Promise<void> {
      const accountAdmin: AccountPubType = {
         username: data.username,
         full_name: data.full_name,
         email: data.email,
         password: await bcrypt.hash(data.password, 10),
         api_key: data.username + "-" + Date.now().toString(),
         access: ""
      }

      try {
         var adminAccount = await this.accountAdminDomain.getAccountPub(data.username)
      } catch (error) {
         throw (commonError.databaseError(error.message))
      }

      if(adminAccount){
         throw (commonError.validationError("username is taken"))
      }

      try {
         await this.accountAdminDomain.insertPub(accountAdmin)
      } catch (error) {
         throw (commonError.databaseError(error.message))
      }

      return Promise.resolve()
   }

   async loginPub(data: LoginParam): Promise<string> {
      try {
         var adminAccount = await this.accountAdminDomain.getAccountPub(data.username);
      } catch (error) {
         return Promise.reject(error);
      }

      if(!adminAccount){
         //tracing.finishContext()
         throw (commonError.validationError("Account not found!"))
      }

      if(!bcrypt.compareSync(data.password, adminAccount.password)){
         return Promise.reject(AdwebinternalError.wrongEmailOrPassword);
      }

      const payload: AuthPayloadData = {
         username: adminAccount.username,
         access: adminAccount.access
      }

      const token = jwt.sign(payload, this.authSecret, { expiresIn: '60m' });
      return Promise.resolve(token);
   }

   async getAPIKey(username: string): Promise<string>{
      try {
         var apiKey = await this.accountAdminDomain.getAPIKey(username);
      } catch (error) {
         return Promise.reject(error);
      }

      return Promise.resolve(apiKey);
   }
}
