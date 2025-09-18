import React, { useState, useEffect, useRef } from 'react';
import { User, Conversation, Message, Attachment } from '../../types';
import { users } from '../../data/users';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

interface ChatWindowProps {
    conversation: Conversation;
    currentUser: User;
    onSendMessage: (text: string | null, attachment: Attachment | null) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, currentUser, onSendMessage }) => {
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    
    const otherParticipantId = conversation.participants.find(p => p !== currentUser.agentId);
    const contact = users.find(u => u.agentId === otherParticipantId);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [conversation.messages]);

    // Effect to simulate the contact typing
    useEffect(() => {
        setIsTyping(false); 
        let stopTypingTimer: number;

        const startTypingTimer = setTimeout(() => {
            setIsTyping(true);
            stopTypingTimer = setTimeout(() => {
                setIsTyping(false);
            }, 2000 + Math.random() * 2000); 
        }, 1200); 

        return () => {
            clearTimeout(startTypingTimer);
            clearTimeout(stopTypingTimer);
        };
    }, [conversation]);
    
    if (!contact) {
        return <div className="flex items-center justify-center h-full">Invalid Contact</div>;
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800">
            <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <img className="w-10 h-10 rounded-full object-cover" src={contact.avatarUrl} alt={contact.name} />
                <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{contact.name}</p>
                    {isTyping ? (
                        <p className="text-xs text-moriah-green-500 animate-pulse">is typing...</p>
                    ) : (
                        <p className="text-xs text-green-500">Online</p>
                    )}
                </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50 dark:bg-gray-900">
                {conversation.messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        isOwnMessage={msg.senderId === currentUser.agentId}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <MessageInput onSendMessage={onSendMessage} />
        </div>
    );
};

export default ChatWindow;
