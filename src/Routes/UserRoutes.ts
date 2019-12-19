import { GetAPIVersion, IUserCreationOptions, IServerReply } from "auderecommon";
import express from "express";
import UserFactory from "../Database/Factories/UserFactory";
import GatewaysProvider from "../Providers/GatewaysProvider";
import Endpoints from "../Settings/Endpoints";
import RoutesUtil from "../Utilities/RoutesUtil";

const router = express.Router();

const domain = `/${GetAPIVersion()}`;

/// @Post
/// Login
///
router.post(domain + Endpoints.User.Login.Path, (req: any, res: any) => {
    const {
        credentials,
    } = req.body;

    const username = JSON.parse(credentials).username;
    const password = JSON.parse(credentials).password;

    GatewaysProvider.UserGateway.Login(username, password).then((response: any) => {
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
/// Register
///
router.post(domain + Endpoints.User.Register.Path, (req: any, res: any) => {
    const {
        username, password, email, userCreationOptions,
    } = req.body.credentials;

    const personalDetails: IUserCreationOptions = UserFactory.PersonalDetails(userCreationOptions);

    GatewaysProvider.UserGateway.Register(email, username, password, personalDetails).then((response: any) => {
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
/// Block User
///
router.post(domain + Endpoints.User.BlockUser.Path, (req: any, res: any) => {
    const {
        credentials, blockUserId,
    } = req.body;
    const userId = RoutesUtil.HandleJSON(credentials).userId;

    GatewaysProvider.UserGateway.BlockUser(userId, blockUserId).then((response: any) => {
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
/// Get Profile
///
router.post(domain + Endpoints.User.GetProfile.Path, (req: any, res: any) => {
    const {
        credentials,
    } = req.body;
    const userId = RoutesUtil.HandleJSON(credentials).userId;

    GatewaysProvider.UserGateway.GetProfile(userId).then((response: any) => {
        const reply: IServerReply = {
            Success: response !== null,
            Data: response,
        };
        res.status(200).send(reply);
    }).catch((err: any) => {
        res.status(500).send(err);
    });
});

export default router;
