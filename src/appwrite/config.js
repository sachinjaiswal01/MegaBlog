import conf from '../conf/conf.js';
import { Client, Account, ID, Databases } from "appwrite";

export class Service{
    client = new Client();
    database;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjecrId);
        this.database = new Databases(this.client);
        this.bucket = new Storage ( this.client)
    }

    async createPost({title,slug,content, featuredImage,status,userId}){
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwwriteCollectionId,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log(error);
        }
    }
    
    async updatePost ({slug,title,content, featuredImage,status,userId}){
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service::updatepost::error",error)
        }
    }

    async deletePost({slug}){
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwwriteCollectionId,slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error",error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwwriteCollectionId,slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);
            return false
        }
    } 

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);
            return false
        }
    }

    //file upload services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error",error);
            return false
        }

    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error",error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
    
}


const service = new Service()
export default service