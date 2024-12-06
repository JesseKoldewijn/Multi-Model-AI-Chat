"use client";

import { ClassValue } from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import { PromptWindow } from "~/components/prompt/window";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const defaultModels = [
  "google/flan-t5-xxl",
  "google/gemma-2b",
  "google/gemma-7b",
];

const PagePrompts = () => {
  const [models, setModels] = useState<string[]>(defaultModels);

  const gridCols: ClassValue = {
    "md:grid-cols-1": models.length >= 0 && models.length < 2,
    "md:grid-cols-2": models.length > 2 && models.length <= 6,
    "md:grid-cols-3": models.length >= 6,
  };

  const gridRows: ClassValue = {
    "grid-rows-2": models.length >= 4,
    "grid-rows-3": models.length >= 7,
    "grid-rows-4": models.length >= 10,
  };

  return (
    <>
      <Button className="ml-5 mr-5 mt-10 md:ml-auto md:mr-10 md:max-w-max">
        <span>Reset</span>
      </Button>

      <main
        className={cn(
          "grid grid-cols-1 gap-5 px-5 py-10 last:mx-auto md:gap-10 md:px-10",
          gridCols,
          gridRows,
        )}
      >
        {models.map((model) => {
          return <PromptWindow key={model} modelName={model} />;
        })}
      </main>
    </>
  );
};
export default PagePrompts;

const updateModels = (
  action: "add" | "remove",
  model: string,
  stateCallback: Dispatch<SetStateAction<string[]>>,
) => {
  stateCallback((prev) => {
    if (action === "add") {
      return [...prev, model];
    } else {
      return prev.filter((m) => m !== model);
    }
  });
};

const resetModels = (stateCallback: Dispatch<SetStateAction<string[]>>) => {
  stateCallback(defaultModels);
};

const modalsAreUnevenCount = (models: string[]) => {
  return models.length % 2 !== 0;
};
