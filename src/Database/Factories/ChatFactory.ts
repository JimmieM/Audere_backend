import { ChatMessage } from "auderecommon";
import { ChatTable, Tables } from "../../Mappers/Tables";

class ChatFactory {

    public static ChatMessage = ({ chats }: { chats: any }): ChatMessage => {
        const chat = chats[0];
        if (!chat) {
            return null;
        }
        return new ChatMessage(
            chat[ChatTable.Id],
            chat[ChatTable.ToUserId],
            chat[ChatTable.FromUserId],
            chat[ChatTable.Message],
            chat[ChatTable.DateSent],
            chat[ChatTable.DateRead],
            chat[ChatTable.SecretKey],
        );
    }
}

export default ChatFactory;
