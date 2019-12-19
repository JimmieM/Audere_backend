
import AchievementsMs from "../Database/Microservices/Achievements/AchievementsMs";
import DateProposalsMs from "../Database/Microservices/Dates/DateProposalsMs";
import MatchesMs from "../Database/Microservices/Matches/MatchesMs";
import UserMs from "../Database/Microservices/Users/UserMs";
import ChatMs from "../Database/Microservices/Chat/ChatMs";

class Gateway {
    protected Users = new UserMs();
    protected Achievements = new AchievementsMs();
    protected Dates = new DateProposalsMs();
    protected Matches = new MatchesMs();
    protected Chats = new ChatMs();
}

export default Gateway;
