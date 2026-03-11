"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface LightboxProps {
  images: string[];
  keywords: string[];
  children: React.ReactNode;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  keywords,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number = 0) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrevious();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeLightbox, goToNext, goToPrevious]);

  const triggerElement = React.cloneElement(children as React.ReactElement, {
    // @ts-ignore
    onClick: () => openLightbox(0),
  });

  if (!isOpen) return <>{triggerElement}</>;

  return (
    <>
      {triggerElement}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={closeLightbox}
      >
        <button
          onClick={closeLightbox}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            color: "white",
            fontSize: "32px",
            cursor: "pointer",
            padding: "10px",
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          ×
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              style={{
                position: "absolute",
                left: "20px",
                background: "none",
                border: "none",
                color: "white",
                fontSize: "48px",
                cursor: "pointer",
                padding: "10px",
                lineHeight: 1,
              }}
              aria-label="Previous"
            >
              ‹
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              style={{
                position: "absolute",
                right: "20px",
                background: "none",
                border: "none",
                color: "white",
                fontSize: "48px",
                cursor: "pointer",
                padding: "10px",
                lineHeight: 1,
              }}
              aria-label="Next"
            >
              ›
            </button>
          </>
        )}

        <pre className="text-white bg-black absolute bottom-2 hidden md:block">
          {JSON.stringify(keywords[currentIndex])}
        </pre>
        <Image
          width={1920}
          height={1280}
          src={images[currentIndex]}
          alt={keywords[currentIndex] || `Image ${currentIndex + 1}`}
          style={{
            maxWidth: "100vw",
            maxHeight: "100vh",
            objectFit: "contain",
          }}
        />

        {images.length > 1 && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              color: "white",
              fontSize: "14px",
            }}
          >
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </>
  );
};
