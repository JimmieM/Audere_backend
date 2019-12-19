import { User } from "auderecommon";
import GatewaysProvider from "./GatewaysProvider";

/**
 * The UserProvider shall store the sessioned user
 *
 * @class UserProvider
 */
class UserProvider {
    public static get User() {
        return this.user || (this.user = new User(1, "Jimmie", "", null, "online"));
    }

    public static Init(userId: number) {
        //this.user = new User(1, "", 1, [], [new UserGoal("", "", null, null)], "online");
        this.GetMyProfile();
        this.userId = userId;
    }

    private static user: User;
    private static userId: number;

    private static GetMyProfile() {
        GatewaysProvider.UserGateway.GetProfile(this.userId).then((user) => {
            this.user = user;
        });
    }
}

export default UserProvider;
