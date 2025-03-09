import { cn } from '@/lib/utils';
import { Button, Image } from '@heroui/react';
import { UploadIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import type { DropEvent, DropzoneOptions, FileRejection } from 'react-dropzone';

type DropzoneContextType = {
  src?: File[];
  accept?: DropzoneOptions['accept'];
  maxSize?: DropzoneOptions['maxSize'];
  minSize?: DropzoneOptions['minSize'];
  maxFiles?: DropzoneOptions['maxFiles'];
};

const renderBytes = (bytes: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)}${units[unitIndex]}`;
};

const DropzoneContext = createContext<DropzoneContextType | undefined>(
  undefined
);

export type DropzoneProps = Omit<DropzoneOptions, 'onDrop'> & {
  src?: File[];
  className?: string;
  onDrop?: (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  children?: ReactNode;
};

export const Dropzone = ({
  accept,
  maxFiles = 1,
  maxSize,
  minSize,
  onDrop,
  onError,
  disabled,
  src,
  className,
  children,
  ...props
}: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onError,
    disabled,
    onDrop: (acceptedFiles, fileRejections, event) => {
      if (fileRejections.length > 0) {
        const message = fileRejections.at(0)?.errors.at(0)?.message;
        onError?.(new Error(message));
        return;
      }

      onDrop?.(acceptedFiles, fileRejections, event);
    },
    ...props
  });

  return (
    <DropzoneContext.Provider
      key={JSON.stringify(src)}
      value={{ src, accept, maxSize, minSize, maxFiles }}
    >
      <button
        type="button"
        disabled={disabled}
        className={cn(
          'relative flex h-auto w-full flex-col items-center overflow-hidden rounded-3xl pb-4',
          isDragActive && 'ring-ring outline-none ring-1',
          className
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} disabled={disabled} />
        {children}
      </button>
    </DropzoneContext.Provider>
  );
};

const useDropzoneContext = () => {
  const context = useContext(DropzoneContext);

  if (!context) {
    throw new Error('useDropzoneContext must be used within a Dropzone');
  }

  return context;
};

export type DropzoneContentProps = {
  children?: ReactNode;
};

const maxLabelItems = 3;

export const DropzoneContent = ({ children }: DropzoneContentProps) => {
  const { src } = useDropzoneContext();
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (src) {
      setPreview(URL.createObjectURL(src[0]));
    }
  }, [src]);

  if (!src) {
    return null;
  }

  if (children) {
    return children;
  }

  return (
    <>
      {preview ? (
        <Image
          src={preview}
          alt="Preview"
          className="aspect-[2/1] h-full max-h-72 w-full object-cover"
          radius="lg"
        />
      ) : (
        <>
          <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-md">
            <UploadIcon size={16} />
          </div>
          <p className="my-2 w-full truncate text-sm font-medium">
            {src.length > maxLabelItems
              ? `${new Intl.ListFormat('en').format(
                  src.slice(0, maxLabelItems).map((file) => file.name)
                )} and ${src.length - maxLabelItems} more`
              : new Intl.ListFormat('en').format(src.map((file) => file.name))}
          </p>
          <p className="text-muted-foreground w-full text-xs">
            Drag and drop or click to replace
          </p>
        </>
      )}
    </>
  );
};

export type DropzoneEmptyStateProps = {
  children?: ReactNode;
};

export const DropzoneEmptyState = ({ children }: DropzoneEmptyStateProps) => {
  const { src, accept, maxSize, minSize, maxFiles } = useDropzoneContext();

  if (src) {
    return null;
  }

  if (children) {
    return children;
  }

  let caption = '';

  if (accept) {
    caption += 'Accepts ';
    caption += new Intl.ListFormat('en').format(Object.keys(accept));
  }

  if (minSize && maxSize) {
    caption += ` between ${renderBytes(minSize)} and ${renderBytes(maxSize)}`;
  } else if (minSize) {
    caption += ` at least ${renderBytes(minSize)}`;
  } else if (maxSize) {
    caption += ` less than ${renderBytes(maxSize)}`;
  }

  return (
    <>
      <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-md">
        <UploadIcon size={16} />
      </div>
      <p className="my-2 w-full truncate text-sm font-medium">
        Upload {maxFiles === 1 ? 'a file' : 'files'}
      </p>
      <p className="text-muted-foreground w-full truncate text-xs">
        Drag and drop or click to upload
      </p>
      {caption && <p className="text-muted-foreground text-xs">{caption}.</p>}
    </>
  );
};
