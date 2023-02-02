import {Auth, Company, Vacancy} from './ds.js'

class DataService{
    get auth() {
        return new Auth();
    }
    get vacancy(){
        return new Vacancy();
    }
    get company(){
        return new Company();
    }
}

export default new DataService();