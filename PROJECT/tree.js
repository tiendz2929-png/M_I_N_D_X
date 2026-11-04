// Logic render và tương tác sơ đồ cây tư duy (Linearthinking Tree)

const Tree = {
  container: null,
  currentTopic: null,

  init(containerId) {
    this.container = document.getElementById(containerId);
  },

  // Render toàn bộ cây của một chủ đề
  render(topic) {
    if (!this.container || !topic) return;
    this.currentTopic = topic;
    this.container.innerHTML = "";

    const progress = Storage.getProgress();

    topic.roots.forEach((root) => {
      const cluster = document.createElement("div");
      cluster.className = "tree-root-cluster";
      cluster.id = `cluster-${root.id}`;

      // Lấy trạng thái của từ gốc
      const rootStatus = progress[root.id] || "unlearned";

      // HTML cho Cột 1: Node Từ Gốc
      const rootNodeHtml = `
        <div class="node-root-wrap">
          <div class="card-node is-root" data-word-id="${root.id}" data-type="root">
            <div class="node-header">
              <span class="badge-pos ${root.pos}">${root.pos}</span>
              <span class="status-pill ${rootStatus}" title="Trạng thái: ${rootStatus}"></span>
            </div>
            <div class="node-word">
              ${root.word}
            </div>
            <div class="node-phonetic">${root.phonetic}</div>
            <div class="node-meaning">${root.meaning}</div>
            <div class="node-actions">
              <button class="btn-speak-mini" data-speak="${root.word}" title="Nghe phát âm">🔊</button>
              <button class="btn-toggle-branch" data-toggle="${root.id}">
                <span class="toggle-icon">▼</span> Nhánh
              </button>
            </div>
          </div>
        </div>
      `;

      // HTML cho Cột 2 & Cột 3: Họ từ và Cụm từ liên kết
      let branchesHtml = `<div class="branches-container">`;

      if (root.family && root.family.length > 0) {
        root.family.forEach((fWord) => {
          const fStatus = progress[fWord.id] || "unlearned";
          branchesHtml += `
            <div class="branch-item">
              <div class="node-family-wrap">
                <div class="card-node" data-word-id="${fWord.id}" data-type="family" data-root-id="${root.id}">
                  <div class="node-header">
                    <span class="badge-pos ${fWord.pos}">${fWord.pos}</span>
                    <span class="status-pill ${fStatus}" title="Trạng thái: ${fStatus}"></span>
                  </div>
                  <div class="node-word">${fWord.word}</div>
                  <div class="node-phonetic">${fWord.phonetic}</div>
                  <div class="node-meaning">${fWord.meaning}</div>
                  <div class="node-actions">
                    <button class="btn-speak-mini" data-speak="${fWord.word}" title="Nghe phát âm">🔊</button>
                  </div>
                </div>
              </div>
            </div>
          `;
        });
      }

      // Nhánh Collocations (Cụm liên kết thực tế)
      if (root.collocations && root.collocations.length > 0) {
        let collocItemsHtml = "";
        root.collocations.forEach((col) => {
          collocItemsHtml += `
            <div class="collocation-card" data-colloc-phrase="${col.phrase}" data-colloc-mean="${col.meaning}" data-colloc-ex="${col.example}">
              <div>
                <div class="collocation-phrase">${col.phrase}</div>
                <div class="collocation-meaning">${col.meaning}</div>
              </div>
              <button class="btn-speak-mini" data-speak="${col.phrase}" title="Nghe cụm từ">🔊</button>
            </div>
          `;
        });

        branchesHtml += `
          <div class="branch-item">
            <div class="collocations-list">
              <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
                🔗 Cụm liên kết (Collocations)
              </div>
              ${collocItemsHtml}
            </div>
          </div>
        `;
      }

      branchesHtml += `</div>`;

      cluster.innerHTML = `
        <div class="mindmap-flow">
          ${rootNodeHtml}
          ${branchesHtml}
        </div>
      `;

      this.container.appendChild(cluster);
    });

    this.bindEvents();
  },

  // Gắn sự kiện tương tác
  bindEvents() {
    if (!this.container) return;

    // 1. Sự kiện bấm nút loa nghe phát âm
    this.container.querySelectorAll(".btn-speak-mini").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation(); // Không kích hoạt mở card
        const textToSpeak = btn.getAttribute("data-speak");
        if (textToSpeak) {
          btn.style.transform = "scale(1.2)";
          Speech.speak(textToSpeak, null, () => {
            btn.style.transform = "scale(1)";
          });
        }
      });
    });

    // 2. Sự kiện đóng/mở nhánh cây (Toggle collapse)
    this.container.querySelectorAll(".btn-toggle-branch").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const rootId = btn.getAttribute("data-toggle");
        const cluster = document.getElementById(`cluster-${rootId}`);
        if (cluster) {
          cluster.classList.toggle("is-collapsed");
          const icon = btn.querySelector(".toggle-icon");
          if (icon) {
            icon.textContent = cluster.classList.contains("is-collapsed") ? "▶" : "▼";
          }
        }
      });
    });

    // 3. Sự kiện bấm vào thẻ từ để mở Flashcard
    this.container.querySelectorAll(".card-node").forEach((node) => {
      node.addEventListener("click", () => {
        const wordId = node.getAttribute("data-word-id");
        const wordData = this.findWordById(wordId);
        if (wordData && typeof Flashcard !== "undefined") {
          Flashcard.open(wordData);
        }
      });
    });

    // 4. Sự kiện bấm vào cụm từ Collocation để mở Flashcard nhanh
    this.container.querySelectorAll(".collocation-card").forEach((card) => {
      card.addEventListener("click", () => {
        const phrase = card.getAttribute("data-colloc-phrase");
        const mean = card.getAttribute("data-colloc-mean");
        const ex = card.getAttribute("data-colloc-ex");
        if (typeof Flashcard !== "undefined") {
          Flashcard.open({
            id: phrase,
            word: phrase,
            phonetic: "Collocation",
            pos: "phrase",
            posLabel: "Cụm liên kết",
            meaning: mean,
            example: ex,
            exampleVi: mean
          });
        }
      });
    });
  },

  // Tìm thông tin từ theo ID
  findWordById(wordId) {
    if (!this.currentTopic) return null;
    for (const root of this.currentTopic.roots) {
      if (root.id === wordId) return root;
      if (root.family) {
        const found = root.family.find((f) => f.id === wordId);
        if (found) return found;
      }
    }
    return null;
  },

  // Cập nhật lại màu badge trạng thái khi user vừa đánh dấu
  updateWordStatusUI(wordId, newStatus) {
    const nodes = this.container.querySelectorAll(`[data-word-id="${wordId}"]`);
    nodes.forEach((node) => {
      const pill = node.querySelector(".status-pill");
      if (pill) {
        pill.className = `status-pill ${newStatus}`;
        pill.title = `Trạng thái: ${newStatus}`;
      }
    });
  },

  // Tìm kiếm tức thời (Debounce search filter)
  filter(keyword) {
    const cleanKey = keyword.trim().toLowerCase();
    const clusters = this.container.querySelectorAll(".tree-root-cluster");

    clusters.forEach((cluster) => {
      if (!cleanKey) {
        cluster.style.display = "block";
        return;
      }

      const clusterText = cluster.innerText.toLowerCase();
      if (clusterText.includes(cleanKey)) {
        cluster.style.display = "block";
        // Tự động mở nhánh nếu đang bị đóng để người dùng nhìn thấy kết quả
        cluster.classList.remove("is-collapsed");
      } else {
        cluster.style.display = "none";
      }
    });
  }
};

