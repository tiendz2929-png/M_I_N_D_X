// celebration.js — Hiệu ứng ăn mừng, âm thanh chiến thắng & đánh giá điểm số

const Celebration = {
  // ── 1. Đánh giá kết quả theo các mốc điểm quy định ──
  getScoreEvaluation(score10) {
    // Làm tròn điểm về số nguyên 0 -> 10
    const score = Math.max(0, Math.min(10, Math.round(score10)));

    if (score <= 5) {
      return {
        score: score,
        title: "Học lại dùm !!",
        emotion: "💀 😭 🤡",
        badgeColor: "bg-red-500",
        textColor: "text-red-500",
        borderColor: "border-red-500",
        bgLight: "bg-red-50 dark:bg-red-950/30",
        message: "Chưa đạt yêu cầu rồi bạn ơi! Hãy quay lại sơ đồ cây ôn kỹ từ vựng và thử lại nhé!"
      };
    } else if (score >= 6 && score <= 7) {
      return {
        score: score,
        title: "Cần cố gắng",
        emotion: "🥺 💪 ✨",
        badgeColor: "bg-amber-500",
        textColor: "text-amber-500",
        borderColor: "border-amber-500",
        bgLight: "bg-amber-50 dark:bg-amber-950/30",
        message: "Kết quả tạm ổn nhưng vẫn còn vấp một số từ. Ôn thêm xíu nữa là điểm cao ngay!"
      };
    } else if (score >= 8 && score <= 9) {
      return {
        score: score,
        title: "Sắp tới đích rồi",
        emotion: "🔥 🎯 👏",
        badgeColor: "bg-blue-500",
        textColor: "text-blue-500",
        borderColor: "border-blue-500",
        bgLight: "bg-blue-50 dark:bg-blue-950/30",
        message: "Rất xuất sắc! Phản xạ từ vựng của bạn rất tốt, chỉ thiếu 1 bước nhỏ để đạt điểm tuyệt đối!"
      };
    } else {
      // 10 điểm
      return {
        score: 10,
        title: "Aduuu học bá",
        emotion: "👑 ⚡ 🏆 🧠",
        badgeColor: "bg-emerald-500",
        textColor: "text-emerald-500",
        borderColor: "border-emerald-500",
        bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
        message: "Đỉnh nóc kịch trần bay phấp phới! 10/10 điểm trọn vẹn, xứng danh học bá Linearthinking!"
      };
    }
  },

  // ── 2. Phát âm thanh chiến thắng (Web Audio API không cần file ngoài) ──
  playFanfare() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Nốt nhạc vui tươi: C5 -> E5 -> G5 -> C6
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.12);
        gain.gain.setValueAtTime(0.2, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.35);
      });
    } catch (e) {
      // Ignore if audio context not permitted by user interaction
    }
  },

  // ── 3. Bắn pháo hoa Confetti ──
  burstConfetti() {
    if (typeof confetti === "function") {
      // Bắn 3 đợt pháo hoa lộng lẫy
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
      }, 200);
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);
    } else {
      this.fallbackConfetti();
    }
  },

  // Fallback confetti nếu chưa nạp được CDN
  fallbackConfetti() {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.inset = "0";
    container.style.pointerEvents = "none";
    container.style.zIndex = "99999";
    container.style.overflow = "hidden";
    document.body.appendChild(container);

    const colors = ["#2563eb", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4"];
    for (let i = 0; i < 50; i++) {
      const piece = document.createElement("div");
      piece.style.position = "absolute";
      piece.style.width = Math.random() * 10 + 6 + "px";
      piece.style.height = Math.random() * 10 + 6 + "px";
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.top = "-20px";
      piece.style.borderRadius = "2px";
      piece.style.opacity = "0.9";
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      piece.style.transition = `transform ${Math.random() * 2 + 1.5}s ease-out, top ${Math.random() * 2 + 1.5}s ease-in, opacity 2s`;

      container.appendChild(piece);
      setTimeout(() => {
        piece.style.top = "105vh";
        piece.style.transform = `rotate(${Math.random() * 720}deg)`;
        piece.style.opacity = "0";
      }, 20);
    }

    setTimeout(() => {
      container.remove();
    }, 3500);
  },

  // ── 4. Kích hoạt hiệu ứng ăn mừng đầy đủ (Confetti + Nhạc) ──
  trigger() {
    this.burstConfetti();
    this.playFanfare();
  },

  // ── 5. Toast thông báo ăn mừng mốc từ vựng / sự kiện ──
  showToast(title, message, emotion = "🎉") {
    this.trigger();

    const oldToast = document.getElementById("celebration-toast");
    if (oldToast) oldToast.remove();

    const toast = document.createElement("div");
    toast.id = "celebration-toast";
    toast.className =
      "fixed top-6 right-6 z-[9999] max-w-md bg-white dark:bg-slate-800 border-2 border-emerald-500 rounded-2xl shadow-2xl p-4 flex items-start gap-4 transition-all duration-300 transform translate-y-[-20px] opacity-0";
    toast.innerHTML = `
      <div class="text-4xl select-none animate-bounce">${emotion}</div>
      <div class="flex-1">
        <h4 class="font-black text-slate-900 dark:text-white text-base leading-snug">${title}</h4>
        <p class="text-xs text-slate-500 dark:text-slate-300 mt-1 leading-relaxed">${message}</p>
      </div>
      <button class="text-slate-400 hover:text-slate-700 dark:hover:text-white text-lg font-bold" onclick="this.parentElement.remove()">✕</button>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("translate-y-[-20px]", "opacity-0");
    }, 50);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add("translate-y-[-20px]", "opacity-0");
        setTimeout(() => toast.remove(), 400);
      }
    }, 6000);
  }
};

