import React, { useState, useEffect, useMemo, useRef } from "react";
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
  ChevronLeft,
  ExternalLink,
  MapPin,
  Globe,
  Bell,
  Trash2,
  User
} from "lucide-react";
import { motion } from "motion/react";
import { CATEGORIES, Category, Channel } from "./data/channels";
import ChannelPlayer from "./components/ChannelPlayer";

const homeSlides = [
  {
    id: 0,
    titleTop: "Chào đón",
    titleMain: "Liquid Glass",
    titleSub: "trên Vplay",
    genreText: "THẾ HỆ KÍNH MỜ MỚI",
    subSlogan: "GIAO DIỆN HOÀN MỸ, NÂNG TẦM TRẢI NGHIỆM TRỞ LẠI",
    thumbnail: "https://dfjx2uxqg3cgi.cloudfront.net/img/eps/E13027_2x/c/E13027_00.jpg?20250120193127",
    channelId: "vtv1",
    channelPlayName: "Vplay Premium: Liquid Glass Dynamic Showcase",
    ageRating: "T13",
    ratingText: "Chất lượng UHD | Siêu mượt",
    vignetteLeft: "from-black/90 via-black/55 to-transparent",
    vignetteBottom: "from-[#07050f] via-[#07050f]/85 to-transparent",
    vignetteTop: "from-black/45 via-transparent to-transparent"
  },
  {
    id: 1,
    titleTop: "VTV6",
    titleMain: "Vì một Việt Nam",
    titleSub: "khỏe mạnh!",
    genreText: "THỂ THAO & SỨC KHỎE QUỐC GIA",
    subSlogan: "ĐỒNG HÀNH KHÁT VỌNG, LAN TỎA SỨC TRẺ VIỆT NAM",
    thumbnail: "https://i.ytimg.com/vi/cXv_D6qIy0s/maxresdefault.jpg",
    channelId: "vtv3",
    channelPlayName: "VTV6 - Vì một Việt Nam khỏe mạnh! (FHD)",
    ageRating: "Tất cả",
    ratingText: "Trực tiếp Thể thao | Bản quyền",
    vignetteLeft: "from-black/90 via-black/55 to-transparent",
    vignetteBottom: "from-[#07050f] via-[#07050f]/85 to-transparent",
    vignetteTop: "from-black/45 via-transparent to-transparent"
  },
  {
    id: 2,
    titleTop: "Trải nghiệm",
    titleMain: "Truyền hình đỉnh cao",
    titleSub: "cùng Vplay",
    genreText: "KÍNH MỜ ULTRA HD",
    subSlogan: "CÔNG NGHỆ CHUYỂN KÊNH TIÊN PHONG, KHÔNG ĐỘ TRỄ",
    thumbnail: "https://www.shutterstock.com/shutterstock/videos/3766224185/thumb/1.jpg?ip=x480",
    channelId: "cartoon-network",
    channelPlayName: "Trải nghiệm truyền hình đỉnh cao cùng Vplay (UltraHD)",
    ageRating: "T16",
    ratingText: "Độ trễ bằng 0 | Hỗ trợ m3u8 ngoại luồng",
    vignetteLeft: "from-black/90 via-black/55 to-transparent",
    vignetteBottom: "from-[#07050f] via-[#07050f]/85 to-transparent",
    vignetteTop: "from-black/45 via-transparent to-transparent"
  }
];

