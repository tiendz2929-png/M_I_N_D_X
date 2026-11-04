// Logic Mini-game Ghép Cặp Cụm Từ (Collocation Matching Challenge)

const Game = {
  currentTopic: null,
  selectedLeft: null,
  selectedRight: null,
  score: 0,
  timerInterval: null,
  secondsElapsed: 0,
  totalPairs: 0,
  matchedPairs: 0,
  isLocked: false,

  init() {
    this.bindEvents();
  },

  // Khởi động màn chơi theo chủ đề
  start(topic) {
    if (!topic) return;
    this.currentTopic = topic;
    this.reset();
    this.renderBoard();
    this.startTimer();
  },

  // Reset điểm và trạng thái
  reset() {
    this.score = 0;
    this.matchedPairs = 0;
    this.selectedLeft = null;
    this.selectedRight = null;
    this.isLocked = false;
    this.secondsElapsed = 0;
    clearInterval(this.timerInterval);

    this.updateStatsUI();
    const victoryBox = document.getElementById("game-victory-box");
    if (victoryBox) victoryBox.classList.remove("is-show");
  },

  // Bắt đầu đếm thời gian
  startTimer() {
    const timerEl = document.getElementById("game-timer");
    this.timerInterval = setInterval(() => {
      this.secondsElapsed += 1;
      const mins = String(Math.floor(this.secondsElapsed / 60)).padStart(2, "0");
      const secs = String(this.secondsElapsed % 60).padStart(2, "0");
      if (timerEl) timerEl.textContent = `${mins}:${secs}`;
    }, 1000);
  },

  // Thu thập toàn bộ collocations của chủ đề hiện tại
  getTopicCollocations() {
    if (!this.currentTopic || !this.currentTopic.roots) return [];
    const list = [];
    this.currentTopic.roots.forEach((root) => {
      if (root.collocations) {
        root.collocations.forEach((c) => {
          list.push({
            id: c.id,
            phrase: c.phrase,
            meaning: c.meaning
          });
        });
      }
    });
    return list;
  },

  // Thuật toán xáo trộn mảng Fisher-Yates
  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  // Render các thẻ lên bàn cờ
  renderBoard() {
    const leftCol = document.getElementById("game-col-left");
    const rightCol = document.getElementById("game-col-right");
    if (!leftCol || !rightCol) return;

    const pairs = this.getTopicCollocations();
    this.totalPairs = pairs.length;

    if (pairs.length === 0) {
      leftCol.innerHTML = "<p>Chủ đề này chưa có cụm từ mẫu.</p>";
      rightCol.innerHTML = "";
      return;
    }

    // Xáo trộn riêng 2 cột
    const shuffledLeft = this.shuffle(pairs);
    const shuffledRight = this.shuffle(pairs);

    // Cột Trái: Cụm từ tiếng Anh
    leftCol.innerHTML = "";
    shuffledLeft.forEach((item) => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.setAttribute("data-pair-id", item.id);
      card.setAttribute("data-side", "left");
      card.innerHTML = `<span>${item.phrase}</span> <span style="font-size:12px; opacity:0.6;">🇬🇧</span>`;
      card.addEventListener("click", () => this.handleCardClick(card));
      leftCol.appendChild(card);
    });

    // Cột Phải: Nghĩa tiếng Việt
    rightCol.innerHTML = "";
    shuffledRight.forEach((item) => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.setAttribute("data-pair-id", item.id);
      card.setAttribute("data-side", "right");
      card.innerHTML = `<span>${item.meaning}</span> <span style="font-size:12px; opacity:0.6;">🇻🇳</span>`;
      card.addEventListener("click", () => this.handleCardClick(card));
      rightCol.appendChild(card);
    });

    // Cập nhật kỷ lục cũ nếu có
    const record = Storage.getGameRecord(this.currentTopic.id);
    const recordEl = document.getElementById("game-record-info");
    if (recordEl) {
      if (record) {
        recordEl.textContent = `🏆 Kỷ lục: ${record.score} điểm (${record.timeSeconds}s)`;
      } else {
        recordEl.textContent = "🏆 Chưa có kỷ lục nào";
      }
    }
  },

  // Xử lý khi click vào 1 thẻ
  handleCardClick(card) {
    if (this.isLocked || card.classList.contains("matched") || card.classList.contains("selected")) {
      return;
    }

    const side = card.getAttribute("data-side");

    if (side === "left") {
      if (this.selectedLeft) this.selectedLeft.classList.remove("selected");
      this.selectedLeft = card;
      card.classList.add("selected");
    } else {
      if (this.selectedRight) this.selectedRight.classList.remove("selected");
      this.selectedRight = card;
      card.classList.add("selected");
    }

    // Nếu đã chọn đủ 1 thẻ trái và 1 thẻ phải -> Kiểm tra kết quả
    if (this.selectedLeft && this.selectedRight) {
      this.checkMatch();
    }
  },

  // Kiểm tra 2 thẻ vừa chọn
  checkMatch() {
    this.isLocked = true;
    const idLeft = this.selectedLeft.getAttribute("data-pair-id");
    const idRight = this.selectedRight.getAttribute("data-pair-id");

    if (idLeft === idRight) {
      // Ghép ĐÚNG
      setTimeout(() => {
        this.selectedLeft.classList.remove("selected");
        this.selectedRight.classList.remove("selected");
        this.selectedLeft.classList.add("matched");
        this.selectedRight.classList.add("matched");

        this.score += 10;
        this.matchedPairs += 1;
        this.updateStatsUI();

        this.selectedLeft = null;
        this.selectedRight = null;
        this.isLocked = false;

        // Kiểm tra xem đã thắng toàn bộ chưa
        if (this.matchedPairs === this.totalPairs) {
          this.handleVictory();
        }
      }, 250);
    } else {
      // Ghép SAI: Rung lắc và trừ 2 điểm
      setTimeout(() => {
        this.selectedLeft.classList.add("wrong");
        this.selectedRight.classList.add("wrong");

        if (this.score >= 2) this.score -= 2;
        this.updateStatsUI();

        setTimeout(() => {
          if (this.selectedLeft) {
            this.selectedLeft.classList.remove("selected", "wrong");
          }
          if (this.selectedRight) {
            this.selectedRight.classList.remove("selected", "wrong");
          }
          this.selectedLeft = null;
          this.selectedRight = null;
          this.isLocked = false;
        }, 500);
      }, 200);
    }
  },

  // Cập nhật số điểm lên màn hình
  updateStatsUI() {
    const scoreEl = document.getElementById("game-score");
    if (scoreEl) scoreEl.textContent = this.score;
  },

  // Xử lý khi hoàn thành tất cả các cặp
  handleVictory() {
    clearInterval(this.timerInterval);

    // Lưu điểm vào LocalStorage
    const isNewRecord = Storage.saveGameRecord(this.currentTopic.id, this.score, this.secondsElapsed);

    const victoryBox = document.getElementById("game-victory-box");
    const victoryDesc = document.getElementById("game-victory-desc");

    if (victoryBox) {
      victoryBox.classList.add("is-show");
      if (victoryDesc) {
        victoryDesc.innerHTML = `
          Bạn đã hoàn thành xuất sắc <strong>${this.totalPairs}/${this.totalPairs}</strong> cụm từ!<br>
          Điểm số: <strong style="color:var(--success); font-size:18px;">${this.score} điểm</strong> trong <strong>${this.secondsElapsed} giây</strong>.
          ${isNewRecord ? "<br><span style='color:var(--primary); font-weight:700;'>🎉 Chúc mừng bạn đã phá Kỷ Lục Mới!</span>" : ""}
        `;
      }
    }
  },

  bindEvents() {
    const btnRestart = document.getElementById("btn-game-restart");
    if (btnRestart) {
      btnRestart.addEventListener("click", () => {
        if (this.currentTopic) {
          this.start(this.currentTopic);
        }
      });
    }

    const btnPlayAgain = document.getElementById("btn-victory-play-again");
    if (btnPlayAgain) {
      btnPlayAgain.addEventListener("click", () => {
        if (this.currentTopic) {
          this.start(this.currentTopic);
        }
      });
    }
  }
};

