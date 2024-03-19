"use client";

import type { PromptMessageProps, PromptWindowProps } from "./types";
import { memo, useRef, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { handleWindowSubmit } from "./handlers/submitHandler";
import dynamic from "next/dynamic";
import PromptMessage from "./message";
import PromptWindowFooter from "./parts/windowFooter";
import { findMostSimilarModel } from "~/icons/llm-brand";

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
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    icon: { model: ModelIcon, brand: BrandIcon },
  } = findMostSimilarModel(modelName);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="flex w-full max-w-2xl flex-col rounded-lg border">
      <div className="flex flex-col rounded-lg bg-gray-100">
        <div className="flex items-center justify-between border-b p-2">
          <div className="flex items-center gap-4 px-2 pt-2">
            {ModelIcon ? (
              <ModelIcon
                width={8}
                height={8}
                className="aspect-square h-6 w-auto"
              />
            ) : BrandIcon ? (
              <BrandIcon
                width={8}
                height={8}
                className="aspect-square h-6 w-auto"
              />
            ) : null}
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
