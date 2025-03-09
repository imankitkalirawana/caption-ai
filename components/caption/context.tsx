'use client';
import React, { createContext, useContext } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { addToast } from '@heroui/react';

interface FormValues {
  image: File | null;
  preview: string | null;
  tone: string;
  response: string | null;
  regenerateCount: number;
  size: string;
  prompt: string;
}

interface FormContextType {
  formik: ReturnType<typeof useFormik<FormValues>>;
}

export const CaptionProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      image: null,
      preview: null,
      tone: 'casual',
      response: null,
      regenerateCount: 0,
      size: 'short',
      prompt: ''
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      if (values.image) formData.append('image', values.image);
      formData.append('tone', values.tone);
      formData.append('size', values.size);
      values.prompt && formData.append('prompt', values.prompt);

      await axios
        .post('/api/chatbot', formData)
        .then((res) => {
          formik.setFieldValue('response', res.data.response);
          formik.setFieldValue('regenerateCount', values.regenerateCount + 1);
        })
        .catch((err) => {
          console.error('Error in chat submission:', err);
          addToast({
            title: err.response.data.error,
            color: 'danger'
          });
        });
    }
  });

  return (
    <CaptionContext.Provider value={{ formik }}>
      {children}
    </CaptionContext.Provider>
  );
};

const CaptionContext = createContext<FormContextType | undefined>(undefined);

export const useCaption = () => {
  const context = useContext(CaptionContext);
  if (!context)
    throw new Error('useCaption must be used within a CaptionProvider');
  return context;
};
