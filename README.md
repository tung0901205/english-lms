# EngGo LMS – Nhóm 1

Website khóa học tiếng Anh trực tuyến – đồ án môn Quản lý Dự án Công nghệ Thông tin.
Nhánh `main` hiện chứa **code Sprint 1**: xác thực, phân quyền và hồ sơ người dùng.

## Phạm vi Sprint 1 (28/09 – 11/10/2026)

| User Story | Chức năng | Backend (API `/api/v1`) | Frontend |
| --- | --- | --- | --- |
| US-01 | Đăng ký tài khoản học viên | `POST /registration` | Hộp Đăng ký (`components/Auth/SignUp.tsx`) |
| US-02 | Xác thực email bằng mã OTP 6 số | `POST /activate-user` | Hộp nhập OTP (`components/Auth/Verification.tsx`) |
| US-03 | Đăng nhập, đăng xuất, gia hạn phiên | `POST /login`, `POST /logout`, `GET /refresh` | Hộp Đăng nhập, nút Đăng xuất ở trang Hồ sơ |
| US-04 | Khôi phục mật khẩu qua email | `POST /forgot-password`, `POST /reset-password` | `ForgotPassword.tsx`, `ResetPassword.tsx` |
| US-05 | Phân quyền theo vai trò | Middleware `isAuthenticated`, `authorizeRoles` (`middleware/auth.ts`) | `useProtected`, `adminProtected` (`app/hooks`) |
| US-06 | Xem và cập nhật hồ sơ, đổi mật khẩu, ảnh đại diện | `GET /me`, `PUT /update-user-info`, `PUT /update-user-password`, `PUT /update-user-avatar` | Trang `/profile` |

Các phần khóa học, thanh toán, quản trị người dùng (US-07 trở đi), thông báo, AI… thuộc Sprint 2–5 và sẽ được đưa lên ở các lần cập nhật sau.

## Công nghệ

- **Backend:** Node.js, Express 5, TypeScript, MongoDB (Mongoose), Redis (ioredis), JWT trong cookie httpOnly, Nodemailer + EJS, Cloudinary.
- **Frontend:** Next.js 14 (App Router), TypeScript, Redux Toolkit Query, Tailwind CSS, Formik + Yup, MUI (modal).

## Cấu trúc thư mục

```
english-lms/
├── server/                 # Backend Express
│   ├── controllers/        # user.controller.ts – xử lý đăng ký, OTP, đăng nhập, hồ sơ
│   ├── middleware/         # auth.ts (xác thực + phân quyền), error.ts
│   ├── models/             # user.model.ts
│   ├── routes/             # user.route.ts
│   ├── utils/              # db, redis, jwt, sendMail
│   ├── mails/              # Mẫu email OTP kích hoạt / quên mật khẩu
│   └── .env.example
└── client/                 # Frontend Next.js
    ├── app/                # Trang chủ, /profile, components, hooks
    ├── redux/              # store, apiSlice, authApi, userApi
    └── .env.example
```

## Chạy dự án trên máy

Yêu cầu: Node.js 20+, một MongoDB (Atlas hoặc cài local) và một Redis (Upstash hoặc cài local).

**1. Backend**

```bash
cd server
cp .env.example .env      # rồi điền DB_URL, REDIS_URL, các khóa JWT, SMTP, Cloudinary
npm install
npm run dev               # chạy tại http://localhost:8000
```

Kiểm tra: mở `http://localhost:8000/test` thấy `"API đang hoạt động"`.
Khi chạy dev, mã OTP cũng được in ra console để tiện kiểm thử nếu chưa cấu hình email.

**2. Frontend**

```bash
cd client
cp .env.example .env.local   # NEXT_PUBLIC_SERVER_URI=http://localhost:8000/api/v1/
npm install
npm run dev                  # mở http://localhost:3000
```

**Luồng kiểm thử nhanh:** Đăng nhập → Đăng ký ngay → nhập OTP (xem email hoặc console backend) → Đăng nhập → bấm ảnh đại diện để vào Hồ sơ → sửa tên, đổi ảnh, đổi mật khẩu → Đăng xuất → thử Quên mật khẩu.

## Ghi chú

- Không commit file `.env` / `.env.local` (đã có trong `.gitignore`).
- Vai trò hiện có trong code: `user` (học viên, mặc định) và `admin`. Vai trò giảng viên và giao diện quản trị sẽ bổ sung ở Sprint 2.
- Đăng nhập bằng Google/GitHub chưa nằm trong phạm vi Sprint 1.
