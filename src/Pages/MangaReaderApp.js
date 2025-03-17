// import React, { useState, useEffect } from 'react';
// import {
//   ChevronLeft, ChevronRight, Bookmark, Heart, Share2, List, Search,
//   Home, User, Settings, Menu, X, Maximize2, ZoomIn, ZoomOut,
//   Clock, Star, TrendingUp, BarChart, Filter, Grid, Layers, BookOpen, LogOut, Edit, Bell,Moon, Download, Shield, HelpCircle
// } from 'lucide-react';
// import './MangaReaderApp.css';
// import mangabg from '../images/manga-homepage-bg.mp4';

// // Main App Component
// const MangaReaderApp = () => {
//   const [activePage, setActivePage] = useState('home');
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   const [mangaData, setMangaData] = useState({
//     recentManga: [],
//     featuredManga: [],
//     trendingManga: [],
//     latestUpdates: []
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedManga, setSelectedManga] = useState(null);

//   useEffect(() => {
//     const fetchMangaData = async () => {
//       try {
//         setIsLoading(true);
//         const [recentRes, featuredRes, trendingRes, latestRes] = await Promise.all([
//           fetch('http://localhost:5000/recentManga'),
//           fetch('http://localhost:5000/featuredManga'),
//           fetch('http://localhost:5000/trendingManga'),
//           fetch('http://localhost:5000/latestUpdates')
//         ]);

//         if (!recentRes.ok || !featuredRes.ok || !trendingRes.ok || !latestRes.ok) {
//           throw new Error('Failed to fetch one or more endpoints');
//         }

//         const [recentManga, featuredManga, trendingManga, latestUpdates] = await Promise.all([
//           recentRes.json(),
//           featuredRes.json(),
//           trendingRes.json(),
//           latestRes.json()
//         ]);

//         setMangaData({ recentManga, featuredManga, trendingManga, latestUpdates });
//         console.log(mangaData);
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 1000);
//       } catch (err) {
//         console.error('Failed to fetch manga data:', err);
//         setError(err.message);
//         setIsLoading(false);
//       }
//     };

//     fetchMangaData();
//   }, []);

//   const handleMangaSelect = (manga) => {
//     setSelectedManga(manga);
//     setActivePage('reader');
//   };

//   const renderPage = () => {
//     if (isLoading) {
//       return <LoadingPage />;
//     }

//     if (error) {
//       return <ErrorPage error={error} />;
//     }

//     switch (activePage) {
//       case 'home':
//         return <HomePage mangaData={mangaData} onMangaSelect={handleMangaSelect} setActivePage={setActivePage} />;
//       case 'bookmarks':
//         return <BookmarksPage mangaData={mangaData} onMangaSelect={handleMangaSelect} />;
//       case 'favorites':
//         return <FavoritesPage mangaData={mangaData} onMangaSelect={handleMangaSelect} />;
//       case 'user':
//         return <UserPage setActivePage={setActivePage}/>;
//       case 'settings':
//         return <SettingsPage setActivePage={setActivePage}/>;
//       case 'browse':
//         return <BrowsePage mangaData={mangaData} onMangaSelect={handleMangaSelect} setActivePage={setActivePage} />;
//       case 'reader':
//         return <ReaderPage manga={selectedManga} setActivePage={setActivePage} isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} />;
//       default:
//         return <HomePage mangaData={mangaData} onMangaSelect={handleMangaSelect} setActivePage={setActivePage} />;
//     }
//   };

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   // Close mobile menu when clicking outside on smaller screens
//   const handleMainContentClick = () => {
//     if (menuOpen && window.innerWidth < 1024) {
//       setMenuOpen(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-900 text-white overflow-hidden">
//       {/* Header */}
//       <header className={`bg-violet-900 p-4 flex justify-between items-center shadow-lg z-10 ${isFullScreen ? 'hidden' : 'block' }`}>
//         <div className="flex items-center gap-4">
//           <button onClick={toggleMenu} className="lg:hidden">
//             {menuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//           <div onClick={() => setActivePage('home')} className="cursor-pointer">
//             <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
//               MangaVerse
//             </p>
//           </div>
//         </div>
//         <div className="relative w-64 hidden md:block">
//           <input
//             type="text"
//             placeholder="Search manga..."
//             className="w-full py-2 px-4 pr-10 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
//           />
//           <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
//         </div>
//         <div className="flex items-center gap-4">
//           <button onClick={() => setActivePage('user')} className={`hover:text-pink-400 transition-colors ${activePage === 'user' ? 'text-pink-400' : 'hover:text-pink-400'}`}>
//             <User size={24} />
//           </button>
//           <button onClick={() => setActivePage('settings')} className={`hover:text-pink-400 transition-colors ${activePage === 'settings' ? 'text-pink-400' : 'hover:text-pink-400'}`}>
//             <Settings size={24} />
//           </button>
//         </div>
//       </header>

//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <aside className={`w-64 bg-gray-800 flex-shrink-0 flex flex-col transition-all duration-300 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} md:relative absolute h-full z-20 ${isFullScreen ? 'hidden' : ''}`}>
//           <div className="p-4 flex flex-col gap-6">
//             <button
//               className={`flex items-center gap-2 py-2 transition-colors ${activePage === 'home' ? 'text-pink-400' : 'hover:text-pink-400'}`}
//               onClick={() => setActivePage('home')}
//             >
//               <Home size={20} />
//               <span>Home</span>
//             </button>
//             <button
//               className={`flex items-center gap-2 py-2 transition-colors ${activePage === 'bookmarks' ? 'text-pink-400' : 'hover:text-pink-400'}`}
//               onClick={() => setActivePage('bookmarks')}
//             >
//               <Bookmark size={20} />
//               <span>Bookmarks</span>
//             </button>
//             <button
//               className={`flex items-center gap-2 py-2 transition-colors ${activePage === 'favorites' ? 'text-pink-400' : 'hover:text-pink-400'}`}
//               onClick={() => setActivePage('favorites')}
//             >
//               <Heart size={20} />
//               <span>Favorites</span>
//             </button>
//             <button
//               className={`flex items-center gap-2 py-2 transition-colors ${activePage === 'browse' ? 'text-pink-400' : 'hover:text-pink-400'}`}
//               onClick={() => setActivePage('browse')}
//             >
//               <List size={20} />
//               <span>Browse</span>
//             </button>
//           </div>

