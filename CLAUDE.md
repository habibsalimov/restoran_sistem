# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Project Architecture

This is a Next.js 15 application (App Router) for a restaurant order pricing and waiter performance measurement system using computer vision.

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: Supabase (planned)
- **Font**: Geist (optimized with next/font)

### Project Structure
- `src/app/` - Main application directory using App Router
  - `layout.tsx` - Root layout with font configuration
  - `page.tsx` - Home page component
  - `globals.css` - Global styles
- `docs/PRD.md` - Product Requirements Document (Turkish)
- `public/` - Static assets (SVG icons)

### Key Features (from PRD)
- **Dual table system**: Table 1 (Waiter A) and Table 2 (Waiter B)
- **Video processing**: Two synchronized video streams
- **QR code recognition**: Automatic waiter assignment
- **Food categorization**: Ana Yemek (45 TL), Yan Yemek (15 TL), Çorba (25 TL), Yan Ürün (8 TL), Su (5 TL)
- **Performance tracking**: 50-second rule for waiter response
- **Blue napkin detection**: Automatic table reset system
- **Real-time pricing**: Automatic order calculation

### Database Schema (Supabase)
- `tables` - Table status and waiter assignments
- `waiters` - Waiter information and performance scores
- `orders` - Order items and pricing
- `reports` - Session reports and performance metrics

### Timeline System
- **Table 1**: Normal service scenario
- **Table 2**: Delayed service scenario with performance penalties

## Development Notes

- Uses Turbopack for faster development builds
- Configured with ESLint for code quality
- Ready for Supabase integration (database setup pending)
- Font optimization with Geist Sans and Geist Mono
- Responsive design with Tailwind CSS