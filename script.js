/* ==========================================================
   MIUGO PETS - JAVASCRIPT DEMO (KHÔNG CẦN BACKEND)
   1) Thêm/sửa sản phẩm: chỉnh mảng PRODUCTS ở bên dưới.
   2) Thay ảnh: chép ảnh mới vào images/products/ rồi sửa image.
   3) Giỏ hàng được lưu trong localStorage của trình duyệt.
   ========================================================== */

/* ===== CẤU HÌNH CHUNG =====
   Thông tin liên hệ được sử dụng ở cả index.html và thuong-hieu.html.
   Muốn thay số điện thoại, email hoặc mạng xã hội thì sửa tại đây. */

const CFG = {
  GA: 'G-WL6D97PGV2',          // Mã Google Analytics
  ZALO: '0900000000',          // Số điện thoại Zalo
  EMAIL: 'hello@miugopets.vn', // Email liên hệ
  FORM: '',                    // Link Formspree
  FREE: 299000,                // Ngưỡng miễn phí vận chuyển

  TIKTOK: 'https://www.tiktok.com/',
  FACEBOOK: 'https://www.facebook.com/profile.php?id=61596723083649',

  HOURS: '8:00 – 21:00 mỗi ngày'
};
/* =====================================================
   HỆ THỐNG MÃ GIẢM GIÁ MIUGO PETS
===================================================== */

/*
  type:
  - percent: Giảm theo phần trăm.
  - fixed: Giảm số tiền cố định.

  value: Mức giảm giá.
  minOrder: Giá trị đơn tối thiểu.
  maxDiscount: Mức giảm tối đa (0 = không giới hạn).
  active: true = bật, false = tắt.
*/

const VOUCHERS = {

  // ===== VOUCHER 1: GIẢM 10% =====

  'MIUGO10': {

    type: 'percent',

    value: 10,

    minOrder: 100000,

    maxDiscount: 50000,

    active: true

  },


  // ===== VOUCHER 2: GIẢM 50.000Đ =====

  'MIUGO50000': {

    type: 'fixed',

    value: 50000,

    minOrder: 300000,

    maxDiscount: 0,

    active: true

  },


  // ===== THÊM VOUCHER MỚI TẠI ĐÂY =====


};
/* ===== DANH MỤC SẢN PHẨM ===== */

const CATEGORIES = {
  all: 'Tất cả',
  nha: 'Nhà & module',
  cao: 'Bàn cào',
  choi: 'Đồ chơi',
  an: 'Bát ăn',
  vs: 'Vệ sinh',
  'module-le': 'Module riêng lẻ'
};
/* ===== NHÓM SẢN PHẨM HIỂN THỊ TRÊN WEBSITE =====
   Chỉ có 2 nhóm sản phẩm chính.
   PRODUCT_GROUP_FILTERS dùng cho bộ lọc trên trang chủ.
   CATEGORIES cũ vẫn được giữ để hiển thị loại sản phẩm trong chi tiết.
*/

const PRODUCT_GROUP_FILTERS = {
  all: 'Tất cả',
  nha: 'Nhà & Module lắp sẵn cho mèo',
  'module-le': 'Module riêng lẻ',
  phukien: 'Phụ kiện & Đồ dùng cho mèo'
};
/* ==========================================================
   DANH SÁCH SẢN PHẨM
   Muốn thêm sản phẩm, hãy sao chép một object và sửa thông tin.
   image là đường dẫn tương đối từ file index.html.
   Giá nhập bằng số, ví dụ 129000 = 129.000₫.
   ========================================================== */
