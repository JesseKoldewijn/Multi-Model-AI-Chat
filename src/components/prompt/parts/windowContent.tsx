"use client";

import { memo, type LegacyRef } from "react";
import PromptMessage, { PromptMessageSkeleton } from "../message";
import { type PromptMessageProps } from "../types";

const PromptWindowContent = memo(
  ({
    messages,
    parent,
  }: {
    messages: PromptMessageProps[];
    parent: LegacyRef<HTMLDivElement>;
  }) => {
    return (
      <div
        ref={parent}
        className="relative flex max-h-[60vh] flex-col items-start justify-start gap-4 overflow-y-auto overflow-x-hidden p-4"
      >
        {messages && messages.length > 0 ? (
          messages.map((message, index) => {
            if (message.sender === "LLM-loading") {
              return <PromptMessageSkeleton key={index} />;
            }

            return (
              <PromptMessage
                key={index}
                sender={message.sender}
                message={message.message}
                timestamp={message.timestamp}
              />
            );
          })
        ) : (
          <PromptMessage
            sender={"LLM"}
            message={"Please send me a prompt..."}
            timestamp={new Date().getDate().toLocaleString()}
          />
        )}
      </div>
    );
  },
  (prev, next) => {
    return prev.messages === next.messages;
  },
);
PromptWindowContent.displayName = "PromptWindowContent";

export default PromptWindowContent;
