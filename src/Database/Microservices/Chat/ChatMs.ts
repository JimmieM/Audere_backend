import { ChatTable, Tables } from "../../../Mappers/Tables";
import DbUtil from "../../../Utilities/DbUtil";
import Database from "../../Database";

class ChatMs {
    private CHAT_LIMIT = 50;

    /**
     * get latest chat message
     *
     * @param {number} userId1
     * @param {number} userId2
     * @returns {Promise<any>}
     */
    public GetLatestChatMessage(userId1: number, userId2: number): Promise<any> {
        return new Promise((resolve, reject) => {
            Database.Connection.query(
                `SELECT * FROM ${Tables.Chats}
                WHERE
                (${ChatTable.ToUserId} = ${userId2} AND ${ChatTable.FromUserId} = ${userId1})
                OR
                (${ChatTable.ToUserId} = ${userId1} AND ${ChatTable.FromUserId} = ${userId2})
                ORDER BY ${ChatTable.DateSent} ASC
                LIMIT 1`,
                (err: any, rows: any) => {
                    if (rows) {
                        resolve(DbUtil.ParseRows(rows, Tables.Chats));
                    } else {
                        resolve(null);
                    }

                },
            );
        });
    }

    /**
     * Returns chats
     *
     * @param {number} userId1
     * @param {number} userId2
     * @param {number} [limit=this.CHAT_LIMIT]
     * @returns {Promise<any>}
     */
    public GetChats(userId1: number, userId2: number, limit: number = this.CHAT_LIMIT): Promise<any> {
        return new Promise((resolve, reject) => {
            Database.Connection.query(
                `SELECT * FROM ${Tables.Chats}
                WHERE 
                (${ChatTable.ToUserId} = ${userId2} AND ${ChatTable.FromUserId} = ${userId1})
                OR
                (${ChatTable.ToUserId} = ${userId1} AND ${ChatTable.FromUserId} = ${userId2})
                ORDER BY ASC`,
                (err: any, rows: any) => {
                    if (err) {
                        reject(null);
                    } else {
                        resolve(DbUtil.ParseRows(rows, Tables.Chats));
                    }
                },
            );
        });
    }

}

export default ChatMs;
