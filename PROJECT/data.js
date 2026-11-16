// Dữ liệu từ vựng theo tư duy Linearthinking
// Cấu trúc: Topic -> Root Word (Từ gốc) -> Word Family (Họ từ) -> Collocations (Cụm liên kết)

const VOCAB_DATA = [
  // ========== CHỦ ĐỀ 1 ==========
  {
    id: "topic_work",
    name: "Công việc & Sự nghiệp",
    icon: "💼",
    iconUrl: "https://img.icons8.com/color/48/briefcase.png",
    roots: [
      {
        id: "root_decide",
        word: "DECIDE",
        phonetic: "/dɪˈsaɪd/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Quyết định, đưa ra lựa chọn",
        example: "You need to decide what to do next.",
        exampleVi: "Bạn cần quyết định xem phải làm gì tiếp theo.",
        family: [
          { id: "wf_decision", word: "decision", phonetic: "/dɪˈsɪʒ.ən/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Sự quyết định, phán quyết", example: "Making a big decision is never easy.", exampleVi: "Đưa ra một quyết định lớn không bao giờ là dễ dàng." },
          { id: "wf_decisive", word: "decisive", phonetic: "/dɪˈsaɪ.sɪv/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Quyết đoán, mang tính quyết định", example: "A good leader must be decisive.", exampleVi: "Một người lãnh đạo giỏi phải biết quyết đoán." },
          { id: "wf_decisively", word: "decisively", phonetic: "/dɪˈsaɪ.sɪv.li/", pos: "adv", posLabel: "Adverb (Trạng từ)", meaning: "Một cách dứt khoát, kiên quyết", example: "The manager acted decisively to solve the issue.", exampleVi: "Người quản lý đã hành động dứt khoát để giải quyết vấn đề." }
        ],
        collocations: [
          { id: "col_make_decision", phrase: "make a decision", meaning: "đưa ra quyết định", example: "Take your time before you make a decision.", matchWord: "make" },
          { id: "col_reach_decision", phrase: "reach a decision", meaning: "đi đến quyết định chung", example: "The team finally reached a decision after two hours.", matchWord: "reach" },
          { id: "col_decisive_factor", phrase: "decisive factor", meaning: "yếu tố mang tính quyết định", example: "Price was the decisive factor for the customer.", matchWord: "factor" }
        ]
      },
      {
        id: "root_succeed",
        word: "SUCCEED",
        phonetic: "/səkˈsiːd/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Thành công, đạt được mục tiêu",
        example: "If you work hard, you will succeed in your career.",
        exampleVi: "Nếu bạn chăm chỉ, bạn sẽ thành công trong sự nghiệp.",
        family: [
          { id: "wf_success", word: "success", phonetic: "/səkˈses/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Sự thành công", example: "Failure is the mother of success.", exampleVi: "Thất bại là mẹ của thành công." },
          { id: "wf_successful", word: "successful", phonetic: "/səkˈses.fəl/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Thành công, có kết quả tốt", example: "She is a very successful businesswoman.", exampleVi: "Cô ấy là một nữ doanh nhân rất thành đạt." },
          { id: "wf_successfully", word: "successfully", phonetic: "/səkˈses.fəl.i/", pos: "adv", posLabel: "Adverb (Trạng từ)", meaning: "Một cách thành công", example: "We successfully launched the new project on time.", exampleVi: "Chúng tôi đã ra mắt dự án mới thành công đúng thời hạn." }
        ],
        collocations: [
          { id: "col_achieve_success", phrase: "achieve success", meaning: "gặt hái được thành công", example: "Discipline is key to achieve long-term success.", matchWord: "achieve" },
          { id: "col_huge_success", phrase: "huge success", meaning: "thành công vang dội", example: "The workshop was a huge success.", matchWord: "huge" },
          { id: "col_succeed_in", phrase: "succeed in doing sth", meaning: "thành công trong việc làm gì đó", example: "He succeeded in passing the interview.", matchWord: "in" }
        ]
      },
      {
        id: "root_create",
        word: "CREATE",
        phonetic: "/kriˈeɪt/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Tạo ra, sáng tạo nên",
        example: "The artist creates beautiful paintings from wood.",
        exampleVi: "Người nghệ sĩ tạo ra những bức tranh tuyệt đẹp từ gỗ.",
        family: [
          { id: "wf_creation", word: "creation", phonetic: "/kriˈeɪ.ʃən/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Tác phẩm, sự sáng tạo ra", example: "This software is his greatest creation.", exampleVi: "Phần mềm này là tác phẩm sáng tạo lớn nhất của anh ấy." },
          { id: "wf_creative", word: "creative", phonetic: "/kriˈeɪ.tɪv/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Có tính sáng tạo", example: "We need creative ideas for the marketing campaign.", exampleVi: "Chúng ta cần những ý tưởng sáng tạo cho chiến dịch tiếp thị." },
          { id: "wf_creativity", word: "creativity", phonetic: "/ˌkriː.eɪˈtɪv.ə.ti/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Năng lực / Óc sáng tạo", example: "Coding requires logic as well as creativity.", exampleVi: "Lập trình đòi hỏi tính logic cũng như óc sáng tạo." }
        ],
        collocations: [
          { id: "col_creative_thinking", phrase: "creative thinking", meaning: "tư duy sáng tạo", example: "Problem solving requires strong creative thinking.", matchWord: "thinking" },
          { id: "col_create_opportunity", phrase: "create opportunities", meaning: "tạo ra các cơ hội mới", example: "Networking helps create new career opportunities.", matchWord: "opportunities" }
        ]
      },
      {
        id: "root_manage",
        word: "MANAGE",
        phonetic: "/ˈmæn.ɪdʒ/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Quản lý, điều hành, xoay sở được",
        example: "She manages a team of twenty people at the company.",
        exampleVi: "Cô ấy quản lý một nhóm hai mươi người tại công ty.",
        family: [
          { id: "wf_manager", word: "manager", phonetic: "/ˈmæn.ɪ.dʒər/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Người quản lý, giám đốc bộ phận", example: "The manager held a meeting every Monday morning.", exampleVi: "Người quản lý tổ chức họp vào mỗi sáng thứ Hai." },
          { id: "wf_management", word: "management", phonetic: "/ˈmæn.ɪdʒ.mənt/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Sự quản lý, ban lãnh đạo", example: "Good time management is essential for productivity.", exampleVi: "Quản lý thời gian tốt là điều thiết yếu cho năng suất." },
          { id: "wf_manageable", word: "manageable", phonetic: "/ˈmæn.ɪ.dʒə.bəl/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Có thể kiểm soát được, không quá khó", example: "Break the task into manageable steps.", exampleVi: "Hãy chia nhiệm vụ thành các bước có thể kiểm soát được." }
        ],
        collocations: [
          { id: "col_time_management", phrase: "time management", meaning: "quản lý thời gian", example: "Effective time management helps reduce stress.", matchWord: "time" },
          { id: "col_risk_management", phrase: "risk management", meaning: "quản trị rủi ro", example: "Risk management is key in every project.", matchWord: "risk" },
          { id: "col_manage_to", phrase: "manage to do sth", meaning: "xoay sở được để làm gì đó", example: "Did you manage to finish the report on time?", matchWord: "to" }
        ]
      }
    ]
  },

  // ========== CHỦ ĐỀ 2 ==========
  {
    id: "topic_daily",
    name: "Thói quen & Đời sống",
    icon: "🌱",
    iconUrl: "https://img.icons8.com/color/48/sun.png",
    roots: [
      {
        id: "root_habit",
        word: "HABIT",
        phonetic: "/ˈhæb.ɪt/",
        pos: "n", posLabel: "Noun (Danh từ)",
        meaning: "Thói quen",
        example: "Reading before bedtime is a healthy habit.",
        exampleVi: "Đọc sách trước khi ngủ là một thói quen lành mạnh.",
        family: [
          { id: "wf_habitual", word: "habitual", phonetic: "/həˈbɪtʃ.u.əl/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Thường lệ, quen thuộc, theo thói quen", example: "He sat in his habitual seat by the window.", exampleVi: "Anh ấy ngồi vào chỗ quen thuộc bên cạnh cửa sổ." },
          { id: "wf_habitually", word: "habitually", phonetic: "/həˈbɪtʃ.u.ə.li/", pos: "adv", posLabel: "Adverb (Trạng từ)", meaning: "Một cách thường xuyên theo thói quen", example: "She habitually arrives 10 minutes early.", exampleVi: "Cô ấy thường xuyên đến sớm 10 phút." }
        ],
        collocations: [
          { id: "col_form_habit", phrase: "form a habit", meaning: "hình thành một thói quen", example: "It takes about 21 days to form a new habit.", matchWord: "form" },
          { id: "col_break_habit", phrase: "break a bad habit", meaning: "từ bỏ một thói quen xấu", example: "It's hard but possible to break a bad habit.", matchWord: "break" },
          { id: "col_daily_routine", phrase: "daily routine", meaning: "lịch trình sinh hoạt hàng ngày", example: "Exercise is part of my morning routine.", matchWord: "routine" }
        ]
      },
      {
        id: "root_health",
        word: "HEALTH",
        phonetic: "/helθ/",
        pos: "n", posLabel: "Noun (Danh từ)",
        meaning: "Sức khỏe",
        example: "Health is more valuable than wealth.",
        exampleVi: "Sức khỏe quý giá hơn của cải tiền tài.",
        family: [
          { id: "wf_healthy", word: "healthy", phonetic: "/ˈhel.θi/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Khỏe mạnh, lành mạnh", example: "Try to maintain a healthy diet.", exampleVi: "Hãy cố gắng duy trì một chế độ ăn uống lành mạnh." },
          { id: "wf_healthily", word: "healthily", phonetic: "/ˈhel.θəl.i/", pos: "adv", posLabel: "Adverb (Trạng từ)", meaning: "Một cách lành mạnh", example: "Living healthily helps reduce stress.", exampleVi: "Sống lành mạnh giúp giảm bớt căng thẳng." }
        ],
        collocations: [
          { id: "col_stay_healthy", phrase: "stay healthy", meaning: "giữ gìn sức khỏe", example: "Drinking enough water helps you stay healthy.", matchWord: "stay" },
          { id: "col_mental_health", phrase: "mental health", meaning: "sức khỏe tinh thần", example: "Take care of your mental health as well.", matchWord: "mental" },
          { id: "col_health_benefits", phrase: "health benefits", meaning: "lợi ích cho sức khỏe", example: "Walking has many health benefits.", matchWord: "benefits" }
        ]
      },
      {
        id: "root_stress",
        word: "STRESS",
        phonetic: "/stres/",
        pos: "n", posLabel: "Noun / Verb",
        meaning: "Căng thẳng; nhấn mạnh",
        example: "Exam season is a major source of stress for students.",
        exampleVi: "Mùa thi là nguồn gây căng thẳng lớn cho học sinh.",
        family: [
          { id: "wf_stressed", word: "stressed", phonetic: "/strest/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Đang căng thẳng, bị áp lực", example: "She felt stressed about the job interview.", exampleVi: "Cô ấy cảm thấy căng thẳng về buổi phỏng vấn xin việc." },
          { id: "wf_stressful", word: "stressful", phonetic: "/ˈstres.fəl/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Gây căng thẳng (tính chất của sự vật)", example: "Moving to a new city can be very stressful.", exampleVi: "Chuyển đến một thành phố mới có thể rất căng thẳng." },
          { id: "wf_unstressed", word: "unstressed", phonetic: "/ˌʌnˈstrest/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Không bị nhấn mạnh; không căng thẳng", example: "The unstressed syllable is often reduced.", exampleVi: "Âm tiết không nhấn thường bị rút gọn." }
        ],
        collocations: [
          { id: "col_under_stress", phrase: "under stress", meaning: "trong trạng thái căng thẳng, áp lực", example: "Many people eat more when they are under stress.", matchWord: "under" },
          { id: "col_relieve_stress", phrase: "relieve stress", meaning: "giải tỏa căng thẳng", example: "Exercise is a great way to relieve stress.", matchWord: "relieve" },
          { id: "col_stress_out", phrase: "stress out", meaning: "làm ai đó căng thẳng quá mức (Phrasal Verb)", example: "Don't stress out over small things.", matchWord: "out" }
        ]
      }
    ]
  },

  // ========== CHỦ ĐỀ 3 ==========
  {
    id: "topic_learning",
    name: "Học tập & Giao tiếp",
    icon: "🎯",
    iconUrl: "https://img.icons8.com/color/48/graduation-cap.png",
    roots: [
      {
        id: "root_communicate",
        word: "COMMUNICATE",
        phonetic: "/kəˈmjuː.nə.keɪt/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Giao tiếp, truyền đạt thông tin",
        example: "Good teammates communicate clearly with each other.",
        exampleVi: "Đồng đội tốt luôn giao tiếp rõ ràng với nhau.",
        family: [
          { id: "wf_communication", word: "communication", phonetic: "/kəˌmjuː.nəˈkeɪ.ʃən/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Sự giao tiếp, sự truyền đạt", example: "Communication skills are essential for career growth.", exampleVi: "Kỹ năng giao tiếp là thiết yếu cho sự thăng tiến." },
          { id: "wf_communicative", word: "communicative", phonetic: "/kəˈmjuː.nə.kə.tɪv/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Cởi mở, thích giao tiếp", example: "He became more communicative after joining the club.", exampleVi: "Cậu ấy trở nên cởi mở giao tiếp hơn sau khi vào câu lạc bộ." }
        ],
        collocations: [
          { id: "col_effective_communication", phrase: "effective communication", meaning: "giao tiếp hiệu quả", example: "Listen actively for effective communication.", matchWord: "effective" },
          { id: "col_communication_barrier", phrase: "language barrier", meaning: "rào cản ngôn ngữ", example: "Body language can overcome a language barrier.", matchWord: "barrier" }
        ]
      },
      {
        id: "root_learn",
        word: "LEARN",
        phonetic: "/lɜːrn/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Học, học hỏi, nhận thức được",
        example: "Children learn languages faster than adults.",
        exampleVi: "Trẻ em học ngôn ngữ nhanh hơn người lớn.",
        family: [
          { id: "wf_learner", word: "learner", phonetic: "/ˈlɜːr.nər/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Người học, học viên", example: "She is an independent learner who studies on her own.", exampleVi: "Cô ấy là một người học độc lập, tự học." },
          { id: "wf_learning", word: "learning", phonetic: "/ˈlɜːr.nɪŋ/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Việc học, kiến thức đã học", example: "Online learning has become more popular.", exampleVi: "Học trực tuyến đã trở nên phổ biến hơn." },
          { id: "wf_learned", word: "learned / learnt", phonetic: "/lɜːrnd/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Uyên bác, có học thức; đã học được", example: "He is a learned professor with decades of experience.", exampleVi: "Ông ấy là một giáo sư uyên bác với nhiều thập kỷ kinh nghiệm." }
        ],
        collocations: [
          { id: "col_learn_by_heart", phrase: "learn by heart", meaning: "học thuộc lòng", example: "Students had to learn the poem by heart.", matchWord: "heart" },
          { id: "col_lifelong_learning", phrase: "lifelong learning", meaning: "học tập suốt đời", example: "Lifelong learning keeps your mind sharp.", matchWord: "lifelong" },
          { id: "col_learn_from_mistakes", phrase: "learn from mistakes", meaning: "học từ sai lầm", example: "The best way to improve is to learn from your mistakes.", matchWord: "mistakes" }
        ]
      }
    ]
  },

  // ========== CHỦ ĐỀ 4 (MỚI - IELTS Style) ==========
  {
    id: "topic_environment",
    name: "Môi trường & Thiên nhiên",
    icon: "🌍",
    iconUrl: "https://img.icons8.com/color/48/leaf.png",
    roots: [
      {
        id: "root_pollute",
        word: "POLLUTE",
        phonetic: "/pəˈluːt/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Làm ô nhiễm, gây ô nhiễm",
        example: "Factories pollute nearby rivers with chemical waste.",
        exampleVi: "Các nhà máy gây ô nhiễm các con sông lân cận bằng chất thải hóa học.",
        family: [
          { id: "wf_pollution", word: "pollution", phonetic: "/pəˈluː.ʃən/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Sự ô nhiễm", example: "Air pollution is a major problem in big cities.", exampleVi: "Ô nhiễm không khí là vấn đề lớn ở các thành phố lớn." },
          { id: "wf_pollutant", word: "pollutant", phonetic: "/pəˈluː.tənt/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Chất gây ô nhiễm", example: "Carbon dioxide is one of the main pollutants.", exampleVi: "Carbon dioxide là một trong những chất gây ô nhiễm chính." },
          { id: "wf_polluted", word: "polluted", phonetic: "/pəˈluː.tɪd/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Bị ô nhiễm", example: "Swimming in a polluted river is dangerous.", exampleVi: "Bơi trong một con sông bị ô nhiễm rất nguy hiểm." }
        ],
        collocations: [
          { id: "col_air_pollution", phrase: "air pollution", meaning: "ô nhiễm không khí", example: "Air pollution damages our lungs over time.", matchWord: "air" },
          { id: "col_reduce_pollution", phrase: "reduce pollution", meaning: "giảm ô nhiễm", example: "Using public transport can help reduce pollution.", matchWord: "reduce" },
          { id: "col_tackle_pollution", phrase: "tackle pollution", meaning: "giải quyết vấn đề ô nhiễm", example: "Governments need to tackle pollution urgently.", matchWord: "tackle" }
        ]
      },
      {
        id: "root_sustain",
        word: "SUSTAIN",
        phonetic: "/səˈsteɪn/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Duy trì, chống đỡ, chịu đựng lâu dài",
        example: "We must sustain natural ecosystems for future generations.",
        exampleVi: "Chúng ta phải duy trì các hệ sinh thái tự nhiên cho các thế hệ tương lai.",
        family: [
          { id: "wf_sustainable", word: "sustainable", phonetic: "/səˈsteɪ.nə.bəl/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Bền vững, có thể duy trì lâu dài", example: "Renewable energy is a sustainable alternative to fossil fuels.", exampleVi: "Năng lượng tái tạo là lựa chọn bền vững thay thế nhiên liệu hóa thạch." },
          { id: "wf_sustainability", word: "sustainability", phonetic: "/səˌsteɪ.nəˈbɪl.ɪ.ti/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Tính bền vững", example: "Sustainability is the key concept in modern urban planning.", exampleVi: "Tính bền vững là khái niệm chính trong quy hoạch đô thị hiện đại." },
          { id: "wf_unsustainable", word: "unsustainable", phonetic: "/ˌʌn.səˈsteɪ.nə.bəl/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Không bền vững, không thể duy trì", example: "Current levels of deforestation are simply unsustainable.", exampleVi: "Mức độ phá rừng hiện tại đơn giản là không bền vững." }
        ],
        collocations: [
          { id: "col_sustainable_development", phrase: "sustainable development", meaning: "phát triển bền vững", example: "The UN promotes sustainable development worldwide.", matchWord: "development" },
          { id: "col_sustainable_energy", phrase: "sustainable energy", meaning: "năng lượng bền vững", example: "Solar power is a form of sustainable energy.", matchWord: "energy" },
          { id: "col_environmentally_friendly", phrase: "environmentally friendly", meaning: "thân thiện với môi trường", example: "Choose environmentally friendly products when shopping.", matchWord: "friendly" }
        ]
      },
      {
        id: "root_conserve",
        word: "CONSERVE",
        phonetic: "/kənˈsɜːrv/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Bảo tồn, giữ gìn, tiết kiệm",
        example: "We must conserve water during the dry season.",
        exampleVi: "Chúng ta phải tiết kiệm nước trong mùa khô.",
        family: [
          { id: "wf_conservation", word: "conservation", phonetic: "/ˌkɒn.səˈveɪ.ʃən/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Sự bảo tồn, bảo vệ tài nguyên thiên nhiên", example: "Wildlife conservation is vital to biodiversity.", exampleVi: "Bảo tồn động vật hoang dã là sống còn với đa dạng sinh học." },
          { id: "wf_conservationist", word: "conservationist", phonetic: "/ˌkɒn.səˈveɪ.ʃə.nɪst/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Nhà bảo tồn thiên nhiên", example: "Conservationists are working to protect endangered species.", exampleVi: "Các nhà bảo tồn đang nỗ lực bảo vệ các loài có nguy cơ tuyệt chủng." },
          { id: "wf_conservative", word: "conservative", phonetic: "/kənˈsɜː.və.tɪv/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Bảo thủ; thận trọng, không phung phí", example: "Give a conservative estimate of costs.", exampleVi: "Hãy đưa ra ước tính thận trọng về chi phí." }
        ],
        collocations: [
          { id: "col_wildlife_conservation", phrase: "wildlife conservation", meaning: "bảo tồn động vật hoang dã", example: "Wildlife conservation requires global cooperation.", matchWord: "wildlife" },
          { id: "col_energy_conservation", phrase: "energy conservation", meaning: "tiết kiệm năng lượng", example: "Energy conservation at home can lower your bills.", matchWord: "energy" },
          { id: "col_conservation_efforts", phrase: "conservation efforts", meaning: "các nỗ lực bảo tồn", example: "Conservation efforts have saved many species from extinction.", matchWord: "efforts" }
        ]
      }
    ]
  },

  // ========== CHỦ ĐỀ 5 (MỚI - IELTS Style) ==========
  {
    id: "topic_technology",
    name: "Công nghệ & Xã hội",
    icon: "💻",
    iconUrl: "https://img.icons8.com/color/48/laptop.png",
    roots: [
      {
        id: "root_innovate",
        word: "INNOVATE",
        phonetic: "/ˈɪn.ə.veɪt/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Đổi mới, cải tiến, sáng tạo ra điều mới",
        example: "Companies must innovate to stay competitive in the market.",
        exampleVi: "Các công ty phải đổi mới để duy trì cạnh tranh trên thị trường.",
        family: [
          { id: "wf_innovation", word: "innovation", phonetic: "/ˌɪn.əˈveɪ.ʃən/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Sự đổi mới, cải tiến; phát minh mới", example: "Technological innovation has transformed communication.", exampleVi: "Đổi mới công nghệ đã biến đổi hoàn toàn cách giao tiếp." },
          { id: "wf_innovative", word: "innovative", phonetic: "/ˈɪn.ə.veɪ.tɪv/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Mang tính đổi mới, sáng tạo", example: "The startup has an innovative approach to healthcare.", exampleVi: "Công ty khởi nghiệp có cách tiếp cận đổi mới trong chăm sóc sức khỏe." },
          { id: "wf_innovator", word: "innovator", phonetic: "/ˈɪn.ə.veɪ.tər/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Người đổi mới, người tiên phong", example: "Steve Jobs was one of the greatest innovators of his era.", exampleVi: "Steve Jobs là một trong những người đổi mới vĩ đại nhất thời đại mình." }
        ],
        collocations: [
          { id: "col_technological_innovation", phrase: "technological innovation", meaning: "đổi mới công nghệ", example: "Technological innovation drives economic growth.", matchWord: "technological" },
          { id: "col_foster_innovation", phrase: "foster innovation", meaning: "thúc đẩy, nuôi dưỡng sự đổi mới", example: "Open workplaces tend to foster innovation.", matchWord: "foster" },
          { id: "col_cutting_edge", phrase: "cutting-edge technology", meaning: "công nghệ tiên tiến bậc nhất", example: "The hospital uses cutting-edge technology for diagnosis.", matchWord: "cutting-edge" }
        ]
      },
      {
        id: "root_automate",
        word: "AUTOMATE",
        phonetic: "/ˈɔː.tə.meɪt/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Tự động hóa (một quy trình)",
        example: "Many factories have automated their production lines.",
        exampleVi: "Nhiều nhà máy đã tự động hóa dây chuyền sản xuất của họ.",
        family: [
          { id: "wf_automation", word: "automation", phonetic: "/ˌɔː.təˈmeɪ.ʃən/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Sự tự động hóa", example: "Automation has replaced many manual jobs.", exampleVi: "Tự động hóa đã thay thế nhiều công việc lao động tay chân." },
          { id: "wf_automated", word: "automated", phonetic: "/ˈɔː.tə.meɪ.tɪd/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Được tự động hóa, chạy tự động", example: "An automated system handles customer queries 24/7.", exampleVi: "Hệ thống tự động xử lý các câu hỏi của khách hàng 24/7." },
          { id: "wf_automatic", word: "automatic", phonetic: "/ˌɔː.təˈmæt.ɪk/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Tự động, không cần can thiệp thủ công", example: "The doors have an automatic sensor to open and close.", exampleVi: "Các cánh cửa có cảm biến tự động để mở và đóng." }
        ],
        collocations: [
          { id: "col_rise_of_automation", phrase: "the rise of automation", meaning: "sự trỗi dậy của tự động hóa", example: "The rise of automation concerns many workers.", matchWord: "rise" },
          { id: "col_replace_jobs", phrase: "replace human jobs", meaning: "thay thế công việc của con người", example: "AI could replace many human jobs in the near future.", matchWord: "replace" },
          { id: "col_artificial_intelligence", phrase: "artificial intelligence", meaning: "trí tuệ nhân tạo (AI)", example: "Artificial intelligence is reshaping the global economy.", matchWord: "artificial" }
        ]
      }
    ]
  },

  // ========== CHỦ ĐỀ 6 (NGỮ PHÁP & TỪ VỰNG: THÌ HIỆN TẠI ĐƠN) ==========
  {
    id: "topic_grammar_present",
    name: "Thì Hiện Tại Đơn & Thói Quen",
    icon: "⏰",
    iconUrl: "https://img.icons8.com/color/48/alarm-clock.png",
    roots: [
      {
        id: "root_occur",
        word: "OCCUR",
        phonetic: "/əˈkɜːr/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Xảy ra, diễn ra theo chu kỳ hoặc tự nhiên",
        example: "Earthquakes occur frequently along fault lines.",
        exampleVi: "Các trận động đất xảy ra thường xuyên dọc theo các đường đứt gãy.",
        family: [
          { id: "wf_occurrence", word: "occurrence", phonetic: "/əˈkʌr.əns/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Sự việc xảy ra, hiện tượng thường nhật", example: "Traffic jams are an everyday occurrence in Hanoi.", exampleVi: "Kẹt xe là chuyện diễn ra hàng ngày ở Hà Nội." },
          { id: "wf_reoccur", word: "reoccur", phonetic: "/ˌriː.əˈkɜːr/", pos: "v", posLabel: "Verb (Động từ)", meaning: "Tái diễn, lặp lại định kỳ", example: "Without proper treatment, the symptom may reoccur.", exampleVi: "Nếu không điều trị đúng cách, triệu chứng có thể tái diễn." },
          { id: "wf_recurrent", word: "recurrent", phonetic: "/rɪˈkʌr.ənt/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Có tính chu kỳ, lặp đi lặp lại", example: "He suffers from recurrent headaches.", exampleVi: "Anh ấy bị chứng đau đầu tái đi tái lại." }
        ],
        collocations: [
          { id: "col_daily_basis", phrase: "occur on a daily basis", meaning: "diễn ra đều đặn mỗi ngày", example: "Meetings occur on a daily basis in this office.", matchWord: "basis" },
          { id: "col_common_occurrence", phrase: "common occurrence", meaning: "hiện tượng phổ biến, chuyện thường gặp", example: "Power outages used to be a common occurrence.", matchWord: "common" },
          { id: "col_as_general_rule", phrase: "as a general rule", meaning: "như một quy luật chung", example: "As a general rule, shops close at 9 PM.", matchWord: "rule" }
        ]
      },
      {
        id: "root_repeat",
        word: "REPEAT",
        phonetic: "/rɪˈpiːt/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Lặp lại, làm lại nhiều lần",
        example: "History tends to repeat itself.",
        exampleVi: "Lịch sử thường có xu hướng lặp lại chính nó.",
        family: [
          { id: "wf_repetition", word: "repetition", phonetic: "/ˌrep.əˈtɪʃ.ən/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Sự lặp lại, sự nhắc lại", example: "Language learning requires frequent repetition.", exampleVi: "Học ngôn ngữ đòi hỏi sự lặp lại thường xuyên." },
          { id: "wf_repetitive", word: "repetitive", phonetic: "/rɪˈpet.ə.tɪv/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Có tính lặp đi lặp lại, đơn điệu", example: "Factory workers often perform repetitive tasks.", exampleVi: "Công nhân nhà máy thường làm những công việc lặp đi lặp lại." },
          { id: "wf_repeatedly", word: "repeatedly", phonetic: "/rɪˈpiː.tɪd.li/", pos: "adv", posLabel: "Adverb (Trạng từ)", meaning: "Nhiều lần, liên tục lặp lại", example: "She warned him repeatedly about the risks.", exampleVi: "Cô ấy đã cảnh báo anh ta nhiều lần về các rủi ro." }
        ],
        collocations: [
          { id: "col_repetitive_task", phrase: "repetitive task", meaning: "công việc mang tính lặp lại", example: "Automation eliminates repetitive tasks for employees.", matchWord: "task" },
          { id: "col_from_time_to_time", phrase: "from time to time", meaning: "thỉnh thoảng, đôi khi (tần suất)", example: "I like to visit my grandparents from time to time.", matchWord: "time" },
          { id: "col_regular_intervals", phrase: "at regular intervals", meaning: "đều đặn theo từng khoảng thời gian", example: "Trains leave at regular intervals throughout the day.", matchWord: "regular" }
        ]
      },
      {
        id: "root_exist",
        word: "EXIST",
        phonetic: "/ɪɡˈzɪst/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Tồn tại, hiện hữu trong thế giới tự nhiên",
        example: "Water exists in three states: liquid, solid, and gas.",
        exampleVi: "Nước tồn tại ở ba thể: lỏng, rắn và khí.",
        family: [
          { id: "wf_existence", word: "existence", phonetic: "/ɪɡˈzɪs.təns/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Sự tồn tại, sự hiện diện", example: "Scientists search for the existence of life on Mars.", exampleVi: "Các nhà khoa học tìm kiếm sự tồn tại của sự sống trên sao Hỏa." },
          { id: "wf_existent", word: "existent", phonetic: "/ɪɡˈzɪs.tənt/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Đang tồn tại, hiện có", example: "We must adapt to existent market conditions.", exampleVi: "Chúng ta phải thích nghi với điều kiện thị trường hiện có." },
          { id: "wf_coexist", word: "coexist", phonetic: "/ˌkoʊ.ɪɡˈzɪst/", pos: "v", posLabel: "Verb (Động từ)", meaning: "Cùng chung sống, cùng tồn tại hòa bình", example: "Different cultures can coexist peacefully.", exampleVi: "Các nền văn hóa khác nhau có thể cùng chung sống hòa bình." }
        ],
        collocations: [
          { id: "col_come_into_existence", phrase: "come into existence", meaning: "bắt đầu hình thành và tồn tại", example: "The company came into existence ten years ago.", matchWord: "existence" },
          { id: "col_by_nature", phrase: "by nature", meaning: "vốn dĩ tự nhiên, bản chất là", example: "Humans are social creatures by nature.", matchWord: "nature" },
          { id: "col_peaceful_coexistence", phrase: "peaceful coexistence", meaning: "sự cùng tồn tại hòa bình", example: "They strive for peaceful coexistence between nations.", matchWord: "peaceful" }
        ]
      }
    ]
  },

  // ========== CHỦ ĐỀ 7 (NGỮ PHÁP & TỪ VỰNG: ĐỘNG TỪ KHIẾM KHUYẾT) ==========
  {
    id: "topic_grammar_modal",
    name: "Động Từ Khiếm Khuyết & Mức Độ",
    icon: "⚡",
    iconUrl: "https://img.icons8.com/color/48/flash-on.png",
    roots: [
      {
        id: "root_able",
        word: "ABLE",
        phonetic: "/ˈeɪ.bəl/",
        pos: "adj", posLabel: "Adjective (Tính từ)",
        meaning: "Có năng lực, có thể làm được điều gì",
        example: "She is able to speak three languages fluently.",
        exampleVi: "Cô ấy có thể nói thành thạo ba thứ tiếng.",
        family: [
          { id: "wf_ability", word: "ability", phonetic: "/əˈbɪl.ə.ti/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Khả năng, năng lực", example: "He has the ability to solve complex problems.", exampleVi: "Anh ấy có khả năng giải quyết các vấn đề phức tạp." },
          { id: "wf_enable", word: "enable", phonetic: "/ɪˈneɪ.bəl/", pos: "v", posLabel: "Verb (Động từ)", meaning: "Tạo điều kiện, cho phép ai làm gì", example: "This software enables users to work remotely.", exampleVi: "Phần mềm này cho phép người dùng làm việc từ xa." },
          { id: "wf_capable", word: "capable", phonetic: "/ˈkeɪ.pə.bəl/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Có đủ thực lực, giỏi giang", example: "She is fully capable of leading the project.", exampleVi: "Cô ấy hoàn toàn có đủ thực lực để dẫn dắt dự án." }
        ],
        collocations: [
          { id: "col_have_ability", phrase: "have the ability to", meaning: "có năng lực làm điều gì", example: "Everyone has the ability to learn new skills.", matchWord: "ability" },
          { id: "col_be_able_afford", phrase: "be able to afford", meaning: "đủ khả năng chi trả tài chính", example: "We won't be able to afford a new car this year.", matchWord: "afford" },
          { id: "col_enable_someone", phrase: "enable someone to do", meaning: "tạo điều kiện cho ai đó làm gì", example: "Scholarships enable students to study abroad.", matchWord: "enable" }
        ]
      },
      {
        id: "root_oblige",
        word: "OBLIGE",
        phonetic: "/əˈblaɪdʒ/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Bắt buộc, đặt nghĩa vụ ràng buộc (Must / Have to)",
        example: "The law obliges drivers to wear seatbelts.",
        exampleVi: "Luật pháp bắt buộc người lái xe phải thắt dây an toàn.",
        family: [
          { id: "wf_obligation", word: "obligation", phonetic: "/ˌɒb.lɪˈɡeɪ.ʃən/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Nghĩa vụ, bổn phận bắt buộc", example: "Employers have a legal obligation to ensure safety.", exampleVi: "Người sử dụng lao động có nghĩa vụ pháp lý phải đảm bảo an toàn." },
          { id: "wf_obligatory", word: "obligatory", phonetic: "/əˈblɪɡ.ə.tər.i/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Bắt buộc, cưỡng chế theo luật", example: "Military service is obligatory in some countries.", exampleVi: "Nghĩa vụ quân sự là bắt buộc ở một số quốc gia." },
          { id: "wf_mandatory", word: "mandatory", phonetic: "/ˈmæn.də.tər.i/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Bắt buộc chấp hành", example: "Wearing a helmet is mandatory for motorcyclists.", exampleVi: "Đội mũ bảo hiểm là bắt buộc đối với người đi xe máy." }
        ],
        collocations: [
          { id: "col_under_obligation", phrase: "under an obligation to", meaning: "chịu bổn phận, nghĩa vụ phải làm", example: "You are under an obligation to tell the truth.", matchWord: "obligation" },
          { id: "col_meet_obligations", phrase: "meet one's obligations", meaning: "hoàn thành đầy đủ các nghĩa vụ", example: "Both parties agreed to meet their contractual obligations.", matchWord: "meet" },
          { id: "col_strictly_mandatory", phrase: "strictly mandatory", meaning: "hoàn toàn bắt buộc, không ngoại lệ", example: "Attendance at the orientation is strictly mandatory.", matchWord: "mandatory" }
        ]
      },
      {
        id: "root_permit",
        word: "PERMIT",
        phonetic: "/pərˈmɪt/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Cho phép, thừa nhận (May / Can)",
        example: "Smoking is not permitted in the building.",
        exampleVi: "Hút thuốc không được cho phép trong tòa nhà.",
        family: [
          { id: "wf_permission", word: "permission", phonetic: "/pərˈmɪʃ.ən/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Sự cho phép, giấy phép", example: "You must ask for permission before leaving.", exampleVi: "Bạn phải xin phép trước khi rời đi." },
          { id: "wf_permissible", word: "permissible", phonetic: "/pərˈmɪs.ə.bəl/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Được chấp thuận, hợp lệ", example: "Is it permissible to use dictionaries during the exam?", exampleVi: "Có được phép sử dụng từ điển trong giờ thi không?" },
          { id: "wf_impermissible", word: "impermissible", phonetic: "/ˌɪm.pərˈmɪs.ə.bəl/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Không được phép, bị cấm đoán", example: "Such behavior is completely impermissible.", exampleVi: "Hành vi như vậy là hoàn toàn không được phép." }
        ],
        collocations: [
          { id: "col_grant_permission", phrase: "grant permission to", meaning: "cấp giấy phép, phê duyệt cho ai", example: "The council granted permission to build the park.", matchWord: "grant" },
          { id: "col_without_permission", phrase: "without prior permission", meaning: "khi chưa được xin phép trước", example: "Do not enter the lab without prior permission.", matchWord: "permission" },
          { id: "col_weather_permitting", phrase: "weather permitting", meaning: "nếu thời tiết thuận lợi cho phép", example: "The match will start at 3 PM, weather permitting.", matchWord: "permitting" }
        ]
      }
    ]
  },

  // ========== CHỦ ĐỀ 8 (NGỮ PHÁP & TỪ VỰNG: THÌ QUÁ KHỨ ĐƠN) ==========
  {
    id: "topic_grammar_past",
    name: "Thì Quá Khứ Đơn & Trải Nghiệm",
    icon: "📜",
    iconUrl: "https://img.icons8.com/color/48/scroll.png",
    roots: [
      {
        id: "root_experience",
        word: "EXPERIENCE",
        phonetic: "/ɪkˈspɪə.ri.əns/",
        pos: "v", posLabel: "Verb / Noun",
        meaning: "Trải nghiệm, từng trải qua một biến cố trong quá khứ",
        example: "The country experienced rapid economic growth last decade.",
        exampleVi: "Đất nước đã trải qua sự tăng trưởng kinh tế nhanh chóng trong thập kỷ trước.",
        family: [
          { id: "wf_experienced", word: "experienced", phonetic: "/ɪkˈspɪə.ri.ənst/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Dày dạn kinh nghiệm, từng trải", example: "He is an experienced teacher with 20 years of practice.", exampleVi: "Thầy là một giáo viên dày dạn kinh nghiệm với 20 năm giảng dạy." },
          { id: "wf_inexperienced", word: "inexperienced", phonetic: "/ˌɪn.ɪkˈspɪə.ri.ənst/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Còn non nớt, chưa có kinh nghiệm", example: "Young drivers are often inexperienced on highways.", exampleVi: "Các tài xế trẻ thường còn non nớt kinh nghiệm trên đường cao tốc." },
          { id: "wf_experiential", word: "experiential", phonetic: "/ɪkˌspɪə.riˈen.ʃəl/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Dựa trên trải nghiệm thực tế", example: "Experiential learning helps students remember longer.", exampleVi: "Phương pháp học từ trải nghiệm thực tế giúp học sinh nhớ lâu hơn." }
        ],
        collocations: [
          { id: "col_gain_experience", phrase: "gain valuable experience", meaning: "tích lũy kinh nghiệm quý báu", example: "Internships help students gain valuable experience.", matchWord: "valuable" },
          { id: "col_past_experience", phrase: "past experience", meaning: "kinh nghiệm từ quá khứ", example: "Based on past experience, we should prepare early.", matchWord: "past" },
          { id: "col_learn_experience", phrase: "learn from experience", meaning: "rút ra bài học từ trải nghiệm đã qua", example: "A wise person learns from experience.", matchWord: "learn" }
        ]
      },
      {
        id: "root_origin",
        word: "ORIGIN",
        phonetic: "/ˈɒr.ɪ.dʒɪn/",
        pos: "n", posLabel: "Noun (Danh từ)",
        meaning: "Nguồn gốc, gốc tích lịch sử ban đầu",
        example: "The word has its origin in Latin.",
        exampleVi: "Từ này có nguồn gốc ban đầu từ tiếng Latinh.",
        family: [
          { id: "wf_originate", word: "originate", phonetic: "/əˈrɪdʒ.ən.eɪt/", pos: "v", posLabel: "Verb (Động từ)", meaning: "Bắt nguồn, khởi phát từ quá khứ", example: "The tradition originated in ancient Greece.", exampleVi: "Truyền thống này bắt nguồn từ thời Hy Lạp cổ đại." },
          { id: "wf_original", word: "original", phonetic: "/əˈrɪdʒ.ən.əl/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Nguyên bản, thuở ban đầu", example: "The original manuscript was written in 1850.", exampleVi: "Bản thảo nguyên bản được viết vào năm 1850." },
          { id: "wf_originally", word: "originally", phonetic: "/əˈrɪdʒ.ən.əl.i/", pos: "adv", posLabel: "Adverb (Trạng từ)", meaning: "Ban đầu, vào thời điểm khởi đầu", example: "The building was originally used as a library.", exampleVi: "Tòa nhà ban đầu được sử dụng như một thư viện." }
        ],
        collocations: [
          { id: "col_take_place_past", phrase: "take place in the past", meaning: "diễn ra trong quá khứ", example: "The historical battle took place in the past century.", matchWord: "place" },
          { id: "col_date_back", phrase: "date back to", meaning: "có niên đại bắt nguồn từ thời", example: "The ancient temple dates back to the 12th century.", matchWord: "date" },
          { id: "col_in_first_place", phrase: "in the first place", meaning: "ngay từ thuở ban đầu", example: "Why didn't you mention that in the first place?", matchWord: "first" }
        ]
      },
      {
        id: "root_achieve",
        word: "ACHIEVE",
        phonetic: "/əˈtʃiːv/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Đạt được, gặt hái thành quả sau nỗ lực",
        example: "The team achieved all their quarterly targets.",
        exampleVi: "Cả nhóm đã hoàn thành toàn bộ mục tiêu của quý vừa qua.",
        family: [
          { id: "wf_achievement", word: "achievement", phonetic: "/əˈtʃiːv.mənt/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Thành tựu, chiến tích đạt được", example: "Winning the award was a proud achievement.", exampleVi: "Đoạt giải thưởng là một thành tựu đáng tự hào." },
          { id: "wf_achievable", word: "achievable", phonetic: "/əˈtʃiː.və.bəl/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Có thể chạm tới, khả thi", example: "Set goals that are realistic and achievable.", exampleVi: "Hãy đặt những mục tiêu thực tế và có thể đạt được." },
          { id: "wf_overachieve", word: "overachieve", phonetic: "/ˌoʊ.vɚ.əˈtʃiːv/", pos: "v", posLabel: "Verb (Động từ)", meaning: "Đạt thành tích vượt bậc hơn kỳ vọng", example: "She always overachieved in school tests.", exampleVi: "Cô ấy luôn đạt thành tích vượt mức trong các bài thi." }
        ],
        collocations: [
          { id: "col_achieve_success", phrase: "achieve great success", meaning: "đạt được thành công vang dội", example: "The author achieved great success with his first novel.", matchWord: "success" },
          { id: "col_remarkable_achievement", phrase: "remarkable achievement", meaning: "thành tựu xuất sắc đáng ghi nhận", example: "Eradicating the disease was a remarkable achievement.", matchWord: "remarkable" },
          { id: "col_accomplish_milestone", phrase: "accomplish a milestone", meaning: "chinh phục một cột mốc quan trọng", example: "Graduating was the first milestone she accomplished.", matchWord: "milestone" }
        ]
      }
    ]
  },

  // ========== CHỦ ĐỀ 9 (NGỮ PHÁP & TỪ VỰNG: THÌ TƯƠNG LAI GẦN & DỰ ĐỊNH) ==========
  {
    id: "topic_grammar_future",
    name: "Thì Tương Lai Gần & Dự Định",
    icon: "🚀",
    iconUrl: "https://img.icons8.com/color/48/rocket.png",
    roots: [
      {
        id: "root_intend",
        word: "INTEND",
        phonetic: "/ɪnˈtend/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Có ý định, dự định làm gì trong thời gian tới",
        example: "I intend to start my own business next month.",
        exampleVi: "Tôi dự định sẽ khởi nghiệp kinh doanh vào tháng tới.",
        family: [
          { id: "wf_intention", word: "intention", phonetic: "/ɪnˈten.ʃən/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Ý định, chủ ý dự kiến", example: "He announced his intention to run for mayor.", exampleVi: "Ông thông báo ý định ứng cử thị trưởng." },
          { id: "wf_intentional", word: "intentional", phonetic: "/ɪnˈten.ʃən.əl/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Có chủ đích, có toan tính trước", example: "The foul was clearly intentional.", exampleVi: "Pha phạm lỗi rõ ràng là có chủ ý trước." },
          { id: "wf_intentionally", word: "intentionally", phonetic: "/ɪnˈten.ʃən.əl.i/", pos: "adv", posLabel: "Adverb (Trạng từ)", meaning: "Một cách có chủ đích, cố ý", example: "I would never intentionally hurt your feelings.", exampleVi: "Tôi sẽ không bao giờ cố ý làm tổn thương cảm xúc của bạn." }
        ],
        collocations: [
          { id: "col_have_intention", phrase: "have every intention of", meaning: "có toàn bộ ý định thực hiện", example: "We have every intention of finishing the project on time.", matchWord: "intention" },
          { id: "col_with_intention", phrase: "with the intention of", meaning: "với chủ đích nhằm hướng tới", example: "He went to England with the intention of studying art.", matchWord: "with" },
          { id: "col_intend_pursue", phrase: "intend to pursue", meaning: "dự định theo đuổi (mục tiêu/nghề nghiệp)", example: "She intends to pursue a master degree in data science.", matchWord: "pursue" }
        ]
      },
      {
        id: "root_plan",
        word: "PLAN",
        phonetic: "/plæn/",
        pos: "v", posLabel: "Verb / Noun",
        meaning: "Lên kế hoạch, sắp xếp các bước trước cho tương lai",
        example: "We are planning to launch the new feature tomorrow.",
        exampleVi: "Chúng tôi đang lên kế hoạch ra mắt tính năng mới vào ngày mai.",
        family: [
          { id: "wf_planner", word: "planner", phonetic: "/ˈplæn.ər/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Người lập kế hoạch, cuốn sổ kế hoạch", example: "An urban planner designs efficient cities.", exampleVi: "Một nhà quy hoạch đô thị thiết kế các thành phố hiệu quả." },
          { id: "wf_planned", word: "planned", phonetic: "/plænd/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Đã được lên lịch trình sẵn", example: "The planned departure time is 8:00 AM.", exampleVi: "Thời gian khởi hành theo kế hoạch là 8 giờ sáng." },
          { id: "wf_unplanned", word: "unplanned", phonetic: "/ʌnˈplænd/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Ngoài dự tính, bất ngờ phát sinh", example: "An unplanned expense strained our budget.", exampleVi: "Một khoản chi phí ngoài dự tính đã gây áp lực lên ngân sách." }
        ],
        collocations: [
          { id: "col_according_to_plan", phrase: "go according to plan", meaning: "diễn ra suôn sẻ đúng theo dự kiến", example: "Everything is going according to plan.", matchWord: "plan" },
          { id: "col_be_about_to", phrase: "be about to start", meaning: "sắp sửa bắt đầu ngay tức thì (tương lai rất gần)", example: "Hurry up, the movie is about to start!", matchWord: "about" },
          { id: "col_careful_preparations", phrase: "make careful preparations", meaning: "chuẩn bị chu đáo cẩn thận", example: "They made careful preparations for the wedding.", matchWord: "preparations" }
        ]
      },
      {
        id: "root_expect",
        word: "EXPECT",
        phonetic: "/ɪkˈspekt/",
        pos: "v", posLabel: "Verb (Động từ)",
        meaning: "Kỳ vọng, dự đoán điều gì sắp xảy đến",
        example: "We expect sales to increase substantially next quarter.",
        exampleVi: "Chúng tôi kỳ vọng doanh số sẽ tăng mạnh trong quý tới.",
        family: [
          { id: "wf_expectation", word: "expectation", phonetic: "/ˌek.spekˈteɪ.ʃən/", pos: "n", posLabel: "Noun (Danh từ)", meaning: "Sự kỳ vọng, mong đợi", example: "The concert exceeded our highest expectations.", exampleVi: "Buổi hòa nhạc đã vượt qua sự kỳ vọng cao nhất của chúng tôi." },
          { id: "wf_expectant", word: "expectant", phonetic: "/ɪkˈspek.tənt/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Đầy mong chờ, háo hức ngóng đợi", example: "The expectant crowd cheered as the band walked on stage.", exampleVi: "Đám đông đầy mong chờ hò reo khi ban nhạc bước lên sân khấu." },
          { id: "wf_unexpected", word: "unexpected", phonetic: "/ˌʌn.ɪkˈspek.tɪd/", pos: "adj", posLabel: "Adjective (Tính từ)", meaning: "Bất ngờ, không lường trước được", example: "Her sudden visit was a lovely unexpected surprise.", exampleVi: "Chuyến thăm đột ngột của cô ấy là một bất ngờ thú vị không báo trước." }
        ],
        collocations: [
          { id: "col_in_near_future", phrase: "in the near future", meaning: "trong tương lai gần sắp tới", example: "Prices are expected to stabilize in the near future.", matchWord: "future" },
          { id: "col_meet_expectations", phrase: "meet all expectations", meaning: "đáp ứng trọn vẹn mọi sự kỳ vọng", example: "The new product met all customer expectations.", matchWord: "expectations" },
          { id: "col_bound_to_happen", phrase: "be bound to happen", meaning: "chắc chắn không sớm thì muộn sẽ diễn ra", example: "With such reckless driving, an accident was bound to happen.", matchWord: "bound" }
        ]
      }
    ]
  }
];
