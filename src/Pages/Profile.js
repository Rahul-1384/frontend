import React, { useState } from 'react';
import { PackageSearch, AlertCircle, Calendar, Truck, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      address: '123 Book Street, Reading City, RC 12345'
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsEditing(false);
      // Handle profile update logic here
    };
  
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-black mb-6">My Profile</h1>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
              <span className="text-3xl font-bold text-slate-900">
                {profile.name[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-medium text-gray-200">{profile.name}</h2>
              <p className="text-gray-400">{profile.email}</p>
            </div>
          </div>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                disabled={!isEditing}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 disabled:opacity-50"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                disabled={!isEditing}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 disabled:opacity-50"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={profile.phone}
                disabled={!isEditing}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 disabled:opacity-50"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Address
              </label>
              <textarea
                value={profile.address}
                disabled={!isEditing}
                onChange={(e) => setProfile({...profile, address: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 disabled:opacity-50"
              />
            </div>
  
            <div className="flex justify-end space-x-3">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-slate-700 text-gray-200 rounded-lg hover:bg-slate-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-500 text-slate-900 rounded-lg hover:bg-yellow-400 transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-yellow-500 text-slate-900 rounded-lg hover:bg-yellow-400 transition-colors duration-200"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default Profile;