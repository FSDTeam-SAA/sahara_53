/* eslint-disable react-hooks/immutability */
"use client";

import React, { useState } from "react";

import StoryDetail from "./StoryDetail";
import AddCharacters from "./AddCharacters";
import YourStoryBeginning from "./YourStoryBeginning";
import VoiceRecording from "./voiceRecording";
import CreateBookMain from "./CreateBookMain";
import CreatingYourBook from "./CreatingYourBook";
import { useMutation } from "@tanstack/react-query";
import {  createBook } from "@/lib/api"; 
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// ------------------ Types ------------------
interface CharacterPayload {
  name: string;
  image: string;
}

export interface CreateBookPayload {
  userId: string;
  title: string;
  language: string;
  style: string;
  genre: string;
  characters: CharacterPayload[];
  beginning: string;
}

interface StoryDetailData {
  bookTitle?: string;
  language?: string;
  genre?: string;
  writingStyle?: string;
}

interface Character {
  // id: string;
  name: string;
  image: string | null; // This will store the URL or base64 string
}

export interface VoiceData {
  audioUrl: string;
  blob: Blob;
}


interface StoryFormData {
  storyDetail: StoryDetailData;
  characters: Character[];
  beginning: string;
  voice: VoiceData | null;
}

// ------------------ API ------------------
// const createBook = async (data: {
//   title: string;
//   language: string;
//   style: string;
//   genre: string;
//   characters: string[];
//   beginning: string;
// }) => {
//   try {
//     const res = await api.post("/story/generate", data);
//     return res.data;
//   } catch (err) {
//     throw new Error(err?.message || "Unknown error occurred");
//   }
// };

// ------------------ Component ------------------
export default function CreateStepContent() {
  const [step, setStep] = useState<number>(0);
  const userId=useSession().data?.user.id
 const route=useRouter()
  const [formData, setFormData] = useState<StoryFormData>({
    storyDetail: {},
    characters: [],
    beginning: "",
    voice: null,
  });
  let bookId:string=''
const bookCreateMutation = useMutation({
  mutationKey: ["createbook"],
  mutationFn: (data: CreateBookPayload) => createBook(data),

  onSuccess: (data) => {
    toast.success("Book created successfully");
    bookId= data._id
  },

  onError: (err: unknown) => {
    const message = err instanceof Error ? err.message : "Failed to create book";
    toast.error(message);
  },
});

  // ------------------ Validation ------------------
  const validateStep = (): boolean => {
    if (step === 0) {
      const d = formData.storyDetail;
      return !!d.bookTitle && !!d.language && !!d.genre && !!d.writingStyle;
    }
    if (step === 1) return true;
    if (step === 2) return formData.beginning?.length > 5;
    if (step === 3) return true;
    return false;
  };

  const next = () => {
    if (!validateStep()) {
      toast.error("Please fill required fields before continuing.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  // ------------------ Submit to backend ------------------


  console.log('form data',formData)
  // console.log('form data in 3 number step',formData)
const handleSubmit = () => {
  const characterObjects = formData.characters
    .filter((c) => c.name && c.image)
    .map((c) => ({
      name: c.name || "",
      image: c.image || "",
    }));

  const payload = {
    userId: userId || "", 
    title: formData.storyDetail.bookTitle || "",
    language: formData.storyDetail.language || "",
    style: formData.storyDetail.writingStyle || "",
    genre: formData.storyDetail.genre || "",
    characters: characterObjects,
    beginning: formData.beginning || "",
  };

  console.log("Submitting payload:", payload);
  bookCreateMutation.mutate(payload);
};

  // ------------------ Render Steps ------------------
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <StoryDetail
            data={formData.storyDetail}
            onChange={(d: StoryDetailData) =>
              setFormData((prev) => ({ ...prev, storyDetail: d }))
            }
          />
        );
      case 1:
        return (
          <AddCharacters
            data={formData.characters}
            onChange={(list: Character[]) =>
              setFormData((prev) => ({ ...prev, characters: list }))
            }
          />
        );
      case 2:
        return (
          <YourStoryBeginning
            data={formData.beginning}
            onChange={(txt: string) =>
              setFormData((prev) => ({ ...prev, beginning: txt }))
            }
          />
        );
      case 3:
        return (
          <VoiceRecording
            data={formData.voice}
            bookid={bookId}
            onChange={(voiceData: VoiceData | null) =>
              setFormData((prev) => ({ ...prev, voice: voiceData }))
            }
          />
        );
      default:
        return <CreatingYourBook />;
    }
  };

  return (
    <CreateBookMain
      step={step}
      next={next}
      back={back}
      handelcall={handleSubmit} // Calls backend
    >
      {renderStep()}
    </CreateBookMain>
  );
}
