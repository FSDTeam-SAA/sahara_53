/* eslint-disable react-hooks/immutability */
"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import StoryDetail from "./StoryDetail";
import AddCharacters from "./AddCharacters";
import YourStoryBeginning from "./YourStoryBeginning";
import VoiceRecording from "./voiceRecording";
import CreateBookMain from "./CreateBookMain";
import CreatingYourBook from "./CreatingYourBook";
import { useMutation } from "@tanstack/react-query";
import { createBook, voiceClone } from "@/lib/api";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  name: string;
  image: string | null;
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

// ------------------ Component ------------------
export default function CreateStepContent() {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const userId = useSession().data?.user.id;
  const [formData, setFormData] = useState<StoryFormData>({
    storyDetail: {},
    characters: [],
    beginning: "",
    voice: null,
  });

  const [bookId, setBookId] = useState<string>("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const bookCreateMutation = useMutation({
    mutationKey: ["createbook"],
    mutationFn: (data: CreateBookPayload) => createBook(data),

    onSuccess: (data) => {
      toast.success("Book created successfully");
      console.log("create data check for book id");
      setBookId(data?.saved._id);
      setStep(3); // Go to Voice Recording step
    },

    onError: (err: unknown) => {
      const message =
        err instanceof Error ? err.message : "Failed to create book";
      toast.error(message);
    },
  });

  const VoiceMutation = useMutation({
    mutationKey: ["voiceClone"],
    mutationFn: ({ blob, id }: { blob: Blob; id: string }) =>
      voiceClone(blob, id),

    onSuccess: () => {
      toast.success("Voice added successfully");
      if (bookId) {
        router.push(`/book/${bookId}`);
      }
    },

    onError: (err: unknown) => {
      const message =
        err instanceof Error ? err.message : "Failed to add voice";
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
    if (step === 2) return true;
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

  console.log("form data", formData);
  // console.log('form data in 3 number step',formData)
  const handleSubmit = () => {
    // Step 2: Create Book
    if (step === 2) {
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

      console.log("Submitting book payload:", payload);
      bookCreateMutation.mutate(payload);
    }

    // Step 3: Voice Clone
    if (step === 3) {
      const blob = formData.voice?.blob || new Blob([]);
      if (!bookId) {
        toast.error("Book ID is missing. Cannot add voice.");
        return;
      }

      console.log("Submitting voice payload for book:", bookId);
      VoiceMutation.mutate({ blob, id: bookId });
    }
  };

  // ------------------ Handlers ------------------
  // Memoize these handlers to prevent infinite render loops in children
  const handleStoryDetailChange = useCallback((d: StoryDetailData) => {
    setFormData((prev) => ({ ...prev, storyDetail: d }));
  }, []);

  const handleCharactersChange = useCallback((list: Character[]) => {
    setFormData((prev) => ({ ...prev, characters: list }));
  }, []);

  const handleBeginningChange = useCallback((txt: string) => {
    setFormData((prev) => ({ ...prev, beginning: txt }));
  }, []);

  const handleVoiceChange = useCallback((voiceData: VoiceData | null) => {
    setFormData((prev) => ({ ...prev, voice: voiceData }));
  }, []);

  const isProcessing = bookCreateMutation.isPending || VoiceMutation.isPending;

  // ------------------ Render Steps ------------------
  const renderStep = () => {
    if (isProcessing) {
      const mode = VoiceMutation.isPending ? "voice" : "book";
      return (
        <motion.div
          key="loading"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <CreatingYourBook mode={mode} />
        </motion.div>
      );
    }

    return (
      <motion.div
        key={step}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {(() => {
          switch (step) {
            case 0:
              return (
                <StoryDetail
                  data={formData.storyDetail}
                  onChange={handleStoryDetailChange}
                />
              );
            case 1:
              return (
                <AddCharacters
                  data={formData.characters}
                  onChange={handleCharactersChange}
                  onLoadingChange={setIsGeneratingImage}
                />
              );
            case 2:
              return (
                <YourStoryBeginning
                  data={formData.beginning}
                  onChange={handleBeginningChange}
                />
              );
            case 3:
              return (
                <VoiceRecording
                  data={formData.voice}
                  bookid={bookId}
                  onChange={handleVoiceChange}
                />
              );
            default:
              return <CreatingYourBook />;
          }
        })()}
      </motion.div>
    );
  };

  return (
    <CreateBookMain
      step={step}
      next={next}
      back={back}
      handelcall={handleSubmit}
      isNextDisabled={isGeneratingImage || isProcessing}
      isLoading={isProcessing}
    >
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </CreateBookMain>
  );
}
