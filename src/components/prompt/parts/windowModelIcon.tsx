import { memo } from "react";
import { findMostSimilarModel } from "~/icons/llm-brand";

const WindowModelIcon = memo(
  ({ modelName }: { modelName: string }) => {
    const {
      icon: { model: ModelIcon },
    } = findMostSimilarModel(modelName);

    return (
      <>
        {ModelIcon ? (
          <ModelIcon
            width={8}
            height={8}
            className="aspect-square h-6 w-auto"
          />
        ) : (
          <strong className="font-semibold">LLM</strong>
        )}
      </>
    );
  },
  (prev, next) => prev.modelName === next.modelName,
);
WindowModelIcon.displayName = "WindowModelIcon";

export default WindowModelIcon;
