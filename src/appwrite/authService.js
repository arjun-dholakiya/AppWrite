import config from '../config/config';
import { Client, Account, ID } from 'appwrite';

class AuthServices {
  client = new Client();
  account;

  constructor() {
    this.client
      .setProject(config.appwriteProjectId)
      .setEndpoint(config.appwriteUrl);
    this.account = new Account(this.client);
  }
  async createUser({ name, email, password }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (user) {
        // call another method
        return this.login({ email, password });
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authServices = new AuthServices();

export default authServices;
