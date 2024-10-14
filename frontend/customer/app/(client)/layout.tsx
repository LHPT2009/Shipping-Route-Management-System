"use client";
import React from "react";
import LayoutComponent from "@/components/layout/client";
import { ChildrenComponentProps } from "@/types/children";
import { FloatButton, Tooltip } from "antd";
import { ArrowUpOutlined, CommentOutlined } from "@ant-design/icons";
import ChatComponent from "@/components/chat";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { chatActions } from "@/lib/store/chat";

const ClientLayout: React.FC<ChildrenComponentProps> = ({ children }) => {

  const dispatch = useAppDispatch();

  const isOpen: boolean = useAppSelector((state) => state.chat.isOpen);

  return (
    <div>
      <LayoutComponent>
        {children}
      </LayoutComponent>

      <Tooltip title="Scroll to top">
        <FloatButton.BackTop icon={<ArrowUpOutlined />} style={{ height: "3rem", width: "3rem", insetBlockEnd: 95 }} />
      </Tooltip>

      <Tooltip placement="bottom" title="AI Chatbox Assistant">
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
