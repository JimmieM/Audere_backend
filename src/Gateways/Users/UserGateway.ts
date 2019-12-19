import { IUserCreationOptions, IUserGateway, User } from "auderecommon";
import UserFactory from "../../Database/Factories/UserFactory";
import { Tables, UsersTable } from "../../Mappers/Tables";
import Gateway from "../Gateway";

class UserGateway extends Gateway implements IUserGateway {

    constructor() {
        super();
    }

    /**
     * Blocks the User given {BlockUserID}
     *
     * @param {number} userId
     * @param {number} blockUserId
     * @returns {Promise<boolean>}
     */
    public BlockUser(userId: number, blockUserId: number): Promise<boolean> {
        return this.Users.BlockUser(userId, blockUserId);
    }

    /**
     * GetProfile
     *
     * @param {number} userId
     * @returns {Promise<User>}
     */
    public GetProfile(userId: number): Promise<User> {
        return this.Users.GetProfile(userId).then(async (row: any) => {
            return UserFactory.FullProfile({ ...row });
        }, (reason) => {
            throw new Error(reason);
        });
    }

    /**
     *
     *
     * @param {number} userId
     * @param {string} avatar
     * @returns {Promise<boolean>}
     */
    public SetAvatar(userId: number, avatar: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    /**
     * Login
     *
     * @param {string} username
     * @param {string} password
     * @returns {Promise<User>}
     */
    public Login(username: string, password: string): Promise<User> {
        return this.Users.Login(username, password).then((rows: any) => {
            const id = rows[Tables.Users][0][UsersTable.Id];

            let profile = this.GetProfile(id);
            console.log(profile);
            return profile;
        }, reason => {
            console.error(reason); // Error!
            throw new Error(reason);
        });
    }

    /**
     * Register
     *
     * @param {string} email
     * @param {string} username
     * @param {string} password
     * @returns {Promise<User>}
     */
    public Register(email: string, username: string, password: string, options: IUserCreationOptions): Promise<User> {
        return this.Users.Register(email, username, password, options).then((row: any) => {
            return this.GetProfile(row[UsersTable.Id]);
        }, (reason: any) => {
            throw new Error(reason);
        });
    }
}

export default UserGateway;
