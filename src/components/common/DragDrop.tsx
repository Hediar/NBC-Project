'use client';

import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

type Props = {
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
};

const DragDrop = ({ setFiles }: Props) => {
  // 미리보기 데이터
  const [previewFiles, setPreviewFiles] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length) {
      for (const file of acceptedFiles) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = (event) => {
          setPreviewFiles((prev) => [...prev, event.target?.result as string]);
        };
      }

      // api요청 데이터
      setFiles((prev) => [...prev, ...acceptedFiles]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div
        {...getRootProps()}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-"
      >
        <input {...getInputProps()} />
        <p>마우스로 드래그해서 이미지를 추가해주세요.</p>
        <button className={isDragActive ? 'disabled' : undefined}>파일 선택</button>
      </div>

      {previewFiles.map((el, idx) => (
        <Image key={el + idx} src={el} width="50" height="50" alt="이미지없음" />
      ))}
    </>
  );
};

export default DragDrop;
