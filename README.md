# 📝 Fullstack Blog Platform - tRPC + Drizzle + Next.js 15

![Blog Preview](./public/preview.png)
Modern, scalable, and type-safe fullstack blog platform.

A full-featured **Blog Management Platform** built using a modern fullstack setup combining **Next.js 15**, **tRPC**, **Drizzle ORM**, **NeonDB**, **Zustand**, and **Shadcn UI**.  
It provides a clean, scalable, and type-safe architecture for both developers and content managers.

---

## 🚀 Live Demo

**🔗 Deployed on Vercel:**  
[https://blog-chi-three-47.vercel.app/](https://blog-chi-three-47.vercel.app/)

---

## 🧰 Built With

- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Zod](https://zod.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [NeonDB](https://neon.tech/)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

## ✅ Features Implemented

### **Priority 1 – Core Requirements**

- Blog Post CRUD operations (Create, Read, Update, Delete)
- Category CRUD operations
- Assign multiple categories to posts
- Blog listing page showing all posts
- Individual post view page
- Category filtering on listing page
- Basic responsive navigation
- Clean and professional UI

### **Priority 2 – Expected Features**

- Landing Page (Header, Hero, Features, Footer)
- Dashboard for managing posts
- Draft vs Published post status
- Loading and error states
- Mobile responsiveness
- Markdown-based content editor
- Zustand-powered global store

### **Priority 3 – Nice to Have**

- Full 5-section landing page (Header, Hero, Features, CTA, Footer)
- Search functionality
- Post preview before publishing
- SEO meta tags
- Pagination for blog listing

---

## 🧱 Folder Structure

```
src/
├─ app/
│
├─ server/
│   ├─ db/
│   │   ├─ schema.ts
│   │   ├─ client.ts
│   │
│   └─ trpc/
│       ├─ router.ts
│       ├─ routers/
│       │   ├─ posts.ts
│       │   └─ categories.ts
│       ├─ validators.ts
│       └─ utils/
│           ├─ slugify.ts
│           └─ formatError.ts
│
├─ store/
│   ├─ posts/usePostsStore.ts
│   ├─ categories/useCategoriesStore.ts
│   └─ index.ts
│
├─ lib/
│   ├─ trpc/client.ts
│   └─ utils.ts
└─ components/ui/
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in your project root:

```bash
# Database connection string (Neon)
DATABASE_URL=postgresql://user:password@your-db-host/dbname
```

---

## 🧩 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Rishivenkatakousik/Blog
cd Blog
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Database

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

### 4️⃣ Run the App

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🧠 tRPC Router Structure

Each **tRPC router** encapsulates CRUD logic for its domain (posts, categories, etc.), providing full **type safety** across backend and frontend.

### `/server/trpc/routers/posts.ts`

```ts
export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(...),
  getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(...),
  create: publicProcedure.input(postSchema).mutation(...),
  update: publicProcedure.input(postUpdateSchema).mutation(...),
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(...),
});
```

### `/server/trpc/routers/categories.ts`

```ts
export const categoriesRouter = createTRPCRouter({
  getAll: publicProcedure.query(...),
  create: publicProcedure.input(categorySchema).mutation(...),
  update: publicProcedure.input(categoryUpdateSchema).mutation(...),
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(...),
});
```

---

## 🧠 State Management (Zustand)

Each feature domain (Posts, Categories) has its own **modular Zustand store**, ensuring scalability and clean separation of state logic.

```
src/store/
├─ posts/usePostsStore.ts
└─ categories/useCategoriesStore.ts
```

---

## 🧩 Design and UI

- Built with **Shadcn UI + Tailwind CSS**
- Clean, minimal, responsive layout
- Card-based blog listing
- Pagination for large data sets

---

## ⚖️ Trade-offs & Design Decisions

| Decision            | Why                                        |
| ------------------- | ------------------------------------------ |
| **tRPC over REST**  | Type safety from DB → API → UI             |
| **Drizzle ORM**     | SQL-first schema control + migrations      |
| **Zustand**         | Lightweight, domain-based state management |
| **Markdown Editor** | Simpler content editing workflow           |
| **Shadcn UI**       | Fast setup + accessible design system      |
| **NeonDB**          | Serverless PostgreSQL for Vercel           |

---

## 🔮 Future Enhancements

- Media uploads via S3
- Theme toggle (light/dark)
- Comments with moderation
- AI-powered content generation

---
