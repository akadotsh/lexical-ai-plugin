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
  workerUrl: string,
  text: string,
  options: Array<string>
) => {
  if (!workerUrl || !text) return;

  const response = await axios(workerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      text,
      options,
    }),
  });

  if (response.status === 200) {
    return response.data;
  }

  return text;
};