//           <div className="p-4 flex-1 overflow-hidden">
//             <h2 className="text-lg font-semibold mb-4">Continue Reading</h2>
//             <div
//               className="space-y-4 overflow-y-auto max-h-[calc(100vh-300px)] pr-2 custom-scrollbar"
//             >
//               {!isLoading && mangaData.recentManga && mangaData.recentManga.map((manga) => (
//                 <div
//                   key={manga.id}
//                   className="flex gap-3 group cursor-pointer"
//                   onClick={() => handleMangaSelect(manga)}
//                 >
//                   <img
//                     src={manga.cover}
//                     alt={manga.title}
//                     className="w-12 h-16 object-cover rounded shadow-md group-hover:shadow-pink-500/30 transition-shadow"
//                   />
//                   <div>
//                     <h3 className="font-medium group-hover:text-pink-400 transition-colors">{manga.title}</h3>
//                     <p className="text-xs text-gray-400">Ch. {manga.chapters}</p>
//                   </div>
//                 </div>
//               ))}

//               {isLoading && (
//                 Array(4).fill(0).map((_, index) => (
//                   <div key={index} className="flex gap-3">
//                     <div className="w-12 h-16 rounded bg-gray-700 animate-pulse"></div>
//                     <div className="flex-1">
//                       <div className="h-4 w-24 bg-gray-700 animate-pulse rounded mb-2"></div>
//                       <div className="h-3 w-12 bg-gray-700 animate-pulse rounded"></div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </aside>

//         {/* Main content */}
//         <main className="flex-1 overflow-hidden" onClick={handleMainContentClick}>
//           {renderPage()}
//         </main>
//       </div>
//     </div>
//   );
// };

// // Loading Page Component
// const LoadingPage = () => {
//   return (
//     <div className="h-full flex flex-col items-center justify-center bg-gray-900">
//       <div className="w-16 h-16 border-4 border-gray-700 border-t-pink-500 rounded-full animate-spin mb-4"></div>
//       <p className="text-xl text-gray-400">Loading MangaVerse...</p>
//     </div>
//   );
// };

// // Error Page Component
// const ErrorPage = ({ error }) => {
//   return (
//     <div className="h-full flex flex-col items-center justify-center bg-gray-900 p-6">
//       <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
//         <X size={32} />
//       </div>
//       <h2 className="text-2xl text-white mb-2">Error Loading Data</h2>
//       <p className="text-lg text-gray-400 mb-4">We couldn't fetch the manga data.</p>
//       <p className="text-sm text-red-400 mb-8">{error}</p>
//       <p className="text-gray-500 text-center max-w-md">
//         Please check that your API server is running at http://localhost:5000/manga
//         and try refreshing the page.
//       </p>
//     </div>
//   );
// };

// // Home Page Component
// const HomePage = ({ mangaData, onMangaSelect, setActivePage }) => {
//   return (
//     <div className="h-full overflow-y-auto bg-gray-900 pb-8">
//       {/* Hero Section */}
//       {/* Hero Section with Video Background */}
//       <div className="relative h-64 md:h-80 bg-gradient-to-r from-black/100 to-gray-800">
//         <video
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="absolute inset-0 w-full h-full object-cover opacity-40"
//         >
//           <source src={mangabg} type="video/mp4" muted />
//           Your browser does not support the video tag.
//         </video>

//         <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12">
//           <p className="text-3xl md:text-4xl font-bold text-white mb-4">
//             Discover Amazing Manga
//           </p>
//           <p className="text-lg text-white/80 max-w-xl">
//             Explore thousands of titles from various genres. Read, collect, and enjoy your favorite manga all in one place.
//           </p>
//           <button
//             onClick={() => setActivePage('browse')}
//             className="mt-6 px-6 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-full transition-colors w-fit"
//           >
//             Browse Library
//           </button>
//         </div>
//       </div>

//       {/* Featured Section */}
//       <section className="px-6 md:px-12 mt-8">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">Featured Manga</h2>
//           <button
//             onClick={() => setActivePage('browse')}
//             className="text-pink-400 hover:text-pink-300 flex items-center gap-1"
//           >
//             View All <ChevronRight size={16} />
//           </button>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//           {mangaData.featuredManga && mangaData.featuredManga.map((manga) => (
//             <div
//               key={manga.id}
//               className="group cursor-pointer"
//               onClick={() => onMangaSelect(manga)}
//             >
//               <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
//                 <img
//                   src={manga.cover}
//                   alt={manga.title}
//                   className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
//                   <span className="px-2 py-0.5 bg-pink-600 text-white text-xs rounded-full w-fit mb-2">
//                     {manga.genre}
//                   </span>
//                   <div className="flex text-xs text-white/80 gap-2">
//                     <span className="flex items-center gap-1">
//                       <Star size={12} /> {manga.rating}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <BookOpen size={12} /> {manga.chapters} Ch
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <h3 className="mt-2 font-medium group-hover:text-pink-400 transition-colors text-sm md:text-base line-clamp-1">
//                 {manga.title}
//               </h3>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Trending Section */}
//       <section className="px-6 md:px-12 mt-12">
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-2">
//             <TrendingUp size={20} className="text-pink-400" />
//             <h2 className="text-2xl font-bold">Trending Now</h2>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {mangaData.trendingManga && mangaData.trendingManga.map((manga) => (
//             <div
//               key={manga.id}
//               className="flex gap-4 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
//               onClick={() => onMangaSelect(manga)}
//             >
//               <img
//                 src={manga.cover}
//                 alt={manga.title}
//                 className="w-20 h-28 object-cover rounded shadow-md"
//               />
//               <div className="flex flex-col justify-between flex-1">
//                 <div>
//                   <h3 className="font-semibold group-hover:text-pink-400 transition-colors">{manga.title}</h3>
//                   <p className="text-xs text-gray-400 mt-1">{manga.author}</p>
//                   <div className="flex gap-2 mt-2">
//                     <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded-full">
//                       {manga.genre}
//                     </span>
//                     <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded-full">
//                       {manga.status}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <div className="flex text-xs text-white/80 gap-3">
//                     <span className="flex items-center gap-1">
//                       <Star size={12} /> {manga.rating}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <BookOpen size={12} /> {manga.chapters} Ch
//                     </span>
//                   </div>
//                   <div className="flex gap-1">
//                     <button 
//                       className="p-1.5 rounded-full text-gray-400 hover:text-pink-400 hover:bg-gray-700/50"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         // Handle bookmark action
//                       }}
//                     >
//                       <Bookmark size={16} />
//                     </button>
//                     <button 
//                       className="p-1.5 rounded-full text-gray-400 hover:text-pink-400 hover:bg-gray-700/50"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         // Handle favorite action
//                       }}
//                     >
//                       <Heart size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Updates Section */}
//       <section className="px-6 md:px-12 mt-12">
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-2">
//             <Clock size={20} className="text-pink-400" />
//             <h2 className="text-2xl font-bold">Latest Updates</h2>
//           </div>
//           <div className="flex gap-2">
//             <button className="px-3 py-1 rounded-full bg-violet-700 text-white text-sm">Today</button>
//             <button className="px-3 py-1 rounded-full bg-gray-800 text-white text-sm hover:bg-gray-700">Week</button>
//             <button className="px-3 py-1 rounded-full bg-gray-800 text-white text-sm hover:bg-gray-700">Month</button>
//           </div>
//         </div>

