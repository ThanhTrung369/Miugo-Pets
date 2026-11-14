MIUGO PETS - WEBSITE THUONG MAI DIEN TU DEMO
============================================

1. MO WEBSITE
- Giai nen file ZIP (neu ban tai ban ZIP).
- Mo thu muc miugo-pets bang Visual Studio Code.
- Cai extension Live Server (neu chua co).
- Bam chuot phai vao index.html > Open with Live Server.
- Khong doi ten hoac di chuyen rieng thu muc images neu chua sua lai duong dan.

2. BA FILE CHINH
- index.html : cau truc va noi dung cac khu vuc cua website.
- style.css  : mau sac, bo cuc, responsive va giao dien.
- script.js  : danh sach san pham, loc/tim kiem, chi tiet, gio hang, form.

3. THAY ANH SAN PHAM
- Mo thu muc images/products.
- Copy anh moi vao day, nen dat ten khong dau, khong khoang trang.
- Mo script.js, tim san pham can sua trong mang PRODUCTS.
- Doi gia tri image thanh duong dan moi, vi du:
  image: 'images/products/ten-anh-moi.webp'
- Ten file trong duong dan phai trung khop chinh xac voi ten anh.
- Co the dung JPG/JPEG, PNG hoac WebP. Anh san pham chup that nen uu tien WebP/JPG.

4. THEM SAN PHAM MOI
Trong script.js, tim dong:
  const PRODUCTS = [

Sao chep mot object san pham va dan them vao mang, truoc dau dong ]; cuoi mang.
Vi du:
  {
    id: 'm16',
    category: 'choi',
    name: 'Chuot bong cho meo',
    price: 69000,
    image: 'images/products/chuot-bong.jpg',
    description: 'Do choi nho cho meo van dong trong phong.',
    tag: 'Mới'
  },

Luu y:
- id phai khac tat ca id san pham khac.
- category phai la mot trong cac ma: nha, cao, choi, an, vs.
- price chi nhap so, khong them dau cham hoac ky hieu tien.
- image la duong dan anh da chep vao thu muc images/products.

5. DOI THONG TIN LIEN HE / PHI GIAO HANG
Trong script.js, sua object CFG o gan dau file:
- ZALO: so dien thoai Zalo.
- EMAIL: email nhan don.
- FORM: link Formspree neu muon gui form len dich vu ben ngoai.
- FREE: muc don hang mien phi van chuyen.
- GA: ma Google Analytics 4; de nguyen G-XXXXXXXXXX neu chua co ma that.

6. LUU Y VE DEMO KHONG BACKEND
- Danh sach san pham duoc quan ly bang mang PRODUCTS trong script.js.
- Gio hang chi luu trong localStorage cua trinh duyet tren may dang mo web.
- Neu chua cau hinh FORM, bam gui don se mo email nhap san noi dung; nguoi dung van phai bam Gui trong ung dung email.
- Neu muon form tu gui va luu thong tin online, can tao endpoint Formspree va dan link vao CFG.FORM.
- Website nay chua co dang nhap, quan tri san pham, co so du lieu hay thanh toan that.
