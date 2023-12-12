"use client";
import React, { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { FaCode } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

interface FileInputProps {
  onRemove?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileInput: React.FC<FileInputProps> = ({ onRemove, onChange }) => {
  return (
    <div className=" flex items-center gap-2">
      <input
        type="file"
        onChange={onChange}
        className="file-input file-input-bordered h-10 text-sm w-full max-w-xs"
      />
      {onRemove && (
        <button onClick={onRemove} className=" text-red-200">
          <CiCircleRemove className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

interface FileInputListProps {}

const FileInputList: React.FC<FileInputListProps> = () => {
  const [fileInputs, setFileInputs] = useState<number[]>([1]);
  const maxFileInputs = 5;

  const addFileInput = () => {
    if (fileInputs.length < maxFileInputs) {
      setFileInputs((prev) => [...prev, Date.now()]);
    }
  };

  const removeFileInput = (index: number) => {
    setFileInputs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3 w-full mb-1 h-fit p-5 bg-[#0D1117] rounded-tl-lg rounded-tr-lg ">
        <div className="flex items-center gap-3">
          <FaCode className="text-[#3EDA8F] h-6 w-6" />
          <p>Upload your code</p>
        </div>
        <button onClick={addFileInput}>
          <IoIosAddCircle className="w-7 h-7 text-[#3EDA8F]" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 bg-base-200 rounded-bl-lg rounded-br-lg py-5 px-3 -mt-1">
        {fileInputs.map((key, index) => (
          <FileInput
            key={key}
            onRemove={
              fileInputs.length > 1 ? () => removeFileInput(index) : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};

export default FileInputList;
