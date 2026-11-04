// Quản lý Modal & Thẻ Flashcard 3D

const Flashcard = {
  currentWord: null,
  modalEl: null,
  cardWrapper: null,

  init() {
    this.modalEl = document.getElementById("flashcard-modal");
    this.cardWrapper = document.getElementById("flip-card-wrapper");
    this.bindEvents();
  },

  // Mở thẻ Flashcard với dữ liệu của từ
  open(wordData) {
    if (!this.modalEl || !wordData) return;
    this.currentWord = wordData;

    // Reset về mặt trước
    if (this.cardWrapper) {
      this.cardWrapper.classList.remove("flipped");
    }

    // Điền dữ liệu mặt trước
    const frontWord = document.getElementById("fc-front-word");
    const frontPhonetic = document.getElementById("fc-front-phonetic");
    const frontPos = document.getElementById("fc-front-pos");

    if (frontWord) frontWord.textContent = wordData.word;
    if (frontPhonetic) frontPhonetic.textContent = wordData.phonetic || "";
    if (frontPos) {
      frontPos.textContent = wordData.posLabel || wordData.pos || "Word";
      frontPos.className = `badge-pos ${wordData.pos || "v"}`;
    }

    // Điền dữ liệu mặt sau
    const backMeaning = document.getElementById("fc-back-meaning");
    const backExEn = document.getElementById("fc-back-example-en");
    const backExVi = document.getElementById("fc-back-example-vi");

    if (backMeaning) backMeaning.textContent = wordData.meaning || "";
    if (backExEn) backExEn.textContent = `"${wordData.example || "N/A"}"`;
    if (backExVi) backExVi.textContent = wordData.exampleVi ? `→ ${wordData.exampleVi}` : "";

    // Cập nhật trạng thái nút bấm Đã thuộc / Cần ôn
    this.updateStatusButtons();

    // Mở modal
    this.modalEl.classList.add("is-open");
  },

  close() {
    if (this.modalEl) {
      this.modalEl.classList.remove("is-open");
    }
  },

  // Cập nhật giao diện 2 nút đánh dấu
  updateStatusButtons() {
    if (!this.currentWord) return;
    const currentStatus = Storage.getWordStatus(this.currentWord.id);

    const btnMaster = document.getElementById("fc-btn-master");
    const btnReview = document.getElementById("fc-btn-review");

    if (btnMaster) {
      btnMaster.classList.toggle("is-active", currentStatus === "mastered");
    }
    if (btnReview) {
      btnReview.classList.toggle("is-active", currentStatus === "review");
    }
  },

  // Xử lý khi bấm nút đổi trạng thái
  handleStatusChange(newStatus) {
    if (!this.currentWord) return;
    const currentStatus = Storage.getWordStatus(this.currentWord.id);
    const finalStatus = currentStatus === newStatus ? "unlearned" : newStatus;

    // Lưu vào LocalStorage
    Storage.setWordStatus(this.currentWord.id, finalStatus);

    // Cập nhật UI nút trên Flashcard
    this.updateStatusButtons();

    // Cập nhật UI Node trên Sơ đồ cây
    if (typeof Tree !== "undefined" && Tree.updateWordStatusUI) {
      Tree.updateWordStatusUI(this.currentWord.id, finalStatus);
    }

    // Cập nhật thanh tiến độ chung của ứng dụng
    if (typeof App !== "undefined" && App.updateStatsBar) {
      App.updateStatsBar();
    }
  },

  bindEvents() {
    // 1. Lật thẻ 3D khi click
    if (this.cardWrapper) {
      this.cardWrapper.addEventListener("click", () => {
        this.cardWrapper.classList.toggle("flipped");
      });
    }

    // 2. Phát âm từ khi bấm loa lớn trên thẻ
    const btnSpeak = document.getElementById("fc-btn-speak");
    if (btnSpeak) {
      btnSpeak.addEventListener("click", (e) => {
        e.stopPropagation(); // Không làm lật thẻ
        if (this.currentWord) {
          Speech.speak(this.currentWord.word);
        }
      });
    }

    // 3. Đánh dấu Đã thuộc
    const btnMaster = document.getElementById("fc-btn-master");
    if (btnMaster) {
      btnMaster.addEventListener("click", () => this.handleStatusChange("mastered"));
    }

    // 4. Đánh dấu Cần ôn
    const btnReview = document.getElementById("fc-btn-review");
    if (btnReview) {
      btnReview.addEventListener("click", () => this.handleStatusChange("review"));
    }

    // 5. Nút đóng modal
    const btnClose = document.getElementById("fc-btn-close");
    if (btnClose) {
      btnClose.addEventListener("click", () => this.close());
    }

    // 6. Click ra ngoài backdrop để đóng modal
    if (this.modalEl) {
      this.modalEl.addEventListener("click", (e) => {
        if (e.target === this.modalEl) {
          this.close();
        }
      });
    }

    // 7. Nhấn phím Escape để đóng modal
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modalEl && this.modalEl.classList.contains("is-open")) {
        this.close();
      }
    });
  }
};