//         <div className="space-y-3">
//           {mangaData.latestUpdates && mangaData.latestUpdates.map((update) => (
//             <div
//               key={update.id}
//               className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
//               onClick={() => onMangaSelect(update)}
//             >
//               <img
//                 src={update.cover}
//                 alt={update.title}
//                 className="w-12 h-16 object-cover rounded shadow-md"
//               />
//               <div className="flex-1">
//                 <h3 className="font-medium text-sm md:text-base">{update.title}</h3>
//                 <p className="text-xs text-pink-400">Chapter {update.chapter}</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-xs text-gray-400">{update.timeAgo}</p>
//                 <div className="flex justify-end mt-1">
//                   <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded-full">
//                     {update.genre}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// // Browse Page Component
// // Browse Page Component
// const BrowsePage = ({ mangaData, onMangaSelect, setActivePage }) => {
//   const [viewMode, setViewMode] = useState('grid');
//   const [genreFilter, setGenreFilter] = useState('All');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 18;

//   const genres = ['All', 'Action', 'Romance', 'Fantasy', 'Sci-Fi', 'Horror', 'Comedy', 'Drama', 'Adventure', 'Sports', 'Supernatural', 'Dark Fantasy'];

//   // Create a combined library by merging data with unique ids
//   const mangaLibrary = [
//     ...(mangaData.featuredManga || []),
//     ...(mangaData.trendingManga || []).map(manga => ({
//       id: `trending-${manga.id}`,
//       title: manga.title,
//       cover: manga.cover,
//       genre: manga.genre,
//       chapters: manga.chapters,
//       rating: manga.rating,
//       author: manga.author,
//       status: manga.status
//     }))
//   ];

//   // Apply genre filter if not "All"
//   const filteredManga = genreFilter === 'All'
//     ? mangaLibrary
//     : mangaLibrary.filter(manga => manga.genre === genreFilter);

//   // Calculate pagination for exactly 25 cards
//   const totalItems = filteredManga.length; // Assume 25 cards total
//   const totalPages = Math.ceil(totalItems / itemsPerPage); // Will be 2 pages (18 + 7)
  
//   // Get current page items - specifically handling the 18/7 split
//   let currentItems;
//   if (currentPage === 1) {
//     // First page shows exactly 18 items
//     currentItems = filteredManga.slice(0, 18);
//   } else {
//     // Second page shows the remaining 7 items
//     currentItems = filteredManga.slice(18);
//   }

//   const handlePageChange = (page) => {
//     // We only have 2 pages in this scenario
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       // Scroll to top of content when changing pages
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   // Calculate the range of items being displayed
//   const startItem = currentPage === 1 ? 1 : 19;
//   const endItem = currentPage === 1 ? 18 : totalItems;

//   return (
//     <div className="h-full overflow-y-auto bg-gray-900 pb-8">
//       <div className="px-6 md:px-12 py-6">
//         <p className="text-3xl font-bold mb-6">Browse Manga</p>

//         {/* Filters */}
//         <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
//           <div className="flex flex-wrap gap-2">
//             {genres.map((genre, index) => (
//               <button
//                 key={index}
//                 className={`px-4 py-1.5 rounded-full text-sm ${genreFilter === genre
//                   ? 'bg-pink-600 text-white'
//                   : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
//                   }`}
//                 onClick={() => {
//                   setGenreFilter(genre);
//                   setCurrentPage(1); // Reset to first page when filter changes
//                 }}
//               >
//                 {genre}
//               </button>
//             ))}
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <button
//                 className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-violet-700' : 'bg-gray-800 hover:bg-gray-700'}`}
//                 onClick={() => setViewMode('grid')}
//               >
//                 <Grid size={20} />
//               </button>
//               <button
//                 className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-violet-700' : 'bg-gray-800 hover:bg-gray-700'}`}
//                 onClick={() => setViewMode('list')}
//               >
//                 <Layers size={20} />
//               </button>
//             </div>

//             <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 rounded-full hover:bg-gray-700">
//               <Filter size={16} />
//               <span className="text-sm">Filters</span>
//             </button>

//             <select className="px-3 py-1.5 bg-gray-800 rounded-full hover:bg-gray-700 text-sm">
//               <option>Popularity</option>
//               <option>Latest</option>
//               <option>Rating</option>
//               <option>A-Z</option>
//             </select>
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className="mb-4 text-sm text-gray-400">
//           Showing {startItem}-{endItem} of {totalItems} results
//         </div>

