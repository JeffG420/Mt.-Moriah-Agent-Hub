import React from 'react';
import { Message } from '../../types';
import { DocumentIcon, CheckIcon, CheckBadgeIcon } from '../icons';

interface MessageBubbleProps {
    message: Message;
    isOwnMessage: boolean;
}

const StatusIcon: React.FC<{ status: Message['status'] }> = ({ status }) => {
    switch(status) {
        case 'sent':
            return <CheckIcon className="w-4 h-4 text-gray-400" />;
        case 'delivered':
            return <CheckBadgeIcon className="w-4 h-4 text-gray-400" />;
        case 'read':
            return <CheckBadgeIcon className="w-4 h-4 text-blue-500" />;
        default:
            return null;
    }
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwnMessage }) => {
    const bubbleClasses = isOwnMessage
        ? 'bg-moriah-green-600 text-white rounded-br-none'
        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none';

    const renderAttachment = () => {
        if (!message.attachment) return null;

        if (message.attachment.type === 'image') {
            return (
                <div className="mt-2">
                    <img src={message.attachment.url} alt={message.attachment.name} className="rounded-lg max-w-xs max-h-48 object-cover cursor-pointer" />
                </div>
            );
        }

        if (message.attachment.type === 'pdf') {
            return (
                <div className={`mt-2 p-2 rounded-lg flex items-center ${isOwnMessage ? 'bg-moriah-green-700' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    <DocumentIcon className="w-8 h-8 flex-shrink-0 mr-2" />
                    <div className="flex-grow">
                        <p className="text-sm font-medium truncate">{message.attachment.name}</p>
                        <a href={message.attachment.url} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline">Download PDF</a>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className={`flex flex-col max-w-md ${isOwnMessage ? 'items-end self-end ml-auto' : 'items-start self-start mr-auto'}`}>
            <div className={`rounded-lg px-3 py-2 ${bubbleClasses}`}>
                {message.text && <p className="text-sm">{message.text}</p>}
                {message.attachment && renderAttachment()}
            </div>
             <div className={`flex items-center mt-1 px-1 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
                <span className="text-xs text-gray-500 dark:text-gray-400">{message.timestamp}</span>
                {isOwnMessage && <span className="mx-1"><StatusIcon status={message.status} /></span>}
            </div>
        </div>
    );
};

export default MessageBubble;
