import React, { memo } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const PromptWindowFooter = memo(
  ({
    submitHandler,
    inputRef,
    loading,
  }: {
    submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    loading: boolean;
  }) => {
    return (
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
