import { memo } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

const PromptWindowFooter = memo(
  ({
    submitHandler,
    inputRef,
    loading,
  }: {
    submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
    inputRef: React.RefObject<HTMLTextAreaElement>;
    loading: boolean;
  }) => {
    return (
      <div className="border-t">
        <form
          onSubmit={submitHandler}
          className="flex items-end gap-2 border-t p-2"
        >
          <Textarea
            ref={inputRef}
            className="h-10 max-h-40 min-h-10 resize-y shadow-none no-scrollbar"
            placeholder="Type a message..."
          />
          <Button type="submit" disabled={loading}>
            Send
          </Button>
        </form>
      </div>
    );
  },
  (prev, next) => {
    return prev.loading === next.loading;
  },
);
PromptWindowFooter.displayName = "WindowFooter";

export default PromptWindowFooter;
