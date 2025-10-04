# Portfolio Frontend - Nahid's Personal Portfolio

> A modern, responsive portfolio website built with Next.js 15 and TypeScript, featuring a comprehensive admin dashboard and dynamic content management.

## 🌐 Live Demo

**🚀 [View Live Portfolio](https://hassannahid.vercel.app/)**

*Replace with your actual deployment URL*

---

## 📋 Project Overview

This is a full-stack portfolio application showcasing professional work, blog posts, projects, and skills. The application features both a public-facing portfolio website and a comprehensive admin dashboard for content management.

### ✨ Key Features

#### 🎯 **Public Portfolio**
- **Hero Section** - Dynamic introduction with animated elements
- **About Me** - Personal information and professional journey
- **Skills Showcase** - Categorized technical expertise (Frontend/Backend)
- **Projects Gallery** - Featured work with detailed descriptions
- **Blog Section** - Technical articles and insights
- **Interactive Comments** - Engagement system for blog posts
- **Contact Form** - Direct communication channel
- **Responsive Design** - Optimized for all devices

#### 🛠️ **Admin Dashboard**
- **Real-time Analytics** - Blog statistics and engagement metrics
- **Content Management** - CRUD operations for blogs, projects, and skills
- **Comment Moderation** - Approve/reject blog comments
- **User Authentication** - Secure JWT-based login system
- **Data Visualization** - Monthly trends and performance insights
- **Responsive Interface** - Mobile-optimized admin panel

#### 🎨 **Modern UI/UX**
- **Dark Theme** - Professional dark mode design
- **Gradient Effects** - Modern glassmorphism aesthetics
- **Smooth Animations** - Enhanced user experience
- **Loading States** - Skeleton loaders and progress indicators
- **Toast Notifications** - Real-time feedback system

---

## 🛠️ Technology Stack

### **Frontend Framework**
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development

### **Styling & UI**
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Modern icon library
- **Framer Motion** (via TW Animate) - Smooth animations

### **State Management & Forms**
- **React Hook Form** - Performant form management
- **Zod** - Schema validation
- **React Hot Toast** - Notification system

### **Development Tools**
- **ESLint** - Code quality enforcement
- **Turbopack** - Fast build system
- **PostCSS** - CSS processing

### **Authentication & API**
- **JWT** - Secure authentication
- **REST API** - Backend communication
- **React Context** - Global state management

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** >= 18.17.0
- **npm** or **yarn** package manager
- **Backend API** running (see backend repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hassan-nahid/portfolio-frontend.git
   cd portfolio-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   # Replace with your backend API URL
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── (dashboard)/        # Admin dashboard routes
│   │   ├── (public)/          # Public portfolio routes
│   │   └── auth/              # Authentication pages
│   ├── components/            # Reusable UI components
│   │   ├── ui/                # Base UI components
│   │   └── modules/           # Feature-specific components
│   ├── contexts/              # React Context providers
│   ├── lib/                   # Utilities and API client
│   └── data.tsx              # Static data and configurations
├── public/                    # Static assets
├── tailwind.config.js        # Tailwind CSS configuration
└── next.config.ts           # Next.js configuration
```

---

## 🔧 Key Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build production application |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint code analysis |

---

## 🌟 Features Deep Dive

### **Blog System**
- Create, edit, and delete blog posts
- Rich text content support
- Category organization
- SEO-friendly URLs
- Comment system with moderation
- View tracking and analytics

### **Project Showcase**
- Featured project gallery
- Detailed project descriptions
- Technology stack highlighting
- Live demo and source code links
- Category-based filtering

### **Skills Management**
- Categorized skill display
- Proficiency levels
- Dynamic skill addition/removal
- Visual skill representations

### **Analytics Dashboard**
- Monthly publication trends
- View and engagement metrics
- Top-performing content
- Recent activity tracking
- Comment management

---

## 🔐 Authentication

The admin dashboard requires authentication:

1. Navigate to `/auth/login`
2. Enter admin credentials
3. Access dashboard at `/dashboard`

**Default Routes:**
- Public: `/` (Portfolio)
- Admin: `/dashboard` (Analytics)
- Auth: `/auth/login` (Login)

---

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

All components adapt gracefully across devices with:
- Mobile-first design approach
- Touch-friendly interfaces
- Optimized loading states
- Responsive typography and spacing

---

## 🚦 Performance Optimizations

- **Static Site Generation (SSG)** for portfolio pages
- **Incremental Static Regeneration (ISR)** for blog content
- **Image Optimization** with Next.js Image component
- **Code Splitting** with dynamic imports
- **Turbopack** for faster development builds
- **Lazy Loading** for non-critical components

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Hassan Nahid**
- Portfolio: [https://hassannahid.me]
- GitHub: [@hassan-nahid](https://github.com/hassan-nahid)
- LinkedIn: [[LinkedIn Profile](https://www.linkedin.com/in/hassan-nahid)]

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- Tailwind CSS for the utility-first approach
- Radix UI for accessible components
- All open-source contributors

---

**Built with ❤️ using Next.js and TypeScript**
