"use client";

import type { PromptMessageProps, PromptWindowProps } from "./types";
import { memo, useRef, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { handleWindowSubmit } from "./handlers/submitHandler";
import dynamic from "next/dynamic";
import PromptMessage from "./message";
import PromptWindowFooter from "./parts/windowFooter";
import WindowModelIcon from "./parts/windowModelIcon";

const PromptWindowContent = dynamic(() => import("./parts/windowContent"), {
  ssr: false,
  loading: () => (
    <div className="p-4">
      <PromptMessage
        sender={"LLM"}
        message={"Please send me a prompt..."}
        timestamp={new Date().getDate().toLocaleString()}
      />
    </div>
  ),
});

export const PromptWindow = ({ modelName }: PromptWindowProps) => {
  const [parent] = useAutoAnimate();

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<PromptMessageProps[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(
    null,
  ) as React.RefObject<HTMLTextAreaElement>;

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!inputRef.current || typeof inputRef.current == "undefined") return;
    void handleWindowSubmit(e, {
      modelName,
      inputRef,
      loading,
      setLoading,
      setMessages,
      messages,
    });
  };

  return (
    <div className="flex w-full max-w-2xl flex-col rounded-lg border bg-foreground/10 md:mx-auto">
      <div className="flex flex-col rounded-lg">
        <div className="flex items-center justify-between border-b p-2">
          <div className="flex items-center gap-4 px-2 pt-2">
            <WindowModelIcon modelName={modelName} />
            <h3 className="text-sm font-medium tracking-wider">
              <PretifyModalName modelName={modelName} />
            </h3>
          </div>
        </div>
        <PromptWindowContent messages={messages} parent={parent} />
        <PromptWindowFooter
          submitHandler={submitHandler}
          inputRef={inputRef}
          loading={loading}
        />
      </div>
    </div>
  );
};

const PretifyModalName = memo(
  ({ modelName }: { modelName: string }) => {
    return modelName.split("/").pop();
  },
  (prev, next) => prev.modelName === next.modelName,
);
PretifyModalName.displayName = "PretifyModalName";
