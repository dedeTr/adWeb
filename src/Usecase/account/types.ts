export type LoginParam = {
    username: string
    password: string
 }
 
 export type RegisterParam = {
    username: string
    full_name: string
    email: string
    password: string
 }
 
 export type AdminProfileParam = {
    username: string
    full_name: string
    email: string
 }
 
 export type AuthPayloadData = {
    username: string
    access: string
 }