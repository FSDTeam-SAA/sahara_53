/* eslint-disable react-hooks/purity */
"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Download, X } from "lucide-react";
import { toast } from "sonner";

const CapturePicture = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isActive, setIsActive] = useState(false);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      setImageUrl(""); // Clear previous image
      setIsActive(true);
      
      let mediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
      } catch (e) {
         console.warn("User facing mode not supported, falling back to default", e);
         mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
      }

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Camera error:", error);
      toast.error("Could not access camera");
      setIsActive(false);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Flip horizontally for mirror effect if using user camera (optional preference)
    // ctx.translate(canvas.width, 0);
    // ctx.scale(-1, 1);

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/png");
    setImageUrl(dataUrl);
    
    // Stop camera after capture? Or keep it running? calling stopCamera logic here if we want single shot
    // stopCamera();
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    setIsActive(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Capture Picture
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
          {!isActive && !imageUrl && (
            <div className="text-gray-400">Camera is off</div>
          )}
          
          {isActive && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          )}

          {imageUrl && !isActive && (
             // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="Captured" className="w-full h-full object-cover" />
          )}
          
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="flex gap-2 justify-center">
          {!isActive ? (
            <Button onClick={startCamera} className="w-full">
              Start Camera
            </Button>
          ) : (
            <>
              <Button onClick={takePhoto} variant="default" className="flex-1">
                Capture
              </Button>
              <Button onClick={stopCamera} variant="destructive" size="icon">
                <X className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        {imageUrl && (
          <div className="pt-2 border-t">
            <Button asChild variant="outline" className="w-full">
        
              <a href={imageUrl} download={`capture_${Date.now()}.png`}>
                <Download className="w-4 h-4 mr-2" />
                Download Image
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CapturePicture;
