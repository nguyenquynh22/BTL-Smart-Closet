## Turborepo (turbo.json) có công dụng gì?

Turborepo là một build system (công cụ điều phối build/chạy ứng dụng) chuyên dành cho Monorepo. Khi dự án của bạn có nhiều ứng dụng (admin-web, mobile-app, backend) và nhiều thư viện dùng chung (packages), Turborepo giải quyết 3 vấn đề lớn:

1. Chạy nhiều ứng dụng/task cùng lúc chỉ bằng 1 câu lệnh

Không dùng Turbo: Bạn phải mở 3 cửa sổ terminal: một cái cd apps/admin-web && npm run dev, một cái cd apps/mobile-app && npx expo start, một cái cd apps/backend && npm run dev.

Có Turbo: Bạn chỉ cần đứng ở thư mục gốc và gõ npx turbo dev. Turbo sẽ tự động kích hoạt tất cả các ứng dụng cùng một lúc ngay trên một màn hình terminal.

2. Caching thông minh (Siêu nhanh)

Khi bạn chạy lệnh npx turbo build, Turbo sẽ ghi nhớ (cache) kết quả build của từng app và package.

Nếu lần sau bạn chỉ sửa code bên admin-web mà không đụng vào mobile-app, Turbo sẽ bỏ qua việc build lại mobile-app và trả về kết quả ngay lập tức (chỉ mất vài mili-giây).

3. Quản lý thứ tự phụ thuộc (Task Pipeline)

turbo.json định nghĩa rõ thứ tự công việc.

Ví dụ: Khi bạn gõ turbo build, Turbo biết rằng nó phải build các thư viện dùng chung trong packages/ trước, sau đó mới tiến hành build admin-web hay mobile-app.

### Chạy toàn bộ (Web + App + Backend):

npm run dev

### Chạy riêng Web (admin-web):

npx turbo dev --filter=admin-web

### Chạy riêng App (mobile-app):

npx turbo dev --filter=mobile-app

### Chạy riêng Backend (backend):

npx turbo dev --filter=backend

### Chạy kết hợp 2 phần (VD: Web + Backend, không chạy App):

npx turbo dev --filter=admin-web --filter=backend

## Mẹo: Bạn cũng có thể thêm trực tiếp các lệnh này vào mục "scripts" của package.json gốc để gõ cho ngắn:

"scripts": {
"build": "turbo build",
"dev": "turbo dev",
"dev:web": "turbo dev --filter=admin-web",
"dev:mobile": "turbo dev --filter=mobile-app",
"dev:backend": "turbo dev --filter=backend"
}
Khi đó chỉ cần gõ: npm run dev:web hoặc npm run dev:mobile.

1. shift + alt + F: căn chỉnh code
2. Ctrl + Shift + V: chạy file .md
3. ctrl + space: gợi ý code
4. Shift + Alt + Down: nhân bản 1 dòng xuống dưới liền kề
5. Alt + Up / Down: di chuyển 1 dòng lên trên/xuống dưới
6. Ctrl + D: bôi đen 1 từ => chọn từ y hệt tiếp theo
7. Ctrl + Shift + L: bôi đen 1 từ => chọn tất cả từ giống như vậy trong 1 file

8. Ctrl + /: Bật / Tắt ghi chú (Comment) cho dòng hoặc đoạn code.
9. Ctrl + X (khi không bôi đen): Xóa/Cắt nguyên cả dòng hiện tại.
10. Shift + Alt + A: Comment dạng khối nhiều dòng (/_ ... _/).

11. Alt + Click chuột: Nhấp chuột vào các vị trí khác nhau để đặt nhiều con trỏ cùng lúc => gõ hoặc xóa đồng thời.Ctrl + Alt + Up / Down: Tạo chuỗi con trỏ thẳng hàng theo chiều dọc (để sửa nhiều dòng liên tiếp).

12. Để chọn và sửa ví dụ thêm 1 cụm s+=""; vào đồng thời các dòng thì: đặt con trỏ tại đầu dòng đầu tiên sau đó => Shift + alt + kéo xuống để chọn các dòng cần sửa rồi nhập thêm hoặc có 1 đoạn code, đặt con trỏ cuối dòng 1 chọn shift + > để con trỏ hiện xuống dòng nhấn Ctrl + shift + L rồi nhấn < để chọn tất cả từ cuối;

