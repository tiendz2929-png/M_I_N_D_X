// Quản lý lưu trữ trạng thái vào LocalStorage của trình duyệt

const Storage = {
  KEYS: {
    PROGRESS: "linear_vocab_progress",
    THEME: "linear_vocab_theme",
    GAME_SCORE: "linear_vocab_high_scores"
  },

  // Lấy toàn bộ bản đồ tiến độ: { [wordId]: 'mastered' | 'review' }
  getProgress() {
    try {
      const data = localStorage.getItem(this.KEYS.PROGRESS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error("Lỗi khi đọc LocalStorage progress:", e);
      return {};
    }
  },

  // Lấy trạng thái của một từ cụ thể
  getWordStatus(wordId) {
    const progress = this.getProgress();
    return progress[wordId] || "unlearned"; // 'mastered' | 'review' | 'unlearned'
  },

  // Cập nhật trạng thái một từ: 'mastered', 'review', hoặc null (bỏ chọn)
  setWordStatus(wordId, status) {
    const progress = this.getProgress();
    if (!status || status === "unlearned") {
      delete progress[wordId];
    } else {
      progress[wordId] = status;
    }
    try {
      localStorage.setItem(this.KEYS.PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.error("Lỗi khi lưu LocalStorage progress:", e);
    }
    return progress;
  },

  // Thống kê tiến độ của một chủ đề
  getTopicStats(topic) {
    if (!topic || !topic.roots) {
      return { total: 0, mastered: 0, review: 0, percent: 0 };
    }

    const progress = this.getProgress();
    let total = 0;
    let mastered = 0;
    let review = 0;

    topic.roots.forEach((root) => {
      // Đếm từ gốc
      total += 1;
      const rootStatus = progress[root.id];
      if (rootStatus === "mastered") mastered += 1;
      else if (rootStatus === "review") review += 1;

      // Đếm các từ trong họ từ
      if (root.family && Array.isArray(root.family)) {
        root.family.forEach((fWord) => {
          total += 1;
          const fStatus = progress[fWord.id];
          if (fStatus === "mastered") mastered += 1;
          else if (fStatus === "review") review += 1;
        });
      }
    });

    const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;
    return { total, mastered, review, percent };
  },

  // Quản lý Theme (Sáng/Tối)
  getTheme() {
    return localStorage.getItem(this.KEYS.THEME) || "light";
  },

  setTheme(theme) {
    localStorage.setItem(this.KEYS.THEME, theme);
  },

  // Lưu điểm cao Mini-game
  saveGameRecord(topicId, score, timeSeconds) {
    try {
      const records = JSON.parse(localStorage.getItem(this.KEYS.GAME_SCORE) || "{}");
      const current = records[topicId];
      if (!current || score > current.score || (score === current.score && timeSeconds < current.timeSeconds)) {
        records[topicId] = { score, timeSeconds, date: new Date().toLocaleDateString("vi-VN") };
        localStorage.setItem(this.KEYS.GAME_SCORE, JSON.stringify(records));
        return true; // Kỷ lục mới
      }
    } catch (e) {
      console.error("Lỗi khi lưu điểm game:", e);
    }
    return false;
  },

  getGameRecord(topicId) {
    try {
      const records = JSON.parse(localStorage.getItem(this.KEYS.GAME_SCORE) || "{}");
      return records[topicId] || null;
    } catch (e) {
      return null;
    }
  }
};

