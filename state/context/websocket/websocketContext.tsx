import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

interface Message {
  event_type: string;
  sender_id?: string;
  content: string;
  timestamp?: string;
  receiver_id?: string;
}

interface WebSocketContextProps {
  messages: Message[];
  sendMessage: (messageData: Message) => void;
  isConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(
  undefined
);

export const WebSocketProvider: React.FC<{
  serverUrl: string;
  reconnectInterval?: number;
  children: React.ReactNode;
}> = ({ serverUrl, reconnectInterval = 5000, children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null); // Use ref for socket instance
  const reconnectTimeoutRef = useRef<number | null>(null); // Use ref for reconnect timeout

  const connect = useCallback(() => {
    if (
      !socketRef.current ||
      socketRef.current.readyState === WebSocket.CLOSED
    ) {
      socketRef.current = new WebSocket(serverUrl);

      socketRef.current.onopen = () => {
        console.log("Connected to WebSocket server");
        setIsConnected(true);
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }
      };

      socketRef.current.onmessage = (event) => {
        const data: Message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      socketRef.current.onclose = () => {
        console.log("Disconnected from WebSocket server");
        setIsConnected(false);
        attemptReconnect();
      };
    }
  }, [serverUrl]);

  const attemptReconnect = useCallback(() => {
    if (!reconnectTimeoutRef.current) {
      reconnectTimeoutRef.current = window.setTimeout(() => {
        console.log("Attempting to reconnect...");
        connect();
      }, reconnectInterval);
    }
  }, [connect, reconnectInterval]);

  const sendMessage = (messageData: Message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(messageData));
    } else {
      console.log("Unable to send message, WebSocket is not connected.");
    }
  };

  useEffect(() => {
    connect();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connect]);

  return (
    <WebSocketContext.Provider value={{ messages, sendMessage, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
