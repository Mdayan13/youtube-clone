# NewTube - YouTube Clone

A modern YouTube-like video platform built with Next.js 15, tRPC, Drizzle ORM, and Mux for video streaming.

## 🚀 Features Completed

### ✅ Authentication & User Management

- Clerk authentication integration
- User registration and login
- Protected routes for authenticated content

### ✅ Video Management

- Video upload with Mux integration
- Video processing and streaming
- Thumbnail management (auto-generated and custom)
- Video metadata (title, description, category)
- Video visibility controls (public/private)

### ✅ Home Page & Video Discovery

- **Video Grid Display** - Responsive video grid layout
- **Category Filtering** - Filter videos by categories
- **Video Cards** - Show thumbnails, titles, channels, upload dates
- **Responsive Design** - Works on desktop and mobile

### ✅ Search Functionality

- **Global Search** - Search videos by title and description
- **Search Results Page** - Dedicated page for search results
- **Real-time Search** - Instant search with navigation

### ✅ Navigation & Sidebar

- **Home Sidebar** - Quick access to main sections
- **Responsive Navigation** - Collapsible sidebar
- **User Authentication State** - Different UI for signed-in users

### ✅ Feed Pages

- **Trending Feed** - Popular videos page
- **Subscriptions Feed** - Videos from subscribed channels
- **Watch History** - User's video history
- **Liked Videos** - User's liked videos
- **Playlists** - User's playlist management

### ✅ Studio Dashboard

- **Video Management** - Upload, edit, delete videos
- **Analytics** - Video performance metrics
- **Content Management** - Organize and manage content

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: tRPC, Drizzle ORM
- **Database**: PostgreSQL (Neon)
- **Authentication**: Clerk
- **Video Processing**: Mux
- **Styling**: Tailwind CSS, Shadcn/ui
- **File Upload**: UploadThing

## 🚀 Getting Started

1. **Clone and Install**

   ```bash
   git clone <repository>
   cd newtube
   npm install
   ```

2. **Environment Setup**
   Create `.env.local` with:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret

   # Database
   DATABASE_URL=your_postgresql_url

   # Mux Video
   MUX_TOKEN_ID=your_mux_token_id
   MUX_TOKEN_SECRET=your_mux_token_secret

   # UploadThing
   UPLOADTHING_SECRET=your_uploadthing_secret
   UPLOADTHING_APP_ID=your_uploadthing_app_id
   ```

3. **Database Setup**

   ```bash
   npm run db:push
   npm run db:seed
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 🎯 Key Features in Detail

### Video Upload & Processing

- Drag & drop video upload
- Automatic video processing with Mux
- Thumbnail generation and custom upload
- Real-time upload progress

### Search & Discovery

- Global search across all videos
- Category-based filtering
- Trending algorithms
- Related video suggestions

### User Experience

- Responsive design for all devices
- Fast page transitions
- Loading states and error handling
- Optimistic UI updates

### Content Management

- Studio dashboard for creators
- Video analytics and insights
- Bulk video management
- Content organization tools

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## 🎨 UI Components

The project uses a complete set of UI components including:

- Video cards with hover effects
- Responsive navigation
- Loading skeletons
- Search interface
- Video player
- Action buttons
- Form components

---

**Status**: ✅ **Project Complete** - All core features implemented and functional!
