# Tony Pettigrew - Personal Website

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Sanity](https://img.shields.io/badge/Sanity-4.4.1-F03E2F?style=for-the-badge&logo=sanity)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)

A modern, performant personal website showcasing professional experience, technical writing, and portfolio projects. Built with Next.js 15, TypeScript, and Sanity CMS.

[🚀 Live Demo](https://tonypettigrew.dev) • [📖 Documentation](#documentation) • [🛠 Tech Stack](#tech-stack) • [🚀 Getting Started](#getting-started)

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#overview)
- [✨ Features](#features)
- [📚 Documentation](#documentation)
- [🛠 Tech Stack](#tech-stack)
- [🏗 Architecture](#architecture)
- [🚀 Getting Started](#getting-started)
- [🛠 Development](#development)
- [🚀 Deployment](#deployment)
- [🤝 Contributing](#contributing)
- [⚡ Performance](#performance)
- [♿ Accessibility](#accessibility)
- [🔍 SEO](#seo)
- [🐛 Troubleshooting](#troubleshooting)
- [📄 License](#license)
- [📞 Contact](#contact)

## Overview

This is a modern personal website built with enterprise-grade technologies and best practices. The site features a blog system with advanced search and filtering, portfolio showcase, and professional presentation of skills and experience.

### Key Highlights

- **⚡ Performance**: Server-side rendering with Next.js 15 and optimized loading
- **🎨 Modern UI**: Responsive design with Tailwind CSS v4 and dark/light themes
- **📝 Content Management**: Headless CMS with Sanity for easy content updates
- **🔍 Advanced Search**: Real-time search with debouncing and category filtering
- **♿ Accessibility**: WCAG 2.1 AA compliant with semantic HTML
- **🔧 Developer Experience**: TypeScript, ESLint, Prettier, and comprehensive documentation

## Features

### Core Functionality

- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Theme System**: Dark/light mode with system preference detection
- **Blog System**: Dynamic blog with GROQ queries and real-time search
- **Portfolio Showcase**: Professional project presentation
- **Contact Integration**: Contact form with validation
- **Dashboard**: Admin interface for content management

### Advanced Features

- **Search & Filtering**: Debounced search with category filtering
- **Compound Components**: Reusable component architecture with shared context
- **Server-Side Rendering**: Optimized for SEO and performance
- **Image Optimization**: Next.js Image component with Sanity integration
- **Code Highlighting**: Syntax highlighting for code snippets
- **Keyboard Navigation**: Full keyboard accessibility support

## Documentation

| Document                                       | Description                                     | Status      |
| ---------------------------------------------- | ----------------------------------------------- | ----------- |
| [PR Guidelines](docs/pr-guidelines.md)         | Pull request best practices and templates       | ✅ Complete |
| [Commit Guidelines](docs/commit-guidelines.md) | Conventional commit message standards           | ✅ Complete |
| [Code Quality](docs/code-quality.md)           | Code quality standards and review process       | ✅ Complete |
| [Team Guidelines](docs/team-guidelines.md)     | Team collaboration and role-specific guidelines | ✅ Complete |

### Development Guidelines

- **Code Standards**: TypeScript strict mode, ESLint, Prettier
- **Testing**: Unit tests, integration tests, accessibility testing
- **Performance**: Lighthouse optimization, bundle analysis
- **Security**: Dependency scanning, input validation

## Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5.9.2](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom design system
- **State Management**: [TanStack Query](https://tanstack.com/query) for server state
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Theming**: [Next Themes](https://github.com/pacocoursey/next-themes)

### Backend & CMS

- **Headless CMS**: [Sanity.io](https://www.sanity.io/) with GROQ queries
- **Image Management**: Sanity Image URL builder with optimization
- **Content Types**: Custom schemas for blog posts, categories, authors
- **Real-time Updates**: Live preview and collaborative editing

### Development Tools

- **Package Manager**: npm with lockfile
- **Linting**: ESLint with Next.js configuration
- **Formatting**: Prettier with Tailwind CSS plugin
- **Type Checking**: TypeScript strict mode
- **Build Tool**: Next.js with Turbopack for development

### Performance & Optimization

- **Bundling**: Next.js with tree shaking and code splitting
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Caching**: React Query for data caching
- **CDN**: Vercel Edge Network for global distribution

## Architecture

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── blog/              # Blog functionality
│   │   ├── [slug]/        # Dynamic blog post routes
│   │   ├── Blog/          # Compound component pattern
│   │   ├── Categories/    # Category components
│   │   └── types.ts       # Blog type definitions
│   ├── components/        # Reusable UI components
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── RootAppShell/      # Application shell
│   ├── routes/            # Route definitions
│   ├── studio/            # Sanity Studio integration
│   ├── contact/           # Contact page
│   ├── portfolio/         # Portfolio showcase
│   ├── dashboard/         # Admin dashboard
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── Providers.tsx      # App providers
│   └── globals.css        # Global styles
├── lib/                   # Utility functions
└── sanity/                # Sanity CMS configuration
    ├── schemaTypes/       # Content schemas
    ├── lib/               # Sanity utilities
    └── structure.ts       # Studio structure
```

### Key Patterns

- **Compound Components**: Shared context for complex UI patterns
- **Server Components**: Default server-side rendering for performance
- **Client Components**: Strategic use of "use client" for interactivity
- **Type Safety**: Comprehensive TypeScript interfaces
- **Error Boundaries**: Graceful error handling and fallbacks

## Getting Started

### Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **Git**: For version control

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/tonypettigrew.dev-3.0.git
   cd tonypettigrew.dev-3.0
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables:

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_sanity_api_token
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Sanity CMS Setup

1. **Install Sanity CLI globally**

   ```bash
   npm install -g @sanity/cli
   ```

2. **Initialize Sanity project**

   ```bash
   sanity init
   ```

3. **Configure schemas**
   Update `src/sanity/schemaTypes/` with your content models

4. **Deploy Sanity Studio**
   ```bash
   sanity deploy
   ```

## Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Sanity (if installed globally)
sanity dev           # Start Sanity Studio
sanity deploy        # Deploy Sanity Studio
sanity graphql-deploy # Deploy GraphQL API
```

### Development Workflow

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow TypeScript strict mode
   - Use conventional commit messages
   - Write tests for new functionality

3. **Run quality checks**

   ```bash
   npm run lint
   npm run build
   ```

4. **Submit a pull request**
   - Follow [PR guidelines](docs/pr-guidelines.md)
   - Include tests and documentation
   - Request code review

### Code Quality Standards

- **TypeScript**: Strict mode with comprehensive type definitions
- **ESLint**: Next.js recommended rules with custom configuration
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Standardized commit messages
- **Component Testing**: Unit tests for complex components

## Deployment

### Vercel (Recommended)

1. **Connect your repository**
   - Push code to GitHub/GitLab
   - Connect repository to Vercel

2. **Configure environment variables**

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_sanity_api_token
   ```

3. **Deploy**
   - Vercel automatically builds and deploys on push
   - Preview deployments for pull requests

### Other Platforms

The application can be deployed to any platform supporting Next.js:

- **Netlify**: Configure build command and output directory
- **Railway**: Connect GitHub repository
- **DigitalOcean App Platform**: Container deployment
- **AWS Amplify**: Full-stack deployment

## Contributing

We welcome contributions! Please read our [contributing guidelines](docs/team-guidelines.md) before submitting pull requests.

### Development Process

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Write tests**
5. **Submit a pull request**

### Code Review Process

- All changes require code review
- Automated checks must pass
- Follow [code quality standards](docs/code-quality.md)
- Use [conventional commit messages](docs/commit-guidelines.md)

## Performance

### Optimization Strategies

- **Server-Side Rendering**: All pages rendered on server
- **Image Optimization**: WebP/AVIF with responsive sizes
- **Code Splitting**: Automatic route-based splitting
- **Caching**: React Query for data, Next.js for static assets
- **Bundle Analysis**: Regular bundle size monitoring

### Performance Metrics

- **Lighthouse Score**: 95+ across all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## Accessibility

### WCAG 2.1 AA Compliance

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: 4.5:1 minimum contrast ratio
- **Focus Management**: Visible focus indicators

### Testing

- **Automated**: axe-core integration
- **Manual**: Screen reader testing (NVDA, JAWS, VoiceOver)
- **Keyboard**: Full keyboard navigation testing
- **Color**: Contrast ratio verification

## SEO

### Optimization Features

- **Meta Tags**: Dynamic meta tags for all pages
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling configuration
- **Open Graph**: Social media sharing optimization

### Performance SEO

- **Core Web Vitals**: Optimized for all metrics
- **Mobile-First**: Responsive design for mobile indexing
- **Fast Loading**: Optimized for search ranking factors

## Troubleshooting

### Common Issues

**Build Errors**

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Sanity Connection Issues**

```bash
# Verify environment variables
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
echo $SANITY_API_TOKEN
```

**TypeScript Errors**

```bash
# Check TypeScript configuration
npx tsc --noEmit
```

### Getting Help

- **Documentation**: Check the [docs folder](docs/)
- **Issues**: Search existing issues or create new ones
- **Discussions**: Use GitHub Discussions for questions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Website**: [tonypettigrew.dev](https://tonypettigrew.dev)
- **Email**: [get@tonypettigrew.dev](mailto:get@tonypettigrew.dev)
- **LinkedIn**: [https://linkedin.com/in/tpettigrew4](https://linkedin.com/in/tpettigrew4)
- **GitHub**: [https://github.com/TonyDotDev](https://github.com/TonyDotDev)

---

<div align="center">

Made with ❤️ by [Tony Pettigrew](https://tonypettigrew.dev)

[![GitHub stars](https://img.shields.io/github/stars/yourusername/tonypettigrew.dev-3.0?style=social)](https://github.com/yourusername/tonypettigrew.dev-3.0)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/tonypettigrew.dev-3.0?style=social)](https://github.com/yourusername/tonypettigrew.dev-3.0)

</div>