13. Ctrl + ~: mở terminal

---

```text
Smart_Closet/
├── apps/
│   ├── backend/                      # REST API Server (Node.js / Express.js)
│   │   ├── src/
│   │   │   ├── config/               # Cấu hình kết nối dịch vụ ngoài
│   │   │   │   ├── db.js             # Kết nối TiDB Cloud (mysql2)
│   │   │   │   └── cloudinary.js     # Cấu hình Cloudinary SDK
│   │   │   ├── controllers/          # Xử lý logic nghiệp vụ request/response
│   │   │   │   ├── authController.js # Đăng ký, Đăng nhập, JWT
│   │   │   │   ├── itemController.js # Quản lý trang phục (CRUD & Cloudinary upload)
│   │   │   │   ├── outfitController.js# Tạo, lưu set đồ & snapshot Canvas
│   │   │   │   └── scheduleController.js # Lịch nhắc mặc đồ
│   │   │   ├── middlewares/          # Các hàm xử lý trung gian
│   │   │   │   ├── authMiddleware.js # Xác thực Token (JWT)
│   │   │   │   └── uploadMiddleware.js# Multer nhận file ảnh tạm
│   │   │   ├── routes/               # Khai báo các API Endpoints
│   │   │   │   ├── authRoutes.js     # /api/auth
│   │   │   │   ├── itemRoutes.js     # /api/items
│   │   │   │   ├── outfitRoutes.js   # /api/outfits
│   │   │   │   └── scheduleRoutes.js # /api/schedules
│   │   │   └── app.js                # Khởi tạo Server Express & cắm Middlewares
│   │   ├── .env                      # Lưu các biến môi trường ẩn (DB, Cloudinary, JWT)
│   │   └── package.json
│   │
│   ├── admin-web/                    # Trang Web Quản trị (Next.js App Router)
│   │   ├── src/
│   │   │   ├── app/                  # Định nghĩa các trang (File-based Routing)
│   │   │   │   ├── (auth)/           # Group route Đăng nhập Admin
│   │   │   │   │   └── login/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── (dashboard)/      # Group route Giao diện Quản trị
│   │   │   │   │   ├── dashboard/    # Trang Thống kê tổng quan
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── users/        # Quản lý danh sách Người dùng
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── categories/   # Quản lý Danh mục trang phục
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── mannequins/   # Quản lý Hình nhân mẫu (Mannequin)
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── layout.tsx    # Bố cục chung (Sidebar + Header)
│   │   │   │   └── layout.tsx        # Root Layout của Next.js
│   │   │   └── components/           # UI Components riêng của Admin
│   │   │       ├── Sidebar.tsx
│   │   │       ├── Header.tsx
│   │   │       ├── UserTable.tsx
│   │   │       └── CategoryModal.tsx
│   │   ├── .env.local
│   │   └── package.json
│   │
│   └── mobile-app/                   # Ứng dụng Di động (Expo / React Native)
│       ├── app/                      # Định nghĩa các màn hình (Expo Router)
│       │   ├── (auth)/               # Luồng xác thực tài khoản
│       │   │   ├── login.tsx
│       │   │   └── register.tsx
│       │   ├── (tabs)/               # Thanh điều hướng Bottom Tabs
│       │   │   ├── index.tsx         # Trang Home (Gợi ý phối đồ)
│       │   │   ├── wardrobe.tsx      # Trang Tủ đồ cá nhân & Shopping
│       │   │   ├── fitting-room.tsx  # Trang Phòng thử đồ ảo (Canvas)
│       │   │   ├── calendar.tsx      # Trang Lịch lập kế hoạch trang phục
│       │   │   └── _layout.tsx       # Cấu hình icon và thanh Bottom Tab
│       │   ├── profile.tsx           # Trang Hồ sơ cá nhân
│       │   └── _layout.tsx           # Root Stack Navigator
│       ├── src/
│       │   └── components/           # UI Components riêng của Mobile
│       │       ├── ItemCard.tsx      # Thẻ hiển thị món đồ
│       │       ├── CanvasView.tsx    # Vùng hiển thị Thử đồ/Mannequin
│       │       └── ScheduleModal.tsx # Dialog chọn ngày đặt lịch
│       ├── app.json                  # Cấu hình dự án Expo
│       └── package.json
│
├── packages/                         # MODULES CHIA SẺ CODE DÙNG CHUNG
│   ├── api-client/                   # Axios client dùng chung cho Web & Mobile
│   │   ├── src/
│   │   │   ├── index.ts              # Khởi tạo Axios Instance với BaseURL
│   │   │   ├── auth.ts               # Các hàm API Login/Register
│   │   │   ├── item.ts               # Các hàm API Lấy/Thêm Món đồ
│   │   │   └── outfit.ts             # Các hàm API Lưu/Lấy Set đồ
│   │   └── package.json
│   │
│   ├── types/                        # TypeScript Interfaces/Types dùng chung
│   │   ├── src/
│   │   │   ├── user.ts               # Type User, Gender, Role
│   │   │   ├── item.ts               # Type Item, Category, ItemType
│   │   │   ├── outfit.ts             # Type Outfit, OutfitItem
│   │   │   └── schedule.ts           # Type OutfitSchedule
│   │   └── package.json
│   │
│   └── utils/                        # Các hàm tiện ích bổ trợ
│       ├── src/
│       │   ├── date.ts               # Format ngày tháng
│       │   └── validation.ts         # Validate Email, Mật khẩu, Form
│       └── package.json
│
├── .gitignore
├── package.json                      # Workspace Root Config (NPM Workspaces)
├── package-lock.json
└── turbo.json                        # Cấu hình Turborepo Pipeline (build, dev, lint)
```

