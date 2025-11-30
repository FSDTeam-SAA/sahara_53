"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Upload, Camera, User } from "lucide-react";
import Image from "next/image";

interface Character {
  id: string;
  name: string;
  image: string | null;
}

const AddCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddCharacter = () => {
    const newCharacter: Character = {
      id: Date.now().toString(),
      name: "",
      image: null,
    };
    setCharacters([...characters, newCharacter]);
  };

  const handleRemoveCharacter = (id: string) => {
    setCharacters(characters.filter((character) => character.id !== id));
  };

  const handleNameChange = (id: string, name: string) => {
    setCharacters(
      characters.map((character) =>
        character.id === id ? { ...character, name } : character,
      ),
    );
  };

  const handleImageUpload = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCharacters(
          characters.map((character) =>
            character.id === id
              ? { ...character, image: e.target?.result as string }
              : character,
          ),
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkip = () => {
    // Handle skip functionality
    console.log("Skipping character addition");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* HEADER TITLE */}
      <div className="flex justify-between items-center">
        <h2
          className="text-2xl font-bold flex items-center gap-2 mb-6"
          style={{
            background: "linear-gradient(135deg, #FB923C 0%, #EC4899 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <span className="text-3xl">✨</span>
          Add Characters
        </h2>

        {/* SKIP BUTTON */}
        <div className="text-center mb-8">
          <button
            onClick={handleSkip}
            className="text-orange-500 cursor-pointer hover:text-orange-600 font-medium text-lg transition-colors duration-200"
          >
            Skip Characters
          </button>
        </div>
      </div>

      <div className="p-4 mb-8 rounded-md border border-[#FF7CE5] bg-gradient-to-r from-[rgba(255,124,229,0.06)] to-[rgba(93,95,239,0.06)]">
        <p className="text-gray-600 flex items-center gap-3">
          <User className="w-6! h-6!" />
          Upload photos of people who should be characters in your story! Add
          their names and we&apos;ll transform them into cartoon characters. You can
          add multiple characters.
        </p>
      </div>

      {/* SEPARATOR */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* CHARACTERS LIST */}
      <div className="space-y-6 mb-8">
        {characters.map((character) => (
          <Card key={character.id} className="relative">
            <CardContent className="p-6">
              <button
                onClick={() => handleRemoveCharacter(character.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-start gap-4">
                {/* IMAGE UPLOAD AREA */}
                <div className="flex-shrink-0">
                  <input
                    type="file"
                    id={`image-upload-${character.id}`}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(character.id, e)}
                  />
                  <label
                    htmlFor={`image-upload-${character.id}`}
                    className="cursor-pointer"
                  >
                    {character.image ? (
                      <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                        <Image
                          src={character.image}
                          alt="Character preview"
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                        <User size={24} className="text-gray-400" />
                      </div>
                    )}
                  </label>
                </div>

                {/* NAME INPUT */}
                <div className="flex-grow">
                  <label
                    htmlFor={`name-${character.id}`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Character Name
                  </label>
                  <input
                    type="text"
                    id={`name-${character.id}`}
                    value={character.name}
                    onChange={(e) =>
                      handleNameChange(character.id, e.target.value)
                    }
                    placeholder="Enter character name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* UPLOAD BUTTONS */}
      <div className="grid grid-cols-2 gap-4  justify-center">
        {/* UPLOAD PHOTO BUTTON */}
        <input
          type="file"
          id="upload-photo"
          accept="image/*"
          className="hidden"
          onChange={() => handleAddCharacter()}
        />
        <label htmlFor="upload-photo" className="cursor-pointer">
          <Button
            variant="outline"
            className="flex items-center w-full gap-2 px-6 py-10 border-2 border-dashed border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-colors"
          >
            <Upload size={20} />
            Upload Photo
          </Button>
        </label>

        {/* TAKE PHOTO BUTTON */}
        <Button
          variant="outline"
          className="flex items-center w-full  gap-2 px-6 py-10 border-2 border-dashed border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-colors"
          onClick={handleAddCharacter}
        >
          <Camera size={20} />
          Take Photo
        </Button>
      </div>

      {/* ADD CHARACTER BUTTON (for mobile or additional option) */}
      {/* {characters.length === 0 && (
        <div className="text-center mt-8">
          <Button
            onClick={handleAddCharacter}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
          >
            Add Your First Character
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default AddCharacters;