const PRODUCTS = [
 
{
  id: 'm1',
  category: 'nha',
  name: 'Nhà mèo Kitten Castle',
  price: 180000,
  image: 'images/products/module-bo.png',
  model3d: 'models/kitten-castle.glb',

  description: 'Bộ module carton linh hoạt, có thể ghép nối, mở rộng hoặc thay thế theo nhu cầu.',
  tag: 'Lắp sẵn',

  details: {
    description: [
      'Nhà cho mèo dạng mô-đun, gồm 4 mô-đun có thể kết hợp với nhau.',
      'Lý tưởng để chơi đùa, trốn tìm, leo trèo và thư giãn.',
      'Vẻ ngoài tự nhiên, không cần in ấn.',
      'Việc lắp ráp trở nên dễ dàng nhờ hệ thống cắm ghép và hướng dẫn lắp ráp.',
      'Bìa cứng đặc biệt 5 lớp chắc chắn.'
    ],

    overview: [
      'Ngôi nhà cho mèo Kitten Castle màu tự nhiên là một ngôi nhà bằng bìa cứng dạng mô-đun, mang đến cho mèo nhiều không gian để chơi đùa, trốn tìm, leo trèo và thư giãn. Thiết kế nhỏ gọn tạo ra một nơi trú ẩn ấm cúng và khu vực hoạt động, lý tưởng cho những chú mèo tò mò và chắc chắn sẽ trở thành địa điểm yêu thích mới của chúng.',

      'Ở dạng nguyên bản, không in hoa văn, Kitten Castle gây ấn tượng với thiết kế đơn giản, tối giản và hòa hợp một cách kín đáo với nhiều không gian sống. Ngôi nhà cho mèo gồm 4 mô-đun, mỗi mô-đun có kích thước 27 x 27 x 27 cm, và dễ dàng lắp ráp nhờ hướng dẫn rõ ràng cùng hệ thống cắm ghép tiện dụng.',

      'Được làm từ bìa cứng đặc biệt 5 lớp chắc chắn, Kitten Castle gây ấn tượng với độ bền, tính thực tiễn và vật liệu thân thiện với môi trường. Với kích thước 54 x 54 x 54 cm, sản phẩm cung cấp không gian chơi và trú ẩn nhỏ gọn nhưng đa năng.',

      'Cũng như tất cả các sản phẩm của MiuGo Pets, phúc lợi động vật là ưu tiên hàng đầu. Mỗi lần mua hàng đều góp phần hỗ trợ phúc lợi động vật, vì một phần doanh thu được quyên góp cho các trại cứu hộ động vật.'
    ],

    specifications: [
      ['Tên sản phẩm', 'Kitten Castle'],
      ['Màu sắc', 'Tự nhiên / Không in'],
       ['Chất liệu', 'Bìa cứng đặc biệt 5 lớp'],
      ['Số lượng mô-đun', '4 mô-đun'],
      ['Kích thước mỗi mô-đun', '27 x 27 x 27 cm'],
      ['Trọng lượng', 'Khoảng 2 kg'],
      ['Không chứa nhựa', 'Có'],
      ['Khả năng tái chế', 'Có thể tái chế trong giấy phế thải'],
      ['Thiết kế', 'Tự nhiên, không in hoa văn'],
      ['Lắp ráp', 'Hệ thống cắm ghép và hướng dẫn lắp ráp']
    ],

    dimensions: [
      '54 x 54 x 54 cm',
      'Kích thước tổng thể của nhà mèo Kitten Castle.',
      'Mỗi mô-đun có kích thước 27 x 27 x 27 cm.'
    ]
  },

  // Chưa có màu sắc
  // 
  colors: [{
      id: 'xanh-la',
      name: 'Xanh lá',
      hex: '#78834C',
      image: 'images/products/colors/module-hop-xanh-la.png'
    },
    {
      id: 'nau',
      name: 'Nâu',
      hex: '#B98763',
      image: 'images/products/colors/module-hop-nau.png'
    },
    {
      id: 'den',
      name: 'Đen',
      hex: '#292521',
      image: 'images/products/colors/module-hop-den.png'
    },
    {
      id: 'trang',
      name: 'Trắng',
      hex: '#F5F2EC',
      image: 'images/products/colors/module-hop-trang.png'
    }]
},

  
{
  id: 'm2',
  category: 'nha',
  name: 'Module tháp 3 tầng',
  price: 349000,
  image: 'images/products/module-thap.png',
  model3d: 'models/model-3.glb',

  description: 'Nhà cho mèo dạng mô-đun 16 module, thiết kế nhiều tầng.',
  tag: 'Lắp sẵn',

  details: {
    description: [
      'Nhà cho mèo cỡ lớn dạng mô-đun, gồm 16 mô-đun có thể ghép nối với nhau.',
      'Lý tưởng để chơi đùa, trốn tìm, leo trèo và thư giãn.',
      'Việc lắp ráp trở nên dễ dàng nhờ hệ thống cắm ghép và hướng dẫn lắp ráp.',
      'Bìa cứng đặc biệt 5 lớp chắc chắn.',
      'Có thể kết hợp các module có công dụng khác nhau.'
    ],

    overview: [
      'Module tháp 4 tầng là một ngôi nhà bằng bìa cứng có kích thước rộng rãi, mang đến cho mèo nhiều không gian để chơi đùa, trốn tìm, leo trèo và thư giãn.',
      'Thiết kế dạng mô-đun tạo ra khu vực nghỉ ngơi và hoạt động đa dạng, nhiều tầng.',
      'Nhà có vẻ ngoài sạch sẽ, hiện đại và cao cấp, giúp hòa hợp với nhiều không gian sống.',
      'Nhà gồm 16 mô-đun, mỗi mô-đun có kích thước 27 x 27 x 27 cm.',
      'Được làm từ bìa cứng đặc biệt 5 lớp chắc chắn.'
    ],

    specifications: [
      ['Chất liệu', 'Bìa cứng đặc biệt 5 lớp'],
      ['Số lượng module', '16 mô-đun'],
      ['Kích thước mỗi module', '27 x 27 x 27 cm'],
      ['Trọng lượng', 'Khoảng 4 kg'],
      ['Không chứa nhựa', 'Có'],
      ['Khả năng tái chế', 'Có thể tái chế trong giấy phế thải']
    ],

    dimensions: [
      '108 x 54 x 81 cm',
      'Kích thước tổng thể của sản phẩm.'
    ]
  },

  colors: [
    {
      id: 'xanh-la',
      name: 'Xanh lá',
      hex: '#78834C',
      image: 'images/products/colors/module-thap-xanh-la.png'
    },
    {
      id: 'nau',
      name: 'Nâu',
      hex: '#B98763',
      image: 'images/products/colors/module-thap-nau.png'
    },
    {
      id: 'den',
      name: 'Đen',
      hex: '#292521',
      image: 'images/products/colors/module-thap-den.png'
    },
    {
      id: 'trang',
      name: 'Trắng',
      hex: '#F5F2EC',
      image: 'images/products/colors/module-thap-trang.png'
    }
  ]
 },
  
{
  id: 'm3',
  category: 'nha',
  name: 'Module dốc leo và hầm ngủ',
  price: 259000,
  image: 'images/products/module-cau-thang.png',
  model3d: 'models/model-2.glb',
  description: 'Bộ module 7 mô-đun gồm dốc leo và hầm ngủ, tạo không gian vui chơi và nghỉ ngơi cho mèo.',
  tag: 'Lắp sẵn',

  details: {
    description: [
      'Nhà cho mèo dạng mô-đun, gồm 7 mô-đun có thể ghép nối với nhau.',
      'Lý tưởng để chơi đùa, trốn tìm, leo trèo và thư giãn.',
      'Lắp ráp dễ dàng nhờ hệ thống cắm ghép và hướng dẫn lắp ráp.',
      'Bìa cứng đặc biệt 5 lớp chắc chắn.',
      'Có thể kết hợp các module có công dụng khác nhau.'
    ],

    overview: [
      'Module dốc leo và hầm ngủ là một ngôi nhà bằng bìa cứng dạng mô-đun, cung cấp cho mèo nhiều lựa chọn trong một: nơi ẩn náu, chỗ trốn, khu vui chơi và khu vực nghỉ ngơi trên cao.',
      'Thiết kế độc đáo tạo ra một không gian đa dạng và hấp dẫn, hoàn hảo để khám phá, leo trèo, quan sát và thư giãn.',
      'Sản phẩm gồm 7 mô-đun, mỗi mô-đun có kích thước 27 x 27 x 27 cm.',
      'Được làm từ bìa cứng đặc biệt 5 lớp chắc chắn, sản phẩm mang lại độ ổn định và phù hợp cho việc sử dụng hàng ngày.',
      'Với kích thước tổng thể 81 x 54 x 54 cm, ngôi nhà cung cấp không gian cho những chú mèo năng động và tò mò.'
    ],

    specifications: [
      ['Chất liệu', 'Bìa cứng đặc biệt 5 lớp'],
      ['Số lượng module', '7 mô-đun'],
      ['Kích thước mỗi module', '27 x 27 x 27 cm'],
      ['Trọng lượng', 'Khoảng 3 kg'],
      ['Không chứa nhựa', 'Có'],
      ['Khả năng tái chế', 'Có thể tái chế trong giấy phế thải'],
      ['Màu sắc', 'Đen, trắng, nâu và xanh lá']
    ],

    dimensions: [
      '81 x 54 x 54 cm',
      'Kích thước tổng thể của sản phẩm.',
      'Mỗi module có kích thước 27 x 27 x 27 cm.'
    ]
  },

  colors: [
    {
      id: 'den',
      name: 'Đen',
      hex: '#292521',
      image: 'images/products/colors/module-cau-thang-den.png'
    },
    {
      id: 'trang',
      name: 'Trắng',
      hex: '#F5F2EC',
      image: 'images/products/colors/module-cau-thang-trang.png'
    },
    {
      id: 'nau',
      name: 'Nâu',
      hex: '#B98763',
      image: 'images/products/colors/module-cau-thang-nau.png'
    },
    {
      id: 'xanh-la',
      name: 'Xanh lá',
      hex: '#78834C',
      image: 'images/products/colors/module-cau-thang-xanh-la.png'
    }
  ]
},

  
{
  id: 'm4',
  category: 'nha',
  name: 'Bộ 6 module vân gỗ',
  price: 299000,
  image: 'images/products/module-go.jpeg',
  description: 'Bộ 6 module vân gỗ bằng bìa cứng, có thể kết nối và sắp xếp thành nhiều kiểu khác nhau.',
  tag: 'Lắp sẵn',

  details: {
    description: [
      'Trụ cào móng cho mèo dạng tháp bằng bìa cứng, bộ gồm 6 chiếc.',
      'Hoàn thiện vân gỗ trang nhã, có khóa dán Velcro để kết nối các bộ phận.',
      'Có thể tạo ra nhiều kiểu kết hợp khác nhau.',
      'Bạn có thể tạo nhiều hình dạng bằng cách kết hợp các bộ phận, tùy chỉnh sao cho phù hợp với không gian nội thất.',
      'Sản phẩm có hai màu trắng và nâu.'
    ],

    overview: [
      'Bộ 6 module vân gỗ mang đến khả năng sắp xếp linh hoạt cho không gian vui chơi và nghỉ ngơi của mèo.',
      'Các bộ phận có thể kết nối với nhau bằng khóa dán Velcro, tạo ra nhiều hình dạng khác nhau.',
      'Thiết kế vân gỗ trang nhã giúp sản phẩm phù hợp với nhiều không gian nội thất.',
      'Bạn có thể tùy chỉnh cách kết hợp các module theo diện tích và nhu cầu sử dụng.'
    ],

    specifications: [
      ['Chất liệu', 'Bìa cứng'],
      ['Số lượng', '6 module'],
      ['Trọng lượng', 'Khoảng 3,3 kg'],
      ['Khả năng chịu tải mỗi mảnh', 'Khoảng 10 kg'],
      ['Cơ chế kết nối', 'Khóa dán Velcro'],
      ['Màu sắc', 'Trắng và nâu'],
      ['Bộ sản phẩm gồm', '1 hình chữ L, 1 hình ngôi nhà, 2 hình vuông, 2 hình tam giác']
    ],

    dimensions: [
      'Hình chữ L: Rộng 45,3 x Sâu 21,8 x Cao 45,3 cm.',
      'Hình ngôi nhà: Rộng 32,5 x Sâu 21,8 x Cao 22,65 cm.',
      'Hình vuông/tam giác: Rộng 22,65 x Sâu 21,8 x Cao 22,65 cm.',
      'Các kích thước là kích thước từng bộ phận theo tài liệu sản phẩm.'
    ]
  },

  colors: [
    {
      id: 'trang',
      name: 'Trắng',
      hex: '#F5F2EC',
      image: 'images/products/colors/module-go-trang.jpeg'
    },
    {
      id: 'nau',
      name: 'Nâu',
      hex: '#79553D',
      image: 'images/products/colors/module-go-nau.jpeg'
    }
  ]
},

  
{
  id: 'm5',
  category: 'nha',
  name: 'Đường hầm carton gấp gọn',
  price: 89000,
  image: 'images/products/tunnel.webp',
  description: 'Đường hầm carton cho mèo, có thể gấp phẳng và mở ra sử dụng trong vài giây.',
  tag: '',

  details: {
    description: [
      'Đường hầm carton dành cho mèo, thiết kế có thể gấp gọn.',
      'Dễ dàng mở ra sử dụng trong vài giây.',
      'Giúp tạo không gian để mèo chui qua và khám phá.',
      'Thiết kế gọn gàng, thuận tiện khi cần cất giữ.'
    ],

    overview: [
      'Đường hầm carton gấp gọn là phụ kiện vui chơi dành cho mèo.',
      'Thiết kế có thể gấp phẳng khi không sử dụng và mở ra nhanh chóng khi cần.',
      'Sản phẩm phù hợp để bổ sung không gian vui chơi cho mèo trong nhà.'
    ],

    specifications: [
      ['Loại sản phẩm', 'Đường hầm vui chơi cho mèo'],
      ['Chất liệu', 'Carton'],
      ['Thiết kế', 'Có thể gấp phẳng'],
      ['Thời gian mở sản phẩm', 'Vài giây'],
      ['Trọng lượng', 'Chưa có thông tin'],
      ['Khả năng chịu tải', 'Chưa có thông tin']
    ],

    dimensions: [
      'Kích thước khi mở: Chưa có thông tin.',
      'Kích thước khi gấp gọn: Chưa có thông tin.'
    ]
  },

  // Bổ sung màu và ảnh riêng tại đây khi có thông tin.
  colors: []
},

  { id: 'c1', category: 'cao', name: 'Bàn cào ổ nằm hình oval', price: 99000, image: 'images/products/ban-cao-oval.jpg', description: 'Vừa cào vừa nằm ngủ, lòng sâu ôm người mèo.', tag: 'Bán chạy' },
  { id: 'c2', category: 'cao', name: 'Bàn cào chữ S (set 2 tấm)', price: 49000, image: 'images/products/ban-cao-s.jpg', description: 'Mặt cong êm lưng, đặt sàn hoặc dựa tường.', tag: '' },
  { id: 't1', category: 'choi', name: 'Bóng len nỉ (set 3 quả)', price: 39000, image: 'images/products/bong-len.jpg', description: 'Bóng len mềm, nhẹ, mèo tung hứng không gây ồn.', tag: '' },
  { id: 't2', category: 'choi', name: 'Cần câu mèo lông vũ', price: 35000, image: 'images/products/can-cau.jpg', description: 'Dây thép bền, đầu lông có chuông, thay được đầu.', tag: '' },
  { id: 'a1', category: 'an', name: 'Bát đôi inox đế nhựa hồng', price: 49000, image: 'images/products/bat-doi.jpeg', description: 'Hai ngăn ăn và uống, lòng inox dễ rửa.', tag: '' },
  { id: 'a2', category: 'an', name: 'Bát sứ chân gỗ', price: 79000, image: 'images/products/bat-su.webp', description: 'Bát sứ 290ml, chân gỗ nâng cao dễ ăn.', tag: '' },
  { id: 'a3', category: 'an', name: 'Thảm lót bát ăn', price: 59000, image: 'images/products/tham-an.jpg', description: 'Thảm hút nước, giữ sàn trọ khô sạch.', tag: '' },
  { id: 'v1', category: 'vs', name: 'Khay vệ sinh thành cao', price: 99000, image: 'images/products/khay-ve-sinh.jpg', description: 'Thành cao chống văng cát, kèm xẻng gắn bên hông.', tag: '' },
  { id: 'v2', category: 'vs', name: 'Xẻng xúc cát inox cán gỗ', price: 45000, image: 'images/products/xeng.jpg', description: 'Lưới inox lọc cát nhanh, cán gỗ cầm chắc.', tag: '' },
  { id: 'v3', category: 'vs', name: 'Cát sắn Gemlucky 2kg', price: 55000, image: 'images/products/cat-san.jpg', description: 'Cát sắn tự nhiên, vón cục nhanh, xả được bồn cầu lượng nhỏ.', tag: '' },
  
  {
  id: 'module-le-1',
  category: 'module-le',
  name: 'Module 1 - Hộp cửa tròn',
  price: 59000,
  image: 'images/modules/module-1.png',
  description: 'Khối hộp vuông có cửa tròn để mèo chui vào, nghỉ ngơi và quan sát.',
  tag: 'Module riêng lẻ'
},

{
  id: 'module-le-2',
  category: 'module-le',
  name: 'Module 2 - Hộp hình mặt mèo',
  price: 59000,
  image: 'images/modules/module-2.png',
  description: 'Khối hộp có cửa khoét hình khuôn mặt mèo, tạo không gian vui chơi và trú ẩn.',
  tag: 'Module riêng lẻ'
},

{
  id: 'module-le-3',
  category: 'module-le',
  name: 'Module 3 - Dốc leo',
  price: 59000,
  image: 'images/modules/module-3.png',
  description: 'Mặt dốc có các khe bám giúp mèo leo lên xuống và khám phá không gian.',
  tag: 'Module riêng lẻ'
},

{
  id: 'module-le-4',
  category: 'module-le',
  name: 'Module 4 - Hộp cửa tam giác',
  price: 59000,
  image: 'images/modules/module-4.png',
  description: 'Khối hộp có khoang cửa tam giác, tạo không gian chui vào và trú ẩn.',
  tag: 'Module riêng lẻ'
},

{
  id: 'module-le-5',
  category: 'module-le',
  name: 'Module 5 - Hộp cửa vòm',
  price: 59000,
  image: 'images/modules/module-5.png',
  description: 'Khối hộp có cửa vòm rộng để mèo ra vào thuận tiện.',
  tag: 'Module riêng lẻ'
},
{
  id: 'module-le-6',
  category: 'module-le',
  name: 'Module 6 - Module thông gió',
  price: 59000,

  image: 'images/modules/module-6.png',

  description: 'Khối hộp có lỗ thông gió, giúp không khí lưu thông tốt hơn.',

  tag: 'Module riêng lẻ',

  details: {
    description: [
      'Module có thiết kế các lỗ thông gió trên thân hộp.',
      'Hỗ trợ không khí lưu thông bên trong module.',
      'Có thể sử dụng riêng lẻ hoặc kết hợp với các module khác.',
      'Phù hợp để mở rộng không gian sinh hoạt cho mèo.'
    ],

    overview: [
      'Module 6 là module thông gió được thiết kế nhằm tăng khả năng lưu thông không khí bên trong không gian sinh hoạt của mèo.',
      'Sản phẩm có thể sử dụng riêng lẻ hoặc kết hợp với các module khác để tạo nên hệ thống nhà mèo linh hoạt.'
    ],

    specifications: [
      ['Loại sản phẩm', 'Module thông gió'],
      ['Chất liệu', 'Carton hoặc Gỗ tùy chọn'],
      ['Thiết kế', 'Có lỗ thông gió'],
      ['Khả năng kết hợp', 'Có thể kết hợp module khác']
    ],

    dimensions: [
      'Kích thước: 27cm x 27cm x 27cm'
    ]
  },

  colors: []
},
{
  id: 'module-le-7',
  category: 'module-le',
  name: 'Module 7 - Module với tấm làm mát tháo rời',
  price: 59000,

  image: 'images/modules/module-7.png',

  description: 'Khối module có tấm làm mát tháo rời, có thể thay thế tiện lợi cho mèo.',

  tag: 'Module riêng lẻ',

  details: {
    description: [
      'Module có thiết kế các lỗ thông gió trên thân hộp.',
      'Hỗ trợ không khí lưu thông bên trong module.',
      'Có thể sử dụng riêng lẻ hoặc kết hợp với các module khác.',
      'Phù hợp để mở rộng không gian sinh hoạt cho mèo.'
    ],

    overview: [
      'Module 7 là module với tấm làm mát tháo rời được thiết kế nhằm cung cấp sự thoải mái cho mèo trong điều kiện thời tiết nóng bức.',
      'Sản phẩm có thể sử dụng riêng lẻ hoặc kết hợp với các module khác để tạo nên hệ thống nhà mèo linh hoạt.'
    ],

    specifications: [
      ['Loại sản phẩm', 'Module với tấm làm mát tháo rời'],
      ['Chất liệu', 'Carton hoặc Gỗ tùy chọn'],
      ['Thiết kế', 'Có lỗ thông gió'],
      ['Khả năng kết hợp', 'Có thể kết hợp module khác']
    ],

    dimensions: [
      'Kích thước: 27cm x 27cm x 27cm'
    ]
  },

  colors: []
},
{
  id: 'module-le-8',
  category: 'module-le',
  name: 'Module 8 - Module tích hợp nhà vệ sinh cho mèo',
  price: 59000,

  image: 'images/modules/module-8.png',

  description: 'Khối module có ngăn nhà vệ sinh tích hợp cho mèo.',

  tag: 'Module riêng lẻ',

  details: {
    description: [
      'Module có thiết kế các lỗ thông gió trên thân hộp.',
      'Hỗ trợ không khí lưu thông bên trong module.',
      'Có thể sử dụng riêng lẻ hoặc kết hợp với các module khác.',
      'Phù hợp để mở rộng không gian sinh hoạt cho mèo.'
    ],

    overview: [
      'Module 8 là module tích hợp nhà vệ sinh cho mèo được thiết kế nhằm cung cấp sự tiện nghi và vệ sinh cho mèo.',
      'Sản phẩm có thể sử dụng riêng lẻ hoặc kết hợp với các module khác để tạo nên hệ thống nhà mèo linh hoạt.'
    ],

    specifications: [
      ['Loại sản phẩm', 'Module tích hợp nhà vệ sinh cho mèo'],
      ['Chất liệu', 'Carton hoặc Gỗ tùy chọn'],
      ['Thiết kế', 'Có lỗ thông gió'],
      ['Khả năng kết hợp', 'Có thể kết hợp module khác']
    ],

    dimensions: [
      'Kích thước: 27cm x 27cm x 27cm'
    ]
  },

  colors: []
},
{
  id: 'module-le-9',
  category: 'module-le',
  name: 'Module 9 - Module rèm tích hợp ngăn đựng đồ',
  price: 59000,

  image: 'images/modules/module-9.png',

  description: 'Khối module có rèm tích hợp ngăn đựng đồ.',

  tag: 'Module riêng lẻ',

  details: {
    description: [
      'Module có thiết kế các lỗ thông gió trên thân hộp.',
      'Hỗ trợ không khí lưu thông bên trong module.',
      'Có thể sử dụng riêng lẻ hoặc kết hợp với các module khác.',
      'Phù hợp để mở rộng không gian sinh hoạt cho mèo.'
    ],

    overview: [
      'Module 9 là module tích hợp rèm cho mèo được thiết kế nhằm cung cấp sự tiện nghi và không gian riêng tư cho mèo.',
      'Sản phẩm có thể sử dụng riêng lẻ hoặc kết hợp với các module khác để tạo nên hệ thống nhà mèo linh hoạt.'
    ],

    specifications: [
      ['Loại sản phẩm', 'Module tích hợp rèm cho mèo'],
      ['Chất liệu', 'Carton hoặc Gỗ tùy chọn'],
      ['Thiết kế', 'Có lỗ thông gió'],
      ['Khả năng kết hợp', 'Có thể kết hợp module khác']
    ],

    dimensions: [
      'Kích thước: 27cm x 27cm x 27cm'
    ]
  },

  colors: []
},
{
  id: 'module-le-10',
  category: 'module-le',
  name: 'Module 10 - Module trò chơi săn mồi giảm stress cho mèo',
  price: 59000,

  image: 'images/modules/module-10.png',

  description: 'Khối module có trò chơi săn mồi giúp giảm stress cho mèo.',

  tag: 'Module riêng lẻ',

  details: {
    description: [
      'Module có thiết kế các lỗ thông gió trên thân hộp.',
      'Hỗ trợ không khí lưu thông bên trong module.',
      'Có thể sử dụng riêng lẻ hoặc kết hợp với các module khác.',
      'Phù hợp để mở rộng không gian sinh hoạt cho mèo.'
    ],

    overview: [
      'Module 10 là module tích hợp trò chơi săn mồi cho mèo được thiết kế nhằm cung cấp sự giải trí và giảm stress cho mèo.',
      'Sản phẩm có thể sử dụng riêng lẻ hoặc kết hợp với các module khác để tạo nên hệ thống nhà mèo linh hoạt.'
    ],

    specifications: [
      ['Loại sản phẩm', 'Module tích hợp trò chơi săn mồi cho mèo'],
      ['Chất liệu', 'Carton hoặc Gỗ tùy chọn'],
      ['Thiết kế', 'Có lỗ thông gió'],
      ['Khả năng kết hợp', 'Có thể kết hợp module khác']
    ],

    dimensions: [
      'Kích thước: 27cm x 27cm x 27cm'
    ]
  },

  colors: []
},
{
  id: 'module-le-11',
  category: 'module-le',
  name: 'Module 11 - Module bàn cào có thể thay thế lõi',
  price: 59000,

  image: 'images/modules/module-11.png',

  description: 'Khối module có bàn cào có thể thay thế lõi.',

  tag: 'Module riêng lẻ',

  details: {
    description: [
      'Module có thiết kế các lỗ thông gió trên thân hộp.',
      'Hỗ trợ không khí lưu thông bên trong module.',
      'Có thể sử dụng riêng lẻ hoặc kết hợp với các module khác.',
      'Phù hợp để mở rộng không gian sinh hoạt cho mèo.'
    ],

    overview: [
      'Module 11 là module tích hợp bàn cào cho mèo được thiết kế nhằm cung cấp sự giải trí và giảm stress cho mèo.',
      'Sản phẩm có thể sử dụng riêng lẻ hoặc kết hợp với các module khác để tạo nên hệ thống nhà mèo linh hoạt.'
    ],

    specifications: [
      ['Loại sản phẩm', 'Module tích hợp bàn cào cho mèo'],
      ['Chất liệu', 'Carton hoặc Gỗ tùy chọn'],
      ['Thiết kế', 'Có lỗ thông gió'],
      ['Khả năng kết hợp', 'Có thể kết hợp module khác']
    ],

    dimensions: [
      'Kích thước: 27cm x 27cm x 27cm'
    ]
  },

  colors: []
},
{
  id: 'module-le-12',
  category: 'module-le',
  name: 'Module 12 - Module tích hợp bát ăn và bát uống',
  price: 59000,

  image: 'images/modules/module-12.png',

  description: 'Module tích hợp bát ăn và bát uống',

  tag: 'Module riêng lẻ',

  details: {
    description: [
      'Module có thiết kế các lỗ thông gió trên thân hộp.',
      'Hỗ trợ không khí lưu thông bên trong module.',
      'Có thể sử dụng riêng lẻ hoặc kết hợp với các module khác.',
      'Phù hợp để mở rộng không gian sinh hoạt cho mèo.'
    ],

    overview: [
      'Module 12 là module tích hợp bát ăn và bát uống cho mèo được thiết kế nhằm cung cấp sự tiện lợi và giảm stress cho mèo.',
      'Sản phẩm có thể sử dụng riêng lẻ hoặc kết hợp với các module khác để tạo nên hệ thống nhà mèo linh hoạt.'
    ],

    specifications: [
      ['Loại sản phẩm', 'Module tích hợp bát ăn và bát uống cho mèo'],
      ['Chất liệu', 'Carton hoặc Gỗ tùy chọn'],
      ['Thiết kế', 'Có lỗ thông gió'],
      ['Khả năng kết hợp', 'Có thể kết hợp module khác']
    ],

    dimensions: [
      'Kích thước: 27cm x 27cm x 27cm'
    ]
  },

  colors: []
},
{
  id: 'module-le-13',
  category: 'module-le',
  name: 'Module 13 - Module tích hợp bàn chải lông cho mèo',
  price: 59000,

  image: 'images/modules/module-13.png',

  description: 'Module tích hợp bàn chải lông cho mèo',

  tag: 'Module riêng lẻ',

  details: {
    description: [
      'Module có thiết kế các lỗ thông gió trên thân hộp.',
      'Hỗ trợ không khí lưu thông bên trong module.',
      'Có thể sử dụng riêng lẻ hoặc kết hợp với các module khác.',
      'Phù hợp để mở rộng không gian sinh hoạt cho mèo.'
    ],

    overview: [
      'Module 13 là module tích hợp bàn chải lông cho mèo được thiết kế nhằm cung cấp sự tiện lợi và giảm stress cho mèo.',
      'Sản phẩm có thể sử dụng riêng lẻ hoặc kết hợp với các module khác để tạo nên hệ thống nhà mèo linh hoạt.'
    ],

    specifications: [
      ['Loại sản phẩm', 'Module tích hợp bàn chải lông cho mèo'],
      ['Chất liệu', 'Carton hoặc Gỗ tùy chọn'],
      ['Thiết kế', 'Có lỗ thông gió'],
      ['Khả năng kết hợp', 'Có thể kết hợp module khác']
    ],

    dimensions: [
      'Kích thước: 27cm x 27cm x 27cm'
    ]
  },

  colors: []
},
  
];
/* ===== DỮ LIỆU 5 MODULE MIUGO PETS ===== */

