"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Upload, Camera, User, Trash } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { imageGenerate } from "@/lib/api";
import { toast } from "sonner";

interface Character {
  name: string;
  image: string | null; // This will store original image first, then Ghibli image if successful
}

interface AddCharactersProps {
  data: Character[];
  onChange: (characters: Character[]) => void;
  onLoadingChange?: (loading: boolean) => void;
}

// ✅ Camera Modal Component - MOVED OUTSIDE
// ✅ Fix: Update interface to accept nullable refs
// ✅ Fix: Update interface to accept stream
interface CameraModalProps {
  onClose: () => void;
  onCapture: () => void;
  cameraPreviewRef: React.RefObject<HTMLVideoElement | null>;
  cameraCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  stream: MediaStream | null;
}

const CameraModal: React.FC<CameraModalProps> = ({ 
  onClose, 
  onCapture, 
  cameraPreviewRef, 
  cameraCanvasRef,
  stream
}) => {
  // Attach stream to video element when component mounts and stream is available
  useEffect(() => {
    if (cameraPreviewRef.current && stream) {
      cameraPreviewRef.current.srcObject = stream;
    }
  }, [stream, cameraPreviewRef]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Take Photo</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              ref={cameraPreviewRef}
              autoPlay
              playsInline
              muted
              className="w-full h-96 object-cover"
            />
            <canvas ref={cameraCanvasRef} className="hidden" />
          </div>
          
          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={onCapture}
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white"
            >
              Capture
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Now AddCharacters component starts here
const AddCharacters: React.FC<AddCharactersProps> = ({ data, onChange, onLoadingChange }) => {
  const session = useSession();
  const [characters, setCharacters] = useState<Character[]>(data || []);
  const [isUploading, setIsUploading] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraPreviewRef = useRef<HTMLVideoElement>(null);
  const cameraCanvasRef = useRef<HTMLCanvasElement>(null);

  const imageGenerateMutation = useMutation({
    mutationKey: ["generateImage"],
    mutationFn: (data: FormData) => imageGenerate(data),
    onSuccess: (response) => {
      if (response?.imageUrl && characters.length > 0) {
        // Update character with Ghibli image
        setCharacters((prev) => {
          const updated = [...prev];
          if (updated[0]) {
            updated[0] = {
              ...updated[0],
              image: response.imageUrl, 
            };
          }
          return updated;
        });

        toast.success("Ghibli-style image generated successfully!");

        // Pass updated character to parent
        onChange(
          characters.map((char, index) =>
            index === 0 ? { ...char, image: response.imageUrl } : char,
          ),
        );
      } else {
        // Keep original image if no Ghibli image returned
        toast.info("Using original image (Ghibli generation unavailable)");
      }
    },
    onError: (error) => {
      toast.info("Using original uploaded image");
      console.error("Ghibli image generation error:", error);
    },
  });

  // Notify parent component about loading state
  useEffect(() => {
    if (onLoadingChange) {
      const isLoading = isUploading || imageGenerateMutation.isPending;
      onLoadingChange(isLoading);
    }
  }, [isUploading, imageGenerateMutation.isPending, onLoadingChange]);

  // Clean up camera stream
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  // Sync characters to parent
  useEffect(() => {
    onChange(characters);
  }, [characters, onChange]);

  // Handle character removal
  const handleRemoveCharacter = () => {
    setCharacters([]);
    onChange([]);
  };

  // Start camera
  // Start camera with fallback
  const startCamera = async () => {
    try {
      if (characters.length > 0) {
        toast.info(
          "Only one character allowed. Please remove existing character first."
        );
        return;
      }

      let stream: MediaStream;
      try {
        // First try: User facing camera
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
      } catch (err) {
        console.warn("User camera failed, trying any camera...", err);
        // Second try: Any video camera
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
      }

      setCameraStream(stream);
      setIsCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      if (error instanceof DOMException) {
        if (error.name === 'NotAllowedError') {
          toast.error("Camera access denied. Please allow permissions in your browser settings.");
        } else if (error.name === 'NotFoundError') {
          toast.error("No camera found on your device.");
        } else {
          toast.error(`Camera error: ${error.name}`);
        }
      } else {
        toast.error("Unable to access camera. Please check permissions.");
      }
    }
  };


  // Stop camera
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
      setIsCameraActive(false);
    }
  };

  // Unified function to add character
  const addCharacter = (imageData: string) => {
    const newCharacter: Character = {
      name: session.data?.user?.name || "User",
      image: imageData,
    };

    setCharacters([newCharacter]);
    toast.success("Character image added!");

    // Try to generate Ghibli image
    generateGhibliImage(imageData);
  };

  // Capture photo
  const capturePhoto = () => {
    if (!cameraPreviewRef.current || !cameraCanvasRef.current || !cameraStream)
      return;

    const video = cameraPreviewRef.current;
    const canvas = cameraCanvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg", 0.8);

    addCharacter(imageData);
    stopCamera();
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (characters.length > 0) {
      toast.info(
        "Only one character allowed. Please remove existing character first.",
      );
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      event.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      event.target.value = "";
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        addCharacter(result);
      }
      setIsUploading(false);
    };

    reader.onerror = () => {
      toast.error("Failed to read image file");
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  // Generate Ghibli image from uploaded photo
  const generateGhibliImage = async (imageData: string) => {
    if (!imageData || !session.data?.user?.name) return;

    try {
      // Convert base64 to Blob
      const base64Data = imageData.split(",")[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });

      // Create FormData
      const formData = new FormData();
      const fileName = `${session.data.user.name.replace(/\s+/g, "_")}_${Date.now()}.jpg`;
      const file = new File([blob], fileName, { type: "image/jpeg" });

      formData.append("file", file);
      formData.append("name", session.data.user.name);

      await imageGenerateMutation.mutateAsync(formData);
    } catch (error) {
      console.error("Error generating Ghibli image:", error);
      // Don't show error toast - we'll keep original image
    }
  };

  const handleSkip = () => {
    toast.info("Skipped character addition");
    onChange([]);
  };

  return (
    <div className="w-full max-full mx-auto z-50">
      {/* Camera Modal */}
      {isCameraActive && (
        <CameraModal
          onClose={stopCamera}
          onCapture={capturePhoto}
          cameraPreviewRef={cameraPreviewRef}
          cameraCanvasRef={cameraCanvasRef}
          stream={cameraStream}
        />
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2
          className="text-2xl font-bold flex items-center gap-2 mb-6"
          style={{
            background: "linear-gradient(135deg, #FB923C 0%, #EC4899 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <span className="text-3xl">✨</span>
          Add Characters
        </h2>

        <button
          onClick={handleSkip}
          className="text-orange-500 hover:text-orange-600 cursor-pointer font-medium text-lg transition"
        >
          Skip Characters
        </button>
      </div>

      {/* NOTE BOX */}
      <div className="p-4 mb-8 rounded-md border border-[#FF7CE5] bg-linear-to-r from-[rgba(255,124,229,0.06)] to-[rgba(93,95,239,0.06)]">
        <p className="text-gray-600 flex items-center gap-3">
          <User className="w-6 h-6" />
          Upload a photo to generate a Ghibli-style character for your story.
          {imageGenerateMutation.isPending && (
            <span className="text-orange-500 text-sm ml-2">
              Generating Ghibli version...
            </span>
          )}
        </p>
      </div>

      {/* CHARACTER CARD */}
      <div className="space-y-6 mb-8">
        {characters.map((character, index) => (
          <Card key={index} className="relative">
            <CardContent className="p-6">
              <button
                onClick={handleRemoveCharacter}
                className="absolute cursor-pointer top-3 right-3 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 rounded-md p-2 transition-colors"
                title="Remove character"
              >
                <Trash size={16} />
              </button>

              {/* Image Display */}
              <div className="flex flex-col gap-4">
                <h4 className="text-sm font-medium text-gray-700">
                  {imageGenerateMutation.isSuccess
                    ? "Your Ghibli Character"
                    : "Your Character"}
                  {imageGenerateMutation.isPending &&
                    " (Generating Ghibli version...)"}
                </h4>

                <div
                  className={`w-full aspect-5/3 rounded-lg overflow-hidden border-2 ${
                    imageGenerateMutation.isSuccess
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                >
                  {character.image ? (
                    <Image
                      src={character.image}
                      alt={
                        imageGenerateMutation.isSuccess
                          ? "Ghibli character"
                          : "Original character"
                      }
                      width={580}
                      height={580}
                      className="w-full aspect-5/3 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-100">
                      <User size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Character:{" "}
                    <span className="font-semibold">{character.name}</span>
                  </p>

                  {imageGenerateMutation.isSuccess && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Ghibli Style
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Empty state */}
        {characters.length === 0 && (
          <Card className="border-dashed border-2">
            <CardContent className="p-8 text-center">
              <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No Character Added
              </h3>
              <p className="text-gray-500">
                Upload a photo or take a photo to add your main character
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        id="upload-photo-input"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-4">
        {/* Upload Photo Button */}
        <Button
          variant="outline"
          className="w-full flex cursor-pointer items-center justify-center gap-2 py-8 border-2 border-dashed"
          disabled={
            isUploading ||
            isCameraActive ||
            characters.length > 0 ||
            imageGenerateMutation.isPending
          }
          onClick={() => fileInputRef.current?.click()}
        >
          {isUploading ? (
            "Uploading..."
          ) : (
            <>
              <Upload size={20} />
              Upload Photo
            </>
          )}
        </Button>

        {/* Take Photo Button */}
<Button
  variant="outline"
  className="w-full flex cursor-pointer items-center justify-center gap-2 py-8 border-2 border-dashed"
  onClick={startCamera}
  disabled={
    isUploading ||
    isCameraActive ||
    characters.length > 0 ||
    imageGenerateMutation.isPending
  }
>
  <Camera size={20} />
  Take Photo
</Button>

      </div>
    </div>
  );
};

export default AddCharacters;