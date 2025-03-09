'use server';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash'
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 30,
  maxOutputTokens: 512,
  responseMimeType: 'text/plain'
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  }
];

const history: string[] = [];

export async function generateResponseWithImage({
  imageBuffer,
  mimeType,
  size = 'sm'
}: {
  imageBuffer: Buffer;
  mimeType: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeMap = {
    sm: '5',
    md: '10',
    lg: '15'
  };

  let systemPrompt = `You are an AI specialized in generating short, catchy Instagram captions. 
  Each response must contain exactly one caption in the format:

 <caption here>
  #hashtag1 #hashtag2 #hashtag3

  Do not include any other text, explanations, or greetings. Ensure the captions are engaging, concise, include relevant hashtags.
  caption should be approximately ${sizeMap[size]} words long excluding hashtags.
  `;

  const imagePart = {
    inlineData: {
      data: imageBuffer.toString('base64'),
      mimeType
    }
  };

  if (history.length > 0) {
    systemPrompt += `\n\n${history.join('\n\n')}` + '\nRegenerate the caption';
  }

  console.log(systemPrompt);

  const userMessage = [imagePart, { text: systemPrompt }];

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: userMessage }],
      generationConfig,
      safetySettings
    });

    history.push(result.response.text());

    return result.response.text();
  } catch (error: any) {
    console.error('Error generating response with image:', error);

    if (error.message?.includes('models/')) {
      throw new Error(
        `Model error: ${error.message}. Check API key and model availability.`
      );
    } else if (error.status) {
      throw new Error(
        `API error (${error.status}): ${error.message || 'Unknown error'}`
      );
    } else {
      throw new Error('Failed to process image. Please try again.');
    }
  }
}
