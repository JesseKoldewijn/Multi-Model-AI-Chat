"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import PromptMessage from "./message";
import type { PromptMessageProps, PromptWindowProps } from "./types";
import { useRef, useState } from "react";
import { fetchPrompt } from "~/lib/fetchPrompt";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const PromptWindow = ({ modelName }: PromptWindowProps) => {
  const [parent] = useAutoAnimate();

  const [messages, setMessages] = useState<PromptMessageProps[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      const value = inputRef.current.value;

      if (value.length < 1) return;

      setMessages((prev) => [
        ...prev,
        {
          sender: "User",
          message: value,
          timestamp: new Date().toLocaleString(),
        },
      ]);

      const res = await fetchPrompt(modelName, value);

      if (!res.ok) {
        console.error(res.text());
        return;
      }

      const data = await res.text();

      if (data && data.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "LLM",
            message: data,
            timestamp: new Date().toLocaleString(),
          },
        ]);
      }
    }
  };

  return (
    <div className="flex w-full max-w-3xl flex-col rounded-lg border">
      <div className="flex flex-col rounded-lg bg-gray-100">
        <div className="flex items-center justify-between border-b p-2">
          <div className="flex items-center px-2 pt-2">
            <h3 className="text-sm font-medium tracking-wider">{modelName}</h3>
          </div>
        </div>
        <div
          ref={parent}
          className="relative flex max-h-[60vh] flex-col items-start justify-start gap-4 overflow-y-auto overflow-x-hidden p-4"
        >
          {messages && messages.length > 0 ? (
            messages.map((message, index) => (
              <PromptMessage
                key={index}
                sender={message.sender}
                message={message.message}
                timestamp={message.timestamp}
              />
            ))
          ) : (
            <PromptMessage
              sender={"LLM"}
              message={"Please send me a prompt..."}
              timestamp={new Date().getDate().toLocaleString()}
            />
          )}
        </div>
        <div className="border-t">
          <form onSubmit={submitHandler} className="flex border-t p-2">
            <Input
              ref={inputRef}
              className="flex-1"
              placeholder="Type a message..."
              style={{
                boxShadow: "none",
              }}
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
