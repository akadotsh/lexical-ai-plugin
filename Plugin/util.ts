import axios from "axios";

export const options = [
  {
    name: "shorten",
    value: ["shorten"],
  },
  {
    name: "summarize",
    value: ["summarize"],
  },
  {
    name: "simplify",
    value: ["simplify"],
  },
  {
    name: "Splelling & Grammar",
    value: ["spelling", "grammar"],
  },
];

export const handleAIRequest = async (
  apiKey: string,
  text: string,
  options: Array<string>
) => {
  if (!apiKey || !text) return;

  const response = await axios(
    "https://lexical-ai-assistant.akashorasad2000.workers.dev/",
    {
      method: "POST",
      headers: {
        SECRET_KEY: apiKey,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        text,
        options,
      }),
    }
  );

  if (response.status === 200) {
    return response.data;
  }

  return text;
};
