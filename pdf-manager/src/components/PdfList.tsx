'use client';

import React, { useState } from 'react';
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from "@nextui-org/react";
import { PdfViewer } from './PdfViewer';

interface PdfFile {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}

const mockPdfFiles: PdfFile[] = [
  { id: '1', name: 'Sample Document 1.pdf', url: '/pdfs/sample1.pdf', uploadedAt: '2023-10-26' },
  { id: '2', name: 'Another Important File.pdf', url: '/pdfs/sample2.pdf', uploadedAt: '2023-10-25' },
  { id: '3', name: 'Presentation Slides.pdf', url: '/pdfs/sample3.pdf', uploadedAt: '2023-10-24' },
];

export function PdfList() {
  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>(mockPdfFiles);

  // For View Modal
  const {isOpen: isViewModalOpen, onOpen: onViewModalOpen, onOpenChange: onViewModalOpenChange, onClose: onViewModalClose} = useDisclosure();
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const [selectedPdfName, setSelectedPdfName] = useState<string | null>(null);

  // For Delete Confirmation Modal
  const {isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onOpenChange: onDeleteModalOpenChange, onClose: onDeleteModalClose} = useDisclosure();
  const [pdfToDeleteId, setPdfToDeleteId] = useState<string | null>(null);

  const handleViewPdf = (pdf: PdfFile) => {
    setSelectedPdfUrl(pdf.url);
    setSelectedPdfName(pdf.name);
    onViewModalOpen();
  };

  const initiateDeletePdf = (pdfId: string) => {
    setPdfToDeleteId(pdfId);
    onDeleteModalOpen();
  };

  const confirmDeletePdf = () => {
    if (pdfToDeleteId) {
      console.log('Deleting PDF:', pdfToDeleteId);
      setPdfFiles(prevFiles => prevFiles.filter(file => file.id !== pdfToDeleteId));
      setPdfToDeleteId(null);
    }
    onDeleteModalClose();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Uploaded PDFs</h2>
      {pdfFiles.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No PDF files uploaded yet.</p>
      ) : (
        <Table aria-label="Table of PDF files">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>UPLOADED DATE</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody items={pdfFiles} emptyContent={"No PDFs to display."}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.uploadedAt}</TableCell>
                <TableCell className="flex gap-2">
                  <Button size="sm" color="primary" onPress={() => handleViewPdf(item)}>
                    View
                  </Button>
                  <Button size="sm" color="danger" onPress={() => initiateDeletePdf(item.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* PDF View Modal */}
      {selectedPdfUrl && (
        <Modal
          isOpen={isViewModalOpen}
          onOpenChange={onViewModalOpenChange}
          size="5xl"
          scrollBehavior="inside"
          backdrop="blur"
        >
          <ModalContent>
            {(modalOnClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{selectedPdfName || "View PDF"}</ModalHeader>
                <ModalBody>
                  <PdfViewer fileUrl={selectedPdfUrl} />
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={modalOnClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onOpenChange={onDeleteModalOpenChange} backdrop="blur">
        <ModalContent>
          {(modalOnClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirm Deletion</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this PDF file? This action cannot be undone.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={modalOnClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={() => {
                  confirmDeletePdf();
                  modalOnClose(); // Ensure modal closes after confirm
                }}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
