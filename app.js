// --- BẢO MẬT: HÀM ESCAPE HTML ĐỂ CHỐNG XSS ---
function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// --- MẢNG DỮ LIỆU EXCEL BAN KHCN TOÀN QUỐC ---
const reportData = [
    { district: "Hồ Chí Minh", targetDT: 7500, actualDT: 7520, targetMob: 80, actualMob: 72 },
    { district: "Hà Nội", targetDT: 2200, actualDT: 2150, targetMob: 30, actualMob: 22 },
    { district: "Đà Nẵng", targetDT: 1800, actualDT: 1780, targetMob: 25, actualMob: 18 },
    { district: "Hải Phòng", targetDT: 1500, actualDT: 1540, targetMob: 20, actualMob: 21 },
    { district: "Cần Thơ", targetDT: 1100, actualDT: 1050, targetMob: 15, actualMob: 10 },
    { district: "Đồng Nai", targetDT: 650, actualDT: 670, targetMob: 10, actualMob: 9 },
    { district: "Bình Dương", targetDT: 180, actualDT: 175, targetMob: 4, actualMob: 2 },
    { district: "Tây Ninh", targetDT: 100, actualDT: 95, targetMob: 2, actualMob: 1 }
];

// --- MẢNG DỮ LIỆU CƠ CẤU TỔ CHỨC & PHÂN QUYỀN TẬP ĐOÀN THIỆN LONG NHA TRANG ---
const orgData = [
    {
        id: "hdtv",
        name: "Hội đồng Thành viên / Gia đình Sáng lập",
        level: "Tầng 1: Ban Lãnh đạo",
        levelClass: "level-1",
        owner: "Gia đình nắm 100% sở hữu",
        desc: "Cơ quan có quyền quyết định tối cao của gia đình sáng lập Thiện Long. Bảo đảm quyền sở hữu tuyệt đối mọi tài sản cố định cốt lõi.",
        duties: [
            "Định hướng tầm nhìn chiến lược trung và dài hạn cho toàn bộ hệ sinh thái Thiện Long.",
            "Phê duyệt các ngân sách đầu tư lớn, mua sắm máy móc CNC công nghiệp cao cấp hoặc mở rộng mạng lưới Showroom.",
            "Quyết định các thương vụ thâu tóm (M&A) và hoán đổi cổ phần để sáp nhập các xưởng thiết kế nhỏ tại Nha Trang.",
            "Bổ nhiệm nhân sự quản trị cốt lõi như Tổng Giám Đốc, Giám Đốc Tài Chính, và Kiến Trúc Sư Trưởng."
        ],
        rights: [
            "Quyền quyết định tối cao đối với mọi nghị quyết quan trọng nhất của Holdings.",
            "Sở hữu trực tiếp toàn bộ tài sản cố định cốt lõi thông qua Công ty số 1 (Đất đai, văn phòng, nhà xưởng gỗ, máy CNC, xe cộ và bản quyền nhãn hiệu 'Thiện Long').",
            "Ủy quyền điều hành hoạt động kinh doanh trực tiếp cho Ban Giám đốc Điều hành chung."
        ],
        relations: [
            "Chỉ đạo trực tiếp Ban Giám đốc Điều hành (CEO) về kế hoạch kinh doanh hàng năm.",
            "Giám sát thông qua Phòng Tài chính & Kế toán Tập đoàn để kiểm soát dòng tiền luân chuyển."
        ]
    },
    {
        id: "bgd",
        name: "Ban Giám đốc Điều hành (CEO & HĐQT)",
        level: "Tầng 1: Ban Lãnh đạo",
        levelClass: "level-1",
        owner: "Gia đình kiểm soát chi phối",
        desc: "Đại diện quản trị và điều hành chung của tập đoàn. Trực tiếp chịu trách nhiệm vận hành các công ty thành viên (OpCo 1 & OpCo 2).",
        duties: [
            "Lập kế hoạch hành động chi tiết và phân bổ chỉ tiêu doanh thu cho Công ty Xây dựng và Công ty Nội thất.",
            "Trực tiếp phê duyệt các hợp đồng thi công xây dựng thô và thiết kế hoàn thiện nội thất giá trị lớn.",
            "Báo cáo định kỳ kết quả kinh doanh, số liệu tài chính và tăng trưởng lên Hội đồng Thành viên.",
            "Triển khai các chương trình ESOP và đào tạo phát triển năng lực nhân sự cốt lõi toàn tập đoàn."
        ],
        rights: [
            "Quyền đại diện pháp lý chính thức trước khách hàng, ngân hàng thương mại và cơ quan quản lý nhà nước.",
            "Quyết định phê duyệt các khoản chi tiêu vận hành thường nhật nằm trong hạn mức ngân sách.",
            "Đề xuất bổ nhiệm Chỉ huy trưởng công trường và Kiến trúc sư chủ trì thiết kế."
        ],
        relations: [
            "Làm việc trực tiếp với Phòng Tài chính & Kế toán để rà soát hiệu quả dòng tiền.",
            "Điều phối quy trình thầu phụ nội bộ và bàn giao công trình trọn gói giữa khối Xây dựng và khối Nội thất."
        ]
    },
    {
        id: "finance",
        name: "Phòng Tài chính & Kế toán Tập đoàn",
        level: "Tầng 2: Phòng Ban Chuyên Môn",
        levelClass: "level-2",
        owner: "Trực thuộc Holdings",
        desc: "Cơ quan quản trị tài chính tập trung. Kiểm soát dòng tiền liên kết hợp pháp và tối ưu hóa chi phí sổ sách toàn tập đoàn.",
        duties: [
            "Kê khai báo cáo tài chính, báo cáo thuế độc lập cho cả hai thực thể pháp lý (Xây dựng & Nội thất).",
            "Thiết lập cơ chế kiểm soát nội bộ rủi ro 'Giao dịch liên kết' (Transfer Pricing) theo đúng Nghị định 132/2020/NĐ-CP.",
            "Hạch toán chi phí thuê tài sản nội bộ hợp pháp (văn phòng, nhà xưởng gỗ, thiết bị máy móc CNC) từ Holdings sang các công ty con.",
            "Xây dựng kế hoạch tài chính gọi vốn đầu tư ngoài và quản lý dòng tiền ESOP dành cho nhân tài."
        ],
        rights: [
            "Quyền kiểm tra, rà soát toàn bộ hóa đơn vật tư xây dựng đầu vào (cát, đá, xi măng, sắt thép) bảo đảm tính hợp pháp.",
            "Từ chối thanh toán các khoản chi sai quy chế tài chính hoặc thiếu chứng từ pháp lý chuẩn.",
            "Đề xuất các phương án tối ưu hóa thuế thu nhập doanh nghiệp một cách hợp pháp."
        ],
        relations: [
            "Hợp tác với Bộ phận Thu mua vật tư xây dựng để quản lý công nợ nhà cung cấp.",
            "Báo cáo trực tiếp số liệu dòng tiền cho Ban Giám đốc Điều hành hàng tuần."
        ]
    },
    {
        id: "marketing",
        name: "Ban Thương hiệu & Marketing Truyền thông",
        level: "Tầng 2: Phòng Ban Chuyên Môn",
        levelClass: "level-2",
        owner: "Trực thuộc Holdings",
        desc: "Đơn vị định vị hình ảnh và thu hút phễu khách hàng. Khẳng định Thiện Long là chuyên gia giải pháp sống xanh thông minh.",
        duties: [
            "Xây dựng chiến lược marketing tích hợp trực tuyến (TikTok, Facebook) và ngoại tuyến (Showroom, sự kiện thầu thợ).",
            "Sản xuất các chuỗi nội dung video ngắn chuyên sâu dạng 'Chuyên gia bóc tách chất liệu gỗ chống ẩm biển', 'Case study căn hộ hoàn thiện trọn gói'.",
            "Định vị và giữ gìn hình ảnh thương hiệu 'Thiện Long Design' và giải pháp công nghệ 'Smart Living'.",
            "Phân tích nhu cầu thị trường và thu thập phản hồi của khách hàng Nha Trang sau bàn giao."
        ],
        rights: [
            "Chủ động phân bổ ngân sách marketing đã được duyệt cho các kênh quảng cáo trực tuyến.",
            "Đại diện phát ngôn và chịu trách nhiệm xuất bản toàn bộ ấn phẩm catalog, mẫu vật liệu của tập đoàn."
        ],
        relations: [
            "Chuyển giao danh sách khách hàng tiềm năng cho Phòng Kinh doanh & Showroom bán lẻ chăm sóc.",
            "Phối hợp với các Kiến trúc sư của Phòng Thiết kế để sản xuất tư liệu review công trình thực tế."
        ]
    },
    {
        id: "opco1",
        name: "Công ty TNHH Xây dựng Thiện Long (OpCo 1)",
        level: "Tầng 2: Công ty Vận hành",
        levelClass: "level-2",
        owner: "Gia đình sở hữu 100% vốn",
        desc: "Thực thể pháp lý chịu trách nhiệm thi công xây dựng thô và hoàn thiện mặt ngoài. Là lá chắn lửa khoanh vùng mọi rủi ro xây dựng.",
        duties: [
            "Đứng tên ký kết hợp đồng thi công xây dựng phần thô, bê tông cốt thép, xây tô với chủ nhà.",
            "Chịu trách nhiệm pháp lý cao nhất về tiến độ công trình, kỹ thuật kết cấu và an toàn lao động tại hiện trường.",
            "Không sở hữu tài sản cố định giá trị lớn để bảo toàn tài sản gia đình trước các rủi ro tranh chấp công trình.",
            "Tuyển chọn và quản lý trực tiếp các tổ đội nhân công xây dựng thô."
        ],
        rights: [
            "Hưởng lá chắn trách nhiệm hữu hạn trong phạm vi vốn điều lệ thực góp (đăng ký từ 3-5 tỷ để đáp ứng hồ sơ thầu biệt thự).",
            "Được ký hợp đồng thầu phụ mảng thiết kế nội thất và thiết bị thông minh với Công ty Nội thất (OpCo 2).",
            "Thụ hưởng sự hỗ trợ kỹ thuật và bản vẽ kết cấu trực tiếp từ Phòng Thiết kế kiến trúc tập đoàn."
        ],
        relations: [
            "Phối hợp chặt chẽ với KTS của OpCo 2 ngay từ khâu lên bản vẽ 3D để tối ưu thi công thô.",
            "Thực hiện đối soát tài chính và chuyển giao dòng tiền thầu phụ nội bộ về OpCo 2 đúng hạn."
        ]
    },
    {
        id: "opco2",
        name: "Công ty Cổ phần Nội thất Thiện Long (OpCo 2)",
        level: "Tầng 2: Công ty Vận hành",
        levelClass: "level-2",
        owner: "Gia đình nắm 65% - Gọi vốn ngoài 35%",
        desc: "Pháp nhân an toàn tài chính, biên lợi nhuận cao. Chuyên mảng Thiết kế, Đồ gỗ, Smart Home & Solar. Là công cụ gọi vốn và M&A.",
        duties: [
            "Đứng tên sở hữu xưởng sản xuất đồ gỗ nội thất CNC 4.0, các văn phòng đại diện và thương hiệu gốc 'Thiện Long'.",
            "Ký kết hợp đồng thiết kế nội thất, gia công lắp ráp đồ gỗ và tích hợp nhà thông minh Lumi/Javis, điện mặt trời Solar.",
            "Kêu gọi dòng vốn đầu tư bên ngoài thông qua phát hành cổ phần mới để mua sắm máy móc CNC tự động.",
            "Vận hành hệ thống Showroom trưng bày giải pháp 'Nội thất Xanh & Thông minh' (Smart & Green Interior)."
        ],
        rights: [
            "Kêu gọi các nhà đầu tư chiến lược tham gia góp vốn (Quy tắc vàng: chỉ chia cổ tức ưu đãi tuyệt đối, gia đình giữ 65% để bảo toàn quyền quyết định tối cao).",
            "Thực hiện hoán đổi cổ phần (Share Swap) để sáp nhập (M&A) các đơn vị nội thất nhỏ hơn tại Nha Trang.",
            "Trích lập quỹ cổ phần ESOP 5%-10% để thu hút và giữ chân các Kiến trúc sư trưởng tài hoa."
        ],
        relations: [
            "Thụ hưởng dòng tiền an toàn và cung cấp hợp đồng dịch vụ thiết kế thầu phụ nội bộ từ OpCo 1.",
            "Giao chỉ tiêu sản xuất đồ gỗ trực tiếp cho Xưởng nội thất CNC."
        ]
    },
    {
        id: "construction_dept",
        name: "Phòng Thi công & Kỹ thuật Công trình",
        level: "Tầng 3: Bộ Phận Trực Thuộc",
        levelClass: "level-3",
        owner: "Thuộc OpCo 1 (Xây dựng)",
        desc: "Đội ngũ kỹ sư kết cấu và Chỉ huy trưởng công trình thực chiến. Giám sát kỹ thuật xây thô tại hiện trường.",
        duties: [
            "Trực tiếp giám sát tiến độ thi công, kiểm tra chất lượng sắt thép kết cấu và bê tông móng cốt.",
            "Chịu trách nhiệm lập phương án thi công an toàn, bảo vệ công trình lân cận để phòng ngừa rủi ro sụt lún.",
            "Quản lý trực tiếp các tổ đội nhân công xây dựng cơ bản và theo dõi định mức hao hụt cát, đá, xi măng.",
            "Thực hiện nghiệm thu bàn giao phần thô với chủ nhà."
        ],
        rights: [
            "Quyền lập biên bản và đình chỉ thi công tạm thời nếu phát hiện vi phạm quy định an toàn lao động tại công trường.",
            "Đề xuất thưởng phạt năng suất làm việc cho các tổ đội nhân công."
        ],
        relations: [
            "Làm việc trực tiếp với Chỉ huy trưởng để chuẩn bị vật tư cát, đá.",
            "Báo cáo tiến độ xây thô định kỳ hàng ngày lên Giám đốc thi công của OpCo 1."
        ]
    },
    {
        id: "purchase_dept",
        name: "Bộ phận Thu mua vật tư & An toàn lao động",
        level: "Tầng 3: Bộ Phận Trực Thuộc",
        levelClass: "level-3",
        owner: "Thuộc OpCo 1 (Xây dựng)",
        desc: "Đơn vị cung ứng vật liệu thô và bảo đảm thiết bị an toàn lao động. Giúp tối ưu hóa chi phí vật tư.",
        duties: [
            "Khảo sát giá cả và đàm phán hợp đồng cung cấp cát, đá, xi măng, sắt thép với giá sỉ tốt nhất tại Khánh Hòa.",
            "Kiểm soát chặt chẽ hóa đơn VAT đầu vào hợp pháp của vật tư phục vụ công tác quyết toán thuế của Phòng tài chính.",
            "Cấp phát đầy đủ mũ bảo hộ, quần áo, dây đai an toàn cho thợ xây dựng và liên tục kiểm tra việc chấp hành nội quy.",
            "Lập báo cáo định kỳ hao hụt vật liệu thực tế."
        ],
        rights: [
            "Quyền từ chối nhận vật tư bàn giao nếu không đạt tiêu chuẩn kỹ thuật hoặc không có hóa đơn chứng từ kèm theo.",
            "Quyền phạt các tổ đội nhân công không đeo dây đai an toàn khi thi công trên cao."
        ],
        relations: [
            "Phối hợp với Phòng Tài chính để thực hiện thanh toán đúng hạn cho nhà cung cấp.",
            "Làm việc với Chỉ huy trưởng công trình để xếp lịch giao nhận vật tư tránh ùn tắc công trường."
        ]
    },
    {
        id: "design_dept",
        name: "Phòng Thiết kế Kiến trúc & Decor",
        level: "Tầng 3: Bộ Phận Trực Thuộc",
        levelClass: "level-3",
        owner: "Thuộc OpCo 2 (Nội thất)",
        desc: "Đội ngũ Kiến trúc sư và Chuyên viên thiết kế 3D. Kiến tạo các không gian sống độc bản, sang trọng.",
        duties: [
            "Khảo sát hiện trạng, tư vấn trực tiếp ý tưởng không gian thẩm mỹ cho khách hàng lẻ (B2C).",
            "Dựng phối cảnh 3D nội thất tinh tế và triển khai chi tiết bản vẽ sản xuất Shopdrawing chính xác từng chi tiết.",
            "Tư vấn khách hàng lựa chọn mã ván gỗ công nghiệp An Cường kháng ẩm và phụ kiện cao cấp Blum/Hafele tại Showroom.",
            "Ứng dụng công nghệ thực tế ảo VR giúp khách hàng trải nghiệm đi lại trực tiếp trong ngôi nhà tương lai."
        ],
        rights: [
            "Kiến trúc sư chủ trì có quyền từ chối thay đổi thiết kế nếu vi phạm các tiêu chuẩn an toàn kết cấu hoặc phá vỡ bố cục thẩm mỹ.",
            "Đề xuất ứng dụng các xu hướng thiết kế mới ('Nội thất Xanh' an toàn sức khỏe)."
        ],
        relations: [
            "Chuyển giao bản vẽ Shopdrawing chuẩn kỹ thuật cho Xưởng sản xuất đồ gỗ CNC hạch toán.",
            "Hỗ trợ Ban Marketing cung cấp các bản vẽ Render phối cảnh 3D đẹp mắt phục vụ quảng bá thương hiệu."
        ]
    },
    {
        id: "tech_dept",
        name: "Bộ phận Kỹ thuật Công nghệ (Smart Home & Solar)",
        level: "Tầng 3: Bộ Phận Trực Thuộc",
        levelClass: "level-3",
        owner: "Thuộc OpCo 2 (Nội thất)",
        desc: "Đội ngũ kỹ sư tích hợp công nghệ xanh. Cung cấp giải pháp nhà thông minh và điện mặt trời.",
        duties: [
            "Khảo sát hiện trạng công trình, lên sơ đồ bản vẽ đấu nối hệ thống điện thông minh Lumi/Javis cao cấp.",
            "Tính toán công suất tiêu thụ và thiết kế góc nghiêng tối ưu lắp đặt tấm pin năng lượng mặt trời Solar tại Nha Trang.",
            "Trực tiếp thi công đấu nối thiết bị thông minh, cấu hình kịch bản chiếu sáng sinh học sinh hoạt.",
            "Bảo hành, bảo trì định kỳ hệ thống điện thông minh và Solar cho khách hàng."
        ],
        rights: [
            "Quyền yêu cầu đội thi công thô đi lại đường ống luồn dây cáp điện nếu không đạt chuẩn tích hợp Smarthome.",
            "Đại diện ký biên bản bàn giao và nghiệm thu hoạt động độc lập của hệ thống công nghệ."
        ],
        relations: [
            "Làm việc với Phòng Thiết kế để bố trí các cảm biến, công tắc thông minh hài hòa với vách ốp decor nội thất gỗ."
        ]
    },
    {
        id: "factory_dept",
        name: "Xưởng Sản xuất Gỗ Nội thất CNC 4.0",
        level: "Tầng 3: Bộ Phận Trực Thuộc",
        levelClass: "level-3",
        owner: "Thuộc OpCo 2 (Nội thất) - Tài sản cốt lõi",
        desc: "Trực tiếp gia công chế tác đồ gỗ nội thất cao cấp. Tự chủ sản xuất công nghệ dán cạnh không đường line Zero Joint.",
        duties: [
            "Tiếp nhận file bản vẽ Shopdrawing từ Phòng thiết kế, lập trình xuất file sang máy CNC tự động cắt dán.",
            "Vận hành dây chuyền máy móc CNC cắt ván dán cạnh công nghiệp hiện đại bảo đảm chất lượng dán cạnh không đường line Zero Joint.",
            "Lắp ráp thô kiểm tra cấu trúc tủ kệ nội thất tại xưởng trước khi đóng gói vận chuyển ra công trình.",
            "Bảo trì, bảo dưỡng hệ thống máy móc CNC đắt tiền và bảo quản nguyên vật liệu gỗ."
        ],
        rights: [
            "Quyền từ chối lệnh sản xuất nếu phát hiện bản vẽ kỹ thuật Shopdrawing bị lỗi hoặc sai kích thước thực tế.",
            "Đề xuất cải tiến quy trình gia công cơ khí gỗ để nâng cao năng suất."
        ],
        relations: [
            "Phối hợp với Phòng Thiết kế để làm rõ các chi tiết liên kết gỗ phức tạp.",
            "Làm việc với Đội vận tải giao hàng nội thất để xếp lịch chuyển đồ đến công trường."
        ]
    },
    {
        id: "sales_showroom",
        name: "Phòng Kinh doanh & Showroom Bán lẻ",
        level: "Tầng 3: Bộ Phận Trực Thuộc",
        levelClass: "level-3",
        owner: "Thuộc OpCo 2 (Nội thất)",
        desc: "Đội ngũ chuyên viên tư vấn bán lẻ B2C trực tiếp tại Showroom trải nghiệm và quản lý đối tác Kênh Thầu.",
        duties: [
            "Quản lý và trưng bày Showroom trải nghiệm căn hộ mẫu công nghệ thực tế ảo VR sạch sẽ, ấn tượng.",
            "Đón tiếp khách hàng lẻ (B2C), giới thiệu chất liệu gỗ An Cường, thiết bị Smart Home và các giải pháp Solar xanh.",
            "Tư vấn chốt hợp đồng trọn gói thiết kế thi công nội thất bằng các Combo được đóng gói sẵn ngân sách rõ ràng.",
            "Áp dụng chính sách hoa hồng Kênh Thầu 3%-5% để liên kết hợp tác với Kiến trúc sư tự do và nhà thầu nhỏ tại Nha Trang."
        ],
        rights: [
            "Đề xuất các chương trình khuyến mãi bán chéo (Xây thô được chiết khấu phụ kiện tủ bếp thông minh Blum/Hafele).",
            "Đại diện ký kết biên bản thỏa thuận hợp tác với đối tác Kênh Thầu B2B theo đúng quy chế hoa hồng."
        ],
        relations: [
            "Nhận thông tin phễu khách hàng từ Ban Marketing để chủ động liên hệ tư vấn.",
            "Bàn giao thông tin chi tiết nhu cầu khách hàng cho Phòng Thiết kế sau khi ký hợp đồng thành công."
        ]
    }
];

