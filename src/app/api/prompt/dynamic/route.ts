import { HfInference } from "@huggingface/inference";
import { HuggingFaceStream, StreamingTextResponse } from "ai";
import { env } from "~/env";

export const runtime = "edge";

const Hf = new HfInference(env.HUGGINGFACE_API_KEY);

export async function POST(req: Request) {
  const { prompt, modal } = (await req.json()) as {
    modal: string;
    prompt: string;
  };

  if (!prompt || !modal) {
    return new Response("prompt and modal are required", {
      status: 400,
    });
  }

  try {
    // Initialize a text generation stream using Hugging Face Inference SDK
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const iter = await Hf.textGenerationStream({
      model: modal,
      inputs: prompt,
      parameters: {
        max_new_tokens: 200,
        temperature: 0.5,
        repetition_penalty: 1,
        return_full_text: false,
      },
    });

    // Convert the async generator into a readable stream
    const stream = HuggingFaceStream(iter);

    // Return a StreamingTextResponse, enabling the client to consume the response
    return new StreamingTextResponse(stream);
  } catch (e) {
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
