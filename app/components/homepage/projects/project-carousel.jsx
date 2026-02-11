"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaExpand, FaPlay, FaTimes } from "react-icons/fa";

function ProjectCarousel({ images = [], youtube = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const hasImages = images.length > 0;
  const hasVideo = !!youtube;

  const getYoutubeId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
    );
    return match ? match[1] : "";
  };

  const goToPrev = useCallback((e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback((e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleVideoToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowVideo(!showVideo);
  };

  const handleDotClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
    setShowVideo(false);
  };

  const openLightbox = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback((e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setLightboxOpen(false);
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, goToPrev, goToNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  if (!hasImages && !hasVideo) return null;

  return (
    <>
      {/* Inline carousel (compact) */}
      <div className="mt-4 rounded-lg overflow-hidden border-t-[2px] border-indigo-900">
        <div className="relative w-full bg-[#0a0d37]" style={{ aspectRatio: "16/9", maxHeight: "220px" }}>
          {showVideo && hasVideo ? (
            <iframe
              src={`https://www.youtube.com/embed/${getYoutubeId(youtube)}?autoplay=1`}
              title="Project Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : hasImages ? (
            <>
              <Image
                src={images[currentIndex]}
                alt={`Screenshot ${currentIndex + 1}`}
                width={960}
                height={540}
                className="w-full h-full object-contain cursor-pointer"
                onClick={openLightbox}
              />
              {/* Expand icon */}
              <button
                onClick={openLightbox}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded transition-all"
              >
                <FaExpand size={12} />
              </button>
              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goToPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all"
                  >
                    <FaChevronLeft size={12} />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all"
                  >
                    <FaChevronRight size={12} />
                  </button>
                </>
              )}
            </>
          ) : null}
        </div>

        {/* Controls: dots + video button */}
        <div className="flex items-center justify-center gap-3 py-1.5 bg-[#0d1224]">
          {hasImages &&
            images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => handleDotClick(e, index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  !showVideo && currentIndex === index
                    ? "bg-[#16f2b3] scale-125"
                    : "bg-gray-500 hover:bg-gray-400"
                }`}
              />
            ))}
          {hasVideo && (
            <button
              onClick={handleVideoToggle}
              className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full transition-all ${
                showVideo
                  ? "bg-[#16f2b3] text-black"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              <FaPlay size={8} />
              <span>Video</span>
            </button>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && hasImages && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-[#16f2b3] transition-colors z-10"
          >
            <FaTimes size={24} />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 text-white/70 text-sm z-10">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Main image */}
          <div
            className="relative w-[90vw] h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt={`Screenshot ${currentIndex + 1}`}
              width={1920}
              height={1080}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all"
                >
                  <FaChevronLeft size={20} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all"
                >
                  <FaChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail dots */}
          <div className="absolute bottom-6 flex items-center gap-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => handleDotClick(e, index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-[#16f2b3] scale-125"
                    : "bg-gray-500 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectCarousel;
