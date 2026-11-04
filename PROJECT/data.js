// Dữ liệu từ vựng theo tư duy Linearthinking
// Cấu trúc: Topic -> Root Word (Từ gốc) -> Word Family (Họ từ) -> Collocations (Cụm liên kết)

const VOCAB_DATA = [
  {
    id: "topic_work",
    name: "Công việc & Sự nghiệp",
    icon: "💼",
    description: "Các từ vựng cốt lõi về kỹ năng làm việc, ra quyết định và mục tiêu nghề nghiệp.",
    roots: [
      {
        id: "root_decide",
        word: "DECIDE",
        phonetic: "/dɪˈsaɪd/",
        pos: "v",
        posLabel: "Verb (Động từ)",
        meaning: "Quyết định, đưa ra lựa chọn",
        example: "You need to decide what to do next.",
        exampleVi: "Bạn cần quyết định xem phải làm gì tiếp theo.",
        family: [
          {
            id: "wf_decision",
            word: "decision",
            phonetic: "/dɪˈsɪʒ.ən/",
            pos: "n",
            posLabel: "Noun (Danh từ)",
            meaning: "Sự quyết định, phán quyết",
            example: "Making a big decision is never easy.",
            exampleVi: "Đưa ra một quyết định lớn không bao giờ là dễ dàng."
          },
          {
            id: "wf_decisive",
            word: "decisive",
            phonetic: "/dɪˈsaɪ.sɪv/",
            pos: "adj",
            posLabel: "Adjective (Tính từ)",
            meaning: "Quyết đoán, mang tính quyết định",
            example: "A good leader must be decisive.",
            exampleVi: "Một người lãnh đạo giỏi phải biết quyết đoán."
          },
          {
            id: "wf_decisively",
            word: "decisively",
            phonetic: "/dɪˈsaɪ.sɪv.li/",
            pos: "adv",
            posLabel: "Adverb (Trạng từ)",
            meaning: "Một cách dứt khoát, kiên quyết",
            example: "The manager acted decisively to solve the issue.",
            exampleVi: "Người quản lý đã hành động dứt khoát để giải quyết vấn đề."
          }
        ],
        collocations: [
          {
            id: "col_make_decision",
            phrase: "make a decision",
            meaning: "đưa ra quyết định (KHÔNG dùng 'do a decision')",
            example: "Take your time before you make a decision.",
            matchWord: "make"
          },
          {
            id: "col_reach_decision",
            phrase: "reach a decision",
            meaning: "đi đến một quyết định chung sau khi bàn bạc",
            example: "The team finally reached a decision after two hours.",
            matchWord: "reach"
          },
          {
            id: "col_decisive_factor",
            phrase: "decisive factor",
            meaning: "yếu tố mang tính quyết định",
            example: "Price was the decisive factor for the customer.",
            matchWord: "factor"
          }
        ]
      },
      {
        id: "root_succeed",
        word: "SUCCEED",
        phonetic: "/səkˈsiːd/",
        pos: "v",
        posLabel: "Verb (Động từ)",
        meaning: "Thành công, đạt được mục tiêu",
        example: "If you work hard, you will succeed in your career.",
        exampleVi: "Nếu bạn chăm chỉ, bạn sẽ thành công trong sự nghiệp.",
        family: [
          {
            id: "wf_success",
            word: "success",
            phonetic: "/səkˈses/",
            pos: "n",
            posLabel: "Noun (Danh từ)",
            meaning: "Sự thành công",
            example: "Failure is the mother of success.",
            exampleVi: "Thất bại là mẹ của thành công."
          },
          {
            id: "wf_successful",
            word: "successful",
            phonetic: "/səkˈses.fəl/",
            pos: "adj",
            posLabel: "Adjective (Tính từ)",
            meaning: "Thành công, có kết quả tốt",
            example: "She is a very successful businesswoman.",
            exampleVi: "Cô ấy là một nữ doanh nhân rất thành đạt."
          },
          {
            id: "wf_successfully",
            word: "successfully",
            phonetic: "/səkˈses.fəl.i/",
            pos: "adv",
            posLabel: "Adverb (Trạng từ)",
            meaning: "Một cách thành công",
            example: "We successfully launched the new project on time.",
            exampleVi: "Chúng tôi đã ra mắt dự án mới thành công đúng thời hạn."
          }
        ],
        collocations: [
          {
            id: "col_achieve_success",
            phrase: "achieve success",
            meaning: "gặt hái được thành công",
            example: "Discipline is key to achieve long-term success.",
            matchWord: "achieve"
          },
          {
            id: "col_huge_success",
            phrase: "huge success",
            meaning: "thành công vang dội",
            example: "The workshop was a huge success.",
            matchWord: "huge"
          },
          {
            id: "col_succeed_in",
            phrase: "succeed in doing something",
            meaning: "thành công trong việc làm gì đó (đi kèm giới từ 'in')",
            example: "He succeeded in passing the interview.",
            matchWord: "in"
          }
        ]
      },
      {
        id: "root_create",
        word: "CREATE",
        phonetic: "/kriˈeɪt/",
        pos: "v",
        posLabel: "Verb (Động từ)",
        meaning: "Tạo ra, sáng tạo nên",
        example: "The artist creates beautiful paintings from wood.",
        exampleVi: "Người nghệ sĩ tạo ra những bức tranh tuyệt đẹp từ gỗ.",
        family: [
          {
            id: "wf_creation",
            word: "creation",
            phonetic: "/kriˈeɪ.ʃən/",
            pos: "n",
            posLabel: "Noun (Danh từ)",
            meaning: "Tác phẩm, sự sáng tạo ra",
            example: "This software is his greatest creation.",
            exampleVi: "Phần mềm này là tác phẩm sáng tạo lớn nhất của anh ấy."
          },
          {
            id: "wf_creative",
            word: "creative",
            phonetic: "/kriˈeɪ.tɪv/",
            pos: "adj",
            posLabel: "Adjective (Tính từ)",
            meaning: "Có tính sáng tạo",
            example: "We need creative ideas for the marketing campaign.",
            exampleVi: "Chúng ta cần những ý tưởng sáng tạo cho chiến dịch tiếp thị."
          },
          {
            id: "wf_creativity",
            word: "creativity",
            phonetic: "/ˌkriː.eɪˈtɪv.ə.ti/",
            pos: "n",
            posLabel: "Noun (Danh từ)",
            meaning: "Năng lực / Óc sáng tạo",
            example: "Coding requires logic as well as creativity.",
            exampleVi: "Lập trình đòi hỏi tính logic cũng như óc sáng tạo."
          }
        ],
        collocations: [
          {
            id: "col_creative_thinking",
            phrase: "creative thinking",
            meaning: "tư duy sáng tạo",
            example: "Problem solving requires strong creative thinking.",
            matchWord: "thinking"
          },
          {
            id: "col_create_opportunity",
            phrase: "create opportunities",
            meaning: "tạo ra các cơ hội mới",
            example: "Networking helps create new career opportunities.",
            matchWord: "opportunities"
          }
        ]
      }
    ]
  },
  {
    id: "topic_daily",
    name: "Thói quen & Đời sống",
    icon: "🌱",
    description: "Từ vựng về sức khỏe, quản lý thời gian và các thói quen hàng ngày.",
    roots: [
      {
        id: "root_habit",
        word: "HABIT",
        phonetic: "/ˈhæb.ɪt/",
        pos: "n",
        posLabel: "Noun (Danh từ)",
        meaning: "Thói quen",
        example: "Reading before bedtime is a healthy habit.",
        exampleVi: "Đọc sách trước khi ngủ là một thói quen lành mạnh.",
        family: [
          {
            id: "wf_habitual",
            word: "habitual",
            phonetic: "/həˈbɪtʃ.u.əl/",
            pos: "adj",
            posLabel: "Adjective (Tính từ)",
            meaning: "Thường lệ, quen thuộc, theo thói quen",
            example: "He sat in his habitual seat by the window.",
            exampleVi: "Anh ấy ngồi vào chỗ quen thuộc bên cạnh cửa sổ."
          },
          {
            id: "wf_habitually",
            word: "habitually",
            phonetic: "/həˈbɪtʃ.u.ə.li/",
            pos: "adv",
            posLabel: "Adverb (Trạng từ)",
            meaning: "Một cách thường xuyên theo thói quen",
            example: "She habitually arrives 10 minutes early.",
            exampleVi: "Cô ấy thường xuyên đến sớm 10 phút."
          }
        ],
        collocations: [
          {
            id: "col_form_habit",
            phrase: "form a habit",
            meaning: "hình thành một thói quen",
            example: "It takes about 21 days to form a new habit.",
            matchWord: "form"
          },
          {
            id: "col_break_habit",
            phrase: "break a bad habit",
            meaning: "từ bỏ một thói quen xấu",
            example: "It's hard but possible to break a bad habit.",
            matchWord: "break"
          },
          {
            id: "col_daily_routine",
            phrase: "daily routine",
            meaning: "lịch trình sinh hoạt hàng ngày",
            example: "Exercise is part of my morning routine.",
            matchWord: "routine"
          }
        ]
      },
      {
        id: "root_health",
        word: "HEALTH",
        phonetic: "/helθ/",
        pos: "n",
        posLabel: "Noun (Danh từ)",
        meaning: "Sức khỏe",
        example: "Health is more valuable than wealth.",
        exampleVi: "Sức khỏe quý giá hơn của cải tiền tài.",
        family: [
          {
            id: "wf_healthy",
            word: "healthy",
            phonetic: "/ˈhel.θi/",
            pos: "adj",
            posLabel: "Adjective (Tính từ)",
            meaning: "Khỏe mạnh, lành mạnh",
            example: "Try to maintain a healthy diet.",
            exampleVi: "Hãy cố gắng duy trì một chế độ ăn uống lành mạnh."
          },
          {
            id: "wf_healthily",
            word: "healthily",
            phonetic: "/ˈhel.θəl.i/",
            pos: "adv",
            posLabel: "Adverb (Trạng từ)",
            meaning: "Một cách lành mạnh",
            example: "Living healthily helps reduce stress.",
            exampleVi: "Sống lành mạnh giúp giảm bớt căng thẳng."
          }
        ],
        collocations: [
          {
            id: "col_stay_healthy",
            phrase: "stay healthy",
            meaning: "giữ gìn sức khỏe",
            example: "Drinking enough water helps you stay healthy.",
            matchWord: "stay"
          },
          {
            id: "col_mental_health",
            phrase: "mental health",
            meaning: "sức khỏe tinh thần",
            example: "Take care of your mental health as well.",
            matchWord: "mental"
          }
        ]
      }
    ]
  },
  {
    id: "topic_learning",
    name: "Học tập & Giao tiếp",
    icon: "🎯",
    description: "Bộ từ vựng rèn luyện kỹ năng kết nối, chia sẻ ý tưởng và tiếp thu kiến thức.",
    roots: [
      {
        id: "root_communicate",
        word: "COMMUNICATE",
        phonetic: "/kəˈmjuː.nə.keɪt/",
        pos: "v",
        posLabel: "Verb (Động từ)",
        meaning: "Giao tiếp, truyền đạt thông tin",
        example: "Good teammates communicate clearly with each other.",
        exampleVi: "Đồng đội tốt luôn giao tiếp rõ ràng với nhau.",
        family: [
          {
            id: "wf_communication",
            word: "communication",
            phonetic: "/kəˌmjuː.nəˈkeɪ.ʃən/",
            pos: "n",
            posLabel: "Noun (Danh từ)",
            meaning: "Sự giao tiếp, sự truyền đạt",
            example: "Communication skills are essential for career growth.",
            exampleVi: "Kỹ năng giao tiếp là thiết yếu cho sự thăng tiến."
          },
          {
            id: "wf_communicative",
            word: "communicative",
            phonetic: "/kəˈmjuː.nə.kə.tɪv/",
            pos: "adj",
            posLabel: "Adjective (Tính từ)",
            meaning: "Cởi mở, thích giao tiếp",
            example: "He became more communicative after joining the club.",
            exampleVi: "Cậu ấy trở nên cởi mở giao tiếp hơn sau khi vào câu lạc bộ."
          }
        ],
        collocations: [
          {
            id: "col_effective_communication",
            phrase: "effective communication",
            meaning: "giao tiếp hiệu quả",
            example: "Listen actively for effective communication.",
            matchWord: "effective"
          },
          {
            id: "col_communication_barrier",
            phrase: "language barrier",
            meaning: "rào cản ngôn ngữ",
            example: "Body language can overcome a language barrier.",
            matchWord: "barrier"
          }
        ]
      }
    ]
  }
];

