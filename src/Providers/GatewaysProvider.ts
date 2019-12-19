/*
Import custom services
*/

import { IAchievementsGateway, IDatesGateway, IMatchesGateway, IUserGateway } from "auderecommon";

// Settings
import { Settings } from "../Settings/Settings";

// Gateways
import AchievementsGateway from "../Gateways/Achievements/AchievementsGateway";
import DatesGateway from "../Gateways/Dates/DatesGateway";
import MatchesGateway from "../Gateways/MatchesGateway/MatchesGateway";
import UserGateway from "../Gateways/Users/UserGateway";


class GatewaysProvider {
    private static Mocked = Settings.ENVIRONMENT.MOCKED;

    private static userService: IUserGateway;
    public static get UserGateway() {
        // tslint:disable-next-line: max-line-length
        return this.userService || (!this.Mocked ? this.userService = new UserGateway() : this.userService = new UserGateway());
    }

    private static achievmentsService: IAchievementsGateway;
    public static get AchievementsGateway() {
        // tslint:disable-next-line: max-line-length
        return this.achievmentsService || (!this.Mocked ? this.achievmentsService = new AchievementsGateway() : this.achievmentsService = new AchievementsGateway());
    }

    private static datesService: IDatesGateway;
    public static get DatesGateway() {
        // tslint:disable-next-line: max-line-length
        return this.datesService || (this.Mocked ? this.datesService = new DatesGateway() : this.datesService = new DatesGateway());
    }

    private static matchesGateway: IMatchesGateway;
    public static get MatchesGateway() {
        // tslint:disable-next-line: max-line-length
        return this.matchesGateway || (this.Mocked ? this.matchesGateway = new MatchesGateway() : this.matchesGateway = new MatchesGateway());
    }
}

export default GatewaysProvider;
