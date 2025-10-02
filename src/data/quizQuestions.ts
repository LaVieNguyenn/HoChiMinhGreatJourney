export type MultipleChoiceQuestion = {
  id: string;
  type: 'multiple-choice';
  prompt: string;
  options: string[];
  correctOption: number;
  explanation?: string;
};

export type FillInQuestion = {
  id: string;
  type: 'fill-in';
  prompt: string;
  correctAnswers: string[];
  explanation?: string;
};

export type QuizQuestion = MultipleChoiceQuestion | FillInQuestion;

export const QUIZ_DURATION_SECONDS = 30 * 60;

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'multiple-choice',
    prompt: 'Câu 1. Tác phẩm "Đạo đức cách mạng" của Hồ Chí Minh được in lần đầu trên tạp chí nào?',
    options: [
      'Tạp chí Xây dựng Đảng',
      'Tạp chí Quân đội nhân dân',
      'Tạp chí Học tập',
      'Tạp chí Những vấn đề hòa bình và chủ nghĩa xã hội',
    ],
    correctOption: 2,
    explanation: 'Bài viết "Đạo đức cách mạng" được đăng lần đầu trên Tạp chí Học tập số 12 (1958).',
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    prompt: `Câu 2. Ai là tác giả của những câu thơ sau:\n\n“Luận cương đến với Bác Hồ. Và Người đã khóc\nLệ Bác Hồ rơi trên chữ Lenin.\nBốn bức tường im nghe Bác lật từng trang sách gấp\nTưởng bên ngoài, đất nước đợi mong tin.\nBác reo lên một mình như nói cùng dân tộc:\n"Cơm áo là đây! Hạnh phúc đây rồi!"\nHình của Đảng lồng trong hình của Nước.\nPhút khóc đầu tiên là phút Bác Hồ cười,”`,
    options: ['Chế Lan Viên', 'Sóng Hồng', 'Huy Cận', 'Tố Hữu'],
    correctOption: 0,
    explanation: 'Đoạn thơ trích từ bài "Người đi tìm hình của nước" của nhà thơ Chế Lan Viên.',
  },
  {
    id: 'q3',
    type: 'multiple-choice',
    prompt: 'Câu 3. Trong nhà nước dân chủ của Hồ Chí Minh, nhân dân thực thi quyền dân chủ của mình qua mấy hình thức?',
    options: ['Ba hình thức', 'Bốn hình thức', 'Hai hình thức', 'Một hình thức'],
    correctOption: 2,
    explanation: 'Hồ Chí Minh chỉ rõ hai hình thức cơ bản: dân chủ trực tiếp và dân chủ đại diện.',
  },
  {
    id: 'q4',
    type: 'multiple-choice',
    prompt: 'Câu 4. Theo Hồ Chí Minh, trong xây dựng Đảng “mục đích phê bình cốt để ..., giúp nhau cùng tiến bộ”.',
    options: ['sửa chữa sai lầm', 'giúp nhau sửa chữa', 'sửa chữa khuyết điểm', 'giúp nhau sửa sai'],
    correctOption: 2,
    explanation: 'Bác nhấn mạnh phê bình để sửa chữa khuyết điểm, cùng nhau tiến bộ.',
  },
  {
    id: 'q5',
    type: 'multiple-choice',
    prompt: 'Câu 5. Hồ Chí Minh đưa ra khái niệm văn hóa vào khoảng thời gian nào?',
    options: ['09/1942', '08/1942', '08/1943', '09/1943'],
    correctOption: 2,
    explanation: 'Trong bài viết năm 1943, Người nêu rõ văn hóa là toàn bộ những hoạt động sáng tạo của con người.',
  },
  {
    id: 'q6',
    type: 'multiple-choice',
    prompt: 'Câu 6. Ai là người đã gợi ý cho Nguyễn Tất Thành về phương hướng tìm đường cứu nước qua câu nói: “Muốn đánh Pháp phải hiểu Pháp, muốn hiểu Pháp, phải học tiếng Pháp”?',
    options: ['Nguyễn Quý Song', 'Hoàng Thông', 'Nguyễn Sinh Sắc', 'Vương Thúc Quý'],
    correctOption: 3,
    explanation: 'Người bạn của gia đình, cụ Phó bảng Vương Thúc Quý đã khuyên Nguyễn Tất Thành như vậy.',
  },
  {
    id: 'q7',
    type: 'multiple-choice',
    prompt: 'Câu 7. Kể từ khi thành lập đến nay, Mặt trận dân tộc thống nhất có bao nhiêu tên gọi?',
    options: ['Năm tên gọi', 'Bảy tên gọi', 'Bốn tên gọi', 'Sáu tên gọi'],
    correctOption: 1,
    explanation: 'Mặt trận dân tộc thống nhất đã trải qua bảy tên gọi khác nhau qua các thời kỳ cách mạng.',
  },
  {
    id: 'q8',
    type: 'multiple-choice',
    prompt: 'Câu 8. Hồ Chí Minh sống và làm việc tại Anh trong khoảng thời gian nào?',
    options: ['1912 – 1913', '1912 – 1917', '1913 – 1917', '1913 – 1914'],
    correctOption: 2,
    explanation: 'Người đến Anh năm 1913 và làm việc tại đây đến khoảng năm 1917.',
  },
  {
    id: 'q9',
    type: 'multiple-choice',
    prompt: 'Câu 9. Tư tưởng Hồ Chí Minh về vấn đề dân tộc có mấy nội dung?',
    options: ['Ba nội dung', 'Năm nội dung', 'Hai nội dung', 'Bốn nội dung'],
    correctOption: 3,
    explanation: 'Các nội dung gồm: tính chất vấn đề dân tộc, mục tiêu, lực lượng, và phương pháp giải quyết.',
  },
  {
    id: 'q10',
    type: 'multiple-choice',
    prompt: 'Câu 10. Theo Hồ Chí Minh: “Văn hóa phải ... cho quốc dân đi”.',
    options: ['soi đường', 'đi trước', 'dẫn đường', 'mở đường'],
    correctOption: 0,
    explanation: 'Câu nói nổi tiếng của Người: “Văn hóa phải soi đường cho quốc dân đi.”',
  },
  {
    id: 'q11',
    type: 'multiple-choice',
    prompt: 'Câu 11. Có mấy phương thức xây dựng khối đại đoàn kết dân tộc theo tư tưởng Hồ Chí Minh?',
    options: ['Bốn phương thức', 'Hai phương thức', 'Năm phương thức', 'Ba phương thức'],
    correctOption: 2,
    explanation: 'Người nêu năm phương thức lớn, từ xây dựng Đảng đến phát huy sức mạnh văn hóa.',
  },
  {
    id: 'q12',
    type: 'multiple-choice',
    prompt: 'Câu 12. “Văn hóa phục vụ ai? Cố nhiên chúng ta phải nói là phục vụ công nông binh, tức là phục vụ đại đa số nhân dân”. Câu nói trên được trích từ tác phẩm nào của Hồ Chí Minh?',
    options: [
      'Các nhà văn hóa Việt Nam hãy chú ý đặc biệt đến nhi đồng',
      'Thư gửi các họa sĩ nhân dịp triển lãm hội họa 1951',
      'Thư gửi thi sĩ Huyền Kiêu',
      'Nói chuyện tại hội nghị cán bộ văn hóa',
    ],
    correctOption: 3,
    explanation: 'Đây là đoạn trích trong bài nói chuyện của Bác tại Hội nghị cán bộ văn hóa năm 1948.',
  },
  {
    id: 'q13',
    type: 'multiple-choice',
    prompt: 'Câu 13. Hồ Chí Minh sống và làm việc tại Mỹ vào khoảng thời gian nào?',
    options: ['1912 – 1913', '1914 – 1917', '1917 – 1919', '1913 – 1914'],
    correctOption: 0,
    explanation: 'Người từng làm việc ở Boston và New York trong khoảng 1912 – 1913.',
  },
  {
    id: 'q14',
    type: 'multiple-choice',
    prompt: 'Câu 14. Tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc có mấy nội dung?',
    options: ['Ba nội dung', 'Bốn nội dung', 'Năm nội dung', 'Hai nội dung'],
    correctOption: 2,
    explanation: 'Các nội dung chính gồm vai trò, lực lượng, mục tiêu, nội dung và phương thức xây dựng khối đại đoàn kết.',
  },
  {
    id: 'q15',
    type: 'fill-in',
    prompt: 'Câu 15. Điền những từ còn thiếu: Theo tư tưởng Hồ Chí Minh, con người là ... quý nhất, là ... quyết định thắng lợi của cách mạng. Con người vừa là ..., vừa là ... của cách mạng.',
    correctAnswers: ['vốn', 'nhân tố', 'mục tiêu', 'động lực'],
    explanation: 'Người khẳng định con người là vốn quý nhất, là nhân tố quyết định, vừa là mục tiêu vừa là động lực của cách mạng.',
  },
  {
    id: 'q16',
    type: 'multiple-choice',
    prompt: 'Câu 16. Câu nói “Ánh sáng của Cách mạng xã hội chủ nghĩa Tháng Mười vĩ đại...” của Hồ Chí Minh được viết trong tác phẩm nào?',
    options: ['Lenin vĩ đại', 'Cách mạng Tháng Mười và con đường giải phóng thuộc địa', 'Con đường dẫn tôi đến chủ nghĩa Lenin', 'Sức mạnh vô địch'],
    correctOption: 2,
    explanation: 'Đoạn trích nằm trong tác phẩm “Con đường dẫn tôi đến chủ nghĩa Lenin.”',
  },
  {
    id: 'q17',
    type: 'multiple-choice',
    prompt: 'Câu 17. Theo tư tưởng Hồ Chí Minh, có mấy nguyên tắc trong hoạt động của Đảng?',
    options: ['Bốn nguyên tắc', 'Sáu nguyên tắc', 'Tám nguyên tắc', 'Bảy nguyên tắc', 'Chín nguyên tắc', 'Năm nguyên tắc'],
    correctOption: 5,
    explanation: 'Người nêu năm nguyên tắc: tập trung dân chủ, tập thể lãnh đạo – cá nhân phụ trách, tự phê bình và phê bình, kỷ luật nghiêm minh, đoàn kết thống nhất.',
  },
  {
    id: 'q18',
    type: 'multiple-choice',
    prompt: 'Câu 18. Hồ Chí Minh đã tiếp thu những yếu tố nào của Lão giáo?',
    options: [
      'Thoát khỏi mọi ràng buộc của vòng danh lợi',
      'Biết bảo vệ môi trường sống',
      'Sống gắn bó với thiên nhiên, hòa đồng với thiên nhiên',
      'Sống có tình, có nghĩa',
    ],
    correctOption: 2,
    explanation: 'Từ Lão giáo, Người tiếp thu lối sống hòa đồng với tự nhiên, giản dị và thanh cao.',
  },
  {
    id: 'q19',
    type: 'multiple-choice',
    prompt: 'Câu 19. Trong các luận điểm sau của Hồ Chí Minh về xây dựng Nhà nước thượng tôn pháp luật luận điểm nào đã bị viết sai?',
    options: [
      'Nhân dân phê bình, giám sát, đôn đốc, làm thay hoạt động của nhà nước',
      'Chú trọng đưa pháp luật vào trong cuộc sống, bảo đảm cho pháp luật được thi hành và có cơ chế giám sát việc thi hành pháp luật',
      'Cần làm tốt công tác lập pháp',
      'Nêu cao tính nghiêm minh của pháp luật',
    ],
    correctOption: 0,
    explanation: 'Người khẳng định nhân dân giám sát, phê bình nhưng không làm thay hoạt động của nhà nước.',
  },
  {
    id: 'q20',
    type: 'multiple-choice',
    prompt: 'Câu 20. Trong “Sửa đổi lối làm việc” (10/1947), nói về cách lãnh đạo, Hồ Chí Minh viết: “Chúng ta tuyệt đối không nên theo đuôi quần chúng. Nhưng ...”.',
    options: [
      'phải khéo tập trung ý kiến của quần chúng',
      'phải khéo định hướng quần chúng theo quan điểm của mình',
      'phải khéo giải thích cho quần chúng hiểu',
      'phải khéo tranh thủ ý kiến của quần chúng',
    ],
    correctOption: 0,
    explanation: 'Bác căn dặn phải biết tập trung, tổng hợp ý kiến quần chúng để lãnh đạo đúng.',
  },
  {
    id: 'q21',
    type: 'multiple-choice',
    prompt: 'Câu 21. Nói về vai trò của đạo đức, Hồ Chí Minh viết: “Cũng như sông thì phải có nguồn mới có nước...”. Đoạn văn trên được Người viết trong tác phẩm nào?',
    options: ['Sửa đổi lối làm việc', 'Di chúc', 'Tinh thần trách nhiệm', 'Thực hành tiết kiệm, chống tham ô lãng phí, chống bệnh quan liêu'],
    correctOption: 0,
    explanation: 'Đoạn văn nằm trong tác phẩm “Sửa đổi lối làm việc” (1947).',
  },
  {
    id: 'q22',
    type: 'multiple-choice',
    prompt: 'Câu 22. Nguyên tắc hoạt động của Đảng theo tư tưởng Hồ Chí Minh là? Theo Hồ Chí Minh, Đảng Cộng sản Việt Nam là Đảng của:',
    options: [
      'Tất cả các phương án trên',
      'Tự phê bình và phê bình',
      'Đảng phải thường xuyên tự chỉnh đốn',
      'Tập trung dân chủ, tập thể lãnh đạo cá nhân phụ trách',
      'Đoàn kết quốc tế',
    ],
    correctOption: 0,
    explanation: 'Hồ Chí Minh nhấn mạnh Đảng phải hội tụ đầy đủ các nguyên tắc trên.',
  },
  {
    id: 'q23',
    type: 'multiple-choice',
    prompt: 'Câu 23. Theo Hồ Chí Minh để lãnh đạo Mặt trận dân tộc thống nhất Đảng phải làm gì?',
    options: ['Có chính sách đúng đắn', 'Có năng lực lãnh đạo', 'Cả hai phương án trên'],
    correctOption: 2,
    explanation: 'Đảng phải vừa có đường lối đúng, vừa có năng lực tổ chức thực hiện.',
  },
  {
    id: 'q24',
    type: 'multiple-choice',
    prompt: 'Câu 24. Cơ chế vận hành của hệ thống chính trị nước ta hiện nay là gì?',
    options: [
      'Đảng, Nhà nước quản lý xã hội, nhân dân làm chủ',
      'Đảng, Nhà nước lãnh đạo, nhân dân làm chủ',
      'Đảng, Nhà nước lãnh đạo, quản lý, nhân dân làm chủ',
      'Đảng lãnh đạo, Nhà nước quản lý, nhân dân làm chủ',
    ],
    correctOption: 3,
    explanation: 'Nguyên tắc vận hành là Đảng lãnh đạo, Nhà nước quản lý, nhân dân làm chủ.',
  },
  {
    id: 'q25',
    type: 'multiple-choice',
    prompt: 'Câu 25. Hồ Chí Minh được biết đến những từ “tự do, bình đẳng, bác ái” vào năm bao nhiêu tuổi?',
    options: ['13 tuổi', '17 tuổi', '12 tuổi', '20 tuổi'],
    correctOption: 1,
    explanation: 'Người thấy khẩu hiệu này khi học tại Trường Quốc học Huế khoảng 17 tuổi.',
  },
  {
    id: 'q26',
    type: 'multiple-choice',
    prompt: 'Câu 26. Tác phẩm “Đời sống mới” của Hồ Chí Minh xuất bản năm nào?',
    options: ['1948', '1947', '1945', '1946'],
    correctOption: 1,
    explanation: '“Đời sống mới” được xuất bản năm 1947.',
  },
  {
    id: 'q27',
    type: 'multiple-choice',
    prompt: 'Câu 27. Hồ Chí Minh dùng hình tượng nào dưới đây để chỉ Chủ nghĩa tư bản?',
    options: ['Con rắn độc', 'Con đỉa có hai vòi', 'Con chim đại bàng', 'Con bạch tuộc'],
    correctOption: 1,
    explanation: 'Người ví chủ nghĩa tư bản như “con đỉa có hai vòi” hút máu công nhân và nông dân.',
  },
  {
    id: 'q28',
    type: 'multiple-choice',
    prompt: 'Câu 28. Hồ Chí Minh soạn thảo bản Tuyên ngôn độc lập tại ngôi nhà số 48 Hàng Ngang vào thời gian nào?',
    options: [
      'Từ ngày 20 đến ngày 22/08/1945',
      'Từ ngày 28 đến ngày 29/08/1945',
      'Từ ngày 14 đến ngày 20/08/1945',
      'Từ ngày 22 đến ngày 25/08/1945',
    ],
    correctOption: 1,
    explanation: 'Tại 48 Hàng Ngang, Người hoàn thiện bản Tuyên ngôn trong những ngày 28 – 29/8/1945.',
  },
  {
    id: 'q29',
    type: 'multiple-choice',
    prompt: 'Câu 29. Trong “Sửa đổi lối làm việc” (10/1947), Hồ Chí Minh viết:',
    options: [
      'Lợi ích tạm thời làm cơ sở lợi ích lâu dài',
      'Lợi ích tạm thời nhất định phải phục tùng lợi ích lâu dài',
      'Lợi ích tạm thời phải hài hòa, thống nhất với lợi ích lâu dài',
      'Lợi ích tạm thời phải vì lợi ích lâu dài',
    ],
    correctOption: 1,
    explanation: 'Người khẳng định lợi ích trước mắt phải phục tùng lợi ích lâu dài của cách mạng.',
  },
  {
    id: 'q30',
    type: 'multiple-choice',
    prompt: 'Câu 30. Hồ Chí Minh đề cập đạo đức trong những quan hệ nào của con người?',
    options: ['Cả ba phương án trên', 'Đối với mình', 'Đối với người', 'Đối với việc'],
    correctOption: 0,
    explanation: 'Người nói về đạo đức đối với mình, đối với người và đối với việc.',
  },
];
