import React, { useState, useEffect } from 'react';
import ContactList from '../messaging/ContactList';
import ChatWindow from '../messaging/ChatWindow';
import { users } from '../../data/users';
import { conversations as initialConversations } from '../../data/mockData';
import { User, Conversation, Message, Attachment } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { ChatBubbleLeftRightIcon } from '../icons';

const MessagingPage: React.FC = () => {
    const { user } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
    
    const defaultConversation = conversations.find(c => c.participants.includes(user?.agentId || '')) || null;
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(defaultConversation);
    
    const { requestPermission, showNotification } = useNotifications();

    // Request notification permission when the component mounts
    useEffect(() => {
        requestPermission();
    }, [requestPermission]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleSelectConversation = (conversation: Conversation) => {
        setSelectedConversation(conversation);
    };

    const handleSendMessage = (text: string | null, attachment: Attachment | null) => {
        if (!selectedConversation) return;

        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: user.agentId,
            text: text || undefined,
            attachment: attachment || undefined,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'sent',
        };

        let updatedSelectedConversation: Conversation | undefined;
        const updatedConversations = conversations.map(conv => {
            if (conv.id === selectedConversation.id) {
                updatedSelectedConversation = { ...conv, messages: [...conv.messages, newMessage] };
                return updatedSelectedConversation;
            }
            return conv;
        });

        setConversations(updatedConversations);
        
        if(updatedSelectedConversation) {
            setSelectedConversation(updatedSelectedConversation);
        }

        // Simulate a reply and trigger a notification
        simulateReply(updatedSelectedConversation);
    };

    const simulateReply = (conversation: Conversation | undefined) => {
        if (!conversation) return;

        const otherParticipantId = conversation.participants.find(p => p !== user.agentId);
        const otherUser = users.find(u => u.agentId === otherParticipantId);

        if (otherUser) {
            // Wait for a few seconds to make it feel real
            setTimeout(() => {
                const replyMessage: Message = {
                    id: `msg-reply-${Date.now()}`,
                    senderId: otherUser.agentId,
                    text: `Hey, I've received your message. I'll get back to you soon!`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    status: 'delivered',
                };
                
                // Add the reply to the conversation state
                setConversations(prevConversations => {
                    const newConversations = prevConversations.map(conv => {
                         if (conv.id === conversation.id) {
                            return { ...conv, messages: [...conv.messages, replyMessage] };
                        }
                        return conv;
                    });
                    
                    const updatedConv = newConversations.find(c => c.id === conversation.id);
                    if (updatedConv) setSelectedConversation(updatedConv);
                    
                    return newConversations;
                });
                
                // If the user isn't looking at the page, show a notification
                if (document.hidden) {
                    showNotification(`New message from ${otherUser.name}`, {
                        body: replyMessage.text,
                        icon: otherUser.avatarUrl,
                    });
                }
            }, 3000 + Math.random() * 2000); // Realistic delay
        }
    };

    const userConversations = conversations.filter(c => c.participants.includes(user.agentId));

    return (
        <div className="flex h-[calc(100vh-12rem)] rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
            <div className="w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                <ContactList
                    conversations={userConversations}
                    currentUser={user}
                    selectedConversationId={selectedConversation?.id}
                    onSelectConversation={handleSelectConversation}
                />
            </div>
            <div className="hidden md:flex w-2/3 flex-col">
                {selectedConversation ? (
                    <ChatWindow
                        conversation={selectedConversation}
                        currentUser={user}
                        onSendMessage={handleSendMessage}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                        <ChatBubbleLeftRightIcon className="w-16 h-16 mb-4 text-gray-400" />
                        <h3 className="text-xl font-semibold">Welcome to your Inbox</h3>
                        <p>Select a conversation to start chatting.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessagingPage;