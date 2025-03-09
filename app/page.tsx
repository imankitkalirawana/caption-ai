'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button, Textarea } from '@heroui/react';

export default function Page() {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!message && !image) {
      setError('Please enter a message or upload an image');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      if (message) formData.append('message', message);
      if (image) formData.append('image', image);

      console.log('Submitting form with:', {
        message: message || '(none)',
        hasImage: !!image
      });

      const response = await fetch('/api/chatbot', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Error: ${response.status}`);
      }

      setResponse(data.response);

      // Clear form after successful submission
      if (response.ok) {
        setMessage('');
        setImage(null);
        setImagePreview(null);
      }
    } catch (err) {
      console.error('Error in chat submission:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Chat with Bhuneshvar</h1>

      <div className="mb-6 flex flex-col gap-4">
        <Textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minRows={3}
          className="w-full"
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm">Upload an image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        {imagePreview && (
          <div className="relative mt-2 h-64 w-full">
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="object-contain"
            />
            <button
              onClick={() => {
                setImage(null);
                setImagePreview(null);
              }}
              className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white"
            >
              ✕
            </button>
          </div>
        )}

        {error && (
          <div className="rounded border border-red-400 bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <Button
          onPress={handleSubmit}
          isLoading={isLoading}
          color="primary"
          className="w-full"
          disabled={(!message && !image) || isLoading}
        >
          {isLoading ? 'Processing...' : 'Send'}
        </Button>
      </div>

      {response && (
        <div className="mt-6 rounded-lg p-4">
          <h2 className="mb-2 text-lg font-semibold">Response:</h2>
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
}
