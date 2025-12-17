"use client";

import { Mic, Disc, Pause, Play, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { VoiceData } from "./CreateStepContent";
import { toast } from "sonner";

interface VoiceRecordingProps {
  data: VoiceData | null;
  onChange: (voiceData: VoiceData | null) => void;
  bookid?: string;
}

export default function StoryAudio({
  data,
  onChange,
  bookid,
}: VoiceRecordingProps) {
  const [recording, setRecording] = useState(false);
  // Local state for preview before confirmation
  const [audioBlob, setAudioBlob] = useState<Blob | null>(
    () => data?.blob || null,
  );
  const [audioURL, setAudioURL] = useState<string | null>(
    () => data?.audioUrl || null,
  );

  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [showvoice, setShowVoice] = useState(() => !!data?.audioUrl);
  const [isConfirmed, setIsConfirmed] = useState(() => !!data?.audioUrl);
  const [recorded, setRecorded] = useState(() => !!data?.audioUrl);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Removed useEffect that was syncing props to state because we now initialize lazily.
  // If props change significantly while mounted (unlikely for this step), key-based remounting in parent is preferred.

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
    chunksRef.current = []; // Clear chunks
    setIsConfirmed(false);
    onChange(null); // Clear parent state when new recording starts

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const mimeType = mediaRecorderRef.current?.mimeType || "audio/webm";
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioURL(url);
        setRecorded(true);
      };

      recorder.start();
      setRecording(true);
      setRecorded(false);
    } catch (err) {
      console.error("Recording error:", err);
      toast.error("Unable to access microphone");
    }
  }, [onChange]);

  // -----------------------------
  // Stop Recording
  // -----------------------------
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setRecording(false);
    }
  }, [recording]);

  // -----------------------------
  // Delete Recording
  // -----------------------------
  const deleteRecording = () => {
    setAudioBlob(null);
    setAudioURL(null);
    setRecorded(false);
    setRecordingTime(0);
    setIsConfirmed(false);
    onChange(null);
  };

  // -----------------------------
  // Confirm Voice
  // -----------------------------
  const confirmVoice = () => {
    if (audioBlob && audioURL) {
      setIsConfirmed(true);
      onChange({ audioUrl: audioURL, blob: audioBlob });
      toast.success("Voice confirmed!");
    } else {
      toast.error("No recording to confirm");
    }
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
    if (!showvoice) {
      setShowVoice(true);
    } else {
      // If we close the panel, should we stop recording? Yes.
      if (recording) stopRecording();
      setShowVoice(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        {/* VOICE OPEN/CLOSE BUTTON */}
        <Button
          onClick={handleVoiceButton}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-transform hover:scale-105"
          style={{
            background:
              "var(--Gr, linear-gradient(90deg, #FF7CE5 0%, #5D5FEF 100%))",
          }}
        >
          <Mic className="w-5 h-5" />
          {showvoice ? "Close Recorder" : "Record Your Voice"}
        </Button>

        {isConfirmed && (
          <div className="mt-4 flex items-center gap-2 text-green-600 font-medium">
            <Check className="w-5 h-5" />
            <span>Voice Confirmed! Ready to generate book.</span>
          </div>
        )}
      </div>

      {/* RECORDING UI */}
      {showvoice && (
        <div className="mt-6 p-6 border rounded-xl bg-white shadow-xl space-y-6 w-full max-w-md mx-auto animate-in fade-in slide-in-from-top-4">
          {recording && (
            <div className="text-center">
              <h2 className="flex items-center text-lg font-semibold text-red-600 bg-red-100 p-3 rounded-md border border-red-300">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Voice recording (minimum 1.5 minutes) is required
              </h2>

              <div className="text-red-500 font-bold text-2xl animate-pulse">
                {formatTime(recordingTime)}
              </div>
              <p className="text-sm text-gray-500 mt-1">Recording...</p>
            </div>
          )}

          <div className="flex items-center justify-center gap-6">
            {/* START / STOP BUTTON */}
            {!recorded && (
              <Button
                onClick={recording ? stopRecording : startRecording}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  recording
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {recording ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Mic className="w-8 h-8 text-white" />
                )}
              </Button>
            )}

            {/* If recorded, user can re-record (which deletes current) */}
            {recorded && !recording && (
              <Button
                onClick={() => {
                  deleteRecording();
                  startRecording();
                }}
                variant="outline"
                className="rounded-full px-4 text-xs h-10 border-gray-300"
              >
                Re-record
              </Button>
            )}
          </div>

          {/* AUDIO PLAYER & ACTIONS */}
          {audioURL && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between gap-3 mb-4">
                <Button
                  onClick={togglePlay}
                  variant="ghost"
                  className="p-2 h-10 w-10 rounded-full hover:bg-gray-200"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-gray-700" />
                  ) : (
                    <Play className="w-6 h-6 text-gray-700" />
                  )}
                </Button>
                {/* Hidden audio element */}
                <audio
                  ref={audioRef}
                  src={audioURL}
                  onEnded={() => setIsPlaying(false)}
                  className="hidden"
                />

                {/* Visualizer placeholder or progress bar could go here */}
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-200"
                    style={{
                      width: isPlaying ? "100%" : "0%",
                      transitionDuration: isPlaying ? "30s" : "0s",
                    }}
                  ></div>
                </div>

                <Button
                  onClick={deleteRecording}
                  variant="ghost"
                  className="p-2 h-10 w-10 rounded-full hover:bg-red-100 text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Confirm Button */}
              <Button
                onClick={confirmVoice}
                disabled={isConfirmed}
                className={`w-full py-6 text-lg font-semibold ${isConfirmed ? "bg-green-500 hover:bg-green-600 text-white" : "bg-black hover:bg-gray-800 text-white"}`}
              >
                {isConfirmed ? (
                  <>
                    <Check className="mr-2 h-5 w-5" /> Confirmed
                  </>
                ) : (
                  "Confirm Voice"
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
