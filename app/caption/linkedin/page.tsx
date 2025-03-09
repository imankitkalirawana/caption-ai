'use client';

import {
  DropzoneEmptyState,
  DropzoneContent,
  Dropzone
} from '@/components/ui/dropzone';
import { CAPTION_CONFIG } from '@/lib/config';
import {
  addToast,
  Button,
  Input,
  Select,
  SelectItem,
  Snippet,
  Tooltip
} from '@heroui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import { useFormik } from 'formik';

interface FormValues {
  image: File | null;
  preview: string | null;
  tone: string;
  response: string | null;
  regenerateCount: number;
  size: string;
  prompt: string;
}

export default function InstagramPage() {
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

  return <>Coming soon...</>;
}
