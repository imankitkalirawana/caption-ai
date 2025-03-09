'use client';

import { useCaption } from '@/components/caption/context';
import {
  DropzoneEmptyState,
  DropzoneContent,
  Dropzone
} from '@/components/ui/dropzone';
import { CAPTION_CONFIG } from '@/lib/config';
import {
  Button,
  Input,
  Select,
  SelectItem,
  Snippet,
  Tooltip
} from '@heroui/react';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function Instagram() {
  const { formik } = useCaption();

  return (
    <>
      <Dropzone
        maxSize={1024 * 1024 * 10}
        maxFiles={1}
        accept={{ 'image/*': [] }}
        onDrop={(files) => {
          formik.setFieldValue('image', files[0]);
          formik.setFieldValue('preview', URL.createObjectURL(files[0]));
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
                formik.values.regenerateCount > 0 ? 'Regenerate' : 'Generate'
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
          <p className="whitespace-pre-wrap">{formik.values.response}</p>
        </Snippet>
      )}
    </>
  );
}
