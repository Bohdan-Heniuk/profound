import { unAuthorizedAxios, authorizedAxios } from "../config.js";

export class Auth {
  constructor() {
    this.prefix = "/auth";
  }

  async register(formData) {
    try {
      return unAuthorizedAxios.post(`${this.prefix}/registration`, formData);
    } catch (e) {
      console.log("Failed to register", e);
      throw e;
    }
  }

  async login(email, password) {
    try {
      return unAuthorizedAxios.post(`${this.prefix}/login`, {
        email,
        password,
      });
    } catch (e) {
      console.log("Failed to login", e.response.data);
      throw e;
    }
  }
}

export class Company {
  constructor() {
    this.prefix = "/company";
  }

  async update(companyId, formData) {
    try {
      return authorizedAxios.put(`${this.prefix}/${companyId}`, formData);
    } catch (e) {
      console.log("Failed to update company", e);
      throw e;
    }
  }

  async getById(companyId) {
    try {
      return authorizedAxios.get(`${this.prefix}/${companyId}`);
    } catch (e) {
      console.log("Failed to get company by id", e);
      throw e;
    }
  }
}

export class Vacancy {
  constructor() {
    this.prefix = "/vacancy";
  }

  async create(payload) {
    try {
      return authorizedAxios.post(`${this.prefix}`, payload);
    } catch (e) {
      console.log("Failed to get company by id", e);
      throw e;
    }
  }

  async getById(id) {
    try {
      return authorizedAxios.get(`${this.prefix}/${id}`);
    } catch (e) {
      console.log("Failed to get company by id", e);
      throw e;
    }
  }

  async getByFitler(filter) {
    try {
      return authorizedAxios.post(`${this.prefix}/filter`, filter);
    } catch (e) {
      console.log("Failed to get vacancies by filter", e);
      throw e;
    }
  }

  async getByUser() {
    try {
      return authorizedAxios.get(`${this.prefix}/byUser`);
    } catch (e) {
      console.log("Failed to get vacancies by user", e);
      throw e;
    }
  }

  async apply(id, formData) {
    try {
      return authorizedAxios.post(`${this.prefix}/${id}/apply`, formData);
    } catch (e) {
      console.log("Failed to apply for a vacancy", e);
      throw e;
    }
  }
}
