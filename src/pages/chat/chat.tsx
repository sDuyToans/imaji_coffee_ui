import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";

import DefaultLayout from "@/layouts/default.tsx";

/**
 * Chat page - connects to /ws (SockJS) and subscribes to user inbox and announcements.
 * Assumptions:
 * - Server handshake sets a Principal (username) via your handshake handler
 * - If the handshake expects a JWT cookie, the browser will send it if running on same origin
 */
export default function Chat(): React.ReactElement {
  const clientRef = useRef<Client | null>(null);
  const subsRef = useRef<StompSubscription[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Create STOMP client that uses SockJS
    const client = new Client({
      // Use SockJS factory so stompjs uses SockJS transport
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      // Optional: debug and reconnect
      debug: (msg) => {
        // comment out for noisy logs
        console.debug("[STOMP]", msg);
      },
      // Heartbeats (ms). Tune as needed.
      // heartbeatIncoming: 0,
      // heartbeatOutgoing: 20000,
      // Reconnect delay in ms (auto reconnect)
      reconnectDelay: 5000,
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Details: " + frame.body);
      },
      // On successful connect
      onConnect: (frame) => {
        console.log("STOMP connected", frame);

        // subscribe to personal inbox (user destination)
        const sub1 = client.subscribe(
          "/user/queue/messages",
          (msg: IMessage) => {
            setMessages((prev) => [...prev, `[inbox] ${msg.body}`]);
          },
        );

        // subscribe to global announcements
        const sub2 = client.subscribe(
          "/topic/announcements",
          (msg: IMessage) => {
            setMessages((prev) => [...prev, `[announce] ${msg.body}`]);
          },
        );

        subsRef.current = [sub1, sub2];
      },
      onDisconnect: (frame) => {
        console.log("STOMP disconnected", frame);
      },
    });

    client.activate();
    clientRef.current = client;

    // cleanup on unmount
    return () => {
      // unsubscribe if needed
      subsRef.current.forEach((s) => {
        try {
          s.unsubscribe();
        } catch (e) {
          // ignore
        }
      });
      subsRef.current = [];

      if (clientRef.current) {
        clientRef.current.deactivate();
        clientRef.current = null;
      }
    };
  }, []); // run once

  // Helper to send private message
  const sendPrivate = (to: string, content: string) => {
    const client = clientRef.current;

    if (!client || !client.connected) {
      console.warn("STOMP client not connected");

      return;
    }
    const payload = { content, to };

    // use publish (Client API)
    client.publish({
      destination: "/app/chat.private",
      body: JSON.stringify(payload),
      headers: { "content-type": "application/json" },
    });
    // optionally show in local UI
    setMessages((prev) => [...prev, `[you -> ${to}] ${content}`]);
  };

  const sendAnnounce = (content: string) => {
    const client = clientRef.current;

    if (!client || !client.connected) {
      console.warn("STOMP client not connected");

      return;
    }
    client.publish({
      destination: "/app/chat.announce",
      body: JSON.stringify({ content }),
      headers: { "content-type": "application/json" },
    });
  };

  return (
    <DefaultLayout>
      <div style={{ padding: 16 }}>
        <h2>Chat client</h2>
        <div style={{ marginBottom: 8 }}>
          <input
            placeholder="Message to send to 'bob' (example)"
            style={{ width: 400 }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            style={{ marginLeft: 8 }}
            onClick={() => {
              sendPrivate("bob", input);
              setInput("");
            }}
          >
            Send to bob
          </button>
          <button style={{ marginLeft: 8 }} onClick={() => sendAnnounce(input)}>
            Announce
          </button>
        </div>

        <div>
          <h4>Messages</h4>
          <div
            style={{
              border: "1px solid #ddd",
              padding: 8,
              maxHeight: 300,
              overflow: "auto",
            }}
          >
            {messages.map((m, i) => (
              <div key={i}>{m}</div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
