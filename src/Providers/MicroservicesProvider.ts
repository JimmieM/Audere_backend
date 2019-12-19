import AchievementsMs from "../Database/Microservices/Achievements/AchievementsMs";
import UserMs from "../Database/Microservices/Users/UserMs";
import DateProposalsMs from "../Database/Microservices/Dates/DateProposalsMs";

class MicroservicesProvider {
    private static _Achievements: AchievementsMs;
    private static _Dates: DateProposalsMs;
    private static _Users: UserMs;

    public static get Achievements(): AchievementsMs {
        return this._Achievements == null ? this._Achievements = new AchievementsMs() : this._Achievements;
    }

    public static get Dates(): DateProposalsMs {
        return this._Dates == null ? this._Dates = new DateProposalsMs() : this._Dates;
    }

    public static get Users(): UserMs {
        return this._Users == null ? this._Users = new UserMs() : this._Users;
    }

}

export default MicroservicesProvider;