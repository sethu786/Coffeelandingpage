import React, { useCallback, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (content: string, fileName: string) => void;
  isDisabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isDisabled }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileRead = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setSelectedFile(file.name);
      onFileSelect(content, file.name);
    };
    reader.readAsText(file);
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (isDisabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileRead(files[0]);
    }
  }, [handleFileRead, isDisabled]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;

    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileRead(files[0]);
    }
  }, [handleFileRead, isDisabled]);

  const clearFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!isDisabled) setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".txt,.pdf,.doc,.docx"
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isDisabled}
        />
        
        {selectedFile ? (
          <div className="flex items-center justify-center space-x-3">
            <FileText className="h-8 w-8 text-green-500" />
            <span className="text-gray-700 font-medium">{selectedFile}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              disabled={isDisabled}
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div>
              <p className="text-lg font-medium text-gray-900">
                Drop your resume here, or click to browse
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Supports TXT, PDF, DOC, DOCX files
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
