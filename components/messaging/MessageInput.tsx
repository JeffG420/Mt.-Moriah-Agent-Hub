import React, { useState, useRef } from 'react';
import { Attachment } from '../../types';
import { PaperClipIcon, XMarkIcon, DocumentIcon } from '../icons';

interface MessageInputProps {
    onSendMessage: (text: string | null, attachment: Attachment | null) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [text, setText] = useState('');
    const [attachment, setAttachment] = useState<Attachment | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAttachment({
                    type: file.type.startsWith('image/') ? 'image' : 'pdf',
                    url: e.target?.result as string,
                    name: file.name
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAttachClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() || attachment) {
            onSendMessage(text.trim() || null, attachment);
            setText('');
            setAttachment(null);
            if(fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-800">
            {attachment && (
                <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-between">
                    <div className="flex items-center min-w-0">
                        {attachment.type === 'image' ? (
                            <img src={attachment.url} alt="preview" className="w-10 h-10 rounded-md object-cover mr-2" />
                        ) : (
                            <DocumentIcon className="w-8 h-8 text-gray-500 mr-2 flex-shrink-0" />
                        )}
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{attachment.name}</span>
                    </div>
                    <button onClick={() => setAttachment(null)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                        <XMarkIcon className="w-4 h-4 text-gray-600 dark:text-gray-300"/>
                    </button>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="relative flex items-center">
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*,application/pdf"
                    />
                    <button
                        type="button"
                        onClick={handleAttachClick}
                        className="p-2 text-gray-500 hover:text-moriah-green-600 dark:hover:text-moriah-green-400 transition-colors"
                    >
                        <PaperClipIcon className="w-6 h-6" />
                    </button>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type a message..."
                        autoComplete="off"
                        className="w-full py-2 pl-3 pr-12 text-gray-700 bg-gray-100 border border-transparent rounded-full dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-moriah-green-500"
                    />
                    <button
                        type="submit"
                        className="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-10 text-white transition-colors duration-300 rounded-full bg-moriah-green-600 hover:bg-moriah-green-700 focus:outline-none disabled:bg-moriah-green-400"
                        disabled={!text.trim() && !attachment}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MessageInput;
