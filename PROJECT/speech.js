// Module phát âm chuẩn qua Web Speech API có sẵn của trình duyệt

const Speech = {
  synth: window.speechSynthesis || null,
  isSpeaking: false,

  speak(text, onStart, onEnd) {
    if (!this.synth) {
      alert("Trình duyệt của bạn không hỗ trợ Web Speech API.");
      return;
    }

    // Dừng âm thanh trước đó nếu đang phát dở
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.8; // Tốc độ hơi chậm một chút để người mất gốc nghe rõ từng âm

    // Cố gắng tìm giọng tiếng Anh bản xứ chuẩn
    const voices = this.synth.getVoices();
    const enVoice = voices.find(
      (v) => v.lang.startsWith("en-US") || v.lang.startsWith("en-GLOBAL") || v.name.includes("English")
    );
    if (enVoice) {
      utterance.voice = enVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (typeof onStart === "function") onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (typeof onEnd === "function") onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (typeof onEnd === "function") onEnd();
    };

    this.synth.speak(utterance);
  }
};

// Nạp trước danh sách giọng phát âm (Chrome đôi khi nạp bất đồng bộ)
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    // Voices loaded ready
  };
}