//         {/* Manga Grid */}
//         {viewMode === 'grid' ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
//             {currentItems.map((manga) => (
//               <div
//                 key={manga.id}
//                 className="group cursor-pointer"
//                 onClick={() => onMangaSelect(manga)}
//               >
//                 <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
//                   <img
//                     src={manga.cover}
//                     alt={manga.title}
//                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
//                     <span className="px-2 py-0.5 bg-pink-600 text-white text-xs rounded-full w-fit mb-2">
//                       {manga.genre}
//                     </span>
//                     <div className="flex text-xs text-white/80 gap-2">
//                       <span className="flex items-center gap-1">
//                         <Star size={12} /> {manga.rating}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <BookOpen size={12} /> {manga.chapters} Ch
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <h3 className="mt-2 font-medium group-hover:text-pink-400 transition-colors text-sm md:text-base line-clamp-2">
//                   {manga.title}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {currentItems.map((manga) => (
//               <div
//                 key={manga.id}
//                 className="flex gap-4 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
//                 onClick={() => onMangaSelect(manga)}
//               >
//                 <img
//                   src={manga.cover}
//                   alt={manga.title}
//                   className="w-16 h-24 object-cover rounded shadow-md"
//                 />
//                 <div className="flex flex-col justify-between flex-1">
//                   <div>
//                     <h3 className="font-semibold group-hover:text-pink-400 transition-colors">{manga.title}</h3>
//                     {manga.author && <p className="text-xs text-gray-400 mt-1">{manga.author}</p>}
//                     <div className="flex gap-2 mt-2">
//                       <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded-full">
//                         {manga.genre}
//                       </span>
//                       {manga.status && (
//                         <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded-full">
//                           {manga.status}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div className="flex text-xs text-white/80 gap-3">
//                       <span className="flex items-center gap-1">
//                         <Star size={12} /> {manga.rating}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <BookOpen size={12} /> {manga.chapters} Ch
//                       </span>
//                     </div>
//                     <div className="flex gap-1">
//                       <button 
//                         className="p-1.5 rounded-full text-gray-400 hover:text-pink-400 hover:bg-gray-700/50"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           // Handle bookmark action
//                         }}
//                       >
//                         <Bookmark size={16} />
//                       </button>
//                       <button 
//                         className="p-1.5 rounded-full text-gray-400 hover:text-pink-400 hover:bg-gray-700/50"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           // Handle favorite action
//                         }}
//                       >
//                         <Heart size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination - Simplified for just 2 pages */}
//         {totalItems > itemsPerPage && (
//           <div className="flex justify-center mt-12">
//             <div className="flex gap-1">
//               <button 
//                 className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={() => handlePageChange(1)}
//                 disabled={currentPage === 1}
//               >
//                 <ChevronLeft size={20} />
//               </button>
              
//               <button
//                 className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === 1 ? 'bg-pink-600' : 'bg-gray-800 hover:bg-gray-700'}`}
//                 onClick={() => handlePageChange(1)}
//               >
//                 1
//               </button>
              
//               <button
//                 className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === 2 ? 'bg-pink-600' : 'bg-gray-800 hover:bg-gray-700'}`}
//                 onClick={() => handlePageChange(2)}
//               >
//                 2
//               </button>
              
//               <button 
//                 className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={() => handlePageChange(2)}
//                 disabled={currentPage === 2}
//               >
//                 <ChevronRight size={20} />
//               </button>
//             </div>
//           </div>
//         )}
        
//         {/* Results stats at bottom */}
//         {totalItems > itemsPerPage && (
//           <div className="text-center mt-4 text-sm text-gray-400">
//             Page {currentPage} of {totalPages} • Showing {currentItems.length} manga
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Bookmarks Page Component
// const BookmarksPage = ({ mangaData }) => {
//   // Simulate bookmarked manga using trending and featured manga
//   const bookmarkedManga = [
//     ...(mangaData.trendingManga || []).slice(0, 3),
//     ...(mangaData.featuredManga || []).slice(1, 4)
//   ];

//   return (
//     <div className="h-full overflow-y-auto bg-gray-900 pb-8">
//       <div className="px-6 md:px-12 py-6">
//         <p className="text-3xl font-bold mb-2">Your Bookmarks</p>
//         <p className="text-gray-400 mb-8">Manga you've saved for later</p>

