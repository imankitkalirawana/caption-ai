import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

// Use gemini-1.5-flash for both text and image processing
// This model supports both text-only and multimodal inputs
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

// Get the system prompt for the chatbot
async function getSystemPrompt() {
  return [
    {
      role: 'user',
      parts: [
        {
          text: 'You are an AI assistant specialized in generating creative and engaging content. Your task is to create short, catchy Instagram captions with relevant hashtags. Each response should contain exactly three variations in the following format:\n1. <caption here>  \nEnsure captions are concise, engaging, and resonate with developers, tech enthusiasts, and entrepreneurs. Maintain a modern and friendly tone.'
        }
      ]
    },
    {
      role: 'model',
      parts: [
        {
          text: "Okay, I'm ready to generate some catchy Instagram captions! Let's get coding!"
        }
      ]
    }
  ];
}

// Text-only chat
export async function generateResponse(query: string) {
  const history = await getSystemPrompt();

  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history
  });

  const result = await chatSession.sendMessage(query);
  return result.response.text();
}

// Chat with image support
export async function generateResponseWithImage(
  query: string,
  imageBuffer: Buffer,
  mimeType: string
) {
  const history = await getSystemPrompt();

  // Create image part
  const imagePart = {
    inlineData: {
      data: imageBuffer.toString('base64'),
      mimeType
    }
  };

  // Create message parts with both text and image
  const messageParts = [];

  // Add image first
  messageParts.push(imagePart);

  // Add text if provided
  if (query.trim()) {
    messageParts.push({ text: query });
  } else {
    messageParts.push({ text: 'What can you tell me about this image?' });
  }

  try {
    console.log(
      `Processing image of type ${mimeType} with model: gemini-1.5-flash`
    );

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: messageParts }],
      generationConfig,
      safetySettings
    });

    const response = result.response;
    return response.text();
  } catch (error: any) {
    console.error('Error generating response with image:', error);

    // Provide more detailed error information
    if (
      error.message &&
      typeof error.message === 'string' &&
      error.message.includes('models/')
    ) {
      throw new Error(
        `Model error: ${error.message}. Please check your API key and model availability.`
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
