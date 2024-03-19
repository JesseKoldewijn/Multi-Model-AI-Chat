export const fetchPrompt = async (modelName: string, prompt: string) => {
  const timeoutSignal = AbortSignal.timeout(15000);

  return await fetch(`/api/prompt/${modelName}`, {
    method: "POST",
    signal: timeoutSignal,
    body: JSON.stringify({ prompt }),
  }).catch((err) => {
    const error = err as Error;
    return new Response(error.message, {
      status: 500,
      statusText: "Internal Server Error",
    });
  });
};
