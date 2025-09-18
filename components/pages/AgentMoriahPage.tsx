import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { useAuth } from '../../hooks/useAuth';
import { ChatMessage } from '../../types';
import { SparklesIcon, UserCircleIcon } from '../icons';

const AgentMoriahPage: React.FC = () => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);
    
    useEffect(() => {
        if (!user) return;
        
        async function initializeChat() {
            try {
                if (!process.env.API_KEY) {
                    throw new Error("API_KEY environment variable not set");
                }
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: `You are Agent Moriah, an expert AI assistant for Mount Moriah real estate agents. Your purpose is to provide quick, accurate, and helpful information based on the company's handbook and general real estate knowledge. You are professional, encouraging, and an expert in sales strategies, RESA compliance, and company-specific processes. You can draft messages to clients, explain commission structures, summarize handbook sections, and provide marketing ideas. Always refer to yourself as Agent Moriah. The user you are talking to is ${user?.name}, a ${user?.role} at Mount Moriah.`
                    }
                });
                setChat(newChat);
                setMessages([{
                    id: 'intro-1',
                    role: 'model',
                    content: `Hello ${user.name.split(' ')[0]}, I'm Agent Moriah. How can I help you succeed today? Feel free to ask me about sales strategies, compliance rules, or help drafting a client message.`
                }]);
            } catch (err: any) {
                console.error("Failed to initialize AI Chat:", err);
                setError("Could not initialize Agent Moriah. Please check the API key and configuration.");
            }
        }
        initializeChat();
    }, [user]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || !chat) return;

        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: userInput,
        };
        setMessages(prev => [...prev, userMessage]);
        setUserInput('');
        setIsLoading(true);
        setError(null);

        try {
            const result = await chat.sendMessageStream({ message: userInput });
            
            let modelResponse = '';
            const modelMessageId = `model-${Date.now()}`;
            
            // Add a placeholder for the model's response
            setMessages(prev => [...prev, { id: modelMessageId, role: 'model', content: '' }]);

            for await (const chunk of result) {
                modelResponse += chunk.text;
                setMessages(prev => prev.map(msg => 
                    msg.id === modelMessageId ? { ...msg, content: modelResponse } : msg
                ));
            }
        } catch (err: any) {
            console.error("Error sending message to Gemini:", err);
            setError("Sorry, I encountered an issue. Please try again.");
            const errorResponseMessage: ChatMessage = {
                id: `error-${Date.now()}`,
                role: 'model',
                content: "My apologies, but I'm unable to respond right now. Please try again in a moment.",
            };
            setMessages(prev => [...prev, errorResponseMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-12rem)] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <SparklesIcon className="w-8 h-8 mr-3 text-moriah-green-500" />
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Agent Moriah</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Your Personal AI Assistant</p>
                </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                        {message.role === 'model' && (
                            <div className="w-8 h-8 flex-shrink-0 bg-moriah-green-500 rounded-full flex items-center justify-center">
                                <SparklesIcon className="w-5 h-5 text-white" />
                            </div>
                        )}
                        <div className={`max-w-lg px-4 py-2 rounded-2xl ${message.role === 'user' ? 'bg-moriah-green-600 text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'}`}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                         {message.role === 'user' && user && (
                             <img className="w-8 h-8 rounded-full" src={user.avatarUrl} alt="User avatar" />
                        )}
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start gap-3">
                         <div className="w-8 h-8 flex-shrink-0 bg-moriah-green-500 rounded-full flex items-center justify-center">
                            <SparklesIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="max-w-lg px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-700">
                           <div className="flex items-center space-x-1">
                               <span className="h-2 w-2 bg-moriah-green-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                               <span className="h-2 w-2 bg-moriah-green-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                               <span className="h-2 w-2 bg-moriah-green-500 rounded-full animate-pulse"></span>
                           </div>
                        </div>
                     </div>
                )}
                {error && <p className="text-center text-red-500">{error}</p>}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSendMessage} className="relative">
                    <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(e);
                            }
                        }}
                        placeholder="Ask Agent Moriah anything..."
                        className="w-full py-3 pl-4 pr-12 text-sm text-gray-900 bg-gray-100 border-transparent rounded-lg resize-none dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-moriah-green-500"
                        rows={1}
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !userInput.trim()}
                        className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-moriah-green-600 transition-colors duration-300 rounded-r-lg hover:bg-moriah-green-100 dark:text-moriah-green-400 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Send message"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AgentMoriahPage;
