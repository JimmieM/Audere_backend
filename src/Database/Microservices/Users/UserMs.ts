import { BlockedUsersMapperTable, DateRatingTable, Tables, UsersTable } from "../../../Mappers/Tables";
import Database from "../../Database";

import { IUserCreationOptions, IUserGateway, TimeUtil } from "auderecommon";
import PasswordAuth from "../../../Authentication/PasswordAuth";
import DbUtil from "../../../Utilities/DbUtil";

class UserMs implements IUserGateway {
    /**
     *
     * IUserGateway Implementation
     */

    /**
     * Get all the accepted matches
     *
     * @param {number} userId
     * @param {number} [dateProposalId]
     * @returns {Promise<any>}
     */
    public GetAllAcceptedMatches(userId: number, dateProposalId?: number): Promise<any> {
        throw new Error("Method not implemented. Use the Matches Microservice for this action.");
    }

    /**
     * Block user
     *
     * @param {number} userId
     * @param {number} blockUserId
     * @returns {Promise<boolean>}
     */
    public BlockUser(userId: number, blockUserId: number): Promise<boolean> {
        // Check if the this block already exists.
        return this.IsBlocked(blockUserId, userId).then((isBlocked: boolean) => {
            if (isBlocked) { return false; }
            return new Promise((resolve, reject) => {
                Database.Connection.query(
                    `INSERT INTO ${Tables.BlockedUsersMapper}
                    (${BlockedUsersMapperTable.UserId1}, ${BlockedUsersMapperTable.UserId2}, ${BlockedUsersMapperTable.Date})
                    VALUES
                    (${userId}, ${blockUserId}, ${TimeUtil.Timestamp()})`,
                    (err: any, rows: any) => {
                        if (err) {
                            reject(new Error("Failed to create a block!"));
                        } else {
                            resolve(true);
                        }
                    },
                );
            });
        });
    }

    /**
     * Returns base data of user
     *
     * @param {number} userId
     * @returns {Promise<any>}
     */
    public GetSimpleProfile(userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            Database.Connection.query(
                `SELECT ${UsersTable.Username}, ${UsersTable.FirstName}, ${UsersTable.LastName}, ${UsersTable.UserBirthDay}, ${UsersTable.Avatar} FROM ${Tables.Users} WHERE ${UsersTable.Id} = ${userId}`,
                (err: any, rows: any) => {
                    if (err) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(DbUtil.ParseRows(rows, Tables.Users));
                    }
                },
            );
        });
    }

    /**
     * GetProfile
     *
     * @param {number} userId
     * @returns {Promise<User>}
     */
    public GetProfile(userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            Database.Connection.query(
                `SELECT * FROM ${Tables.Users} WHERE ${UsersTable.Id} = ${userId}`,
                (err: any, rows: any) => {
                    if (err) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(DbUtil.ParseRows(rows, Tables.Users));
                    }
                },
            );
        });
    }

    /**
     * SetAvatar
     *
     * @param {number} userId
     * @param {string} avatar
     * @returns {Promise<boolean>}
     */
    public SetAvatar(userId: number, avatar: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Database.Connection.query(
                `UPDATE ${Tables.Users} SET ${UsersTable.Avatar} = ${avatar} WHERE ${UsersTable.Id} = ${userId}`,
                (err: any, rows: any) => {
                    if (!rows) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(true);
                    }
                },
            );
        });
    }

    /**
     * Login
     *
     * @param {string} username
     * @param {string} password
     * @returns {Promise<any>}
     */
    public Login(username: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Database.Connection.query(
                `SELECT ${UsersTable.Id} FROM users WHERE ${UsersTable.Username} = '${username}'  LIMIT 1`,
                (err: any, rows: any) => {
                    if (!rows) {
                        console.log(":" + rows);
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(DbUtil.ParseRows(rows, Tables.Users));
                    }
                },
            );
        });
    }

    /**
     * Register
     *
     * @param {string} email
     * @param {string} username
     * @param {string} password
     * @returns {Promise<any>}
     */
    // tslint:disable-next-line: max-line-length
    public Register(email: string, username: string, password: string, options: IUserCreationOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            Database.Connection.query(
                `INSERT INTO ${Tables.Users}
                (${UsersTable.Username},
                ${UsersTable.Email},
                ${UsersTable.FirstName},
                ${UsersTable.LastName},
                ${UsersTable.Avatar},
                ${UsersTable.EncryptedPassword},
                ${UsersTable.UserBirthDay})
                VALUES
                ('${username}',
                '${email}',
                '${options.Personal.Name.FirstName}',
                '${options.Personal.Name.LastName}',
                '${options.Avatar}',
                '${PasswordAuth.Hash(password)}')`,
                (err: any, rows: any) => {
                    if (!rows) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(DbUtil.ParseRows(rows, Tables.Users));
                    }
                },
            );
        });
    }

    /**
     * Micro methods Implementation
     */

    /**
     * GetUsername by User Identificiation
     *
     * @param {number} userId
     * @returns {Promise<string>}
     */
    public GetUsername(userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            Database.Connection.query(
                `SELECT ${UsersTable.Username} FROM ${Tables.Users} WHERE ${UsersTable.Id} = ${userId}`,
                (err: any, rows: any) => {
                    if (rows === undefined) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(DbUtil.ParseRows(rows, Tables.Users));
                    }
                },
            );
        });
    }


    /**
     * Checks if the first param is blocked by second param as Users.
     *
     * @private
     * @param {number} userId
     * @param {number} byUserId
     */
    private IsBlocked(userId: number, byUserId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Database.Connection.query(
                `SELECT * FROM ${Tables.BlockedUsersMapper} WHERE ${BlockedUsersMapperTable.UserId1} = ${byUserId} AND ${BlockedUsersMapperTable.UserId2} = ${userId}`,
                (err: any, rows: any) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    if (rows === undefined) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                },
            );
        });
    }

    /**
     * GetDateRatings
     *
     * @private
     * @param {number} userId
     * @returns {Promise<any>}
     */
    private GetDateRatings(userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            Database.Connection.query(
                `SELECT * FROM ${Tables.DateRatings} WHERE ${DateRatingTable.MatchUserId} = ${userId}`,
                (err: any, rows: any) => {
                    if (rows === undefined) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(DbUtil.ParseRows(rows, Tables.DateRatings));
                    }
                },
            );
        });
    }
}

export default UserMs;
