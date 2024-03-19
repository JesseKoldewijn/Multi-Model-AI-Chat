import { type PromptMessageProps } from "./types";

const PromptMessage = ({ sender, message, timestamp }: PromptMessageProps) => {
  return (
    <div className="flex w-full items-start space-x-2" data-tz={timestamp}>
      <div className="w-full rounded-lg bg-white p-3 text-sm">
        <p className="font-semibold">{sender}</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default PromptMessage;
