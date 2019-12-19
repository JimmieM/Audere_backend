import {
  DateProposal,
  DateProposalApplication,
  IDateProposalDetails,
  TimeUtil
} from "auderecommon";
import {
  DateProposalsMatchesMapperTable,
  DateProposalsTable,
  DateRatingTable,
  TableOperators,
  Tables
} from "../../../Mappers/Tables";
import DbUtil from "../../../Utilities/DbUtil";
import Database from "../../Database";
import DatesFactory from "../../Factories/DatesFactory";
import MatchesMs from "../Matches/MatchesMs";

class DateProposalsMs {
  /**
   * Has to be between index 0 and 1 obviously.
   *
   * @private
   */
  private RATING_RANGE = [1, 5];

  /**
   * Rate Date
   *
   * @param {number} userId
   * @param {number} dateProposalId
   * @param {number} value
   * @returns {Promise<boolean>}
   */
  public RateDate(userId: number, dateProposalId: number, value: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (value <= this.RATING_RANGE[0] && value >= this.RATING_RANGE[1]) {
        // @TODO Error
        return null;
      }

      this.GetDateProposal(dateProposalId).then((date: any) => {
        const dateModel = DatesFactory.DateProposals(date)[0];
        const id = dateModel.Id;

        Database.Connection.query(
          `INSERT INTO ${Tables.DateRatings}
                        (${DateRatingTable.MatchUserId}, ${
          DateRatingTable.ProposerUserId
          }, ${DateRatingTable.Rating}, ${DateRatingTable.Date})
                        VALUES
                        (${userId}, ${id}, ${value}, '${TimeUtil.Timestamp()}')`,
          (err: any, rows: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(true);
            }
          }
        );
      });
    });
  }

  /**
   * Applies for the date proposal.
   * Makes you, the applier, if accepted, a match with the Date Proposer.
   *
   * @param {number} userId
   * @param {number} dateProposalId
   * @returns {Promise<boolean>}
   */
  public ApplyForDateProposal(
    userId: number,
    dateProposalId: number
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Database.Connection.query(
        `INSERT INTO ${Tables.DateProposalsMatchesMapper}
                    (${DateProposalsMatchesMapperTable.Date}, ${
        DateProposalsMatchesMapperTable.DateProposalId
        }, ${DateProposalsMatchesMapperTable.UserId})
                    VALUES
                    ('${TimeUtil.Timestamp()}', ${dateProposalId}, ${userId})`,
        (err: any, rows: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  }

  /**
   * Gets the proposal appliations connected to this date proposalid
   *
   */
  public GetProposalApplicationsByDateProposal = (
    userId: number,
    dateProposalId: number
  ): any => {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM ${Tables.DateProposalsMatchesMapper} WHERE ${DateProposalsMatchesMapperTable.DateProposalId} = ${dateProposalId} AND ${DateProposalsMatchesMapperTable.Accepted} = ${TableOperators.NO}`;
      Database.Connection.query(queryString, (err: any, rows: any) => {
        if (!rows) {
          reject(false);
        } else {
          resolve(DbUtil.ParseRows(rows, Tables.DateProposalsMatchesMapper));
        }
      });
    });
  };

  /**
   * Returns the applications only.
   *
   */
  public GetProposalApplications = (userId: number): any => {
    const queryString = `SELECT * FROM ${Tables.DateProposalsMatchesMapper} 
        WHERE
        (${DateProposalsMatchesMapperTable.UserId} = ${userId} AND ${DateProposalsMatchesMapperTable.Accepted} = ${TableOperators.NO}) 
        OR
        (${DateProposalsMatchesMapperTable.ProposerUserId} = ${userId} AND ${DateProposalsMatchesMapperTable.Accepted} = ${TableOperators.NO})`;
    return new Promise((resolve, reject) => {
      Database.Connection.query(queryString, (err: any, rows: any) => {
        if (!rows) {
          reject(false);
        } else {
          resolve(DbUtil.ParseRows(rows, Tables.DateProposalsMatchesMapper));
        }
      });
    });
  };

  /**
   * GetAvailableDateProposals
   *
   * @returns {Promise<any[]>}
   */
  public GetAvailableDateProposals(userId: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Database.Connection.query(
        `SELECT * FROM ${Tables.DateProposals} 
                WHERE ${DateProposalsTable.Delisted} = ${TableOperators.NO}
                ORDER BY ${DateProposalsTable.Date} ASC`,
        (err: any, rows: any) => {
          if (!rows) {
            reject(new Error("Error rows is undefined"));
          } else {
            resolve(DbUtil.ParseRows(rows, Tables.DateProposals));
          }
        }
      );
    });
  }

  /**
   * GetDateProposalMatches
   *
   * @param {number} dateProposalId
   * @returns {Promise<DateProposalMatch[]>}
   */
  public GetDateProposalMatches(
    dateProposalId: number
  ): Promise<DateProposalApplication[]> {
    return new MatchesMs().GetMatchesByProposalId(dateProposalId);
  }

  /**
   * CreateDateProposal
   *
   * @param {number} userId
   * @param {DateProposalDetails} dateDetails
   * @returns {Promise<boolean>}
   */
  public CreateDateProposal(
    userId: number,
    dateDetails: IDateProposalDetails
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Database.Connection.query(
        `INSERT INTO ${Tables.DateProposals}
                (${DateProposalsTable.UserId}, ${
        DateProposalsTable.DateCreated
        }, ${DateProposalsTable.Date}, ${DateProposalsTable.Location}, ${
        DateProposalsTable.LocationCoordinates
        })
                VALUES
                ('${userId}', '${TimeUtil.Timestamp()}', '${
        dateDetails.AtDate
        }', '${dateDetails.Location.Plain}', '${
        dateDetails.Location.Coordinates
        }')`,
        (err: any, rows: any) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(true);
          }
        }
      );
    });
  }

  /**
   * Delete Date Proposal
   *
   * @param {number} userId
   * @param {number} dateProposalId
   * @returns {Promise<boolean>}
   */
  public DeleteDateProposal(
    userId: number,
    dateProposalId: number
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Database.Connection.query(
        `UPDATE ${Tables.DateProposals} 
                SET ${DateProposalsTable.Delisted} = ${TableOperators.YES}
                WHERE ${DateProposalsTable.Id} = ${dateProposalId}
                AND ${DateProposalsTable.UserId} = ${userId}`,
        (err: any, rows: any) => {
          if (err) {
            reject(new Error("Failed to delete the date"));
          } else {
            resolve(true);
          }
        }
      );
    });
  }

  /**
   * Edit the Date Proposal
   *
   * @param {number} userId
   * @param {number} dateProposalId
   * @param {DateProposalDetails} dateDetails
   * @returns {Promise<boolean>}
   */
  // tslint:disable-next-line: max-line-length
  public EditDateProposal(
    userId: number,
    dateProposalId: number,
    dateDetails: IDateProposalDetails
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Database.Connection.query(
        `UPDATE ${Tables.DateProposals}
                SET ${DateProposalsTable.Date} = '${dateDetails.AtDate}',
                ${DateProposalsTable.Location} = '${dateDetails.Location.Plain}',
                ${DateProposalsTable.LocationCoordinates} = '${dateDetails.Location.Coordinates}'
                WHERE ${DateProposalsTable.Id} = ${dateProposalId}
                AND ${DateProposalsTable.UserId} = ${userId}`,
        (err: any, rows: any) => {
          if (err) {
            reject(new Error("Failed to edit the date"));
          } else {
            resolve(true);
          }
        }
      );
    });
  }

  public RemoveDateProposalMatch(
    userId: number,
    dpMatchId: number
  ): Promise<boolean> {
    throw new Error(
      "This method shall be implemented in the Matches Microservice."
    );
  }

  /**
   * Get Date Proposal
   *
   * @private
   * @param {number} dateProposalId
   * @returns {Promise<DateProposal>}
   */
  public GetDateProposal(dateProposalId: number): Promise<DateProposal> {
    return new Promise((resolve, reject) => {
      Database.Connection.query(
        `SELECT * FROM ${Tables.DateProposals} WHERE ${DateProposalsTable.Delisted} = ${TableOperators.NO} AND ${DateProposalsTable.Id} = ${dateProposalId}`,
        (err: any, rows: any) => {
          if (!rows) {
            reject(new Error("Error rows is undefined"));
          } else {
            resolve(DbUtil.ParseRows(rows, Tables.DateProposals));
          }
        }
      );
    });
  }
}

export default DateProposalsMs;
