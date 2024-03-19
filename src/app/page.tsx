import { PromptWindow } from "~/components/prompt/window";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 px-4 py-10 md:flex-row">
      <PromptWindow modelName="mistral" />
      <PromptWindow modelName="flan-t5-xxl" />
    </main>
  );
}
