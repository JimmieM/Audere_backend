import { DateProposal, DateProposalApplication, DateProposalDetails, SimpleUser, ChatMessage } from "auderecommon";
import { DateProposalsMatchesMapperTable, DateProposalsTable } from "../../Mappers/Tables";
import UserFactory from "./UserFactory";
import ChatFactory from "./ChatFactory";

class DatesFactory {
    /**
     * Returns a DateProposal model
     *
     * @static
     */
    public static DateProposals = ({ date_proposals }: { date_proposals: any }): DateProposal[] => {
        const obj = date_proposals;
        if (!obj) {
            return null;
        }
        const objects = obj.map((proposal: any) => {
            const dateDetails = new DateProposalDetails(
                {
                    Coordinates: proposal[DateProposalsTable.LocationCoordinates],
                    Plain: proposal[DateProposalsTable.Location],
                },
                proposal[DateProposalsTable.Date],
            );
            return new DateProposal(
                proposal[DateProposalsTable.Id],
                proposal[DateProposalsTable.UserId],
                proposal[DateProposalsTable.DateCreated],
                dateDetails,
            );
        });
        return objects;
    }

    /**
     * DateProposal
     *
     * @static
     */
    // tslint:disable-next-line: max-line-length
    public static DateProposal = ({ date_proposals, users }: { date_proposals: any, users: any }): DateProposal => {
        const userModel = UserFactory.SimpleProfiles({ users })[0];


        const proposal = date_proposals[0];
        const dateDetails = new DateProposalDetails(
            {
                Coordinates: proposal[DateProposalsTable.LocationCoordinates],
                Plain: proposal[DateProposalsTable.Location],
            },
            proposal[DateProposalsTable.Date],
        );
        const dateProposal = new DateProposal(
            proposal[DateProposalsTable.Id],
            proposal[DateProposalsTable.UserId],
            proposal[DateProposalsTable.DateCreated],
            dateDetails,
        );
        dateProposal.User = userModel;
        return dateProposal;
    }

    /**
     * Returns a DateProposalApplication
     *
     * @static
     */
    // tslint:disable-next-line: max-line-length
    public static DateProposalApplications = ({ date_proposals_matches_mapper, users, date_proposals, chats }: { date_proposals_matches_mapper: any, users: any, date_proposals?: any, chats?: any }): DateProposalApplication[] => {
        const obj = date_proposals_matches_mapper;
        if (!obj || !users) {
            return null;
        }
        const objects = obj.map((match: any) => {
            const simpleUserModel = UserFactory.SimpleProfiles({ users })[0];
            const application = new DateProposalApplication(
                match[DateProposalsMatchesMapperTable.Id],
                match[DateProposalsMatchesMapperTable.DateProposalId],
                simpleUserModel,
                match[DateProposalsMatchesMapperTable.Date],
                match[DateProposalsMatchesMapperTable.Accepted],
            );
            if (chats) {
                application.ChatMessage = ChatFactory.ChatMessage({ chats });
            }
            if (date_proposals && application.IsAMatch) {
                application.DateProposal = DatesFactory.DateProposals({ date_proposals })[0];
            }
            return application;
        });
        return objects;
    }
}

export default DatesFactory;