Ctrl + Shift + V: Mở bản xem trước ở một tab mới.

Ctrl + K rồi bấm V: Mở bản xem trước song song ngay bên cạnh cửa sổ code (giúp vừa chỉnh sửa nội dung vừa xem kết quả trực tiếp).

1. Ký hiệu Tiêu đề (Headings)
   Sử dụng dấu thăng # đầu dòng để tạo tiêu đề. Số lượng dấu # tương ứng với cấp độ lớn/nhỏ của tiêu đề:

# Tiêu đề 1: Tiêu đề lớn nhất (Thường dùng cho tên dự án / H1).

## Tiêu đề 2: Tiêu đề cấp 2 (Dùng cho các mục chính / H2).

### Tiêu đề 3: Tiêu đề cấp 3 (Dùng cho các mục con / H3).

#### Tiêu đề 4: Tiêu đề cấp nhỏ hơn.

2. Ký hiệu Định dạng Chữ (Text Formatting)
   **In đậm** (2 dấu sao hai bên): Dùng để nhấn mạnh nội dung.

_In nghiêng_ hoặc _In nghiêng_ (1 dấu sao/gạch dưới): Dùng để in nghiêng.

**_In đậm và nghiêng_** (3 dấu sao hai bên): Dùng để vừa in đậm vừa in nghiêng.

~~Gạch ngang~~ (2 dấu ngã hai bên): Dùng để ~~gạch ngang dòng chữ~~ (nội dung đã xóa/bỏ).

3. Ký hiệu Danh sách (Lists)

- hoặc - ở đầu dòng: Tạo danh sách không đánh số (bullet points).

Ví dụ:

- Áo thun hoặc \* Quần jeans

  1., 2., 3. ở đầu dòng: Tạo danh sách có thứ tự.

- [ ] và - [x]: Tạo danh sách công việc (Task list).

- [ ] : Chưa hoàn thành

- [x] : Đã hoàn thành

--- hoặc \*\*\* (3 dấu gạch ngang/sao trên 1 dòng riêng): Tạo đường kẻ ngang phân cách các phần bài viết.

> ở đầu dòng: Tạo Trích dẫn (Blockquote) (hiển thị dạng thanh dọc bên trái, dùng cho ghi chú/lưu ý quan trọng).

[Tên hiển thị](Đường_dẫn_URL): Tạo Đường dẫn (Link).

Ví dụ: [Trang chủ](https://google.com)

![Mô tả ảnh](Đường_dẫn_URL_ảnh): Hiển thị Hình ảnh.

Dấu ! ở đầu giúp phân biệt giữa Chèn ảnh và Chèn link.

### npm install @imgly/background-removal-node -w apps/backend

npx turbo dev --filter=mobile-app -- --reset-cache
Nếu muốn quét QR từ xa (khi máy tính và điện thoại không dùng chung mạng Wi-Fi), hãy chạy:
npx turbo dev --filter=mobile-app -- --tunnel
