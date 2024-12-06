import PagePrompts from "./page-prompts";

const HomePage = () => {
  return (
    <div className="relative flex min-h-screen flex-col justify-center py-40">
      <h1 className="mx-auto font-mono text-4xl font-semibold">
        AIcademy Chat
      </h1>
      <PagePrompts />
      <div className="flex flex-col items-center justify-center gap-2 px-5 md:px-10">
        <strong>Examples prompts</strong>
        <ul className="flex list-none flex-col items-center justify-center gap-2 text-center">
          <li>
            <i>What is the meaning of life?</i>
          </li>
          <li>
            <i>What is the best way to learn a new language?</i>
          </li>
          <li>
            <i>What is best video game?</i>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default HomePage;
