"use client";

import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import configs from "../../configs";

const IframeResolution = {
  width: 930,
  height: 786,
};

export default function Home() {
  const [isIframeVisible, setIsIframeVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [playerId, setPlayerId] = useState<string>(
    Math.floor(Math.random() * 10000000).toString()
  );
  const [iframeHeight, setIframeHeight] = useState(386); // default for 852px device

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const playerIdFromQuery = params.get("playerId");
    if (playerIdFromQuery) {
      setPlayerId(playerIdFromQuery);
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "CLOSE_IFRAME") {
        setIsIframeVisible(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      setIframeHeight(window.innerHeight * 0.4536);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const handleOpen = () => {
    axios
      .post("/api/sign-in", {
        playerId,
        gameId: 134,
        language: "zh-TW",
        currency: "INH",
        operatorId: configs.operatorId,
        operatorSecret: configs.operatorSecret,
      })
      .then((response) => {
        const { redirectUrl } = response.data;
        setUrl(redirectUrl);
        setIsIframeVisible(true);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
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
        <div className="absolute left-0 right-0 bottom-0 h-full w-full">
          {/* <button
            onClick={() => setIsIframeVisible(false)}
            className="absolute top-[-35px] left-4 p-2 rounded-full bg-gradient-to-r from-red-500 to-yellow-400 hover:from-red-400 hover:to-yellow-300 transition-all hover:cursor-pointer shadow-lg hover:shadow-red-500/50"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button> */}
          <iframe
            src={url}
            title="Game Demo"
            className="w-full h-full"
            style={{
              background: "transparent",
              backdropFilter: "none",
              width: "100%",
              height: `100%`,
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </main>
  );
}
