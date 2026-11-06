// auth.js — Quản lý đăng nhập, đăng ký, chào mừng học viên & Bảng Quản trị Admin

const Auth = {
  selectedRating: 5,
  adminCurrentTab: "users", // 'users' | 'feedbacks'
  revealedPasswords: {}, // { [userId]: true | false }

  init() {
    this.renderUserGreeting();
    this.renderDynamicFeedbacks();
    this.bindEvents();
  },

  // ── 1. Cập nhật giao diện Header (Chào mừng học viên / Admin / Nút Đăng nhập) ──
  renderUserGreeting() {
    const userWrap = document.getElementById("header-user-wrap");
    if (!userWrap) return;

    const user = Storage.getCurrentUser();

    if (user) {
      const isAdmin = Storage.isAdmin(user);

      userWrap.innerHTML = `
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-full ${
            isAdmin
              ? "bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200"
              : "bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300"
          } text-xs font-semibold">
            <span class="w-6 h-6 rounded-full ${
              isAdmin ? "bg-amber-600" : "bg-teal-600"
            } text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
              ${isAdmin ? "👑" : user.name.charAt(0)}
            </span>
            <span>Chào mừng, <strong class="font-bold">${user.name}</strong> ${
        isAdmin ? "<span class='text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-amber-500 text-white ml-1'>Admin</span>" : ""
      } 👋</span>
          </div>

          ${
            isAdmin
              ? `
            <button id="btn-open-admin" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition-all" title="Mở bảng quản trị học viên & mật khẩu">
              ⚙️ Quản lý Học viên
            </button>
          `
              : `
            <button id="btn-open-feedback" class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors" title="Gửi ý kiến đóng góp">
              ⭐ Góp ý
            </button>
          `
          }

          <button id="btn-logout" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="Đăng xuất">
            Đăng xuất
          </button>
        </div>
      `;

      // Gắn sự kiện nút mở Admin Panel nếu là Admin
      if (isAdmin) {
        const btnAdmin = document.getElementById("btn-open-admin");
        if (btnAdmin) {
          btnAdmin.addEventListener("click", () => this.openAdminModal());
        }
      }

      // Gắn sự kiện đăng xuất
      const btnLogout = document.getElementById("btn-logout");
      if (btnLogout) {
        btnLogout.addEventListener("click", () => {
          Storage.logoutUser();
          this.renderUserGreeting();
          Celebration.showToast("Đã đăng xuất", "Hẹn gặp lại bạn trong buổi học tiếp theo nhé!", "👋");
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

      if (Storage.isAdmin(res.user)) {
        Celebration.showToast("Chào mừng Quản trị viên!", `Chào mừng Admin ${res.user.name} đã đăng nhập! Bạn có thể tra cứu và đặt lại mật khẩu học viên.`, "👑");
      } else {
        Celebration.showToast("Chào mừng bạn trở lại!", `Chào mừng học viên ${res.user.name} đã quay trở lại học tập!`, "🎉");
      }
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
    stars.forEach((star) => {
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
    container.innerHTML = recent
      .map((fb) => {
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
      })
      .join("");
  },

  // ════════════════════════════════════════════
  // 5. CỔNG QUẢN TRỊ VIÊN (ADMIN PANEL)
  // ════════════════════════════════════════════
  openAdminModal() {
    const modal = document.getElementById("admin-modal");
    if (!modal) return;
    this.adminCurrentTab = "users";
    this.switchAdminTab("users");
    this.renderAdminUsers();
    this.renderAdminFeedbacks();
    this.updateAdminStats();
    modal.classList.add("is-open");
  },

  closeAdminModal() {
    const modal = document.getElementById("admin-modal");
    if (modal) modal.classList.remove("is-open");
  },

  switchAdminTab(tab) {
    this.adminCurrentTab = tab;
    const tabUsers = document.getElementById("admin-tab-users");
    const tabFeedbacks = document.getElementById("admin-tab-feedbacks");
    const viewUsers = document.getElementById("admin-users-view");
    const viewFeedbacks = document.getElementById("admin-feedbacks-view");

    if (tab === "users") {
      tabUsers && tabUsers.classList.add("active");
      tabFeedbacks && tabFeedbacks.classList.remove("active");
      if (viewUsers) viewUsers.style.display = "block";
      if (viewFeedbacks) viewFeedbacks.style.display = "none";
    } else {
      tabFeedbacks && tabFeedbacks.classList.add("active");
      tabUsers && tabUsers.classList.remove("active");
      if (viewFeedbacks) viewFeedbacks.style.display = "block";
      if (viewUsers) viewUsers.style.display = "none";
    }
  },

  updateAdminStats() {
    const users = Storage.getUsers();
    const feedbacks = Storage.getFeedbacks();

    const statUsers = document.getElementById("admin-stat-users");
    const statFbs = document.getElementById("admin-stat-feedbacks");
    const tabFbBtn = document.getElementById("admin-tab-feedbacks");

    if (statUsers) statUsers.textContent = users.length;
    if (statFbs) statFbs.textContent = feedbacks.length;
    if (tabFbBtn) tabFbBtn.textContent = `💬 Quản lý Góp ý (${feedbacks.length})`;
  },

  // Render bảng danh sách học viên kèm mật khẩu & nút thao tác
  renderAdminUsers(keyword = "") {
    const tbody = document.getElementById("admin-users-table-body");
    const countBadge = document.getElementById("admin-user-count-badge");
    if (!tbody) return;

    let users = Storage.getUsers();
    const cleanKey = keyword.trim().toLowerCase();

    if (cleanKey) {
      users = users.filter(
        (u) => u.name.toLowerCase().includes(cleanKey) || u.email.toLowerCase().includes(cleanKey)
      );
    }

    if (countBadge) countBadge.textContent = `Hiển thị: ${users.length} học viên`;

    if (users.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="p-6 text-center text-slate-400">Không tìm thấy học viên nào phù hợp.</td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = users
      .map((u, idx) => {
        const isRevealed = !!this.revealedPasswords[u.id];
        const displayPassword = isRevealed ? u.password : "••••••••";
        const isAdm = Storage.isAdmin(u);

        return `
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <td class="p-3 text-slate-400 font-mono text-xs">${idx + 1}</td>
          <td class="p-3">
            <div class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>${u.name}</span>
              ${
                isAdm
                  ? `<span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-500 text-white font-bold">Admin</span>`
                  : ""
              }
            </div>
            <div class="text-[11px] text-slate-400 font-mono">ID: ${u.id}</div>
          </td>
          <td class="p-3 font-mono text-xs text-slate-600 dark:text-slate-300">${u.email}</td>
          <td class="p-3">
            <div class="flex items-center gap-2">
              <span class="font-mono text-xs font-bold px-2.5 py-1 rounded-lg ${
                isRevealed
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
              }">
                ${displayPassword}
              </span>
              <button class="btn-toggle-pw text-xs text-slate-500 hover:text-teal-600 p-1" data-user-id="${u.id}" title="${
          isRevealed ? "Ẩn mật khẩu" : "Hiện mật khẩu để cấp lại"
        }">
                ${isRevealed ? "🙈" : "👁️"}
              </button>
              <button class="btn-copy-pw text-xs text-slate-500 hover:text-blue-600 p-1" data-password="${u.password}" title="Copy mật khẩu gửi cho học viên">
                📋
              </button>
            </div>
          </td>
          <td class="p-3 text-xs text-slate-400">${u.registeredAt || "N/A"}</td>
          <td class="p-3 text-center">
            <div class="flex items-center justify-center gap-1.5">
              <button class="btn-reset-pw text-xs px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 hover:bg-teal-100 border border-teal-200 dark:border-teal-800 font-bold" data-user-id="${
                u.id
              }" data-user-name="${u.name}" title="Đổi mật khẩu mới cho học viên">
                ✏️ Đổi MK
              </button>
              ${
                !isAdm
                  ? `
                <button class="btn-del-user text-xs px-2 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 hover:bg-red-100 border border-red-200 dark:border-red-800 font-bold" data-user-id="${u.id}" data-user-name="${u.name}" title="Xóa học viên">
                  🗑️
                </button>
              `
                  : ""
              }
            </div>
          </td>
        </tr>
      `;
      })
      .join("");

    // Gắn sự kiện các nút trong bảng
    tbody.querySelectorAll(".btn-toggle-pw").forEach((btn) => {
      btn.addEventListener("click", () => {
        const uid = btn.getAttribute("data-user-id");
        this.revealedPasswords[uid] = !this.revealedPasswords[uid];
        this.renderAdminUsers(document.getElementById("admin-search-users")?.value || "");
      });
    });

    tbody.querySelectorAll(".btn-copy-pw").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pw = btn.getAttribute("data-password");
        navigator.clipboard.writeText(pw);
        Celebration.showToast("Đã copy mật khẩu!", `Mật khẩu [${pw}] đã được sao chép vào bộ nhớ tạm. Em có thể gửi cho học viên nhé!`, "📋");
      });
    });

    tbody.querySelectorAll(".btn-reset-pw").forEach((btn) => {
      btn.addEventListener("click", () => {
        const uid = btn.getAttribute("data-user-id");
        const uname = btn.getAttribute("data-user-name");
        this.promptResetPassword(uid, uname);
      });
    });

    tbody.querySelectorAll(".btn-del-user").forEach((btn) => {
      btn.addEventListener("click", () => {
        const uid = btn.getAttribute("data-user-id");
        const uname = btn.getAttribute("data-user-name");
        if (confirm(`Em có chắc chắn muốn xóa học viên [${uname}] không?`)) {
          const res = Storage.deleteUser(uid);
          if (res.success) {
            this.updateAdminStats();
            this.renderAdminUsers(document.getElementById("admin-search-users")?.value || "");
            Celebration.showToast("Đã xóa học viên", res.message, "🗑️");
          } else {
            alert(res.message);
          }
        }
      });
    });
  },

  // Đổi mật khẩu học viên
  promptResetPassword(userId, userName) {
    const newPass = prompt(`Nhập mật khẩu mới cho học viên [${userName}]:`);
    if (newPass === null) return;
    if (newPass.trim().length < 4) {
      alert("Mật khẩu mới phải có ít nhất 4 ký tự!");
      return;
    }

    const res = Storage.updateUserPassword(userId, newPass);
    if (res.success) {
      this.revealedPasswords[userId] = true;
      this.renderAdminUsers(document.getElementById("admin-search-users")?.value || "");
      Celebration.showToast("Đổi mật khẩu thành công!", `Mật khẩu mới của [${userName}] là: ${newPass.trim()}`, "🔑");
    } else {
      alert(res.message);
    }
  },

  // Render danh sách góp ý trong Admin Panel
  renderAdminFeedbacks() {
    const list = document.getElementById("admin-feedbacks-list");
    if (!list) return;

    const feedbacks = Storage.getFeedbacks();

    if (feedbacks.length === 0) {
      list.innerHTML = `<div class="p-8 text-center text-slate-400">Chưa có ý kiến góp ý nào được gửi.</div>`;
      return;
    }

    list.innerHTML = feedbacks
      .map((fb) => {
        const stars = "★".repeat(fb.rating || 5);
        return `
        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-start justify-between gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-1">
              <span class="text-amber-400 text-sm">${stars}</span>
              <span class="text-xs font-bold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">${fb.category}</span>
              <span class="text-xs text-slate-400">${fb.createdAt}</span>
            </div>
            <p class="text-sm text-slate-700 dark:text-slate-200 font-medium mb-1">"${fb.content}"</p>
            <div class="text-xs text-slate-500">Người gửi: <strong>${fb.userName}</strong> (${fb.userEmail})</div>
          </div>
          <button class="btn-del-fb text-xs px-2 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 hover:bg-red-100 border border-red-200 font-bold" data-fb-id="${fb.id}" title="Xóa góp ý này">
            🗑️ Xóa
          </button>
        </div>
      `;
      })
      .join("");

    list.querySelectorAll(".btn-del-fb").forEach((btn) => {
      btn.addEventListener("click", () => {
        const fbid = btn.getAttribute("data-fb-id");
        Storage.deleteFeedback(fbid);
        this.updateAdminStats();
        this.renderAdminFeedbacks();
        this.renderDynamicFeedbacks();
        Celebration.showToast("Đã xóa góp ý", "Ý kiến góp ý đã được xóa khỏi danh sách.", "🗑️");
      });
    });
  },

  bindEvents() {
    // Tab switch trong Auth modal (Login / Register)
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

    // Stars rating click trong Feedback modal
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

    // ── Admin Modal Events ──
    const btnCloseAdmin = document.getElementById("btn-close-admin");
    if (btnCloseAdmin) btnCloseAdmin.addEventListener("click", () => this.closeAdminModal());

    const adminModal = document.getElementById("admin-modal");
    if (adminModal) {
      adminModal.addEventListener("click", (e) => {
        if (e.target === adminModal) this.closeAdminModal();
      });
    }

    const adminTabUsers = document.getElementById("admin-tab-users");
    const adminTabFeedbacks = document.getElementById("admin-tab-feedbacks");
    if (adminTabUsers) adminTabUsers.addEventListener("click", () => this.switchAdminTab("users"));
    if (adminTabFeedbacks) adminTabFeedbacks.addEventListener("click", () => this.switchAdminTab("feedbacks"));

    const searchUsersInput = document.getElementById("admin-search-users");
    if (searchUsersInput) {
      searchUsersInput.addEventListener("input", (e) => {
        this.renderAdminUsers(e.target.value);
      });
    }
  }
};
