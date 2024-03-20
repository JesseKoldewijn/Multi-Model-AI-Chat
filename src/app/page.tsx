import { PromptWindow } from "~/components/prompt/window";

const models = [
  "microsoft/codereviewer",
  "mistralai/Mixtral-8x7B-Instruct-v0.1",
  "google/flan-t5-xxl",
  "google/gemma-2b",
  "google/gemma-7b",
];

const HomePage = () => {
  return (
    <div className="relative flex min-h-screen flex-col justify-center py-40">
      <h1 className="mx-auto font-mono text-4xl font-semibold">
        AIcademy Chat
      </h1>
      <main className="flex flex-row flex-wrap items-center justify-stretch gap-10 px-10 py-10">
        {models.map((model) => (
          <PromptWindow key={model} modelName={model} />
        ))}
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
};
export default HomePage;
