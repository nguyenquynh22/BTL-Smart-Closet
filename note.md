Smart_Closet/
├── apps/
│ ├── admin-web/ # Next.js App
│ ├── mobile-app/ # Expo App
│ └── backend/ # Express / NestJS / Node.js
├── packages/
│ ├── api-client/ # Axios / Fetch client dùng chung
│ ├── types/ # DTOs, TypeScript interfaces dùng chung
│ ├── ui/ # React Native / Web components dùng chung (nếu cần)
│ └── utils/ # Helper functions (date, format, validate)
├── package.json # Root package.json
└── turbo.json # Turborepo config

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

## Chạy toàn bộ (Web + App + Backend):

npm run dev

## Chạy riêng Web (admin-web):

npx turbo dev --filter=admin-web

## Chạy riêng App (mobile-app):

npx turbo dev --filter=mobile-app

## Chạy riêng Backend (backend):

npx turbo dev --filter=backend

## Chạy kết hợp 2 phần (VD: Web + Backend, không chạy App):

npx turbo dev --filter=admin-web --filter=backend

Mẹo: Bạn cũng có thể thêm trực tiếp các lệnh này vào mục "scripts" của package.json gốc để gõ cho ngắn:
"scripts": {
"build": "turbo build",
"dev": "turbo dev",
"dev:web": "turbo dev --filter=admin-web",
"dev:mobile": "turbo dev --filter=mobile-app",
"dev:backend": "turbo dev --filter=backend"
}
Khi đó chỉ cần gõ: npm run dev:web hoặc npm run dev:mobile.

shift + alt + F: căn chỉnh code
Ctrl + Shift + V: chạy file .md
ctrl + space: gợi ý code
Shift + Alt + Down: nhân bản 1 dòng xuống dưới liền kề
Alt + Up / Down: di chuyển 1 dòng lên trên/xuống dưới
Ctrl + D: bôi đen 1 từ => chọn từ y hệt tiếp theo
Ctrl + Shift + L: bôi đen 1 từ => chọn tất cả từ giống như vậy trong 1 file

Ctrl + /: Bật / Tắt ghi chú (Comment) cho dòng hoặc đoạn code.
Ctrl + X (khi không bôi đen): Xóa/Cắt nguyên cả dòng hiện tại.
Shift + Alt + A: Comment dạng khối nhiều dòng (/_ ... _/).

Alt + Click chuột: Nhấp chuột vào các vị trí khác nhau để đặt nhiều con trỏ cùng lúc => gõ hoặc xóa đồng thời.Ctrl + Alt + Up / Down: Tạo chuỗi con trỏ thẳng hàng theo chiều dọc (để sửa nhiều dòng liên tiếp).

Smart_Closet/
├── apps/
│ ├── admin-web/ # Next.js (App Router)
│ │ └── src/
│ │ ├── app/ # Định nghĩa các Trang (Routes)
│ │ │ ├── (auth)/ # Group route Đăng nhập/Đăng ký
│ │ │ │ ├── login/page.tsx
│ │ │ │ └── register/page.tsx
│ │ │ ├── (dashboard)/ # Group route Quản trị
│ │ │ │ ├── dashboard/page.tsx
│ │ │ │ ├── users/page.tsx
│ │ │ │ ├── clothes/page.tsx
│ │ │ │ └── layout.tsx # Sidebar / Header chung cho Admin
│ │ │ └── layout.tsx
│ │ ├── components/ # UI Components riêng của Admin Web
│ │ │ ├── Sidebar.tsx
│ │ │ ├── Header.tsx
│ │ │ └── UserTable.tsx
│ │ └── services/ # Logic gọi API của Web
│ │
│ └── mobile-app/ # Expo / React Native (Expo Router)
│ └── app/ # Định nghĩa các Trang (File-based Routing)
│ ├── (auth)/ # Luồng xác thực
│ │ ├── login.tsx
│ │ └── register.tsx
│ ├── (tabs)/ # Bottom Tab Navigation
│ │ ├── index.tsx # Trang Home (Gợi ý phối đồ)
│ │ ├── wardrobe.tsx # Trang Tủ đồ (Wardrobe)
│ │ ├── fitting-room.tsx # Trang Phòng thử đồ
│ │ ├── calendar.tsx # Trang Lịch trang phục (Outfit Calendar)
│ │ └── \_layout.tsx # Cấu hình thanh Bottom Tab
│ ├── profile.tsx # Trang Hồ sơ (nhấn vào Avatar sẽ router.push('/profile'))
│ └── \_layout.tsx # Root Stack Navigator
│
└── packages/ # CHIA SẺ CODE DÙNG CHUNG
├── api-client/ # Axios / Fetch client dùng chung cả Web & App
│ ├── auth.ts # Hàm login(), register()
│ └── clothes.ts # Hàm getClothes(), addItem()
├── types/ # TypeScript Types / Interfaces
│ ├── user.ts
│ └── outfit.ts
└── utils/ # Hàm helper (format date, validate form)
└── validation.ts
