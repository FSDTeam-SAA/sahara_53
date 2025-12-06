"use client";

import { Mic, Disc, Pause, Play, Trash2 } from "lucide-react";
import { MicSelector } from "@/components/ui/mic-selector";
import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { VoiceData } from "./CreateStepContent";

interface VoiceRecordingProps {
  data: VoiceData | null;
  onChange: (voiceData: VoiceData | null) => void;
  bookid?:string
}

export default function StoryAudio({ data, onChange,bookid }: VoiceRecordingProps) {
  const [recording, setRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [showvoice, setShowVoice] = useState(false);

  console.log('voice', showvoice)

  // -----------------------------
  // Recording Timer Logic
  // -----------------------------
  useEffect(() => {
    if (recording) {
      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [recording]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // -----------------------------
  // Start Recording
  // -----------------------------
  const startRecording = useCallback(async () => {
    setRecordingTime(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (e) => {
        const chunk = e.data;
        if (chunk.size > 0) {
          setAudioBlob(chunk);
        }
      };

      recorder.onstop = () => {
        if (audioBlob) {
          const url = URL.createObjectURL(audioBlob);
          setAudioURL(url);
        }
      };

      recorder.start();
      setRecording(true);
      setRecorded(false);
    } catch (err) {
      console.error("Recording error:", err);
    }
  }, [audioBlob]);

  // -----------------------------
  // Stop Recording
  // -----------------------------
  const stopRecording = useCallback(() => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setRecorded(true);
    }
  }, [mediaRecorder]);

  // -----------------------------
  // Delete Recording
  // -----------------------------
  const deleteRecording = () => {
    setAudioBlob(null);
    setAudioURL(null);
    setRecorded(false);
    setRecordingTime(0);
  };

  // -----------------------------
  // Play/Pause Audio
  // -----------------------------
  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // -----------------------------
  // VOICE BUTTON HANDLER
  // -----------------------------
  const handleVoiceButton = () => {
    setShowVoice((prev) => !prev);

    if (!showvoice) {
      startRecording(); // Open UI → Start Recording
    } else {
      stopRecording(); // Close UI → Stop Recording
    }
  };

  return (
    <>
      {/* VOICE OPEN/CLOSE BUTTON */}
      <Button
        onClick={handleVoiceButton}
        className="flex items-center gap-2 px-4 py-2 rounded-md"
        style={{
          borderRadius: "6px",
          background: "var(--Gr, linear-gradient(90deg, #FF7CE5 0%, #5D5FEF 100%))",
        }}
      >
        <Mic className="w-5 h-5" />
        {showvoice ? "Stop Recording" : "Start Recording"}
      </Button>

      {/* RECORDING UI */}
      {showvoice && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50 shadow-md space-y-4">
          {recording && (
            <div className="text-center text-sm text-red-600">
              Recording Time: <b>{formatTime(recordingTime)}</b>
            </div>
          )}

          <div className="flex items-center justify-center gap-4">
            {/* START / STOP BUTTON */}
            <Button
              onClick={recording ? stopRecording : startRecording}
              className="p-4 rounded-full"
            >
              {recording ? <Pause /> : <Disc />}
            </Button>

            {/* DELETE RECORDING */}
            {recorded && (
              <Button onClick={deleteRecording} variant="destructive" className="p-4 rounded-full">
                <Trash2 />
              </Button>
            )}
          </div>

          {/* AUDIO PLAYER */}
          {audioURL && (
            <div className="flex items-center justify-center gap-3 mt-4">
              <Button onClick={togglePlay} className="p-3 rounded-full">
                {isPlaying ? <Pause /> : <Play />}
              </Button>

              <audio
                ref={audioRef}
                src={audioURL}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}