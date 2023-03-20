import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = {
  prompt?: string;
  success?: boolean;
  data?: any;
  error?: unknown;
};

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, size, number } = req.body;

  const imageSize =
    size === "Small" ? "256x256" : size === "Medium" ? "512x512" : "1024x1024";

  try {
    const response = await openai.createImage({
      prompt,
      n: number,
      size: imageSize,
    });

    const images = response.data.data;

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: "The image could not be generated",
    });
  }
}
