// Models
import { IUserCreationOptions, SimpleUser, User } from "auderecommon";

// Typedef
import { UsersTable } from "../../Mappers/Tables";

// Utils
import ImageService, { ImageType } from "../../Services/ImageService";
import UserUtil from "../../Utilities/UserUtil";

class UserFactory {

    /**
     * Base64 to Avatar.
     * Returns the path of where the image shall be stored.
     *
     * @static
     */
    public static SaveAvatar = (user: User | SimpleUser): string => {
        const base64Data = user.Avatar.replace(/^data:image\/png;base64,/, "");

        const imageService = new ImageService();
        return imageService.Save(base64Data, imageService.Paths.Avatars.Path + user.Username);
    }

    /**
     * Avatar to base64 format
     *
     * @static
     */
    public static AvatarToBase64 = (Avatar: string): string => {
        const imageService = new ImageService();
        return imageService.ToBase64(Avatar);
    }

    /**
     * Returns Simple User
     *
     * @static
     */
    public static SimpleProfiles = ({ users }: { users: any }): SimpleUser[] => {
        if (!users) {
            return null;
        }
        return users.map((user: any) => {
            return new SimpleUser(user[UsersTable.Id],
                user[UsersTable.Username],
                UserFactory.AvatarToBase64(user[UsersTable.Avatar]),
                UserFactory.PersonalDetails(user),
                UserUtil.GetUserConnectivityState(user[UsersTable.LatestOnline]),
            );
        });

    }

    /**
     * Returns an IUserCreationOptions Model
     *
     * @static
     */
    public static PersonalDetails = (obj: any): IUserCreationOptions => {
        const details: IUserCreationOptions = {
            Personal: {
                Name: {
                    FirstName: obj[UsersTable.FirstName],
                    LastName: obj[UsersTable.LastName],
                },
                Birthday: obj[UsersTable.UserBirthDay],
            },
        };
        return details;
    }

    /**
     * returns a Full profile
     *
     * @static
     */
    // tslint:disable-next-line: max-line-length
    public static FullProfile = ({ users }: { users: any }): User => {
        const user = users[0];

        if (!user) {
            return null;
        }
        const UserPersonalDetails: IUserCreationOptions = UserFactory.PersonalDetails(user);

        const connectivity = UserUtil.GetUserConnectivityState(user[UsersTable.LatestOnline]);

        return new User(
            user[UsersTable.Id],
            user[UsersTable.Username],
            UserFactory.AvatarToBase64(user[UsersTable.Avatar]),
            UserPersonalDetails,
            connectivity,
        );
    }
}

export default UserFactory;
