import { PromptWindow } from "~/components/prompt/window";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col justify-center">
      <h1 className="mx-auto font-mono text-4xl font-semibold">
        AIcedemy Chat
      </h1>
      <main className="flex flex-col items-center justify-center gap-10 px-10 py-10 xl:flex-row">
        <PromptWindow modelName="mistralai/Mixtral-8x7B-Instruct-v0.1" />
        <PromptWindow modelName="google/flan-t5-xxl" />
        <PromptWindow modelName="google/gemma-2b" />
      </main>
      <div className="flex flex-col items-center justify-center gap-2">
        <strong>Examples prompts</strong>
        <ul className="list-decimal text-start">
          <li>What is the meaning of life?</li>
          <li>What is the best way to learn a new language?</li>
          <li>What is the location of Zwolle?</li>
          <li>What is best computer game?</li>
        </ul>
      </div>
    </div>
  );
}
