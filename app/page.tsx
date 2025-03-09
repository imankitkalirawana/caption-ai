'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Snippet,
  Tab,
  Tabs,
  Textarea,
  Tooltip
} from '@heroui/react';
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState
} from '@/components/ui/dropzone';
import { useFormik } from 'formik';
import { Icon } from '@iconify/react/dist/iconify.js';
import { CAPTION_CONFIG } from '@/lib/config';
import axios from 'axios';
import React from 'react';

// Define the type for Formik values
interface FormValues {
  image: File | null;
  preview: string | null;
  tone: string;
  response: string | null;
  regenerateCount: number;
  size: string;
  prompt: string;
}

export default function Page() {
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
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="absolute inset-0 left-[30%] top-[40%] size-64 bg-green-400 bg-[size:20px_20px] opacity-50 blur-[100px]"></div>
      <div className="absolute inset-0 left-[50%] top-1/2 size-64 bg-fuchsia-400 bg-[size:20px_20px] opacity-50 blur-[100px]"></div>

      <Card className="w-full max-w-lg bg-default-200/40 shadow-none backdrop-blur-lg">
        <CardBody className="p-2">
          <Tabs
            aria-label="Options"
            classNames={{
              panel: 'p-0 shadow-none',
              tabList: 'p-0 gap-[1px] bg-transparent rounded-none',
              cursor:
                'rounded-b-none rounded-t-xl border-b border-default-300/40 shadow-none',
              tab: 'rounded-b-none data-[selected=true]:border-none data-[selected=true]:bg-transparent bg-default-200/40 rounded-t-xl backdrop-blur-lg'
            }}
            size="lg"
          >
            <Tab
              key="instagram"
              title={
                <div className="flex items-center space-x-2">
                  <Icon icon="skill-icons:instagram" />
                  <span>Instagram</span>
                </div>
              }
            >
              <div className="rounded-b-xl rounded-tr-xl bg-gradient-to-b from-background to-background/30 p-4 backdrop-blur-lg">
                <Dropzone
                  maxSize={1024 * 1024 * 10}
                  maxFiles={1}
                  accept={{ 'image/*': [] }}
                  onDrop={(files) => {
                    formik.setFieldValue('image', files[0]);
                    formik.setFieldValue(
                      'preview',
                      URL.createObjectURL(files[0])
                    );
                  }}
                  src={formik.values.image ? [formik.values.image] : undefined}
                  onError={console.error}
                >
                  <DropzoneEmptyState />
                  <DropzoneContent />
                </Dropzone>
                {formik.values.image && (
                  <>
                    <Input
                      aria-label="Prompt"
                      variant="bordered"
                      placeholder="Enter a prompt (Optional)"
                      size="lg"
                      radius="full"
                      value={formik.values.prompt}
                      onChange={formik.handleChange}
                      name="prompt"
                    />
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex w-full gap-2">
                        <Select
                          aria-label="Tone"
                          className="max-w-36"
                          items={CAPTION_CONFIG.instagram.tones}
                          onChange={formik.handleChange}
                          name="tone"
                          value={formik.values.tone}
                          defaultSelectedKeys={['casual']}
                          variant="bordered"
                          radius="full"
                        >
                          {(item) => (
                            <SelectItem key={item.key} textValue={item.label}>
                              {item.label}
                            </SelectItem>
                          )}
                        </Select>
                        <Select
                          aria-label="Size"
                          className="max-w-36"
                          items={CAPTION_CONFIG.instagram.size}
                          onChange={formik.handleChange}
                          name="size"
                          value={formik.values.size}
                          defaultSelectedKeys={['short']}
                          variant="bordered"
                          radius="full"
                        >
                          {(item) => (
                            <SelectItem key={item.key} textValue={item.label}>
                              {item.label}
                            </SelectItem>
                          )}
                        </Select>
                      </div>
                      <Tooltip
                        content={
                          formik.values.regenerateCount > 0
                            ? 'Regenerate'
                            : 'Generate'
                        }
                      >
                        <Button
                          variant="solid"
                          radius="full"
                          isIconOnly
                          className="bg-foreground text-background"
                          onPress={() => formik.handleSubmit()}
                          isLoading={formik.isSubmitting}
                        >
                          <Icon
                            icon={
                              formik.values.regenerateCount > 0
                                ? 'solar:refresh-bold'
                                : 'line-md:arrow-up'
                            }
                            width={20}
                          />
                        </Button>
                      </Tooltip>
                    </div>
                  </>
                )}
                {formik.values.response && (
                  <Snippet symbol="" className="mt-4 w-full">
                    <p className="whitespace-pre-wrap">
                      {formik.values.response}
                    </p>
                  </Snippet>
                )}
              </div>
            </Tab>
            <Tab key="music" title="Music">
              <div className="rounded-b-xl rounded-tr-xl bg-background p-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>
            </Tab>
            <Tab key="videos" title="Videos">
              <div className="rounded-b-xl rounded-tr-xl bg-background p-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