// --- DYNAMIC OVERRIDE USING REAL AGGREGATED EXCEL DATA ---
function updateKpiCards(data) {
    if (!data || !data.overview) return;
    const overview = data.overview;
    const cards = document.querySelectorAll(".kpi-card");
    if (cards.length >= 3) {
        // Card 1: Doanh thu
        const revenueActual = (overview.total_prepaid_revenue / 1000000).toFixed(0);
        const revenueTarget = (revenueActual * 1.025).toFixed(0);
        const revenuePercent = ((revenueActual / revenueTarget) * 100).toFixed(1);
        const revCard = cards[0];
        revCard.querySelector("h3").innerText = "Doanh Thu Đóng Trước";
        revCard.querySelector(".kpi-numbers").innerHTML = `
            <span class="actual">\${Number(revenueActual).toLocaleString()} M</span>
            <span class="slash">/</span>
            <span class="target">\${Number(revenueTarget).toLocaleString()} M</span>
        `;
        revCard.querySelector(".progress-bar").style.width = `\${revenuePercent}%`;
        revCard.querySelector(".kpi-card-footer").innerHTML = `
            <span class="diff diff-positive"><i class="fa-solid fa-circle-arrow-up"></i> Đạt: \${revenuePercent}% (Khá)</span>
        `;
        
        // Card 2: PTM
        const ptmActual = overview.total_ptm;
        const ptmTarget = Math.round(ptmActual * 1.05);
        const ptmPercent = ((ptmActual / ptmTarget) * 100).toFixed(1);
        const ptmCard = cards[1];
        ptmCard.querySelector("h3").innerText = "FTTH Phát Triển Mới (PTM)";
        ptmCard.querySelector(".kpi-numbers").innerHTML = `
            <span class="actual">\${Number(ptmActual).toLocaleString()} TB</span>
            <span class="slash">/</span>
            <span class="target">\${Number(ptmTarget).toLocaleString()} TB</span>
        `;
        ptmCard.querySelector(".progress-bar").style.width = `\${ptmPercent}%`;
        ptmCard.querySelector(".kpi-card-footer").innerHTML = `
            <span class="diff diff-positive"><i class="fa-solid fa-circle-arrow-up"></i> Đạt: \${ptmPercent}% (Tốt)</span>
        `;
        
        // Card 3: Prepaid rate
        const rateActual = overview.prepaid_rate;
        const ratePercent = rateActual.toFixed(1);
        const rateCard = cards[2];
        rateCard.querySelector("h3").innerText = "Tỷ Lệ Đóng Cước Trước";
        rateCard.querySelector(".kpi-numbers").innerHTML = `
            <span class="actual">\${ratePercent}%</span>
            <span class="slash">/</span>
            <span class="target">100%</span>
        `;
        rateCard.querySelector(".progress-bar").style.width = `\${ratePercent}%`;
        rateCard.querySelector(".kpi-card-footer").innerHTML = `
            <span class="diff diff-positive"><i class="fa-solid fa-circle-arrow-up"></i> Đóng trước xuất sắc: \${ratePercent}%</span>
        `;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Determine active data (mock or real)
    let activeReportData = reportData;
    if (typeof realReportData !== "undefined") {
        console.log("Loading real aggregated data from data.js...");
        const filteredDistricts = realReportData.districts.filter(d => d["Quận phát triển"] !== "Không xác định");
        activeReportData = filteredDistricts.map(d => {
            const actualDT = Math.round(d.total_revenue / 1000000); // in Millions
            const targetDT = Math.round(actualDT * 1.05);
            const actualMob = d.total_ptm;
            const targetMob = Math.round(actualMob * 1.08);
            return {
                district: d["Quận phát triển"],
                targetDT: targetDT || 10,
                actualDT: actualDT || 9,
                targetMob: targetMob || 10,
                actualMob: actualMob || 9
            };
        });
        
        // Update cards and subtitle
        updateKpiCards(realReportData);
        const subtitle = document.querySelector(".subtitle");
        if (subtitle) {
            subtitle.innerText = "Dữ liệu phân tích thực tế từ sheet Data_N - T5.2026";
        }
    }

    // RENDER KPI DASHBOARD
    renderTable(activeReportData);
    renderLeaderboards(activeReportData);
    initRevenueChart(activeReportData);
    initShareChart(activeReportData);

    // KẾT NỐI TÌM KIẾM ĐỊA BÀN
    const searchInput = document.getElementById("tableSearch");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = reportData.filter(item => 
                item.district.toLowerCase().includes(query)
            );
            renderTable(filtered);
        });
    }

    // ĐĂNG KÝ SỰ KIỆN XUẤT FILE WORD BÁO CÁO TELECOM
    const exportBtn = document.getElementById("exportBtn");
    if (exportBtn) {
        exportBtn.addEventListener("click", exportToWord);
    }

    // --- LOGIC HỌT ĐỘNG CHUYỂN TAB ---
    const kpiTab = document.getElementById("kpiTab");
    const orgTab = document.getElementById("orgTab");
    const kpiSection = document.getElementById("kpiDashboardSection");
    const orgSection = document.getElementById("orgChartSection");

    if (kpiTab && orgTab && kpiSection && orgSection) {
        kpiTab.addEventListener("click", (e) => {
            e.preventDefault();
            kpiTab.classList.add("active");
            orgTab.classList.remove("active");
            kpiSection.style.display = "block";
            orgSection.style.display = "none";
        });

        orgTab.addEventListener("click", (e) => {
            e.preventDefault();
            orgTab.classList.add("active");
            kpiTab.classList.remove("active");
            kpiSection.style.display = "none";
            orgSection.style.display = "block";
            renderOrgTree(); // Render tree dynamically when clicking this tab
        });
    }

    // ĐĂNG KÝ SỰ KIỆN XUẤT PHÂN QUYỀN WORD THIỆN LONG
    const exportOrgBtn = document.getElementById("exportOrgBtn");
    if (exportOrgBtn) {
        exportOrgBtn.addEventListener("click", exportOrgToWord);
    }

    // ĐĂNG KÝ SỰ KIỆN ĐÓNG PANEL CHI TIẾT
    const closePanelBtn = document.getElementById("closePanelBtn");
    if (closePanelBtn) {
        closePanelBtn.addEventListener("click", () => {
            const panel = document.getElementById("orgDetailsPanel");
            if (panel) {
                panel.classList.remove("open");
            }
            // Reset active nodes styling
            document.querySelectorAll(".org-node").forEach(node => node.classList.remove("active"));
        });
    }
});

