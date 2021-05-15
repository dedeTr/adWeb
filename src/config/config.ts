export type InternalToolsConfig = {
    MongoDB: MongoDBConfig
    AuthSecret: string
}
 
 export type MongoDBConfig = {
    uri: string,
    dbName: string
 }
 