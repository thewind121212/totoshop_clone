'use client';
import Link from "next/link";

const ErrorFallback = () => {


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold mb-4">Oops!</h1>
      <p className="text-xl text-gray-600 mb-8">An error occurred:</p>
      <pre className="text-red-500 mb-8">Page Not Found</pre>
      <button
        className="text-blue-500 hover:text-blue-700"
      >
        Reload the page
      </button>
      <Link href="/" legacyBehavior>
        <a className="text-blue-500 hover:text-blue-700">Go back to home</a>
      </Link>
    </div>
  );
};


export default ErrorFallback;
