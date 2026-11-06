// app.js — File điều phối chính (App Coordinator)

const App = {
  currentTopic: null,
  currentView: "tree", // 'tree' | 'game' | 'quiz'
  searchDebounceTimer: null,

  init() {
    this.initTopicSelector();
    this.initTabs();
    this.initSearch();

    // Khởi tạo các module con
    Tree.init("tree-container");
    Flashcard.init();
    Game.init();
    Quiz.init();
    Auth.init();

    // Nạp chủ đề đầu tiên
    if (VOCAB_DATA && VOCAB_DATA.length > 0) {
      this.switchTopic(VOCAB_DATA[0].id);
    }
  },

  // ── Hiển thị danh sách chủ đề ở sidebar + select mobile ──
  initTopicSelector() {
    // Sidebar topic list (desktop)
    const listEl = document.getElementById("topic-list");
    // Mobile select
    const selectEl = document.getElementById("topic-select");

    if (selectEl) selectEl.innerHTML = "";

    VOCAB_DATA.forEach((topic) => {
      // ─ Sidebar card ─
      if (listEl) {
        const card = document.createElement("button");
        card.id = `topic-card-${topic.id}`;
        card.className = "topic-card w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent text-sm font-semibold transition-all";
        card.style.color = "#3A4F5C";
        card.innerHTML = `
          <span class="text-xl">${topic.icon}</span>
          <div class="flex-1 min-w-0">
            <div class="font-bold text-sm truncate" style="color:#0C1820;">${topic.name}</div>
            <div class="text-xs truncate" style="color:#8E9EAA;">${topic.description || ""}</div>
          </div>
        `;
        card.addEventListener("click", () => this.switchTopic(topic.id));
        listEl.appendChild(card);
      }

      // ─ Mobile select option ─
      if (selectEl) {
        const option = document.createElement("option");
        option.value = topic.id;
        option.textContent = `${topic.icon} ${topic.name}`;
        selectEl.appendChild(option);
      }
    });

    if (selectEl) {
      selectEl.addEventListener("change", (e) => this.switchTopic(e.target.value));
    }
  },

  // ── Chuyển chủ đề ──
  switchTopic(topicId) {
    const found = VOCAB_DATA.find((t) => t.id === topicId);
    if (!found) return;
    this.currentTopic = found;

    // Cập nhật tiêu đề
    const topicTitleEl = document.getElementById("current-topic-title");
    if (topicTitleEl) {
      topicTitleEl.innerHTML = `<span>${found.icon}</span><span>${found.name}</span>`;
    }

    // Cập nhật sidebar active state
    document.querySelectorAll(".topic-card").forEach((card) => {
      card.classList.remove("active");
      card.style.background = "";
    });
    const activeCard = document.getElementById(`topic-card-${topicId}`);
    if (activeCard) {
      activeCard.classList.add("active");
    }

    // Cập nhật mobile select
    const selectEl = document.getElementById("topic-select");
    if (selectEl) selectEl.value = topicId;

    // Render theo view hiện tại
    this.renderCurrentView();

    // Cập nhật thanh tiến độ
    this.updateStatsBar();

    // Reset search
    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = "";
  },

  // ── Render view hiện tại ──
  renderCurrentView() {
    if (!this.currentTopic) return;
    if (this.currentView === "tree") {
      Tree.render(this.currentTopic);
    } else if (this.currentView === "game") {
      Game.start(this.currentTopic);
    } else if (this.currentView === "quiz") {
      Quiz.start(this.currentTopic);
    }
  },

  // ── Khởi tạo Tabs điều hướng ──
  initTabs() {
    const tabs = {
      tree: document.getElementById("tab-tree"),
      game: document.getElementById("tab-game"),
      quiz: document.getElementById("tab-quiz"),
    };
    const views = {
      tree: document.getElementById("tree-container"),
      game: document.getElementById("game-container"),
      quiz: document.getElementById("quiz-container"),
    };

    const switchView = (view) => {
      this.currentView = view;

      // Reset tất cả tabs
      Object.entries(tabs).forEach(([key, btn]) => {
        if (!btn) return;
        if (key === view) {
          btn.classList.add("active");
          btn.style.background = "#006D77";
          btn.style.color = "#fff";
        } else {
          btn.classList.remove("active");
          btn.style.background = "";
          btn.style.color = "#5F7280";
        }
      });

      // Reset tất cả views
      Object.entries(views).forEach(([key, el]) => {
        if (!el) return;
        if (key === "tree") {
          el.style.display = key === view ? "flex" : "none";
          el.style.flexDirection = "column";
        } else {
          if (key === view) {
            el.classList.add("show");
          } else {
            el.classList.remove("show");
          }
        }
      });

      // Render nội dung
      if (this.currentTopic) {
        this.renderCurrentView();
      }
    };

    // Gắn sự kiện
    if (tabs.tree) tabs.tree.addEventListener("click", () => switchView("tree"));
    if (tabs.game) tabs.game.addEventListener("click", () => switchView("game"));
    if (tabs.quiz) tabs.quiz.addEventListener("click", () => switchView("quiz"));

    // Mặc định: tree
    switchView("tree");
  },

  // ── Tìm kiếm tức thời (Debounce 250ms) ──
  initSearch() {
    const searchInput = document.getElementById("search-input");
    if (!searchInput) return;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(this.searchDebounceTimer);
      const query = e.target.value;
      this.searchDebounceTimer = setTimeout(() => {
        if (this.currentView === "tree") Tree.filter(query);
      }, 250);
    });
  },

  // ── Cập nhật thanh tiến độ Sidebar & Ăn mừng hoàn thành 100% ──
  updateStatsBar() {
    if (!this.currentTopic) return;
    const stats = Storage.getTopicStats(this.currentTopic);

    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");
    const statMastered = document.getElementById("stat-count-mastered");
    const statReview = document.getElementById("stat-count-review");

    if (progressFill) progressFill.style.width = `${stats.percent}%`;
    if (progressText) progressText.textContent = `${stats.percent}%`;
    if (statMastered) statMastered.textContent = `✓ ${stats.mastered} đã thuộc`;
    if (statReview) statReview.textContent = `★ ${stats.review} cần ôn`;

    // Hiệu ứng ăn mừng khi hoàn thành 100% từ vựng của 1 chủ đề
    if (stats.percent === 100 && stats.total > 0) {
      const topicCelebratedKey = "celebrated_topic_" + this.currentTopic.id;
      if (!sessionStorage.getItem(topicCelebratedKey)) {
        sessionStorage.setItem(topicCelebratedKey, "true");
        Celebration.showToast(
          "🎉 XUẤT SẮC! HOÀN THÀNH 100% TỪ VỰNG!",
          `Bạn đã học thuộc toàn bộ ${stats.total} từ vựng trong chủ đề "${this.currentTopic.name}"! Bạn đúng là một học bá! 👑`,
          "🏆"
        );
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