const MODULES = [
  {
    id: 'module-1',
    name: 'Module 1 - Hộp cửa tròn',
    description: 'Khối hộp vuông có cửa tròn để mèo chui vào, nghỉ ngơi và quan sát.',
    image: 'images/modules/module-1.png'
  },
  {
    id: 'module-2',
    name: 'Module 2 - Hộp hình mặt mèo',
    description: 'Khối hộp có cửa khoét hình khuôn mặt mèo.',
    image: 'images/modules/module-2.png'
  },
  {
    id: 'module-3',
    name: 'Module 3 - Dốc leo',
    description: 'Mặt dốc có các khe bám giúp mèo leo lên xuống.',
    image: 'images/modules/module-3.png'
  },
  {
    id: 'module-4',
    name: 'Module 4 - Hộp cửa tam giác',
    description: 'Khối hộp có khoang cửa tam giác, tạo không gian chui và trú ẩn.',
    image: 'images/modules/module-4.png'
  },
  {
    id: 'module-5',
    name: 'Module 5 - Hộp cửa vòm',
    description: 'Khối hộp có cửa vòm rộng để mèo ra vào.',
    image: 'images/modules/module-5.png'
  },
  {
    id: 'module-6',
    name: 'Module 6 - Module công năng thông gió',
    description: 'Khối hộp có có lỗ thông gió để cho mèo không bị ngạt và không khí lưu thông tốt hơn.',
    image: 'images/modules/module-6.png'
  },
  {
    id: 'module-7',
    name: 'Module 7 - Module với tấm làm mát tháo rời',
    description: 'Khối module có tấm làm mát tháo rời, có thể thay thế tiện lợi cho mèo.',
    image: 'images/modules/module-7.png'
  },
  {
    id: 'module-8',
    name: 'Module 8 - Module tích hợp nhà vệ sinh cho mèo ',
    description: 'Khối module có ngăn nhà vệ sinh tích hợp cho mèo.',
    image: 'images/modules/module-8.png'
  },
  {
    id: 'module-9',
    name: 'Module 9 - Module rèm tích hợp ngăn đựng đồ ',
    description: 'Khối module có rèm tích hợp ngăn đựng đồ.',
    image: 'images/modules/module-9.png'
  },
  {
    id: 'module-10',
    name: 'Module 10 - Module trò chơi săn mồi giảm stress cho mèo ',
    description: 'Khối module tích hợp trò chơi săn mồi giúp giảm stress cho mèo.',
    image: 'images/modules/module-10.png'
  },
   {
    id: 'module-11',
    name: 'Module 11 - Module bàn cào có thể thay thế lõi ',
    description: 'Khối module bàn cào có thể thay thế lõi, giúp mèo cào móng và giảm stress.',
    image: 'images/modules/module-11.png'
  },
  {
    id: 'module-12',
    name: 'Module 12 - Module tích hợp bát ăn và bát uống ',
    description: 'Khối module tích hợp bát ăn và bát uống cho mèo.',
    image: 'images/modules/module-12.png'
  },
  {
    id: 'module-13',
    name: 'Module 13 - Module tích hợp bàn chải lông cho mèo',
    description: 'Khối module tích hợp bàn chải lông cho mèo.',
    image: 'images/modules/module-13.png'
  },
];

/* ===== CẤU HÌNH BỘ MODULE THEO SẢN PHẨM ===== */

const PRODUCT_MODULE_SUMMARIES = {
  m1: 'Bộ module được cấu tạo từ các kiểu module bên dưới đây, bạn có thể sáng tạo tùy thích theo ý mình và mở rộng theo ý muốn. ',

  m2: 'Sản phẩm được thiết kế dạng tháp 3 tầng, được kết hợp nhiều module, bạn có thể sáng tạo tùy thích theo ý mình với các module ở bên dưới.',

  m3: 'Sản phẩm gồm 2 dốc leo và 4 module hình hộp, bạn có thể sáng tạo tùy thích và kết hợp các module mở rộng theo ý mình ở bên dưới.',


};
/* =====================================================
   CẤU TẠO MODULE RIÊNG CHO TỪNG SẢN PHẨM
===================================================== */

/*
  Mỗi sản phẩm có danh sách module riêng.

  moduleId: Mã module lấy từ danh sách MODULES.
  quantity: Số lượng module đó trong sản phẩm.

  Có thể thêm, xóa hoặc thay đổi số lượng tùy ý.
*/

const PRODUCT_MODULE_COMPOSITIONS = {

  // ===== SẢN PHẨM M1: KITTEN CASTLE =====
  m1: [

    {
      moduleId: 'module-1',
      quantity: 3
    },

    {
      moduleId: 'module-2',
      quantity: 1
    },

    

  ],


  // ===== SẢN PHẨM M2: MODULE THÁP =====
  m2: [

    {
      moduleId: 'module-1',
      quantity: 7
    },
    {
      moduleId: 'module-2',
      quantity: 5
    },
    {
      moduleId: 'module-3',
      quantity: 2
    },
    {
      moduleId: 'module-4',
      quantity: 2
    },

  ],


  // ===== SẢN PHẨM M3: DỐC LEO VÀ HẦM NGỦ =====
  m3: [

   {
      moduleId: 'module-1',
      quantity: 4
    },
    {
      moduleId: 'module-2',
      quantity: 1
    },
    {
      moduleId: 'module-3',
      quantity: 2
    },

  ],


  // ===== SẢN PHẨM M4 =====
  m4: [

    // Thêm các module cấu thành sản phẩm tại đây.

  ],


  // ===== SẢN PHẨM M5 =====
  m5: [

    // Thêm các module cấu thành sản phẩm tại đây.

  ]

};

/* ===== GIÁ CHẤT LIỆU ===== */

// Carton giữ nguyên giá gốc.
// Gỗ đang tạm tính cao hơn carton 30%.
// Có thể thay 1.3 bằng mức giá thực tế sau này.

const WOOD_PRICE_MULTIPLIER = 1.3;

const MATERIAL_LABELS = {
  carton: 'Carton',
  wood: 'Gỗ',
  none: ''
};

const COLOR_LABELS = {
  trang: 'Trắng',
  den: 'Đen',
  'xanh-la': 'Xanh lá',
  nau: 'Nâu',
  none: ''
  
};
/* ===== MÀU SẮC MẶC ĐỊNH CHO CÁC MODULE ===== */

const DEFAULT_MODULE_COLORS = [
  {
    id: 'trang',
    name: 'Trắng',
    hex: '#F5F2EC'
  },
  {
    id: 'den',
    name: 'Đen',
    hex: '#292521'
  },
  {
    id: 'xanh-la',
    name: 'Xanh lá',
    hex: '#78834C'
  },
  {
    id: 'nau',
    name: 'Nâu',
    hex: '#B98763'
  }
];

function isCustomizableModuleProduct(product) {
  return product && (
    product.category === 'nha' ||
    product.category === 'module-le'
  );
}


function calculateUnitPrice(product, material) {
  if (!product) return 0;

  if (material === 'wood' && isCustomizableModuleProduct(product)) {
    return Math.round(product.price * WOOD_PRICE_MULTIPLIER);
  }

  return product.price;
}

/* ===== HÀM TIỆN ÍCH ===== */
const $ = (selector) => document.querySelector(selector);
const formatPrice = (value) => Number(value || 0).toLocaleString('vi-VN') + '₫';
const getProduct = (id) => PRODUCTS.find((product) => product.id === id);
const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

/* Google Analytics: chỉ bật khi thay mã G-XXXXXXXXXX bằng mã thật. */
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
if (CFG.GA && !CFG.GA.includes('XXXX')) {
  const analyticsScript = document.createElement('script');
  analyticsScript.async = true;
  analyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CFG.GA);
  document.head.appendChild(analyticsScript);
  gtag('js', new Date());
  gtag('config', CFG.GA);
}

