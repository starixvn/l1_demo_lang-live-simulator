"use client";

export default function DemoPage() {
  const handleClose = () => {
    // Send message to parent window
    if (window.parent !== window) {
      window.parent.postMessage({ type: "CLOSE_IFRAME" }, "*");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      {/* Close button - positioned at top-right */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-100 transition-colors hover:cursor-pointer"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <h1 className="font-semibold text-2xl">Demo Roulette</h1>
    </div>
  );
}
