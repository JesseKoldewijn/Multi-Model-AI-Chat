import { Skeleton } from "../ui/skeleton";
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

export const PromptMessageSkeleton = () => {
  return (
    <div className="flex w-full items-start space-x-2">
      <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-3 text-sm">
        <Skeleton className="h-4 w-20 bg-neutral-300" />
        <Skeleton className="h-4 w-40 bg-neutral-300 md:w-80" />
      </div>
    </div>
  );
};

export default PromptMessage;