/* ===== TRẠNG THÁI TRANG ===== */
let activeCategory = 'all';
let searchText = '';
let sortMode = '';
let cart = {};
let currentDetailProductId = null;
let appliedVoucherCode = '';
let currentDetailMaterial = 'carton';
let currentDetailColor = 'trang';
// Trạng thái đơn hàng thanh toán demo
let currentDemoOrder = null;

try {
  cart = JSON.parse(localStorage.getItem('mg') || '{}');
  if (!cart || typeof cart !== 'object' || Array.isArray(cart)) cart = {};
} catch (error) {
  cart = {};
}
// Khôi phục voucher đã áp dụng

try {

  appliedVoucherCode = (
    localStorage.getItem('miugo-applied-voucher') || ''
  ).toUpperCase();

} catch (error) {

  appliedVoucherCode = '';

}

/* ==========================================================
   KHỞI TẠO THÔNG TIN LIÊN HỆ CHO HAI TRANG

   Chức năng:
   - Thiết lập đường dẫn Zalo và email.
   - Thiết lập TikTok và Facebook từ CFG.
   - Đồng bộ giờ làm việc và nội dung footer.
   - Đưa nội dung meta description sang trang thương hiệu.

   Hàm chính: setupContactLinks()
   ========================================================== */

/* ==========================================================
   KHỞI TẠO THÔNG TIN LIÊN HỆ CHO HAI TRANG

   Chức năng:
   - Thiết lập đường dẫn Zalo và email.
   - Thiết lập TikTok và Facebook từ CFG.
   - Đồng bộ giờ làm việc và nội dung footer.
   - Đưa nội dung meta description sang trang thương hiệu.

   Hàm chính: setupContactLinks()
   ========================================================== */


/* ===== KHỞI TẠO LIÊN HỆ CHO HAI TRANG ===== */


/* ==========================================================
   KHỞI TẠO LIÊN HỆ CHO HAI TRANG
   Dùng chung cho index.html và thuong-hieu.html.
   ========================================================== */

function setupContactLinks() {

  // Cập nhật đường dẫn, kiểm tra phần tử trước khi sử dụng.
  const setLink = (selector, url, label) => {
    const element = $(selector);

    if (!element) return;

    element.href = url;

    if (label !== undefined) {
      element.textContent = label;
    }
  };

  // ZALO
  const zaloUrl = 'https://zalo.me/' + CFG.ZALO.replace(/\D/g, '');

  
  setLink('#zf', zaloUrl, 'Zalo: ' + CFG.ZALO);
  setLink('#brand-zalo', zaloUrl, 'Zalo: ' + CFG.ZALO);
 

  // Đường dẫn Zalo và Facebook trong cửa sổ chatbot
setLink('#chat-zalo-link', zaloUrl);
setLink('#chat-facebook-link', CFG.FACEBOOK);

  // EMAIL
  const emailUrl = 'mailto:' + CFG.EMAIL;

  setLink('#ef', emailUrl, CFG.EMAIL);
  setLink('#brand-email', emailUrl, CFG.EMAIL);

  // TIKTOK
  setLink('#footer-tiktok', CFG.TIKTOK);
  setLink('#brand-tiktok', CFG.TIKTOK);

  // FACEBOOK
  setLink('#footer-facebook', CFG.FACEBOOK);
  setLink('#brand-facebook', CFG.FACEBOOK);

  // GIỜ LÀM VIỆC
  const footerHours = $('#footer-hours');
  const brandHours = $('#brand-hours');

  if (footerHours) footerHours.textContent = CFG.HOURS;
  if (brandHours) brandHours.textContent = CFG.HOURS;

  // SLOGAN
  const footerSlogan = $('#footer-slogan');
  const brandSlogan = $('#brand-slogan');

  if (footerSlogan && brandSlogan) {
    brandSlogan.textContent = footerSlogan.textContent;
  }

  // META DESCRIPTION
  const metaDescription = document.querySelector(
    'meta[name="description"]'
  );

  const brandDescription = $('#brand-meta-description');

  if (metaDescription && brandDescription) {
    brandDescription.textContent = metaDescription.content;
  }

  // GIỚI THIỆU TỪ FOOTER
  const footerIntro = $('#footer-intro');
  const brandFooterDescription = $('#brand-footer-description');

  if (footerIntro && brandFooterDescription) {
    brandFooterDescription.textContent = footerIntro.textContent;
  }

}

/* ===== DANH MỤC VÀ LỌC SẢN PHẨM ===== */

/* ===== HIỂN THỊ 2 NHÓM LỌC SẢN PHẨM ===== */

function renderCategories() {
  const container = $('#ch');
  if (!container) return;

  container.innerHTML = Object.entries(PRODUCT_GROUP_FILTERS)
    .map(([key, label]) => `
      <button
        class="chip ${key === activeCategory ? 'on' : ''}"
        type="button"
        data-category="${key}">
        ${escapeHTML(label)}
      </button>
    `).join('');
}


/* ===== LỌC SẢN PHẨM THEO 2 NHÓM ===== */

function getVisibleProducts() {

  const normalizedQuery = searchText.toLocaleLowerCase('vi');

  const visible = PRODUCTS.filter((product) => {

    // Nhóm chủ lực gồm các sản phẩm có category là nha.
  

    const categoryMatches =
     activeCategory === 'all' ||

  (activeCategory === 'nha' &&
   product.category === 'nha') ||

  (activeCategory === 'module-le' &&
   product.category === 'module-le') ||

  (activeCategory === 'phukien' &&
   !['nha', 'module-le'].includes(product.category));
    // Tìm kiếm theo tên và mô tả.
    const searchMatches =
      product.name.toLocaleLowerCase('vi').includes(normalizedQuery) ||
      product.description.toLocaleLowerCase('vi').includes(normalizedQuery);

    return categoryMatches && searchMatches;
  });

  // Sắp xếp giá thấp đến cao hoặc cao đến thấp.
  if (sortMode === 'up') {
    visible.sort((a, b) => a.price - b.price);
  }

  if (sortMode === 'dn') {
    visible.sort((a, b) => b.price - a.price);
  }

  return visible;
}

