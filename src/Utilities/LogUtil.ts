import { Tables } from "../Mappers/Tables";

class LogUtil {

    /**
     * @TODO
     *
     * @static
     * @param {Tables} table
     * @param {string} message
     * @param {Error} error
     */
    public static Entry(table: Tables, message: string, error: Error) {
        // return new Promise((resolve, reject) => {
        //     this.Db.Connection.query(
        //         `SELECT * FROM achievements WHERE user_id = ${userId} AND  `,
        //         (err: any, rows: any) => {
        //             if (rows === undefined) {
        //                 reject(new Error("Error rows is undefined"));
        //             } else {
        //                 resolve(rows);
        //             }
        //         },
        //     );
        // });
    }
}

export default LogUtil;
