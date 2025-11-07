import React, { useState } from 'react';
import From from './From.jsx'
const Shop = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const lostItems = [
    {
      id: 1,
      title: "Black Leather Wallet",
      description: "Black leather wallet with multiple card slots. Last seen near the library on November 3rd. Contains ID cards and some cash.",
      category: "lost",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop",
      location: "Campus Library",
      date: "2025-11-03",
      contactName: "John Doe",
      contactEmail: "john@example.com",
      registrationNumber: "2021CS001"
    },
    {
      id: 2,
      title: "Black Water Bottle",
      description: "Black Milton Comet Single Wall Stainless Steel Water Bottle.",
      category: "lost",
      image: "https://images.unsplash.com/photo-1625708458528-802ec79b1ed8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
      location: "Main Parking Lot",
      date: "2025-11-04",
      contactName: "Sarah Smith",
      contactEmail: "sarah@example.com",
      registrationNumber: "2022EE045"
    },
    {
      id: 3,
      title: "Set of Keys with Toyota Keychain",
      description: "Found a set of keys with Toyota logo keychain and 5 keys attached. Found near the cafeteria entrance.",
      category: "found",
      image: "https://rukminim2.flixcart.com/image/300/300/xif0q/key-chain/t/q/6/toyota-keychain-and-keyring-for-fortuner-urban-cruiser-hyryder-original-imagwkengqtunffa.jpeg",
      location: "Cafeteria Entrance",
      date: "2025-11-05",
      contactName: "Mike Johnson",
      contactEmail: "mike@example.com",
      registrationNumber: "2020ME078"
    },
    {
      id: 4,
      title: "Blue Adidas Backpack",
      description: "Blue Adidas backpack with laptop compartment. Contains textbooks and a water bottle. Last seen in lecture hall B.",
      category: "lost",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      location: "Lecture Hall B",
      date: "2025-11-02",
      contactName: "Emily Davis",
      contactEmail: "emily@example.com",
      registrationNumber: "2021CS089"
    },
    {
      id: 5,
      title: "Silver Watch - Fossil Brand",
      description: "Found a silver Fossil watch in the cafeteria. Has some scratches on the glass. Waiting for rightful owner.",
      category: "found",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=300&fit=crop",
      location: "Cafeteria",
      date: "2025-11-01",
      contactName: "Alex Brown",
      contactEmail: "alex@example.com",
      registrationNumber: "2022IT034"
    },
    {
      id: 6,
      title: "Student ID Card - Engineering Dept",
      description: "Found student ID card belonging to Engineering department. Name visible on card. Found near main gate.",
      category: "found",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGFSIbW1BKbS4U4Ao-EeSl5YnSWd1zuxhAMg&s",
      location: "Main Gate",
      date: "2025-11-06",
      contactName: "Chris Wilson",
      contactEmail: "chris@example.com",
      registrationNumber: "2020CS112"
    }
  ];

  const filteredItems = lostItems.filter(item => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-black min-h-screen font-[Helvetica_Now_Display] w-full">
      {/* Lost Items Listing Section */}
      <div className="min-h-screen text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            <span className="text-white">
              All Lost & Found Items
            </span>
            
          </h2>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
            <div className="relative w-full md:w-96">
              <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
              <input
                type="text"
                placeholder="Search items, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3 flex-wrap justify-center">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-[#EFE9E3] text-black shadow-lg'
                    : 'bg-white/10 hover:bg-white/20 text-gray-300'
                }`}
              >
                All ({lostItems.length})
              </button>
              <button
                onClick={() => setFilter('lost')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === 'lost'
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-white/10 hover:bg-white/20 text-gray-300'
                }`}
              >
                Lost ({lostItems.filter(i => i.category === 'lost').length})
              </button>
              <button
                onClick={() => setFilter('found')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === 'found'
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-white/10 hover:bg-white/20 text-gray-300'
                }`}
              >
                Found ({lostItems.filter(i => i.category === 'found').length})
              </button>
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute top-3 right-3 px-4 py-1 rounded-full text-xs font-bold uppercase ${
                    item.category === 'lost' ? 'bg-red-500/90 text-white' : 'bg-green-500/90 text-white'
                  }`}>
                    {item.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#5682B1] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <i className="ri-map-pin-line text-[#9CAFAA]"></i>
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <i className="ri-calendar-line text-[#BBDCE5]"></i>
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <button className="mt-4 w-full py-2 bg-[#EFE9E3] text-black hover:bg-[#5682B1] rounded-lg font-medium transition-all">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Item Details */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/20 rounded-3xl max-w-2xl w-full my-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-64 object-cover rounded-t-3xl"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
              <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-bold uppercase ${
                selectedItem.category === 'lost' ? 'bg-red-400' : 'bg-green-400'
              }`}>
                {selectedItem.category}
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-white">{selectedItem.title}</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">{selectedItem.description}</p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <i className="ri-map-pin-line text-2xl text-blue-400 mt-1"></i>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white font-medium">{selectedItem.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-calendar-line text-2xl text-purple-400 mt-1"></i>
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="text-white font-medium">
                      {new Date(selectedItem.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-user-line text-2xl text-green-400 mt-1"></i>
                  <div>
                    <p className="text-sm text-gray-400">Posted by</p>
                    <p className="text-white font-medium">{selectedItem.contactName}</p>
                    <p className="text-gray-400 text-sm">{selectedItem.registrationNumber}</p>
                  </div>
                </div>
              </div>

              <a
                href={`mailto:${selectedItem.contactEmail}?subject=Regarding ${selectedItem.title}`}
                className="block w-full py-3 bg-blue-400 rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-xl"
              >
                <i className="ri-mail-line mr-2"></i>
                Contact via Email
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Shop;