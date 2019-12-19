
///
/// ALL TABLES
///

enum Tables {
    Users = "users",
    Achievements = "achievements",
    UserAchievements = "user_achievements",
    Chats = "chats",
    ChatMapper = "chat_mapper",
    DateProposals = "date_proposals",
    DateProposalsMatchesMapper = "date_proposals_matches_mapper",
    DateRatings = "date_ratings",
    BlockedUsersMapper = "blocked_users_mapper",
}

//
// DEFINITIONS FOR TABLES
//

const TableOperators = {
    NO: 0,
    YES: 1,
};

const UsersTable = {
    Id: "user_id",
    Username: "user_username",
    Email: "user_email",
    FirstName: "user_firstname",
    LastName: "user_lastname",
    UserBirthDay: "user_birthday",
    Avatar: "user_avatar",
    LatestOnline: "user_latest_online",
    EncryptedPassword: "user_encrypted_password",
};

const DateProposalsTable = {
    Id: "dp_id",
    UserId: "dp_user_id", // The one that made the proposal
    DateCreated: "dp_date_created",
    Date: "dp_date",
    Location: "dp_location",
    LocationCoordinates: "dp_location_coordinates",
    Delisted: "dp_delisted",
};

const DateProposalsMatchesMapperTable = {
    Id: "dpmatch_id",
    DateProposalId: "dpmatch_dp_id",
    UserId: "dpmatch_user_id",
    ProposerUserId: "dpmatch_proposer_user_id",
    Date: "dpmatch_date",
    Accepted: "dpmatch_accepted",
    Declined: "dpmatch_declined",
};

const ChatTable = {
    Id: "chat_id",
    Message: "chat_message",
    SecretKey: "chat_secret_key",
    DateSent: "chat_date_sent",
    DateRead: "chat_date_read",
    FromUserId: "chat_from_user_id",
    ToUserId: "chat_to_user_id",
};

const ChatMapperTable = {
    Id: "cm_id",
    ChatId: "cm_chat_id",
    ChatFromUserId: "cm_from_user_id",
    ChatToUserId: "cm_to_user_id",
};

const AchievementsTable = {
    Id: "a_achievement_id",
    FaceValue: "a_achievement_face_value",
    Name: "a_achievement_name",
    Description: "a_achievement_description",
    Requirements: "a_achievement_requirements",
};

const UserAchievementsTable = {
    Id: "u_achievement_id",
    UserId: "u_achievement_user_id",
    AchievementId: "u_achievement_base_id",
    CompletionDate: "u_achievement_completion_date",
};

const FriendshipsMapperTable = {
    Id: "friendship_id",
    UserId1: "friendship_user_id_1",
    UserId2: "friendship_user_id_2",
    Status: "friendship_status",
};

const DateRatingTable = {
    Id: "rating_id",
    MatchUserId: "rating_match_user_id",
    ProposerUserId: "rating_proposer_user_id",
    Rating: "rating_value",
    Date: "rating_date",
};

const BlockedUsersMapperTable = {
    Id: "bum_id",
    UserId1: "bum_user_id_1",
    UserId2: "bum_user_id_2",
    Date: "bum_date",
};

export {
    Tables,
    TableOperators,
    UsersTable,
    DateProposalsMatchesMapperTable,
    DateProposalsTable,
    AchievementsTable,
    UserAchievementsTable,
    FriendshipsMapperTable,
    ChatTable,
    ChatMapperTable,
    DateRatingTable,
    BlockedUsersMapperTable,
};
