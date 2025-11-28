import { useEffect, useState } from "react";

export default function useAutoTranslate({ text, sourceLang, targetLang }) {
  const [translated, setTranslated] = useState(null);
  const [showOriginal, setShowOriginal] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!text || !sourceLang || !targetLang) return;

    // Si el idioma ya coincide → no traducimos nada
    if (sourceLang === targetLang) {
      setTranslated(null);
      return;
    }

    const translateText = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:5000/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            q: text,
            source: sourceLang,
            target: targetLang,
            format: "text",
          }),
        });

        const data = await res.json();
        setTranslated(data.translatedText);
      } catch (error) {
        console.error("Error traduciendo:", error);
      } finally {
        setLoading(false);
      }
    };

    translateText();
  }, [text, sourceLang, targetLang]);

  return {
    loading,
    showOriginal,
    translated,
    toggle: () => setShowOriginal(prev => !prev)
  };
}
