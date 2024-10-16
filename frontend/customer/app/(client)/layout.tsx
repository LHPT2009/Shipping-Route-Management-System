"use client";
import React, { useEffect, useState } from "react";
import LayoutComponent from "@/components/layout/client";
import { ChildrenComponentProps } from "@/types/children";
import { FloatButton, Tooltip } from "antd";
import { ArrowUpOutlined, CommentOutlined } from "@ant-design/icons";
import ChatComponent from "@/components/chat";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { chatActions } from "@/lib/store/chat";
import { UserState } from "@/lib/store/user";
import io, { Socket } from "socket.io-client";

const ClientLayout: React.FC<ChildrenComponentProps> = ({ children }) => {

  const dispatch = useAppDispatch();

  const isOpen: boolean = useAppSelector((state) => state.chat.isOpen);
  const user: UserState = useAppSelector((state) => state.user);

  const [socket, setSocket] = useState<Socket | null>(null);

  // initialize the socket
  useEffect(() => {
    const socketInstance = io("http://localhost:5010");
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // get data from socket (2-way communication)
  useEffect(() => {
    if (socket) {
      console.log("Socket initialized");
      socket.on("message", (message: string) => {
        const data = JSON.parse(message);
        console.log("data from socket", data);
      });

      // Clean up the event listener when the component unmounts or socket changes
      return () => {
        socket.off("message");
      };
    }
  }, [socket]);

  return (
    <div>
      <LayoutComponent>
        {children}
      </LayoutComponent>

      <Tooltip title="Scroll to top">
        <FloatButton.BackTop icon={<ArrowUpOutlined />} style={{ height: "3rem", width: "3rem", insetBlockEnd: 95 }} />
      </Tooltip>

      <Tooltip placement="bottom" title="AI Chatbot Assistant">
        <FloatButton
          onClick={() => dispatch(chatActions.openChat())}
          type="primary"
          icon={<CommentOutlined />}
          style={{ height: "3rem", width: "3rem", insetBlockEnd: 30 }}
        />
      </Tooltip>


      {isOpen && <ChatComponent />}

    </div>
  );
};

export default ClientLayout;
