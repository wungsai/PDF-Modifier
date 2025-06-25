'use client'; // Required for components with client-side interactivity

import { PdfUpload } from '@/components/PdfUpload'; // Using alias @/
import { PdfList } from '@/components/PdfList';   // Using alias @/
import { Divider } from '@nextui-org/react';

export default function Home() {
  // In a real app, uploadedFiles state might live here or in a global store,
  // and be passed down to PdfList and updated by PdfUpload.
  // For now, PdfUpload has its own simulated upload and PdfList uses mock data.

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400">
          PDF Document Manager
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Upload, view, and manage your PDF files with ease.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <aside className="md:col-span-4 lg:col-span-3">
          <div className="p-4 bg-content1 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-foreground dark:text-foreground-dark">
              Upload New PDF
            </h2>
            <PdfUpload />
          </div>
        </aside>

        <section className="md:col-span-8 lg:col-span-9">
          <PdfList />
        </section>
      </div>

      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <Divider className="my-6" />
        <p>&copy; {new Date().getFullYear()} PDF Manager App. Built with Next.js & NextUI.</p>
      </footer>
    </main>
  );
}