function renderProducts() {

  const productGrid = $('#grid');

  // Chỉ trang chủ có danh sách sản phẩm.
  if (!productGrid) return;

  const visibleProducts = getVisibleProducts();

  if (!visibleProducts.length) {
    productGrid.innerHTML = `
      <p class="empty-products">
        Chưa có sản phẩm khớp. Thử từ khóa khác hoặc chọn “Tất cả”.
      </p>
    `;
    return;
  }

  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="card cl">

      <div class="im">

        <img loading="lazy"
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          onerror="this.src='images/placeholder.svg'">

        ${product.tag
          ? `<span class="tg">${escapeHTML(product.tag)}</span>`
          : ''}

        ${product.model3d
          ? `<span class="tg-ar">📱 Có AR</span>`
          : ''}

      </div>

      <div class="cb">

        <h3>${escapeHTML(product.name)}</h3>

        <p>${escapeHTML(product.description)}</p>

        <div class="pr">
          <b>${formatPrice(product.price)}</b>
        </div>

        <div class="product-actions">

          <button class="btn detail-btn"
            type="button"
            data-action="detail"
            data-id="${escapeHTML(product.id)}">
            Xem chi tiết
          </button>

          <button class="btn"
            type="button"
            data-action="add"
            data-id="${escapeHTML(product.id)}">
            Thêm vào giỏ
          </button>

        </div>

      </div>

    </article>
  `).join('');
}

/* =====================================================
   CHI TIẾT SẢN PHẨM
===================================================== */

/* =====================================================
   HIỂN THỊ CẤU TẠO MODULE RIÊNG CỦA SẢN PHẨM
===================================================== */

function renderModuleSection(product) {

  const section = $('#detail-module-section');

  // Chỉ áp dụng cho danh mục Nhà & module
  if (!section || product.category !== 'nha') {

    if (section) {
      section.hidden = true;
    }

    return;
  }

  section.hidden = false;


  // ===== HIỂN THỊ GIỚI THIỆU MODULE =====

  const summary = PRODUCT_MODULE_SUMMARIES[product.id];

  $('#detail-module-summary').textContent =
    summary || 'Các module thành phần của sản phẩm được giới thiệu bên dưới.';


  // ===== LẤY CẤU TẠO RIÊNG CỦA SẢN PHẨM =====

  const composition =
    PRODUCT_MODULE_COMPOSITIONS[product.id] || [];


  // Tìm thông tin từng module trong danh sách MODULES

  const selectedModules = composition.map(item => {

    const module = MODULES.find(
      m => m.id === item.moduleId
    );

    // Bỏ qua module không tồn tại
    if (!module) return null;

    return {

      ...module,

      quantity: Math.max(
        1,
        Math.floor(Number(item.quantity) || 1)
      )

    };

  }).filter(Boolean);


  // ===== HIỂN THỊ KHU VỰC CẤU TẠO SẢN PHẨM =====

  const compositionSection =
    $('#detail-product-composition');

  const compositionGrid =
    $('#detail-product-composition-grid');

  const compositionCount =
    $('#detail-product-composition-count');


  if (selectedModules.length > 0) {

    compositionSection.hidden = false;


    // Tính tổng số module

    const totalModules = selectedModules.reduce(
      (total, module) => total + module.quantity,
      0
    );


    compositionCount.textContent =
      `Tổng cộng ${totalModules} module`;


    // Hiển thị từng module cấu thành sản phẩm

    compositionGrid.innerHTML = selectedModules.map(module => `

      <div class="module-card composition-module-card">

        <img
          src="${escapeHTML(module.image)}"
          alt="${escapeHTML(module.name)}"
          onerror="this.hidden=true"
        >

        <span class="module-count">
          Số lượng: ${module.quantity}
        </span>

        <h3>
          ${escapeHTML(module.name)}
        </h3>

        <p>
          ${escapeHTML(module.description)}
        </p>

        <p>
          <b>Kích thước: 27 × 27 × 27 cm</b>
        </p>

      </div>

    `).join('');

  } else {

    // Chưa cấu hình cấu tạo cho sản phẩm này

    compositionSection.hidden = true;

    compositionGrid.innerHTML = '';

    compositionCount.textContent = '';

  }


  // ===== GIỮ NGUYÊN THƯ VIỆN 13 MODULE HIỆN CÓ =====

  $('#detail-modules').innerHTML = MODULES.map(module => `

    <div class="module-card">

      <img
        src="${escapeHTML(module.image)}"
        alt="${escapeHTML(module.name)}"
        onerror="this.hidden=true"
      >

      <h3>${escapeHTML(module.name)}</h3>

      <p>${escapeHTML(module.description)}</p>

      <p>
        <b>Kích thước: 27 × 27 × 27 cm</b>
      </p>

    </div>

  `).join('');

}


/* ===== HIỂN THỊ GIÁ THEO CHẤT LIỆU ===== */

function updateDetailPrice() {
  const product = getProduct(currentDetailProductId);
  if (!product) return;

  if (isCustomizableModuleProduct(product)) {
    currentDetailMaterial = $('#detail-material').value;
    currentDetailColor = $('#detail-color').value;
  }

  const price = calculateUnitPrice(product, currentDetailMaterial);

  $('#detail-price').textContent = formatPrice(price);

  $('#detail-material-note').textContent =
    currentDetailMaterial === 'wood'
      ? 'Phiên bản gỗ có giá cao hơn phiên bản carton.'
      : 'Phiên bản carton có mức giá tiêu chuẩn.';
}


/* ===== HIỂN THỊ ĐÁNH GIÁ ===== */

function renderProductReviews(productId) {
  let reviews = [];

  try {
    reviews = JSON.parse(
      localStorage.getItem('miugo_reviews_' + productId) || '[]'
    );

    if (!Array.isArray(reviews)) reviews = [];

  } catch (error) {
    reviews = [];
  }

  const count = reviews.length;

  const average = count
    ? reviews.reduce((sum, review) => sum + Number(review.rating), 0) / count
    : 0;

  const roundedAverage = Math.round(average);

  $('#detail-rating-average').textContent =
    count ? average.toFixed(1) : '—';

  $('#detail-rating-stars').textContent =
    '★'.repeat(roundedAverage) +
    '☆'.repeat(5 - roundedAverage);

  $('#detail-rating-count').textContent =
    count + ' đánh giá';

  if (!count) {
    $('#review-list').innerHTML = `
      <p>Chưa có đánh giá cho sản phẩm này. Hãy là người đầu tiên chia sẻ cảm nhận!</p>
    `;
    return;
  }

  $('#review-list').innerHTML = reviews.slice().reverse().map(review => `
    <div class="review-item">

      <div class="review-item-header">
        <b>${escapeHTML(review.name)}</b>

        <span class="review-stars">
          ${'★'.repeat(Number(review.rating))}
          ${'☆'.repeat(5 - Number(review.rating))}
        </span>
      </div>

      <p>${escapeHTML(review.comment)}</p>

      <small>${escapeHTML(review.date)}</small>

    </div>
  `).join('');
}


/* ===== GỬI ĐÁNH GIÁ ===== */

function handleReviewSubmit(event) {
  event.preventDefault();

  if (!currentDetailProductId) return;

  const form = event.currentTarget;
  const formData = Object.fromEntries(new FormData(form));

  const key = 'miugo_reviews_' + currentDetailProductId;

  let reviews = [];

  try {
    reviews = JSON.parse(localStorage.getItem(key) || '[]');
    if (!Array.isArray(reviews)) reviews = [];
  } catch (error) {
    reviews = [];
  }

  reviews.push({
    name: formData.reviewer.trim(),
    rating: Number(formData.rating),
    comment: formData.comment.trim(),
    date: new Date().toLocaleDateString('vi-VN')
  });

  try {
    localStorage.setItem(key, JSON.stringify(reviews));
  } catch (error) {
    showToast('Không thể lưu đánh giá trên trình duyệt này.');
    return;
  }

  renderProductReviews(currentDetailProductId);

  form.reset();

  showToast('Cảm ơn bạn đã gửi đánh giá!');
}


/* =====================================================
   RENDER CHI TIẾT SẢN PHẨM
===================================================== */

/* Render danh sách đoạn văn */
function renderDetailParagraphs(container, paragraphs) {
  container.innerHTML = '';

  (paragraphs || []).forEach(text => {
    const p = document.createElement('p');
    p.textContent = text;
    container.appendChild(p);
  });
}

/* Render danh sách thông số */
function renderDetailSpecifications(container, specifications) {
  container.innerHTML = '';

  const list = document.createElement('div');
  list.className = 'product-spec-list';

  (specifications || []).forEach(item => {
    const row = document.createElement('div');
    row.className = 'product-spec-item';

    const label = document.createElement('b');
    label.textContent = item[0];

    const value = document.createElement('span');
    value.textContent = item[1];

    row.append(label, value);
    list.appendChild(row);
  });

  container.appendChild(list);
}

/* Render kích thước */
function renderDetailDimensions(container, dimensions) {
  container.innerHTML = '';

  (dimensions || []).forEach(text => {
    const box = document.createElement('div');
    box.className = 'product-dimension-box';
    box.textContent = text;
    container.appendChild(box);
  });
}

/* Render toàn bộ nội dung chi tiết */
function renderProductInformation(product) {
  const details = product.details || {};

  renderDetailParagraphs(
    $('#detail-product-description'),
    details.description || [product.description || 'Đang cập nhật mô tả sản phẩm.']
  );

  renderDetailParagraphs(
    $('#detail-overview'),
    details.overview || ['Thông tin tổng quan đang được cập nhật.']
  );

  renderDetailSpecifications(
    $('#detail-specifications'),
    details.specifications || []
  );

  renderDetailDimensions(
    $('#detail-dimensions'),
    details.dimensions || ['Đang cập nhật kích thước sản phẩm.']
  );
}

/* ===== RENDER MÀU SẢN PHẨM ===== */

function renderProductColors(product) {
  const container = $('#detail-color-options');
  const select = $('#detail-color');
  const label = $('#detail-color-label');

  container.innerHTML = '';
  select.innerHTML = '';

  const colors = product.colors || [];

  if (!colors.length) {
    $('#detail-customize').hidden = true;
    return;
  }

  $('#detail-customize').hidden = false;

  colors.forEach(color => {
    // Thêm option vào select cũ
    const option = document.createElement('option');
    option.value = color.id;
    option.textContent = color.name;
    select.appendChild(option);

    // Tạo nút chọn màu
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'detail-color-option';
    button.dataset.color = color.id;

    const swatch = document.createElement('span');
    swatch.className = 'detail-color-swatch';
    swatch.style.backgroundColor = color.hex || '#ddd';

    const name = document.createElement('span');
    name.textContent = color.name;

    button.append(swatch, name);

    button.addEventListener('click', () => {
      select.value = color.id;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });

    container.appendChild(button);
  });

  // Chọn màu đầu tiên làm mặc định
  currentDetailColor = colors[0].id;
  select.value = currentDetailColor;

  updateProductColorImage(product, currentDetailColor);
}

/* ===== CẬP NHẬT ẢNH THEO MÀU ===== */

function updateProductColorImage(product, colorId) {
  const color = (product.colors || []).find(
    item => item.id === colorId
  );

  if (!color) return;

  currentDetailColor = color.id;

  const image = $('#detail-image');

  image.src = color.image || product.image;
  image.alt = product.name + ' - màu ' + color.name;

  $('#detail-color-label').textContent =
    'Màu sắc: ' + color.name;

  // Đánh dấu màu đang chọn
  document.querySelectorAll('.detail-color-option').forEach(button => {
    button.classList.toggle(
      'active',
      button.dataset.color === colorId
    );
  });
}

/* ===== ĐỒNG BỘ GIÁ THEO CHẤT LIỆU ===== */

function updateProductDetailPrice(product) {
  $('#detail-price').textContent = formatPrice(
    calculateUnitPrice(product, currentDetailMaterial)
  );
}

/* ===== MỞ CHI TIẾT SẢN PHẨM ===== */


/* ===== MỞ CHI TIẾT SẢN PHẨM ===== */


function openProductDetail(productId) {

  const product = getProduct(productId);
  if (!product) return;

  currentDetailProductId = product.id;

  const canCustomize = isCustomizableModuleProduct(product);

  // Lấy màu riêng của sản phẩm
  const productColors = Array.isArray(product.colors)
    ? product.colors
    : [];

  const colors = productColors.length > 0
    ? productColors
    : (canCustomize ? DEFAULT_MODULE_COLORS : []);

  const productForColors = {
    ...product,
    colors: colors
  };

  // Thiết lập mặc định
  currentDetailMaterial = canCustomize ? 'carton' : 'none';
  currentDetailColor = colors.length ? colors[0].id : 'none';

  // ===== HIỂN THỊ ẢNH HOẶC MÔ HÌNH 3D + AR =====

  const detailImage = $('#detail-image');
  const detailModel = $('#detail-model');
  const arHint = $('#ar-hint');

  const hasARModel = Boolean(product.model3d && detailModel);

  if (detailImage) {
    detailImage.src = product.image;
    detailImage.alt = product.name;
    detailImage.hidden = hasARModel;
  }

  if (detailModel) {

    if (hasARModel) {
      detailModel.src = product.model3d;
      detailModel.alt = 'Mô hình 3D ' + product.name;
      detailModel.hidden = false;

    } else {
      detailModel.removeAttribute('src');
      detailModel.hidden = true;
    }
  }

  if (arHint) {
    arHint.hidden = !hasARModel;
  }

  // ===== CẬP NHẬT THÔNG TIN SẢN PHẨM =====

  $('#detail-category').textContent =
    CATEGORIES[product.category] || 'Sản phẩm';

  $('#detail-name').textContent = product.name;

  $('#detail-description').textContent =
    product.description || '';

  $('#detail-quantity').value = 1;

  // Hiển thị mô tả, tổng quan, thông số, kích thước
  renderProductInformation(product);

  // Thiết lập lựa chọn chất liệu
  $('#detail-material').value = 'carton';

  // ===== KHU VỰC CHỌN MÀU =====

  const colorSelect = $('#detail-color');
  const colorOptions = $('#detail-color-options');

  const colorLabel = document.querySelector(
    'label[for="detail-color"]'
  );

  const colorText = $('#detail-color-label');

  if (colors.length > 0) {

    renderProductColors(productForColors);

    colorSelect.style.display = '';
    colorOptions.style.display = 'flex';

    if (colorLabel) colorLabel.style.display = '';
    if (colorText) colorText.style.display = '';

  } else {

    colorSelect.innerHTML =
      '<option value="none">Mặc định</option>';

    colorSelect.value = 'none';

    colorOptions.innerHTML = '';

    colorSelect.style.display = 'none';
    colorOptions.style.display = 'none';

    if (colorLabel) colorLabel.style.display = 'none';
    if (colorText) colorText.style.display = 'none';

    currentDetailColor = 'none';
  }

  // Hiện hoặc ẩn khu vực tùy chỉnh
  $('#detail-customize').hidden = !canCustomize;

  // Cập nhật giá sản phẩm
  $('#detail-price').textContent = formatPrice(
    calculateUnitPrice(product, currentDetailMaterial)
  );

  $('#detail-material-note').textContent =
    'Phiên bản carton có mức giá tiêu chuẩn.';

  // Hiển thị cấu tạo module
  renderModuleSection(product);

  // Hiển thị đánh giá khách hàng
  renderProductReviews(product.id);

  // Mở cửa sổ chi tiết sản phẩm
  $('#productDialog').showModal();

  $('#productDialog').scrollTop = 0;

  // Google Analytics
  if (typeof gtag === 'function') {
    gtag('event', 'view_item', {
      currency: 'VND',

      value: calculateUnitPrice(
        product,
        currentDetailMaterial
      ),

      items: [
        analyticsItem(
          product,
          1,
          currentDetailMaterial,
          currentDetailColor
        )
      ]
    });
  }

}



/* ===== ĐÓNG CHI TIẾT SẢN PHẨM ===== */

function closeProductDetail() {
  const dialog = $('#productDialog');

  if (dialog.open) {
    dialog.close();
  }

  currentDetailProductId = null;
}


/* =====================================================
   GIỎ HÀNG CÓ LƯU CHẤT LIỆU VÀ MÀU SẮC
===================================================== */

function analyticsItem(
  product,
  quantity,
  material = 'none',
  color = 'none'
) {
  const unitPrice = calculateUnitPrice(product, material);

  const variant = [
    MATERIAL_LABELS[material],
    COLOR_LABELS[color]
  ].filter(Boolean).join(' - ');

  return {
    item_id: product.id,
    item_name: product.name,
    item_variant: variant,
    price: unitPrice,
    quantity
  };
}


/* ===== THÊM VÀO GIỎ ===== */

function addToCart(
  productId,
  material = 'carton',
  color = 'trang',
  quantity = 1
) {
  const product = getProduct(productId);
  if (!product) return;

  if (!isCustomizableModuleProduct(product)) {
    material = 'none';
    color = 'none';
  }

  const cartKey = `${productId}|${material}|${color}`;

  const amount = Math.max(1, Math.floor(Number(quantity) || 1));

  cart[cartKey] = (Number(cart[cartKey]) || 0) + amount;

  saveAndRenderCart();

  const unitPrice = calculateUnitPrice(product, material);

  gtag('event', 'add_to_cart', {
    currency: 'VND',
    value: unitPrice * amount,
    items: [
      analyticsItem(product, amount, material, color)
    ]
  });

  showToast('Đã thêm vào giỏ: ' + product.name);
}


/* ===== ĐIỀU CHỈNH SỐ LƯỢNG ===== */

function changeQuantity(cartKey, amount) {
  if (!cart[cartKey]) return;

  cart[cartKey] = Number(cart[cartKey]) + amount;

  if (cart[cartKey] <= 0) {
    delete cart[cartKey];
  }

  saveAndRenderCart();
}


/* ===== LẤY DỮ LIỆU GIỎ HÀNG ===== */

function getCartEntries() {
  return Object.entries(cart)
    .map(([key, quantity]) => {

      const parts = String(key).split('|');

      const id = parts[0];
      const product = getProduct(id);

      if (!product) return null;

      const canCustomize = isCustomizableModuleProduct(product);

      return {
        key,
        product,
        quantity: Number(quantity),

        material: parts[1] ||
          (canCustomize ? 'carton' : 'none'),

        color: parts[2] ||
          (canCustomize ? 'trang' : 'none')
      };
    })
    .filter(entry =>
      entry &&
      Number.isFinite(entry.quantity) &&
      entry.quantity > 0
    );
}


/* ===== TÍNH TỔNG TIỀN ===== */

function getCartTotal() {
  return getCartEntries().reduce((sum, entry) => {
    const unitPrice = calculateUnitPrice(
      entry.product,
      entry.material
    );

    return sum + unitPrice * entry.quantity;

  }, 0);
}

/* =====================================================
   XỬ LÝ MÃ GIẢM GIÁ
===================================================== */


/* ===== KIỂM TRA VOUCHER ===== */

function getVoucherInfo(code, subtotal = getCartTotal()) {

  const normalizedCode = String(code || '')
    .trim()
    .toUpperCase();

  if (!normalizedCode) {

    return {
      valid: false,
      reason: 'empty',
      discount: 0
    };

  }

  if (subtotal <= 0) {

    return {
      valid: false,
      reason: 'empty-cart',
      discount: 0
    };

  }

  const voucher = VOUCHERS[normalizedCode];

  if (!voucher || voucher.active === false) {

    return {
      valid: false,
      reason: 'invalid',
      discount: 0
    };

  }

  const minOrder = Math.max(
    0,
    Number(voucher.minOrder) || 0
  );

  // Kiểm tra giá trị đơn tối thiểu

  if (subtotal < minOrder) {

    return {
      valid: false,
      reason: 'minimum',
      minOrder: minOrder,
      discount: 0
    };

  }

  const value = Math.max(
    0,
    Number(voucher.value) || 0
  );

  let discount = 0;

  // Giảm theo phần trăm

  if (voucher.type === 'percent') {

    discount = Math.round(
      subtotal * Math.min(value, 100) / 100
    );

  }

  // Giảm số tiền cố định

  else if (voucher.type === 'fixed') {

    discount = value;

  }

  else {

    return {
      valid: false,
      reason: 'invalid-value',
      discount: 0
    };

  }

  // Áp dụng mức giảm tối đa

  const maxDiscount = Number(voucher.maxDiscount) || 0;

  if (maxDiscount > 0) {

    discount = Math.min(
      discount,
      maxDiscount
    );

  }

  // Không cho giảm nhiều hơn giá trị đơn hàng

  discount = Math.min(
    subtotal,
    Math.max(0, Math.round(discount))
  );

  if (discount <= 0) {

    return {
      valid: false,
      reason: 'invalid-value',
      discount: 0
    };

  }

  return {

    valid: true,

    code: normalizedCode,

    voucher: voucher,

    discount: discount

  };

}


/* ===== TÍNH TIỀN ĐƯỢC GIẢM ===== */

function getVoucherDiscount(subtotal = getCartTotal()) {

  const info = getVoucherInfo(
    appliedVoucherCode,
    subtotal
  );

  return info.valid ? info.discount : 0;

}


/* ===== TÍNH TỔNG THANH TOÁN SAU GIẢM ===== */

function getCartPayableTotal() {

  const subtotal = getCartTotal();

  const discount = getVoucherDiscount(subtotal);

  return Math.max(
    0,
    subtotal - discount
  );

}


/* ===== ĐỒNG BỘ VOUCHER TRÊN GIAO DIỆN ===== */

function updateVoucherUI(subtotal = getCartTotal()) {

  // Giỏ hàng trống thì bỏ voucher đã lưu

  if (subtotal <= 0 && appliedVoucherCode) {

    appliedVoucherCode = '';

    try {
      localStorage.removeItem('miugo-applied-voucher');
    } catch (error) {}

  }

  const info = appliedVoucherCode
    ? getVoucherInfo(appliedVoucherCode, subtotal)
    : { valid: false, reason: 'empty', discount: 0 };


  let message = 'Nhập mã ưu đãi để được giảm giá.';

  if (appliedVoucherCode) {

    if (info.valid) {

      message =
        'Đã áp dụng mã ' +
        info.code +
        '. Bạn được giảm ' +
        formatPrice(info.discount) + '.';

    }

    else if (info.reason === 'minimum') {

      message =
        'Đơn hàng cần đạt tối thiểu ' +
        formatPrice(info.minOrder) +
        ' để sử dụng mã này.';

    }

    else if (info.reason === 'empty-cart') {

      message = 'Vui lòng thêm sản phẩm vào giỏ hàng.';

    }

    else {

      message = 'Mã voucher không hợp lệ hoặc đã ngừng hoạt động.';

    }

  }


  // Hai vị trí sử dụng chung một voucher

  const locations = [

    {
      input: '#cart-voucher-input',
      status: '#cart-voucher-message',
      remove: '#cart-voucher-remove'
    },

    {
      input: '#checkout-voucher-input',
      status: '#checkout-voucher-message',
      remove: '#checkout-voucher-remove'
    }

  ];


  locations.forEach(location => {

    const input = $(location.input);

    const status = $(location.status);

    const remove = $(location.remove);


    if (input) {

      input.value = appliedVoucherCode;

    }

    if (status) {

      status.textContent = message;

      status.classList.toggle(
        'is-success',
        info.valid
      );

      status.classList.toggle(
        'is-error',
        Boolean(appliedVoucherCode) && !info.valid
      );

    }

    if (remove) {

      remove.hidden = !appliedVoucherCode;

    }

  });

}


/* ===== ÁP DỤNG VOUCHER ===== */

function applyVoucherFromInput(inputSelector, statusSelector) {

  const input = $(inputSelector);

  const status = $(statusSelector);

  if (!input) return;

  const code = input.value.trim().toUpperCase();

  if (!code) {

    if (status) {

      status.textContent = 'Vui lòng nhập mã voucher.';

      status.classList.add('is-error');

    }

    return;

  }


  const info = getVoucherInfo(code);


  // Mã không hợp lệ

  if (!info.valid) {

    let message = 'Mã voucher không hợp lệ.';

    if (info.reason === 'minimum') {

      message =
        'Đơn hàng phải từ ' +
        formatPrice(info.minOrder) +
        ' mới sử dụng được mã này.';

    }

    else if (info.reason === 'empty-cart') {

      message = 'Bạn chưa có sản phẩm trong giỏ hàng.';

    }

    else if (info.reason === 'invalid-value') {

      message = 'Mã giảm giá chưa được cấu hình hợp lệ.';

    }


    if (status) {

      status.textContent = message;

      status.classList.remove('is-success');

      status.classList.add('is-error');

    }


    // Giữ nguyên voucher cũ nếu có

    if (appliedVoucherCode) {

      input.value = appliedVoucherCode;

    }

    return;

  }


  // Lưu voucher mới

  appliedVoucherCode = info.code;

  try {

    localStorage.setItem(
      'miugo-applied-voucher',
      appliedVoucherCode
    );

  } catch (error) {}


  // Cập nhật cả giỏ hàng và thanh toán

  renderCart();

  renderCheckoutSummary();


  showToast(
    'Áp dụng voucher thành công! Giảm ' +
    formatPrice(info.discount)
  );

}


/* ===== GỠ VOUCHER ===== */

function removeAppliedVoucher() {

  appliedVoucherCode = '';

  try {

    localStorage.removeItem(
      'miugo-applied-voucher'
    );

  } catch (error) {}


  renderCart();

  renderCheckoutSummary();

  showToast('Đã gỡ mã giảm giá.');

}
/* ===== LƯU VÀ HIỂN THỊ GIỎ HÀNG ===== */

function saveAndRenderCart() {
  try {
    localStorage.setItem('mg', JSON.stringify(cart));
  } catch (error) {
    // Trình duyệt có thể không cho phép lưu localStorage.
  }

  renderCart();
}


/* ===== HIỂN THỊ GIỎ HÀNG ===== */

function renderCart() {

  const entries = getCartEntries();

  const subtotal = getCartTotal();

  const discount = getVoucherDiscount(subtotal);

  const total = Math.max(0, subtotal - discount);


  const count = entries.reduce(
    (sum, entry) => sum + entry.quantity,
    0
  );

  $('#cnt').textContent = count;


  $('#items').innerHTML = entries.map(entry => {

    const product = entry.product;

    const unitPrice = calculateUnitPrice(
      product,
      entry.material
    );

    const options = [
      MATERIAL_LABELS[entry.material],
      COLOR_LABELS[entry.color]
    ].filter(Boolean).join(' / ');


    return `
      <div class="ci">

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          onerror="this.src='images/placeholder.svg'"
        >

        <div>

          <b>${escapeHTML(product.name)}</b>

          ${options
            ? `<br><small>${escapeHTML(options)}</small>`
            : ''
          }

          <br>${formatPrice(unitPrice)}

        </div>

        <div class="q">

          <button
            type="button"
            data-cart-action="minus"
            data-id="${escapeHTML(entry.key)}">
            −
          </button>

          ${entry.quantity}

          <button
            type="button"
            data-cart-action="plus"
            data-id="${escapeHTML(entry.key)}">
            +
          </button>

        </div>

      </div>
    `;

  }).join('') ||

    '<p style="padding:20px 0">Giỏ hàng đang trống. Chọn một sản phẩm để bắt đầu.</p>';


  // ===== HIỂN THỊ TỔNG TIỀN =====

  $('#cart-subtotal').textContent =
    formatPrice(subtotal);


  const discountRow = $('#cart-discount-row');

  if (discountRow) {

    discountRow.hidden = discount <= 0;

  }


  $('#cart-discount').textContent =
    '-' + formatPrice(discount);


  $('#tot').textContent =
    formatPrice(total);


  // ===== THÔNG TIN VẬN CHUYỂN =====

  $('#ship').innerHTML = subtotal >= CFG.FREE

    ? 'Đơn của bạn được miễn phí giao hàng'

    : `Mua thêm <b>${formatPrice(CFG.FREE - subtotal)}</b> để được miễn phí giao hàng`;


  $('#bar').style.width =

    Math.min(100, subtotal / CFG.FREE * 100) + '%';


  $('#go').disabled = total <= 0;


  // Đồng bộ mã voucher

  updateVoucherUI(subtotal);

}

function toggleCart(open) {
  $('#cart').classList.toggle('on', Boolean(open));
  $('#ov').classList.toggle('on', Boolean(open));
  $('#cart').setAttribute('aria-hidden', String(!open));
  $('#ov').setAttribute('aria-hidden', String(!open));
  if (open) gtag('event', 'view_cart', {
  currency: 'VND',
  value: getCartPayableTotal()
});
}

/* ===== THÔNG BÁO NHỎ ===== */
function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('on');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('on'), 2300);
}

/* ===== GỬI FORM: EMAIL HOẶC FORMSPREE ===== */
async function sendMessage(subject, body) {
  if (CFG.FORM) {
    try {
      const response = await fetch(CFG.FORM, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ subject, message: body })
      });
      if (!response.ok) throw new Error('Không gửi được biểu mẫu');
      return 'sent';
    } catch (error) {
      console.error(error);
      return 'error';
    }
  }

  const mailto = `mailto:${CFG.EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
  return 'email';
}


/* =====================================================
   MIUGO PETS - THANH TOÁN DEMO
===================================================== */

/* ===== HIỂN THỊ ĐƠN HÀNG THANH TOÁN ===== */

function renderCheckoutSummary() {

  const container = $('#checkout-items');

  if (!container) return;


  const entries = getCartEntries();

  const subtotal = getCartTotal();

  const discount = getVoucherDiscount(subtotal);

  const total = Math.max(0, subtotal - discount);


  container.innerHTML = entries.map(entry => {

    const product = entry.product;

    const unitPrice = calculateUnitPrice(
      product,
      entry.material
    );

    const options = [
      MATERIAL_LABELS[entry.material],
      COLOR_LABELS[entry.color]
    ].filter(Boolean).join(' / ');


    return `
      <div class="checkout-item">

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          onerror="this.src='images/placeholder.svg'"
        >

        <div class="checkout-item-info">

          <b>${escapeHTML(product.name)}</b>

          <small>
            ${escapeHTML(options || 'Mặc định')}
            × ${entry.quantity}
          </small>

        </div>

        <b class="checkout-item-price">
          ${formatPrice(unitPrice * entry.quantity)}
        </b>

      </div>
    `;

  }).join('');


  // Tạm tính

  $('#checkout-subtotal').textContent =
    formatPrice(subtotal);


  // Tiền được giảm

  const discountRow = $('#checkout-discount-row');

  if (discountRow) {

    discountRow.hidden = discount <= 0;

  }

  $('#checkout-discount').textContent =
    '-' + formatPrice(discount);


  // Tổng tiền khách phải trả

  $('#checkout-total').textContent =
    formatPrice(total);


  // Đồng bộ voucher giữa hai giao diện

  updateVoucherUI(subtotal);

}


// Hiển thị phần tương ứng với phương thức thanh toán
function updateCheckoutPaymentUI() {

  const selected = document.querySelector(
    '#fo input[name="pay"]:checked'
  );

  const method = selected ? selected.value : 'transfer';

  const transferPreview = $('#checkout-transfer-preview');
  const codNote = $('#checkout-cod-note');

  if (transferPreview) {
    transferPreview.hidden = method !== 'transfer';
  }

  if (codNote) {
    codNote.hidden = method !== 'cod';
  }

}


// Chuyển giữa các bước thanh toán
function setCheckoutStep(step) {

  const formStep = $('#checkout-form-step');
  const transferStep = $('#checkout-transfer-step');
  const statusStep = $('#checkout-status-step');
  const backButton = $('#backToCart');

  if (formStep) {
    formStep.hidden = step !== 'form';
  }

  if (transferStep) {
    transferStep.hidden = step !== 'transfer';
  }

  if (statusStep) {
    statusStep.hidden = step !== 'status';
  }

  if (backButton) {
    backButton.hidden = step === 'status';
  }

}


// Mở trang thanh toán toàn màn hình
function openCheckout() {

  const dialog = $('#ck');
  const form = $('#fo');

  if (!dialog || !form) return;

  currentDemoOrder = null;

  form.reset();

  setCheckoutStep('form');

  renderCheckoutSummary();

  updateCheckoutPaymentUI();

  if (!dialog.open) {
    dialog.showModal();
  }

}


// Hoàn tất đơn hàng demo
function completeDemoOrder(method) {

  if (!currentDemoOrder) return;

  const order = currentDemoOrder;

  const isTransfer = method === 'transfer';

  $('#checkout-status-heading').textContent =
    'Đơn hàng đang được giao đến bạn!';

  $('#checkout-status-message').textContent = isTransfer
    ? 'MiuGo Pets đã ghi nhận thao tác xác nhận chuyển khoản của bạn. Đơn hàng đang được giao đến bạn.'
    : 'Vui lòng chuẩn bị tiền mặt khi nhận hàng. Đơn hàng đang được giao đến bạn.';

  $('#checkout-status-order').textContent =
    'Mã đơn hàng: ' + order.id;

  $('#checkout-status-payment').textContent = isTransfer
    ? 'Phương thức thanh toán: Chuyển khoản online'
    : 'Phương thức thanh toán: Thanh toán khi nhận hàng (COD)';

  // Mô phỏng hoàn tất đơn hàng và làm trống giỏ
  cart = {};
  saveAndRenderCart();

  setCheckoutStep('status');

}


// Xử lý khi khách bấm Đặt hàng
function handleCheckoutSubmit(event) {

  event.preventDefault();

  const entries = getCartEntries();

  if (!entries.length) {
    showToast('Giỏ hàng đang trống.');
    $('#ck').close();
    return;
  }

  const formData = new FormData(event.currentTarget);

  const subtotal = getCartTotal();

const discount = getVoucherDiscount(subtotal);

const total = Math.max(0, subtotal - discount);
  const method = formData.get('pay') || 'transfer';

  // Tạo mã đơn hàng mô phỏng
  const orderId = 'MG' + Date.now().toString().slice(-8);

  currentDemoOrder = {

  id: orderId,

  name: formData.get('name'),
  phone: formData.get('phone'),
  email: formData.get('email'),
  address: formData.get('addr'),
  note: formData.get('note'),

  // Giá trị ban đầu
  subtotal: subtotal,

  // Số tiền giảm
  discount: discount,

  // Mã voucher đã sử dụng
  voucherCode: appliedVoucherCode,

  // Số tiền khách thực tế phải trả
  total: total,

  payment: method

};

  // Nếu chuyển khoản: chuyển sang bước hiển thị QR
  if (method === 'transfer') {

    $('#checkout-order-code').textContent = orderId;

    $('#checkout-transfer-amount').textContent =
      formatPrice(total);

    $('#checkout-transfer-reference').textContent =
      'Nội dung chuyển khoản: MIUGO ' + orderId;

    setCheckoutStep('transfer');

    return;
  }

  // Nếu COD: hiện trạng thái đơn hàng ngay
  completeDemoOrder('cod');

}


async function handleVetSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = Object.fromEntries(new FormData(form));
  const body = `Dịch vụ: ${formData.svc}\nHọ tên: ${formData.name}\nSĐT: ${formData.phone}\nKhu vực: ${formData.area}\nGhi chú: ${formData.note || ''}`;
  const result = await sendMessage('Đặt lịch thú y - ' + formData.name, body);

  if (result === 'sent') {
    form.reset();
    showToast('Đã gửi yêu cầu đặt lịch thú y.');
  } else if (result === 'email') {
    showToast('Đã mở email nháp. Hãy kiểm tra và bấm Gửi.');
  } else {
    showToast('Chưa gửi được. Kiểm tra lại cấu hình Formspree hoặc email.');
  }
}


