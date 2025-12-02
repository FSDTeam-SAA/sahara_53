"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MicSelector } from "@/components/ui/mic-selector";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LiveWaveform } from "@/components/ui/live-waveform";
import { Mic, Disc, Pause, Play, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type RecordingState = "idle" | "loading" | "recording" | "recorded" | "playing";

interface VoiceData {
  blob?: Blob | null;
  url?: string | null;
}

interface VoiceRecordingProps {
  data: VoiceData | null;

  onChange: (data: VoiceData | null) => void;
}

const VoiceRecording: React.FC<VoiceRecordingProps> = ({ data, onChange }) => {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(data?.blob || null);
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [isMuted, setIsMuted] = useState(false);
  const [showvoice, setShowVoice] = useState(false);
  const [state, setState] = useState<RecordingState>("idle");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    onChange({ blob: audioBlob, url: audioBlob ? URL.createObjectURL(audioBlob) : null });
  }, [audioBlob, onChange]);

  const startRecording = useCallback(async () => {
    try {
      setState("loading");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: selectedDevice ? { deviceId: { exact: selectedDevice } } : true,
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
        setState("recorded");
      };

      mediaRecorder.start();
      setState("recording");
    } catch (error) {
      console.error("Error starting recording:", error);
      setState("idle");
    }
  }, [selectedDevice]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state === "recording") {
      mediaRecorderRef.current.stop();
    }
  }, [state]);

  const playRecording = useCallback(() => {
    if (!audioBlob) return;
    const audio = new Audio(URL.createObjectURL(audioBlob));
    audioElementRef.current = audio;
    audio.onended = () => setState("recorded");
    audio.play();
    setState("playing");
  }, [audioBlob]);

  const pausePlayback = useCallback(() => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      setState("recorded");
    }
  }, []);

  const restart = useCallback(() => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current = null;
    }
    setAudioBlob(null);
    audioChunksRef.current = [];
    setState("idle");
  }, []);

  useEffect(() => {
    if (isMuted && state === "recording") stopRecording();
  }, [isMuted, state, stopRecording]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
      if (audioElementRef.current) audioElementRef.current.pause();
    };
  }, []);

  const showWaveform = state === "recording" && !isMuted;
  const showProcessing = state === "loading" || state === "playing";
  const showRecorded = state === "recorded";

  const handleSkip = () => console.log("Skipping character addition");

  const toggleVoiceUI = () => setShowVoice((prev) => !prev);



  // console.log('all create book data',datas)

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* HEADER TITLE */}
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-2xl font-bold flex items-center gap-2"
          style={{
            background: "linear-gradient(135deg, #FB923C 0%, #EC4899 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <span className="text-3xl">✨</span>
          Voice Recording (Optional)
        </h2>
        <button
          onClick={handleSkip}
          className="text-orange-500 hover:text-orange-600 font-medium text-lg transition-colors duration-200"
        >
          Skip Voice
        </button>
      </div>

      {/* INFO BOX */}
      <div className="p-4 mb-8 rounded-md border border-[#FF7CE5] bg-linear-to-r from-[rgba(255,124,229,0.06)] to-[rgba(93,95,239,0.06)]">
        <p className="text-gray-600 flex items-center gap-3">
          Record a voice sample so we can create personalized narration for your
          book. This step is optional but adds a special touch!
        </p>
      </div>

      {/* MIC SELECTOR AND RECORDING CARD */}
      {showvoice && (
        <div className="mb-4 flex justify-center">
          <div className="flex w-full max-w-2xl items-center justify-center p-4">
            <Card className="m-0 w-full p-0 shadow-lg">
              <div className="flex items-center justify-between gap-2 p-2">
                {/* Waveform */}
                <div className="flex-1 h-10">
                  <div className="relative h-full w-full rounded-sm overflow-hidden bg-foreground/5 text-foreground/70 flex items-center justify-center">
                    <LiveWaveform
                      key={state}
                      active={showWaveform}
                      processing={showProcessing}
                      deviceId={selectedDevice}
                      barWidth={3}
                      barGap={1}
                      barRadius={4}
                      fadeEdges
                      fadeWidth={24}
                      sensitivity={1.8}
                      smoothingTimeConstant={0.85}
                      height={20}
                      mode="scrolling"
                      className={cn("h-full w-full transition-opacity duration-300", state === "idle" && "opacity-0")}
                    />
                    {state === "idle" && (
                      <span className="absolute text-foreground/50 text-[10px] font-medium">
                        Start Recording
                      </span>
                    )}
                    {showRecorded && (
                      <span className="absolute text-foreground/50 text-[10px] font-medium">
                        Ready to Play
                      </span>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center">
                  <MicSelector
                    value={selectedDevice}
                    onValueChange={setSelectedDevice}
                    muted={isMuted}
                    onMutedChange={setIsMuted}
                    disabled={state === "recording" || state === "loading"}
                  />
                  <Separator orientation="vertical" className="mx-1 -my-2.5" />

                  {state === "idle" && (
                    <Button variant="ghost" size="icon" onClick={startRecording} disabled={isMuted}>
                      <Disc className="h-5 w-5" />
                    </Button>
                  )}
                  {(state === "loading" || state === "recording") && (
                    <Button variant="ghost" size="icon" onClick={stopRecording} disabled={state === "loading"}>
                      <Pause className="h-5 w-5" />
                    </Button>
                  )}
                  {showRecorded && (
                    <Button variant="ghost" size="icon" onClick={playRecording}>
                      <Play className="h-5 w-5" />
                    </Button>
                  )}
                  {state === "playing" && (
                    <Button variant="ghost" size="icon" onClick={pausePlayback}>
                      <Pause className="h-5 w-5" />
                    </Button>
                  )}
                  <Separator orientation="vertical" className="mx-1 -my-2.5" />
                  <Button variant="ghost" size="icon" onClick={restart} disabled={state === "idle" || state === "loading" || state === "recording"}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* RECORDING BUTTONS */}
      <div className="flex flex-col items-center justify-center gap-4 mx-auto">
        {!showvoice && (
          <button
            onClick={toggleVoiceUI}
            className="flex items-center justify-center w-16 h-16 rounded-full shadow-lg text-white transition-transform duration-200 hover:scale-105"
            style={{
              borderRadius: "100px",
              background: "var(--2-gr, linear-gradient(135deg, #F472B6 0%, #A855F7 100%))",
              boxShadow: "0 6px 12px 0 rgba(0, 0, 0, 0.12)",
            }}
          >
            <Mic className="w-5 h-5" />
          </button>
        )}

        <Button
          onClick={toggleVoiceUI}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-white transition-transform duration-200 hover:scale-105"
          style={{
            borderRadius: "6px",
            background: "var(--Gr, linear-gradient(90deg, #FF7CE5 0%, #5D5FEF 100%))",
          }}
        >
          <Mic className="w-5 h-5" />
          {showvoice ? "Stop Recording" : "Start Recording"}
        </Button>
      </div>
    </div>
  );
};

export default VoiceRecording;
