import React, { useState, useEffect, useMemo } from "react";
import { 
  Search, 
  Heart, 
  Sliders, 
  Sparkles, 
  Info, 
  Tv, 
  Grid, 
  HelpCircle, 
  Plus, 
  X, 
  Check, 
  RefreshCw, 
  Play, 
  Settings, 
  Package, 
  Flame, 
  Home, 
  Compass, 
  Radio, 
  Star,
  Bookmark,
  ChevronRight,
  ExternalLink,
  MapPin,
  Globe,
  Bell,
  Trash2
} from "lucide-react";
import { motion } from "motion/react";
import { CATEGORIES, Category, Channel } from "./data/channels";
import ChannelPlayer from "./components/ChannelPlayer";

export default function App() {
  // Local time state clock
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimeWithSeconds = (date: Date) => {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formatDateVietnamese = (date: Date) => {
    const dayOfWeek = date.getDay(); // 0: Sunday, 1: Monday, ...
    let dayStr = "";
    if (dayOfWeek === 0) {
      dayStr = "Chủ Nhật";
    } else {
      dayStr = `Thứ ${dayOfWeek + 1}`;
    }
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    return `${dayStr} - ${dd}/${mm}/${yy}`;
  };

  // Navigation State
  const [activeTab, setActiveTab] = useState<"home" | "live" | "packages" | "settings">("live");

  // Selected Channel State (Defaults to VTV1 HD)
  const defaultChannel = CATEGORIES[0].channels[0];
  const [selectedChannel, setSelectedChannel] = useState<Channel>(() => {
    const saved = localStorage.getItem("glass_tv_last_channel");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.url) return parsed;
      } catch (e) {
        // Fallback
      }
    }
    return defaultChannel;
  });

  // Favorite Channels State
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("glass_tv_favorites");
    return saved ? JSON.parse(saved) : ["vtv1", "vtv3", "vl1", "cartoon-network"];
  });

  // Player configurations
  const [volume, setVolume] = useState<number>(() => {
    const saved = localStorage.getItem("glass_tv_volume");
    return saved ? parseFloat(saved) : 0.8;
  });
  
  const [muted, setMuted] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Custom M3U8 Url link adder
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [customChannelName, setCustomChannelName] = useState<string>("");
  const [customChannelUrl, setCustomChannelUrl] = useState<string>("");
  const [customChannelGroup, setCustomChannelGroup] = useState<string>("Bản Tin Riêng");
  const [customChannels, setCustomChannels] = useState<Channel[]>(() => {
    const saved = localStorage.getItem("glass_tv_custom_list");
    return saved ? JSON.parse(saved) : [];
  });

  // Ambient lights themes configuration (default: sunset)
  const [bgColor, setBgColor] = useState<"cosmic" | "deep" | "aurora" | "sunset">("sunset");

  // Filter & Search logic
  // Join general channels and custom channels
  const allAvailableCategoryList = useMemo(() => {
    if (customChannels.length === 0) return CATEGORIES;
    
    // Add custom category dynamically if there are custom channels
    const customCategory: Category = {
      id: "custom",
      name: "Kênh Tự Thêm (Cá Nhân)",
      description: "Danh sách luồng phát m3u8 tự liên kết",
      channels: customChannels
    };
    return [...CATEGORIES, customCategory];
  }, [customChannels]);

  // Flattened channel list for easy global lookup/search
  const flattenedChannels = useMemo(() => {
    return allAvailableCategoryList.flatMap(cat => cat.channels);
  }, [allAvailableCategoryList]);

  // Persists states
  useEffect(() => {
    localStorage.setItem("glass_tv_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("glass_tv_volume", volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem("glass_tv_last_channel", JSON.stringify(selectedChannel));
  }, [selectedChannel]);

  useEffect(() => {
    localStorage.setItem("glass_tv_custom_list", JSON.stringify(customChannels));
  }, [customChannels]);

  // Toggle favorite helper
  const toggleFavorite = (channelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      if (prev.includes(channelId)) {
        return prev.filter(id => id !== channelId);
      } else {
        return [...prev, channelId];
      }
    });
  };

  // Switch channel trigger
  const handleSelectChannel = (channel: Channel) => {
    setSelectedChannel(channel);
    // Scroll window smoothly to player on small devices for better viewport coverage
    if (window.innerWidth < 1024) {
      const topEl = document.getElementById("player-anchor");
      if (topEl) {
        topEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleNextChannel = () => {
    const currentIndex = flattenedChannels.findIndex(ch => ch.id === selectedChannel.id);
    if (currentIndex !== -1 && currentIndex < flattenedChannels.length - 1) {
      setSelectedChannel(flattenedChannels[currentIndex + 1]);
    } else {
      setSelectedChannel(flattenedChannels[0]);
    }
  };

  const handlePrevChannel = () => {
    const currentIndex = flattenedChannels.findIndex(ch => ch.id === selectedChannel.id);
    if (currentIndex !== -1 && currentIndex > 0) {
      setSelectedChannel(flattenedChannels[currentIndex - 1]);
    } else {
      setSelectedChannel(flattenedChannels[flattenedChannels.length - 1]);
    }
  };

  // Add Custom Channel Handler
  const handleAddCustomChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customChannelName || !customChannelUrl) return;

    const newChannel: Channel = {
      id: `custom-${Date.now()}`,
      name: customChannelName,
      url: customChannelUrl.trim(),
      group: customChannelGroup || "Kênh Riêng",
      logoText: customChannelName.slice(0, 3).toUpperCase(),
      logoBg: "bg-gradient-to-br from-indigo-600 to-fuchsia-700"
    };

    setCustomChannels(prev => [newChannel, ...prev]);
    setSelectedChannel(newChannel);
    setCustomChannelName("");
    setCustomChannelUrl("");
    setShowCustomModal(false);
  };

  // Delete Custom Channel
  const handleDeleteCustomChannel = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomChannels(prev => prev.filter(ch => ch.id !== id));
    if (selectedChannel.id === id) {
      setSelectedChannel(defaultChannel);
    }
  };

  // Filter channels based on search on selected category
  const filteredCategories = useMemo(() => {
    return allAvailableCategoryList.map(category => {
      // Filter channels inside
      const matchedChannels = category.channels.filter(ch => {
        // Search filter matches name, group name
        const matchesSearch = searchQuery 
          ? ch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            ch.group.toLowerCase().includes(searchQuery.toLowerCase())
          : true;

        return matchesSearch;
      });

      return {
        ...category,
        channels: matchedChannels
      };
    }).filter(category => {
      // Filter final category selection
      if (selectedCategory !== "all" && category.id !== selectedCategory) {
        return false;
      }
      return category.channels.length > 0;
    });
  }, [allAvailableCategoryList, selectedCategory, searchQuery]);

  // Favorites channels filtered selection
  const favoriteChannelsList = useMemo(() => {
    return flattenedChannels.filter(ch => favorites.includes(ch.id));
  }, [flattenedChannels, favorites]);

  // Ambient backgrounds options config
  const getBgGradient = () => {
    switch (bgColor) {
      case "cosmic":
        return "bg-gradient-to-tr from-[#12071a] via-[#1a0e36] to-[#011424]";
      case "deep":
        return "bg-gradient-to-br from-[#0c0517] via-[#090b17] to-[#04010a]";
      case "aurora":
        return "bg-gradient-to-tr from-[#150a24] via-[#0d2a23] to-[#240a24]";
      case "sunset":
        return "bg-gradient-to-tr from-[#1a0914] via-[#330c1e] to-[#2e1d0d]";
    }
  };

  return (
    <div className={`min-h-screen text-white/95 pb-32 transition-colors duration-1000 overflow-x-hidden ${getBgGradient()}`}>
      
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-24 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Hero Header Section */}
      <header className="relative w-full max-w-7xl mx-auto px-4 pt-6 pb-2 flex items-center justify-between z-10">
        {/* Left Side: Clock with seconds & date in Thứ x - dd/mm/yy formatting */}
        <div className="flex flex-col items-start justify-center font-google select-none z-10 gap-0.5">
          <div className="text-sm sm:text-base md:text-lg font-bold text-white/95 tracking-wide drop-shadow-md font-google">
            {formatTimeWithSeconds(time)}
          </div>
          <div className="text-sm sm:text-base md:text-lg font-semibold text-white/60 tracking-wide font-google">
            {formatDateVietnamese(time)}
          </div>
        </div>

        {/* Center: Logo positioned absolute for precise alignment relative to screen center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center select-none z-0">
          {/* Logo with no border */}
          <img 
            src="https://static.wikia.nocookie.net/ftv/images/a/ab/Imagexvxvz.png/revision/latest/scale-to-width-down/1000?cb=20260429082350&path-prefix=vi" 
            alt="Vplay Brand Logo"
            referrerPolicy="no-referrer"
            className="h-10 sm:h-12 w-auto object-contain select-none pointer-events-none filter drop-shadow-md transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto"
          />
        </div>

        {/* Empty right spacer to perfectly balance the layout symmetry */}
        <div className="w-24 sm:w-32 h-6" />
      </header>

      {/* Global Search Bar & Add Channel Button Bar */}
      <div className="w-full max-w-5xl mx-auto px-4 mt-4 mb-2 flex items-center justify-center gap-3 z-10 relative">
        <div className="relative flex-1 max-w-md group transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-110 active:scale-85 focus-within:scale-110">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 z-20 pointer-events-none transition-transform duration-300 group-hover:scale-110" />
          <input
            type="text"
            placeholder="Search Vplay channels"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-full text-sm bg-white/10 border border-white/15 backdrop-blur-md text-white placeholder-white/50 focus:bg-white/15 focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all duration-300 shadow-md focus:outline-none"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")} 
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white hover:scale-125 active:scale-95 transition-all duration-200 z-30"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowCustomModal(true)}
          className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 hover:scale-110 active:scale-80 text-white border border-white/15 backdrop-blur-md transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-md cursor-pointer"
          title="Thêm link m3u8 của riêng bạn"
        >
          <Plus className="w-4 h-4 transition-transform duration-300 hover:rotate-90" /> Thêm kênh
        </button>
      </div>

      {/* Main Container */}
      <main id="player-anchor" className="w-full max-w-7xl mx-auto px-4 pt-6 z-10 relative">

        {/* VIEW: LIVE TV BROADCASTING (PRIMARY GRAPHICS) */}
        {activeTab === "live" && (
          <>
            {/* Integrated Main Channel Video Player */}
            <ChannelPlayer
              channel={selectedChannel}
              volume={volume}
              onVolumeChange={setVolume}
              muted={muted}
              onMutedChange={setMuted}
              onNextChannel={handleNextChannel}
              onPrevChannel={handlePrevChannel}
            />

            {/* Glass Category Filter row */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 pt-1 border-b border-white/5">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 hover:scale-110 active:scale-80 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer ${
                  selectedCategory === "all" ? "glass-pill-active" : "glass-pill text-white/60 hover:text-white"
                }`}
              >
                Tất cả nguồn ({flattenedChannels.length})
              </button>
              
              {allAvailableCategoryList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 hover:scale-110 active:scale-80 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer ${
                    selectedCategory === cat.id ? "glass-pill-active" : "glass-pill text-white/60 hover:text-white"
                  }`}
                >
                  {cat.name} ({cat.channels.length})
                </button>
              ))}
            </div>

            {/* CHANNELS ACCORDION LIST matching reference screenshot specs */}
            <div className="flex flex-col gap-10">
              {filteredCategories.length === 0 ? (
                <div className="py-20 text-center glass-panel rounded-2xl border border-white/10 max-w-xl mx-auto">
                  <HelpCircle className="w-12 h-12 text-white/30 mx-auto mb-3" />
                  <p className="text-white/80 font-medium">Không tìm thấy kênh phù hợp</p>
                  <p className="text-white/40 text-xs mt-1">Hãy thử tìm với từ khoá khác hoặc thêm liên kết m3u8 mới.</p>
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <div key={category.id} className="relative animate-fade-in-up">
                    
                    {/* Category Title matching layout like VTV or VTVCAB with Thick vertical bar indicator */}
                    <div className="flex items-center justify-between mb-5 select-none">
                      <div className="flex items-center gap-3">
                        {/* Custom visual thick turquoise or fuchsia vertical colored sidebars */}
                        <div className={`w-1.5 h-7 rounded-full ${
                          category.id === 'vtv' ? 'bg-cyan-400' :
                          category.id === 'vtvcab' ? 'bg-fuchsia-500' :
                          category.id === 'sctv' ? 'bg-red-500' :
                          category.id === 'htv' ? 'bg-orange-500' :
                          category.id === 'quoc-te' ? 'bg-amber-400' : 'bg-pink-500'
                        }`} />
                        <h2 className="text-xl font-extrabold tracking-tight text-white/95 uppercase drop-shadow-sm font-sans">
                          {category.name}
                        </h2>
                      </div>
                      
                      {/* Count badge in gray glass pill like in image */}
                      <span className="text-xs bg-white/5 border border-white/10 text-white/50 px-3 py-1 rounded-full font-mono">
                        {category.channels.length} Kênh
                      </span>
                    </div>

                    {/* Channels responsive grid aligned properly: exactly 3 columns on mobile and 5 columns on desktop */}
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
                      {category.channels.map((ch) => {
                        const isPlaying = selectedChannel.id === ch.id;

                        return (
                          <div
                            key={ch.id}
                            id={`card-${ch.id}`}
                            onClick={() => handleSelectChannel(ch)}
                            className={`group relative rounded-2xl p-3 cursor-pointer flex items-center justify-center h-24 sm:h-28 border-4 ${
                              isPlaying 
                                ? "bg-white/25 backdrop-blur-lg border-white shadow-xl shadow-pink-500/10" 
                                : "bg-white/5 backdrop-blur-md border-white/15 hover:border-white"
                            }`}
                            title={ch.name}
                          >
                            {/* Logo Graphic Container - renders official brand logo image or beautiful backup styled pill */}
                            <div className="w-full flex justify-center items-center h-full">
                              {ch.logoImg ? (
                                <img
                                  src={ch.logoImg}
                                  alt={ch.name}
                                  referrerPolicy="no-referrer"
                                  className={ch.group === "VTV" 
                                    ? "max-h-20 sm:max-h-24 max-w-[100%] scale-105 object-contain filter drop-shadow-md select-none pointer-events-none"
                                    : "max-h-16 sm:max-h-20 max-w-[95%] object-contain filter drop-shadow-md select-none pointer-events-none"
                                  }
                                />
                              ) : (
                                <div className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl ${ch.logoBg} shadow-md border border-white/15 font-black text-white text-[11px] sm:text-xs tracking-widest relative`}>
                                  {ch.logoText}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* VIEW: HOME TRANSITION (TỔNG QUAN) */}
        {activeTab === "home" && (
          <div className="max-w-4xl mx-auto py-4 animate-fade-in">
            {/* Elegant glass billboard */}
            <div className="relative rounded-3xl p-8 md:p-12 glass-panel border border-white/18 shadow-2xl overflow-hidden mb-8 text-center md:text-left">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/25 rounded-full blur-[90px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-10 w-96 h-30 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="relative z-2">
                <span className="bg-pink-500/20 text-pink-300 text-xs font-bold px-3 py-1 rounded-full border border-pink-500/20 uppercase tracking-widest leading-none select-none">
                  Trải nghiệm giải trí thế hệ mới
                </span>
                
                <h2 className="text-4xl md:text-5xl font-black mt-4 leading-tight tracking-tight text-white mb-4">
                  Cổng Xem TV <br className="sm:hidden" />
                  Kính Mờ Trực Tuyến
                </h2>
                
                <p className="text-white/70 max-w-xl text-base leading-relaxed mb-6">
                  Tận hưởng hơn 120 kênh phát thanh, truyền hình HD hoàn toàn miễn phí từ các nhà đài VTV, HTV, VTVCab, và các đài tỉnh trực tuyến. Công nghệ truyền tải luồng tối ưu bảo mật, giao diện kính mờ sang trọng không chứa quảng cáo gây phiền phức.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button 
                    onClick={() => setActiveTab("live")}
                    className="px-8 py-3.5 rounded-full bg-white text-indigo-950 font-bold shadow-lg hover:shadow-white/25 hover:scale-110 active:scale-80 transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-indigo-950" /> Xem Live Ngay
                  </button>
                  <button 
                    onClick={() => setShowCustomModal(true)}
                    className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 hover:scale-110 active:scale-80 text-white font-bold border border-white/15 transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Thêm luồng mới
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Favorites Shelf inside Home Tab */}
            {favoriteChannelsList.length > 0 && (
              <div className="mb-8 animate-fade-in">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white/80">Kênh Yêu Thích Của Bạn</h3>
                  <span className="text-xs text-white/40 font-mono">({favoriteChannelsList.length})</span>
                </div>
                
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                  {favoriteChannelsList.map((ch) => {
                    const isPlaying = selectedChannel.id === ch.id;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => {
                          handleSelectChannel(ch);
                          setActiveTab("live");
                        }}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 shrink-0 border text-left cursor-pointer ${
                          isPlaying 
                            ? "bg-white/20 border-white/50 shadow-lg" 
                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30"
                        }`}
                      >
                        <span className={`w-8 h-8 ${ch.logoBg} rounded-lg flex items-center justify-center text-xs font-black shadow`}>
                          {ch.logoText}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-white max-w-[130px] truncate">{ch.name}</div>
                          <span className="text-[10px] text-white/40 block leading-none">{ch.group}</span>
                        </div>
                        <Heart 
                          onClick={(e) => toggleFavorite(ch.id, e)}
                          className="w-3.5 h-3.5 text-red-500 fill-red-500 hover:scale-120 transition-transform ml-1" 
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 text-center">
              {[
                { label: "Kênh Quốc Gia", value: "13 VTV HD", color: "text-cyan-400" },
                { label: "Tin Tức & Giải Trí", value: "19 VTVCab", color: "text-fuchsia-400" },
                { label: "Kênh TP.HCM & Độc Quyền", value: "15 HTV HD", color: "text-orange-400" },
                { label: "Kênh Địa Phương & Radio", value: "Gần 70+" , color: "text-teal-400" },
              ].map((stat, i) => (
                <div key={i} className="p-5 rounded-2xl glass-panel border border-white/10 flex flex-col justify-center">
                  <span className="text-xs text-white/50">{stat.label}</span>
                  <span className={`text-xl font-extrabold mt-1.5 ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Feature guides */}
            <div className="p-6 rounded-2xl glass-panel border border-white/12 mb-8">
              <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-pink-400" /> Hướng Dẫn Sử Dụng Linh Hoạt
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-white/70">
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">1. Chọn kênh trực tiếp</h4>
                  <p className="leading-relaxed">Nhấp vào bất kỳ thẻ kênh nào để tải video và chương trình phát ở trình phát trung tâm ở trên đầu trang.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">2. Đánh dấu Yêu Thích</h4>
                  <p className="leading-relaxed">Nhấp biểu tượng hình ngôi sao trên mỗi ô kênh để lưu kênh vào mục Yêu Thích, giúp truy cập cực nhanh sau này.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">3. Tùy biến Luồng Phát</h4>
                  <p className="leading-relaxed">Nhấn nút 'Thêm kênh' để dán bất kỳ đường dẫn m3u8 ngoài luồng của bạn để chạy trực tiếp trên web mượt mà.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: DETAILED PACKAGES (CÁC GÓI KÊNH) */}
        {activeTab === "packages" && (
          <div className="max-w-4xl mx-auto py-4 animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black mb-2">Quyền Lợi & Gói Dịch Vụ</h2>
              <p className="text-white/60 text-sm max-w-md mx-auto">Trải nghiệm các nhóm gói kênh chất lượng cao chuẩn HD hoàn toàn mở khoá không tốn phí</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Silver pack */}
              <div className="p-6 rounded-3xl glass-panel border border-white/10 relative flex flex-col justify-between">
                <div>
                  <span className="text-xs text-white/50 block font-semibold uppercase tracking-wider">Cơ Bản</span>
                  <h3 className="text-xl font-bold mt-1 text-cyan-400">Gói Kênh VTV</h3>
                  <p className="text-white/60 text-xs mt-2 leading-relaxed">Truy cập toàn bộ 13 kênh thời sự văn hoá của Đài truyền hình Việt Nam với băng thông không giới hạn.</p>
                  
                  <div className="mt-6 space-y-3 text-xs text-white/80">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Luồng FPT cực kỳ ổn định</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Độ phân giải 1080p FHD</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Cập nhật lịch phát sóng tự lặp</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-4">
                  <div className="text-lg font-black text-white">Hoàn Toàn Free</div>
                  <button onClick={() => { setActiveTab("live"); setSelectedCategory("vtv"); }} className="w-full mt-3 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 hover:scale-110 active:scale-90 cursor-pointer text-cyan-200 border border-cyan-500/30 text-xs font-bold transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)]">Xem nhóm kênh</button>
                </div>
              </div>

              {/* Gold pack */}
              <div className="p-6 rounded-3xl glass-panel border border-white/20 relative flex flex-col justify-between transform -translate-y-2 ring-2 ring-pink-500/30">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">Đề Xuất</span>
                
                <div>
                  <span className="text-xs text-white/50 block font-semibold uppercase tracking-wider mt-1">Cao Cấp</span>
                  <h3 className="text-xl font-bold mt-1 text-pink-400">Gói Kênh VTVCab & HTV</h3>
                  <p className="text-white/60 text-xs mt-2 leading-relaxed">Thế giới thể thao Golf, Kids trẻ em, nhạc trẻ, phim truyền ảnh châu Á và kho HTVC đặc sắc miễn chê.</p>
                  
                  <div className="mt-6 space-y-3 text-xs text-white/80">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-400 shrink-0" />
                      <span>Gồm ON Movies, ON Cine độc quyền</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-400 shrink-0" />
                      <span>Bao gồm HTV7, HTV9 bản quyền</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-400 shrink-0" />
                      <span>Phù hợp xem bóng đá thể thao</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-4">
                  <div className="text-lg font-black text-white">Mở Khoá Sẵn</div>
                  <button onClick={() => { setActiveTab("live"); setSelectedCategory("vtvcab"); }} className="w-full mt-3 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 hover:scale-110 active:scale-90 cursor-pointer text-white text-xs font-bold transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] shadow-lg shadow-pink-500/20">Xem ngay miễn phí</button>
                </div>
              </div>

              {/* Platinum pack */}
              <div className="p-6 rounded-3xl glass-panel border border-white/10 relative flex flex-col justify-between">
                <div>
                  <span className="text-xs text-white/50 block font-semibold uppercase tracking-wider">Mở Rộng</span>
                  <h3 className="text-xl font-bold mt-1 text-amber-400">Gói Quốc Tế & Tự Thêm</h3>
                  <p className="text-white/60 text-xs mt-2 leading-relaxed">Không giới hạn số lượng kênh ngoài luồng. Tương thích trình phát m3u8 đa phương thức tốc độ cao.</p>
                  
                  <div className="mt-6 space-y-3 text-xs text-white/80">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Tải m3u8 từ bất kỳ máy chủ nào</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Hỗ trợ các đài phát thanh VOV</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Lưu danh sách tự thêm offline</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-4">
                  <div className="text-lg font-black text-white">Lưu Trữ Không Giới Hạn</div>
                  <button onClick={() => { setActiveTab("live"); setSelectedCategory("quoc-te"); }} className="w-full mt-3 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 hover:scale-110 active:scale-90 cursor-pointer text-amber-200 border border-amber-500/30 text-xs font-bold transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)]">Khám phá ngay</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: SETTINGS PAGE */}
        {activeTab === "settings" && (
          <div className="max-w-xl mx-auto py-4 animate-fade-in">
            <div className="p-6 rounded-2xl glass-panel border border-white/14">
              <h2 className="text-xl font-bold mb-5 pb-3 border-b border-white/10 flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-400" /> Cài Đặt Hệ Thống
              </h2>

              <div className="space-y-6">
                {/* 1. Background glow customization */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold block text-white/85">Màu Sắc Ánh Sáng Nền (Backdrop Glow)</label>
                  <p className="text-xs text-white/50 mb-3">Tùy biến dải màu chuyển sắc phía dưới lớp kính mờ theo đúng sở thích của bạn.</p>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: "cosmic", name: "Cosmic", color: "from-pink-600 to-indigo-800" },
                      { id: "deep", name: "Tối giản", color: "from-neutral-800 to-slate-900" },
                      { id: "aurora", name: "Cực quang", color: "from-teal-600 to-lime-900" },
                      { id: "sunset", name: "Mãn nhãn", color: "from-rose-600 to-amber-900" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setBgColor(item.id as any)}
                        className={`p-3.5 rounded-xl text-center text-xs font-bold relative overflow-hidden transition-all duration-300 hover:scale-110 active:scale-90 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer border ${
                          bgColor === item.id 
                            ? "border-white ring-2 ring-white/15" 
                            : "border-white/10 hover:border-white/25"
                        }`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-tr ${item.color} opacity-40 -z-10`}></div>
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Device compliance warnings */}
                <div className="pt-2">
                  <label className="text-sm font-semibold block text-white/85 mb-2">Đồng Bộ & Lưu Trữ</label>
                  <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-3 text-xs text-white/70">
                    <div className="flex items-center justify-between">
                      <span>Tổng số Kênh Yêu Thích</span>
                      <span className="font-mono text-amber-300 font-bold">{favorites.length} kênh</span>
                    </div>
                    {favorites.length > 0 && (
                      <button 
                        onClick={() => {
                          if (confirm("Bạn có đồng ý xóa toàn bộ danh mục yêu thích?")) {
                            setFavorites([]);
                          }
                        }}
                        className="py-1.5 px-3 rounded-full bg-red-500/10 hover:bg-red-500/20 hover:scale-110 active:scale-90 text-red-300 border border-red-500/20 transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer font-bold inline-block"
                      >
                        Xóa tất cả yêu thích
                      </button>
                    )}

                    <hr className="border-white/5" />

                    <div className="flex items-center justify-between">
                      <span>Kênh tự thêm cá nhân</span>
                      <span className="font-mono text-indigo-300 font-bold">{customChannels.length} kênh</span>
                    </div>
                    {customChannels.length > 0 && (
                      <button 
                        onClick={() => {
                          if (confirm("Bạn có đồng ý xóa tất cả các kênh tự thêm?")) {
                            setCustomChannels([]);
                          }
                        }}
                        className="py-1.5 px-3 rounded-full bg-red-500/10 hover:bg-red-500/20 hover:scale-110 active:scale-90 text-red-300 border border-red-500/20 transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer font-bold inline-block"
                      >
                        Xoá danh sách kênh tự thêm
                      </button>
                    )}
                  </div>
                </div>

                {/* About technical info */}
                <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-xs leading-relaxed text-indigo-200">
                  <div className="flex items-center gap-2 font-bold text-indigo-100 mb-1">
                    <Info className="w-4 h-4 text-indigo-300" /> Về Vplay m3u8 Player
                  </div>
                  Danh sách phát hiển thị được thu thập trực tuyến từ nhiều nguồn cộng đồng khác nhau. Chúng tôi không lưu trữ hay sở hữu bất kỳ luồng video trực tuyến nào. Ứng dụng chạy hoàn toàn dựa trên Javascript khách (Client-Sided HTML5 Hls stream) nên độ an toàn, bảo mật tuyệt đối với dữ liệu của bạn.
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FLOAT GLASSBOTTOM NAVIGATION NAVIGATION TAB DOCK */}
      <nav id="bottom-dock-container" className="fixed bottom-6 inset-x-0 mx-auto w-11/12 max-w-xs z-50">
        <div className="h-16 rounded-full bg-white/[0.15] backdrop-blur-[15px] border border-white/15 shadow-2xl flex items-center justify-around px-2.5 py-1 relative">
          
          {[
            { id: "home", icon: Home },
            { id: "live", icon: Compass, pulse: true },
            { id: "packages", icon: Package },
            { id: "settings", icon: Settings },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex items-center justify-center w-14 h-11 transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-[1.25] active:scale-[0.75] cursor-pointer z-10 ${
                  isActive 
                    ? "text-indigo-950 font-black" 
                    : "text-white/65 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="absolute inset-0 bg-white rounded-full shadow-lg -z-10"
                  />
                )}
                <Icon className={`w-7.5 h-7.5 ${tab.pulse && !isActive ? "animate-pulse" : ""} transition-transform duration-300 ${isActive ? "scale-105" : ""}`} />
              </button>
            );
          })}

        </div>
      </nav>

      {/* CUSTOM CHANNEL LINK ADDER MODAL */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-100 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl glass-panel border border-white/20 p-6 shadow-2xl relative animate-fade-in">
            <button 
              onClick={() => setShowCustomModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 hover:scale-120 active:scale-75 text-white/50 hover:text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-pink-400">
              <Plus className="w-5 h-5" /> Liên Kết Kênh Luồng Ngoài
            </h3>

            <form onSubmit={handleAddCustomChannel} className="space-y-4 text-sm">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-white/70">Tên Kênh Truyền Hình</label>
                <input
                  required
                  type="text"
                  placeholder="Ví dụ: VTV3 Luồng Dự Phòng"
                  value={customChannelName}
                  onChange={(e) => setCustomChannelName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-white focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-white/70">Đường Dẫn Luồng (.m3u8)</label>
                <input
                  required
                  type="url"
                  placeholder="https://example.com/live/stream.m3u8"
                  value={customChannelUrl}
                  onChange={(e) => setCustomChannelUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-white focus:outline-none focus:ring-1 focus:ring-pink-500 font-mono"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-white/70">Nhóm Kênh / Thể Loại (Tùy chọn)</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Kênh Riêng, Bản Tin"
                  value={customChannelGroup}
                  onChange={(e) => setCustomChannelGroup(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-white focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 hover:scale-110 active:scale-[0.9] text-white font-bold transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] shadow-lg shadow-pink-500/25 cursor-pointer text-center"
                >
                  Kết Nối Kênh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
