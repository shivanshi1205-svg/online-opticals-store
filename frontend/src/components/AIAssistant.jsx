import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm the Sandeep Opticals AI Assistant. How can I help you today? ✨", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(userMessage.text.toLowerCase());
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: 'bot' }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (text) => {
    if (text.includes('book') || text.includes('appointment') || text.includes('test') || text.includes('checkup')) {
      return (
        <span>
          You can easily book a free computerized eye test with our experts! <Link to="/book-eye-test" className="text-secondary font-bold underline cursor-pointer" onClick={() => setIsOpen(false)}>Click here to book your test</Link>.
        </span>
      );
    }
    if (text.includes('price') || text.includes('cost') || text.includes('how much')) {
      return "Our high-quality frames start at just ₹500, and premium computer lenses start at ₹800. We also offer huge discounts on luxury brands! You can check our Shop for specific prices.";
    }
    if (text.includes('location') || text.includes('address') || text.includes('where')) {
      return "We are located at Sabji Mandi Market, Mulayam Nagar, Lucknow, Uttar Pradesh. We are open every day from 10:00 AM to 9:00 PM.";
    }
    if (text.includes('hello') || text.includes('hi ') || text === 'hi' || text.includes('hey')) {
      return "Hello! You can ask me about booking an eye test, our store location, or pricing details.";
    }
    return "I am currently learning to answer more questions! For immediate assistance, please call us directly at 9450112628 or visit our store.";
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-50 transition-colors ${isOpen ? 'hidden' : 'bg-primary text-secondary border border-secondary/50 flex items-center justify-center'}`}
        aria-label="Open AI Assistant"
      >
        <Sparkles size={28} className="absolute -top-1 -right-1 text-white animate-pulse" />
        <Bot size={32} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-dark rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
              <div className="flex items-center space-x-3 z-10">
                <div className="bg-secondary/20 p-2 rounded-full relative">
                  <Bot size={24} className="text-secondary" />
                  <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-primary rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight text-secondary tracking-wide">OptiBot AI</h3>
                  <p className="text-xs text-gray-300">Customer Support Agent</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition z-10">
                <X size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#1a1a1a]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0">
                      <Bot size={16} className="text-primary dark:text-secondary" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white dark:bg-[#2a2a2a] text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0">
                    <Bot size={16} className="text-primary dark:text-secondary" />
                  </div>
                  <div className="bg-white dark:bg-[#2a2a2a] p-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-800 shadow-sm flex items-center space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-dark border-t border-gray-100 dark:border-white/10">
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your question..." 
                  className="flex-1 bg-gray-100 dark:bg-[#2a2a2a] text-dark dark:text-light rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary/50 border border-transparent transition"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-primary text-secondary p-2.5 rounded-full hover:bg-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition transform active:scale-95 shadow-md"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="text-center mt-2">
                <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest">Powered by Sandeep AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
