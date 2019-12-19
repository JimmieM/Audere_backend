import { GetAPIVersion, IServerReply } from "auderecommon";
import express from "express";
import GatewaysProvider from "../Providers/GatewaysProvider";
import Endpoints from "../Settings/Endpoints";
import RoutesUtil from "../Utilities/RoutesUtil";

const router = express.Router();

const domain = `/${GetAPIVersion()}`;

/// @Post
// ANSWER REquest
///
router.post(domain + Endpoints.Matches.AnswerMatchRequest.Path, (req: any, res: any) => {
    const {
        credentials,
    } = req.body;
    const userId = RoutesUtil.HandleJSON(credentials).userId;

    GatewaysProvider.MatchesGateway.GetAllAcceptedMatches(userId).then((response: any) => {
        const reply: IServerReply = {
            Success: response !== null,
            Data: response,
        };
        res.status(200).send(reply);
    }).catch((err: any) => {
        res.status(500).send(err);
    });
});

/// @Post
// Get awaiting applications
///
router.post(domain + Endpoints.Matches.GetAwaitingApplications.Path, (req: any, res: any) => {
    const {
        credentials, dateProposalId,
    } = req.body;
    const userId = RoutesUtil.HandleJSON(credentials).userId;

    GatewaysProvider.MatchesGateway.GetAwaitingApplications(userId, dateProposalId).then((response: any) => {
        Promise.all(response).then((done) => {
            const reply: IServerReply = {
                Success: response !== null,
                Data: done,
            };
            res.status(200).send(reply);
        });
    }).catch((err: string) => {
        throw new Error(err);
        res.status(500).send(err);
    });
});

/// @Post
/// Get All of My Matches By UserId
///
router.post(domain + Endpoints.Matches.GetAllMatches.Path, (req: any, res: any) => {
    const {
        credentials,
    } = req.body;
    const userId = RoutesUtil.HandleJSON(credentials).userId;

    GatewaysProvider.MatchesGateway.GetAllAcceptedMatches(userId).then((response: any) => {
        Promise.all(response).then((done) => {
            const reply: IServerReply = {
                Success: response !== null,
                Data: done,
            };
            res.status(200).send(reply);
        });
    }).catch((err: string) => {
        res.status(500).send(err);
    });
});

/// @Post
/// Get All of My Matches by DateProposal
///
router.post(domain + Endpoints.Matches.GetMatchesByDateProposal.Path, (req: any, res: any) => {
    const {
        credentials, dateProposalId,
    } = req.body;
    const userId = RoutesUtil.HandleJSON(credentials).userId;

    GatewaysProvider.MatchesGateway.GetAllAcceptedMatches(userId, dateProposalId).then((response: any) => {
        Promise.all(response).then((done) => {
            const reply: IServerReply = {
                Success: response !== null,
                Data: done,
            };
            res.status(200).send(reply);
        });
    }).catch((err: any) => {
        res.status(500).send(err);
    });
});
export default router;