export default function App() {
  // Local time state clock
  const [time, setTime] = useState(new Date());
  
  // Immersive Home Slideshow State
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  
  // Favorite channel list horizontal scroll reference
  const favScrollRef = useRef<HTMLDivElement>(null);

  const scrollFavorites = (direction: "left" | "right") => {
    if (favScrollRef.current) {
      const scrollAmount = 300;
      favScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Navigation State
  const [activeTab, setActiveTab] = useState<"home" | "live" | "packages" | "settings">("home");

  // Scroll Position Tracking for Floating Header
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY || document.documentElement.scrollTop;
      if (top > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slide auto rotation effect every 8 seconds
  useEffect(() => {
    if (activeTab !== "home") return;
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % homeSlides.length);
    }, 8000);
    return () => clearInterval(slideTimer);
  }, [activeTab]);

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
  const toggleFavorite = (channelId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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

      {/* TV360 STYLE CINEMATIC HEADER (Floating on Top - Exclusively on HOME tab) */}
      {activeTab === "home" && (
        <header className="fixed top-0 inset-x-0 h-24 z-50 px-4 sm:px-8 md:px-12 flex items-center justify-between pointer-events-auto select-none transition-all duration-150">
          {/* Progressive background blurs backplate - Only visible when scrolled down and completely invisible on top scroll */}
          <div className={`progressive-blur-header z-0 pointer-events-none border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.3)] ${
            isScrolled ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`} />

          <div className="relative z-10 flex items-center gap-6 sm:gap-8 lg:gap-12">
            {/* Brand Logo on the Left */}
            <div onClick={() => setActiveTab("home")} className="flex items-center gap-2 cursor-pointer group">
              <img 
                src="https://static.wikia.nocookie.net/ftv/images/a/ab/Imagexvxvz.png/revision/latest/scale-to-width-down/1000?cb=20260429082350&path-prefix=vi" 
                alt="Vplay Brand Logo"
                referrerPolicy="no-referrer"
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="hidden xs:inline-block font-sans font-black text-lg bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent uppercase tracking-wider select-none">360</span>
            </div>

            {/* Real-time Ticking Digital Clock with Seconds */}
            <div className="flex items-center gap-2 sm:gap-3 bg-white/5 border border-white/10 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-md shadow-inner select-none transition-all duration-300 hover:scale-105 font-google">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse animate-duration-1000" />
              <span className="text-xs sm:text-sm md:text-base font-bold tracking-wide text-white font-google drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                {formatTimeWithSeconds(time)}
              </span>
              <span className="hidden md:inline-block text-white text-xs sm:text-sm md:text-base font-bold pl-2.5 border-l border-white/10 font-google">
                {formatDateVietnamese(time)}
              </span>
            </div>
          </div>

          {/* Right Side: Search capsule, notifications, and profile card */}
          <div className="relative z-10 flex items-center gap-3 sm:gap-6">
            {/* Mini Search input box */}
            <div className="relative group transition-all duration-300 w-28 xs:w-36 sm:w-48 md:w-56 focus-within:w-40 sm:focus-within:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/50 z-20 pointer-events-none" />
              <input
                type="text"
                placeholder="Tìm kênh nhanh..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== "live") {
                    setActiveTab("live");
                  }
                }}
                className="w-full pl-8 pr-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/10 focus:border-white/25 text-white placeholder-white/40 focus:outline-none transition-all duration-300 shadow-inner"
              />
            </div>

            {/* Notification bell icon */}
            <button className="relative p-1.5 rounded-full hover:bg-white/10 text-white/85 hover:text-white transition-all cursor-pointer">
              <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500 ring-2 ring-transparent animate-pulse" />
            </button>

            {/* User avatar displaying email info */}
            <div className="relative group/avatar flex items-center gap-2 cursor-pointer z-50">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-pink-500 via-indigo-600 to-teal-400 p-0.5 shadow-md">
                <div className="w-full h-full rounded-full bg-[#120e24] flex items-center justify-center select-none text-white">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90" />
                </div>
              </div>
              {/* Floating tooltip */}
              <div className="absolute right-0 top-10 pointer-events-none opacity-0 group-hover/avatar:opacity-100 group-hover/avatar:pointer-events-auto transition-all duration-300 bg-black/95 backdrop-blur-md border border-white/10 rounded-xl px-3 py-1.5 shadow-xl text-[10px] sm:text-xs text-white/90 whitespace-nowrap z-50">
                Tài khoản: <span className="font-extrabold text-pink-300">Thành viên Premium</span>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Container */}
      <main id="player-anchor" className={activeTab === "home" ? "w-full pt-0 z-10 relative" : "w-full max-w-7xl mx-auto px-4 pt-6 z-10 relative"}>

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
              isFavorite={favorites.includes(selectedChannel.id)}
              onToggleFavorite={() => toggleFavorite(selectedChannel.id)}
            />

            {/* Live tab Search Bar & Add Channel Button Bar - Placed perfectly under the channel player exactly as requested */}
            <div className="w-full max-w-5xl mx-auto mt-6 mb-6 flex items-center justify-center gap-3 z-10 relative px-2">
              <div className="relative flex-1 max-w-md group transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-110 active:scale-85 focus-within:scale-110">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 z-20 pointer-events-none transition-transform duration-300 group-hover:scale-110" />
                <input
                  type="text"
                  placeholder="Tìm kiếm kênh Vplay..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-full text-sm bg-white/10 border border-white/15 backdrop-blur-md text-white placeholder-white/50 focus:bg-white/15 focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all duration-300 shadow-md focus:outline-none"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")} 
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white hover:scale-125 active:scale-140 transition-all duration-200 z-30"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={() => setShowCustomModal(true)}
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 hover:scale-110 active:scale-120 text-white border border-white/15 backdrop-blur-md transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-md cursor-pointer"
                title="Thêm link m3u8 của riêng bạn"
              >
                <Plus className="w-4 h-4 transition-transform duration-300 hover:rotate-90" /> Thêm kênh
              </button>
            </div>

            {/* Glass Category Filter row */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 pt-1 border-b border-white/5">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 hover:scale-110 active:scale-125 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer ${
                  selectedCategory === "all" ? "glass-pill-active" : "glass-pill text-white/60 hover:text-white"
                }`}
              >
                Tất cả nguồn ({flattenedChannels.length})
              </button>
              
              {allAvailableCategoryList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 hover:scale-110 active:scale-125 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer ${
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
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4">
                      {category.channels.map((ch) => {
                        const isPlaying = selectedChannel.id === ch.id;

                        return (
                          <div
                            key={ch.id}
                            id={`card-${ch.id}`}
                            onClick={() => handleSelectChannel(ch)}
                            className={`group relative rounded-xl p-0.5 sm:p-1 cursor-pointer flex items-center justify-center h-14 xs:h-16 sm:h-20 md:h-24 border-2 select-none transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-105 active:scale-112 ${
                              isPlaying 
                                ? "bg-white/20 backdrop-blur-lg border-white shadow-xl shadow-pink-500/10" 
                                : "bg-white/5 backdrop-blur-md border-white/10 hover:border-white/50"
                            }`}
                            title={ch.name}
                          >
                            {/* Logo Graphic Container - fills the box completely */}
                            <div className="w-full h-full flex justify-center items-center overflow-hidden rounded-lg">
                              {ch.logoImg ? (
                                <img
                                  src={ch.logoImg}
                                  alt={ch.name}
                                  referrerPolicy="no-referrer"
                                  className={`object-contain filter drop-shadow-md select-none pointer-events-none transition-transform duration-300 group-hover:scale-110 active:scale-115 ${
                                    ch.group === "SCTV" ? "w-[60%] h-[60%] p-1" : "w-full h-full"
                                  }`}
                                />
                              ) : (
                                <div className={`w-full h-full flex items-center justify-center rounded-lg ${ch.logoBg} shadow-inner border border-white/10 font-bold text-white text-[9px] sm:text-xs tracking-wider text-center px-1`}>
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
          <div className="w-full animate-fade-in space-y-0 bg-[#07050f]/60 min-h-screen relative pt-0">
            
            {/* TRULY IMMERSIVE HERO BIG BANNER (TV360 STYLE - 100% SCREEN-WIDE BLEED WITH NO ROUNDED CORNERS) */}
            <div className="relative w-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-black min-h-[460px] sm:min-h-[580px] md:min-h-[660px] lg:min-h-[720px] flex items-end pb-12 sm:pb-16 md:pb-20 lg:pb-24 group/hero">
              
              {/* Background cover image representing selected slide */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={homeSlides[currentSlide].thumbnail} 
                  alt={homeSlides[currentSlide].titleMain} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center md:object-right transition-all duration-700 ease-out scale-102 group-hover/hero:scale-105"
                />
                
                {/* Advanced Multi-Layer Vignette Overlays that match the thumbnail color dynamically */}
                <div className={`absolute inset-0 bg-gradient-to-r ${homeSlides[currentSlide].vignetteLeft} z-10 transition-all duration-700`} />
                <div className={`absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t ${homeSlides[currentSlide].vignetteBottom} z-10 transition-all duration-700`} />
                <div className={`absolute inset-x-0 top-0 h-36 bg-gradient-to-b ${homeSlides[currentSlide].vignetteTop} z-10 transition-all duration-700`} />
              </div>

              {/* Foreground content details on left - nested in desktop alignment grid */}
              <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex flex-col items-start gap-1 justify-end h-full">
                {/* Calligraphy logo and title text stylistics with Google Sans font */}
                <div className="flex flex-col select-none mb-3 font-google gap-1">
                  <div className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-white to-pink-200 drop-shadow-[0_4px_15px_rgba(0,0,0,0.95)] font-google">
                    {homeSlides[currentSlide].titleTop}
                  </div>
                  <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-widest leading-none text-red-500 drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] ml-2 xs:ml-4 sm:ml-6 -mt-1 uppercase font-google">
                    {homeSlides[currentSlide].titleMain}
                  </div>
                  {homeSlides[currentSlide].titleSub && (
                    <div className="text-xl xs:text-2xl sm:text-3xl font-bold text-white drop-shadow ml-2 xs:ml-4 sm:ml-6 tracking-wide mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-teal-300 uppercase font-google">
                      {homeSlides[currentSlide].titleSub}
                    </div>
                  )}
                </div>

                {/* Slogans and distribution tags exactly matching mock layout */}
                <p className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wider text-pink-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] uppercase">
                  {homeSlides[currentSlide].genreText}
                </p>
                <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-white/50 tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] -mt-0.5">
                  {homeSlides[currentSlide].subSlogan}
                </p>

                {/* Film attributes tags metadata */}
                <div className="flex items-center gap-1.5 sm:gap-2.5 mt-3 text-[10px] xs:text-xs sm:text-sm font-semibold text-white/90 select-none drop-shadow">
                  <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-black text-[9px] uppercase tracking-wider shadow shadow-red-500/25">
                    {homeSlides[currentSlide].ageRating}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span>{homeSlides[currentSlide].ratingText}</span>
                </div>

                {/* Elegant big glass play buttons */}
                <div className="flex items-center gap-3 mt-6 sm:mt-8">
                  <button 
                    onClick={() => {
                      const slideObj = homeSlides[currentSlide];
                      const targetCh = CATEGORIES.flatMap(cat => cat.channels).find(ch => ch.id === slideObj.channelId) || CATEGORIES[0].channels[0];
                      if (targetCh) {
                        handleSelectChannel({
                          ...targetCh,
                          name: slideObj.channelPlayName,
                        });
                      }
                      setActiveTab("live");
                    }}
                    className="px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-extrabold shadow-xl hover:shadow-red-600/30 hover:scale-110 active:scale-120 transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer border border-red-500/10"
                  >
                    <Play className="w-4.5 h-4.5 fill-white text-white" /> Thử ngay
                  </button>

                  {/* Slider indicator arrows and paging inside the banner */}
                  <div className="flex items-center gap-1.5 ml-2">
                    <button 
                      onClick={() => setCurrentSlide(prev => (prev - 1 + homeSlides.length) % homeSlides.length)}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 active:scale-130 text-white transition-all cursor-pointer flex items-center justify-center border border-white/5 shadow-lg"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setCurrentSlide(prev => (prev + 1) % homeSlides.length)}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 active:scale-130 text-white transition-all cursor-pointer flex items-center justify-center border border-white/5 shadow-lg"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bullet page dot selectors */}
                <div className="flex items-center gap-1.5 mt-5 sm:mt-7 select-none ml-1">
                  {homeSlides.map((slide, idx) => (
                    <span 
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`cursor-pointer transition-all duration-300 rounded-full h-1.5 ${
                        currentSlide === idx ? "w-5 bg-red-500" : "w-1.5 bg-white/25 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>

              </div>
            </div>

            {/* LOWER CONTENT SECTIONS (NESTED SAFELY IN MAX-W-7XL MX-AUTO WITH SPACING FOR PERFECT DESIGN COHESION) */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-8 space-y-12">

            {/* ROW: "KÊNH YÊU THÍCH" CAROUSEL SLIDER (ADDED ABOVE XEM TIẾP SECTIONS EXACTLY AS REQUESTED) */}
            {favoriteChannelsList.length > 0 && (
              <div className="space-y-4 relative group/fav-carousel animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 rounded bg-amber-400" />
                    <h3 className="text-sm sm:text-base font-bold tracking-tight text-white/95 font-google">Kênh yêu thích</h3>
                    <span className="text-xs text-amber-400/80 font-mono mt-1">({favoriteChannelsList.length})</span>
                  </div>

                  {/* Navigation Arrows for Carousel */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => scrollFavorites("left")}
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 shadow"
                      title="Quay lại"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => scrollFavorites("right")}
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 shadow"
                      title="Xem tiếp theo"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Tiles Container */}
                <div 
                  ref={favScrollRef}
                  className="flex gap-3 overflow-x-auto pb-2 scroll-smooth scrollbar-none snap-x"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {favoriteChannelsList.map((ch) => {
                    const isPlaying = selectedChannel.id === ch.id;
                    return (
                      <div
                        key={ch.id}
                        className="snap-start shrink-0"
                      >
                        <div
                          onClick={() => {
                            handleSelectChannel(ch);
                            setActiveTab("live");
                          }}
                          className={`group relative rounded-xl p-0.5 sm:p-1 cursor-pointer flex items-center justify-center w-22 xs:w-26 sm:w-32 md:w-38 h-11 xs:h-13 sm:h-16 md:h-18 border-2 select-none transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-105 active:scale-112 ${
                            isPlaying 
                              ? "bg-white/20 backdrop-blur-lg border-white shadow-xl shadow-pink-500/10" 
                              : "bg-white/5 backdrop-blur-md border-white/10 hover:border-white/50"
                          }`}
                          title={ch.name}
                        >
                          {/* Logo Graphic Container - fills the box completely */}
                          <div className="w-full h-full flex justify-center items-center overflow-hidden rounded-lg">
                            {ch.logoImg ? (
                              <img
                                src={ch.logoImg}
                                alt={ch.name}
                                referrerPolicy="no-referrer"
                                className={`object-contain filter drop-shadow-md select-none pointer-events-none transition-transform duration-300 group-hover:scale-110 active:scale-115 ${
                                  ch.group === "SCTV" ? "w-4/5 h-4/5 p-1.5" : "w-full h-full"
                                }`}
                              />
                            ) : (
                              <div className={`w-full h-full flex items-center justify-center rounded-lg ${ch.logoBg || "bg-emerald-600"} shadow-inner border border-white/10 font-bold text-white text-[9px] sm:text-xs tracking-wider text-center px-1`}>
                                {ch.logoText}
                              </div>
                            )}
                          </div>
                      
                          {/* Heart/Unfav Button overlay (shown on top corner or toggleable) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(ch.id, e);
                            }}
                            className="absolute top-1 right-1 p-1 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black/90 hover:scale-110 active:scale-95 duration-200"
                            title="Xóa khỏi yêu thích"
                          >
                            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ROW 1: "XEM TIẾP" (CONTINUE WATCHING) EXACTLY AS REQUIRED BY THE MOCK */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded bg-pink-500" />
                <h3 className="text-sm sm:text-base font-bold tracking-tight text-white/95 font-google">Xem tiếp</h3>
                <span className="text-xs text-white/40 font-mono mt-1">Gần đây</span>
              </div>

              {/* Horizontal grid for 3 continue watching cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "Thám Tử Lừng Danh Conan (Mùa 1)",
                    desc: "Detective Conan (Season 1) - Tập 15",
                    progress: "24:55",
                    percent: 85,
                    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=80"
                  },
                  {
                    title: "Bạch Nhật Đề Đăng",
                    desc: "Love Beyond the Grave - Tập 1",
                    progress: "40:49",
                    percent: 60,
                    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80"
                  },
                  {
                    title: "Gia Đình Điệp Viên (Mùa 3)",
                    desc: "Spy x Family (Season 3) - Tập 2",
                    progress: "23:40",
                    percent: 45,
                    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=80"
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => {
                      // Switch to player with clean mock drama details set
                      const liveChan = CATEGORIES.flatMap(cat => cat.channels).find(ch => ch.id.includes("vtv3") || ch.id.includes("vtv1")) || CATEGORIES[0].channels[0];
                      if (liveChan) {
                        handleSelectChannel({
                          ...liveChan,
                          name: `Đang xem tiếp: ${item.title} - ${item.desc.split(" - ").pop()}`,
                        });
                      }
                      setActiveTab("live");
                    }}
                    className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-white/20 shadow-lg hover:shadow-pink-500/5 transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-103 cursor-pointer h-40 xs:h-44 sm:h-36 md:h-44 lg:h-48"
                  >
                    {/* Background thumbnail layout */}
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="absolute inset-0 w-full h-full object-cover brightness-[0.7] group-hover:brightness-[0.8] transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Beautiful gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Left Center: Translucent floating mini play badge */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 group-hover:text-white group-hover:bg-red-600 group-hover:scale-110 active:scale-120 duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] transition-all shadow-md">
                        <Play className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-white text-white translate-x-0.5" />
                      </div>
                    </div>

                    {/* Progress duration tag on bottom-right inside card */}
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-black/75 text-white/90 border border-white/10 shadow select-none">
                      {item.progress}
                    </span>

                    {/* Sized percentage red-bar line at the bottom of thumbnail image */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                      <div className="bg-red-500 h-full transition-all duration-500" style={{ width: `${item.percent}%` }} />
                    </div>

                    {/* Bottom overlay text details */}
                    <div className="absolute bottom-2.5 left-3 right-12 z-10 pointer-events-none select-none font-google">
                      <h4 className="text-xs sm:text-[13px] font-bold text-white truncate drop-shadow-md font-google">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-white/65 truncate drop-shadow text-pink-100/80">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 2: "PHIM ĐỀ XUẤT" (RECOMMENDED MOVIES) PORTRAIT CARDS COHESION */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded bg-teal-400" />
                <h3 className="text-sm sm:text-base font-bold tracking-tight text-white/95 font-google">Phim đề xuất</h3>
                <span className="text-xs text-teal-400/80 font-mono mt-1">Đặc sắc nhất</span>
              </div>

              {/* Horizontal grid layout for portrait suggestions */}
              <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
                {[
                  {
                    title: "Liên Hoa Lâu",
                    tag: "Cổ trang · Kiếm hiệp",
                    rating: "9.2",
                    img: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&auto=format&fit=crop&q=80"
                  },
                  {
                    title: "Trường Nguyệt Tẫn Minh",
                    tag: "Tiên hiệp · Tình duyên",
                    rating: "9.0",
                    img: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&auto=format&fit=crop&q=80"
                  },
                  {
                    title: "Khánh Dư Niên 2",
                    tag: "Cung đấu · Mưu quyền",
                    rating: "9.5",
                    img: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=400&auto=format&fit=crop&q=80"
                  },
                  {
                    title: "Đặc Chiến Vinh Diệu",
                    tag: "Quân nhân · Hành động",
                    rating: "8.8",
                    img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80"
                  },
                  {
                    title: "Tây Du Ký 1986",
                    tag: "Kinh điển · Huyền thoại",
                    rating: "9.9",
                    img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&auto=format&fit=crop&q=80"
                  },
                  {
                    title: "Thương Lan Quyết",
                    tag: "Huyền huyễn · Ngọt sủng",
                    rating: "9.1",
                    img: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&auto=format&fit=crop&q=80"
                  }
                ].map((movie, index) => (
                  <div 
                    key={index}
                    onClick={() => {
                      const v3 = CATEGORIES.flatMap(cat => cat.channels).find(ch => ch.id.includes("vtv3")) || CATEGORIES[0].channels[0];
                      if (v3) {
                        handleSelectChannel({
                          ...v3,
                          name: `Phim truyện đề xuất: ${movie.title} (HD)`,
                        });
                      }
                      setActiveTab("live");
                    }}
                    className="group flex flex-col gap-2 cursor-pointer"
                  >
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-white/20 transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-104 shadow-md hover:shadow-teal-500/5">
                      <img 
                        src={movie.img} 
                        alt={movie.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      
                      {/* Rating Label Badge inside Card top-right */}
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-teal-500 text-white font-mono font-black text-[9px] shadow select-none border border-teal-400/20">
                        ★ {movie.rating}
                      </span>

                      {/* Overlap zoom play state representation */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-9 h-9 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-lg hover:scale-115 active:scale-125 transition-transform">
                          <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                    {/* Content metadata details */}
                    <div className="px-1 select-none font-google">
                      <h4 className="text-[11px] sm:text-xs font-bold text-white group-hover:text-teal-300 transition-colors duration-200 truncate font-google">
                        {movie.title}
                      </h4>
                      <p className="text-[10px] text-white/45 truncate mt-0.5">
                        {movie.tag}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center pt-2">
              {[
                { label: "Kênh Quốc Gia", value: "13 VTV HD", color: "text-cyan-400" },
                { label: "Tin Tức & Giải Trí", value: "19 VTVCab", color: "text-fuchsia-400" },
                { label: "Kênh TP.HCM & Độc Quyền", value: "15 HTV HD", color: "text-orange-400" },
                { label: "Kênh Địa Phương & Radio", value: "Gần 70+", color: "text-teal-400" },
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col justify-center">
                  <span className="text-xs text-white/50">{stat.label}</span>
                  <span className={`text-lg font-extrabold mt-1.5 ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Feature guides */}
            <div className="p-6 rounded-2xl glass-panel border border-white/12">
              <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-pink-400" /> Hướng Dẫn Sử Dụng Linh Hoạt
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-white/70">
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">1. Chọn kênh trực tiếp</h4>
                  <p className="leading-relaxed text-xs text-white/60">Nhấp vào bất kỳ thẻ kênh nào hoặc phim ảnh đề xuất để tải chương trình phát trực tiếp ở mục 'Truyền hình'.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">2. Thư viện Yêu Thích</h4>
                  <p className="leading-relaxed text-xs text-white/60">Nhấp biểu tượng hình ngôi sao trên mỗi ô kênh để lưu kênh vào mục Yêu Thích, hiển thị tức thì trên Trang Chủ này.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">3. Tùy biến phát luồng m3u8</h4>
                  <p className="leading-relaxed text-xs text-white/60">Nhấn nút 'Thêm kênh' ở góc phải ô tìm kiếm để dán luồng ngoài m3u8 của riêng bạn cực kì thuận tiện.</p>
                </div>
              </div>
            </div>

            </div>
          </div>
        )}

        {/* VIEW: DETAILED PACKAGES (CÁC GÓI KÊNH) */}
        {activeTab === "packages" && (
          <div className="min-h-[60vh] flex items-center justify-center py-10 animate-fade-in font-google">
            <div className="text-center p-8 xs:p-10 rounded-3xl glass-panel border border-white/10 max-w-sm mx-auto shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-teal-500/5 -z-10" />
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-inner transition-transform duration-500 group-hover:scale-110">
                <Package className="w-8 h-8 text-pink-400" />
              </div>
              <h2 className="text-2xl font-black tracking-widest text-white mb-3 uppercase">Coming soon</h2>
              <p className="text-white/50 text-xs sm:text-[13px] leading-relaxed">Tính năng Gói Kênh Premium chất lượng cao đang được hoàn thiện và sẽ sớm ra mắt trong thời gian tới.</p>
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

      {/* High-fidelity progressive vintage blur backplate for Bottom Navigation Dock */}
      <div className="fixed bottom-0 inset-x-0 h-28 pointer-events-none z-40">
        <div className="progressive-blur-dock" />
      </div>

      {/* FLOAT GLASSBOTTOM NAVIGATION NAVIGATION TAB DOCK */}
      <nav id="bottom-dock-container" className="fixed bottom-6 inset-x-0 mx-auto w-11/12 max-w-[450px] z-50">
        <div className="h-16 rounded-full bg-white/[0.12] backdrop-blur-[20px] saturate-[185%] border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] flex items-center justify-around px-2.5 py-1 relative">
          
          {[
            { id: "home", icon: Home },
            { id: "live", icon: Compass },
            { id: "packages", icon: Package },
            { id: "settings", icon: Settings },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex items-center justify-center w-14 h-11 transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-[1.25] active:scale-[1.4] cursor-pointer z-10 ${
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
                <Icon className={`w-7.5 h-7.5 transition-transform duration-300 ${isActive ? "scale-105" : ""}`} />
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
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 hover:scale-120 active:scale-135 text-white/50 hover:text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer"
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
                  className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 hover:scale-110 active:scale-[1.18] text-white font-bold transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] shadow-lg shadow-pink-500/25 cursor-pointer text-center"
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
