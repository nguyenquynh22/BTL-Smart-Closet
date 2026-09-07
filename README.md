# 👕 Smart Closet - Monorepo

## 🛠 Lệnh chạy dự án (Commands)

| Chức năng | Câu lệnh |
| :--- | :--- |
| **Chạy toàn bộ** | `npm run dev` |
| **Chạy Web Admin** | `npx turbo dev --filter=admin-web` |
| **Chạy Mobile App** | `npx turbo dev --filter=mobile-app` |
| **Chạy Backend** | `npx turbo dev --filter=backend` |

---

## 📜 Nhật ký phát triển (Development Log)

### 🗓 2026-08-25
- [x] Khởi tạo cấu trúc Monorepo với Turborepo và npm workspaces.
- [x] Tách thư mục `apps/` chứa `admin-web`, `mobile-app`, `backend`.
- [x] Tách thư mục `packages/` chứa `types`, `api-client`, `ui`, `utils`.
- [x] Cấu hình `package.json` gốc và `turbo.json`.

### 🗓 2026-09-02
- [x] Xây dựng CRUD API quản lý danh mục và tủ đồ (`items`).
- [x] Tích hợp middleware upload file ảnh với Multer.

### 🗓 2026-09-06
- [x] Hoàn thiện CRUD API quản lý Ma-nơ-canh (`mannequins`).
- [x] Tích hợp AI tách nền tự động trên Node.js server bằng `@imgly/background-removal-node` và `sharp`.
- [x] Tự động chuẩn hóa mọi định dạng ảnh (JPG, WEBP, PNG) thành PNG trong suốt và upload lên Cloudinary.
- [x] Refactor lại luồng xử lý và tối ưu hóa hiệu năng API `items`.