import { DateProposalsMatchesMapperTable, TableOperators, Tables } from "../../../Mappers/Tables";
import DbUtil from "../../../Utilities/DbUtil";
import Database from "../../Database";

class MatchesMs {

    /**
     * AnswerMatchRequest
     *
     * @param {number} userId
     * @param {number} datePropsalMatchId
     * @param {number} answer
     * @returns {Promise<boolean>}
     */
    public AnswerMatchRequest(userId: number, datePropsalMatchId: number, answer: number): Promise<boolean> {
        let queryString = `UPDATE ${Tables.DateProposalsMatchesMapper} `;
        if (answer === 1) {
            queryString += `SET ${DateProposalsMatchesMapperTable.Accepted} = ${TableOperators.YES} `;
        } else {
            queryString += `SET ${DateProposalsMatchesMapperTable.Declined} = ${TableOperators.YES} `;
        }
        queryString += `WHERE ${DateProposalsMatchesMapperTable.Id} = ${datePropsalMatchId} AND ${DateProposalsMatchesMapperTable.ProposerUserId} = ${userId}`;
        return new Promise((resolve, reject) => {
            Database.Connection.query(
                queryString,
                (err: any, rows: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                },
            );
        });
    }

    /**
     * Returns unaccepted applications for the userid provided.
     *
     * @param {number} userId
     * @param {number} [dateProposalId]
     * @returns {Promise<any>}
     */
    public GetAwaitingApplications(userId: number, dateProposalId?: number): Promise<any> {
        let queryString = `SELECT * FROM ${Tables.DateProposalsMatchesMapper}
        WHERE
        ${DateProposalsMatchesMapperTable.ProposerUserId} = ${userId}
        AND ${DateProposalsMatchesMapperTable.Accepted} = ${TableOperators.NO}
        AND ${DateProposalsMatchesMapperTable.Declined} = ${TableOperators.NO}`;

        if (dateProposalId) {
            queryString += ` AND ${DateProposalsMatchesMapperTable.DateProposalId} = ${dateProposalId}`;
        }

        return new Promise((resolve, reject) => {
            Database.Connection.query(
                queryString,
                (err: any, rows: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(DbUtil.ParseRows(rows, Tables.DateProposalsMatchesMapper));
                    }
                },
            );
        });
    }
    /**
     * Unmtaches with the Date Proposer.
     *
     * @param {number} userId
     * @param {number} dpMatchId
     * @returns {Promise<any>}
     */
    public UnMatch(userId: number, dpMatchId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Database.Connection.query(
                `DELETE FROM ${Tables.DateProposalsMatchesMapper} WHERE ${DateProposalsMatchesMapperTable.Id} = ${dpMatchId} AND ${DateProposalsMatchesMapperTable.UserId} = ${userId}`,
                (err: any, rows: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                },
            );
        });
    }

    /**
     * GetMatchesByUserId
     *
     * @param {number} userId
     * @param {boolean} [acceptedOnly=true] Only retrieves matches that the proposer has accepted.
     * @returns
     */
    public GetMatchesByUserId(userId: number): Promise<any> {
        const queryString = `SELECT * FROM ${Tables.DateProposalsMatchesMapper}
        WHERE
        (${DateProposalsMatchesMapperTable.UserId} = ${userId} AND ${DateProposalsMatchesMapperTable.Accepted} = ${TableOperators.YES})
        OR
        (${DateProposalsMatchesMapperTable.ProposerUserId} = ${userId} AND  ${DateProposalsMatchesMapperTable.Accepted} = ${TableOperators.YES})`;

        return new Promise((resolve, reject) => {
            Database.Connection.query(
                queryString,
                (err: any, rows: any) => {
                    if (!rows) {
                        reject(err);
                    } else {
                        resolve(DbUtil.ParseRows(rows, Tables.DateProposalsMatchesMapper));
                    }
                },
            );
        });
    }

    /**
     * Gets the matches by the Date Proposal Identifier.
     *
     * @param {number} dateProposalId
     * @param {boolean} [acceptedOnly=true] - Only retrieves matches that the proposer has accepted.
     * @returns {Promise<any[]>}
     */
    public GetMatchesByProposalId(dateProposalId: number): Promise<any> {
        const queryString = `SELECT * FROM ${Tables.DateProposalsMatchesMapper}
        WHERE ${DateProposalsMatchesMapperTable.DateProposalId} = ${dateProposalId}
        AND ${DateProposalsMatchesMapperTable.Accepted} = ${TableOperators.YES}`;
        return new Promise((resolve, reject) => {
            Database.Connection.query(
                queryString,
                (err: any, rows: any) => {
                    if (!rows) {
                        reject(err);
                    } else {
                        resolve(DbUtil.ParseRows(rows, Tables.DateProposalsMatchesMapper));
                    }
                },
            );
        });
    }
}

export default MatchesMs;
