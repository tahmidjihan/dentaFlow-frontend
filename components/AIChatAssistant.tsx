'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
  'how often should i visit the dentist':
    'We recommend visiting the dentist every 6 months for routine check-ups and professional cleanings. This helps detect potential issues early and maintain optimal oral health.',
  'what should i do for a toothache':
    'For a toothache, rinse your mouth with warm salt water, gently floss around the affected tooth to remove any trapped food, and take an over-the-counter pain reliever if needed. If the pain persists for more than 1-2 days, please book an appointment with us.',
  'how to book an appointment':
    'You can book an appointment by clicking the "Book Now" button in the navigation bar, or visit our Clinics page and select your preferred clinic. Choose a date and time that works for you, and you will receive a confirmation email.',
  'do you accept insurance':
    'Yes, we work with most major dental insurance providers. Our team will help you verify your coverage and process claims efficiently. We also offer flexible payment plans for treatments not fully covered by insurance.',
  'what services do you offer':
    'We offer a comprehensive range of dental services including general dentistry, cosmetic dentistry, orthodontics, oral surgery, pediatric dentistry, emergency dental care, and preventive care.',
  'how much does teeth whitening cost':
    'Professional teeth whitening costs vary depending on the treatment type. In-chair whitening typically ranges from £300-£600, while take-home kits are around £150-£300. Book a consultation for a personalized quote.',
  'what are dental implants':
    'Dental implants are titanium posts surgically placed in your jawbone to replace missing tooth roots. They provide a permanent, natural-looking solution for missing teeth and can support crowns, bridges, or dentures.',
  'hello':
    'Hello! Welcome to DentaWave. How can I help you today? I can answer questions about our services, booking appointments, dental care tips, and more.',
  'hi':
    'Hi there! Welcome to DentaWave. What can I help you with today?',
  'thank you':
    "You're welcome! Is there anything else I can help you with? Don't hesitate to reach out if you have more questions.",
};

const defaultResponse =
  "Thank you for your question! While I don't have a specific answer for that right now, I can help you with information about our services, booking appointments, dental care tips, and general dental health questions. Would you like to know more about any of these topics?";

const commonQuestions = [
  'How often should I visit the dentist?',
  'How do I book an appointment?',
  'Do you accept insurance?',
  'What services do you offer?',
  'What should I do for a toothache?',
];

function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase().trim();

  // Check for exact or partial matches in predefined responses
  for (const [key, response] of Object.entries(predefinedResponses)) {
    if (lowerMessage.includes(key) || key.includes(lowerMessage)) {
      return response;
    }
  }

  // Check for keyword matches
  const keywordMap: Record<string, string[]> = {
    'how often should i visit the dentist': ['visit', 'often', 'checkup', 'check-up', 'routine'],
    'what should i do for a toothache': ['toothache', 'tooth ache', 'pain', 'hurt', 'sore'],
    'how to book an appointment': ['book', 'appointment', 'schedule', 'reserve'],
    'do you accept insurance': ['insurance', 'coverage', 'pay', 'payment'],
    'what services do you offer': ['service', 'offer', 'treatment', 'procedure'],
    'how much does teeth whitening cost': ['whitening', 'bleach', 'brighten', 'cost', 'price'],
    'what are dental implants': ['implant', 'replace', 'missing tooth'],
  };

  for (const [responseKey, keywords] of Object.entries(keywordMap)) {
    if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return predefinedResponses[responseKey];
    }
  }

  return defaultResponse;
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! I'm your DentaWave assistant. I can help you with information about our services, booking appointments, and dental care tips. How can I help you today?",
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

    // Simulate AI thinking
    await new Promise((resolve) =>
      setTimeout(resolve, 500 + Math.random() * 1000),
    );

    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: getAIResponse(userMessage.content),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiResponse]);
    setIsTyping(false);
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
                  DentaWave Assistant
                </h3>
                <p className='text-xs text-on-primary/70'>Online</p>
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
                    <span className='w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce' style={{ animationDelay: '0ms' }} />
                    <span className='w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce' style={{ animationDelay: '150ms' }} />
                    <span className='w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce' style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className='px-4 pb-2'>
              <p className='text-xs text-on-surface-variant mb-2'>Quick questions:</p>
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
                placeholder='Type your message...'
                className='flex-1 px-4 py-2 rounded-full bg-surface-container-high text-on-surface text-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20'
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
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
