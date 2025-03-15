import React, { useState } from 'react';
import { User, LogOut, Edit, Bell, BookOpen, Heart, Clock, Download, Shield, HelpCircle, Moon, ChevronRight } from 'lucide-react';

const UserPage = ({ setActivePage }) => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data
  const userData = {
    username: 'MangaFan123',
    email: 'mangafan@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    joined: 'January 2023',
    readCount: 153,
    favoriteCount: 21,
    readingStreak: 7
  };
  
  // Mock notification data
  const notifications = [
    { id: 1, title: 'New Chapter Available', manga: 'One Piece', chapter: 1084, time: '2 hours ago', read: false },
    { id: 2, title: 'Your Favorite Updated', manga: 'Jujutsu Kaisen', chapter: 256, time: '1 day ago', read: true },
    { id: 3, title: 'Reading Streak', message: 'You\'ve read manga for 7 days in a row!', time: '2 days ago', read: true }
  ];
  
  // Mock reading history
  const readingHistory = [
    { id: 1, title: 'One Piece', chapter: 1084, lastRead: '2 hours ago', progress: 85 },
    { id: 2, title: 'My Hero Academia', chapter: 412, lastRead: 'Yesterday', progress: 100 },
    { id: 3, title: 'Jujutsu Kaisen', chapter: 256, lastRead: '3 days ago', progress: 60 },
    { id: 4, title: 'Chainsaw Man', chapter: 150, lastRead: 'Last week', progress: 100 }
  ];

  return (
    <div className="h-full overflow-y-auto bg-gray-900 pb-8">
      <div className="px-6 md:px-12 py-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div className="relative">
            <img 
              src={userData.avatar} 
              alt="User Avatar" 
              className="w-24 h-24 rounded-full border-4 border-violet-600 shadow-lg"
            />
            <button className="absolute bottom-0 right-0 p-1.5 bg-violet-600 rounded-full text-white hover:bg-violet-700 transition-colors">
              <Edit size={14} />
            </button>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">{userData.username}</h1>
            <p className="text-gray-400">{userData.email}</p>
            <p className="text-sm text-gray-500 mt-1">Member since {userData.joined}</p>
            
            <div className="flex gap-4 mt-4 justify-center md:justify-start">
              <div className="text-center">
                <p className="text-xl font-bold">{userData.readCount}</p>
                <p className="text-xs text-gray-400">Chapters Read</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{userData.favoriteCount}</p>
                <p className="text-xs text-gray-400">Favorites</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{userData.readingStreak} days</p>
                <p className="text-xs text-gray-400">Reading Streak</p>
              </div>
            </div>
          </div>
          
          <div className="md:ml-auto">
            <button className="px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-full text-white flex items-center gap-2 transition-colors">
              <Edit size={16} />
              Edit Profile
            </button>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2 no-scrollbar">
          <button 
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeTab === 'profile' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeTab === 'history' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('history')}
          >
            Reading History
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeTab === 'notifications' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeTab === 'downloads' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('downloads')}
          >
            Downloads
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="bg-gray-800/50 rounded-xl p-6">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Profile Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Account Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">Username</p>
                      <p>{userData.username}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p>{userData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Password</p>
                      <p>••••••••••••</p>
                    </div>
                  </div>
                  
                  <button className="mt-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors">
                    Update Account Information
                  </button>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Reading Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p>Reading Direction</p>
                      <select className="bg-gray-700 rounded py-1 px-2 text-sm">
                        <option>Left to Right</option>
                        <option>Right to Left</option>
                      </select>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Default View Mode</p>
                      <select className="bg-gray-700 rounded py-1 px-2 text-sm">
                        <option>Vertical Scrolling</option>
                        <option>Horizontal Pages</option>
                      </select>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Auto-Save Progress</p>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-lg font-medium mb-4">Account Actions</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm transition-colors flex items-center gap-2">
                    <Download size={16} /> Export Reading Data
                  </button>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors flex items-center gap-2">
                    <Shield size={16} /> Privacy Settings
                  </button>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors flex items-center gap-2">
                    <LogOut size={16} /> Log Out
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Reading History</h2>
              
              <div className="space-y-4">
                {readingHistory.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-400">Chapter {item.chapter}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{item.lastRead}</p>
                      <div className="mt-1 h-1.5 w-16 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-pink-500" style={{ width: `${item.progress}%` }}></div>
                      </div>
                    </div>
                    <button 
                      className="p-2 text-gray-400 hover:text-pink-400 hover:bg-gray-600 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle continue reading
                      }}
                    >
                      <BookOpen size={18} />
                    </button>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 w-full py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors">
                View Complete History
              </button>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Notifications</h2>
                <button className="text-sm text-pink-400 hover:text-pink-300">
                  Mark All as Read
                </button>
              </div>
              
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 rounded-lg flex items-start gap-3 ${notification.read ? 'bg-gray-800' : 'bg-gray-800/80 border-l-4 border-pink-500'}`}
                  >
                    <div className="p-2 bg-violet-600/20 rounded-full text-violet-400">
                      {notification.title.includes('Chapter') ? (
                        <BookOpen size={20} />
                      ) : notification.title.includes('Favorite') ? (
                        <Heart size={20} />
                      ) : (
                        <Bell size={20} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{notification.title}</h3>
                      {notification.manga ? (
                        <p className="text-sm text-gray-400">
                          {notification.manga} - Chapter {notification.chapter}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-400">{notification.message}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-300 p-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                    </button>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 w-full py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors">
                View All Notifications
              </button>
            </div>
          )}
          
          {activeTab === 'downloads' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Downloads</h2>
              
              <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center">
                <Download size={64} className="text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-400">No Downloads Yet</h3>
                <p className="text-sm text-gray-500 text-center mt-2 max-w-md">
                  Download your favorite manga chapters to read offline. Available manga will appear here.
                </p>
                <button className="mt-6 px-6 py-2 bg-violet-600 hover:bg-violet-700 rounded-full text-white text-sm transition-colors">
                  Browse Manga
                </button>
              </div>
              
              <div className="mt-6 bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Download Settings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p>Download Over Wi-Fi Only</p>
                      <p className="text-xs text-gray-500">Save mobile data by only downloading on Wi-Fi</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p>Auto-Delete After Reading</p>
                      <p className="text-xs text-gray-500">Free up space by removing completed manga</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p>Storage Usage</p>
                      <p className="text-xs text-gray-500">Currently using 246MB of storage</p>
                    </div>
                    <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors">
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer Links */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white">
            <HelpCircle size={16} /> Help Center
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white">
            <Shield size={16} /> Privacy Policy
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white">
            <Moon size={16} /> Dark Mode
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white">
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;