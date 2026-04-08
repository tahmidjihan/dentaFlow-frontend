'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const commonQuestions = [
  'How often should I visit the dentist?',
  'How do I book an appointment?',
  'Do you accept insurance?',
  'What services do you offer?',
  'What should I do for a toothache?',
];

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! I'm DentaBot, your AI dental assistant. I can help with dental health questions, booking guidance, and care tips. How can I help?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

      // Convert messages to API format (exclude welcome message)
      const apiMessages = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        }));

      // Add the current user message
      apiMessages.push({ role: 'user' as const, content: userMessage.content });

      const response = await fetch(`${apiBaseUrl}/api/chat/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          "I'm having trouble connecting right now. Please try again in a moment, or feel free to book an appointment directly through our platform.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className='fixed bottom-20 right-4 md:right-8 w-[calc(100vw-2rem)] sm:w-96 max-h-[500px] bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/20 z-50 flex flex-col overflow-hidden'>
          {/* Header */}
          <div className='bg-primary p-4 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-full bg-on-primary/20 flex items-center justify-center'>
                <span className='material-symbols-outlined text-on-primary text-sm'>
                  smart_toy
                </span>
              </div>
              <div>
                <h3 className='font-headline font-bold text-on-primary text-sm'>
                  DentaBot AI Assistant
                </h3>
                <p className='text-xs text-on-primary/70'>Powered by AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className='text-on-primary/70 hover:text-on-primary transition-colors'
            >
              <span className='material-symbols-outlined text-sm'>close</span>
            </button>
          </div>

          {/* Messages */}
          <div className='flex-1 overflow-y-auto p-4 space-y-4 max-h-[300px]'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-on-primary rounded-br-md'
                      : 'bg-surface-container-high text-on-surface rounded-bl-md'
                  }`}
                >
                  <p className='text-sm leading-relaxed'>{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className='flex justify-start'>
                <div className='bg-surface-container-high rounded-2xl rounded-bl-md px-4 py-3'>
                  <div className='flex gap-1'>
                    <span
                      className='w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce'
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className='w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce'
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className='w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce'
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className='px-4 pb-2'>
              <p className='text-xs text-on-surface-variant mb-2'>
                Quick questions:
              </p>
              <div className='flex flex-wrap gap-2'>
                {commonQuestions.slice(0, 3).map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuickQuestion(q)}
                    className='text-xs px-3 py-1.5 bg-surface-container-high text-on-surface-variant rounded-full hover:bg-primary/10 hover:text-primary transition-colors'
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className='p-4 border-t border-outline-variant/10'>
            <div className='flex gap-2'>
              <input
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder='Ask me anything about dental care...'
                className='flex-1 px-4 py-2 rounded-full bg-surface-container-high text-on-surface text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20'
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className='w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <span className='material-symbols-outlined text-sm'>send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed bottom-4 md:bottom-8 right-4 md:right-8 w-14 h-14 rounded-full bg-primary text-on-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center z-50'
        aria-label='Open chat assistant'
      >
        <span className='material-symbols-outlined text-2xl'>
          {isOpen ? 'close' : 'chat'}
        </span>
      </button>
    </>
  );
}
