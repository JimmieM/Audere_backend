import { UserAchievement, IAchievementsGateway } from "auderecommon";
import { AchievementsTable, Tables, UserAchievementsTable } from "../../../Mappers/Tables";
import DbUtil from "../../../Utilities/DbUtil";
import Database from "../../Database";
import AchievementFactory from "../../Factories/AchievementFactory";

class AchievementsMs implements IAchievementsGateway {
    constructor() { }

    /**
     * GetAchievement
     *
     * @param {number} achievementId
     * @returns {Promise<any>}
     */
    public async GetAchievement(achievementId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            Database.Connection.query(
                `SELECT * FROM
                ${Tables.Achievements}
                WHERE ${AchievementsTable.Id} = ${achievementId}`,
                (err: any, achievement: any) => {
                    if (!achievement) {
                        reject("No achievement found");
                    }

                    resolve(DbUtil.ParseRows(achievement, Tables.Achievements));
                },
            );
        });
    }

    /**
     * GetFinishedAchievements
     * Always Resolves.
     *
     * @param {number} userId
     * @returns {Promise<any>}
     */
    public async GetFinishedAchievements(userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            Database.Connection.query(
                `SELECT ${UserAchievementsTable.Id}, ${UserAchievementsTable.CompletionDate}, ${UserAchievementsTable.AchievementId} FROM
                ${Tables.UserAchievements}
                WHERE ${UserAchievementsTable.UserId} = ${userId}
                AND ${UserAchievementsTable.CompletionDate} IS NOT null`,
                (err: any, userAchievementMeta: any) => {
                    const parsedUserMeta = DbUtil.ParseRows(userAchievementMeta, Tables.UserAchievements);

                    const finishedAchievements: UserAchievement[] = [];

                    const listOfAchiPromises: Promise<any>[] = [];

                    parsedUserMeta[Tables.UserAchievements].map((user: any) => {
                        listOfAchiPromises.push(new Promise((resolve, reject) => {
                            const achievementId = user[UserAchievementsTable.AchievementId];

                            this.GetAchievement(achievementId).then((parsedBaseAchievement) => {

                                const userAchievementModel = AchievementFactory.UserAchievement(
                                    JSON.stringify({ ...parsedUserMeta, ...parsedBaseAchievement })
                                );
                                resolve(userAchievementModel);
                            });
                        }).catch((x: any) => {
                            console.log(x);

                        }));
                    });

                    Promise.all(listOfAchiPromises).then(data => {
                        data.map(x => {
                            finishedAchievements.push(x);
                        });
                    });

                },
            );
        });
    }

    /**
     * GetallAchievements
     *
     * @returns {Promise<any>}
     */
    public async GetAllAchievements(): Promise<any> {
        return new Promise((resolve, reject) => {
            Database.Connection.query(
                `SELECT * FROM all_achievements`,
                (err: any, rows: any) => {
                    if (!rows) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(DbUtil.ParseRows(rows, Tables.Achievements));
                    }
                },
            );
        });
    }
}

export default AchievementsMs;
