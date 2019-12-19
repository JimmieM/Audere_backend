import { Achievement, IAchievementsGateway } from "auderecommon";
import Gateway from "../Gateway";

class AchievementsGateway extends Gateway implements IAchievementsGateway {
    constructor() {
        super();
    }

    public GetFinishedAchievements(userId: number): Promise<Achievement[]> {
        return this.Achievements.GetFinishedAchievements(userId).then((rows: any) => {
            const achievements: Achievement[] = [];
            rows.map((row: any) => {
                const achievement = row as Achievement;
                return achievement;
            });

            return achievements;
        }, reason => {
            console.error(reason); // Error!
            throw new Error("");
        });

    }

    public GetAllAchievements(): Promise<Achievement[]> {
        throw new Error("Method not implemented.");
    }

}

export default AchievementsGateway;
