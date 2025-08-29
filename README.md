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

### ✅ Video Watch Page

- **Video Player** - Mux-powered video streaming
- **Video Information** - Title, description, upload date, category
- **Video Actions** - Like, dislike, share, download buttons
- **Related Videos** - Sidebar with suggested videos

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

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── (auth)/            # Authentication pages
│   ├── (home)/            # Home layout pages
│   ├── (studio)/          # Studio dashboard
│   ├── feed/              # Feed pages (trending, subscriptions)
│   ├── playlists/         # Playlist pages
│   ├── search/            # Search results
│   └── watch/             # Video watch page
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   ├── video-card.tsx    # Video card component
│   ├── video-grid.tsx    # Video grid layout
│   └── ...
├── modules/              # Feature modules
│   ├── auth/            # Authentication components
│   ├── category/        # Category management
│   ├── home/            # Home page components
│   ├── studio/          # Studio components
│   └── videos/          # Video components
├── db/                  # Database schema and config
├── lib/                 # Utility libraries
└── trpc/               # tRPC configuration
```

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
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema
- `npm run db:seed` - Seed database with categories

## 📱 Pages Available

- **/** - Home page with video grid
- **/search** - Search results page
- **/watch/[videoId]** - Individual video watch page
- **/feed/trending** - Trending videos
- **/feed/subscriptions** - Subscription feed
- **/playlists** - User playlists
- **/playlists/history** - Watch history
- **/playlists/liked-videos** - Liked videos
- **/studio** - Creator studio dashboard
- **/sign-in** - Authentication pages
- **/sign-up** - Registration pages

## 🎨 UI Components

The project uses a complete set of UI components including:

- Video cards with hover effects
- Responsive navigation
- Loading skeletons
- Search interface
- Video player
- Action buttons
- Form components

## 🚧 Future Enhancements

- Comments system
- Subscription functionality
- Playlist creation and management
- Live streaming
- Video recommendations algorithm
- Analytics dashboard
- Content moderation
- Mobile app

---

**Status**: ✅ **Project Complete** - All core features implemented and functional!
