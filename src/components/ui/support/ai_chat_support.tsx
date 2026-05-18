import { ReactElement, useState } from "react";
import { IoArrowBack, IoSend } from "react-icons/io5";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AIChartSupportProps {
  onBack: () => void;
}

const commonQuestions = [
  { id: "return-policy", text: "What is your return policy?" },
  { id: "how-to-return", text: "How do I return a product?" },
  { id: "shipping-time", text: "How long does shipping take?" },
  { id: "track-order", text: "How do I track my order?" },
];

const aiResponses: Record<string, string> = {
  "return-policy": `Our return policy allows you to return products within 30 days of purchase. Items must be unused and in original packaging. Refunds are processed within 5-7 business days after we receive your return.`,
  "how-to-return": `To return a product:\n1. Go to your Account > Order History\n2. Select the order you want to return\n3. Click "Request Return"\n4. Fill out the return form with reason\n5. Print the prepaid shipping label\n6. Pack the item securely and ship it back\n\nYou'll receive a confirmation email once we process your return.`,
  "shipping-time": `Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business days. You'll receive a tracking number once your order ships.`,
  "track-order": `To track your order:\n1. Go to your Account > Order History\n2. Click on your order\n3. You'll see the tracking number and current status\n\nYou can also click the tracking number to see detailed shipping information.`,
};

export default function AIChatSupport({
  onBack,
}: AIChartSupportProps): ReactElement {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi! I'm your AI assistant. I can help you with questions about returns, shipping, and orders. Select a question below or type your own.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "";
      const lowerText = text.toLowerCase();

      if (lowerText.includes("return policy")) {
        aiResponse = aiResponses["return-policy"];
      } else if (lowerText.includes("return") || lowerText.includes("refund")) {
        aiResponse = aiResponses["how-to-return"];
      } else if (
        lowerText.includes("shipping") ||
        lowerText.includes("delivery")
      ) {
        aiResponse = aiResponses["shipping-time"];
      } else if (lowerText.includes("track")) {
        aiResponse = aiResponses["track-order"];
      } else {
        aiResponse = `I understand you're asking about "${text}". For detailed assistance with specific issues, I recommend talking to our admin support team. You can also check our FAQ page for more information.`;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuestionClick = (questionText: string) => {
    handleSendMessage(questionText);
  };

  const handleBack = () => {
    if (messages.length > 1) {
      // Reset conversation to initial state
      setMessages([
        {
          id: "welcome",
          text: "Hi! I'm your AI assistant. I can help you with questions about returns, shipping, and orders. Select a question below or type your own.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
      setInputText("");
      setIsTyping(false);
    } else {
      // Go back to options (admin/AI selection)
      onBack();
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      {/* Back Button */}
      <button
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
        onClick={handleBack}
      >
        <IoArrowBack className="w-5 h-5" />
        <span className="text-sm">
          {messages.length > 1 ? "New conversation" : "Back to options"}
        </span>
      </button>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="mb-4">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            Quick questions:
          </p>
          <div className="grid grid-cols-1 gap-2">
            {commonQuestions.map((q) => (
              <button
                key={q.id}
                className="text-left text-sm px-3 py-2 border border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => handleQuestionClick(q.text)}
              >
                {q.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-primary"
          placeholder="Type your question..."
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage(inputText);
            }
          }}
        />
        <button
          className="px-6 py-3 bg-primary text-white hover:bg-primary/90 transition-colors flex items-center justify-center"
          onClick={() => handleSendMessage(inputText)}
        >
          <IoSend className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