/* ===== GẮN SỰ KIỆN CHO CÁC TRANG ===== */
function setupEvents() {

  // Chỉ gắn sự kiện khi phần tử thực sự tồn tại trên trang.
  const bind = (selector, eventName, handler) => {
    const element = $(selector);

    if (element) {
      element.addEventListener(eventName, handler);
    }
  };

  // DANH MỤC SẢN PHẨM - chỉ có ở trang chủ
  bind('#ch', 'click', (event) => {
    const button = event.target.closest('[data-category]');
    if (!button) return;

    activeCategory = button.dataset.category;
    renderCategories();
    renderProducts();

    gtag('event', 'select_content', {
      content_type: 'category',
      item_id: activeCategory
    });
  });

  bind('#q', 'input', (event) => {
    searchText = event.target.value.trim();
    renderProducts();
  });

  bind('#so', 'change', (event) => {
    sortMode = event.target.value;
    renderProducts();
  });

  bind('#grid', 'click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;

    const { action, id } = button.dataset;

    if (action === 'add') addToCart(id);
    if (action === 'detail') openProductDetail(id);
  });

  // GIỎ HÀNG - dùng chung hai trang
  bind('#items', 'click', (event) => {
    const button = event.target.closest('[data-cart-action]');
    if (!button) return;

    changeQuantity(
      button.dataset.id,
      button.dataset.cartAction === 'plus' ? 1 : -1
    );
  });

  bind('#cb', 'click', () => toggleCart(true));
  bind('#closeCart', 'click', () => toggleCart(false));
  bind('#ov', 'click', () => toggleCart(false));
  // ===== SỰ KIỆN VOUCHER GIỎ HÀNG =====

