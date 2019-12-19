import UserProvider from "../../Providers/UserProvider";
import Database from "../Database";

import UserMs from "./Users/UserMs";

class Microservice {
    protected Db: Database;
    protected User = UserProvider.User;

    constructor() {
        this.Db = new Database();
    }

    DbError(promiseRejection: any) {

        // log..


        promiseRejection(new Error("Error rows is undefined"));
    }

}

export default Microservice;
