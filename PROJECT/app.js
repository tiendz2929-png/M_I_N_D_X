// app.js — File điều phối chính (App Coordinator)

const App = {
  currentTopic: null,
  currentView: "tree", // 'tree' | 'game' | 'quiz'
  searchDebounceTimer: null,

  init() {
    this.initTopicSelector();
    this.initLmsCatalog();
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

  // ── Khởi tạo Danh sách bài học chuẩn DOL English Super LMS (Hình 1) ──
  initLmsCatalog() {
    const gridEl = document.getElementById("lms-lesson-grid");
    if (!gridEl || !VOCAB_DATA) return;

    gridEl.innerHTML = "";

    VOCAB_DATA.forEach((topic, idx) => {
      const isGrammar = topic.id.startsWith("topic_grammar_");
      const skillName = isGrammar ? "Grammar" : "Reading";
      const skillClass = isGrammar
        ? "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800"
        : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      const dotClass = isGrammar ? "bg-purple-500" : "bg-emerald-500";

      // Đếm số từ & collocations
      const wordCount = topic.roots.reduce(
        (sum, r) => sum + (r.words ? r.words.length : 0) + (r.collocations ? r.collocations.length : 0),
        0
      );

      const stats = Storage ? Storage.getTopicStats(topic) : { percent: 0, mastered: 0 };
      const isFinished = stats.percent === 100;

      const card = document.createElement("div");
      card.className = "lms-lesson-card group bg-white dark:bg-slate-800/90 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between";
      card.dataset.topicId = topic.id;
      card.dataset.skill = isGrammar ? "grammar" : "reading";
      card.dataset.status = isFinished ? "completed" : "learning";
      card.dataset.search = `${topic.name} ${topic.description || ""} ${skillName}`.toLowerCase();

      card.innerHTML = `
        <div>
          <!-- Tag Kỹ năng (như Super LMS) -->
          <div class="flex items-center justify-between mb-2">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${skillClass}">
              <span class="w-2 h-2 rounded-full ${dotClass}"></span>
              ${skillName}
            </span>
            <span class="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
              ${topic.roots.length} roots · ${wordCount} items
            </span>
          </div>

          <!-- Tiêu đề bài học -->
          <h3 class="text-sm md:text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors line-clamp-1 mb-1">
            ${isGrammar ? "Core Grammar" : "IELTS 5.0"} - ${skillName} - L${idx + 1} - ${topic.name}
          </h3>

        </div>

        <!-- Thanh trạng thái tiến độ bài học (Bottom Bar như hình 1) -->
        <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
          <span class="text-xs font-bold text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            ${wordCount}/${wordCount} từ
          </span>
          <span class="text-xs font-bold text-teal-700 dark:text-teal-400 group-hover:underline flex items-center gap-1">
            Vào học ➔
          </span>
        </div>
      `;

      card.addEventListener("click", () => {
        this.switchTopic(topic.id);
        const anchor = document.getElementById("workspace-anchor");
        if (anchor) anchor.scrollIntoView({ behavior: "smooth" });
      });

      gridEl.appendChild(card);
    });

    this.initLmsFilters();
  },

  // ── Bộ lọc & Tìm kiếm bài học LMS ──
  initLmsFilters() {
    const searchInput = document.getElementById("lms-search-input");
    const statusFilter = document.getElementById("lms-filter-status");
    const skillFilter = document.getElementById("lms-filter-skill");

    const applyFilters = () => {
      const q = (searchInput?.value || "").toLowerCase().trim();
      const status = statusFilter?.value || "all";
      const skill = skillFilter?.value || "all";

      document.querySelectorAll(".lms-lesson-card").forEach((card) => {
        const matchSearch = !q || card.dataset.search.includes(q);
        const matchStatus = status === "all" || card.dataset.status === status;
        const matchSkill = skill === "all" || card.dataset.skill === skill;

        if (matchSearch && matchStatus && matchSkill) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    };

    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (statusFilter) statusFilter.addEventListener("change", applyFilters);
    if (skillFilter) skillFilter.addEventListener("change", applyFilters);
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
        const iconHtml = topic.iconUrl
          ? `<img src="${topic.iconUrl}" class="w-6 h-6 object-contain flex-shrink-0" alt="${topic.name}"/>`
          : `<span class="text-xl">${topic.icon}</span>`;
        card.innerHTML = `
          ${iconHtml}
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
        option.textContent = `${topic.name}`;
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

    // Cập nhật tiêu đề với Icons8 icon
    const topicTitleEl = document.getElementById("current-topic-title");
    if (topicTitleEl) {
      const iconHtml = found.iconUrl
        ? `<img src="${found.iconUrl}" class="w-7 h-7 object-contain inline-block flex-shrink-0" alt="${found.name}"/>`
        : `<span>${found.icon}</span>`;
      topicTitleEl.innerHTML = `${iconHtml}<span>${found.name}</span>`;
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

    // Cập nhật thẻ bài học LMS active
    document.querySelectorAll(".lms-lesson-card").forEach((card) => {
      if (card.dataset.topicId === topicId) {
        card.classList.add("ring-2", "ring-teal-600", "border-teal-600", "bg-teal-50/40", "dark:bg-teal-950/30");
      } else {
        card.classList.remove("ring-2", "ring-teal-600", "border-teal-600", "bg-teal-50/40", "dark:bg-teal-950/30");
      }
    });

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

    // Gắn sự kiện tab: Game và Quiz chuyển sang trang HTML riêng biệt
    if (tabs.tree) tabs.tree.addEventListener("click", () => switchView("tree"));
    if (tabs.game) {
      tabs.game.addEventListener("click", (e) => {
        e.preventDefault();
        const tid = this.currentTopic ? this.currentTopic.id : "topic_work";
        window.location.href = `game.html?topic=${tid}`;
      });
    }
    if (tabs.quiz) {
      tabs.quiz.addEventListener("click", (e) => {
        e.preventDefault();
        const tid = this.currentTopic ? this.currentTopic.id : "topic_work";
        window.location.href = `quiz.html?topic=${tid}`;
      });
    }

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