bind('#cart-voucher-apply', 'click', () => {

  applyVoucherFromInput(
    '#cart-voucher-input',
    '#cart-voucher-message'
  );

});

bind('#cart-voucher-remove', 'click', removeAppliedVoucher);


// ===== SỰ KIỆN VOUCHER THANH TOÁN =====

bind('#checkout-voucher-apply', 'click', () => {

  applyVoucherFromInput(
    '#checkout-voucher-input',
    '#checkout-voucher-message'
  );

});

bind('#checkout-voucher-remove', 'click', removeAppliedVoucher);


// ===== NHẤN ENTER ĐỂ ÁP DỤNG VOUCHER =====

bind('#cart-voucher-input', 'keydown', event => {

  if (event.key === 'Enter') {

    event.preventDefault();

    applyVoucherFromInput(
      '#cart-voucher-input',
      '#cart-voucher-message'
    );

  }

});

bind('#checkout-voucher-input', 'keydown', event => {

  if (event.key === 'Enter') {

    event.preventDefault();

    applyVoucherFromInput(
      '#checkout-voucher-input',
      '#checkout-voucher-message'
    );

  }

});

  // Mở trang thanh toán toàn màn hình
bind('#go', 'click', () => {

  if (!getCartEntries().length) return;

  const total = getCartPayableTotal();

  const items = getCartEntries().map(entry =>
    analyticsItem(
      entry.product,
      entry.quantity,
      entry.material,
      entry.color
    )
  );

  toggleCart(false);

  openCheckout();

  gtag('event', 'begin_checkout', {
    currency: 'VND',
    value: total,
    items: items
  });

});
// Quay lại giỏ hàng
bind('#backToCart', 'click', () => {
  $('#ck').close();
  toggleCart(true);
});
// Đóng cửa sổ chi tiết sản phẩm bằng nút X
bind('#closeProduct', 'click', closeProductDetail);
bind('#closeProduct2', 'click', closeProductDetail);

// Gửi thông tin thanh toán
bind('#fo', 'submit', handleCheckoutSubmit);

// Cập nhật phương thức thanh toán
bind('#fo', 'change', event => {
  if (event.target.name === 'pay') {
    updateCheckoutPaymentUI();
  }
});

// Xác nhận chuyển khoản
bind('#confirm-transfer', 'click', () => {
  completeDemoOrder('transfer');
});

// Kết thúc thanh toán
bind('#finish-checkout', 'click', () => {
  $('#ck').close();
  $('#fo').reset();
  currentDemoOrder = null;
});
}

/* =====================================================
   MIUGO PETS - HERO SLIDESHOW QUẢNG CÁO
===================================================== */

/*
  DANH SÁCH ẢNH QUẢNG CÁO

  Bạn có thể:
  - Thêm ảnh mới.
  - Xóa ảnh không muốn sử dụng.
  - Thay đổi đường dẫn ảnh.
  - Thay đổi nội dung mô tả ảnh.
*/

const HERO_SLIDES = [

  {
    src: 'images/hero/hero.jpg',
    alt: 'Nhà module carton dành cho mèo'
  },

  {
    src: 'images/hero/hero-2.jpg',
    alt: 'Các sản phẩm module MiuGo Pets'
  },

  {
    src: 'images/hero/hero-3.jpg',
    alt: 'Không gian vui chơi cho mèo'
  },
  {
    src: 'images/hero/hero-4.jpg',
    alt: 'Không gian vui chơi cho mèo'
  },
  {
    src: 'images/hero/hero-5.jpg',
    alt: 'Không gian vui chơi cho mèo'
  },


];

/* Thời gian chuyển ảnh: 12000 = 12 giây */
const HERO_SLIDE_INTERVAL = 12000;

/* ===== KHỞI TẠO SLIDESHOW ===== */

function setupHeroSlideshow() {

  const heroImage = $('#hero-slide-image');

  // Không có banner thì bỏ qua.
  if (!heroImage) return;

  // Chỉ chạy khi có ít nhất 2 ảnh.
  if (HERO_SLIDES.length < 2) return;

  let currentIndex = 0;

  // Tải trước ảnh để giảm thời gian chờ.
  HERO_SLIDES.slice(1).forEach(slide => {
    const preload = new Image();
    preload.src = slide.src;
  });

  // Chuyển sang ảnh tiếp theo.
  function nextHeroSlide() {

    heroImage.style.opacity = '0';

    setTimeout(() => {

      currentIndex =
        (currentIndex + 1) % HERO_SLIDES.length;

      const nextSlide = HERO_SLIDES[currentIndex];

      heroImage.src = nextSlide.src;
      heroImage.alt = nextSlide.alt;

      heroImage.style.opacity = '1';

    }, 350);
  }

  // Tự động chuyển ảnh và lặp vô hạn.
  window.setInterval(
    nextHeroSlide,
    HERO_SLIDE_INTERVAL
  );

}

/* ==========================================================
   MIUGO PETS - CHATBOT TU DONG
   Khong can backend, khong can API.
   Lay san pham truc tiep tu mang PRODUCTS.
========================================================== */

/* ===== CHUAN HOA TIENG VIET ===== */

