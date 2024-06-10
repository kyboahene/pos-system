"use client";

import { Upload } from "lucide-react";
import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "../file-uploader";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DropzoneOptions } from "react-dropzone";

type FileUploadDropzoneProps = {
  files: File[] | null
  setFiles: (value : File[] | null) => void
}

const FileUploadDropzone = ({ files, setFiles }: FileUploadDropzoneProps) => {


  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 4,
    maxSize: 1 * 1024 * 1024,
  } satisfies DropzoneOptions;

  return (
    <FileUploader
      value={files}
      onValueChange={setFiles}
      dropzoneOptions={dropzone}
    >
      <FileInput>
        <div className="flex flex-col gap-4 items-center justify-center h-28 w-full border border-dashed rounded-lg">
            <Upload/>
          <p className="text-gray-400">Click here or Drop your file here to upload it</p>
        </div>
      </FileInput>
      <FileUploaderContent className="flex items-center flex-row gap-2">
        {files?.map((file, i) => (
          <FileUploaderItem
            key={i}
            index={i}
            className="size-20 p-0 rounded-md overflow-hidden"
            aria-roledescription={`file ${i + 1} containing ${file.name}`}
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              height={80}
              width={80}
              className="size-20 p-0"
            />
          </FileUploaderItem>
        ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

export default FileUploadDropzone;
