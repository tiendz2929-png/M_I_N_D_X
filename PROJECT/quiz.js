// Quiz Game: Trắc nghiệm điền từ theo ngữ cảnh (Fill-in-the-blank Quiz)
// Người học đọc câu có chỗ trống và chọn đúng từ trong 4 đáp án

const Quiz = {
  currentTopic: null,
  questions: [],
  currentIndex: 0,
  score: 0,
  correctCount: 0,
  totalQuestions: 0,
  timerInterval: null,
  secondsLeft: 15,
  selectedAnswer: null,
  answered: false,

  init() {
    this.bindEvents();
  },

  // Khởi động quiz theo chủ đề
  start(topic) {
    if (!topic) return;
    this.currentTopic = topic;
    this.questions = this.buildQuestions(topic);
    this.currentIndex = 0;
    this.score = 0;
    this.correctCount = 0;
    this.totalQuestions = this.questions.length;

    const resultScreen = document.getElementById("quiz-result-screen");
    const playScreen = document.getElementById("quiz-play-screen");
    if (resultScreen) {
      resultScreen.style.display = "none";
      resultScreen.classList.remove("show");
    }
    if (playScreen) playScreen.style.display = "block";

    if (this.questions.length === 0) {
      if (playScreen) playScreen.innerHTML = `<p class="text-center text-gray-400 py-10">Chủ đề này chưa có câu hỏi.</p>`;
      return;
    }

    this.updateProgressBar();
    this.showQuestion();
  },

  // Tạo danh sách câu hỏi từ collocations và word family
  buildQuestions(topic) {
    const pool = [];

    topic.roots.forEach((root) => {
      // Câu hỏi từ collocations (điền từ thiếu vào cụm)
      if (root.collocations) {
        root.collocations.forEach((col) => {
          // Tạo câu hỏi với từ quan trọng bị ẩn
          const hiddenWord = col.matchWord;
          const questionText = col.phrase.replace(new RegExp(`\\b${hiddenWord}\\b`, "i"), "______");

          // Tạo 3 đáp án nhiễu từ các collocations khác
          const distractors = this.getDistractors(topic, col.id, hiddenWord, 3);

          pool.push({
            id: col.id,
            type: "collocation",
            sentence: `"${col.example}"`,
            question: `Điền vào chỗ trống để hoàn thành cụm từ: <span class="font-bold text-blue-500 dark:text-blue-400">${questionText}</span>`,
            hint: `Nghĩa cụm từ: <em>${col.meaning}</em>`,
            correctAnswer: hiddenWord,
            options: this.shuffle([hiddenWord, ...distractors])
          });
        });
      }

      // Câu hỏi từ word family (chọn đúng loại từ)
      if (root.family) {
        root.family.forEach((fw) => {
          const distractors = this.getFamilyDistractors(topic, fw.id, fw.word, 3);
          if (distractors.length >= 3) {
            const exampleBlank = fw.example.replace(new RegExp(`\\b${fw.word}\\b`, "i"), "______");
            pool.push({
              id: fw.id,
              type: "wordfamily",
              sentence: `Điền đúng dạng từ vào câu:`,
              question: `<span class="italic text-gray-700 dark:text-gray-300">"${exampleBlank}"</span>`,
              hint: `Gợi ý: Từ gốc là <strong>${root.word}</strong> (${fw.posLabel})`,
              correctAnswer: fw.word,
              options: this.shuffle([fw.word, ...distractors])
            });
          }
        });
      }
    });

    // Giới hạn 10 câu, xáo trộn
    return this.shuffle(pool).slice(0, 10);
  },

  // Lấy 3 đáp án nhiễu từ matchWord của các collocation khác
  getDistractors(topic, excludeId, correctWord, count) {
    const pool = [];
    topic.roots.forEach((root) => {
      if (root.collocations) {
        root.collocations.forEach((col) => {
          if (col.id !== excludeId && col.matchWord !== correctWord) {
            pool.push(col.matchWord);
          }
        });
      }
    });

    // Thêm nhiễu từ toàn bộ VOCAB_DATA nếu không đủ
    if (pool.length < count) {
      VOCAB_DATA.forEach((t) => {
        t.roots.forEach((root) => {
          if (root.collocations) {
            root.collocations.forEach((col) => {
              if (col.matchWord !== correctWord && !pool.includes(col.matchWord)) {
                pool.push(col.matchWord);
              }
            });
          }
        });
      });
    }

    return this.shuffle(pool).slice(0, count);
  },

  // Lấy đáp án nhiễu từ word family
  getFamilyDistractors(topic, excludeId, correctWord, count) {
    const pool = [];
    VOCAB_DATA.forEach((t) => {
      t.roots.forEach((root) => {
        if (root.family) {
          root.family.forEach((fw) => {
            if (fw.id !== excludeId && fw.word !== correctWord) {
              pool.push(fw.word);
            }
          });
        }
      });
    });
    return this.shuffle(pool).slice(0, count);
  },

  // Hiển thị câu hỏi hiện tại
  showQuestion() {
    this.answered = false;
    this.selectedAnswer = null;
    clearInterval(this.timerInterval);
    this.secondsLeft = 15;

    const q = this.questions[this.currentIndex];
    if (!q) return;

    // Cập nhật số câu
    const qNum = document.getElementById("quiz-question-num");
    if (qNum) qNum.textContent = `Câu ${this.currentIndex + 1} / ${this.totalQuestions}`;

    // Cập nhật câu hỏi
    const qSentence = document.getElementById("quiz-sentence");
    const qQuestion = document.getElementById("quiz-question");
    const qHint = document.getElementById("quiz-hint");
    if (qSentence) qSentence.innerHTML = q.sentence;
    if (qQuestion) qQuestion.innerHTML = q.question;
    if (qHint) qHint.innerHTML = q.hint;

    // Render các nút đáp án
    const optionsWrap = document.getElementById("quiz-options");
    if (optionsWrap) {
      optionsWrap.innerHTML = "";
      q.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option-btn";
        btn.setAttribute("data-answer", opt);
        btn.innerHTML = `<span class="quiz-opt-label">${["A", "B", "C", "D"][idx]}</span> ${opt}`;
        btn.addEventListener("click", () => this.selectAnswer(opt, btn));
        optionsWrap.appendChild(btn);
      });
    }

    // Reset feedback
    const feedback = document.getElementById("quiz-feedback");
    if (feedback) {
      feedback.style.display = "none";
      feedback.className = "quiz-feedback";
    }

    // Bắt đầu đếm ngược
    this.startCountdown();
  },

  // Đếm ngược thời gian 15 giây
  startCountdown() {
    const timerEl = document.getElementById("quiz-timer-count");
    const timerBar = document.getElementById("quiz-timer-bar");

    if (timerEl) timerEl.textContent = this.secondsLeft;
    if (timerBar) timerBar.style.width = "100%";

    this.timerInterval = setInterval(() => {
      this.secondsLeft -= 1;
      if (timerEl) timerEl.textContent = this.secondsLeft;
      if (timerBar) timerBar.style.width = `${(this.secondsLeft / 15) * 100}%`;

      // Chuyển màu khi còn 5 giây
      if (timerEl) {
        timerEl.className = this.secondsLeft <= 5 ? "text-red-500 font-bold text-lg" : "text-blue-500 font-bold text-lg";
      }
      if (timerBar) {
        timerBar.className = this.secondsLeft <= 5
          ? "quiz-timer-bar bg-red-500 transition-all duration-1000"
          : "quiz-timer-bar bg-blue-500 transition-all duration-1000";
      }

      if (this.secondsLeft <= 0) {
        clearInterval(this.timerInterval);
        this.timeOut();
      }
    }, 1000);
  },

  // Hết giờ, tự động chuyển câu
  timeOut() {
    if (this.answered) return;
    this.answered = true;
    this.showFeedback(false, this.questions[this.currentIndex].correctAnswer);

    // Hiện đáp án đúng
    const allBtns = document.querySelectorAll(".quiz-option-btn");
    allBtns.forEach((btn) => {
      btn.disabled = true;
      if (btn.getAttribute("data-answer") === this.questions[this.currentIndex].correctAnswer) {
        btn.classList.add("quiz-opt-correct");
      }
    });

    setTimeout(() => this.nextQuestion(), 2000);
  },

  // Người dùng chọn đáp án
  selectAnswer(answer, btnEl) {
    if (this.answered) return;
    this.answered = true;
    this.selectedAnswer = answer;
    clearInterval(this.timerInterval);

    const q = this.questions[this.currentIndex];
    const isCorrect = answer === q.correctAnswer;

    if (isCorrect) {
      this.correctCount += 1;
      // Điểm thưởng theo thời gian còn lại
      const timeBonus = Math.max(0, this.secondsLeft);
      this.score += 10 + timeBonus;
      btnEl.classList.add("quiz-opt-correct");
    } else {
      this.score = Math.max(0, this.score - 2);
      btnEl.classList.add("quiz-opt-wrong");
      // Hiện đúng
      const allBtns = document.querySelectorAll(".quiz-option-btn");
      allBtns.forEach((btn) => {
        if (btn.getAttribute("data-answer") === q.correctAnswer) {
          btn.classList.add("quiz-opt-correct");
        }
      });
    }

    // Vô hiệu hóa tất cả nút
    document.querySelectorAll(".quiz-option-btn").forEach((btn) => {
      btn.disabled = true;
    });

    this.showFeedback(isCorrect, q.correctAnswer);
    this.updateProgressBar();

    setTimeout(() => this.nextQuestion(), 1600);
  },

  // Hiện kết quả đúng/sai
  showFeedback(isCorrect, correctAnswer) {
    const feedback = document.getElementById("quiz-feedback");
    if (!feedback) return;

    feedback.style.display = "flex";
    if (isCorrect) {
      feedback.className = "quiz-feedback quiz-feedback-correct";
      feedback.innerHTML = `<span>✅</span> <span>Chính xác! +${10 + this.secondsLeft} điểm</span>`;
    } else {
      feedback.className = "quiz-feedback quiz-feedback-wrong";
      feedback.innerHTML = `<span>❌</span> <span>Đáp án đúng là: <strong>"${correctAnswer}"</strong></span>`;
    }
  },

  // Chuyển sang câu tiếp theo
  nextQuestion() {
    this.currentIndex += 1;
    if (this.currentIndex >= this.totalQuestions) {
      this.showResult();
    } else {
      this.updateProgressBar();
      this.showQuestion();
    }
  },

  // Cập nhật thanh tiến độ câu hỏi
  updateProgressBar() {
    const bar = document.getElementById("quiz-progress-bar");
    const scoreEl = document.getElementById("quiz-current-score");
    if (bar) bar.style.width = `${(this.currentIndex / this.totalQuestions) * 100}%`;
    if (scoreEl) scoreEl.textContent = this.score;
  },

  // Màn hình kết quả theo các mốc điểm quy định
  showResult() {
    clearInterval(this.timerInterval);

    // Tính điểm theo thang điểm 10
    const score10 = this.totalQuestions > 0 ? (this.correctCount / this.totalQuestions) * 10 : 0;
    const evaluation = Celebration.getScoreEvaluation(score10);

    // Lưu điểm vào LocalStorage
    const isNewRecord = Storage.saveGameRecord("quiz_" + this.currentTopic.id, this.score, 0);

    const playScreen = document.getElementById("quiz-play-screen");
    const resultScreen = document.getElementById("quiz-result-screen");
    if (playScreen) playScreen.style.display = "none";

    if (resultScreen) {
      resultScreen.classList.add("show");

      const resultScore = document.getElementById("quiz-result-score");
      const resultGrade = document.getElementById("quiz-result-grade");
      const resultDesc = document.getElementById("quiz-result-desc");

      if (resultScore) {
        resultScore.innerHTML = `
          <div class="text-5xl font-black ${evaluation.textColor} mb-2">${evaluation.score} <span class="text-2xl text-slate-400 font-bold">/ 10</span></div>
          <div class="text-sm text-slate-500 font-semibold">(Đúng ${this.correctCount}/${this.totalQuestions} câu · ${this.score} điểm tổng)</div>
        `;
      }

      if (resultGrade) {
        resultGrade.innerHTML = `
          <div class="text-4xl mb-2">${evaluation.emotion}</div>
          <div class="text-2xl font-black ${evaluation.textColor} uppercase tracking-wide">${evaluation.title}</div>
        `;
      }

      if (resultDesc) {
        resultDesc.innerHTML = `
          <div class="p-4 rounded-xl border ${evaluation.borderColor} ${evaluation.bgLight} text-sm leading-relaxed mb-3">
            ${evaluation.message}
          </div>
          ${isNewRecord ? `<div class="text-blue-500 font-bold text-sm">🎉 Bạn đã thiết lập Kỷ Lục Mới cho chủ đề này!</div>` : ""}
        `;
      }

      // Kích hoạt hiệu ứng ăn mừng
      Celebration.trigger();
    }
  },

  // Thuật toán xáo trộn Fisher-Yates
  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  bindEvents() {
    const btnRestart = document.getElementById("btn-quiz-restart");
    if (btnRestart) {
      btnRestart.addEventListener("click", () => {
        if (this.currentTopic) this.start(this.currentTopic);
      });
    }

    const btnResultRestart = document.getElementById("btn-quiz-result-restart");
    if (btnResultRestart) {
      btnResultRestart.addEventListener("click", () => {
        if (this.currentTopic) this.start(this.currentTopic);
      });
    }
  }
};
