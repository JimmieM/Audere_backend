// Models
import { Achievement, AchievementRequirement, UserAchievement } from "auderecommon";

// Typedef
import { isArray } from "util";
import { AchievementsTable, Tables, UserAchievementsTable } from "../../Mappers/Tables";

/**
 *
 * Needs to be revbuilt to match DatesFacotry etc.
 *
 * @class AchievementFactory
 */
class AchievementFactory {

    /**
     * Returns an Achievement
     *
     * @static
     */
    public static Achievement = (json: string): Achievement => {
        let data = JSON.parse(json);
        if (isArray(data)) { data = data[0]; }
        return new Achievement(
            data[AchievementsTable.Id],
            data[AchievementsTable.Name],
            data[AchievementsTable.Description],
            data[AchievementsTable.FaceValue],
            data[AchievementsTable.Requirements],
        );
    }

    /**
     * Returns an UserAchievement
     * @param {string} json
     *
     * @static
     */
    public static UserAchievement = (json: string): UserAchievement => {
        const data = JSON.parse(json);
        const userAchievementData = data[Tables.UserAchievements];
        const achievement = AchievementFactory.Achievement(JSON.stringify(data[Tables.Achievements]));
        return new UserAchievement(
            userAchievementData[UserAchievementsTable.Id],
            userAchievementData[UserAchievementsTable.UserId],
            userAchievementData[UserAchievementsTable.CompletionDate],
            achievement,
        );
    }

    /**
     * Returns an AchievementRequirement
     *
     * @static
     */
    public static AchievementRequirement = (json: string): AchievementRequirement => {
        //const data = JSON.parse(json);
        return new AchievementRequirement();
    }
}

export default AchievementFactory;
