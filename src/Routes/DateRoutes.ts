import { DateProposalApplication, GetAPIVersion, IServerReply, IDateProposalDetails } from "auderecommon";
import express from "express";

import GatewaysProvider from "../Providers/GatewaysProvider";
import Endpoints from "../Settings/Endpoints";
import { promises } from "fs";
import RoutesUtil from "../Utilities/RoutesUtil";

const router = express.Router();

const domain = `/${GetAPIVersion()}`;

/// @Post
/// Get All available date proposals
///
router.post(domain + Endpoints.Dates.GetProposals.Path, (req: any, res: any) => {
    const {
        credentials,
    } = req.body;

    const userId = RoutesUtil.HandleJSON(credentials).userId;

    GatewaysProvider.DatesGateway.GetAvailableDateProposals(userId).then((response: any) => {
        Promise.all(response).then((done) => {
            const reply: IServerReply = {
                Success: response !== null,
                Data: done,
            };

            console.log(response);

            res.status(200).send(reply);
        })

    }).catch((err: any) => {
        res.status(500).send(err);
    });
});

/// @Post
/// Create Date Proposal
///
router.post(domain + Endpoints.Dates.CreateDateProposal.Path, (req: any, res: any) => {
    const {
        credentials, dateDetails,
    } = req.body;

    const userId = RoutesUtil.HandleJSON(credentials).userId;

    const dateDetailsModel = JSON.parse(dateDetails) as IDateProposalDetails;

    GatewaysProvider.DatesGateway.CreateDateProposal(userId, dateDetailsModel).then((success: boolean) => {
        const reply: IServerReply = {
            Success: success,
        };
        res.status(200).send(reply);
    }).catch((err: any) => {
        res.status(500).send(err);
    });
});

/// @Post
/// Delete Date Proposal
///
router.post(domain + Endpoints.Dates.DeleteDateProposal.Path, (req: any, res: any) => {
    const {
        credentials, dateProposalId,
    } = req.body;

    const userId = RoutesUtil.HandleJSON(credentials).userId;

    GatewaysProvider.DatesGateway.DeleteDateProposal(userId, dateProposalId).then((success: boolean) => {
        const reply: IServerReply = {
            Success: success,
        };
        res.status(200).send(reply);
    }).catch((err: any) => {
        res.status(500).send(err);
    });
});

/// @Post
/// Edit Date Proposal
///
router.post(domain + Endpoints.Dates.EditDateProposal.Path, (req: any, res: any) => {
    const {
        credentials, dateProposalId, dateDetails,
    } = req.body;
    const userId = RoutesUtil.HandleJSON(credentials).userId;
    const dateDetailsModel = JSON.parse(dateDetails) as IDateProposalDetails;

    // tslint:disable-next-line: max-line-length
    GatewaysProvider.DatesGateway.EditDateProposal(userId, dateProposalId, dateDetailsModel).then((success: boolean) => {
        const reply: IServerReply = {
            Success: success,
        };
        res.status(200).send(reply);
    }).catch((err: any) => {
        res.status(500).send(err);
    });
});

/// @Post
/// Apply For Date Proposal
///
router.post(domain + Endpoints.Dates.ApplyForDateProposal.Path, (req: any, res: any) => {
    const {
        credentials, dateProposalId,
    } = req.body;
    const userId = RoutesUtil.HandleJSON(credentials).userId;

    GatewaysProvider.DatesGateway.ApplyForDateProposal(userId, dateProposalId).then((success: boolean) => {
        const reply: IServerReply = {
            Success: success,
        };
        res.status(200).send(reply);
    }).catch((err: any) => {
        res.status(500).send(err);
    });
});

/// @Post
/// Get all date proposal applications
///
router.post(domain + Endpoints.Dates.GetProposalApplications.Path, (req: any, res: any) => {
    const {
        credentials,
    } = req.body;
    const userId = RoutesUtil.HandleJSON(credentials).userId;
    GatewaysProvider.DatesGateway.GetProposalApplications(userId).then((applications: DateProposalApplication[]) => {
        const reply: IServerReply = {
            Success: applications !== null,
            Data: applications,
        };
        res.status(200).send(reply);
    }).catch((err: any) => {
        res.status(500).send(err);
    });
});

/// @Post
/// Get all date proposal applications for date proposal id provided.
///
router.post(domain + Endpoints.Dates.GetProposalApplicationsByProposal.Path, (req: any, res: any) => {
    const {
        credentials, dateProposalId,
    } = req.body;
    const userId = RoutesUtil.HandleJSON(credentials).userId;
    // tslint:disable-next-line: max-line-length
    GatewaysProvider.DatesGateway.GetProposalApplicationsByDateProposal(userId, dateProposalId).then((applications: DateProposalApplication[]) => {
        const reply: IServerReply = {
            Success: applications !== null,
            Data: applications,
        };
        res.status(200).send(reply);
        res.status(200).send(reply);
    }).catch((err: any) => {
        res.status(500).send(err);
    });
});

export default router;
