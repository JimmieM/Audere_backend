import { UserConnectivityState, Util, DateRating, IUserCreationOptions } from "auderecommon";

class UserUtil {

    /**
     * Gets the users connectivity state.
     *
     * @static
     * @returns {UserConnectivityState}
     */
    public static GetUserConnectivityState = (date: string): UserConnectivityState => {
        if (!Util.IsToday(new Date(date))) { return "offline"; }
        const today = new Date();
        const latestOnline = new Date(date);
        if (today.getMinutes() === latestOnline.getMinutes()) { return "online"; }
        return "offline";

    }

    /**
     * Returns an average dating score
     *
     * @static
     * @returns {number}
     */
    public static GetUserAverageDateRating = (dateRatings: DateRating[]): number => {
        let counter = 0;
        dateRatings.map((rating: DateRating) => {
            counter += rating.Rating;
        });
        return counter / dateRatings.length;
    }

    /**
     * @TODO
     *
     * @static
     */
    public static UserAge = (userCreationOptions: IUserCreationOptions): number => {
        const details = userCreationOptions;
        return 22;
    }
}

export default UserUtil;
