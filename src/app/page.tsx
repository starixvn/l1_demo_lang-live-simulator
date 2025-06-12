"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isIframeVisible, setIsIframeVisible] = useState(true);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "CLOSE_IFRAME") {
        setIsIframeVisible(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleOpen = () => {
    setIsIframeVisible(true);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden max-w-sm min-w-xs mx-auto bg-black">
      <Image
        src="/lang-live-demo-bg.png"
        alt="background"
        fill
        priority
        className="object-fill object-center"
        quality={100}
      />

      {/* Open button */}
      <button
        onClick={handleOpen}
        className={`absolute bottom-3 right-4 px-4 py-2 bg-green-500/50 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all hover:cursor-pointer ${
          isIframeVisible ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        Open Demo
      </button>

      {/* Overlay container without background tint */}
      {isIframeVisible && (
        <div className="absolute left-0 right-0 bottom-0 h-[386px]">
          <iframe
            src="/demo"
            className="w-full h-full"
            style={{
              background: "transparent",
              backdropFilter: "none",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </main>
  );
}
