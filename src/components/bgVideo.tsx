"use client"
import { useEffect, useRef } from "react";

interface BgVideoProps {
  videoUrl: string;
}

export function BgVideo({ videoUrl }: BgVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.4;
    }
  }, []);
  return (
    <div className="w-full absolute inset-0 -z-10">
      <video ref={videoRef} autoPlay muted playsInline loop className="w-full opacity-25 h-full object-cover">

        <source src={videoUrl} type="video/mp4" />

      </video>

    </div>
  )
}