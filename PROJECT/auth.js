// auth.js — Quản lý đăng nhập, đăng ký qua SweetAlert2 & LocalStorage, chào mừng học viên & Bảng Quản trị Admin

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
              isAdmin ? "bg-amber-500" : "bg-teal-600"
            } text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm overflow-hidden flex-shrink-0">
              <img src="${isAdmin ? 'https://img.icons8.com/color/48/admin-settings-male.png' : 'https://img.icons8.com/color/48/user-male-circle.png'}" class="w-5 h-5 object-contain" alt="Avatar"/>
            </span>
            <span class="truncate max-w-[140px] sm:max-w-none">Chào mừng, <strong class="font-bold">${user.name}</strong> ${
        isAdmin ? "<span class='text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-amber-500 text-white ml-1'>Admin</span>" : ""
      }</span>
          </div>

          ${
            isAdmin
              ? `
            <button id="btn-open-admin" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition-all" title="Mở bảng quản trị học viên & mật khẩu">
              <img src="https://img.icons8.com/color/48/administrative-tools.png" class="w-4 h-4 object-contain brightness-200" alt="Admin"/>
              <span class="hidden sm:inline">Quản lý Học viên</span>
            </button>
          `
              : `
            <button id="btn-open-feedback" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors" title="Gửi ý kiến đóng góp">
              <img src="https://img.icons8.com/color/48/speech-bubble.png" class="w-4 h-4 object-contain" alt="Feedback"/>
              <span class="hidden sm:inline">Góp ý</span>
            </button>
          `
          }

          <button id="btn-logout" class="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="Đăng xuất">
            <img src="https://img.icons8.com/color/48/logout-rounded.png" class="w-4 h-4 object-contain" alt="Logout"/>
            <span class="hidden md:inline">Đăng xuất</span>
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

      // Gắn sự kiện đăng xuất bằng SweetAlert2
      const btnLogout = document.getElementById("btn-logout");
      if (btnLogout) {
        btnLogout.addEventListener("click", () => this.handleLogout());
      }
    } else {
      userWrap.innerHTML = `
        <div class="flex items-center gap-2">
          <button id="btn-open-feedback" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors" title="Gửi ý kiến đóng góp">
            <img src="https://img.icons8.com/color/48/speech-bubble.png" class="w-4 h-4 object-contain" alt="Feedback"/>
            <span class="hidden sm:inline">Góp ý</span>
          </button>
          <button id="btn-open-auth" class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 transition-all shadow-sm">
            <img src="https://img.icons8.com/color/48/user-male-circle.png" class="w-4 h-4 object-contain" alt="User"/>
            <span>Đăng nhập / Đăng ký</span>
          </button>
        </div>
      `;

      // Gắn sự kiện mở modal đăng nhập qua SweetAlert2
      const btnOpenAuth = document.getElementById("btn-open-auth");
      if (btnOpenAuth) {
        btnOpenAuth.addEventListener("click", () => this.openLoginSwal());
      }
    }

    // Gắn sự kiện mở modal feedback cho nút mới tạo
    const btnFeedback = document.getElementById("btn-open-feedback");
    if (btnFeedback) {
      btnFeedback.addEventListener("click", () => this.openFeedbackModal());
    }
  },

  // ── 2. Xử lý Đăng xuất bằng SweetAlert2 ──
  handleLogout() {
    if (typeof Swal !== "undefined") {
      Swal.fire({
        title: "Đăng xuất tài khoản?",
        text: "Bạn có chắc chắn muốn đăng xuất khỏi MT-STUDY?",
        imageUrl: "https://img.icons8.com/color/48/logout-rounded.png",
        imageWidth: 48,
        imageHeight: 48,
        showCancelButton: true,
        confirmButtonColor: "#e11d48",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Đăng xuất",
        cancelButtonText: "Ở lại",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          Storage.logoutUser();
          this.renderUserGreeting();
          Swal.fire({
            icon: "success",
            title: "Đã đăng xuất!",
            text: "Hẹn gặp lại bạn trong các bài học tiếp theo!",
            timer: 1500,
            showConfirmButton: false
          });
        }
      });
    } else {
      Storage.logoutUser();
      this.renderUserGreeting();
    }
  },

  // ── 3. Modal Đăng Nhập bằng SweetAlert2 & LocalStorage ──
  openLoginSwal() {
    if (typeof Swal === "undefined") {
      alert("Đang tải thư viện SweetAlert2, vui lòng thử lại!");
      return;
    }

    Swal.fire({
      title: `
        <div class="flex items-center justify-center gap-2 text-xl font-black text-slate-800">
          <img src="https://img.icons8.com/color/48/user-male-circle.png" class="w-8 h-8 object-contain" alt="Login"/>
          <span>Đăng Nhập Học Viên</span>
        </div>
      `,
      html: `
        <div class="text-left space-y-4 mt-3 text-sm px-1">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Email học viên</label>
            <div class="relative">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <img src="https://img.icons8.com/color/48/secured-letter.png" class="w-4 h-4 object-contain inline-block" alt="Email"/>
              </span>
              <input type="email" id="swal-login-email" class="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50" placeholder="hocvien@gmail.com">
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Mật khẩu</label>
            <div class="relative">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <img src="https://img.icons8.com/color/48/password.png" class="w-4 h-4 object-contain inline-block" alt="Password"/>
              </span>
              <input type="password" id="swal-login-password" class="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50" placeholder="••••••••">
            </div>
          </div>
          <div class="pt-2 text-center text-xs text-slate-500">
            Chưa có tài khoản? <a href="#" id="swal-link-to-register" class="text-teal-700 font-bold hover:underline">Đăng ký mới ngay</a>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Đăng nhập ngay",
      cancelButtonText: "Đóng",
      confirmButtonColor: "#006D77",
      cancelButtonColor: "#94a3b8",
      focusConfirm: false,
      didOpen: () => {
        const linkReg = document.getElementById("swal-link-to-register");
        if (linkReg) {
          linkReg.addEventListener("click", (e) => {
            e.preventDefault();
            this.openRegisterSwal();
          });
        }
        const passInp = document.getElementById("swal-login-password");
        if (passInp) {
          passInp.addEventListener("keydown", (e) => {
            if (e.key === "Enter") Swal.clickConfirm();
          });
        }
      },
      preConfirm: () => {
        const email = document.getElementById("swal-login-email").value;
        const pass = document.getElementById("swal-login-password").value;
        if (!email.trim() || !pass.trim()) {
          Swal.showValidationMessage("Vui lòng nhập đầy đủ Email và Mật khẩu!");
          return false;
        }
        const res = Storage.loginUser(email, pass);
        if (!res.success) {
          Swal.showValidationMessage(res.message);
          return false;
        }
        return res.user;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.renderUserGreeting();
        const user = result.value;
        if (Storage.isAdmin(user)) {
          Swal.fire({
            icon: "success",
            title: "Chào mừng Quản trị viên!",
            html: `Chào mừng Admin <strong>${user.name}</strong> đã đăng nhập.<br>Bạn có thể mở <b>Bảng Quản lý Học viên</b> để tra cứu mật khẩu!`,
            confirmButtonColor: "#7c3aed"
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Đăng nhập thành công!",
            text: `Chào mừng học viên ${user.name} đã quay trở lại học tập!`,
            timer: 2000,
            showConfirmButton: false
          });
        }
      }
    });
  },

  // ── 4. Modal Đăng Ký bằng SweetAlert2 & LocalStorage ──
  openRegisterSwal() {
    if (typeof Swal === "undefined") {
      alert("Đang tải thư viện SweetAlert2, vui lòng thử lại!");
      return;
    }

    Swal.fire({
      title: `
        <div class="flex items-center justify-center gap-2 text-xl font-black text-slate-800">
          <img src="https://img.icons8.com/color/48/graduation-cap.png" class="w-8 h-8 object-contain" alt="Register"/>
          <span>Tạo Tài Khoản Học Tập</span>
        </div>
      `,
      html: `
        <div class="text-left space-y-4 mt-3 text-sm px-1">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Họ và Tên học viên</label>
            <div class="relative">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <img src="https://img.icons8.com/color/48/user-male-circle.png" class="w-4 h-4 object-contain inline-block" alt="Name"/>
              </span>
              <input type="text" id="swal-reg-name" class="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50" placeholder="Nguyễn Văn A">
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Email học viên</label>
            <div class="relative">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <img src="https://img.icons8.com/color/48/secured-letter.png" class="w-4 h-4 object-contain inline-block" alt="Email"/>
              </span>
              <input type="email" id="swal-reg-email" class="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50" placeholder="hocvien@gmail.com">
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Mật khẩu</label>
            <div class="relative">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <img src="https://img.icons8.com/color/48/password.png" class="w-4 h-4 object-contain inline-block" alt="Password"/>
              </span>
              <input type="password" id="swal-reg-password" class="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50" placeholder="Tối thiểu 4 ký tự">
            </div>
          </div>
          <div class="pt-2 text-center text-xs text-slate-500">
            Đã có tài khoản? <a href="#" id="swal-link-to-login" class="text-teal-700 font-bold hover:underline">Đăng nhập ngay</a>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Tạo tài khoản",
      cancelButtonText: "Đóng",
      confirmButtonColor: "#059669",
      cancelButtonColor: "#94a3b8",
      focusConfirm: false,
      didOpen: () => {
        const linkLogin = document.getElementById("swal-link-to-login");
        if (linkLogin) {
          linkLogin.addEventListener("click", (e) => {
            e.preventDefault();
            this.openLoginSwal();
          });
        }
        const passInp = document.getElementById("swal-reg-password");
        if (passInp) {
          passInp.addEventListener("keydown", (e) => {
            if (e.key === "Enter") Swal.clickConfirm();
          });
        }
      },
      preConfirm: () => {
        const name = document.getElementById("swal-reg-name").value;
        const email = document.getElementById("swal-reg-email").value;
        const pass = document.getElementById("swal-reg-password").value;
        if (!name.trim() || !email.trim() || !pass.trim()) {
          Swal.showValidationMessage("Vui lòng điền đầy đủ các thông tin!");
          return false;
        }
        if (pass.length < 4) {
          Swal.showValidationMessage("Mật khẩu phải có ít nhất 4 ký tự!");
          return false;
        }
        const res = Storage.registerUser(name, email, pass);
        if (!res.success) {
          Swal.showValidationMessage(res.message);
          return false;
        }
        return res;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        Swal.fire({
          icon: "success",
          title: "Đăng ký thành công!",
          text: "Tài khoản của bạn đã được lưu vào hệ thống LocalStorage. Đang tự động đăng nhập...",
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.renderUserGreeting();
        });
      }
    });
  },

  // Fallback modal open
  openAuthModal(defaultTab = "login") {
    if (typeof Swal !== "undefined") {
      if (defaultTab === "register") {
        this.openRegisterSwal();
      } else {
        this.openLoginSwal();
      }
      return;
    }
  },

  // ── 5. Modal Form Feedback ──
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

    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "success",
        title: "Cảm ơn góp ý của bạn!",
        text: "Ý kiến quý báu của bạn đã được lưu lại. MT-STUDY sẽ ngày càng hoàn thiện hơn!",
        confirmButtonColor: "#006D77"
      });
    } else {
      Celebration.showToast("Cảm ơn bạn đã gửi góp ý!", "Ý kiến quý báu của bạn đã được ghi nhận.", "💌");
    }
  },

  // ── 6. Hiển thị các feedback của học viên mới gửi lên web ──
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
  // 7. CỔNG QUẢN TRỊ VIÊN (ADMIN PANEL)
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
                <img src="${isRevealed ? 'https://img.icons8.com/color/48/invisible.png' : 'https://img.icons8.com/color/48/visible.png'}" class="w-4 h-4 object-contain inline-block" alt="Toggle"/>
              </button>
              <button class="btn-copy-pw text-xs text-slate-500 hover:text-blue-600 p-1" data-password="${u.password}" title="Copy mật khẩu gửi cho học viên">
                <img src="https://img.icons8.com/color/48/copy.png" class="w-4 h-4 object-contain inline-block" alt="Copy"/>
              </button>
            </div>
          </td>
          <td class="p-3 text-xs text-slate-400">${u.registeredAt || "N/A"}</td>
          <td class="p-3 text-center">
            <div class="flex items-center justify-center gap-1.5">
              <button class="btn-reset-pw text-xs px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 hover:bg-teal-100 border border-teal-200 dark:border-teal-800 font-bold flex items-center gap-1" data-user-id="${
                u.id
              }" data-user-name="${u.name}" title="Đổi mật khẩu mới cho học viên">
                <img src="https://img.icons8.com/color/48/edit--v1.png" class="w-3.5 h-3.5 object-contain inline-block" alt="Edit"/>
                Đổi MK
              </button>
              ${
                !isAdm
                  ? `
                <button class="btn-del-user text-xs px-2 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 hover:bg-red-100 border border-red-200 dark:border-red-800 font-bold flex items-center gap-1" data-user-id="${u.id}" data-user-name="${u.name}" title="Xóa học viên">
                  <img src="https://img.icons8.com/color/48/trash--v1.png" class="w-3.5 h-3.5 object-contain inline-block" alt="Delete"/>
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
        if (typeof Swal !== "undefined") {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: `Đã copy mật khẩu [${pw}]`,
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          Celebration.showToast("Đã copy mật khẩu!", `Mật khẩu [${pw}] đã được sao chép vào bộ nhớ tạm.`, "📋");
        }
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
        this.confirmDeleteUser(uid, uname);
      });
    });
  },

  // Đổi mật khẩu học viên bằng SweetAlert2
  promptResetPassword(userId, userName) {
    if (typeof Swal !== "undefined") {
      Swal.fire({
        title: "Đổi Mật Khẩu Cho Học Viên",
        html: `Học viên: <strong class="text-teal-700">${userName}</strong>`,
        input: "text",
        inputLabel: "Nhập mật khẩu mới (tối thiểu 4 ký tự):",
        inputPlaceholder: "••••••••",
        imageUrl: "https://img.icons8.com/color/48/password.png",
        imageWidth: 44,
        imageHeight: 44,
        showCancelButton: true,
        confirmButtonText: "Cập nhật mật khẩu",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#7c3aed",
        inputValidator: (value) => {
          if (!value || value.trim().length < 4) {
            return "Mật khẩu mới phải có ít nhất 4 ký tự!";
          }
        }
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const res = Storage.updateUserPassword(userId, result.value.trim());
          if (res.success) {
            this.revealedPasswords[userId] = true;
            this.renderAdminUsers(document.getElementById("admin-search-users")?.value || "");
            Swal.fire({
              icon: "success",
              title: "Đổi mật khẩu thành công!",
              html: `Mật khẩu mới của [${userName}] là: <code class="px-2 py-1 bg-purple-100 text-purple-800 rounded font-bold">${result.value.trim()}</code>`,
              confirmButtonColor: "#7c3aed"
            });
          } else {
            Swal.fire({ icon: "error", title: "Lỗi", text: res.message });
          }
        }
      });
    } else {
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
        alert(`Đã đổi mật khẩu cho [${userName}] thành: ${newPass.trim()}`);
      }
    }
  },

  // Xóa học viên bằng SweetAlert2
  confirmDeleteUser(userId, userName) {
    if (typeof Swal !== "undefined") {
      Swal.fire({
        title: "Xác nhận xóa học viên?",
        html: `Bạn có chắc chắn muốn xóa học viên <strong class="text-red-600">${userName}</strong> khỏi hệ thống?<br><span class="text-xs text-slate-400">Hành động này không thể hoàn tác!</span>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Xóa học viên",
        cancelButtonText: "Hủy",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          const res = Storage.deleteUser(userId);
          if (res.success) {
            this.updateAdminStats();
            this.renderAdminUsers(document.getElementById("admin-search-users")?.value || "");
            Swal.fire({
              icon: "success",
              title: "Đã xóa học viên!",
              text: res.message,
              timer: 1500,
              showConfirmButton: false
            });
          } else {
            Swal.fire({ icon: "error", title: "Lỗi", text: res.message });
          }
        }
      });
    } else {
      if (confirm(`Bạn có chắc chắn muốn xóa học viên [${userName}] không?`)) {
        const res = Storage.deleteUser(userId);
        if (res.success) {
          this.updateAdminStats();
          this.renderAdminUsers(document.getElementById("admin-search-users")?.value || "");
        }
      }
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
          <button class="btn-del-fb text-xs px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 hover:bg-red-100 border border-red-200 font-bold flex items-center gap-1" data-fb-id="${fb.id}" title="Xóa góp ý này">
            <img src="https://img.icons8.com/color/48/trash--v1.png" class="w-3.5 h-3.5 object-contain inline-block" alt="Delete"/>
            Xóa
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
        if (typeof Swal !== "undefined") {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Đã xóa góp ý",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    });
  },

  bindEvents() {
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
