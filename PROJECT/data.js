// Dữ liệu từ vựng theo tư duy Linearthinking
// Cấu trúc: Topic -> Root Word (Từ gốc) -> Word Family (Họ từ) -> Collocations (Cụm liên kết)

const VOCAB_DATA = [
  // ========== CHỦ ĐỀ 1 ==========
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
    description: "Từ vựng về sức khỏe, quản lý thời gian và các thói quen hàng ngày.",
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
    description: "Bộ từ vựng rèn luyện kỹ năng kết nối, chia sẻ ý tưởng và tiếp thu kiến thức.",
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
    description: "Từ vựng IELTS về ô nhiễm, biến đổi khí hậu và bảo vệ môi trường.",
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
    description: "Từ vựng IELTS về tác động của công nghệ, truyền thông và tự động hóa.",
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
  }
];
