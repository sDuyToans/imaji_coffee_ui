import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";

import DefaultLayout from "@/layouts/default.tsx";
import Modal from "@/components/layouts/modal.tsx";

// Constants
const CHAT_API_BASE_URL = "http://localhost:8080/api/v1";
const WEBSOCKET_RECONNECT_DELAY = 5000;
const DEFAULT_CUSTOMER_ID = 16;
const USER_SENDER_ID = 21;
const ADMIN_SENDER_ID = 16;
const USER_SENDER_NAME = "Toan User";
const ADMIN_SENDER_NAME = "Support Admin";
const MESSAGE_MAX_WIDTH = "80%";
const HISTORY_MAX_HEIGHT = "48";

type SenderType = "USER" | "ADMIN";

interface ChatMessage {
  senderName: string;
  senderType: SenderType;
  content: string;
}

interface ChatConversationResponse {
  id: number;
  customerId: number;
  assignedAdminId?: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * @author duytoan
 * @since 05/2026
 */
export default function Chat(): React.ReactElement {
  return (
    <DefaultLayout>
      <ChatHeader />
      <ChatBody />
    </DefaultLayout>
  );
}

/**
 * @author duytoan
 * @since 05/2026
 */
function ChatBody(): React.ReactElement {
  const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);
  const [isOpenNewChat, setIsOpenNewChat] = useState<boolean>(false);

  const openNewChat = () => {
    setIsOpenNewChat(true);
    setIsOpenHistory(false);
  };

  const openHistory = () => {
    setIsOpenHistory(true);
    setIsOpenNewChat(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-6 items-center p-6 py-20 mt-8">
        <button
          className="w-full max-w-md px-8 py-6 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center gap-4 group"
          onClick={openNewChat}
        >
          <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div className="text-left flex-1">
            <h3 className="font-medium text-gray-900 dark:text-white">Start New Conversation</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Get help from our support team</p>
          </div>
        </button>
        <button
          className="w-full max-w-md px-8 py-6 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center gap-4 group"
          onClick={openHistory}
        >
          <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-left flex-1">
            <h3 className="font-medium text-gray-900 dark:text-white">Conversation History</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">View your past conversations</p>
          </div>
        </button>
      </div>
      <Modal
        cancelText={"Close"}
        confirmText={"Close"}
        haveFooter={false}
        isOpen={isOpenNewChat}
        size="5xl"
        styles="max-h-[90vh] overflow-hidden"
        onClose={() => setIsOpenNewChat(false)}
      >
        <Content />
      </Modal>
      <Modal
        cancelText={"Close"}
        confirmText={"Close"}
        haveFooter={false}
        isOpen={isOpenHistory}
        size="4xl"
        styles="max-h-[90vh] overflow-hidden"
        onClose={() => setIsOpenHistory(false)}
      >
        <ChatHistory />
      </Modal>
    </div>
  );
}

/**
 * @author duytoan
 * @since 05/2026
 */
function ChatHeader(): React.ReactElement {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 dark:text-white">
        Customer Support
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        We're here to help with any questions you may have
      </p>
    </div>
  );
}

/**
 * @author duytoan
 * @since 05/2026
 */
function ChatHistory(): React.ReactElement {
  return (
    <div className={"flex h-[550px] md:px-0 my-0"}>
      <History />
    </div>
  );
}

/**
 * @author duytoan
 * @since 05/2026
 */
function History(): React.ReactElement {
  return (
    <div className="w-full p-6">
      <ListBox />
    </div>
  );
}

/**
 * @author duytoan
 * @since 05/2026
 */
