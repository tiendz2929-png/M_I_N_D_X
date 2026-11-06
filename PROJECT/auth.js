// auth.js — Quản lý đăng nhập, đăng ký, chào mừng học viên & form feedback (Không cần server)

const Auth = {
  selectedRating: 5,

  init() {
    this.renderUserGreeting();
    this.renderDynamicFeedbacks();
    this.bindEvents();
  },

  // ── 1. Cập nhật giao diện Header (Chào mừng học viên / Nút Đăng nhập) ──
  renderUserGreeting() {
    const userWrap = document.getElementById("header-user-wrap");
    if (!userWrap) return;

    const user = Storage.getCurrentUser();

    if (user) {
      userWrap.innerHTML = `
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs font-semibold text-teal-800 dark:text-teal-300">
            <span class="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
              ${user.name.charAt(0)}
            </span>
            <span>Chào mừng, <strong class="font-bold">${user.name}</strong> 👋</span>
          </div>
          <button id="btn-open-feedback" class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors" title="Gửi ý kiến đóng góp">
            ⭐ Góp ý
          </button>
          <button id="btn-logout" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="Đăng xuất">
            Đăng xuất
          </button>
        </div>
      `;

      // Gắn sự kiện đăng xuất
      const btnLogout = document.getElementById("btn-logout");
      if (btnLogout) {
        btnLogout.addEventListener("click", () => {
          Storage.logoutUser();
          this.renderUserGreeting();
          Celebration.showToast("Đã đăng xuất", "PÁI PAI", "👋");
        });
      }
    } else {
      userWrap.innerHTML = `
        <div class="flex items-center gap-2">
          <button id="btn-open-feedback" class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors" title="Gửi ý kiến đóng góp">
            ⭐ Góp ý
          </button>
          <button id="btn-open-auth" class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 transition-all shadow-sm">
            <span>👤</span> Đăng nhập / Đăng ký
          </button>
        </div>
      `;

      // Gắn sự kiện mở modal đăng nhập
      const btnOpenAuth = document.getElementById("btn-open-auth");
      if (btnOpenAuth) {
        btnOpenAuth.addEventListener("click", () => this.openAuthModal("login"));
      }
    }

    // Gắn sự kiện mở modal feedback cho nút mới tạo
    const btnFeedback = document.getElementById("btn-open-feedback");
    if (btnFeedback) {
      btnFeedback.addEventListener("click", () => this.openFeedbackModal());
    }
  },

  // ── 2. Modal Đăng Nhập / Đăng Ký ──
  openAuthModal(defaultTab = "login") {
    const modal = document.getElementById("auth-modal");
    if (!modal) return;
    this.switchAuthTab(defaultTab);
    modal.classList.add("is-open");
  },

  closeAuthModal() {
    const modal = document.getElementById("auth-modal");
    if (modal) modal.classList.remove("is-open");
  },

  switchAuthTab(tab) {
    const tabLogin = document.getElementById("auth-tab-login");
    const tabRegister = document.getElementById("auth-tab-register");
    const formLogin = document.getElementById("auth-form-login");
    const formRegister = document.getElementById("auth-form-register");
    const errorEl = document.getElementById("auth-error-msg");

    if (errorEl) errorEl.textContent = "";

    if (tab === "login") {
      tabLogin && tabLogin.classList.add("active");
      tabRegister && tabRegister.classList.remove("active");
      if (formLogin) formLogin.style.display = "block";
      if (formRegister) formRegister.style.display = "none";
    } else {
      tabRegister && tabRegister.classList.add("active");
      tabLogin && tabLogin.classList.remove("active");
      if (formRegister) formRegister.style.display = "block";
      if (formLogin) formLogin.style.display = "none";
    }
  },

  handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-password").value;
    const errorEl = document.getElementById("auth-error-msg");

    if (!email || !pass) {
      if (errorEl) errorEl.textContent = "Vui lòng nhập đầy đủ email và mật khẩu!";
      return;
    }

    const res = Storage.loginUser(email, pass);
    if (res.success) {
      this.closeAuthModal();
      this.renderUserGreeting();
      Celebration.showToast(`Chào mừng học viên ${res.user.name} đã quay trở lại học tập!`, "🎉");
    } else {
      if (errorEl) errorEl.textContent = res.message;
    }
  },

  handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const pass = document.getElementById("reg-password").value;
    const errorEl = document.getElementById("auth-error-msg");

    if (!name || !email || !pass) {
      if (errorEl) errorEl.textContent = "Vui lòng điền đủ tất cả các trường!";
      return;
    }
    if (pass.length < 4) {
      if (errorEl) errorEl.textContent = "Mật khẩu nên có ít nhất 4 ký tự!";
      return;
    }

    const res = Storage.registerUser(name, email, pass);
    if (res.success) {
      this.closeAuthModal();
      this.renderUserGreeting();
      Celebration.showToast("Đăng ký thành công!", `Chào mừng học viên mới ${res.user.name} gia nhập MT-STUDY! Chúc bạn học tốt! 🚀`, "🎊");
    } else {
      if (errorEl) errorEl.textContent = res.message;
    }
  },

  // ── 3. Modal Form Feedback ──
  openFeedbackModal() {
    const modal = document.getElementById("feedback-modal");
    if (!modal) return;
    this.selectedRating = 5;
    this.updateStarsUI();

    const textarea = document.getElementById("feedback-content");
    if (textarea) textarea.value = "";
    const msgEl = document.getElementById("feedback-msg");
    if (msgEl) msgEl.textContent = "";

    modal.classList.add("is-open");
  },

  closeFeedbackModal() {
    const modal = document.getElementById("feedback-modal");
    if (modal) modal.classList.remove("is-open");
  },

  updateStarsUI() {
    const stars = document.querySelectorAll(".star-rating-item");
    stars.forEach((star, index) => {
      const rating = Number(star.getAttribute("data-star"));
      if (rating <= this.selectedRating) {
        star.classList.add("text-amber-400");
        star.classList.remove("text-slate-300");
      } else {
        star.classList.remove("text-amber-400");
        star.classList.add("text-slate-300");
      }
    });
  },

  handleFeedbackSubmit(e) {
    e.preventDefault();
    const category = document.getElementById("feedback-category").value;
    const content = document.getElementById("feedback-content").value;
    const msgEl = document.getElementById("feedback-msg");

    if (!content.trim()) {
      if (msgEl) {
        msgEl.textContent = "Vui lòng nhập nội dung ý kiến đóng góp của bạn!";
        msgEl.className = "text-xs text-red-500 font-bold mt-2";
      }
      return;
    }

    Storage.saveFeedback(this.selectedRating, category, content);
    this.closeFeedbackModal();
    this.renderDynamicFeedbacks();
    Celebration.showToast("Cảm ơn bạn đã gửi góp ý!", "Ý kiến quý báu của bạn đã được ghi nhận. MT-STUDY sẽ ngày càng hoàn thiện hơn! ❤️", "💌");
  },

  // ── 4. Hiển thị các feedback của học viên mới gửi lên web ──
  renderDynamicFeedbacks() {
    const container = document.getElementById("user-submitted-feedbacks");
    if (!container) return;

    const feedbacks = Storage.getFeedbacks();
    if (feedbacks.length === 0) {
      container.innerHTML = "";
      return;
    }

    // Hiển thị tối đa 3 feedback gần nhất do người dùng tạo
    const recent = feedbacks.slice(-3).reverse();
    container.innerHTML = recent.map((fb) => {
      const initials = fb.userName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "HV";
      const stars = "★".repeat(fb.rating || 5);
      return `
        <div class="bg-white dark:bg-slate-800 border-2 border-teal-500/30 dark:border-teal-600/40 rounded-[28px] p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-4">
              <div class="text-[#F5A623] text-sm tracking-wider select-none">${stars}</div>
              <span class="text-[11px] font-bold px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60">${fb.category}</span>
            </div>
            <p class="italic text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8 font-normal">
              "${fb.content}"
            </p>
          </div>
          <div class="flex items-center gap-3.5 pt-4 border-t border-slate-100 dark:border-slate-700/60">
            <div class="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs uppercase flex-shrink-0 shadow-sm">
              ${initials}
            </div>
            <div>
              <div class="font-bold text-sm text-slate-900 dark:text-white leading-tight">${fb.userName}</div>
              <div class="text-xs text-slate-400 mt-0.5">Học viên MT-STUDY · ${fb.createdAt}</div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  },

  bindEvents() {
    // Tab switch
    const tabLogin = document.getElementById("auth-tab-login");
    const tabRegister = document.getElementById("auth-tab-register");
    if (tabLogin) tabLogin.addEventListener("click", () => this.switchAuthTab("login"));
    if (tabRegister) tabRegister.addEventListener("click", () => this.switchAuthTab("register"));

    // Forms
    const formLogin = document.getElementById("auth-form-login");
    if (formLogin) formLogin.addEventListener("submit", (e) => this.handleLogin(e));

    const formRegister = document.getElementById("auth-form-register");
    if (formRegister) formRegister.addEventListener("submit", (e) => this.handleRegister(e));

    // Close Auth modal
    const btnCloseAuth = document.getElementById("btn-close-auth");
    if (btnCloseAuth) btnCloseAuth.addEventListener("click", () => this.closeAuthModal());

    const authModal = document.getElementById("auth-modal");
    if (authModal) {
      authModal.addEventListener("click", (e) => {
        if (e.target === authModal) this.closeAuthModal();
      });
    }

    // Stars rating click
    const stars = document.querySelectorAll(".star-rating-item");
    stars.forEach((star) => {
      star.addEventListener("click", () => {
        this.selectedRating = Number(star.getAttribute("data-star"));
        this.updateStarsUI();
      });
    });

    // Feedback submit
    const formFeedback = document.getElementById("feedback-form");
    if (formFeedback) formFeedback.addEventListener("submit", (e) => this.handleFeedbackSubmit(e));

    // Close Feedback modal
    const btnCloseFeedback = document.getElementById("btn-close-feedback");
    if (btnCloseFeedback) btnCloseFeedback.addEventListener("click", () => this.closeFeedbackModal());

    const feedbackModal = document.getElementById("feedback-modal");
    if (feedbackModal) {
      feedbackModal.addEventListener("click", (e) => {
        if (e.target === feedbackModal) this.closeFeedbackModal();
      });
    }
  }
};

