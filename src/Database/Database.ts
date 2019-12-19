import mysql from "mysql";
import { Settings } from "../Settings/Settings";

class Database {
    public static get Connection() {
        return this._connection || (this._connection = this.GetConnection());
    }

    public static Disconnect = () => {
        // _connection.end((err) => {
        //     console.log(err);
        // });
    }
    // tslint:disable-next-line: variable-name
    private static _connection: mysql.Connection;

    private static GetConnection = () => {
        const conn = mysql.createConnection({
            host: Settings.DATABASE.MYSQL.HOST,
            password: Settings.DATABASE.MYSQL.PASSWORD,
            user: Settings.DATABASE.MYSQL.USER,
            database: Settings.DATABASE.MYSQL.DATABASE,
            port: 8889,
        });

        conn.connect((err) => {
            if (err) {
                console.log(err);

                throw new Error("Failed to connect to DB");
            }
        });
        return conn;
    }
}

export default Database;
