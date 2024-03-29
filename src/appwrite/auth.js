import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";
export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // call another method to login
                return this.login(email, password)
            }
            else {
                return userAccount
            }

        } catch (error) {
            console.log("error in Auth Service/userAccount create")
            throw new Error(error)
        }
    }
    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);


        } catch (error) {
            console.log("error in Auth Service/login create")

            throw new Error(error)
        }
    }
    async getCurrentUser() {
        try {
            const response = await this.account.get()
            console.log('user login status', response)
            return response
        } catch (error) {
            console.error('error in authservice/getuser', error.message);
            // throw new Error(error)
        }
        return null;
    }
    async logout() {
        try {
            return await this.account.deleteSessions();

        } catch (error) {
            console.error('error in authservice/logout', error);

        }
    }
}
const authservice = new AuthService()
export default authservice