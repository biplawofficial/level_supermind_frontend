import React, { useState, useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import './Chatbot.css';

const Chatbot = ({ botAnimation }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://assign-89sdfs98-backend.vercel.app/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          inputType: 'chat',
          outputType: 'chat',
          stream: false,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage = {
          type: 'bot',
          content: data.response,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Initial screen with large bot animation */}
      {messages.length === 0 && (
        <div className="chatbot-initial-screen">
          <div className="bot-animation-container">
            <Lottie animationData={botAnimation} loop={true} />
          </div>
          <h1 className="chatbot-greeting">Hey there!</h1>
          <p className="chatbot-intro">I'm NavigBot</p>
          <button
            onClick={() => setMessages([{ type: 'bot', content: "What should I call you?" }])}
            className="get-started-btn"
          >
            Get Started
          </button>
        </div>
      )}

      {/* Chat interface */}
      {messages.length > 0 && (
        <>
          {/* Header */}
          <div className='fix'>
          <div className="chatbot-header">
            <div className="bot-animation-small">
              <Lottie animationData={botAnimation} loop={true} />
            </div>
            <div className="header-title">NavigBot</div>
          </div>

          {/* Messages */}
          <div ref={chatContainerRef} className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message-container ${
                  message.type === 'user' ? 'message-user' : 'message-bot'
                }`}
              >
                {message.type === 'bot' && (
                  <div className="bot-icon">
                    <Lottie animationData={botAnimation} loop={true} />
                  </div>
                )}
                <div className={`message-bubble ${message.type}`}>{message.content}</div>
              </div>
            ))}
            {isLoading && (
              <div className="loading-container">
                <div className="loading-dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} className="chat-input-container">
            <div className="input-wrapper">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="chat-input"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="send-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="send-icon"
                >
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
          </form>
          </div>
          {/* Input area */}
          
        </>
      )}
    </div>
  );
};

export default Chatbot;
