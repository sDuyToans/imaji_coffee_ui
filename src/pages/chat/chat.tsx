import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";

import DefaultLayout from "@/layouts/default.tsx";

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

export default function Chat(): React.ReactElement {
  return (
    <DefaultLayout>
      <ChatHeader />
      <ChatHistory />
    </DefaultLayout>
  );
}

function ChatHeader(): React.ReactElement {
  return (
    <h1 className={"text-md md:text-2xl lg:text-5xl text-center"}>
      Talk To Us
    </h1>
  );
}

function ChatHistory(): React.ReactElement {
  return (
    <div className={"flex h-[550px] md:px-10 my-4"}>
      <History />
      <Content />
    </div>
  );
}

function History(): React.ReactElement {
  return (
    <div
      className={
        "hidden md:block md:w-3/12 rounded-l-2xl p-6 border border-gray-200"
      }
    >
      <ListBox />
    </div>
  );
}

function Content(): React.ReactElement {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const [senderType, setSenderType] = useState<SenderType>("USER");
  const [senderName, setSenderName] = useState<string>("Toan User");
  const [senderId, setSenderId] = useState<number>(21);

  const [chatId, setChatId] = useState<string>("");
  const [isConversationLoading, setIsConversationLoading] =
    useState<boolean>(true);

  const customerId = 16;

  const clientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<StompSubscription | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initializeConversation = async (): Promise<void> => {
      try {
        setIsConversationLoading(true);

        const response = await fetch(
          `http://localhost:8080/api/v1/chat/customer/${customerId}/current`,
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

        const conversation =
          (await response.json()) as ChatConversationResponse;

        setChatId(String(conversation.id));
      } catch (error) {
        console.error("Failed to initialize conversation:", error);
      } finally {
        setIsConversationLoading(false);
      }
    };

    void initializeConversation();
  }, []);

  useEffect(() => {
    if (!chatId) {
      return;
    }

    const socket = new SockJS("http://localhost:8080/api/v1");

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        setIsConnected(true);

        subscriptionRef.current = client.subscribe(
          `/api/v1/topic/chat/${chatId}`,
          (message: IMessage) => {
            try {
              const receivedMessage = JSON.parse(message.body) as ChatMessage;

              setMessages((prev) => [...prev, receivedMessage]);
            } catch (error) {
              console.error("Failed to parse message:", error);
            }
          },
        );
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
      onWebSocketError: (event) => {
        console.error("WebSocket error:", event);
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      subscriptionRef.current?.unsubscribe();
      client.deactivate();
      setIsConnected(false);
    };
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (senderType === "USER") {
      setSenderId(21);
      setSenderName("Toan User");
    } else {
      setSenderId(16);
      setSenderName("Support Admin");
    }
  }, [senderType]);

  const handleSendMessage = (): void => {
    const trimmedMessage = messageInput.trim();

    if (!trimmedMessage || !chatId) {
      return;
    }

    if (!clientRef.current || !clientRef.current.connected) {
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

  return (
    <div
      className={
        "w-full md:w-9/12 rounded-2xl md:rounded-l-none md:rounded-r-2xl p-6 border border-gray-200"
      }
    >
      <div className={"flex flex-col h-full gap-4"}>
        <div className={"flex items-center justify-between gap-4 flex-wrap"}>
          <div>
            <h2 className={"font-bold text-lg md:text-xl"}>Customer Support</h2>
            <p className={"text-sm text-gray-500"}>
              Chat ID: {chatId || "Creating..."}
            </p>
          </div>

          <div className={"flex items-center gap-3 flex-wrap"}>
            <select
              className={"border border-gray-200 rounded-xl px-3 py-2"}
              value={senderType}
              onChange={(event) =>
                setSenderType(event.target.value as SenderType)
              }
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>

            <input
              className={"border border-gray-200 rounded-xl px-3 py-2"}
              disabled={isConversationLoading || !chatId}
              type="text"
              value={senderName}
              onChange={(event) => setSenderName(event.target.value)}
              onKeyDown={handleKeyDown}
            />

            <span
              className={`text-sm font-medium ${
                isConversationLoading
                  ? "text-yellow-600"
                  : isConnected
                    ? "text-green-600"
                    : "text-red-500"
              }`}
            >
              {isConversationLoading
                ? "Preparing chat..."
                : isConnected
                  ? "Connected"
                  : "Disconnected"}
            </span>
          </div>
        </div>

        <div
          className={
            "flex-1 overflow-y-auto border border-gray-200 rounded-2xl p-4"
          }
        >
          {messages.length === 0 ? (
            <p className={"text-gray-500"}>No messages yet</p>
          ) : (
            <ul className={"flex flex-col gap-3"}>
              {messages.map((message, index) => {
                const isUser = message.senderType === "USER";
                const isMine =
                  message.senderType === senderType &&
                  message.senderName === senderName;

                return (
                  <li
                    key={`${message.senderName}-${index}-${message.content}`}
                    className={`flex ${isUser ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl border px-4 py-3 ${
                        isMine ? "border-black" : "border-gray-200"
                      }`}
                    >
                      <p className={"font-bold text-sm mb-1"}>
                        {message.senderName} ({message.senderType})
                      </p>
                      <p className={"break-words"}>{message.content}</p>
                    </div>
                  </li>
                );
              })}
              <div ref={messagesEndRef} />
            </ul>
          )}
        </div>

        <div className={"flex gap-3"}>
          <input
            className={
              "flex-1 border border-gray-200 rounded-2xl px-4 py-3 outline-none"
            }
            disabled={isConversationLoading || !chatId}
            placeholder={"Type your message..."}
            type="text"
            value={messageInput}
            onChange={(event) => setMessageInput(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={
              "border border-gray-200 rounded-2xl px-5 py-3 disabled:opacity-50"
            }
            disabled={isConversationLoading || !chatId || !isConnected}
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

function ListBox(): React.ReactElement {
  const items = [
    {
      title: "Support Conversation",
      preview: "User and admin live chat",
    },
  ];

  return (
    <div>
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

function ListBoxItems({
  items = [],
}: Readonly<ListBoxItemsProps>): React.ReactElement {
  return (
    <ul className={"flex flex-col gap-3"}>
      {items.map((item, index) => (
        <ListBoxItem key={`${item.title}-${index}`} item={item} />
      ))}
    </ul>
  );
}

function ListBoxItem({
  item,
}: Readonly<{ item: ListBoxItemData }>): React.ReactElement {
  return (
    <li
      className={"flex gap-3 flex-col border border-gray-200 p-3 rounded-2xl"}
    >
      <h2 className={"font-bold text-md md:text-lg lg:text-xl"}>
        {item.title}
      </h2>
      <p className={"text-sm text-gray-600"}>{item.preview}</p>
    </li>
  );
}
