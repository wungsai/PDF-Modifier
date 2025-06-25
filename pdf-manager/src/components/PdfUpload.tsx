'use client';

import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react'; // Using Input for file, though specific FileInput might be better if available or built

export function PdfUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      setFile(null);
      // TODO: Add user feedback for invalid file type
      console.warn('Please select a PDF file.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      // TODO: Add user feedback
      console.warn('No file selected.');
      return;
    }

    setIsUploading(true);
    console.log('Uploading file:', file.name);

    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('File upload complete (simulated).');
    setIsUploading(false);
    setFile(null);
    // TODO: Add actual upload logic and state update (e.g., refetch list of PDFs)
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md">
      <label htmlFor="pdf-upload-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Select PDF file
      </label>
      <Input
        id="pdf-upload-input"
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        // Note: NextUI's Input might not be the best for file inputs stylistically.
        // A custom styled input or a dedicated file upload component from NextUI (if available) might be better.
        // For now, using the standard HTML input through NextUI's Input wrapper.
        className="dark:text-white" // Basic dark mode compatibility for text
      />
      {file && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Selected file: {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </p>
      )}
      <Button
        color="primary"
        onClick={handleUpload}
        disabled={!file || isUploading}
        isLoading={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload PDF'}
      </Button>
    </div>
  );
}
