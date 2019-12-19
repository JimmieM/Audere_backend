import { DateProposalApplication, IMatchesGateway } from "auderecommon";
import DatesFactory from "../../Database/Factories/DatesFactory";
import { Tables, DateProposalsMatchesMapperTable } from "../../Mappers/Tables";
import DbUtil from "../../Utilities/DbUtil";
import Gateway from "../Gateway";

class MatchesGateway extends Gateway implements IMatchesGateway {
    constructor() {
        super();
    }

    /**
     * Returns all awating applications
     * If you want the applications for a certain dateproposal, then use the second
     *
     * @param {number} userId
     * @param {number} [dateProposalId]
     * @returns {Promise<DateProposalApplication[]>}
     */
    public GetAwaitingApplications(userId: number, dateProposalId?: number): Promise<DateProposalApplication[]> {
        return this.Matches.GetAwaitingApplications(userId, dateProposalId).then((matches: any) => {
            return matches[Tables.DateProposalsMatchesMapper].map((match: any) => {
                return this.Users.GetSimpleProfile(userId).then((profile: any) => {
                    const preparedMatch = DbUtil.PrepareObjectForFactory(match, Tables.DateProposalsMatchesMapper);
                    return DatesFactory.DateProposalApplications({ ...preparedMatch, ...profile })[0];
                }).catch((err) => {
                    throw new Error(err);
                });
            });

        }).catch((err) => {
            throw new Error(err);
        });
    }

    /**
     *  GetAllAcceptedMatches
     *
     * @param {number} userId
     * @param {number} [dateProposalId]
     * @returns {Promise<any>}
     */
    public GetAllAcceptedMatches(userId: number, dateProposalId?: number): Promise<DateProposalApplication[]> {
        if (dateProposalId) {
            throw new Error("Not implemented");
            // return this.Matches.GetMatchesByProposalId(dateProposalId).then((matches: any) => {
            //     const x = matches;
            //     matches[Tables.DateProposalsMatchesMapper].map((matchModel: DateProposalApplication) => {
            //         return this.Users.GetSimpleProfile(userId).then((profile: any) => {
            //             const x = { ...{ matchModel }, ...profile };
            //             return DatesFactory.DateProposalApplications(x);
            //         });
            //     });

            // });
        }

        // Main
        const x = this.Matches.GetMatchesByUserId(userId).then((matches: any) => {
            return matches[Tables.DateProposalsMatchesMapper].map((match: any) => {
                const applierUserId = match[DateProposalsMatchesMapperTable.UserId];
                const proposerUserId = match[DateProposalsMatchesMapperTable.ProposerUserId];
                const curDateProposalId = match[DateProposalsMatchesMapperTable.DateProposalId];

                const promises = [
                    this.Users.GetSimpleProfile(applierUserId),
                    this.Dates.GetDateProposal(curDateProposalId),
                    this.Chats.GetLatestChatMessage(applierUserId, proposerUserId),
                ];
                return Promise.all(promises).then((result: any[]) => {
                    result.push(DbUtil.PrepareObjectForFactory(match, Tables.DateProposalsMatchesMapper));
                    const flattenedMatchData = DbUtil.FlattenPromiseData(result);
                    return DatesFactory.DateProposalApplications(flattenedMatchData);
                }).then((items) => {
                    return items[0];
                });
            });

        }).catch((err) => {
            throw new Error(err);
        });

        return x;
    }

    /**
     * AnswerMatchRequestAsProposer
     *
     * @param {number} userId
     * @param {number} dateProposalMatchId
     * @param {number} answer
     * @returns {Promise<boolean>}
     */
    public AnswerMatchRequestAsProposer(userId: number, dateProposalMatchId: number, answer: number): Promise<boolean> {
        return this.Matches.AnswerMatchRequest(userId, dateProposalMatchId, answer);
    }

    /**
     * RemoveDateProposalMatch
     *
     * @param {number} userId
     * @param {number} dpMatchId
     * @returns {Promise<boolean>}
     */
    public RemoveDateProposalMatch(userId: number, dpMatchId: number): Promise<boolean> {
        return this.Matches.UnMatch(userId, dpMatchId);
    }
}

export default MatchesGateway;
