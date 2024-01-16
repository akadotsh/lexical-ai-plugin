import OpenAI from "openai";

export const handleAIRequest = async (
  apiKey: string,
  text: string,
  options: Array<string>
) => {
  if (!apiKey) return "Please Provide OpenAI API Key";

  const openai = new OpenAI({
    apiKey,
  });

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [{ role: "user", content: text }],
    model: "gpt-3.5-turbo",
  };
  const chatCompletion: OpenAI.Chat.ChatCompletion =
    await openai.chat.completions.create(params);

  return chatCompletion;
};
