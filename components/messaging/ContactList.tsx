import React from 'react';
import { User, Conversation } from '../../types';
import { users } from '../../data/users';
import PresenceDot from '../common/PresenceDot';

interface ContactListProps {
    conversations: Conversation[];
    currentUser: User;
    selectedConversationId?: string;
    onSelectConversation: (conversation: Conversation) => void;
}

const ContactList: React.FC<ContactListProps> = ({ conversations, currentUser, selectedConversationId, onSelectConversation }) => {
    
    const getOtherParticipant = (participants: string[]): User | undefined => {
        const otherId = participants.find(pId => pId !== currentUser.agentId);
        return users.find(u => u.agentId === otherId);
    };

    const getMessageSnippet = (conversation: Conversation): string => {
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        if (!lastMessage) return "No messages yet";
        if (lastMessage.attachment) {
            return lastMessage.attachment.type === 'image' ? "Sent an image" : "Sent a PDF";
        }
        return lastMessage.text || "No text";
    }

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chats</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                <ul role="list">
                    {conversations.map((conv) => {
                        const otherUser = getOtherParticipant(conv.participants);
                        if (!otherUser) return null;

                        return (
                            <li
                                key={conv.id}
                                onClick={() => onSelectConversation(conv)}
                                className={`flex items-center p-3 cursor-pointer transition-colors ${
                                    selectedConversationId === conv.id
                                        ? 'bg-moriah-green-100 dark:bg-moriah-green-900/50'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                <div className="relative flex-shrink-0">
                                    <img className="w-10 h-10 rounded-full object-cover" src={otherUser.avatarUrl} alt={otherUser.name} />
                                    <div className="absolute bottom-0 right-0">
                                       <PresenceDot status="Online" size="sm" />
                                    </div>
                                </div>
                                <div className="ml-3 flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{otherUser.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {getMessageSnippet(conv)}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default ContactList;