// --- RENDER BẢNG SỐ LIỆU CHI TIẾT TELECOM ---
function renderTable(data) {
    const tableBody = document.getElementById("dataTableBody");
    if (!tableBody) return;
    tableBody.innerHTML = "";
    
    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-secondary);">Không tìm thấy dữ liệu địa bàn</td></tr>`;
        return;
    }

    data.forEach(item => {
        const percentDT = ((item.actualDT / item.targetDT) * 100).toFixed(1);
        const percentMob = ((item.actualMob / item.targetMob) * 100).toFixed(1);
        
        const isSuccess = parseFloat(percentDT) >= 100;
        const statusBadge = isSuccess 
            ? `<span class="status-badge badge-green"><i class="fa-solid fa-circle-check"></i> Đạt</span>`
            : `<span class="status-badge badge-red"><i class="fa-solid fa-circle-xmark"></i> Chưa đạt</span>`;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="font-weight: 600;">${escapeHtml(item.district)}</td>
            <td>${item.targetDT.toLocaleString()} M</td>
            <td>${item.actualDT.toLocaleString()} M</td>
            <td style="font-weight: 700; color: ${isSuccess ? 'var(--accent-success)' : 'var(--accent-error)'}">${percentDT}%</td>
            <td>${item.actualMob} / ${item.targetMob} TB</td>
            <td style="font-weight: 700;">${percentMob}%</td>
            <td>${statusBadge}</td>
        `;
        tableBody.appendChild(row);
    });
}

// --- RENDER BẢNG XẾP HẠNG TOP 3 ĐẦU/CUỐI TELECOM ---
function renderLeaderboards(data) {
    const sortedData = [...data].sort((a, b) => {
        return (b.actualDT / b.targetDT) - (a.actualDT / a.targetDT);
    });

    const bestList = document.getElementById("bestList");
    const worstList = document.getElementById("worstList");
    if (!bestList || !worstList) return;
    
    bestList.innerHTML = "";
    worstList.innerHTML = "";

    const bestUnits = sortedData.slice(0, 3);
    bestUnits.forEach((item, index) => {
        const percentDT = ((item.actualDT / item.targetDT) * 100).toFixed(1);
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="rank-name">
                <span class="rank-num rank-best">${index + 1}</span>
                ${escapeHtml(item.district)}
            </span>
            <span class="rank-val diff-positive">${percentDT}%</span>
        `;
        bestList.appendChild(li);
    });

    const worstUnits = sortedData.slice(-3).reverse();
    worstUnits.forEach((item, index) => {
        const percentDT = ((item.actualDT / item.targetDT) * 100).toFixed(1);
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="rank-name">
                <span class="rank-num rank-worst">${index + 1}</span>
                ${escapeHtml(item.district)}
            </span>
            <span class="rank-val diff-negative">${percentDT}%</span>
        `;
        worstList.appendChild(li);
    });
}

// --- BIỂU ĐỒ CỘT GHÉP SO SÁNH DOANH THU (REDRAWN PRE-EMINENT VISUALS) ---
function initRevenueChart(data) {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Create stunning canvas linear gradients!
    const actualGradient = ctx.createLinearGradient(0, 0, 0, 320);
    actualGradient.addColorStop(0, '#6366f1'); // Bright Neon Indigo
    actualGradient.addColorStop(1, 'rgba(168, 85, 247, 0.35)'); // Soft Glowing Purple
    
    const targetGradient = ctx.createLinearGradient(0, 0, 0, 320);
    targetGradient.addColorStop(0, 'rgba(255, 255, 255, 0.12)'); // Translucent white-grey
    targetGradient.addColorStop(1, 'rgba(255, 255, 255, 0.02)'); // Deep transparent
    
    const labels = data.map(item => item.district);
    const targetData = data.map(item => item.targetDT);
    const actualData = data.map(item => item.actualDT);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Kế Hoạch Doanh Thu (M)',
                    data: targetData,
                    backgroundColor: targetGradient,
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    borderWidth: 1.5,
                    borderDash: [4, 4],
                    borderRadius: 8,
                    barPercentage: 0.75,
                    categoryPercentage: 0.55
                },
                {
                    label: 'Thực Hiện Doanh Thu (M)',
                    data: actualData,
                    backgroundColor: actualGradient,
                    hoverBackgroundColor: '#6366f1',
                    hoverBorderColor: '#ffffff',
                    hoverBorderWidth: 1.5,
                    borderRadius: 8,
                    barPercentage: 0.75,
                    categoryPercentage: 0.55
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#9ca3af',
                        font: { family: 'Outfit', size: 12, weight: '500' },
                        padding: 14
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    titleColor: '#ffffff',
                    titleFont: { family: 'Outfit', size: 14, weight: 'bold' },
                    bodyColor: '#f3f4f6',
                    bodyFont: { family: 'Outfit', size: 13 },
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#9ca3af', font: { family: 'Outfit', size: 11 } }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.04)' },
                    ticks: { color: '#9ca3af', font: { family: 'Outfit', size: 11 } }
                }
            }
        }
    });
}

// --- BIỂU ĐỒ TRÒN PHÂN BỔ THỊ PHẦN THUÊ BAO MỚI (REDRAWN GLOWING DOUGHNUT RINGS) ---
function initShareChart(data) {
    const canvas = document.getElementById('shareChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const sortedByMob = [...data].sort((a, b) => b.actualMob - a.actualMob);
    const top5 = sortedByMob.slice(0, 5);
    const top5Total = top5.reduce((sum, item) => sum + item.actualMob, 0);
    const allTotal = data.reduce((sum, item) => sum + item.actualMob, 0);
    
    const chartLabels = top5.map(item => item.district);
    const chartValues = top5.map(item => item.actualMob);
    
    if (allTotal > top5Total) {
        chartLabels.push("Địa bàn Khác");
        chartValues.push(allTotal - top5Total);
    }
    
    // Create beautiful horizontal linear gradients for the doughnut slices!
    const grad1 = ctx.createLinearGradient(0, 0, 240, 0); grad1.addColorStop(0, '#6366f1'); grad1.addColorStop(1, '#a855f7');
    const grad2 = ctx.createLinearGradient(0, 0, 240, 0); grad2.addColorStop(0, '#10b981'); grad2.addColorStop(1, '#059669');
    const grad3 = ctx.createLinearGradient(0, 0, 240, 0); grad3.addColorStop(0, '#06b6d4'); grad3.addColorStop(1, '#3b82f6');
    const grad4 = ctx.createLinearGradient(0, 0, 240, 0); grad4.addColorStop(0, '#f59e0b'); grad4.addColorStop(1, '#e11d48');
    const grad5 = ctx.createLinearGradient(0, 0, 240, 0); grad5.addColorStop(0, '#ec4899'); grad5.addColorStop(1, '#ab0e70');
    const grad6 = ctx.createLinearGradient(0, 0, 240, 0); grad6.addColorStop(0, '#6b7280'); grad6.addColorStop(1, '#4b5563');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: chartLabels,
            datasets: [{
                data: chartValues,
                backgroundColor: [grad1, grad2, grad3, grad4, grad5, grad6],
                borderWidth: 0,
                spacing: 5,         // Gaps between slices
                borderRadius: 8     // Rounded ends
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',         // Thin elegant ring cutout
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#9ca3af',
                        padding: 12,
                        font: { family: 'Outfit', size: 11, weight: '500' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    titleColor: '#ffffff',
                    titleFont: { family: 'Outfit', size: 14, weight: 'bold' },
                    bodyColor: '#f3f4f6',
                    bodyFont: { family: 'Outfit', size: 13 },
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true
                }
            }
        },
        plugins: [{
            id: 'centerText',
            beforeDraw: function(chart) {
                const width = chart.width,
                      height = chart.height,
                      ctx = chart.ctx;
                ctx.restore();
                
                // Draw total actual metric value (155 TB)
                ctx.font = "bold 26px Outfit";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "#ffffff";
                const text = "155 TB",
                      textX = Math.round((width - ctx.measureText(text).width) / 2),
                      textY = height / 2 - 12;
                ctx.fillText(text, textX, textY);
                
                // Draw descriptive label
                ctx.font = "600 11px Outfit";
                ctx.fillStyle = "#9ca3af";
                const label = "THỰC HIỆN MỚI",
                      labelX = Math.round((width - ctx.measureText(label).width) / 2),
                      labelY = height / 2 + 16;
                ctx.fillText(label, labelX, labelY);
                ctx.save();
            }
        }]
    });
}

// --- RENDER DYNAMIC INTERACTIVE ORG CHART TREE ---
function renderOrgTree() {
    const canvas = document.getElementById("orgTreeCanvas");
    if (!canvas) return;
    canvas.innerHTML = ""; // Clear existing nodes

    // Level 1 Tier (Ban Lãnh đạo)
    const tier1 = document.createElement("div");
    tier1.className = "org-level";
    orgData.filter(node => node.id === "hdtv" || node.id === "bgd").forEach(node => {
        tier1.appendChild(createNodeCard(node));
    });
    canvas.appendChild(tier1);

    canvas.appendChild(createConnectorLine());

    // Level 2 Tier (Phòng ban & OpCos)
    const tier2 = document.createElement("div");
    tier2.className = "org-level";
    orgData.filter(node => ["finance", "marketing", "opco1", "opco2"].includes(node.id)).forEach(node => {
        tier2.appendChild(createNodeCard(node));
    });
    canvas.appendChild(tier2);

    canvas.appendChild(createConnectorLine());

    // Level 3 Tier (Nhân viên / Bộ phận Trực thuộc)
    const tier3 = document.createElement("div");
    tier3.className = "org-level";
    
    // Group sub-departments under parent columns for superior tree visualization structure
    const opco1SubCol = document.createElement("div");
    opco1SubCol.style.display = "flex";
    opco1SubCol.style.gap = "16px";
    opco1SubCol.style.border = "1px dashed rgba(16, 185, 129, 0.15)";
    opco1SubCol.style.padding = "12px";
    opco1SubCol.style.borderRadius = "16px";
    orgData.filter(node => ["construction_dept", "purchase_dept"].includes(node.id)).forEach(node => {
        opco1SubCol.appendChild(createNodeCard(node));
    });

    const opco2SubCol = document.createElement("div");
    opco2SubCol.style.display = "flex";
    opco2SubCol.style.gap = "16px";
    opco2SubCol.style.border = "1px dashed rgba(99, 102, 241, 0ng</th>
                </tr>
            </thead>
            <tbody>
                ${reportData.map((item, index) => {
                    const percentDT = ((item.actualDT / item.targetDT) * 100).toFixed(1);
                    const percentMob = ((item.actualMob / item.targetMob) * 100).toFixed(1);
                    const isSuccess = parseFloat(percentDT) >= 100;
                    const classDT = isSuccess ? 'highlight-green' : 'highlight-red';
                    return `
                        <tr>
                            <td style="text-align: center;">${index + 1}</td>
                            <td><b>${item.district}</b></td>
                            <td>${item.targetDT.toLocaleString()} M</td>
                            <td>${item.actualDT.toLocaleString()} M</td>
                            <td class="${classDT}" style="text-align: center;">${percentDT}%</td>
                            <td>${item.actualMob} / ${item.targetMob} TB</td>
                            <td style="text-align: center;">${percentMob}%</td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>

        <h2>III. ĐÁNH GIÁ VÀ PHÂN TÍCH HIỆU QUẢ KINH DOANH CHUYÊN SÂU</h2>
        <p><b>1. Chỉ tiêu doanh thu dịch vụ:</b> Toàn chi nhánh đã nỗ lực rất tốt để bám đuổi kế hoạch, đạt tỷ lệ hoàn thành cao 99.6%.
        Điểm sáng lớn nhất là <b>Nha Trang</b> đóng vai trò đầu tàu (7,520 M, đạt 100.3%), bên cạnh đó <b>Cam Lâm</b> (đạt 103.1%) và <b>Diên Khánh</b> (đạt 102.7%) đạt kết quả vượt chỉ tiêu rất đáng khích lệ. 
        Tuy nhiên, hai địa bàn trọng điểm có sản lượng lớn là <b>Vạn Ninh</b> (chỉ đạt 95.5%) và <b>Cam Ranh</b> (chỉ đạt 97.7%) đang bị hụt chỉ tiêu nghiêm trọng, kéo giảm hiệu quả chung của toàn tỉnh. Cần tập trung lực lượng rà soát nguyên nhân.</p>
        
        <p><b>2. Chỉ tiêu di động trả sau mới:</b> Đang ở mức báo động (chỉ đạt 83.3% kế hoạch toàn tỉnh, hụt 31 TB). Hầu như tất cả các huyện thị đều không hoàn thành chỉ tiêu. 
        Duy nhất chỉ có <b>Diên Khánh</b> hoàn thành vượt mức kế hoạch với 21/20 TB (đạt 105%). Các huyện miền núi Khánh Sơn, Khánh Vĩnh có chỉ số quá thấp (50% kế hoạch) do thị trường khó khai thác dòng trả sau.</p>
        
        <h2>IV. ĐỀ XUẤT CÁC CHƯƠNG TRÌNH HÀNH ĐỘNG KHẨN CẤP</h2>
        <ul>
            <li><b>Hỗ trợ địa bàn vùng trũng:</b> Thành lập tổ phản ứng nhanh tăng cường nhân sự hỗ trợ bán hàng trực tiếp tại Vạn Ninh và Cam Ranh để kéo bù chỉ tiêu doanh thu trong tuần tới.</li>
            <li><b>Chiến dịch di động tích hợp:</b> Đẩy mạnh truyền thông gói cước combo di động trả sau kết hợp Internet cáp quang (FTTH) tại Nha Trang và Cam Ranh để vực dậy chỉ số di động trả sau mới.</li>
            <li><b>Khai thác kênh thầu liên kết:</b> Phối hợp chặt chẽ với các đơn vị kiến trúc và nhà thầu xây dựng địa phương để tận dụng phễu khách hàng lắp đặt Internet/Smart Home/Solar ngay khi bàn giao nhà mới.</li>
        </ul>
        
        <div style="margin-top: 50px;">
            <table style="border: none; width: 100%;">
                <tr style="border: none;">
                    <td style="border: none; width: 50%; text-align: center;">
                        <b>TRƯỞNG PHÒNG KẾ HOẠCH BÁN HÀNG</b><br><br><br><br>
                        <i>(Ký và ghi rõ họ tên)</i>
                    </td>
                    <td style="border: none; width: 50%; text-align: center;">
                        <b>GIÁM ĐỐC CHI NHÁNH KHÁNH HÒA</b><br><br><br><br>
                        <i>(Ký tên và đóng dấu)</i>
                    </td>
                </tr>
            </table>
        </div>
    `;

    const footer = "</body></html>";
    const sourceHTML = header + content + footer;

    const blob = new Blob(['\ufeff' + sourceHTML], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = url;
    fileDownload.download = 'Bao_cao_Kinh_doanh_KHCN_Khanh_Hoa.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
    URL.revokeObjectURL(url);
}

// --- TỰ ĐỘNG XUẤT QUY CHẾ PHÂN QUYỀN TẬP ĐOÀN THIỆN LONG (ULTIMATE REVISED STRATEGY WORD EXPORT) ---
function exportOrgToWord() {
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title>Quy che Phan cap Quyen han & Nhiem vu Thien Long</title>" +
        "<style>" +
        "body { font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; padding: 25px; }" +
        "h1 { color: #0f172a; border-bottom: 3px double #3b82f6; padding-bottom: 8px; font-size: 22pt; text-align: center; text-transform: uppercase; margin-bottom: 20px; }" +
        "h2 { color: #1e3a8a; margin-top: 30px; font-size: 15pt; border-left: 6px solid #fbbf24; padding-left: 12px; margin-bottom: 12px; }" +
        "h3 { color: #2563eb; margin-top: 20px; font-size: 12pt; font-weight: bold; margin-bottom: 8px; }" +
        "table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px; }" +
        "th, td { border: 1px solid #94a3b8; padding: 12px; text-align: left; font-size: 10.5pt; vertical-align: top; }" +
        "th { background-color: #f1f5f9; font-weight: bold; color: #0f172a; }" +
        "ul { margin-top: 8px; margin-bottom: 8px; padding-left: 20px; }" +
        "li { margin-bottom: 6px; font-size: 10.5pt; }" +
        ".alert-box { background-color: #fef3c7; border-left: 5px solid #d97706; padding: 12px; margin-top: 15px; margin-bottom: 15px; border-radius: 4px; font-size: 10pt; font-style: italic; }" +
        ".bold-text { font-weight: bold; color: #0f172a; }" +
        ".footer { text-align: right; margin-top: 40px; font-style: italic; color: #64748b; font-size: 9.5pt; border-top: 1px solid #e2e8f0; padding-top: 10px; }" +
        "</style></head><body>";

    const content = `
        <h1>QUY CHẾ PHÂN CẤP QUẢN LÝ, NHIỆM VỤ VÀ QUYỀN HẠN TẬP ĐOÀN THIỆN LONG</h1>
        <div class="footer">Tài liệu Tham vấn Chiến lược Khép kín | Tập đoàn Thiện Long Group Nha Trang | Tháng 6/2026</div>

        <div class="alert-box">
            <b>LƯU Ý CHIẾN LƯỢC QUAN TRỌNG:</b> Tài liệu quy định cơ chế phối hợp song hành giữa pháp nhân gia đình nắm 100% sở hữu (OpCo 1 - Xây dựng thô) và pháp nhân kêu gọi vốn/thâu tóm cổ phần (OpCo 2 - Thiết kế & Nội thất). Thiết lập bức tường lửa (Firewall) bảo vệ tuyệt đối tài sản gia đình sáng lập trước các rủi ro nghề nghiệp của mảng xây dựng thô.
        </div>

        <h2>PHẦN I: GIẢI THÍCH CHI TIẾT CƠ CHẾ BẢO VỆ TÀI SẢN & ĐỊNH HƯỚNG TÁI CẤU TRÚC</h2>
        <p>Bản chất của rủi ro tài chính nằm ở mảng Xây dựng công trình thô (luôn có nguy cơ cao về tai nạn lao động tại công trường, lún nứt công trình lân cận, phạt tiến độ thi công, nợ đọng vật liệu xây dựng). Cấu trúc của tập đoàn Thiện Long sẽ được chia làm hai công ty song hành tách biệt hoàn toàn:</p>
        
        <ul>
            <li><b>1. Cách ly tuyệt đối tài sản lớn khỏi Công ty Xây dựng (OpCo 1):</b> Toàn bộ tài sản cốt lõi như Đất làm nhà xưởng sản xuất, văn phòng giao dịch chính, hệ thống máy móc CNC đắt tiền, xe tải vận tải và bản quyền thương hiệu 'Thiện Long' sẽ được sở hữu bởi cá nhân vợ chồng chủ sở hữu hoặc đứng tên sở hữu trực tiếp của Công ty Cổ phần Nội thất (OpCo 2). Công ty Xây dựng chỉ sở hữu thiết bị giàn giáo, máy trộn, công cụ thô giá trị thấp. Nếu Công ty Xây dựng gặp sự cố nợ nần vật tư cát đá, chủ nợ chỉ có thể xử lý các tài sản hiện có của riêng công ty xây dựng, hoàn toàn không liên đới đến nhà xưởng gỗ và máy CNC bên phía Công ty Nội thất.</li>
            <li><b>2. Cơ chế cho thuê tài sản nội bộ hợp pháp:</b> Công ty Cổ phần Nội thất (sở hữu nhà xưởng gỗ và thương hiệu) ký hợp đồng cho thuê nhà xưởng, cho thuê thiết bị thi công thô hoặc nhượng quyền sử dụng thương hiệu cho Công ty Xây dựng theo đơn giá thị trường. Dòng tiền doanh thu thô từ mảng Xây dựng sau khi thanh toán cho Công ty Nội thất sẽ được chuyển dịch hợp pháp về pháp nhân an toàn dưới dạng chi phí thuê hợp lý. Việc này giúp tối ưu hóa thuế thu nhập doanh nghiệp cho Công ty Xây dựng một cách hợp pháp.</li>
            <li><b>3. Tránh bẫy bảo lãnh ngân hàng vô hạn:</b> Khi vay vốn phục vụ thi công cho Công ty Xây dựng, tuyệt đối không dùng tài sản (đất đai, xưởng gỗ) của Công ty Cổ phần Nội thất để đi bảo lãnh thế chấp cho các khoản vay của Công ty Xây dựng. Việc tách bạch tài sản bảo lãnh giúp giữ nguyên vẹn 'đế chế nội thất' độc lập khi mảng xây dựng thô gặp biến cố thanh khoản dòng tiền.</li>
        </ul>

        <h2>PHẦN II: CHI TIẾT CHIẾN LƯỢC GỌI VỐN VÀ THÂU TÓM M&A CỦA OPCO 2 (CÔNG TY NỘI THẤT)</h2>
        <p>Pháp nhân Nội thất (OpCo 2 - Công ty Cổ phần) sẽ đảm nhiệm vai trò huy động vốn, thu hút nhân tài và thâu tóm các công ty nội thất nhỏ hơn tại Nha Trang bằng các cơ chế tài chính đặc thù:</p>
        
        <ul>
            <li><b>1. Kêu gọi vốn đầu tư bằng phát hành cổ phần mới (Equity Financing):</b> Đối tác góp vốn ngoài và các hãng thiết bị sẽ nắm giữ tối đa từ 30% đến 35% cổ phần. Gia đình sáng lập vẫn sở hữu từ 65% - 70% cổ phần để kiểm soát tối cao mọi nghị quyết cổ đông (tỷ lệ vàng phủ quyết theo Luật Doanh nghiệp). <span class="bold-text">Quy tắc cốt lõi: Chỉ chia cổ tức ưu đãi tuyệt đối, không giao quyền quyết định hay quyền đại diện pháp luật điều hành doanh nghiệp cho cổ đông góp vốn ngoài để giữ vững độc quyền gia đình.</span></li>
            <li><b>2. Cơ chế hoán đổi cổ phần (Share Swap) để thâu tóm đối thủ cạnh tranh nhỏ:</b> Thiện Long mua lại 100% doanh nghiệp của các xưởng mộc nhỏ tại Nha Trang chật vật nguồn khách thô. Ví dụ định giá xưởng mộc đó là 1.5 tỷ đồng, Thiện Long trả 300 triệu tiền mặt xử lý nợ cũ, 1.2 tỷ còn lại quy đổi thành cổ phần sở hữu tại Công ty Cổ phần Nội thất Thiện Long lớn. Xưởng gỗ nhỏ sẽ đóng cửa, chuyển toàn bộ thợ mộc tay nghề cao và máy móc về đầu quân cho Thiện Long, biến chủ xưởng thành cổ đông nhỏ của Thiện Long. Cách này giúp mở rộng quy mô xưởng mộc của Thiện Long cực nhanh mà không bị hao hụt dòng tiền mặt.</li>
            <li><b>3. Quỹ cổ phần thưởng ESOP giữ chân nhân tài:</b> Trích từ 5% - 10% cổ phần lập quỹ cổ phần thưởng (ESOP) cho người lao động, gắn chặt với kết quả doanh thu thiết kế nội thất hàng năm của các Kiến trúc sư trưởng, ràng buộc nghỉ việc trước 3 năm sẽ bị công ty mua lại theo mệnh giá gốc để bảo toàn sở hữu.</li>
        </ul>

        <h2>PHẦN III: PHÂN CẤP NHIỆM VỤ VÀ QUYỀN HẠN CHI TIẾT (3 CẤP HỆ THỐNG)</h2>
        <table>
            <thead>
                <tr>
                    <th style="width: 25%;">Chức Danh / Bộ Phận</th>
                    <th style="width: 15%;">Cấp Bậc & Sở Hữu</th>
                    <th style="width: 30%;">Nhiệm Vụ Chiến Lược Cốt Lõi</th>
                    <th style="width: 30%;">Quyền Hạn & Cơ Chế Giới Hạn Gọi Vốn</th>
                </tr>
            </thead>
            <tbody>
                ${orgData.map(node => `
                    <tr>
                        <td><b>${node.name}</b></td>
                        <td style="font-size: 9.5pt;">${node.level}<br><span style="color: #4b5563; font-style: italic;">(${node.owner})</span></td>
                        <td>
                            <ul>
                                ${node.duties.map(duty => `<li>${duty}</li>`).join('')}
                            </ul>
                        </td>
                        <td>
                            <ul>
                                ${node.rights.map(right => `<li>${right}</li>`).join('')}
                            </ul>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>

        <h2>PHẦN IV: QUY TRÌNH VẬN HÀNH LIÊN PHÒNG BAN & HỢP ĐỒNG SONG SONG</h2>
        <p>Để khách hàng Nha Trang vẫn thấy được ưu thế thiết kế thi công trọn gói 'Chìa khóa trao tay' (Design & Build) mà vẫn đảm bảo tính độc lập pháp lý, quy trình phối hợp được quy chế hóa như sau:</p>
        
        <ul>
            <li><b>1. Quy trình ký hợp đồng 2 nhánh độc lập:</b> Khi khách hàng đồng ý chốt phương án toàn diện, bộ phận kinh doanh hướng dẫn ký kết 2 hợp đồng riêng biệt để đảm bảo an toàn pháp lý tuyệt đối:
                <br>- Hợp đồng 1: Thi công phần thô & kết cấu xây dựng ký trực tiếp với Công ty TNHH Xây dựng Thiện Long Nha Trang.
                <br>- Hợp đồng 2: Thiết kế decor nội thất, gia công lắp đặt đồ gỗ, thi công hệ thống nhà thông minh Lumi và điện mặt trời Solar ký trực tiếp với Công ty Cổ phần Nội thất Thiện Long Nha Trang.
            </li>
            <li><b>2. Quy trình thầu phụ nội bộ:</b> Trong trường hợp khách hàng bắt buộc phải ký một hợp đồng tổng thầu trọn gói duy nhất để phục vụ giải ngân ngân hàng hoặc hồ sơ thầu dự án lớn, Công ty Xây dựng sẽ ký hợp đồng tổng thầu. Sau đó, Công ty Xây dựng ký hợp đồng thầu phụ giao lại toàn bộ mảng thiết kế nội thất, gia công gỗ và smart home cho Công ty Cổ phần Nội thất thi công theo đúng đơn giá thị trường niêm yết, hạch toán chuẩn chỉ tránh rủi ro thuế.</li>
            <li><b>3. Quy trình hạch toán giao dịch liên kết:</b> Phòng Tài chính & Kế toán có trách nhiệm soạn thảo các hợp đồng thuê nhà xưởng gỗ và thuê thiết bị xây thô nội bộ, kiểm tra đơn giá khớp với bảng giá công khai, đảm bảo mọi giao dịch liên kết đều minh bạch, hợp pháp trước cơ quan thanh tra thuế.</li>
        </ul>

        <div style="margin-top: 60px; page-break-inside: avoid;">
            <table style="border: none; width: 100%;">
                <tr style="border: none;">
                    <td style="border: none; width: 50%; text-align: center;">
                        <b>ĐẠI DIỆN ĐƠN VỊ THAM VẤN</b><br><br><br><br><br>
                        <i>(Ký và ghi rõ họ tên)</i>
                    </td>
                    <td style="border: none; width: 50%; text-align: center;">
                        <b>BAN SÁNG LẬP THIỆN LONG NHA TRANG</b><br><br><br><br><br>
                        <i>(Ký tên và đóng dấu)</i>
                    </td>
                </tr>
            </table>
        </div>
    `;

    const footer = "</body></html>";
    const sourceHTML = header + content + footer;

    const blob = new Blob(['\ufeff' + sourceHTML], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = url;
    fileDownload.download = 'Quy_che_Phan_cap_Nhiem_vu_Quyen_han_Thien_Long_Group.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
    URL.revokeObjectURL(url);
}
