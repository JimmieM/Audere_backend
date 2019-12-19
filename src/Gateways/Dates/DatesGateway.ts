import { DateProposal, DateProposalApplication, DateProposalDetails, IDatesGateway } from "auderecommon";
import DatesFactory from "../../Database/Factories/DatesFactory";
import { DateProposalsTable, Tables } from "../../Mappers/Tables";
import DbUtil from "../../Utilities/DbUtil";
import Gateway from "../Gateway";

class DatesGateway extends Gateway implements IDatesGateway {

    constructor() {
        super();
    }

    /**
     * GetProposalApplications
     *
     * @param {number} userId
     * @returns {Promise<DateProposalApplication[]>}
     */
    public GetProposalApplications(userId: number): Promise<DateProposalApplication[]> {
        return this.Dates.GetProposalApplications(userId).then((applications: any) => {
            if (!applications) {
                return null;
            }
            return DatesFactory.DateProposalApplications(applications);
        });
    }

    /**
     *
     *
     * @param {number} userId
     * @param {number} dateProposalId
     * @returns {Promise<DateProposalApplication[]>}
     */
    // tslint:disable-next-line: max-line-length
    public GetProposalApplicationsByDateProposal(userId: number, dateProposalId: number): Promise<DateProposalApplication[]> {
        return this.Dates.GetProposalApplicationsByDateProposal(userId, dateProposalId).then((applications: any) => {
            if (!applications) {
                return null;
            }
            return DatesFactory.DateProposalApplications(applications);
        });
    }


    /**
     * Apply for the date proposal
     *
     * @param {number} userId
     * @param {number} dateProposalId
     * @returns {Promise<boolean>}
     */
    public ApplyForDateProposal(userId: number, dateProposalId: number): Promise<boolean> {
        return this.Dates.ApplyForDateProposal(userId, dateProposalId);
    }

    /**
     * Remove Date Proposal Match
     *
     * @param {number} userId
     * @param {number} dpMatchId
     * @returns {Promise<boolean>}
     */
    public RemoveDateProposalMatch(userId: number, dpMatchId: number): Promise<boolean> {
        return this.Matches.UnMatch(userId, dpMatchId);
    }

    /**
     * Rate Date
     *
     * @param {number} userId
     * @param {number} dateProposalId
     * @param {number} value
     * @returns {Promise<boolean>}
     */
    public RateDate(userId: number, dateProposalId: number, value: number): Promise<boolean> {
        return this.Dates.RateDate(userId, dateProposalId, value);
    }

    /**
     * GetAvailableDateProposals
     *
     * @returns {Promise<DateProposal[]>}
     */
    public GetAvailableDateProposals(userId: number): Promise<DateProposal[]> {
        return this.Dates.GetAvailableDateProposals(userId).then((dates: any) => {
            if (dates) {
                return dates[Tables.DateProposals].map((date: any) => {
                    return this.Users.GetSimpleProfile(date[DateProposalsTable.UserId]).then((user: any) => {
                        user = user[Tables.Users][0];
                        user = DbUtil.PrepareObjectForFactory(user, Tables.Users);
                        date = DbUtil.PrepareObjectForFactory(date, Tables.DateProposals);

                        const x = DatesFactory.DateProposal({ ...date, ...user });
                        return x;
                    }).catch((err: any) => {
                        throw new Error(err);
                    });
                });
            } else {
                throw new Error("No dates found");
            }
        });
    }

    /**
     * GetDateProposalMatches
     *
     * @param {number} userId
     * @param {number} dateProposalId
     * @returns {Promise<DateProposalMatch[]>}
     */
    public GetDateProposalMatches(dateProposalId: number): Promise<DateProposalApplication[]> {
        return this.Matches.GetMatchesByProposalId(dateProposalId).then((matches: any) => {
            if (matches) {
                return DatesFactory.DateProposalApplications(matches);
            } else {
                return null;
            }
        });
    }

    /**
     * CreateDateProposal
     *
     * @param {number} userId
     * @param {DateProposalDetails} dateDetails
     * @returns {Promise<boolean>}
     */
    public CreateDateProposal(userId: number, dateDetails: DateProposalDetails): Promise<boolean> {
        return this.Dates.CreateDateProposal(userId, dateDetails);
    }

    /**
     * DeleteDateProposal
     *
     * @param {number} userId
     * @param {number} dateProposalId
     * @returns {Promise<boolean>}
     */
    public DeleteDateProposal(userId: number, dateProposalId: number): Promise<boolean> {
        return this.Dates.DeleteDateProposal(userId, dateProposalId);
    }

    /**
     * EditDateProposal
     *
     * @param {number} userId
     * @param {number} dateProposalId
     * @param {DateProposalDetails} dateDetails
     * @returns {Promise<boolean>}
     */
    // tslint:disable-next-line: max-line-length
    public EditDateProposal(userId: number, dateProposalId: number, dateDetails: DateProposalDetails): Promise<boolean> {
        return this.Dates.EditDateProposal(userId, dateProposalId, dateDetails);
    }
}

export default DatesGateway;