function Content(): React.ReactElement {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const [senderType, setSenderType] = useState<SenderType>("USER");
  const [senderName, setSenderName] = useState<string>(USER_SENDER_NAME);
  const [senderId, setSenderId] = useState<number>(USER_SENDER_ID);

  const [chatId, setChatId] = useState<string>("");
  const [isConversationLoading, setIsConversationLoading] =
    useState<boolean>(true);

  const clientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<StompSubscription | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const getConnectionStatus = (): { text: string; colors: string } => {
    if (isConversationLoading) {
      return {
        text: "Connecting...",
        colors: "text-yellow-700 bg-yellow-50 border-yellow-200",
      };
    }

    return isConnected
      ? { text: "Connected", colors: "text-green-700 bg-green-50 border-green-200" }
      : { text: "Disconnected", colors: "text-red-700 bg-red-50 border-red-200" };
  };

  const updateSenderInfo = (type: SenderType): void => {
    if (type === "USER") {
      setSenderId(USER_SENDER_ID);
      setSenderName(USER_SENDER_NAME);
    } else {
      setSenderId(ADMIN_SENDER_ID);
      setSenderName(ADMIN_SENDER_NAME);
    }
  };

  useEffect(() => {
    void initializeConversation();
  }, []);

  const initializeConversation = async (): Promise<void> => {
    try {
      setIsConversationLoading(true);

      const response = await fetch(
        `${CHAT_API_BASE_URL}/chat/customer/${DEFAULT_CUSTOMER_ID}/current`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to get or create current conversation");
      }

      const conversation = (await response.json()) as ChatConversationResponse;

      setChatId(String(conversation.id));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      // eslint-disable-next-line no-console
      console.error("Failed to initialize conversation:", errorMessage);
    } finally {
      setIsConversationLoading(false);
    }
  };

  useEffect(() => {
    if (!chatId) {
      return;
    }

    void setupWebSocketConnection();
  }, [chatId]);

  const setupWebSocketConnection = (): void => {
    const socket = new SockJS(`${CHAT_API_BASE_URL}`);

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: WEBSOCKET_RECONNECT_DELAY,
      onConnect: () => {
        setIsConnected(true);
        subscribeToMessages(client);
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
      onStompError: (frame) => {
        // eslint-disable-next-line no-console
        console.error("STOMP error:", frame);
      },
      onWebSocketError: (event) => {
        // eslint-disable-next-line no-console
        console.error("WebSocket error:", event);
      },
    });

    clientRef.current = client;
    client.activate();
  };

  const subscribeToMessages = (client: Client): void => {
    subscriptionRef.current = client.subscribe(
      `/api/v1/topic/chat/${chatId}`,
      (message: IMessage) => {
        handleMessageReceived(message);
      },
    );
  };

  const handleMessageReceived = (message: IMessage): void => {
    try {
      const receivedMessage = JSON.parse(message.body) as ChatMessage;

      setMessages((prev) => [...prev, receivedMessage]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      // eslint-disable-next-line no-console
      console.error("Failed to parse message:", errorMessage);
    }
  };

  useEffect(() => {
    return () => {
      subscriptionRef.current?.unsubscribe();
      clientRef.current?.deactivate();
      setIsConnected(false);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    updateSenderInfo(senderType);
  }, [senderType]);

  const handleSendMessage = (): void => {
    const trimmedMessage = messageInput.trim();

    if (!trimmedMessage || !chatId) {
      return;
    }

    if (!clientRef.current?.connected) {
      // eslint-disable-next-line no-console
      console.error("WebSocket client is not connected");

      return;
    }

    clientRef.current.publish({
      destination: `/api/v1/app/chat/${chatId}`,
      body: JSON.stringify({
        senderId,
        senderName,
        senderType,
        content: trimmedMessage,
      }),
    });

    setMessageInput("");
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const connectionStatus = getConnectionStatus();
  const isDisabled = isConversationLoading || !chatId;

  return (
    <div className="w-full p-6 bg-white dark:bg-gray-900">
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h2 className="font-medium text-xl md:text-2xl text-gray-900 dark:text-white">
              Support Chat
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Conversation #{chatId || "..."}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <select
              aria-label="Sender role"
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-600"
              value={senderType}
              onChange={(event) =>
                setSenderType(event.target.value as SenderType)
              }
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>

            <input
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-600"
              disabled={isDisabled}
              placeholder="Your name"
              type="text"
              value={senderName}
              onChange={(event) => setSenderName(event.target.value)}
              onKeyDown={handleKeyDown}
            />

            <span
              className={`text-xs px-3 py-1.5 border ${connectionStatus.colors}`}
            >
              {connectionStatus.text}
            </span>
          </div>
        </div>

        <MessageDisplay
          messages={messages}
          messagesEndRef={messagesEndRef}
          senderName={senderName}
          senderType={senderType}
        />

        <div className="flex gap-3 mt-2">
          <input
            className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors"
            disabled={isDisabled}
            placeholder="Type your message here..."
            type="text"
            value={messageInput}
            onChange={(event) => setMessageInput(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="border border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={isDisabled || !isConnected}
            type="button"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

interface MessageDisplayProps {
  messages: ChatMessage[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  senderType: SenderType;
  senderName: string;
}

/**
 * @author duytoan
 * @since 05/2026
 */
function MessageDisplay({
  messages,
  messagesEndRef,
  senderType,
  senderName,
}: Readonly<MessageDisplayProps>): React.ReactElement {
  return (
    <div className="flex-1 overflow-y-auto border border-gray-200 dark:border-gray-800 p-5 bg-gray-50 dark:bg-gray-950">
      {messages.length === 0 ? (
        <EmptyMessageState />
      ) : (
        <MessageList
          messages={messages}
          messagesEndRef={messagesEndRef}
          senderName={senderName}
          senderType={senderType}
        />
      )}
    </div>
  );
}

/**
 * @author duytoan
 * @since 05/2026
 */
function EmptyMessageState(): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-12">
      <div className="mb-4 w-16 h-16 border border-gray-300 dark:border-gray-700 flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <p className="text-gray-500 dark:text-gray-400">
        No messages yet. Start the conversation.
      </p>
    </div>
  );
}

interface MessageListProps {
  messages: ChatMessage[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  senderType: SenderType;
  senderName: string;
}

/**
 * @author duytoan
 * @since 05/2026
 */
function MessageList({
  messages,
  messagesEndRef,
  senderType,
  senderName,
}: Readonly<MessageListProps>): React.ReactElement {
  return (
    <ul className={"flex flex-col gap-4"}>
      {messages.map((message, index) => (
        <MessageItem
          key={`${message.senderName}-${index}-${message.content}`}
          message={message}
          senderName={senderName}
          senderType={senderType}
        />
      ))}
      <div ref={messagesEndRef} />
    </ul>
  );
}

interface MessageItemProps {
  message: ChatMessage;
  senderType: SenderType;
  senderName: string;
}

/**
 * @author duytoan
 * @since 05/2026
 */
function MessageItem({
  message,
  senderType,
  senderName,
}: Readonly<MessageItemProps>): React.ReactElement {
  const isUser = message.senderType === "USER";
  const isMine =
    message.senderType === senderType && message.senderName === senderName;

  return (
    <li className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
      <div className="max-w-[75%] flex flex-col gap-1">
        <span className={`text-xs text-gray-500 dark:text-gray-400 ${isUser ? "text-left" : "text-right"}`}>
          {message.senderName}
        </span>
        <div
          className={`px-4 py-3 ${
            isMine
              ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
          }`}
        >
          <p className="break-words leading-relaxed">{message.content}</p>
        </div>
      </div>
    </li>
  );
}

/**
 * @author duytoan
 * @since 05/2026
 */
function ListBox(): React.ReactElement {
  const items = [
    {
      title: "Support Conversation",
      preview: "User and admin live chat",
    },
  ];

  return (
    <div>
      <h2 className="font-medium text-xl text-gray-900 dark:text-white mb-4">
        Conversation History
      </h2>
      <ListBoxItems items={items} />
    </div>
  );
}

interface ListBoxItemData {
  title: string;
  preview: string;
}

interface ListBoxItemsProps {
  items?: ListBoxItemData[];
}

/**
 * @author duytoan
 * @since 05/2026
 */
function ListBoxItems({
  items = [],
}: Readonly<ListBoxItemsProps>): React.ReactElement {
  return (
    <ul className={"flex flex-col gap-4"}>
      {items.map((item, index) => (
        <ListBoxItem key={`${item.title}-${index}`} item={item} />
      ))}
    </ul>
  );
}

/**
 * @author duytoan
 * @since 05/2026
 */
function ListBoxItem({
  item,
}: Readonly<{ item: ListBoxItemData }>): React.ReactElement {
  const [isOpenHistoryItem, setIsOpenHistoryItem] = useState<boolean>(false);

  const handleToggleHistory = (): void => {
    setIsOpenHistoryItem(!isOpenHistoryItem);
  };

  return (
    <li className="flex gap-3 flex-col border border-gray-300 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <button
        className="w-full h-full cursor-pointer p-6"
        onClick={handleToggleHistory}
      >
        <div className="flex items-start justify-between">
          <div className="text-left">
            <h3 className="font-medium text-lg text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.preview}</p>
          </div>
          <span className="text-gray-400 dark:text-gray-600">
            {isOpenHistoryItem ? "−" : "+"}
          </span>
        </div>
        {isOpenHistoryItem && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Messages from your conversation:
            </p>
            <div className="bg-gray-50 dark:bg-gray-950 p-4 max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Chat history will appear here when messages are loaded
              </p>
            </div>
          </div>
        )}
      </button>
    </li>
  );
}
