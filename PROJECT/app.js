// File điều phối chính (App Coordinator)

const App = {
  currentTopic: null,
  currentView: "tree", // 'tree' hoặc 'game'
  searchDebounceTimer: null,

  init() {
    this.initTheme();
    this.initTopicSelector();
    this.initTabs();
    this.initSearch();

    // Khởi tạo các module con
    Tree.init("tree-container");
    Flashcard.init();
    Game.init();

    // Nạp chủ đề đầu tiên
    if (VOCAB_DATA && VOCAB_DATA.length > 0) {
      this.switchTopic(VOCAB_DATA[0].id);
    }
  },

  // 1. Quản lý Dark / Light mode
  initTheme() {
    const savedTheme = Storage.getTheme();
    document.documentElement.setAttribute("data-theme", savedTheme);

    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const themeIcon = document.getElementById("theme-icon");

    if (themeIcon) {
      themeIcon.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    }

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", newTheme);
        Storage.setTheme(newTheme);

        if (themeIcon) {
          themeIcon.textContent = newTheme === "dark" ? "☀️" : "🌙";
        }
      });
    }
  },

  // 2. Nạp danh sách chủ đề vào Dropdown
  initTopicSelector() {
    const selectEl = document.getElementById("topic-select");
    if (!selectEl) return;

    selectEl.innerHTML = "";
    VOCAB_DATA.forEach((topic) => {
      const option = document.createElement("option");
      option.value = topic.id;
      option.textContent = `${topic.icon} ${topic.name}`;
      selectEl.appendChild(option);
    });

    selectEl.addEventListener("change", (e) => {
      this.switchTopic(e.target.value);
    });
  },

  // Đổi chủ đề học
  switchTopic(topicId) {
    const found = VOCAB_DATA.find((t) => t.id === topicId);
    if (!found) return;

    this.currentTopic = found;

    // Cập nhật tên chủ đề trên thanh trạng thái
    const topicTitleEl = document.getElementById("current-topic-title");
    if (topicTitleEl) {
      topicTitleEl.innerHTML = `<span>${found.icon}</span> <span>${found.name}</span>`;
    }

    // Render lại giao diện theo chế độ xem hiện tại
    if (this.currentView === "tree") {
      Tree.render(this.currentTopic);
    } else {
      Game.start(this.currentTopic);
    }

    // Cập nhật thanh tiến độ %
    this.updateStatsBar();

    // Reset ô tìm kiếm
    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = "";
  },

  // 3. Quản lý chuyển đổi Tab (Sơ đồ tư duy / Mini-game)
  initTabs() {
    const tabTree = document.getElementById("tab-tree");
    const tabGame = document.getElementById("tab-game");
    const treeView = document.getElementById("tree-container");
    const gameView = document.getElementById("game-container");

    if (tabTree && tabGame) {
      tabTree.addEventListener("click", () => {
        this.currentView = "tree";
        tabTree.classList.add("active");
        tabGame.classList.remove("active");

        treeView.style.display = "flex";
        gameView.classList.remove("is-active");

        Tree.render(this.currentTopic);
      });

      tabGame.addEventListener("click", () => {
        this.currentView = "game";
        tabGame.classList.add("active");
        tabTree.classList.remove("active");

        treeView.style.display = "none";
        gameView.classList.add("is-active");

        Game.start(this.currentTopic);
      });
    }
  },

  // 4. Tìm kiếm tức thời có chống rung (Debounced Search)
  initSearch() {
    const searchInput = document.getElementById("search-input");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
      clearTimeout(this.searchDebounceTimer);
      const query = e.target.value;

      // Chờ 250ms sau khi người dùng ngừng gõ mới lọc
      this.searchDebounceTimer = setTimeout(() => {
        if (this.currentView === "tree") {
          Tree.filter(query);
        }
      }, 250);
    });
  },

  // 5. Cập nhật thanh thống kê tiến độ học của chủ đề
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
  }
};

// Khởi chạy khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