function mgChatNormalize(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* Lay toan bo noi dung trong du lieu san pham */

function mgChatFlatten(value) {

  if (Array.isArray(value)) {
    return value.map(mgChatFlatten).join(' ');
  }

  if (value && typeof value === 'object') {
    return Object.values(value).map(mgChatFlatten).join(' ');
  }

  return value == null ? '' : String(value);
}

/* ===== TIM KIEM SAN PHAM TU PRODUCTS ===== */

function mgChatGetProductText(product) {

  return mgChatNormalize([
    product.id,
    product.name,
    product.category,
    CATEGORIES[product.category] || '',
    product.description,
    product.tag,
    product.details || {},
    product.colors || []
  ].map(mgChatFlatten).join(' '));
}

/*
  Chi khai bao tu khoa nhom san pham.
  Khong khai bao ten, gia hay mo ta san pham tai day.
*/

function mgChatFindProducts(question) {

  const query = mgChatNormalize(question);

  // Nhan dien nhom san pham
  const categoryRules = [
    {
      category: 'module-le',
      keywords: [
        'module rieng le',
        'module don le',
        'mua tung module',
        'mua module rieng'
      ]
    },
    {
      category: 'cao',
      keywords: [
        'ban cao',
        'cao mong',
        'cao mong meo'
      ]
    },
    {
      category: 'choi',
      keywords: [
        'do choi',
        'bong len',
        'can cau meo'
      ]
    },
    {
      category: 'an',
      keywords: [
        'bat an',
        'bat uong',
        'an uong'
      ]
    },
    {
      category: 'vs',
      keywords: [
        've sinh',
        'khay ve sinh',
        'xuc cat',
        'cat ve sinh'
      ]
    },
    {
      category: 'nha',
      keywords: [
        'nha module lap ghep',
        'nha meo',
        'kitten castle',
        'bo module',
        'module thap',
        'module doc leo'
      ]
    }
  ];

  const matchedRule = categoryRules.find(rule =>
    rule.keywords.some(keyword =>
      query.includes(keyword)
    )
  );

  // Neu khach hoi theo nhom, lay san pham tu PRODUCTS
  if (matchedRule) {

    return PRODUCTS.filter(product =>
      product.category === matchedRule.category
    ).slice(0, 4);

  }

  // Neu hoi theo ten, dac diem hoac thong so san pham
  const ignoredWords = [
    'toi', 'muon', 'tim', 'xem', 'cho',
    'meo', 'san', 'pham', 'co', 'la',
    'nhung', 'cac', 'gi', 'nao', 'nhi',
    'giup', 'minh', 'ban', 'shop', 'voi',
    'hay', 'tu', 'van', 'mot', 'loai',
    've', 'bao', 'nhieu'
  ];

  const tokens = query
    .split(' ')
    .filter(word =>
      word.length >= 2 &&
      !ignoredWords.includes(word)
    );

  if (!tokens.length) return [];

  const scored = PRODUCTS.map(product => {

    const productText = mgChatGetProductText(product);

    let score = 0;

    // Ten san pham duoc uu tien
    const productName = mgChatNormalize(product.name);

    if (productName && query.includes(productName)) {
      score += 10;
    }

    // Tim tu khoa trong thong tin san pham
    tokens.forEach(token => {

      if (productText.includes(token)) {
        score += 1;
      }

    });

    return { product, score };

  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(item => item.product);
}

/* ===== HIEN THI TIN NHAN ===== */

function mgChatAppendMessage(type, message) {

  const container = $('#miugo-chat-messages');

  if (!container) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'mg-chat-message ' + type;

  const bubble = document.createElement('div');
  bubble.className = 'mg-chat-bubble';

  bubble.textContent = message;

  wrapper.appendChild(bubble);
  container.appendChild(wrapper);

  container.scrollTop = container.scrollHeight;
}


/* ===== HIEN THI THE SAN PHAM ===== */

function mgChatRenderProducts(products) {

  const container = $('#miugo-chat-messages');

  if (!container || !products || !products.length) return;

  // Khung chứa danh sách sản phẩm
  const results = document.createElement('div');
  results.className = 'mg-chat-product-results is-collapsed';

  const list = document.createElement('div');
  list.className = 'mg-chat-product-list';

  list.innerHTML = products.map(product => {

    const dimensions = product.details &&
      Array.isArray(product.details.dimensions)
      ? product.details.dimensions.join(' • ')
      : '';

    const specifications = product.details &&
      Array.isArray(product.details.specifications)
      ? product.details.specifications
          .slice(0, 2)
          .map(item => Array.isArray(item)
            ? item.join(': ')
            : item
          )
          .join(' • ')
      : '';

    return `
      <article class="mg-chat-product">

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          onerror="this.src='images/placeholder.svg'"
        >

        <div class="mg-chat-product-info">

          <h4>${escapeHTML(product.name)}</h4>

          <p>${escapeHTML(product.description)}</p>

          <b class="mg-chat-product-price">
            ${formatPrice(product.price)}
          </b>

          ${dimensions
            ? `<div class="mg-chat-product-meta">
                 ${escapeHTML(dimensions)}
               </div>`
            : ''
          }

          ${specifications
            ? `<div class="mg-chat-product-meta">
                 ${escapeHTML(specifications)}
               </div>`
            : ''
          }

          <div class="mg-chat-product-actions">

            <button
              type="button"
              data-chat-action="view"
              data-id="${escapeHTML(product.id)}"
            >
              Xem chi tiết
            </button>

            <button
              type="button"
              class="secondary"
              data-chat-action="add"
              data-id="${escapeHTML(product.id)}"
            >
              Thêm vào giỏ
            </button>

          </div>

        </div>

      </article>
    `;

  }).join('');

  results.appendChild(list);

  // Chỉ hiện nút mở rộng khi có trên 2 sản phẩm
  if (products.length > 2) {

    const toggleButton = document.createElement('button');

    toggleButton.type = 'button';
    toggleButton.className = 'mg-chat-products-toggle';
    toggleButton.dataset.chatProductsToggle = 'true';

    toggleButton.textContent =
      `Xem tất cả ${products.length} sản phẩm`;

    results.appendChild(toggleButton);
  }

  container.appendChild(results);

  container.scrollTop = container.scrollHeight;
}


/* ===== TRA LOI KHACH HANG ===== */

function mgChatAnswer(question) {

  const query = mgChatNormalize(question);

  // Loi chao
  if (
    query === 'hi' ||
    query === 'hello' ||
    query.includes('xin chao') ||
    query.startsWith('chao')
  ) {

    mgChatAppendMessage(
      'bot',
      'Xin chào! 🐱 MiuGo Pets có thể giúp bạn tìm sản phẩm, tìm hiểu module, chất liệu và cách mua hàng. Bạn đang quan tâm đến điều gì?'
    );

    return;
  }

  // Van chuyen
  if (
    query.includes('giao hang') ||
    query.includes('van chuyen') ||
    query.includes('mien phi ship')
  ) {

    mgChatAppendMessage(
      'bot',
      'Theo chính sách đang được cấu hình trên website, đơn hàng từ ' +
      formatPrice(CFG.FREE) +
      ' được miễn phí giao hàng. Bạn có thể tiếp tục chọn sản phẩm trong cửa hàng nhé!'
    );

    return;
  }

  // Chat lieu
  if (
    query.includes('chat lieu') &&
    !query.includes('san pham')
  ) {

    const increase = Math.round(
      (WOOD_PRICE_MULTIPLIER - 1) * 100
    );

    mgChatAppendMessage(
      'bot',
      'Các sản phẩm module có tùy chọn Carton và Gỗ theo cấu hình của từng sản phẩm. Phiên bản Gỗ hiện được tính tăng ' +
      increase +
      '% so với giá gốc. Bạn có thể mở chi tiết sản phẩm để xem lựa chọn.'
    );

    const moduleProducts = PRODUCTS.filter(product =>
      isCustomizableModuleProduct(product)
    ).slice(0, 3);

    mgChatRenderProducts(moduleProducts);

    return;
  }

  // Tim san pham
  const products = mgChatFindProducts(question);

  if (products.length) {

    mgChatAppendMessage(
      'bot',
      'Mình tìm thấy một số sản phẩm phù hợp với nội dung bạn đang quan tâm. Bạn có thể xem thông tin, giá và thêm trực tiếp vào giỏ hàng nhé!'
    );

    mgChatRenderProducts(products);

    return;
  }

  // Tu van mau sac
  if (
    query.includes('mau sac') ||
    query.includes('mau nao')
  ) {

    mgChatAppendMessage(
      'bot',
      'Màu sắc được cấu hình riêng theo từng sản phẩm. Bạn hãy mở chi tiết sản phẩm để xem các màu hiện có và lựa chọn phiên bản phù hợp nhé!'
    );

    return;
  }

  // Huong dan mua hang
  if (
    query.includes('dat hang') ||
    query.includes('mua hang') ||
    query.includes('thanh toan') ||
    query.includes('gio hang')
  ) {

    mgChatAppendMessage(
      'bot',
      'Bạn có thể chọn sản phẩm, bấm Xem chi tiết hoặc Thêm vào giỏ hàng. Sau đó mở Giỏ hàng, kiểm tra số lượng và chọn Đặt hàng để điền thông tin nhận hàng.'
    );

    return;
  }

  // Cau hoi khong nhan dien duoc
  mgChatAppendMessage(
    'bot',
    'Mình chưa tìm thấy thông tin phù hợp với câu hỏi này. Bạn thử cho mình biết tên sản phẩm hoặc nhu cầu cụ thể hơn nhé. Bạn cũng có thể liên hệ trực tiếp với MiuGo Pets qua Zalo hoặc Facebook ở phía trên.'
  );
}

/* ===== GUI TIN NHAN ===== */

function mgChatSendMessage(message) {

  const text = String(message || '').trim();

  if (!text) return;

  mgChatAppendMessage('user', text);

  mgChatAnswer(text);
}

/* ===== MO / DONG CHAT ===== */

function mgChatToggle(open) {

  const panel = $('#miugo-chat-panel');
  const button = $('#zl');

  if (!panel) return;

  const shouldOpen = typeof open === 'boolean'
    ? open
    : panel.hidden;

  panel.hidden = !shouldOpen;

  if (button) {
    button.setAttribute(
      'aria-expanded',
      String(shouldOpen)
    );
  }

  if (shouldOpen) {
    const input = $('#miugo-chat-input');

    if (input) input.focus();
  }
}

/* ===== MO CHI TIET SAN PHAM TU CHAT ===== */

function mgChatOpenProduct(productId) {

  const product = getProduct(productId);

  if (!product) return;

  mgChatToggle(false);

  // Neu dang o trang chu, mo truc tiep chi tiet san pham.
  if ($('#grid')) {

    window.location.hash = 'sp';
    openProductDetail(productId);

    return;
  }

  // Neu dang o trang thuong hieu, chuyen den trang chu
  // va tu dong mo san pham duoc chon.
  window.location.href =
    'index.html?chatProduct=' +
    encodeURIComponent(productId) +
    '#sp';
}


/* ===== SU KIEN CHATBOT ===== */

function setupMiuGoChat() {

  const trigger = $('#zl');
  const panel = $('#miugo-chat-panel');
  const closeButton = $('#miugo-chat-close');
  const resetButton = $('#miugo-chat-reset');
  const form = $('#miugo-chat-form');
  const input = $('#miugo-chat-input');
  const messages = $('#miugo-chat-messages');

  // Bấm bong bóng chat để mở cửa sổ
  if (trigger) {

    trigger.addEventListener('click', event => {

      event.preventDefault();
      event.stopPropagation();

      if (!panel) return;

      mgChatToggle();

      if (typeof gtag === 'function') {
        gtag('event', 'open_chat', {
          method: 'website'
        });
      }

    });

  }

  // Kiểm tra các thành phần cần thiết
  if (!panel || !form || !input || !messages) return;

  // Lưu nội dung ban đầu gồm lời chào và câu hỏi gợi ý
  const initialMessagesHTML = messages.innerHTML;

  // Đóng chatbot
  if (closeButton) {

    closeButton.addEventListener('click', event => {

      event.preventDefault();
      event.stopPropagation();

      mgChatToggle(false);

    });

  }

  // Làm mới toàn bộ cuộc trò chuyện
  if (resetButton) {

    resetButton.addEventListener('click', event => {

      event.preventDefault();
      event.stopPropagation();

      // Khôi phục lời chào và câu hỏi gợi ý ban đầu
      messages.innerHTML = initialMessagesHTML;

      // Xóa nội dung ô nhập
      input.value = '';

      // Trở về đầu cuộc trò chuyện
      messages.scrollTop = 0;

      input.focus();

    });

  }

  // Gửi tin nhắn
  form.addEventListener('submit', event => {

    event.preventDefault();

    const message = input.value.trim();

    if (!message) return;

    input.value = '';

    mgChatSendMessage(message);

  });

  // Xử lý các nút bên trong nội dung chat
  messages.addEventListener('click', event => {

    // MỞ RỘNG / THU GỌN DANH SÁCH SẢN PHẨM
    const toggleButton = event.target.closest(
      '[data-chat-products-toggle]'
    );

    if (toggleButton) {

      const results = toggleButton.closest(
        '.mg-chat-product-results'
      );

      if (!results) return;

      const expanded = results.classList.toggle(
        'is-expanded'
      );

      results.classList.toggle(
        'is-collapsed',
        !expanded
      );

      const total = results.querySelectorAll(
        '.mg-chat-product'
      ).length;

      toggleButton.textContent = expanded
        ? 'Thu gọn sản phẩm'
        : `Xem tất cả ${total} sản phẩm`;

      return;
    }

    // CÂU HỎI GỢI Ý
    const promptButton = event.target.closest(
      '[data-chat-prompt]'
    );

    if (promptButton) {

      mgChatSendMessage(
        promptButton.dataset.chatPrompt
      );

      return;
    }

    // NÚT THAO TÁC SẢN PHẨM
    const productButton = event.target.closest(
      '[data-chat-action]'
    );

    if (!productButton) return;

    const productId = productButton.dataset.id;
    const action = productButton.dataset.chatAction;

    if (action === 'view') {

      mgChatOpenProduct(productId);

    }

    if (action === 'add') {

      addToCart(productId);

      showToast('Đã thêm sản phẩm vào giỏ hàng!');

      mgChatAppendMessage(
        'bot',
        'Mình đã thêm sản phẩm vào giỏ hàng với lựa chọn mặc định. Bạn có thể mở chi tiết sản phẩm để thay đổi chất liệu hoặc màu sắc trước khi đặt hàng.'
      );

    }

  });

  // Đóng chat bằng phím Escape
  document.addEventListener('keydown', event => {

    if (event.key === 'Escape') {
      mgChatToggle(false);
    }

  });

}


/* =========================================
   MIUGO PETS - NÚT CUỘN LÊN ĐẦU TRANG
========================================= */

function setupScrollProgressButton() {

    const button = document.getElementById(
        'scroll-progress-top'
    );

    if (!button) return;

    // Tính phần trăm đã cuộn
    function updateScrollProgress() {

        const page = document.documentElement;

        const maxScroll =
            page.scrollHeight - window.innerHeight;

        const currentScroll =
            window.scrollY || page.scrollTop || 0;

        // Tính tiến độ từ 0 đến 100%
        const progress = maxScroll > 0
            ? Math.min(Math.max(currentScroll / maxScroll, 0), 1)
            : 0;

        const percent = Math.round(progress * 100);

        // Cập nhật vòng tròn màu
        button.style.setProperty(
            '--scroll-progress',
            (progress * 360) + 'deg'
        );

        // Cập nhật thông tin hỗ trợ truy cập
        button.setAttribute(
            'aria-label',
            'Cuộn lên đầu trang. Đã cuộn ' + percent + '%'
        );

        // Chỉ hiện nút khi cuộn xuống hơn 250px
        button.classList.toggle(
            'is-visible',
            currentScroll > 250
        );
    }

    // Theo dõi thao tác cuộn
    window.addEventListener(
        'scroll',
        updateScrollProgress,
        { passive: true }
    );

    // Tính lại khi thay đổi kích thước màn hình
    window.addEventListener(
        'resize',
        updateScrollProgress
    );

    // Bấm nút để cuộn lên đầu trang
    button.addEventListener('click', function() {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    });

    // Khởi tạo trạng thái ban đầu
    updateScrollProgress();
}

/* ===== CHẠY KHI HTML ĐÃ TẢI XONG ===== */
function initMiuGo() {
  setupContactLinks();
  renderCategories();
  renderProducts();
  renderCart();
  setupEvents();

  // Khởi động trình chiếu ảnh quảng cáo
  setupHeroSlideshow();

  // Khởi động chatbot MiuGo Pets
  setupMiuGoChat();
  // Khởi động chức năng hỗ trợ người bị mù màu
setupColorAccessibility();
// Khởi động nút cuộn lên đầu trang
setupScrollProgressButton();

  // Mở chi tiết sản phẩm nếu khách chọn từ chatbot ở trang thương hiệu
  const params = new URLSearchParams(window.location.search);
  const chatProductId = params.get('chatProduct');

  if (chatProductId) {
    openProductDetail(chatProductId);
  }
  
}

initMiuGo();

/* ===== SỰ KIỆN CHỌN MÀU VÀ CHẤT LIỆU ===== */

// Chọn màu sản phẩm
const detailColorSelect = $('#detail-color');

if (detailColorSelect) {

  detailColorSelect.addEventListener('change', function () {

    const product = getProduct(currentDetailProductId);

    if (!product) return;

    updateProductColorImage(product, this.value);

  });

}

// Chọn chất liệu sản phẩm
const detailMaterialSelect = $('#detail-material');

if (detailMaterialSelect) {

  detailMaterialSelect.addEventListener('change', function () {

    const product = getProduct(currentDetailProductId);

    if (!product) return;

    currentDetailMaterial = this.value;

    updateProductDetailPrice(product);

  });

}

/* =========================================
   MIUGO ACCESSIBILITY - HỖ TRỢ MÀU SẮC
========================================= */

function setupColorAccessibility() {

    const toggle = document.getElementById(
        'color-accessibility-toggle'
    );

    const panel = document.getElementById(
        'color-accessibility-panel'
    );

    const closeButton = document.getElementById(
        'color-accessibility-close'
    );

    const applyButton = document.getElementById(
        'color-accessibility-apply'
    );

    const resetButton = document.getElementById(
        'color-accessibility-reset'
    );

    const status = document.getElementById(
        'color-accessibility-status'
    );

    // Không có giao diện hỗ trợ trên trang hiện tại
    if (!toggle || !panel) return;

    // Cập nhật trạng thái giao diện
    function setColorMode(enabled) {

        document.body.classList.toggle(
            'miugo-color-accessible',
            enabled
        );

        if (applyButton) {
            applyButton.setAttribute(
                'aria-pressed',
                String(enabled)
            );
        }

        if (status) {
            status.textContent = enabled
                ? 'Đang bật bảng màu xanh dương - cam.'
                : 'Đang sử dụng giao diện gốc.';
        }

        // Lưu lựa chọn trên trình duyệt
        try {
            if (enabled) {
                localStorage.setItem(
                    'miugo-color-accessible',
                    'on'
                );
            } else {
                localStorage.removeItem(
                    'miugo-color-accessible'
                );
            }
        } catch (error) {
            // Vẫn đổi giao diện dù trình duyệt không cho lưu
        }
    }

    // Mở hoặc đóng popup
    function togglePanel(show) {

        panel.hidden = !show;

        toggle.setAttribute(
            'aria-expanded',
            String(show)
        );
    }

    // Khôi phục lựa chọn đã lưu
    try {
        setColorMode(
            localStorage.getItem(
                'miugo-color-accessible'
            ) === 'on'
        );
    } catch (error) {
        setColorMode(false);
    }

    // Bấm bong bóng hỗ trợ màu sắc
    toggle.addEventListener('click', function(event) {

        event.preventDefault();
        event.stopPropagation();

        togglePanel(panel.hidden);

    });

    // Bấm bên trong popup không làm popup tự đóng
    panel.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Bật bảng màu mới
    if (applyButton) {
        applyButton.addEventListener('click', function(event) {

            event.preventDefault();

            setColorMode(true);

        });
    }

    // Trở về giao diện ban đầu
    if (resetButton) {
        resetButton.addEventListener('click', function(event) {

            event.preventDefault();

            setColorMode(false);

        });
    }

    // Đóng popup
    if (closeButton) {
        closeButton.addEventListener('click', function() {

            togglePanel(false);
            toggle.focus();

        });
    }

    // Bấm ra ngoài popup thì đóng
    document.addEventListener('click', function(event) {

        if (
            !panel.contains(event.target) &&
            !toggle.contains(event.target)
        ) {
            togglePanel(false);
        }

    });

    // Nhấn Escape để đóng popup
    document.addEventListener('keydown', function(event) {

        if (event.key === 'Escape') {
            togglePanel(false);
        }

    });

}

