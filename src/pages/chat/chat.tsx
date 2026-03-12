import React, { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import DefaultLayout from "@/layouts/default.tsx";

/**
 * @author duytoan
 * @since 01/13/2026
 */
export default function Chat(): React.ReactElement {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: { login: "user", passcode: "password " },
      reconnectDelay: 5000,
    });

    client.activate();
    console.log(client);
  }, []);

  return (
    <DefaultLayout>
      <div>Chat Client</div>
    </DefaultLayout>
  );
}
