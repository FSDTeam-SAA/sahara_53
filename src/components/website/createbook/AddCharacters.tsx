"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Upload, Camera, User, Trash } from "lucide-react";
import Image from "next/image";

interface Character {
  id: string;
  name: string;
  image: string | null;
}

interface AddCharactersProps {
  data: Character[];
  onChange: (characters: Character[]) => void;
}

const AddCharacters: React.FC<AddCharactersProps> = ({ data, onChange }) => {
  const [characters, setCharacters] = useState<Character[]>(data || []);
  const [isUploading, setIsUploading] = useState(false);
  const uploadFileInputRef = useRef<HTMLInputElement>(null);
  const cameraFileInputRef = useRef<HTMLInputElement>(null);

  /** 🔥 Sync local state changes back to parent */
  useEffect(() => {
    onChange(characters);
  }, [characters, onChange]);

  /** ➕ Add new character */
  const handleAddCharacter = () => {
    const newCharacter: Character = {
      id: Date.now().toString(),
      name: "",
      image: null,
    };
    setCharacters((prev) => [...prev, newCharacter]);
  };

  /** ❌ Remove */
  const handleRemoveCharacter = (id: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== id));
  };

  /** ✏️ Update name */
  const handleNameChange = (id: string, name: string) => {
    setCharacters((prev) =>
      prev.map((character) =>
        character.id === id ? { ...character, name } : character,
      ),
    );
  };

  /** 📷 Upload image for existing character */
  const handleImageUpload = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      setCharacters((prev) =>
        prev.map((character) =>
          character.id === id
            ? { ...character, image: e.target?.result as string }
            : character,
        ),
      );
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
    event.target.value = ""; // Reset input
  };

  /** 📷 Handle upload from main upload button */
  const handleMainUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const newCharacter: Character = {
        id: Date.now().toString(),
        name: "",
        image: e.target?.result as string,
      };
      setCharacters((prev) => [...prev, newCharacter]);
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
    event.target.value = ""; // Reset input
  };

  /** 📱 Trigger camera for taking photo */
  const handleTakePhoto = async () => {
    // For mobile devices, try to use camera
    if (navigator.mediaDevices && await navigator.mediaDevices.getUserMedia()) {
      // You can implement actual camera capture here
      // For now, just trigger the file input with camera capture
      cameraFileInputRef.current?.setAttribute('capture', 'environment');
      cameraFileInputRef.current?.click();
    } else {
      // Fallback to file input for desktop
      cameraFileInputRef.current?.removeAttribute('capture');
      cameraFileInputRef.current?.click();
    }
  };

  /** 📷 Handle camera photo capture */
  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const newCharacter: Character = {
        id: Date.now().toString(),
        name: "",
        image: e.target?.result as string,
      };
      setCharacters((prev) => [...prev, newCharacter]);
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
    event.target.value = ""; // Reset input
  };

  const handleSkip = () => {
    console.log("Skipping character addition");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
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
          className="text-orange-500 hover:text-orange-600 font-medium text-lg transition"
        >
          Skip Characters
        </button>
      </div>

      {/* NOTE BOX */}
      <div className="p-4 mb-8 rounded-md border border-[#FF7CE5] bg-linear-to-r from-[rgba(255,124,229,0.06)] to-[rgba(93,95,239,0.06)]">
        <p className="text-gray-600 flex items-center gap-3">
          <User className="w-6 h-6" />
          Upload photos of people who should be characters in your story.
        </p>
      </div>

      {/* LIST - Character cards */}
      <div className="space-y-6 mb-8">
        {characters.map((character) => (
          <Card key={character.id} className="relative">
            <CardContent className="p-6">
              <button
                onClick={() => handleRemoveCharacter(character.id)}
                className="absolute cursor-pointer top-3 right-3 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 rounded-md p-2 transition-colors"
                title="Remove character"
              >
                <Trash size={16} />
              </button>
              <div className="flex items-start gap-4">
                {/* IMAGE UPLOAD */}
                <div>
                  <label
                    htmlFor={`image-upload-${character.id}`}
                    className="cursor-pointer"
                  >
                    {character.image ? (
                      <div className="w-full aspect-5/3 rounded-lg overflow-hidden border-2 py-5 px-5 ">
                        <Image
                          src={character.image}
                          alt="Character"
                          width={580}
                          height={580}
                          className="w-full aspect-5/3 object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100">
                        <User size={24} className="text-gray-400" />
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hidden file inputs */}
      <input
        ref={uploadFileInputRef}
        type="file"
        id="upload-photo-input"
        accept="image/*"
        className="hidden"
        onChange={handleMainUpload}
      />

      <input
        ref={cameraFileInputRef}
        type="file"
        id="camera-capture-input"
        
        accept="image/*"
        className="hidden"
        onChange={handleCameraCapture}
      />

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-4">
        {/* Upload Photo Button */}
        <Button
          variant="outline"
          className="w-full flex cursor-pointer items-center justify-center gap-2 py-10 border-2 border-dashed"
          disabled={isUploading}
          onClick={() => uploadFileInputRef.current?.click()}
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
          className="w-full flex cursor-pointer items-center justify-center gap-2 py-10 border-2 border-dashed"
          onClick={handleTakePhoto}
          disabled={isUploading}
        >
          <Camera size={20} />
          Take Photo
        </Button>
      </div>
    </div>
  );
};

export default AddCharacters;
