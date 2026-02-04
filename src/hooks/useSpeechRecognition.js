import { useState } from "react";

export const useSpeechRecognition = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);

  if (!SpeechRecognition) {
    return {
      supported: false
    };
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = "en-US";

  const startListening = () => {
    setTranscript("");
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      setTranscript(event.results[0][0].transcript);
      setListening(false);
    };
  };

  const stopListening = () => {
    recognition.stop();
    setListening(false);
  };

  return {
    transcript,
    listening,
    startListening,
    stopListening,
    supported: true
  };
};
