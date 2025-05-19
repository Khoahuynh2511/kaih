

[kaih.dev](https://kaih.dev) là website portfolio cá nhân của tôi—được xây dựng bằng [Astro](https://astro.build/), [Tailwind](https://tailwindcss.com/), và [shadcn/ui](https://ui.shadcn.com/).

</div>

---

## Cấu trúc thư mục

```
src/
├── components/     # Các component tái sử dụng
├── content/       # Nội dung blog và authors
│   ├── authors/   # Thông tin tác giả
│   └── blog/      # Các bài viết blog
├── layouts/       # Layout chung cho các trang
├── pages/         # Các trang của website
└── styles/        # CSS và styling
public/            # Assets tĩnh (ảnh, fonts,...)
```

## Hướng dẫn cập nhật

### 1. Cập nhật Projects

Các dự án được định nghĩa trong `src/pages/projects.astro`. Mỗi dự án cần có các thông tin:

```typescript
{
  title: "Tên dự án",
  date: "Tháng/Năm",
  description: "Mô tả ngắn gọn",
  technologies: ["Công nghệ 1", "Công nghệ 2", ...],
  projectUrl: "Link Google Drive",
  achievements: [
    "Thành tựu 1",
    "Thành tựu 2",
    ...
  ],
  imageUrl: "/tên-ảnh.jpg", // Đặt ảnh trong thư mục public/
  category: "AI/ML" // Chọn từ: AI/ML, Data Science, Web Development, Research
}
```

### 2. Cập nhật Blog

#### 2.1. Tạo bài viết mới

1. Tạo thư mục mới trong `src/content/blog/` với tên bài viết
2. Tạo file `index.mdx` trong thư mục đó với cấu trúc:

```mdx
---
title: "Tiêu đề bài viết"
date: "YYYY-MM-DD"
description: "Mô tả ngắn gọn"
authors: ["enscribe"] // Tên tác giả
image: {
  src: "/tên-ảnh.jpg", // Đặt ảnh trong thư mục public/
  alt: "Mô tả ảnh"
}
---

Nội dung bài viết ở đây...
```

#### 2.2. Định dạng bài viết

- Sử dụng Markdown để viết nội dung
- Hỗ trợ các tính năng:
  - Code blocks với syntax highlighting
  - Hình ảnh
  - Links
  - Tables
  - Math equations (KaTeX)

### 3. Cập nhật Thông tin cá nhân

#### 3.1. Thông tin cơ bản

Cập nhật trong `src/consts.ts`:
```typescript
export const SITE = {
  TITLE: "Kai H",
  EMAIL: "dangkhoahuynh2511@gmail.com",
  SITEURL: "https://kaih.dev",
  // ...
}
```

#### 3.2. Social Links

Cập nhật trong `src/consts.ts`:
```typescript
export const SOCIAL_LINKS = [
  {
    href: "link",
    label: "Tên mạng xã hội",
    icon: "tên-icon"
  },
  // ...
]
```

### 4. Cập nhật Assets

1. Ảnh dự án: Đặt trong `public/` với tên tương ứng
2. Ảnh blog: Đặt trong `public/` và tham chiếu trong file .mdx
3. Favicon: Thay thế các file trong `public/`:
   - favicon.ico
   - favicon-16x16.png
   - favicon-32x32.png
   - apple-touch-icon.png

### 5. Chạy website locally

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build
```

### 6. Deploy

Website được deploy tự động khi push lên main branch. Đảm bảo:

1. Tất cả thay đổi đã được test locally
2. Không có lỗi build
3. Commit message rõ ràng, mô tả được thay đổi

## Các lưu ý quan trọng

1. Luôn backup dữ liệu trước khi thay đổi lớn
2. Kiểm tra kỹ các link trước khi commit
3. Tối ưu kích thước ảnh trước khi upload
4. Đảm bảo nội dung phù hợp và chuyên nghiệp
5. Cập nhật README khi có thay đổi về cấu trúc hoặc quy trình

## Hỗ trợ

Nếu có thắc mắc hoặc gặp vấn đề, vui lòng:
1. Kiểm tra documentation
2. Tạo issue trên repository
3. Liên hệ qua email: dangkhoahuynh2511@gmail.com

---

## Technology Stack

| Category            | Technology Name                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| Framework           | [Astro](https://astro.build/)                                                                      |
| Styling             | [Tailwind](https://tailwindcss.com)                                                                |
| Components          | [shadcn/ui](https://ui.shadcn.com/)                                                                |
| Content             | [MDX](https://mdxjs.com/)                                                                          |
| Syntax Highlighting | [Shiki](https://github.com/shikijs/shiki) + [rehype-pretty-code](https://rehype-pretty.pages.dev/) |
| Graphics            | [Figma](https://www.figma.com/)                                                                    |
| Deployment          | [Vercel](https://vercel.com)                                                                       |

---

## Licensing

This project uses a multi-tiered licensing approach to differentiate between various components:

### Original Template

From the [Original Template License](LICENSE.md#original-template-license) section within the license:

> This website is based on [astro-erudite](https://github.com/jktrn/astro-erudite), which was loosely derived from an MIT-licensed project, [trevortylerlee/astro-micro](https://github.com/trevortylerlee/astro-micro).

The original MIT license is included in the full [LICENSE.md](LICENSE.md) file for compliance.

### Website Code

[![Code License]](LICENSE.md)

All modifications and custom implementations made to the original template are proprietary and all rights are reserved. The code is publicly available for viewing and reference only. Modification, redistribution, or commercial use requires explicit permission from the copyright holder.

### Website Content

[![Content License]](LICENSE.content.md)

The content of this website is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0).

---

Made with ♥ by [Kai H](https://kaih.dev)!

[cc-by-nc-nd]: http://creativecommons.org/licenses/by-nc-nd/4.0/
[cc-by-nc-nd-shield]: https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg

[CodeFactor]: https://img.shields.io/codefactor/grade/github/jktrn/enscribe.dev?color=2f2a24&logo=codefactor&logoColor=fff&style=for-the-badge
[Stargazers]: https://img.shields.io/github/stars/jktrn/enscribe.dev?color=463f37&logo=github&logoColor=fff&style=for-the-badge
[Code License]: https://img.shields.io/badge/code%20license-proprietary-5d5449?style=for-the-badge&logo=github&logoColor=fff
[Content License]: https://img.shields.io/badge/content%20license-CC%20BY--NC--ND%204.0-756a5b?style=for-the-badge&logo=creativecommons&logoColor=fff