//         {bookmarkedManga.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-12">
//             <Bookmark size={64} className="text-gray-700 mb-4" />
//             <h2 className="text-xl font-medium text-gray-500 mb-2">No bookmarks yet</h2>
//             <p className="text-gray-600 text-center max-w-md">
//               Browse manga and use the bookmark button to save titles for later reading
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {bookmarkedManga.map((manga, index) => (
//               <div key={index} className="flex gap-4 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group">
//                 <img
//                   src={manga.cover}
//                   alt={manga.title}
//                   className="w-20 h-28 object-cover rounded shadow-md"
//                 />
//                 <div className="flex flex-col justify-between flex-1">
//                   <div>
//                     <h3 className="font-semibold group-hover:text-pink-400 transition-colors">{manga.title}</h3>
//                     <p className="text-xs text-gray-400 mt-1">Added 2 days ago</p>
//                     <div className="flex gap-2 mt-2">
//                       <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded-full">
//                         {manga.genre}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div className="flex text-xs text-white/80 gap-3">
//                       <span className="flex items-center gap-1">
//                         <BookOpen size={12} /> {manga.chapters} Ch
//                       </span>
//                     </div>
//                     <div className="flex gap-1">
//                       <button className="p-1.5 rounded-full text-pink-400 hover:bg-gray-700/50">
//                         <Bookmark size={16} />
//                       </button>
//                       <button className="p-1.5 rounded-full text-gray-400 hover:text-pink-400 hover:bg-gray-700/50">
//                         <Share2 size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Favorites Page Component
// const FavoritesPage = ({ mangaData }) => {
//   const favoriteManga = [
//     ...(mangaData.trendingManga || []).slice(0, 3),
//     ...(mangaData.featuredManga || []).slice(1, 4)
//   ];

//   return (
//     <div className="h-full overflow-y-auto bg-gray-900 pb-8">
//       <div className="px-6 md:px-12 py-6">
//         <p className="text-3xl font-bold mb-2">Your Favorites</p>
//         <p className="text-gray-400 mb-8">Manga you love and want to keep track of</p>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {favoriteManga.map((manga, index) => (
//             <div key={index} className="flex gap-4 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group">
//               <img
//                 src={manga.cover}
//                 alt={manga.title}
//                 className="w-20 h-28 object-cover rounded shadow-md"
//               />
//               <div className="flex flex-col justify-between flex-1">
//                 <div>
//                   <h3 className="font-semibold group-hover:text-pink-400 transition-colors">{manga.title}</h3>
//                   <div className="flex items-center gap-1 mt-1">
//                     <Star size={14} className="text-yellow-400" />
//                     <Star size={14} className="text-yellow-400" />
//                     <Star size={14} className="text-yellow-400" />
//                     <Star size={14} className="text-yellow-400" />
//                     <Star size={14} className="text-yellow-400" />
//                   </div>
//                   <div className="flex gap-2 mt-2">
//                     <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded-full">
//                       {manga.genre}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <div className="flex text-xs text-white/80 gap-3">
//                     <span className="flex items-center gap-1">
//                       <BookOpen size={12} /> {manga.chapters} Ch
//                     </span>
//                   </div>
//                   <div className="flex gap-1">
//                     <button className="p-1.5 rounded-full text-pink-400 hover:bg-gray-700/50">
//                       <Heart size={16} />
//                     </button>
//                     <button className="p-1.5 rounded-full text-gray-400 hover:text-pink-400 hover:bg-gray-700/50">
//                       <Bookmark size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Stats Section */}
//         <div className="mt-12 bg-gray-800/50 rounded-xl p-6">
//           <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
//             <BarChart size={20} className="text-pink-400" />
//             Your Reading Stats
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-gray-800 rounded-lg p-4">
//               <h3 className="text-gray-400 text-sm mb-2">Total Chapters Read</h3>
//               <p className="text-3xl font-bold">153</p>
//               <div className="mt-1 text-xs text-green-400">+12 this week</div>
//             </div>

//             <div className="bg-gray-800 rounded-lg p-4">
//               <h3 className="text-gray-400 text-sm mb-2">Reading Streak</h3>
//               <p className="text-3xl font-bold">7 days</p>
//               <div className="mt-1 text-xs text-pink-400">Keep it up!</div>
//             </div>

//             <div className="bg-gray-800 rounded-lg p-4">
//               <h3 className="text-gray-400 text-sm mb-2">Completed Series</h3>
//               <p className="text-3xl font-bold">4</p>
//               <div className="mt-1 text-xs text-gray-400">2 ongoing</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Reader Page Component
// const ReaderPage = ({ manga, setActivePage, isFullScreen, setIsFullScreen }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(25); // Simulated total pages
//   const [zoomLevel, setZoomLevel] = useState(100);
//   const [readerMode, setReaderMode] = useState('vertical'); // 'vertical' or 'horizontal'
//   const [showControls, setShowControls] = useState(true);

//   // Sample pages array for the manga
//   const pages = Array.from({ length: totalPages }, (_, i) => ({
//     id: i + 1,
//     // Generate varying image ratios to simulate real manga pages
//     imageUrl: manga?.cover || 'https://via.placeholder.com/800x1200',
//   }));

//   // Handle navigation
//   const goToPreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const goToNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Handle zoom
//   const handleZoomIn = () => {
//     if (zoomLevel < 200) {
//       setZoomLevel(zoomLevel + 10);
//     }
//   };

//   const handleZoomOut = () => {
//     if (zoomLevel > 50) {
//       setZoomLevel(zoomLevel - 10);
//     }
//   };

//   // Toggle fullscreen
//   const toggleFullScreen = async () => {
//     try {
//       if (!document.fullscreenElement) {
//         await document.documentElement.requestFullscreen();
//         setIsFullScreen(true);
//       } else if (document.fullscreenElement) {
//         await document.exitFullscreen();
//         setIsFullScreen(false);
//       }
//     } catch (err) {
//       console.error(`Error attempting to toggle fullscreen: ${err.message}`);
//     }
//   };
  
//   // Handle keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = async (e) => {
//       try {
//         switch (e.key) {
//           case 'ArrowLeft':
//             goToPreviousPage();
//             break;
//           case 'ArrowRight':
//             goToNextPage();
//             break;
//           case '+':
//             handleZoomIn();
//             break;
//           case '-':
//             handleZoomOut();
//             break;
//           case 'f':
//             toggleFullScreen();
//             break;
//           case 'Escape':
//             if (document.fullscreenElement) {
//               await document.exitFullscreen();
//               setIsFullScreen(false);
//             }
//             break;
//           default:
//             break;
//         }
//       } catch (err) {
//         console.error(`Error handling keydown: ${err.message}`);
//       }
//     };
  
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [isFullScreen]);
  
//   // Toggle reader controls visibility
//   const toggleControls = () => {
//     setShowControls(!showControls);
//   };

//   // Toggle reading mode (vertical/horizontal)
//   const toggleReaderMode = () => {
//     setReaderMode(readerMode === 'vertical' ? 'horizontal' : 'vertical');
//   };

//   return (
//     <div className="h-full flex flex-col bg-gray-900 relative">
//       {/* Top Header */}
//       <div className={`bg-gray-900/80 p-4 z-10 transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <p>
//               <button
//               onClick={() => setActivePage('home')}
//               className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors"
//             >
//                 <ChevronLeft size={20} />
//                 <span>Back</span>
//               </button>
//             </p>
//             <p className="text-lg font-semibold hidden md:block">
//               {manga?.title || 'Manga Title'} - Chapter {manga?.chapters || '1'}
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             {/* Page navigation code */}
//             <div className={`px-3 py-1 bg-gray-800 rounded-full flex items-center gap-1 ${readerMode === 'vertical' ? 'hidden' : 'block'}`}>
//               <button
//                 onClick={goToPreviousPage}
//                 disabled={currentPage === 1}
//                 className={`p-1 ${currentPage === 1 ? 'text-gray-600' : 'text-gray-400 hover:text-pink-400'}`}
//               >
//                 <ChevronLeft size={16} />
//               </button>
//               <span className="text-sm">
//                 {currentPage} / {totalPages}
//               </span>
//               <button
//                 onClick={goToNextPage}
//                 disabled={currentPage === totalPages}
//                 className={`p-1 ${currentPage === totalPages ? 'text-gray-600' : 'text-gray-400 hover:text-pink-400'}`}
//               >
//                 <ChevronRight size={16} />
//               </button>
//             </div>

//             <button 
//               onClick={toggleReaderMode}
//               className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-pink-400"
//               title={`Switch to ${readerMode === 'vertical' ? 'horizontal' : 'vertical'} reading`}
//             >
//               {readerMode === 'vertical' ? <Layers size={16} /> : <List size={16} />}
//             </button>

//             <button 
//               onClick={toggleFullScreen}
//               className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-pink-400"
//               title="Toggle fullscreen"
//             >
//               <Maximize2 size={16} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Reader Content */}
//       <div 
//         className="flex-1 overflow-auto bg-gray-950 relative"
//         onClick={toggleControls}
//       >
//         <div 
//           className={`min-h-full flex ${readerMode === 'vertical' ? 'flex-col items-center' : 'items-center justify-center'}`}
//         >
//           {pages.map((page, index) => (
//             <div 
//               key={page.id}
//               className={`${readerMode === 'vertical' ? 'w-full max-w-3xl py-2' : 'px-4'} ${currentPage === page.id ? 'block' : readerMode === 'horizontal' ? 'hidden' : ''}`}
//             >
//               <img 
//                 src={page.imageUrl} 
//                 alt={`Page ${page.id}`}
//                 className="mx-auto object-contain"
//                 style={{ 
//                   width: `${zoomLevel}%`,
//                   maxWidth: readerMode === 'vertical' ? '100%' : 'none',
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Controls */}
//       <div className={`bg-gray-900/80 p-4 transition-opacity z-10 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={handleZoomOut}
//               className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-pink-400"
//               title="Zoom out"
//             >
//               <ZoomOut size={16} />
//             </button>
//             <div className="text-sm">{zoomLevel}%</div>
//             <button 
//               onClick={handleZoomIn}
//               className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-pink-400"
//               title="Zoom in"
//             >
//               <ZoomIn size={16} />
//             </button>
//           </div>

//           <div className="flex items-center gap-3">
//             <button 
//               className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-pink-400"
//               title="Add to bookmarks"
//             >
//               <Bookmark size={16} />
//             </button>
//             <button 
//               className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-pink-400"
//               title="Add to favorites"
//             >
//               <Heart size={16} />
//             </button>
//             <button 
//               className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-pink-400"
//               title="Share"
//             >
//               <Share2 size={16} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Page Navigation Buttons (on sides) */}
//       <button
//         onClick={goToPreviousPage}
//         disabled={currentPage === 1}
//         className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-3 bg-gray-900/40 hover:bg-gray-900/60 rounded-r-lg transition-opacity ${showControls ? 'opacity-80' : 'opacity-0'} ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
//       >
//         <ChevronLeft size={24} className="text-white" />
//       </button>

//       <button
//         onClick={goToNextPage}
//         disabled={currentPage === totalPages}
//         className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-3 bg-gray-900/40 hover:bg-gray-900/60 rounded-l-lg transition-opacity ${showControls ? 'opacity-80' : 'opacity-0'} ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
//       >
//         <ChevronRight size={24} className="text-white" />
//       </button>

//       {/* Chapter Navigation */}
//       <div className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-900/80 rounded-full px-4 py-2 transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}>
//         <div className="flex items-center gap-4">
//           <button 
//             className="text-gray-400 hover:text-pink-400 flex items-center gap-1"
//             title="Previous chapter"
//           >
//             <ChevronLeft size={16} />
//             <span className="text-sm">Prev Ch.</span>
//           </button>
          
//           <select className="bg-gray-800 text-white text-sm rounded px-2 py-1">
//             <option>Chapter {manga?.chapters || '1'}</option>
//             <option>Chapter {(manga?.chapters || 1) - 1}</option>
//             <option>Chapter {(manga?.chapters || 1) - 2}</option>
//           </select>
          
//           <button 
//             className="text-gray-400 hover:text-pink-400 flex items-center gap-1"
//             title="Next chapter"
//           >
//             <span className="text-sm">Next Ch.</span>
//             <ChevronRight size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // UserPage
// const UserPage = ({ setActivePage }) => {
//   const [activeTab, setActiveTab] = useState('profile');
  
//   // Mock user data
//   const userData = {
//     username: 'MangaFan123',
//     email: 'mangafan@example.com',
//     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
//     joined: 'January 2023',
//     readCount: 153,
//     favoriteCount: 21,
//     readingStreak: 7
//   };
  
//   // Mock notification data
//   const notifications = [
//     { id: 1, title: 'New Chapter Available', manga: 'One Piece', chapter: 1084, time: '2 hours ago', read: false },
//     { id: 2, title: 'Your Favorite Updated', manga: 'Jujutsu Kaisen', chapter: 256, time: '1 day ago', read: true },
//     { id: 3, title: 'Reading Streak', message: 'You\'ve read manga for 7 days in a row!', time: '2 days ago', read: true }
//   ];
  
//   // Mock reading history
//   const readingHistory = [
//     { id: 1, title: 'One Piece', chapter: 1084, lastRead: '2 hours ago', progress: 85 },
//     { id: 2, title: 'My Hero Academia', chapter: 412, lastRead: 'Yesterday', progress: 100 },
//     { id: 3, title: 'Jujutsu Kaisen', chapter: 256, lastRead: '3 days ago', progress: 60 },
//     { id: 4, title: 'Chainsaw Man', chapter: 150, lastRead: 'Last week', progress: 100 }
//   ];

//   return (
//     <div className="h-full overflow-y-auto bg-gray-900 pb-8">
//       <div className="px-6 md:px-12 py-6">
//         {/* Profile Header */}
//         <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
//           <div className="relative">
//             <img 
//               src={userData.avatar} 
//               alt="User Avatar" 
//               className="w-24 h-24 rounded-full border-4 border-violet-600 shadow-lg"
//             />
//             <button className="absolute bottom-0 right-0 p-1.5 bg-violet-600 rounded-full text-white hover:bg-violet-700 transition-colors">
//               <Edit size={14} />
//             </button>
//           </div>
          
//           <div className="md:text-left">
//             <p className="text-2xl font-bold">{userData.username}</p>
//             <p className="text-gray-400">{userData.email}</p>
//             <p className="text-sm text-gray-500 mt-1">Member since {userData.joined}</p>
            
//             <div className="flex gap-4 mt-4 justify-center md:justify-start">
//               <div className="text-center">
//                 <p className="text-xl font-bold">{userData.readCount}</p>
//                 <p className="text-xs text-gray-400">Chapters Read</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-xl font-bold">{userData.favoriteCount}</p>
//                 <p className="text-xs text-gray-400">Favorites</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-xl font-bold">{userData.readingStreak} days</p>
//                 <p className="text-xs text-gray-400">Reading Streak</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="md:ml-auto">
//             <button className="px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-full text-white flex items-center gap-2 transition-colors">
//               <Edit size={16} />
//               Edit Profile
//             </button>
//           </div>
//         </div>
        
//         {/* Tab Navigation */}
//         <div className="flex overflow-x-auto gap-2 mb-6 pb-2 no-scrollbar">
//           <button 
//             className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeTab === 'profile' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
//             onClick={() => setActiveTab('profile')}
//           >
//             Profile
//           </button>
//           <button 
//             className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeTab === 'history' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
//             onClick={() => setActiveTab('history')}
//           >
//             Reading History
//           </button>
//           <button 
//             className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeTab === 'notifications' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
//             onClick={() => setActiveTab('notifications')}
//           >
//             Notifications
//           </button>
//           <button 
//             className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeTab === 'downloads' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
//             onClick={() => setActiveTab('downloads')}
//           >
//             Downloads
//           </button>
//         </div>
        
//         {/* Tab Content */}
//         <div className="bg-gray-800/50 rounded-xl p-6">
//           {activeTab === 'profile' && (
//             <div>
//               <h2 className="text-xl font-bold mb-6">Profile Information</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="text-lg font-medium mb-4">Account Details</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <p className="text-sm text-gray-400">Username</p>
//                       <p>{userData.username}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-400">Email</p>
//                       <p>{userData.email}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-400">Password</p>
//                       <p>••••••••••••</p>
//                     </div>
//                   </div>
                  
//                   <button className="mt-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors">
//                     Update Account Information
//                   </button>
//                 </div>
                
//                 <div>
//                   <h3 className="text-lg font-medium mb-4">Reading Preferences</h3>
//                   <div className="space-y-4">
//                     <div className="flex justify-between items-center">
//                       <p>Reading Direction</p>
//                       <select className="bg-gray-700 rounded py-1 px-2 text-sm">
//                         <option>Left to Right</option>
//                         <option>Right to Left</option>
//                       </select>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <p>Default View Mode</p>
//                       <select className="bg-gray-700 rounded py-1 px-2 text-sm">
//                         <option>Vertical Scrolling</option>
//                         <option>Horizontal Pages</option>
//                       </select>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <p>Auto-Save Progress</p>
//                       <label className="relative inline-flex items-center cursor-pointer">
//                         <input type="checkbox" value="" className="sr-only peer" defaultChecked />
//                         <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="mt-8 pt-6 border-t border-gray-700">
//                 <h3 className="text-lg font-medium mb-4">Account Actions</h3>
//                 <div className="flex flex-wrap gap-4">
//                   <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm transition-colors flex items-center gap-2">
//                     <Download size={16} /> Export Reading Data
//                   </button>
//                   <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors flex items-center gap-2">
//                     <Shield size={16} /> Privacy Settings
//                   </button>
//                   <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors flex items-center gap-2">
//                     <LogOut size={16} /> Log Out
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {activeTab === 'history' && (
//             <div>
//               <h2 className="text-xl font-bold mb-6">Reading History</h2>
              
//               <div className="space-y-4">
//                 {readingHistory.map((item) => (
//                   <div key={item.id} className="flex gap-4 items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
//                     <div className="flex-1">
//                       <h3 className="font-medium">{item.title}</h3>
//                       <p className="text-sm text-gray-400">Chapter {item.chapter}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm text-gray-400">{item.lastRead}</p>
//                       <div className="mt-1 h-1.5 w-16 bg-gray-700 rounded-full overflow-hidden">
//                         <div className="h-full bg-pink-500" style={{ width: `${item.progress}%` }}></div>
//                       </div>
//                     </div>
//                     <button 
//                       className="p-2 text-gray-400 hover:text-pink-400 hover:bg-gray-600 rounded-full"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         // Handle continue reading
//                       }}
//                     >
//                       <BookOpen size={18} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
              
//               <button className="mt-6 w-full py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors">
//                 View Complete History
//               </button>
//             </div>
//           )}
          
//           {activeTab === 'notifications' && (
//             <div>
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold">Notifications</h2>
//                 <button className="text-sm text-pink-400 hover:text-pink-300">
//                   Mark All as Read
//                 </button>
//               </div>
              
//               <div className="space-y-3">
//                 {notifications.map((notification) => (
//                   <div 
//                     key={notification.id} 
//                     className={`p-4 rounded-lg flex items-start gap-3 ${notification.read ? 'bg-gray-800' : 'bg-gray-800/80 border-l-4 border-pink-500'}`}
//                   >
//                     <div className="p-2 bg-violet-600/20 rounded-full text-violet-400">
//                       {notification.title.includes('Chapter') ? (
//                         <BookOpen size={20} />
//                       ) : notification.title.includes('Favorite') ? (
//                         <Heart size={20} />
//                       ) : (
//                         <Bell size={20} />
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-medium">{notification.title}</h3>
//                       {notification.manga ? (
//                         <p className="text-sm text-gray-400">
//                           {notification.manga} - Chapter {notification.chapter}
//                         </p>
//                       ) : (
//                         <p className="text-sm text-gray-400">{notification.message}</p>
//                       )}
//                       <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
//                     </div>
//                     <button className="text-gray-400 hover:text-gray-300 p-1">
//                       <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
//                     </button>
//                   </div>
//                 ))}
//               </div>
              
//               <button className="mt-6 w-full py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors">
//                 View All Notifications
//               </button>
//             </div>
//           )}
          
//           {activeTab === 'downloads' && (
//             <div>
//               <h2 className="text-xl font-bold mb-6">Downloads</h2>
              
//               <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center">
//                 <Download size={64} className="text-gray-600 mb-4" />
//                 <h3 className="text-lg font-medium text-gray-400">No Downloads Yet</h3>
//                 <p className="text-sm text-gray-500 text-center mt-2 max-w-md">
//                   Download your favorite manga chapters to read offline. Available manga will appear here.
//                 </p>
//                 <button onClick={() => setActivePage('browse')} className="mt-6 px-6 py-2 bg-violet-600 hover:bg-violet-700 rounded-full text-white text-sm transition-colors">
//                   Browse Manga
//                 </button>
//               </div>
              
//               <div className="mt-6 bg-gray-800 rounded-lg p-6">
//                 <h3 className="text-lg font-medium mb-4">Download Settings</h3>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p>Download Over Wi-Fi Only</p>
//                       <p className="text-xs text-gray-500">Save mobile data by only downloading on Wi-Fi</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input type="checkbox" value="" className="sr-only peer" defaultChecked />
//                       <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
//                     </label>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p>Auto-Delete After Reading</p>
//                       <p className="text-xs text-gray-500">Free up space by removing completed manga</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input type="checkbox" value="" className="sr-only peer" />
//                       <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
//                     </label>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p>Storage Usage</p>
//                       <p className="text-xs text-gray-500">Currently using 246MB of storage</p>
//                     </div>
//                     <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors">
//                       Clear All
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
        
//         {/* Footer Links */}
//         <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
//           <button className="flex items-center gap-2 text-gray-400 hover:text-white">
//             <HelpCircle size={16} /> Help Center
//           </button>
//           <button className="flex items-center gap-2 text-gray-400 hover:text-white">
//             <Shield size={16} /> Privacy Policy
//           </button>
//           <button className="flex items-center gap-2 text-gray-400 hover:text-white">
//             <Moon size={16} /> Dark Mode
//           </button>
//           <button className="flex items-center gap-2 text-gray-400 hover:text-white">
//             <LogOut size={16} /> Log Out
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// // Settings page
// // Enhanced Settings Page Component
// const SettingsPage = () => {
//   const [notificationsEnabled, setNotificationsEnabled] = useState(true);
//   const [autoSave, setAutoSave] = useState(true);
//   const [theme, setTheme] = useState('light');
//   const [downloadQuality, setDownloadQuality] = useState('high');
//   const [readingDirection, setReadingDirection] = useState('left-to-right');

//   return (
//     <div className="h-full overflow-y-auto bg-gray-900 pb-8 px-6 md:px-12 py-6">
//       <h2 className="text-3xl font-bold mb-6">Settings</h2>

//       <div className="bg-gray-800 rounded-lg p-6 mb-6">
//         <h3 className="text-xl font-semibold mb-4">General Settings</h3>
//         <div className="flex justify-between items-center mb-4">
//           <span>Enable Notifications</span>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input type="checkbox" className="sr-only" checked={notificationsEnabled} onChange={() => setNotificationsEnabled(!notificationsEnabled)} />
//             <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${notificationsEnabled ? 'bg-pink-600' : 'bg-gray-700'}`}>
//               <div className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${notificationsEnabled ? 'translate-x-full' : ''}`}></div>
//             </div>
//           </label>
//         </div>
//         <div className="flex justify-between items-center mb-4">
//           <span>Auto-Save Progress</span>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input type="checkbox" className="sr-only" checked={autoSave} onChange={() => setAutoSave(!autoSave)} />
//             <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${autoSave ? 'bg-pink-600' : 'bg-gray-700'}`}>
//               <div className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${autoSave ? 'translate-x-full' : ''}`}></div>
//             </div>
//           </label>
//         </div>
//       </div>

//       <div className="bg-gray-800 rounded-lg p-6 mb-6">
//         <h3 className="text-xl font-semibold mb-4">Theme Settings</h3>
//         <div className="flex justify-between items-center mb-4">
//           <span>Theme</span>
//           <select className="bg-gray-700 text-white rounded px-2 py-1" value={theme} onChange={(e) => setTheme(e.target.value)}>
//             <option value="light">Light</option>
//             <option value="dark">Dark</option>
//           </select>
//         </div>
//       </div>

//       <div className="bg-gray-800 rounded-lg p-6 mb-6">
//         <h3 className="text-xl font-semibold mb-4">Download Settings</h3>
//         <div className="flex justify-between items-center mb-4">
//           <span>Download Quality</span>
//           <select className="bg-gray-700 text-white rounded px-2 py-1" value={downloadQuality} onChange={(e) => setDownloadQuality(e.target.value)}>
//             <option value="high">High</option>
//             <option value="medium">Medium</option>
//             <option value="low">Low</option>
//           </select>
//         </div>
//       </div>

//       <div className="bg-gray-800 rounded-lg p-6 mb-6">
//         <h3 className="text-xl font-semibold mb-4">Reading Direction</h3>
//         <div className="flex justify-between items-center mb-4">
//           <span>Reading Direction</span>
//           <select className="bg-gray-700 text-white rounded px-2 py-1" value={readingDirection} onChange={(e) => setReadingDirection(e.target.value)}>
//             <option value="left-to-right">Left to Right</option>
//             <option value="right-to-left">Right to Left</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MangaReaderApp;











import ComingSoon from '../components/ComingSoon';

const MangaReaderApp = () => {
  return (
    <div>
      <ComingSoon />
    </div>
  );
};

export default MangaReaderApp;