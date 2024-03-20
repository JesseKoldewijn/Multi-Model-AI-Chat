import { fetchPrompt } from "~/lib/fetchPrompt";
import { type PromptMessageProps } from "../types";

export const handleWindowSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  {
    modelName,
    inputRef,
    loading,
    setLoading,
    setMessages,
    messages,
  }: {
    modelName: string;
    inputRef: React.RefObject<HTMLInputElement>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setMessages: React.Dispatch<React.SetStateAction<PromptMessageProps[]>>;
    messages: PromptMessageProps[];
  },
) => {
  e.preventDefault();

  if (loading) return;

  if (inputRef.current) {
    const value = inputRef.current.value;

    if (value.length < 1) return;

    e.currentTarget.reset();

    setLoading(true);
    setMessages((prev) => [
      ...prev,
      {
        sender: "User",
        message: value,
        timestamp: new Date().toLocaleString(),
      },
      {
        sender: "LLM-loading",
        message: "Thinking...",
        timestamp: new Date().toLocaleString(),
      },
    ]);

    const previousMessages = messages.filter(
      (message) => message.sender !== "LLM-loading" && message.sender !== "LLM",
    );

    const totalContext = previousMessages
      ? previousMessages.map((message) => message.message).join(" ") + value
      : value;

    const res = await fetchPrompt(modelName, totalContext);

    if (!res.ok) {
      console.error(res.text());

      setMessages((prev) => [
        ...prev,
        {
          sender: "LLM-error",
          message: "An error occurred, please try again later.",
          timestamp: new Date().toLocaleString(),
        },
      ]);

      setLoading(false);
      return;
    }

    const data = await res.text();

    if (data && data.length > 0) {
      setTimeout(() => {
        setMessages((prev) => {
          const prevWithoutLoader = prev.filter(
            (message) =>
              message.sender !== "LLM-loading" &&
              message.sender !== "LLM-error",
          );

          return [
            ...prevWithoutLoader,
            {
              sender: "LLM",
              message: data,
              timestamp: new Date().toLocaleString(),
            },
          ];
        });
        setLoading(false);
      }, 1000);
    }
  }
};
