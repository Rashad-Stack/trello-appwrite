import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-tfAD31UfNMTgqWj0QdaDMYPm",
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai;
