import { ReactElement } from "react";

export default function Footer(): ReactElement {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          © {new Date().getFullYear()} EpiStock. All rights reserved.
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Developed by JulienKBD.
        </p>
      </div>
    </footer>
  );
}
