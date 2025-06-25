'use client';

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Button, Spinner } from '@nextui-org/react';

// Configure the PDF worker path
// The worker was copied to public/js/pdf.worker.min.js
// In Next.js, files in `public` are served from the root.
// Make sure the version of pdfjs matches the one from which worker was copied (pdfjs-dist@^4.0.0)
pdfjs.GlobalWorkerOptions.workerSrc = `/js/pdf.worker.min.js`;


interface PdfViewerProps {
  fileUrl: string;
  onClose?: () => void; // Optional: if used in a modal that the viewer itself can close
}

export function PdfViewer({ fileUrl }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }: { numPages: number }) {
    setNumPages(nextNumPages);
    setPageNumber(1); // Reset to first page on new document load
    setIsLoading(false);
    setError(null);
  }

  function onDocumentLoadError(loadError: Error) {
    console.error('Failed to load PDF:', loadError);
    setError(`Failed to load PDF. Message: ${loadError.message}. Ensure the file URL is correct and accessible, and the PDF worker is correctly configured.`);
    setIsLoading(false);
  }

  const goToPreviousPage = () => {
    setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages || 1));
  };

  return (
    <div className="pdf-viewer-container flex flex-col items-center w-full">
      {isLoading && <Spinner label="Loading PDF..." color="primary" />}
      {error && <p className="text-danger">{error}</p>}

      {!isLoading && !error && fileUrl && (
        <>
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
            className="flex justify-center"
          >
            <Page pageNumber={pageNumber} renderTextLayer={true} renderAnnotationLayer={true} />
          </Document>

          {numPages && numPages > 0 && (
            <div className="pagination-controls flex items-center justify-center gap-4 mt-4 p-2 bg-content1 rounded-medium">
              <Button size="sm" onPress={goToPreviousPage} disabled={pageNumber <= 1}>
                Previous
              </Button>
              <p className="text-sm">
                Page {pageNumber} of {numPages}
              </p>
              <Button size="sm" onPress={goToNextPage} disabled={pageNumber >= numPages}>
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
