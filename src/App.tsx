import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Clock,
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
  ChevronUp,
  ChevronDown,
  ExternalLink,
  MapPin,
  Globe,
  Bell,
  Trash2,
  User,
  Palette,
  Beaker,
  AlertCircle,
  Pen,
  Crown,
  Menu,
  Pizza,
  Cpu,
  Layers,
  Download,
  ArrowLeft,
  Puzzle,
  ShoppingBag,
  Pin,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CATEGORIES, Category, Channel, processedChannels } from "./data/channels";
import ChannelPlayer from "./components/ChannelPlayer";

const homeSlides = [
  {
    id: 0,
    titleTop: "Cùng VTV",
    titleMain: "Sống trọn FIFA World Cup 2026",
    titleSub: "",
    genreText: "SỰ KIỆN TRỰC TIẾP ĐẶC BIỆT",
    subSlogan: "SỐNG TRỌN KHOẢNH KHẮC BÓNG ĐÁ",
    thumbnail: "https://wallpapercave.com/wp/wp16426259.webp",
    channelId: "vietnam-wild-live",
    channelPlayName: "VTVgo Event Feed",
    ageRating: "Tất cả",
    ratingText: "Chất lượng HD | Trực tiếp VTVgo",
    vignetteLeft: "from-black/90 via-black/55 to-transparent",
    vignetteBottom: "from-[#211f26] via-[#211f26]/85 to-transparent",
    vignetteTop: "from-black/45 via-transparent to-transparent",
    description: "Theo dõi trọn vẹn 104 trận đấu kịch tính của giải vô địch bóng đá thế giới FIFA World Cup 2026 trực tiếp trên các kênh sóng của Đài Truyền hình Việt Nam.",
    showCountdown: false,
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/VTV2_logo_2013_final.svg",
    logos: [
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/VTV2_logo_2013_final.svg",
      "https://upload.wikimedia.org/wikipedia/commons/4/48/VTV3_logo_2013_final.svg",
      "https://static.wikia.nocookie.net/logos/images/5/58/VTV6_logo_%282026-nay%29_%282%29.png/revision/latest/scale-to-width-down/1000?cb=20260608140603&path-prefix=vi",
      "https://static.wikia.nocookie.net/logos/images/a/a9/VTV7_logo_06.02.2016.png/revision/latest/scale-to-width-down/1000?cb=20221213075109&path-prefix=vi",
      "https://static.wikia.nocookie.net/logos/images/3/35/VTV9_logo_%282013-nay%29.png/revision/latest/scale-to-width-down/1000?cb=20201228131939&path-prefix=vi",
      "https://static.wikia.nocookie.net/logos/images/4/47/VTV10_%282026-nay%29.png/revision/latest/scale-to-width-down/1000?cb=20260422054705&path-prefix=vi"
    ],
    btnText: "Chọn kênh",
    btnIcon: "remote"
  },
  {
    id: 1,
    titleTop: "VTV6",
    titleMain: "Vì một Việt Nam khỏe mạnh!",
    titleSub: "",
    genreText: "THỂ THAO & SỨC KHỎE QUỐC GIA",
    subSlogan: "ĐỒNG HÀNH KHÁT VỌNG, LAN TỎA SỨC TRẺ VIỆT NAM",
    thumbnail: "https://i.ytimg.com/vi/cXv_D6qIy0s/maxresdefault.jpg",
    channelId: "vtv3",
    channelPlayName: "VTV6 - Vì một Việt Nam khỏe mạnh! (FHD)",
    ageRating: "Tất cả",
    ratingText: "Trực tiếp Thể thao | Bản quyền",
    vignetteLeft: "from-black/90 via-black/55 to-transparent",
    vignetteBottom: "from-[#211f26] via-[#211f26]/85 to-transparent",
    vignetteTop: "from-black/45 via-transparent to-transparent",
    logo: "https://static.wikia.nocookie.net/logos/images/5/56/VTV6_logo_07.06.2026.png/revision/latest?cb=20260608073805&path-prefix=uk",
    description: "Các bản tin, chuyên mục, tường thuật về thể thao trong nước và quốc tế do Trung tâm Truyền hình Thể thao sản xuất, với mục tiêu thúc đẩy phong trào thể thao quần chúng, thể thao học đường, thể thao chuyên nghiệp phát triển tại Việt Nam cũng như hướng đến rèn luyện, nâng cao sức khỏe cộng đồng và phát triển toàn diện.",
    btnText: "Xem ngay",
    btnIcon: "play"
  },
  {
    id: 3,
    titleTop: "VIETNAM TODAY",
    titleMain: "Your Window on Vietnam",
    titleSub: "",
    genreText: "ĐỐI NGOẠI & QUỐC TẾ",
    subSlogan: "CỬA SỔ THÔNG TIN RA THẾ GIỚI",
    thumbnail: "https://vtv4.vtv.vn/upload/news/3HOPA0OIS_vntoday1-79180073137201066112112-72441177075135673357555.jpg",
    channelId: "vn_today",
    channelPlayName: "Vietnam Today HD",
    ageRating: "Tất cả",
    ratingText: "Chất lượng HD | Đối ngoại quốc gia",
    vignetteLeft: "from-black/90 via-black/55 to-transparent",
    vignetteBottom: "from-[#211f26] via-[#211f26]/85 to-transparent",
    vignetteTop: "from-black/45 via-transparent to-transparent",
    logo: "https://static.wikia.nocookie.net/logos/images/c/c7/Vietnam_Today_vertical_v2.png/revision/latest?cb=20250813041048&path-prefix=vi",
    description: "Cửa sổ thông tin của Việt Nam ra thế giới, phản ánh khách quan và sinh động các vấn đề thời sự, chính trị, kinh tế, văn hóa, du lịch, môi trường, đổi mới sáng tạo, chuyển đổi số và những giá trị đặc trưng, bản sắc, truyền thống và hiện đại của Việt Nam trong công cuộc phát triển đất nước hội nhập quốc tế.",
    btnText: "Xem ngay",
    btnIcon: "play"
  }
];

export default function App() {
  // Local time state clock
  const [time, setTime] = useState(new Date());
  
  // Immersive Home Slideshow State
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const [autoSlide, setAutoSlide] = useState<boolean>(() => {
    const saved = localStorage.getItem("glass_tv_auto_slide");
    return saved !== null ? saved === "true" : true;
  });

  useEffect(() => {
    localStorage.setItem("glass_tv_auto_slide", autoSlide ? "true" : "false");
  }, [autoSlide]);
  
  // Favorite channel list horizontal scroll reference
  const favScrollRef = useRef<HTMLDivElement>(null);
  const recoScrollRef = useRef<HTMLDivElement>(null);

  const [recoRefreshTrigger, setRecoRefreshTrigger] = useState<number>(0);

  const recommendedChannels = useMemo(() => {
    if (!processedChannels || processedChannels.length === 0) return [];
    const shuffled = [...processedChannels].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 30);
  }, [recoRefreshTrigger]);

  const scrollFavorites = (direction: "left" | "right") => {
    if (favScrollRef.current) {
      const scrollAmount = 300;
      favScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const scrollRecommendations = (direction: "left" | "right") => {
    if (recoScrollRef.current) {
      const scrollAmount = 300;
      recoScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Navigation State
  const [activeTab, setActiveTab] = useState<"home" | "live" | "settings" | "search">("home");
  const [prevTab, setPrevTab] = useState<"home" | "live" | "settings">("home");

  useEffect(() => {
    if (activeTab !== "search") {
      setPrevTab(activeTab as any);
    }
  }, [activeTab]);

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

  // Slide auto rotation effect every 5 seconds if enabled
  useEffect(() => {
    if (activeTab !== "home" || !autoSlide) return;
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % homeSlides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [activeTab, autoSlide]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
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

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<any>(null);
  const triggerToast = (message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimeoutRef.current = null;
    }, 2500);
  };

  const getPluginName = (id: string): string => {
    const names: Record<string, string> = {
      export_stream: "Xuất luồng",
      multiview: "Multiview Grid",
      pip: "Picture in Picture",
      open_native: "Mở luồng gốc",
      quick_switch: "Chuyển kênh nhanh",
      add_custom: "Thêm kênh mới"
    };
    return names[id] || id;
  };

  const [mergeSearchToDock, setMergeSearchToDock] = useState<boolean>(() => {
    return localStorage.getItem("vplay_merge_search_to_dock") === "true";
  });

  useEffect(() => {
    localStorage.setItem("vplay_merge_search_to_dock", String(mergeSearchToDock));
  }, [mergeSearchToDock]);

  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (selectedChannel && selectedChannel.name) {
      setToastMessage(selectedChannel.name);
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [selectedChannel.id]);

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
  const [showVtv5Popup, setShowVtv5Popup] = useState<boolean>(false);
  const [showEventFeedPopup, setShowEventFeedPopup] = useState<boolean>(false);
  const vtv5Options = useMemo(() => {
    const v5 = processedChannels.find(ch => ch.id === "vtv5");
    const v5Tnb = processedChannels.find(ch => ch.id === "vtv5_tnb");
    const v5Tn = processedChannels.find(ch => ch.id === "vtv5_tn");
    
    return [
      { ...(v5 || { id: "vtv5", name: "VTV5", url: "", group: "VTV", logoText: "VTV5", logoBg: "bg-gradient-to-br from-emerald-600 to-emerald-800" }), name: "VTV5 Quốc gia" },
      { ...(v5Tnb || { id: "vtv5_tnb", name: "VTV5 Tây Nam Bộ", url: "", group: "VTV", logoText: "VTV5 TNB", logoBg: "bg-gradient-to-br from-emerald-600 to-emerald-800" }), name: "VTV5 Tây Nam Bộ" },
      { ...(v5Tn || { id: "vtv5_tn", name: "VTV5 Tây Nguyên", url: "", group: "VTV", logoText: "VTV5 TN", logoBg: "bg-gradient-to-br from-emerald-600 to-emerald-800" }), name: "VTV5 Tây Nguyên" }
    ];
  }, []);
  const [isHeaderSearchExpanded, setIsHeaderSearchExpanded] = useState<boolean>(false);
  const headerSearchInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus header search input when expanded
  useEffect(() => {
    if (isHeaderSearchExpanded && headerSearchInputRef.current) {
      setTimeout(() => {
        headerSearchInputRef.current?.focus();
      }, 50);
    }
  }, [isHeaderSearchExpanded]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);
  const [showClock, setShowClock] = useState<boolean>(() => {
    const saved = localStorage.getItem("vplay360_show_clock");
    return saved !== null ? saved === "true" : true;
  });

  const toggleShowClock = () => {
    setShowClock(prev => {
      const next = !prev;
      localStorage.setItem("vplay360_show_clock", String(next));
      return next;
    });
  };

  const exportChannelsToM3u8 = () => {
    let m3u8Content = "#EXTM3U\n";
    allAvailableCategoryList.forEach(category => {
      category.channels.forEach(channel => {
        const tvgId = channel.id;
        const tvgName = channel.name;
        const groupTitle = category.name;
        const logo = channel.logoImg || "";
        m3u8Content += `#EXTINF:-1 tvg-id="${tvgId}" tvg-name="${tvgName}" tvg-logo="${logo}" group-title="${groupTitle}",${channel.name}\n`;
        m3u8Content += `${channel.url}\n`;
      });
    });

    const blob = new Blob([m3u8Content], { type: "application/x-mpegurl;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Vplay_channel.m3u8";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  
  // Custom M3U8 Url link adder
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [showRemoteModal, setShowRemoteModal] = useState<boolean>(false);
  const [remoteInputValue, setRemoteInputValue] = useState<string>("");
  const [showCopiedNotify, setShowCopiedNotify] = useState<boolean>(false);
  const [activeSettingSection, setActiveSettingSection] = useState<string | null>(null);
  const [playbackError, setPlaybackError] = useState<boolean>(false);
  const [playbackErrorType, setPlaybackErrorType] = useState<"standard" | "timeout" | null>(null);
  const notifyTimeoutRef = useRef<any>(null);

  // Multiview states
  const [isMultiviewMode, setIsMultiviewMode] = useState<boolean>(false);
  const [multiviewCount, setMultiviewCount] = useState<number>(4);
  const [multiviewChannels, setMultiviewChannels] = useState<(Channel | null)[]>([]);
  const [showMultiviewSelectorPopup, setShowMultiviewSelectorPopup] = useState<boolean>(false);
  const [showMultiviewChannelPickerPopup, setShowMultiviewChannelPickerPopup] = useState<boolean>(false);
  const [activeMultiviewSlotIndex, setActiveMultiviewSlotIndex] = useState<number | null>(null);
  const [pickerSearchQuery, setPickerSearchQuery] = useState<string>("");

  // Picture in Picture states
  const [isPiPActive, setIsPiPActive] = useState<boolean>(false);

  // Vplay Plugin states
  const [installedPlugins, setInstalledPlugins] = useState<{ [key: string]: "idle" | "installing" | "installed" | "uninstalling" }>(() => {
    const defaultState: { [key: string]: "idle" | "installing" | "installed" | "uninstalling" } = {
      export_stream: "idle",
      multiview: "idle",
      pip: "idle",
      open_native: "idle",
      quick_switch: "idle",
      add_custom: "idle"
    };
    const saved = localStorage.getItem("vplay_installed_plugins");
    if (saved) {
      try {
        return { ...defaultState, ...JSON.parse(saved) };
      } catch (e) {
        return defaultState;
      }
    }
    return defaultState;
  });
  const [pluginProgress, setPluginProgress] = useState<{ [key: string]: number }>({});
  const [showPluginRequiredModal, setShowPluginRequiredModal] = useState<boolean>(false);
  const [pluginToUninstall, setPluginToUninstall] = useState<any | null>(null);
  const [requiredPluginFeatureName, setRequiredPluginFeatureName] = useState<string>("Xuất luồng");
  const [pluginSearchQuery, setPluginSearchQuery] = useState<string>("");
  const [settingsSearchQuery, setSettingsSearchQuery] = useState<string>("");
  const [settingDetailSearchQuery, setSettingDetailSearchQuery] = useState<string>("");
  const [showPinChannelPopup, setShowPinChannelPopup] = useState<boolean>(false);
  const [pinChannelSearchQuery, setPinChannelSearchQuery] = useState<string>("");
  const [pinChannelSelectedCategory, setPinChannelSelectedCategory] = useState<string>("all");

  const [dockItems, setDockItems] = useState<{ id: string; label: string; enabled: boolean }[]>(() => {
    const DEFAULT_DOCK_ITEMS = [
      { id: "home", label: "Trang chủ", enabled: true },
      { id: "live", label: "Trực tiếp", enabled: true },
      { id: "settings", label: "Cài đặt", enabled: true },
      { id: "search", label: "Tìm kiếm", enabled: true },
      { id: "remote", label: "Chuyển kênh", enabled: true },
      { id: "profile", label: "Hồ sơ", enabled: false },
      { id: "plugin_store", label: "Cửa hàng tiện ích", enabled: false },
      { id: "about", label: "Về ứng dụng này", enabled: false },
      { id: "reload", label: "Tải lại ứng dụng", enabled: false },
      { id: "pin", label: "Ghim kênh bất kỳ", enabled: false },
    ];
    const saved = localStorage.getItem("vplay_dock_items");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const merged = [...parsed];
        DEFAULT_DOCK_ITEMS.forEach(defItem => {
          if (!merged.find(item => item.id === defItem.id)) {
            merged.push(defItem);
          }
        });
        return merged;
      } catch (e) {
        // fallback
      }
    }
    return DEFAULT_DOCK_ITEMS;
  });

  useEffect(() => {
    localStorage.setItem("vplay_dock_items", JSON.stringify(dockItems));
  }, [dockItems]);

  useEffect(() => {
    setSettingDetailSearchQuery("");
  }, [activeSettingSection]);

  const moveDockItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...dockItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    
    // Swap
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setDockItems(newItems);
  };

  const toggleDockItem = (id: string) => {
    const item = dockItems.find(it => it.id === id);
    if (!item) return;

    if (item.enabled) {
      // Trying to disable an item.
      const enabledCount = dockItems.filter(it => it.enabled).length;
      if (enabledCount <= 1) {
        alert("Bạn phải giữ lại ít nhất một mục hiển thị trên thanh Dock!");
        return;
      }
      setDockItems(prev => prev.map(it => {
        if (it.id === id) {
          return { ...it, enabled: false };
        }
        return it;
      }));
    } else {
      // Trying to enable an item.
      const currentRenderedCount = dockItems.filter(it => it.enabled && (mergeSearchToDock || it.id !== "search")).length;
      const willBeRendered = mergeSearchToDock || id !== "search";
      
      if (willBeRendered && currentRenderedCount >= 5) {
        triggerToast("Thanh dock chỉ chứa được 5 mục");
        return;
      }

      setDockItems(prev => prev.map(it => {
        if (it.id === id) {
          return { ...it, enabled: true };
        }
        return it;
      }));
    }
  };

  const getDockItemConfig = (id: string) => {
    switch (id) {
      case "home":
        return { icon: Home, label: "Trang chủ", isImg: false };
      case "live":
        return { icon: Compass, label: "Trực tiếp", isImg: false };
      case "settings":
        return { icon: Settings, label: "Cài đặt", isImg: false };
      case "search":
        return { 
          icon: "https://static.wikia.nocookie.net/ftv/images/d/dc/Ass_glass.svg/revision/latest?cb=20260612062405&path-prefix=vi", 
          label: "Tìm kiếm", 
          isImg: true 
        };
      case "profile":
        return { icon: User, label: "Hồ sơ", isImg: false };
      case "remote":
        return { 
          icon: "https://static.wikia.nocookie.net/ep-deo/images/a/a3/Remote.png/revision/latest?cb=20260629015905", 
          label: "Chuyển kênh", 
          isImg: true 
        };
      case "plugin_store":
        return { icon: ShoppingBag, label: "Cửa hàng tiện ích", isImg: false };
      case "about":
        return { icon: Info, label: "Giới thiệu", isImg: false };
      case "reload":
        return { icon: RefreshCw, label: "Tải lại", isImg: false };
      case "pin":
        return { icon: Pin, label: "Ghim kênh", isImg: false };
      default:
        return { icon: HelpCircle, label: "Khác", isImg: false };
    }
  };

  const isDockItemActive = (id: string) => {
    switch (id) {
      case "home":
        return activeTab === "home";
      case "live":
        return activeTab === "live";
      case "settings":
        return activeTab === "settings" && activeSettingSection === null;
      case "search":
        return activeTab === "search";
      case "profile":
        return activeTab === "settings" && activeSettingSection === "profile";
      case "plugin_store":
        return activeTab === "settings" && activeSettingSection === "plugin_store";
      default:
        return false;
    }
  };

  const handleDockItemClick = (id: string) => {
    switch (id) {
      case "home":
        setActiveTab("home");
        break;
      case "live":
        setActiveTab("live");
        break;
      case "settings":
        setActiveTab("settings");
        setActiveSettingSection(null);
        break;
      case "search":
        setPrevTab(activeTab as any);
        setActiveTab("search");
        break;
      case "profile":
        setActiveTab("settings");
        setActiveSettingSection("profile");
        break;
      case "plugin_store":
        setActiveTab("settings");
        setActiveSettingSection("plugin_store");
        break;
      case "remote":
        if (installedPlugins.quick_switch !== "installed") {
          setRequiredPluginFeatureName("Chuyển kênh nhanh");
          setShowPluginRequiredModal(true);
        } else {
          setShowRemoteModal(true);
          setRemoteInputValue("");
        }
        break;
      case "about":
        setShowAboutModal(true);
        break;
      case "reload":
        window.location.reload();
        break;
      case "pin":
        setPinChannelSearchQuery("");
        setPinChannelSelectedCategory("all");
        setShowPinChannelPopup(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    localStorage.setItem("vplay_installed_plugins", JSON.stringify(installedPlugins));
  }, [installedPlugins]);

  // Handle active installation and uninstallation countdowns
  useEffect(() => {
    const activeIds = Object.keys(installedPlugins).filter(
      id => installedPlugins[id] === "installing" || installedPlugins[id] === "uninstalling"
    );
    if (activeIds.length === 0) return;

    const interval = setInterval(() => {
      setInstalledPlugins(prev => {
        const copy = { ...prev };
        let updated = false;

        activeIds.forEach(id => {
          const status = prev[id];
          const maxTime = status === "installing" ? 30 : 10;
          const currentProgress = pluginProgress[id] ?? maxTime;

          if (currentProgress <= 1) {
            const pluginTitle = getPluginName(id);
            if (status === "installing") {
              triggerToast(`Cài đặt thành công gói tiện ích **${pluginTitle}**`);
            } else if (status === "uninstalling") {
              triggerToast(`Gỡ cài đặt thành công gói tiện ích **${pluginTitle}**`);
            }
            copy[id] = status === "installing" ? "installed" : "idle";
            setPluginProgress(p => {
              const cp = { ...p };
              delete cp[id];
              return cp;
            });
            updated = true;
          } else {
            setPluginProgress(p => ({
              ...p,
              [id]: currentProgress - 1
            }));
          }
        });

        if (updated) {
          return copy;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [installedPlugins, pluginProgress]);

  const startInstallPlugin = (id: string) => {
    setInstalledPlugins(prev => ({
      ...prev,
      [id]: "installing"
    }));
    setPluginProgress(prev => ({
      ...prev,
      [id]: 30
    }));
  };

  const startUninstallPlugin = (id: string) => {
    setInstalledPlugins(prev => ({
      ...prev,
      [id]: "uninstalling"
    }));
    setPluginProgress(prev => ({
      ...prev,
      [id]: 10
    }));
  };

  const handleOpenMultiviewSelector = () => {
    setShowMultiviewSelectorPopup(true);
  };

  const handleSelectMultiviewCount = (count: number) => {
    setMultiviewCount(count);
    setIsMultiviewMode(true);
    
    // Initialize multiview channels with existing selectedChannel in slot 0, and null for the rest
    const initialChannels: (Channel | null)[] = Array(count).fill(null);
    if (selectedChannel) {
      initialChannels[0] = selectedChannel;
    }
    setMultiviewChannels(initialChannels);
  };

  const handleOpenChannelPickerForSlot = (index: number) => {
    setActiveMultiviewSlotIndex(index);
    setPickerSearchQuery("");
    setShowMultiviewChannelPickerPopup(true);
  };

  const handleRemoveChannelFromSlot = (index: number) => {
    setMultiviewChannels(prev => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });
  };

  const handleSelectChannelForSlot = (channel: Channel) => {
    if (activeMultiviewSlotIndex !== null) {
      setMultiviewChannels(prev => {
        const copy = [...prev];
        copy[activeMultiviewSlotIndex] = channel;
        return copy;
      });
    }
  };

  const handleTogglePictureInPicture = () => {
    setIsPiPActive(prev => !prev);
  };

  useEffect(() => {
    return () => {
      if (notifyTimeoutRef.current) {
        clearTimeout(notifyTimeoutRef.current);
      }
    };
  }, []);
  const [customChannelName, setCustomChannelName] = useState<string>("");
  const [customChannelUrl, setCustomChannelUrl] = useState<string>("");
  const [customChannelGroup, setCustomChannelGroup] = useState<string>("VTV");
  const [customGroupInput, setCustomGroupInput] = useState<string>("Nhóm Kênh Mới");
  const [customChannels, setCustomChannels] = useState<Channel[]>(() => {
    const saved = localStorage.getItem("glass_tv_custom_list");
    return saved ? JSON.parse(saved) : [];
  });

  // Ambient lights themes configuration (default: sunset)
  const [bgColor, setBgColor] = useState<"cosmic" | "deep" | "aurora" | "sunset">("sunset");
  const [amoledDark, setAmoledDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("glass_tv_amoled_dark");
    return saved !== null ? saved === "true" : true;
  });

  useEffect(() => {
    localStorage.setItem("glass_tv_amoled_dark", amoledDark ? "true" : "false");
  }, [amoledDark]);

  // Experimental states
  const [expLowLatency, setExpLowLatency] = useState<boolean>(() => localStorage.getItem("vplay_exp_lowlatency") === "true");
  const [expCache, setExpCache] = useState<boolean>(() => localStorage.getItem("vplay_exp_cache") === "true");
  const [expAmbientGlow, setExpAmbientGlow] = useState<boolean>(() => localStorage.getItem("vplay_exp_glow") === "true");
  const [testStreamUrl, setTestStreamUrl] = useState<string>("");

  // Design System Demo states
  const [demoToggleState, setDemoToggleState] = useState<boolean>(false);
  const [activeDockDemoTab, setActiveDockDemoTab] = useState<string>("home");
  const [demoSliderVal, setDemoSliderVal] = useState<number>(0.45);
  const [showDemoDesignSystemModal, setShowDemoDesignSystemModal] = useState<boolean>(false);
  const [designSystemThemeColor, setDesignSystemThemeColor] = useState<string>("#ff9502");
  const [demoCheckboxState, setDemoCheckboxState] = useState<boolean>(false);
  const [demoInputText, setDemoInputText] = useState<string>("Vplay Refresh");
  const [demoTooltipVisible, setDemoTooltipVisible] = useState<boolean>(false);
  const [demoSnackbarVisible, setDemoSnackbarVisible] = useState<boolean>(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("vplay_exp_lowlatency", String(expLowLatency));
  }, [expLowLatency]);

  useEffect(() => {
    localStorage.setItem("vplay_exp_cache", String(expCache));
  }, [expCache]);

  useEffect(() => {
    localStorage.setItem("vplay_exp_glow", String(expAmbientGlow));
  }, [expAmbientGlow]);

  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const target = new Date("2026-06-30T00:00:00").getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const secs = Math.floor(diff / 1000);
      const mins = Math.floor(secs / 60);
      const hours = Math.floor(mins / 60);
      const days = Math.floor(hours / 24);

      setCountdown({
        days: String(days).padStart(2, '0'),
        hours: String(hours % 24).padStart(2, '0'),
        minutes: String(mins % 60).padStart(2, '0'),
        seconds: String(secs % 60).padStart(2, '0')
      });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter & Search logic
  // Join general channels and custom channels
  const allAvailableCategoryList = useMemo(() => {
    if (customChannels.length === 0) return CATEGORIES;
    
    // Find the max channel number among regular channels to continue the sequence
    const regularChannels = CATEGORIES.flatMap(cat => cat.channels);
    const wildLive = regularChannels.find(ch => ch.id === "vietnam-wild-live");
    const lastNum = wildLive && wildLive.channelNumber ? parseInt(wildLive.channelNumber, 10) : regularChannels.length;

    const formattedCustomChannels = customChannels.map((ch, idx) => {
      const customNum = String(lastNum + 1 + idx).padStart(3, '0');
      return {
        ...ch,
        channelNumber: customNum
      };
    });

    // Add custom category dynamically if there are custom channels
    const customCategory: Category = {
      id: "custom",
      name: "Kênh Tự Thêm (Cá Nhân)",
      description: "Danh sách luồng phát m3u8 tự liên kết",
      channels: formattedCustomChannels
    };
    return [...CATEGORIES, customCategory];
  }, [customChannels]);

  // Flattened channel list for easy global lookup/search
  const flattenedChannels = useMemo(() => {
    return allAvailableCategoryList.flatMap(cat => cat.channels);
  }, [allAvailableCategoryList]);

  const filteredCategoriesForPicker = useMemo(() => {
    if (!pickerSearchQuery.trim()) return allAvailableCategoryList;
    const query = pickerSearchQuery.toLowerCase();
    return allAvailableCategoryList.map((cat) => ({
      ...cat,
      channels: cat.channels.filter((ch) =>
        ch.name.toLowerCase().includes(query) || (ch.logoText && ch.logoText.toLowerCase().includes(query))
      ),
    }));
  }, [allAvailableCategoryList, pickerSearchQuery]);

  const getGridColsClass = (count: number) => {
    if (count <= 2) return "grid-cols-1 md:grid-cols-2";
    if (count <= 3) return "grid-cols-1 md:grid-cols-3";
    if (count <= 4) return "grid-cols-2";
    if (count <= 6) return "grid-cols-2 md:grid-cols-3";
    return "grid-cols-2 lg:grid-cols-4"; // 7, 8, 9
  };

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
  const handleSelectChannel = (channel: Channel, bypassVtv5Check = false) => {
    if (channel.id === "vtv5" && !bypassVtv5Check) {
      setShowVtv5Popup(true);
      return;
    }
    if (channel.id === "vietnam-wild-live") {
      setShowEventFeedPopup(true);
    }
    setSelectedChannel(channel);
    setPlaybackError(false);
    setPlaybackErrorType(null);
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

    const finalGroup = customChannelGroup === "NEW_GROUP" 
      ? (customGroupInput.trim() || "Kênh Riêng") 
      : customChannelGroup;

    const newChannel: Channel = {
      id: `custom-${Date.now()}`,
      name: customChannelName,
      url: customChannelUrl.trim(),
      group: finalGroup,
      logoText: customChannelName.slice(0, 3).toUpperCase(),
      logoBg: "bg-gradient-to-br from-indigo-600 to-fuchsia-700"
    };

    setCustomChannels(prev => [newChannel, ...prev]);
    setSelectedChannel(newChannel);
    setCustomChannelName("");
    setCustomChannelUrl("");
    setCustomGroupInput("Nhóm Kênh Mới");
    setCustomChannelGroup("VTV");
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

  // Share stream link to clipboard
  const handleShareChannel = () => {
    if (!selectedChannel) return;
    
    navigator.clipboard.writeText(selectedChannel.url).then(() => {
      setShowCopiedNotify(true);
      if (notifyTimeoutRef.current) {
        clearTimeout(notifyTimeoutRef.current);
      }
      notifyTimeoutRef.current = setTimeout(() => {
        setShowCopiedNotify(false);
      }, 3000);
    }).catch((err) => {
      console.error("Could not copy stream link: ", err);
    });
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
    if (amoledDark) {
      return "bg-[#211f26]";
    }
    switch (bgColor) {
      case "cosmic":
        return "bg-gradient-to-tr from-[#211f26] via-[#2c2933] to-[#1a181f]";
      case "deep":
        return "bg-gradient-to-br from-[#211f26] via-[#1c1b21] to-[#121114]";
      case "aurora":
        return "bg-gradient-to-tr from-[#211f26] via-[#1e2421] to-[#2b2126]";
      case "sunset":
        return "bg-gradient-to-tr from-[#211f26] via-[#33212c] to-[#2e261f]";
    }
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[99999]">
        <svg className="animate-spin h-14 w-14 text-white" viewBox="0 0 50 50">
          <circle
            className="opacity-100"
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="40 150"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`min-h-screen text-white/95 pb-32 transition-colors duration-1000 overflow-x-clip ${getBgGradient()}`}>
      
      {/* Decorative ambient glowing circles */}
      {!amoledDark && (
        <>
          <div className="absolute top-24 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[130px] pointer-events-none"></div>
          <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none"></div>
        </>
      )}

      {/* TV360 STYLE CINEMATIC HEADER (Floating on Top - Displays on ALL tabs) */}
      {(activeTab !== "settings" || activeSettingSection === null) && (
        <header className="fixed top-0 inset-x-0 h-24 z-50 px-4 sm:px-8 md:px-12 flex items-center justify-between pointer-events-auto select-none transition-all duration-150">
          {/* Progressive background blurs backplate - Only visible when scrolled down or when not on home tab */}
          {activeTab === "live" || activeTab === "search" ? (
            <div className={`absolute inset-0 ${amoledDark ? "bg-[#211f26]" : "bg-[#211f26]"} z-0 pointer-events-none border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.3)] opacity-100 visible`} />
          ) : (
            <div className={`progressive-blur-header z-0 pointer-events-none border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.3)] ${
              isScrolled || activeTab !== "home" ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            }`} />
          )}

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

            {/* Real-time Ticking Digital Clock */}
            {showClock && (
              <div className="flex items-center gap-2 sm:gap-3 bg-white/5 border border-white/10 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-md shadow-inner select-none transition-all duration-300 hover:scale-105 font-google">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse animate-duration-1000" />
                <span className="text-xs sm:text-sm md:text-base font-bold tracking-wide text-white font-google drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                  {formatTime(time)}
                </span>
                <span className="hidden md:inline-block text-white text-xs sm:text-sm md:text-base font-bold pl-2.5 border-l border-white/10 font-google">
                  {formatDateVietnamese(time)}
                </span>
              </div>
            )}
          </div>

          {/* Right Side: notifications and profile card and Menu Dropdown */}
          <div className="relative z-10 flex items-center gap-3 sm:gap-4 md:gap-5">
            {/* Plugin Store Bag Icon */}
            <button 
              onClick={() => {
                setActiveTab("settings");
                setActiveSettingSection("plugin_store");
              }}
              title="Cửa hàng tiện ích"
              className="relative p-1.5 rounded-full hover:bg-white/10 text-white/85 hover:text-white transition-all cursor-pointer bouncy-btn"
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

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

            {/* Top Menu Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setShowDropdownMenu(prev => !prev)}
                className="p-1.5 sm:p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white/85 hover:text-white transition-all cursor-pointer flex items-center justify-center active:scale-95 duration-200"
                title="Menu"
              >
                <Menu className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </button>
              
              <AnimatePresence>
                {showDropdownMenu && (
                  <>
                    {/* Invisible Backdrop for click-away */}
                    <div className="fixed inset-0 z-40 cursor-default" onClick={() => setShowDropdownMenu(false)} />
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      style={{ originX: 1, originY: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 mt-3 w-56 rounded-[30px] bg-white/70 backdrop-blur-[15px] border border-white/40 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.35),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.1),0_12px_40px_rgba(0,0,0,0.1)] z-50 py-3.5 text-black overflow-hidden"
                    >
                      {/* Clock & Calendar toggle with checkmark */}
                      <button
                        onClick={() => {
                          toggleShowClock();
                        }}
                        className="w-full px-5 py-2.5 text-left text-[13px] hover:bg-black/5 flex items-center justify-between font-sans font-normal text-black"
                      >
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2.5 text-black/70 stroke-[2]" />
                          <span>Đồng hồ và Lịch</span>
                        </div>
                        {showClock && <Check className="w-4 h-4 text-black stroke-[3.5]" />}
                      </button>

                      {/* Xuất luồng kênh (Only visible on Live tab) */}
                      {activeTab === "live" && (
                        <button
                          onClick={() => {
                            setShowDropdownMenu(false);
                            if (installedPlugins.export_stream !== "installed") {
                              setRequiredPluginFeatureName("Xuất luồng");
                              setShowPluginRequiredModal(true);
                            } else {
                              exportChannelsToM3u8();
                            }
                          }}
                          className="w-full px-5 py-2.5 text-left text-[13px] hover:bg-black/5 flex items-center text-black font-sans font-normal border-t border-black/5"
                        >
                          <Download className="w-4 h-4 mr-2.5 text-black/70 stroke-[2]" />
                          Xuất luồng kênh
                        </button>
                      )}

                      {/* Multiview & Picture-in-Picture (Only visible on Live tab) */}
                      {activeTab === "live" && (
                        <>
                          <button
                            onClick={() => {
                              setShowDropdownMenu(false);
                              if (installedPlugins.multiview !== "installed") {
                                setRequiredPluginFeatureName("Multiview");
                                setShowPluginRequiredModal(true);
                              } else {
                                handleOpenMultiviewSelector();
                              }
                            }}
                            className="w-full px-5 py-2.5 text-left text-[13px] hover:bg-black/5 flex items-center text-black font-sans font-normal border-t border-black/5"
                          >
                            <Grid className="w-4 h-4 mr-2.5 text-black/70 stroke-[2]" />
                            Xem Multiview
                          </button>
                          <button
                            onClick={() => {
                              setShowDropdownMenu(false);
                              if (installedPlugins.pip !== "installed") {
                                setRequiredPluginFeatureName("Picture in Picture");
                                setShowPluginRequiredModal(true);
                              } else {
                                handleTogglePictureInPicture();
                              }
                            }}
                            className="w-full px-5 py-2.5 text-left text-[13px] hover:bg-black/5 flex items-center text-black font-sans font-normal border-t border-black/5"
                          >
                            <Layers className="w-4 h-4 mr-2.5 text-black/70 stroke-[2]" />
                            Picture in Picture
                          </button>
                        </>
                      )}
 
                      {/* Divider */}
                      <div className="border-t border-black/10 my-2" />
 
                      {/* About this version */}
                      <button
                        onClick={() => {
                          setShowDropdownMenu(false);
                          setShowAboutModal(true);
                        }}
                        className="w-full px-5 py-2.5 text-left text-[13px] hover:bg-black/5 flex items-center text-black font-sans font-normal"
                      >
                        <Info className="w-4 h-4 mr-2.5 text-black/70 stroke-[2]" />
                        Về phiên bản này
                      </button>
 
                      {/* Reload app */}
                      <button
                        onClick={() => {
                          setShowDropdownMenu(false);
                          window.location.reload();
                        }}
                        className="w-full px-5 py-2.5 text-left text-[13px] hover:bg-black/5 flex items-center text-black font-sans font-normal"
                      >
                        <RefreshCw className="w-4 h-4 mr-2.5 text-black/70 stroke-[2]" />
                        Tải lại ứng dụng
                      </button>

                      {/* Thử nghiệm */}
                      <button
                        onClick={() => {
                          setShowDropdownMenu(false);
                          setActiveTab("settings");
                          setActiveSettingSection("experimental");
                        }}
                        className="w-full px-5 py-2.5 text-left text-[13px] hover:bg-black/5 flex items-center text-black font-sans font-normal"
                      >
                        <Pizza className="w-4 h-4 mr-2.5 text-black/70 stroke-[2]" />
                        Thử nghiệm
                      </button>
 
                      {/* Open Settings */}
                      <button
                        onClick={() => {
                          setShowDropdownMenu(false);
                          setActiveTab("settings");
                          setActiveSettingSection(null);
                        }}
                        className="w-full px-5 py-2.5 text-left text-[13px] hover:bg-black/5 flex items-center text-black font-sans font-normal"
                      >
                        <Settings className="w-4 h-4 mr-2.5 text-black/70 stroke-[2]" />
                        Mở cài đặt
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>
      )}

      {/* SETTINGS DETAILS HEADER (Floating on Top - Exclusively inside settings sub-sections) */}
      {activeTab === "settings" && activeSettingSection !== null && (
        <header className="fixed top-0 inset-x-0 h-24 z-50 px-4 sm:px-8 md:px-12 flex items-center justify-between pointer-events-auto select-none">
          {/* Progressive background blurs backplate */}
          <div className="progressive-blur-header z-0 pointer-events-none border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.3)] opacity-100 visible" />

          <div className="relative z-10 flex items-center gap-4">
            <button
              onClick={() => setActiveSettingSection(null)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/95 hover:text-white border border-white/20 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.65),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.3)] cursor-pointer bouncy-btn"
              title="Quay lại"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <span className="text-white font-semibold text-base sm:text-lg tracking-tight">
              {activeSettingSection === "appearance" && "Giao diện"}
              {activeSettingSection === "profile" && "Tài khoản & Dữ liệu"}
              {activeSettingSection === "accessibility" && "Trợ năng"}
              {activeSettingSection === "broadcast" && "Phát sóng"}
              {activeSettingSection === "experimental" && "Thử nghiệm & Tính năng mới"}
              {activeSettingSection === "design_system" && "Design components"}
              {activeSettingSection === "plugin_store" && "Cửa hàng tiện ích"}
            </span>
          </div>
        </header>
      )}

      {/* Main Container */}
      <main id="player-anchor" className={activeTab === "home" ? "w-full pt-0 z-10 relative" : "w-full max-w-7xl mx-auto px-4 pt-24 lg:pt-28 pb-8 z-10 relative"}>

        {/* VIEW: LIVE TV BROADCASTING (PRIMARY GRAPHICS) */}
        {(activeTab === "live" || activeTab === "search") && (
          <>
            {/* Sticky Player, Action Buttons & Category Filters on Mobile */}
            <div className={`sticky top-24 lg:relative lg:top-auto z-40 ${
              amoledDark ? "bg-[#211f26]" : "bg-[#211f26]"
            } lg:bg-transparent lg:backdrop-blur-none -mx-4 px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 border-b lg:border-none border-white/5 shadow-[0_15px_30px_rgba(0,0,0,0.4)] lg:shadow-none pt-2 pb-2 lg:pb-0 animate-duration-300`}>
              {/* Solid background on mobile, no progressive-blur-header to ensure content does not peak through */}

              <div className="relative z-10">
                {/* Integrated Main Channel Video Player */}
                {isPiPActive ? (
                  <div className="w-full max-w-5xl mx-auto aspect-video rounded-3xl bg-[#120e24]/40 border border-white/10 flex flex-col items-center justify-center text-white/60 p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
                    <div className="absolute inset-0 bg-cover bg-center opacity-10 filter blur-xl" style={{ backgroundImage: `url(${selectedChannel.logoImg || ""})` }} />
                    <Tv className="w-12 h-12 mb-4 text-indigo-400 animate-pulse" />
                    <p className="text-sm font-semibold text-white/90 mb-1">Đang phát ở chế độ Picture in Picture</p>
                    <p className="text-xs text-white/50 mb-4 font-mono">{selectedChannel.name}</p>
                    <button
                      onClick={() => setIsPiPActive(false)}
                      className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all bouncy-btn shadow-lg cursor-pointer"
                    >
                      Quay lại trình phát chính
                    </button>
                  </div>
                ) : isMultiviewMode ? (
                  <div className="w-full max-w-5xl mx-auto aspect-video rounded-3xl bg-[#211f26]/40 border border-white/10 p-2 sm:p-4 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                    {/* Multiview top info and action bar */}
                    <div className="flex items-center justify-between mb-3 text-white">
                      <div className="flex items-center gap-2">
                        <Grid className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs sm:text-sm font-medium">Chế độ xem Multiview ({multiviewCount} khung)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowMultiviewSelectorPopup(true)}
                          className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[11px] font-normal transition-colors cursor-pointer"
                        >
                          Đổi số khung
                        </button>
                        <button
                          onClick={() => {
                            setIsMultiviewMode(false);
                            setMultiviewChannels([]);
                          }}
                          className="px-3 py-1.5 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 text-[11px] font-normal border border-red-500/30 transition-colors cursor-pointer"
                        >
                          Thoát Multiview
                        </button>
                      </div>
                    </div>

                    {/* Multiview Grid */}
                    <div className={`grid ${getGridColsClass(multiviewCount)} gap-2 flex-1 h-full min-h-0`}>
                      {Array.from({ length: multiviewCount }).map((_, idx) => {
                        const ch = multiviewChannels[idx];
                        return (
                          <div
                            key={idx}
                            className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/5 flex flex-col items-center justify-center group"
                          >
                            {ch ? (
                              <div className="w-full h-full relative">
                                <div className="absolute top-2 left-2 z-30 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white/90 truncate max-w-[60%] font-mono">
                                  Khung {idx + 1}: {ch.name}
                                </div>
                                <div className="absolute top-2 right-2 z-30 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpenChannelPickerForSlot(idx);
                                    }}
                                    className="p-1 bg-black/70 hover:bg-black/95 text-white rounded text-[10px]"
                                    title="Đổi kênh"
                                  >
                                    <RefreshCw className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveChannelFromSlot(idx);
                                    }}
                                    className="p-1 bg-red-600 hover:bg-red-700 text-white rounded text-[10px]"
                                    title="Xóa kênh"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                                <ChannelPlayer
                                  channel={ch}
                                  volume={volume}
                                  onVolumeChange={setVolume}
                                  muted={idx === 0 ? muted : true}
                                  onMutedChange={setMuted}
                                />
                              </div>
                            ) : (
                              <button
                                onClick={() => handleOpenChannelPickerForSlot(idx)}
                                className="w-full h-full flex flex-col items-center justify-center gap-2 text-white/50 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-200 cursor-pointer p-4 select-none"
                              >
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                  <Plus className="w-5 h-5 text-white/60 group-hover:text-white" />
                                </div>
                                <span className="text-xs font-normal">Khung {idx + 1} trống</span>
                                <span className="text-[10px] text-white/40">Bấm để chọn kênh</span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
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
                    onPlaybackError={(err, isTimeout) => {
                      setPlaybackError(err);
                      if (err) {
                        setPlaybackErrorType(isTimeout ? "timeout" : "standard");
                      } else {
                        setPlaybackErrorType(null);
                      }
                    }}
                  />
                )}

                {/* Live tab Actions Button Bar - Placed perfectly under the channel player exactly as requested */}
                <div className="w-full max-w-5xl mx-auto mt-3 sm:mt-5 flex items-center justify-center gap-2 sm:gap-3 z-10 relative px-2">
                  {/* Share button */}
                  <button
                    onClick={handleShareChannel}
                    className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white flex items-center gap-1 sm:gap-1.5 shrink-0 shadow-lg cursor-default bouncy-btn text-[10.5px] sm:text-xs font-normal"
                    title="Chia sẻ kênh này"
                  >
                    <img 
                      src="https://static.wikia.nocookie.net/ep-deo/images/1/10/Share.png/revision/latest?cb=20260625011333" 
                      className="w-3 sm:w-3.5 h-3 sm:h-3.5 brightness-0 invert opacity-90 object-contain" 
                      referrerPolicy="no-referrer"
                      alt="Share"
                    />
                    <span>Chia sẻ</span>
                  </button>

                  {/* TV button */}
                  <a
                    href={installedPlugins.open_native === "installed" ? selectedChannel?.url : "#"}
                    target={installedPlugins.open_native === "installed" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (installedPlugins.open_native !== "installed") {
                        e.preventDefault();
                        setRequiredPluginFeatureName("Mở luồng gốc");
                        setShowPluginRequiredModal(true);
                      }
                    }}
                    className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white flex items-center gap-1 sm:gap-1.5 shrink-0 shadow-lg cursor-default bouncy-btn animate-fade-in text-[10.5px] sm:text-xs font-normal"
                    title="Mở luồng phát gốc"
                  >
                    <Tv className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white opacity-90" />
                    <span>Mở luồng gốc</span>
                  </a>

                  {/* Add custom channel button */}
                  <button
                    onClick={() => {
                      if (installedPlugins.add_custom !== "installed") {
                        setRequiredPluginFeatureName("Thêm kênh mới");
                        setShowPluginRequiredModal(true);
                      } else {
                        setShowCustomModal(true);
                      }
                    }}
                    className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#ff9502] hover:bg-[#ffa31a] active:bg-[#e08300] text-white border-none text-[10.5px] sm:text-xs font-normal flex items-center gap-1 sm:gap-1.5 shrink-0 shadow-lg shadow-orange-500/15 cursor-default bouncy-btn"
                    title="Thêm link m3u8 của riêng bạn"
                  >
                    <Plus className="w-3 sm:w-3.5 h-3 sm:h-3.5 transition-transform duration-300 hover:rotate-90" />
                    <span>Thêm kênh</span>
                  </button>
                </div>

                {/* Glass Category Filter row - Nested inside sticky container so it stays hard locked on mobile */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-3 mb-1 lg:mb-6 lg:pb-4 lg:mt-4 border-b lg:border-none border-white/5 scrollbar-none">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-normal whitespace-nowrap cursor-default bouncy-btn ${
                      selectedCategory === "all" ? "glass-pill-active" : "glass-pill text-white/60 hover:text-white"
                    }`}
                  >
                    Tất cả ({flattenedChannels.length})
                  </button>
                  
                  {allAvailableCategoryList.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-normal whitespace-nowrap cursor-default bouncy-btn ${
                        selectedCategory === cat.id ? "glass-pill-active" : "glass-pill text-white/60 hover:text-white"
                      }`}
                    >
                      {cat.name} ({cat.channels.length})
                    </button>
                  ))}
                </div>
              </div>
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
                          category.id === 'dac-biet' ? 'bg-emerald-500 animate-pulse' :
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
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
                      {category.channels.map((ch) => {
                        const isPlaying = selectedChannel.id === ch.id;
                        const isDacBiet = ch.group === "Đặc biệt";

                        return (
                          <div
                            key={ch.id}
                            id={`card-${ch.id}`}
                            onClick={() => handleSelectChannel(ch)}
                            className={`group relative rounded-xl p-0.5 sm:p-1 cursor-pointer flex items-center justify-center h-[72px] xs:h-[88px] sm:h-[112px] md:h-[128px] select-none ${
                              isPlaying 
                                ? isDacBiet
                                  ? "bg-amber-400/10 backdrop-blur-lg border-[3.5px] border-amber-400"
                                  : "bg-white/20 backdrop-blur-lg border-[3.5px] border-white shadow-md shadow-pink-500/10" 
                                : isDacBiet
                                  ? "bg-amber-500/5 backdrop-blur-md border-2 border-white/10 hover:border-[3.5px] hover:border-amber-400"
                                  : "bg-white/5 backdrop-blur-md border-2 border-white/10 hover:border-[3.5px] hover:border-white"
                            }`}
                            title={ch.name}
                          >
                            {/* Logo Graphic Container - with vertical split for channel position number */}
                            <div className="w-full h-full flex items-center select-none overflow-hidden rounded-lg">
                              {/* Left Part: Channel Number */}
                              <div className="w-[28%] sm:w-[26%] h-full flex items-center justify-center text-white/80 text-[11px] xs:text-[13px] sm:text-base md:text-lg font-bold tracking-tight font-sans">
                                {ch.channelNumber || "000"}
                              </div>
                              {/* Vertical Divider */}
                              <div className="w-[1px] h-[45%] sm:h-[55%] bg-white/15 flex-shrink-0" />
                              {/* Right Part: Logo Container */}
                              <div className="flex-1 h-full flex justify-center items-center overflow-hidden p-0.5 sm:p-1">
                                {ch.logoImg ? (
                                  <img
                                    src={ch.logoImg}
                                    alt={ch.name}
                                    referrerPolicy="no-referrer"
                                    className={`object-contain filter drop-shadow-md select-none pointer-events-none ${
                                      ch.id === "vietnam-wild-live" ? "w-[115%] h-[115%]" : ch.id.startsWith("vinh_long") ? "w-[88%] h-[88%]" : ch.group === "SCTV" ? "w-[82%] h-[82%]" : ch.group === "VTVcab" ? "w-[94%] h-[94%]" : "w-[125%] h-[125%] sm:w-[135%] sm:h-[135%]"
                                    }`}
                                  />
                                ) : (
                                  <div className={`w-full h-full flex items-center justify-center rounded-lg ${ch.logoBg} shadow-inner border border-white/10 font-bold text-white text-[9px] sm:text-xs tracking-wider text-center px-1`}>
                                     {ch.logoText}
                                  </div>
                                )}
                              </div>
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
          <div className="w-full animate-fade-in space-y-0 bg-[#211f26]/60 min-h-screen relative pt-0">
            
            {/* TRULY IMMERSIVE HERO BIG BANNER (TV360 STYLE - 100% SCREEN-WIDE BLEED WITH NO ROUNDED CORNERS) */}
            <div className="relative w-full overflow-hidden bg-black min-h-[520px] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[820px] flex items-end pb-6 sm:pb-8 md:pb-10 lg:pb-12 group/hero">
              
              {/* Background cover image representing selected slide */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={homeSlides[currentSlide].thumbnail} 
                      alt={homeSlides[currentSlide].titleMain} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center md:object-right scale-102"
                    />
                    
                    {/* Advanced Multi-Layer Vignette Overlays that match the thumbnail color dynamically */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${homeSlides[currentSlide].vignetteLeft} z-10`} />
                    {/* Removed vignetteBottom shadow to create seamless blending with the content below */}
                    <div className={`absolute inset-x-0 top-0 h-44 bg-gradient-to-b ${homeSlides[currentSlide].vignetteTop} z-10`} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Foreground content details on left - nested in desktop alignment grid */}
              <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex flex-col items-start gap-1 justify-end h-full pt-28 sm:pt-36 md:pt-40">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ x: 120, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -120, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-start gap-1 w-full"
                  >
                    {/* Calligraphy logo and title text stylistics with Montserrat font */}
                    <div className="flex flex-col select-none mb-3 font-montserrat gap-0">
                      <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-zinc-300 drop-shadow-[0_4px_15px_rgba(0,0,0,0.95)] font-montserrat block pb-3 px-1">
                        {homeSlides[currentSlide].titleTop}
                      </div>
                      <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-normal text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-400 drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] block font-montserrat pb-4 px-1 -mt-4 xs:-mt-5 sm:-mt-6 md:-mt-8">
                        {homeSlides[currentSlide].titleMain}
                      </div>
                      {homeSlides[currentSlide].titleSub && (
                        <div className="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-white drop-shadow tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-teal-300 font-montserrat pb-2 px-1 -mt-2 sm:-mt-3">
                          {homeSlides[currentSlide].titleSub}
                        </div>
                      )}
                    </div>

                    {/* Special Channel Logo instead of slogans */}
                    {homeSlides[currentSlide].logos ? (
                      <div className="mt-1 mb-2 select-none pointer-events-none flex flex-col gap-2">
                        {/* Row 1 */}
                        <div className="flex items-center gap-3">
                          {homeSlides[currentSlide].logos.slice(0, 3).map((logoUrl, lIdx) => (
                            <img 
                              key={lIdx}
                              src={logoUrl} 
                              alt="Channel Logo" 
                              referrerPolicy="no-referrer"
                              className="h-10 sm:h-14 md:h-16 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
                            />
                          ))}
                        </div>
                        {/* Row 2 */}
                        {homeSlides[currentSlide].logos.length > 3 && (
                          <div className="flex items-center gap-3">
                            {homeSlides[currentSlide].logos.slice(3).map((logoUrl, lIdx) => (
                              <img 
                                key={lIdx + 3}
                                src={logoUrl} 
                                alt="Channel Logo" 
                                referrerPolicy="no-referrer"
                                className="h-10 sm:h-14 md:h-16 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : homeSlides[currentSlide].logo ? (
                      <div className="mt-1 mb-2 select-none pointer-events-none">
                        <img 
                          src={homeSlides[currentSlide].logo} 
                          alt="Channel Logo" 
                          referrerPolicy="no-referrer"
                          className="h-10 sm:h-14 md:h-16 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
                        />
                      </div>
                    ) : null}

                    {homeSlides[currentSlide].description && (
                      <p className="text-white/80 text-xs sm:text-sm max-w-2xl mt-4 leading-relaxed drop-shadow select-none">
                        {homeSlides[currentSlide].description}
                      </p>
                    )}

                    {homeSlides[currentSlide].showCountdown && (
                      <div className="flex flex-col gap-1.5 mt-4 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl select-none max-w-xs shadow-lg">
                        <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Thời gian còn lại của sự kiện</span>
                        <div className="flex items-center gap-1.5 font-mono text-base sm:text-lg font-extrabold text-teal-400">
                          <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-lg shadow-inner">{countdown.days}d</span>
                          <span className="text-white/40">:</span>
                          <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-lg shadow-inner">{countdown.hours}h</span>
                          <span className="text-white/40">:</span>
                          <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-lg shadow-inner">{countdown.minutes}m</span>
                          <span className="text-white/40">:</span>
                          <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-lg shadow-inner">{countdown.seconds}s</span>
                        </div>
                      </div>
                    )}

                    {/* Film attributes tags metadata */}
                    <div className="flex items-center gap-1.5 sm:gap-2.5 mt-3 text-[10px] xs:text-xs sm:text-sm font-semibold text-white/90 select-none drop-shadow">
                      <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-black text-[9px] uppercase tracking-wider shadow shadow-red-500/25">
                        {homeSlides[currentSlide].ageRating}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span>{homeSlides[currentSlide].ratingText}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Elegant big glass play buttons */}
                <div className="flex items-center gap-3 mt-6 sm:mt-8">
                  <button 
                    onClick={() => {
                      const slideObj = homeSlides[currentSlide];
                      if (slideObj.channelId === "vietnam-wild-live") {
                        setShowEventFeedPopup(true);
                        return;
                      }
                      const targetCh = CATEGORIES.flatMap(cat => cat.channels).find(ch => ch.id === slideObj.channelId) || CATEGORIES[0].channels[0];
                      if (targetCh) {
                        handleSelectChannel({
                          ...targetCh,
                          name: slideObj.channelPlayName,
                        });
                      }
                      setActiveTab("live");
                    }}
                    className="px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-[#d0bcff] hover:bg-[#c2a8f9] active:bg-[#b093f4] text-[#381e72] font-bold shadow-xl flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer border border-white/10 bouncy-btn"
                  >
                    {homeSlides[currentSlide].btnIcon === "compass" ? (
                      <Compass className="w-7 h-7 sm:w-8 sm:h-8 text-[#381e72]" />
                    ) : homeSlides[currentSlide].btnIcon === "remote" ? (
                      <img 
                        src="https://static.wikia.nocookie.net/ep-deo/images/a/a3/Remote.png/revision/latest?cb=20260629015905"
                        alt="Remote"
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                        style={{ filter: "brightness(0) saturate(100%) invert(10%) sepia(95%) saturate(3474%) hue-rotate(235deg) brightness(83%) contrast(142%)" }}
                      />
                    ) : (
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-[#381e72] text-[#381e72]" />
                    )}
                    {homeSlides[currentSlide].btnText || "Thử ngay"}
                  </button>

                  {/* Slider indicator arrows and paging inside the banner */}
                  <div className="flex items-center gap-1.5 ml-2">
                    <button 
                      onClick={() => setCurrentSlide(prev => (prev - 1 + homeSlides.length) % homeSlides.length)}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer flex items-center justify-center border border-white/20 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.65),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.3)] bouncy-btn"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setCurrentSlide(prev => (prev + 1) % homeSlides.length)}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer flex items-center justify-center border border-white/20 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.65),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.3)] bouncy-btn"
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

            {/* ROW: "GỢI Ý CHO BẠN" CAROUSEL SLIDER (ADDED ABOVE KÊNH YÊU THÍCH AS REQUESTED) */}
            {recommendedChannels.length > 0 && (
              <div className="space-y-4 relative group/reco-carousel animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 rounded bg-blue-500" />
                    <h3 className="text-sm sm:text-base font-bold tracking-tight text-white/95 font-google">Gợi ý cho bạn</h3>
                    <span className="text-xs text-blue-400/80 font-mono mt-1">({recommendedChannels.length})</span>
                  </div>

                  {/* Navigation Arrows for Carousel */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setRecoRefreshTrigger(prev => prev + 1)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer flex items-center justify-center border border-white/20 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.65),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.3)] mr-1 group/refresh-btn bouncy-btn"
                      title="Làm mới gợi ý"
                    >
                      <RefreshCw className="w-3.5 h-3.5 group-hover/refresh-btn:rotate-180 transition-transform duration-500" />
                    </button>
                    <button 
                      onClick={() => scrollRecommendations("left")}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer flex items-center justify-center border border-white/20 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.65),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.3)] bouncy-btn"
                      title="Quay lại"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => scrollRecommendations("right")}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer flex items-center justify-center border border-white/20 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.65),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.3)] bouncy-btn"
                      title="Xem tiếp theo"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Tiles Container */}
                <div 
                  ref={recoScrollRef}
                  className="flex gap-3 overflow-x-auto pb-2 scroll-smooth scrollbar-none snap-x"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {recommendedChannels.map((ch) => {
                    const isPlaying = selectedChannel.id === ch.id;
                    const isFav = favorites.includes(ch.id);
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
                          className={`group relative rounded-xl p-0.5 sm:p-1 cursor-pointer flex items-center justify-center w-28 xs:w-34 sm:w-42 md:w-48 h-[56px] xs:h-[68px] sm:h-[84px] md:h-[96px] select-none ${
                            isPlaying 
                              ? "bg-white/20 backdrop-blur-lg border-[3.5px] border-white shadow-md shadow-pink-500/10" 
                              : "bg-white/5 backdrop-blur-md border-2 border-white/10 hover:border-[3.5px] hover:border-white"
                          }`}
                          title={ch.name}
                        >
                          {/* Logo Graphic Container - with vertical split for channel position number */}
                          <div className="w-full h-full flex items-center select-none overflow-hidden rounded-lg">
                            {/* Left Part: Channel Number */}
                            <div className="w-[28%] sm:w-[26%] h-full flex items-center justify-center text-white/80 text-[11px] xs:text-[13px] sm:text-base md:text-lg font-bold tracking-tight font-sans">
                              {ch.channelNumber || "000"}
                            </div>
                            {/* Vertical Divider */}
                            <div className="w-[1px] h-[45%] sm:h-[55%] bg-white/15 flex-shrink-0" />
                            {/* Right Part: Logo Container */}
                            <div className="flex-1 h-full flex justify-center items-center overflow-hidden p-0.5 sm:p-1">
                              {ch.logoImg ? (
                                <img
                                  src={ch.logoImg}
                                  alt={ch.name}
                                  referrerPolicy="no-referrer"
                                  className={`object-contain filter drop-shadow-md select-none pointer-events-none ${
                                    ch.id.startsWith("vinh_long") ? "w-[88%] h-[88%]" : ch.group === "SCTV" ? "w-[90%] h-[90%]" : ch.group === "VTVcab" ? "w-[94%] h-[94%]" : "w-[125%] h-[125%] sm:w-[135%] sm:h-[135%]"
                                  }`}
                                />
                              ) : (
                                <div className={`w-full h-full flex items-center justify-center rounded-lg ${ch.logoBg || "bg-emerald-600"} shadow-inner border border-white/10 font-bold text-white text-[9px] sm:text-xs tracking-wider text-center px-1`}>
                                  {ch.logoText}
                                </div>
                              )}
                            </div>
                          </div>
                      
                          {/* Heart/Fav Button overlay (shown on top corner) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(ch.id, e);
                            }}
                            className="absolute top-1 right-1 p-1 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black/90 hover:scale-110 active:scale-120 duration-200"
                            title={isFav ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isFav ? "text-red-500 fill-red-500" : "text-white/70 hover:text-white"}`} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

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
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-120 shadow"
                      title="Quay lại"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => scrollFavorites("right")}
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-120 shadow"
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
                          className={`group relative rounded-xl p-0.5 sm:p-1 cursor-pointer flex items-center justify-center w-28 xs:w-34 sm:w-42 md:w-48 h-[56px] xs:h-[68px] sm:h-[84px] md:h-[96px] select-none ${
                            isPlaying 
                              ? "bg-white/20 backdrop-blur-lg border-[3.5px] border-white shadow-md shadow-pink-500/10" 
                              : "bg-white/5 backdrop-blur-md border-2 border-white/10 hover:border-[3.5px] hover:border-white"
                          }`}
                          title={ch.name}
                        >
                          {/* Logo Graphic Container - with vertical split for channel position number */}
                          <div className="w-full h-full flex items-center select-none overflow-hidden rounded-lg">
                            {/* Left Part: Channel Number */}
                            <div className="w-[28%] sm:w-[26%] h-full flex items-center justify-center text-white/80 text-[11px] xs:text-[13px] sm:text-base md:text-lg font-bold tracking-tight font-sans">
                              {ch.channelNumber || "000"}
                            </div>
                            {/* Vertical Divider */}
                            <div className="w-[1px] h-[45%] sm:h-[55%] bg-white/15 flex-shrink-0" />
                            {/* Right Part: Logo Container */}
                            <div className="flex-1 h-full flex justify-center items-center overflow-hidden p-0.5 sm:p-1">
                              {ch.logoImg ? (
                                <img
                                  src={ch.logoImg}
                                  alt={ch.name}
                                  referrerPolicy="no-referrer"
                                  className={`object-contain filter drop-shadow-md select-none pointer-events-none ${
                                    ch.id.startsWith("vinh_long") ? "w-[88%] h-[88%]" : ch.group === "SCTV" ? "w-[90%] h-[90%]" : ch.group === "VTVcab" ? "w-[94%] h-[94%]" : "w-[125%] h-[125%] sm:w-[135%] sm:h-[135%]"
                                  }`}
                                />
                              ) : (
                                <div className={`w-full h-full flex items-center justify-center rounded-lg ${ch.logoBg || "bg-emerald-600"} shadow-inner border border-white/10 font-bold text-white text-[9px] sm:text-xs tracking-wider text-center px-1`}>
                                  {ch.logoText}
                                </div>
                              )}
                            </div>
                          </div>
                      
                          {/* Heart/Unfav Button overlay (shown on top corner or toggleable) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(ch.id, e);
                            }}
                            className="absolute top-1 right-1 p-1 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black/90 hover:scale-110 active:scale-120 duration-200"
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
                    <div className="absolute bottom-2.5 left-3 right-12 z-10 pointer-events-none select-none font-montserrat">
                      <h4 className="text-xs sm:text-[13px] font-normal text-white truncate drop-shadow-md">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-white/65 truncate drop-shadow text-pink-100/80 font-bold">
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
                    <div className="px-1 select-none font-montserrat">
                      <h4 className="text-[11px] sm:text-xs font-normal text-white group-hover:text-teal-300 transition-colors duration-200 truncate">
                        {movie.title}
                      </h4>
                      <p className="text-[10px] text-white/45 truncate mt-0.5 font-bold">
                        {movie.tag}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 3: PHIM ĐIỆN ẢNH BOM TẤN (16:9 LANDSCAPE WIDESCREEN GRID) */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded bg-amber-400" />
                <h3 className="text-sm sm:text-base font-bold tracking-tight text-white/95 font-google">Phim Điện Ảnh Bom Tấn</h3>
                <span className="text-xs text-amber-400/80 font-mono mt-1">Chất lượng 4K cực nét</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "Lật Mặt 7: Một Điều Ước",
                    tag: "Gia đình · Tâm lý",
                    year: "2024",
                    duration: "138 phút",
                    img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80"
                  },
                  {
                    title: "Mai (Trấn Thành)",
                    tag: "Lãng mạn · Bi kịch",
                    year: "2024",
                    duration: "131 phút",
                    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop&q=80"
                  },
                  {
                    title: "Bố Già (The Godfather)",
                    tag: "Kinh điển · Tội phạm",
                    year: "1972",
                    duration: "175 phút",
                    img: "https://images.unsplash.com/photo-1543536448-d209d2d13a1c?w=600&auto=format&fit=crop&q=80"
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
                    className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-white/20 shadow-lg hover:shadow-amber-500/5 transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-103 cursor-pointer"
                  >
                    <div className="relative aspect-[16/9]">
                      <img 
                        src={movie.img} 
                        alt={movie.title} 
                        className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-[0.8] transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      
                      {/* Floating Info Tag */}
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 text-white font-mono text-[9px] shadow select-none border border-white/10">
                        {movie.year} · {movie.duration}
                      </span>

                      {/* Overlap Play Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-11 h-11 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-120 duration-300 transition-all">
                          <Play className="w-4.5 h-4.5 fill-white text-white translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                    {/* Content metadata details */}
                    <div className="p-3.5 select-none font-montserrat">
                      <h4 className="text-xs sm:text-[13px] font-bold text-white group-hover:text-amber-300 transition-colors duration-200 truncate">
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

            {/* ROW 4: TOP 10 PHIM HOT THỊNH HÀNH (NETFLIX STYLE OUTLINE NUMBERS CAROUSEL) */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded bg-pink-500" />
                <h3 className="text-sm sm:text-base font-bold tracking-tight text-white/95 font-google">Top 10 Phim Thịnh Hành</h3>
                <span className="text-xs text-pink-400/80 font-mono mt-1">Xếp hạng tuần này</span>
              </div>

              {/* Horizontal Scroll Bar */}
              <div 
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {[
                  {
                    rank: 1,
                    title: "Dữ Phượng Hành",
                    tag: "Triệu Lệ Dĩnh · Lâm Canh Tân",
                    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80"
                  },
                  {
                    rank: 2,
                    title: "Câu Chuyện Hoa Hồng",
                    tag: "Lưu Diệc Phi · Lâm Canh Tân",
                    img: "https://images.unsplash.com/photo-1513829096999-4978602297f7?w=400&auto=format&fit=crop&q=80"
                  },
                  {
                    rank: 3,
                    title: "Trường Tương Tư 2",
                    tag: "Dương Tử · Đặng Vi",
                    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80"
                  },
                  {
                    rank: 4,
                    title: "Khánh Dư Niên 2",
                    tag: "Trương Nhược Quân · Lý Thấm",
                    img: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=400&auto=format&fit=crop&q=80"
                  },
                  {
                    rank: 5,
                    title: "Thừa Hoan Ký",
                    tag: "Dương Tử · Hứa Khải",
                    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80"
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
                    className="relative w-[170px] sm:w-[210px] h-[210px] sm:h-[260px] shrink-0 snap-start group cursor-pointer"
                  >
                    {/* Big ranking background number */}
                    <div className="absolute left-0 bottom-[-15px] sm:bottom-[-20px] text-[110px] sm:text-[140px] font-black leading-none select-none text-white/10 italic font-mono pointer-events-none group-hover:text-pink-500/15 transition-all duration-300">
                      {movie.rank}
                    </div>

                    {/* Movie Card */}
                    <div className="absolute right-2 top-2 bottom-2 left-10 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 shadow-lg group-hover:scale-102 flex flex-col justify-end bg-black">
                      <img 
                        src={movie.img} 
                        alt={movie.title} 
                        className="absolute inset-0 w-full h-full object-cover brightness-[0.7] group-hover:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      
                      {/* Inner Details */}
                      <div className="relative p-3 select-none font-montserrat">
                        <h4 className="text-[11px] sm:text-xs font-bold text-white group-hover:text-pink-300 truncate">
                          {movie.title}
                        </h4>
                        <p className="text-[9px] text-white/45 truncate mt-0.5">
                          {movie.tag}
                        </p>
                      </div>

                      {/* Hot Badge */}
                      <span className="absolute top-2 right-2 px-1 rounded bg-pink-500 text-white font-mono text-[8px] tracking-wide select-none">
                        TOP {movie.rank}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 5: ANIME & HOẠT HÌNH (LAYOUT 3 - ASPECT 1.5/1 LANDSCAPE CARDS IN ROW) */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded bg-teal-400" />
                <h3 className="text-sm sm:text-base font-bold tracking-tight text-white/95 font-google">Vũ Trụ Anime & Hoạt Hình</h3>
                <span className="text-xs text-teal-400/80 font-mono mt-1">Phiêu lưu kỳ thú</span>
              </div>

              {/* Horizontal Scroll Bar */}
              <div 
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {[
                  {
                    title: "One Piece (Đảo Hải Tặc)",
                    tag: "Luffy · Hành trình mới",
                    img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80"
                  },
                  {
                    title: "Doraemon: Bản Giao Hưởng",
                    tag: "Doraemon & Nobita",
                    img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80"
                  },
                  {
                    title: "Mộ Đom Đóm (Ghibli)",
                    tag: "Chiến tranh · Tình anh em",
                    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&auto=format&fit=crop&q=80"
                  },
                  {
                    title: "Thám Tử Lừng Danh Conan",
                    tag: "Kudo Shinichi · Edogawa",
                    img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80"
                  }
                ].map((movie, index) => (
                  <div 
                    key={index}
                    onClick={() => {
                      const v3 = CATEGORIES.flatMap(cat => cat.channels).find(ch => ch.id.includes("vtv3")) || CATEGORIES[0].channels[0];
                      if (v3) {
                        handleSelectChannel({
                          ...v3,
                          name: `Anime đề xuất: ${movie.title} (HD)`,
                        });
                      }
                      setActiveTab("live");
                    }}
                    className="snap-start shrink-0 group flex flex-col gap-2 cursor-pointer w-[160px] sm:w-[200px]"
                  >
                    <div className="relative aspect-[1.5/1] rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-white/20 transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-104 shadow-md">
                      <img 
                        src={movie.img} 
                        alt={movie.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      
                      {/* Overlap Play Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-8 h-8 rounded-full bg-teal-400 text-white flex items-center justify-center shadow-lg hover:scale-110 duration-200">
                          <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                    {/* Content metadata details */}
                    <div className="px-1 select-none font-montserrat">
                      <h4 className="text-[11px] sm:text-xs font-normal text-white group-hover:text-teal-300 transition-colors duration-200 truncate">
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

        {/* VIEW: SETTINGS PAGE */}
        {activeTab === "settings" && (
          <div className="max-w-5xl mx-auto py-4 animate-fade-in font-sans">
            <AnimatePresence mode="wait">
              {!activeSettingSection ? (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-3"
                >
                  {/* Project Details Banner */}
                  <div className="bg-white/10 backdrop-blur-[20px] rounded-[15px] p-5 sm:p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] border border-white/10 flex flex-col gap-4 relative overflow-hidden mb-4">
                    <div className="space-y-3 z-10 w-full">
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-none">
                        Project Vplay Refresh
                      </h2>
                      <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-white/80">
                        <div className="flex items-center gap-2">
                          <Pen className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />
                          <span className="font-normal text-white/70">Version: <strong className="text-white font-semibold">26.8.3 (Beta)</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Crown className="w-4 h-4 text-amber-400 shrink-0 stroke-[2.5]" />
                          <span className="font-normal text-white/70">Author: <strong className="text-white font-semibold">VNRT</strong></span>
                        </div>
                        <div className="flex items-start gap-2 leading-relaxed">
                          <Heart className="w-4 h-4 text-rose-400 shrink-0 mt-0.5 fill-rose-500/15 stroke-[2.5]" />
                          <span className="text-white/70">
                            Supporters: <strong className="text-white font-medium">FTV Official, HMG, DHA, Bsod999, Myyer, Nquinanh, TV Archive Official, VNTV Official</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* A subtle absolute glowing visual behind */}
                    <div className="absolute right-0 bottom-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                  </div>

                  {/* Settings Search Section styled exactly like Plugin Store with custom glass icon */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 pt-2">
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <Settings className="w-5 h-5 text-indigo-400" />
                      Cấu hình & Cài đặt
                    </h3>
                    <div className="relative w-full sm:max-w-[280px]">
                      <input
                        type="text"
                        value={settingsSearchQuery}
                        onChange={(e) => setSettingsSearchQuery(e.target.value)}
                        placeholder="Tìm kiếm cài đặt..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-white placeholder-white/40 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.3)] focus:outline-none focus:bg-white/15 focus:border-white/20 transition-all duration-300 text-left"
                      />
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                        <img 
                          src="https://static.wikia.nocookie.net/ftv/images/d/dc/Ass_glass.svg/revision/latest?cb=20260612062405&path-prefix=vi" 
                          className="w-4 h-4 brightness-0 invert opacity-60" 
                          referrerPolicy="no-referrer"
                          alt="Search"
                        />
                      </div>
                    </div>
                  </div>

                  {(() => {
                    const normalSecs = [
                      {
                        id: "profile",
                        title: "Hồ sơ",
                        subtitle: "Quản lý hồ sơ và tài khoản cá nhân Vplay",
                        icon: User,
                        keywords: ["profile", "hồ sơ", "tài khoản", "yêu thích", "cá nhân", "đồng bộ", "dữ liệu", "xóa", "vấn đề"]
                      },
                      {
                        id: "appearance",
                        title: "Giao diện",
                        subtitle: "Tùy biến giao diện và trải nghiệm người dùng theo ý thích",
                        icon: Palette,
                        keywords: ["giao diện", "màu sắc", "ánh sáng", "backdrop", "glow", "amoled", "tối", "dark", "chủ đề", "theme"]
                      },
                      {
                        id: "accessibility",
                        title: "Trợ năng",
                        subtitle: "Điều chỉnh cài đặt trợ năng và khả năng tiếp cận",
                        icon: Sliders,
                        keywords: ["trợ năng", "slide", "trượt hình", "tự động", "tiếp cận"]
                      },
                      {
                        id: "broadcast",
                        title: "Phát sóng",
                        subtitle: "Tùy chỉnh các luồng phát sóng, âm thanh và chất lượng video",
                        icon: Tv,
                        keywords: ["phát sóng", "luồng", "âm thanh", "chất lượng", "video", "coming soon"]
                      }
                    ];

                    const devSecs = [
                      {
                        id: "experimental",
                        title: "Thử nghiệm",
                        subtitle: "Trải nghiệm sớm các tính năng mới sắp ra mắt của Vplay",
                        icon: Beaker,
                        keywords: ["thử nghiệm", "tính năng mới", "độ trễ", "low latency", "bộ đệm", "cache", "ram", "ambient glow", "viền động", "playground", "m3u8", "mp4"]
                      },
                      {
                        id: "design_system",
                        title: "Design components",
                        subtitle: "Hệ thống thành phần và ngôn ngữ thiết kế của Vplay",
                        icon: Layers,
                        keywords: ["design components", "design system", "thiết kế", "giao diện", "button", "slider", "checkbox", "thành phần"]
                      },
                      {
                        id: "plugin_store",
                        title: "Cửa hàng tiện ích",
                        subtitle: "Cài đặt các gói tiện ích và tính năng mở rộng cao cấp của Vplay",
                        icon: Puzzle,
                        keywords: ["cửa hàng tiện ích", "plugin", "tiện ích", "xuất luồng", "multiview", "pip", "picture in picture", "mở luồng gốc", "chuyển kênh nhanh", "thêm kênh"]
                      }
                    ];

                    const query = settingsSearchQuery.trim().toLowerCase();
                    const filterFn = (sec: any) => {
                      if (!query) return true;
                      return sec.title.toLowerCase().includes(query) ||
                             sec.subtitle.toLowerCase().includes(query) ||
                             sec.keywords.some((k: string) => k.toLowerCase().includes(query));
                    };

                    const filteredNormal = normalSecs.filter(filterFn);
                    const filteredDev = devSecs.filter(filterFn);

                    if (filteredNormal.length === 0 && filteredDev.length === 0) {
                      return (
                        <div className="text-center py-12 text-white/40 text-sm">
                          Không tìm thấy mục cài đặt phù hợp với từ khóa tìm kiếm.
                        </div>
                      );
                    }

                    return (
                      <>
                        {filteredNormal.length > 0 && (
                          <div className="space-y-3">
                            {filteredNormal.map((sec) => {
                              const IconComp = sec.icon;
                              return (
                                <button
                                  key={sec.id}
                                  onClick={() => setActiveSettingSection(sec.id)}
                                  className="w-full text-left bg-white/10 backdrop-blur-[10px] rounded-[15px] py-4.5 px-5 sm:py-5.5 sm:px-6 flex items-center gap-3.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] border-[3px] border-white/10 hover:border-white text-white cursor-default"
                                >
                                  <div className="w-10 h-10 flex items-center justify-center shrink-0 text-white">
                                    <IconComp className="w-6 h-6 stroke-[1.8]" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-semibold text-white tracking-tight">{sec.title}</h3>
                                    <p className="text-[11.5px] sm:text-xs text-white/60 mt-0.5 leading-relaxed truncate">{sec.subtitle}</p>
                                  </div>
                                  <ChevronRight className="w-5 h-5 text-white/45 shrink-0" />
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {filteredDev.length > 0 && (
                          <div className="space-y-3 pt-2">
                            {/* Developer Options Heading */}
                            <div className="pt-2 pb-1.5 px-2 flex items-center gap-2 text-white/50 text-[11px] font-bold tracking-wider uppercase select-none font-sans">
                              <Cpu className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>Tùy chọn nhà phát triển</span>
                            </div>

                            {filteredDev.map((sec) => {
                              const IconComp = sec.icon;
                              return (
                                <button
                                  key={sec.id}
                                  onClick={() => setActiveSettingSection(sec.id)}
                                  className="w-full text-left bg-white/10 backdrop-blur-[10px] rounded-[15px] py-4.5 px-5 sm:py-5.5 sm:px-6 flex items-center gap-3.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] border-[3px] border-white/10 hover:border-white text-white cursor-default"
                                >
                                  <div className="w-10 h-10 flex items-center justify-center shrink-0 text-white">
                                    <IconComp className="w-6 h-6 stroke-[1.8]" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-semibold text-white tracking-tight">{sec.title}</h3>
                                    <p className="text-[11.5px] sm:text-xs text-white/60 mt-0.5 leading-relaxed truncate">{sec.subtitle}</p>
                                  </div>
                                  <ChevronRight className="w-5 h-5 text-white/45 shrink-0" />
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </>
                    );
                  })()}
                </motion.div>
              ) : (
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`mt-16 sm:mt-20 rounded-[15px] p-6 sm:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/10 text-white ${
                    activeSettingSection === "design_system" 
                      ? "bg-[#211f26] backdrop-blur-[10px]" 
                      : "bg-white/10 backdrop-blur-[10px]"
                  }`}
                >
                  {activeSettingSection === "appearance" && (() => {
                    const isMatched = (text: string) => {
                      const q = settingDetailSearchQuery.trim().toLowerCase();
                      if (!q) return true;
                      return text.toLowerCase().includes(q);
                    };

                    const matchGlow = isMatched("Màu Sắc Ánh Sáng Nền") || isMatched("Backdrop Glow") || isMatched("cosmic") || isMatched("sunset") || isMatched("aurora") || isMatched("tối giản") || isMatched("chủ đề") || isMatched("màu");
                    const matchAmoled = isMatched("AMOLED Dark") || isMatched("siêu tối") || isMatched("bảo vệ mắt") || isMatched("tối");
                    const matchDock = isMatched("Tùy biến thanh điều hướng Dock") || isMatched("thanh Dock") || isMatched("Dock Customizer") || isMatched("rearrange") || isMatched("trang chủ") || isMatched("trực tiếp") || isMatched("cài đặt") || isMatched("tìm kiếm") || isMatched("tải lại") || isMatched("ghim") || isMatched("hồ sơ") || isMatched("cửa hàng") || isMatched("về ứng dụng");

                    const hasResults = matchGlow || matchAmoled || matchDock;

                    return (
                      <div className="space-y-6">
                        {/* Section Header with Search Bar */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                          <div className="flex items-center gap-3 text-left">
                            <div className="w-12 h-12 flex items-center justify-center shrink-0 text-white">
                              <Palette className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">Giao diện</h3>
                              <p className="text-xs text-white/60">Tùy biến dải màu chuyển sắc phía dưới lớp kính mờ theo đúng sở thích của bạn.</p>
                            </div>
                          </div>
                          <div className="relative w-full md:max-w-[280px]">
                            <input
                              type="text"
                              value={settingDetailSearchQuery}
                              onChange={(e) => setSettingDetailSearchQuery(e.target.value)}
                              placeholder="Tìm kiếm cài đặt..."
                              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-white placeholder-white/45 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.3)] focus:outline-none focus:bg-white/15 focus:border-white/20 transition-all duration-300 text-left"
                            />
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                              <img 
                                src="https://static.wikia.nocookie.net/ftv/images/d/dc/Ass_glass.svg/revision/latest?cb=20260612062405&path-prefix=vi" 
                                className="w-4 h-4 brightness-0 invert opacity-60" 
                                referrerPolicy="no-referrer"
                                alt="Search"
                              />
                            </div>
                          </div>
                        </div>

                        {!hasResults ? (
                          <div className="py-12 text-center text-white/50 space-y-2">
                            <AlertCircle className="w-10 h-10 mx-auto opacity-40 text-rose-400" />
                            <p className="text-sm font-semibold">Không tìm thấy kết quả phù hợp</p>
                            <p className="text-xs opacity-60">Hãy thử nhập từ khóa khác để tìm kiếm lại.</p>
                          </div>
                        ) : (
                          <>
                            {/* Backdrop Glow Toggle */}
                            {matchGlow && (
                              <div className="space-y-3">
                                <label className="text-sm font-semibold block text-white/90 text-left">Màu Sắc Ánh Sáng Nền (Backdrop Glow)</label>
                                <div className="grid grid-cols-2 gap-2.5">
                                  {[
                                    { id: "cosmic", name: "Cosmic Glow", color: "from-pink-600 to-indigo-800" },
                                    { id: "deep", name: "Tối giản", color: "from-neutral-800 to-slate-900" },
                                    { id: "aurora", name: "Cực quang", color: "from-teal-600 to-lime-900" },
                                    { id: "sunset", name: "Sunset View", color: "from-rose-600 to-amber-900" },
                                  ].map((item) => (
                                    <button
                                      key={item.id}
                                      onClick={() => setBgColor(item.id as any)}
                                      className={`p-4 rounded-xl text-left text-xs font-bold relative overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-98 cursor-default border ${
                                        bgColor === item.id 
                                          ? "border-white bg-white/15" 
                                          : "border-white/10 hover:border-white/20 bg-white/5"
                                      }`}
                                    >
                                      <div className="flex flex-col h-full justify-between">
                                        <span className="text-white font-bold mb-2">{item.name}</span>
                                        <div className={`w-full h-2 rounded bg-gradient-to-r ${item.color} opacity-80`} />
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* AMOLED Dark Mode Toggle */}
                            {matchAmoled && (
                              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-left">
                                <div className="flex-1 pr-4">
                                  <h4 className="text-sm font-semibold text-white">AMOLED Dark</h4>
                                  <p className="text-xs text-white/60 mt-0.5">Chế độ siêu tối giúp bảo vệ mắt</p>
                                </div>
                                <button
                                  onClick={() => setAmoledDark(!amoledDark)}
                                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none relative cursor-pointer flex items-center ${
                                    amoledDark ? "bg-[#34c759]" : "bg-white/20"
                                  }`}
                                >
                                  <motion.div
                                    animate={{ x: amoledDark ? 20 : 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    className="relative w-6 h-5 flex items-center justify-center group"
                                  >
                                    <div className="absolute -inset-2 rounded-full bg-white/15 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 pointer-events-none" />
                                    <div className="w-full h-full rounded-full bg-white border border-transparent transition-all duration-300 shadow-md z-10 group-hover:scale-110 group-hover:bg-transparent group-hover:backdrop-blur-md group-hover:border-white/95" />
                                  </motion.div>
                                </button>
                              </div>
                            )}

                            {/* Dock Customizer Section */}
                            {matchDock && (
                              <div className="pt-6 border-t border-white/10 space-y-4 text-left">
                                <div className="flex flex-col gap-1">
                                  <h4 className="text-sm font-semibold text-white">Tùy biến thanh điều hướng Dock</h4>
                                  <p className="text-xs text-white/60">Bật/tắt và thay đổi thứ tự các nút chức năng xuất hiện trên thanh Dock bên dưới.</p>
                                </div>

                                {/* Miniature live dock preview */}
                                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center">
                                  <div className="w-full max-w-[340px] h-12 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-around px-2 py-0.5 relative">
                                    {dockItems.filter(item => item.enabled).map((item) => {
                                      const config = getDockItemConfig(item.id);
                                      return (
                                        <div key={`preview-${item.id}`} className="flex flex-col items-center justify-center text-white/50 w-8 h-8 animate-fade-in" title={config.label}>
                                          {config.isImg ? (
                                            <img src={config.icon} className="w-4.5 h-4.5 object-contain opacity-70 filter brightness-0 invert" alt={config.label} referrerPolicy="no-referrer" />
                                          ) : (
                                            (() => {
                                              const IconComponent = config.icon;
                                              return <IconComponent className="w-4.5 h-4.5" />;
                                            })()
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* List of dock items with toggle & reorder controls */}
                                <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
                                  {dockItems.map((item, idx) => {
                                    const config = getDockItemConfig(item.id);
                                    return (
                                      <div key={item.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-200">
                                        <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/80 shrink-0">
                                            {config.isImg ? (
                                              <img src={config.icon} className="w-5 h-5 object-contain filter brightness-0 invert opacity-80" alt={config.label} referrerPolicy="no-referrer" />
                                            ) : (
                                              (() => {
                                                const IconComponent = config.icon;
                                                return <IconComponent className="w-5 h-5" />;
                                              })()
                                            )}
                                          </div>
                                          <div>
                                            <div className="text-xs font-bold text-white">{config.label}</div>
                                            <div className="text-[9px] text-white/40">ID: {item.id}</div>
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                          {/* Up/Down buttons */}
                                          <button
                                            onClick={() => moveDockItem(idx, 'up')}
                                            disabled={idx === 0}
                                            className="p-1 rounded bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-all duration-150"
                                            title="Di chuyển lên"
                                          >
                                            <ChevronUp className="w-3.5 h-3.5" />
                                          </button>
                                          <button
                                            onClick={() => moveDockItem(idx, 'down')}
                                            disabled={idx === dockItems.length - 1}
                                            className="p-1 rounded bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-all duration-150"
                                            title="Di chuyển xuống"
                                          >
                                            <ChevronDown className="w-3.5 h-3.5" />
                                          </button>

                                          {/* Toggle active / inactive switch */}
                                          <button
                                            onClick={() => toggleDockItem(item.id)}
                                            className={`ml-1 px-2.5 py-1 text-[10px] font-semibold rounded-md border transition-all duration-200 cursor-pointer ${
                                              item.enabled
                                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                                                : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white/60"
                                            }`}
                                          >
                                            {item.enabled ? "Hiển thị" : "Ẩn"}
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* Toggle: Merge search into dock */}
                                <div className="mt-4 flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all duration-300">
                                  <div className="space-y-0.5 text-left">
                                    <div className="text-xs font-bold text-white">Nhập nút tìm kiếm vào thanh dock</div>
                                    <p className="text-[10px] text-white/50">Tích hợp trực tiếp nút Tìm kiếm vào thanh dock thay vì tách riêng ra ngoài.</p>
                                  </div>
                                  <button
                                    onClick={() => {
                                      const searchItem = dockItems.find(it => it.id === "search");
                                      const searchEnabled = searchItem?.enabled ?? false;
                                      
                                      if (!mergeSearchToDock) {
                                        // Turning ON. If search is enabled, the new rendered count will include the search item.
                                        const otherEnabledCount = dockItems.filter(it => it.enabled && it.id !== "search").length;
                                        const newRenderedCount = otherEnabledCount + (searchEnabled ? 1 : 0);
                                        
                                        if (newRenderedCount > 5) {
                                          triggerToast("Thanh dock chỉ chứa được 5 mục");
                                          return;
                                        }
                                      }
                                      setMergeSearchToDock(!mergeSearchToDock);
                                    }}
                                    className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none relative cursor-pointer flex items-center shrink-0 ${
                                      mergeSearchToDock ? "bg-[#34c759]" : "bg-white/20"
                                    }`}
                                  >
                                    <motion.div
                                      animate={{ x: mergeSearchToDock ? 20 : 0 }}
                                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                      className="relative w-6 h-5 flex items-center justify-center group"
                                    >
                                      <div className="absolute -inset-2 rounded-full bg-white/15 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 pointer-events-none" />
                                      <div className="w-full h-full rounded-full bg-white border border-transparent transition-all duration-300 shadow-md z-10 group-hover:scale-110 group-hover:bg-transparent group-hover:backdrop-blur-md group-hover:border-white/95" />
                                    </motion.div>
                                  </button>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })()}

                  {activeSettingSection === "profile" && (() => {
                    const isMatched = (text: string) => {
                      const q = settingDetailSearchQuery.trim().toLowerCase();
                      if (!q) return true;
                      return text.toLowerCase().includes(q);
                    };

                    const matchFav = isMatched("Tổng số Kênh Yêu Thích") || isMatched("yêu thích") || isMatched("xóa") || isMatched("favorites");
                    const matchCustom = isMatched("Kênh tự thêm cá nhân") || isMatched("tự thêm") || isMatched("custom") || isMatched("m3u8") || isMatched("xóa");
                    const matchCloud = isMatched("Thông báo tài khoản trực tuyến") || isMatched("Cloud Sync") || isMatched("đám mây") || isMatched("đăng nhập") || isMatched("đồng bộ") || isMatched("tài khoản");

                    const hasResults = matchFav || matchCustom || matchCloud;

                    return (
                      <div className="space-y-6">
                        {/* Section Header with Search Bar */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                          <div className="flex items-center gap-3 text-left">
                            <div className="w-12 h-12 flex items-center justify-center shrink-0 text-white">
                              <User className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">Tài khoản & Dữ liệu</h3>
                              <p className="text-xs text-white/60">Đồng bộ hóa kênh yêu thích và các dữ liệu đã thiết lập trên thiết bị.</p>
                            </div>
                          </div>
                          <div className="relative w-full md:max-w-[280px]">
                            <input
                              type="text"
                              value={settingDetailSearchQuery}
                              onChange={(e) => setSettingDetailSearchQuery(e.target.value)}
                              placeholder="Tìm kiếm cài đặt..."
                              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-white placeholder-white/45 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.3)] focus:outline-none focus:bg-white/15 focus:border-white/20 transition-all duration-300 text-left"
                            />
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                              <img 
                                src="https://static.wikia.nocookie.net/ftv/images/d/dc/Ass_glass.svg/revision/latest?cb=20260612062405&path-prefix=vi" 
                                className="w-4 h-4 brightness-0 invert opacity-60" 
                                referrerPolicy="no-referrer"
                                alt="Search"
                              />
                            </div>
                          </div>
                        </div>

                        {!hasResults ? (
                          <div className="py-12 text-center text-white/50 space-y-2">
                            <AlertCircle className="w-10 h-10 mx-auto opacity-40 text-rose-400" />
                            <p className="text-sm font-semibold">Không tìm thấy kết quả phù hợp</p>
                            <p className="text-xs opacity-60">Hãy thử nhập từ khóa khác để tìm kiếm lại.</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {(matchFav || matchCustom) && (
                              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3.5 text-xs text-white/80 text-left">
                                {matchFav && (
                                  <>
                                    <div className="flex items-center justify-between">
                                      <span className="font-semibold text-white/90">Tổng số Kênh Yêu Thích</span>
                                      <span className="font-mono text-amber-300 font-bold bg-white/5 px-2 py-0.5 rounded">{favorites.length} kênh</span>
                                    </div>
                                    {favorites.length > 0 && (
                                      <button 
                                        onClick={() => {
                                          if (confirm("Bạn có đồng ý xóa toàn bộ danh mục yêu thích?")) {
                                            setFavorites([]);
                                          }
                                        }}
                                        className="py-1.5 px-3 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/25 transition-all cursor-default font-semibold text-[11px]"
                                      >
                                        Xóa tất cả yêu thích
                                      </button>
                                    )}
                                  </>
                                )}

                                {matchFav && matchCustom && <hr className="border-white/5" />}

                                {matchCustom && (
                                  <>
                                    <div className="flex items-center justify-between">
                                      <span className="font-semibold text-white/90">Kênh tự thêm cá nhân</span>
                                      <span className="font-mono text-indigo-300 font-bold bg-white/5 px-2 py-0.5 rounded">{customChannels.length} kênh</span>
                                    </div>
                                    {customChannels.length > 0 && (
                                      <button 
                                        onClick={() => {
                                          if (confirm("Bạn có đồng ý xóa tất cả các kênh tự thêm?")) {
                                            setCustomChannels([]);
                                          }
                                        }}
                                        className="py-1.5 px-3 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/25 transition-all cursor-default font-semibold text-[11px]"
                                      >
                                        Xoá danh sách kênh tự thêm
                                      </button>
                                    )}
                                  </>
                                )}
                              </div>
                            )}

                            {matchCloud && (
                              <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/15 text-xs leading-relaxed text-orange-200 text-left">
                                <div className="font-bold text-orange-300 mb-1">
                                  Thông báo tài khoản trực tuyến
                                </div>
                                Tính năng Đăng nhập Tài khoản Đồng bộ Đám mây Vplay Cloud Sync đang được phát triển. Dữ liệu của bạn hiện được lưu trữ an toàn dưới bộ nhớ trình duyệt (LocalStorage).
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {activeSettingSection === "accessibility" && (() => {
                    const isMatched = (text: string) => {
                      const q = settingDetailSearchQuery.trim().toLowerCase();
                      if (!q) return true;
                      return text.toLowerCase().includes(q);
                    };

                    const matchAutoSlide = isMatched("Tự động trượt hình") || isMatched("trượt hình") || isMatched("slide") || isMatched("5 giây") || isMatched("thumbnail");

                    return (
                      <div className="space-y-6">
                        {/* Section Header with Search Bar */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                          <div className="flex items-center gap-3 text-left">
                            <div className="w-12 h-12 flex items-center justify-center shrink-0 text-white">
                              <Sliders className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">Trợ năng</h3>
                              <p className="text-xs text-white/60">Tùy chỉnh các cài đặt giúp tối ưu hóa khả năng tương tác và trải nghiệm nghe nhìn.</p>
                            </div>
                          </div>
                          <div className="relative w-full md:max-w-[280px]">
                            <input
                              type="text"
                              value={settingDetailSearchQuery}
                              onChange={(e) => setSettingDetailSearchQuery(e.target.value)}
                              placeholder="Tìm kiếm cài đặt..."
                              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-white placeholder-white/45 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.3)] focus:outline-none focus:bg-white/15 focus:border-white/20 transition-all duration-300 text-left"
                            />
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                              <img 
                                src="https://static.wikia.nocookie.net/ftv/images/d/dc/Ass_glass.svg/revision/latest?cb=20260612062405&path-prefix=vi" 
                                className="w-4 h-4 brightness-0 invert opacity-60" 
                                referrerPolicy="no-referrer"
                                alt="Search"
                              />
                            </div>
                          </div>
                        </div>

                        {!matchAutoSlide ? (
                          <div className="py-12 text-center text-white/50 space-y-2">
                            <AlertCircle className="w-10 h-10 mx-auto opacity-40 text-rose-400" />
                            <p className="text-sm font-semibold">Không tìm thấy kết quả phù hợp</p>
                            <p className="text-xs opacity-60">Hãy thử nhập từ khóa khác để tìm kiếm lại.</p>
                          </div>
                        ) : (
                          <div className="space-y-4 text-left">
                            {/* Option: Tự động trượt hình */}
                            <div className="p-5 rounded-[15px] bg-white/5 border border-white/10 space-y-4">
                              <div className="space-y-1">
                                <h4 className="text-sm font-semibold text-white">Tự động trượt hình</h4>
                                <p className="text-xs text-white/60 leading-relaxed">Hình thumbnail ở trang chủ tự động trượt sau mỗi 5 giây</p>
                              </div>
                              
                              <div className="flex items-center">
                                <button
                                  onClick={() => setAutoSlide(!autoSlide)}
                                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none relative cursor-pointer flex items-center ${
                                    autoSlide ? "bg-[#34c759]" : "bg-[#3a3a3c]"
                                  }`}
                                >
                                  <motion.div
                                    animate={{ x: autoSlide ? 20 : 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    className="relative w-6 h-5 flex items-center justify-center group"
                                  >
                                    <div className="absolute -inset-2 rounded-full bg-white/15 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 pointer-events-none" />
                                    <div className="w-full h-full rounded-full bg-white border border-transparent transition-all duration-300 shadow-md z-10 group-hover:scale-110 group-hover:bg-transparent group-hover:backdrop-blur-md group-hover:border-white/95" />
                                  </motion.div>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {activeSettingSection === "experimental" && (() => {
                    const isMatched = (text: string) => {
                      const q = settingDetailSearchQuery.trim().toLowerCase();
                      if (!q) return true;
                      return text.toLowerCase().includes(q);
                    };

                    const matchLowLatency = isMatched("Mô phỏng độ trễ cực thấp") || isMatched("Ultra-Low Latency") || isMatched("độ trễ") || isMatched("latency") || isMatched("bộ đệm") || isMatched("hls");
                    const matchCache = isMatched("Bộ đệm luồng thử nghiệm") || isMatched("Stream Caching") || isMatched("bộ đệm") || isMatched("cache") || isMatched("ram") || isMatched("gián đoạn");
                    const matchAmbient = isMatched("Ánh sáng viền động") || isMatched("Dynamic Ambient Glow") || isMatched("ambient") || isMatched("glow") || isMatched("viền") || isMatched("video") || isMatched("thuật toán");
                    const matchPlayground = isMatched("Bàn thử nghiệm luồng phát") || isMatched("HLS Stream Playground") || isMatched("bàn thử nghiệm") || isMatched("playground") || isMatched("m3u8") || isMatched("mp4") || isMatched("phát thử");

                    const hasResults = matchLowLatency || matchCache || matchAmbient || matchPlayground;

                    return (
                      <div className="space-y-6">
                        {/* Section Header with Search Bar */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                          <div className="flex items-center gap-3 text-left">
                            <div className="w-12 h-12 flex items-center justify-center shrink-0 text-white">
                              <Beaker className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">Thử nghiệm</h3>
                              <p className="text-xs text-white/60">Kích hoạt các thuật toán kết xuất, truyền tải và tính năng đang phát triển của Vplay.</p>
                            </div>
                          </div>
                          <div className="relative w-full md:max-w-[280px]">
                            <input
                              type="text"
                              value={settingDetailSearchQuery}
                              onChange={(e) => setSettingDetailSearchQuery(e.target.value)}
                              placeholder="Tìm kiếm cài đặt..."
                              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-white placeholder-white/45 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.3)] focus:outline-none focus:bg-white/15 focus:border-white/20 transition-all duration-300 text-left"
                            />
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                              <img 
                                src="https://static.wikia.nocookie.net/ftv/images/d/dc/Ass_glass.svg/revision/latest?cb=20260612062405&path-prefix=vi" 
                                className="w-4 h-4 brightness-0 invert opacity-60" 
                                referrerPolicy="no-referrer"
                                alt="Search"
                              />
                            </div>
                          </div>
                        </div>

                        {!hasResults ? (
                          <div className="py-12 text-center text-white/50 space-y-2">
                            <AlertCircle className="w-10 h-10 mx-auto opacity-40 text-rose-400" />
                            <p className="text-sm font-semibold">Không tìm thấy kết quả phù hợp</p>
                            <p className="text-xs opacity-60">Hãy thử nhập từ khóa khác để tìm kiếm lại.</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {/* Option 1: Low Latency */}
                            {matchLowLatency && (
                              <div className="p-5 rounded-[15px] bg-white/5 border border-white/10 flex items-center justify-between text-left">
                                <div className="space-y-1 pr-4">
                                  <h4 className="text-sm font-semibold text-white">Mô phỏng độ trễ cực thấp (Ultra-Low Latency)</h4>
                                  <p className="text-xs text-white/60 leading-relaxed">Giảm thiểu kích thước bộ đệm HLS để tối ưu hóa thời gian đồng bộ trực tiếp.</p>
                                </div>
                                <button
                                  onClick={() => setExpLowLatency(!expLowLatency)}
                                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none relative cursor-pointer flex items-center shrink-0 ${
                                    expLowLatency ? "bg-[#34c759]" : "bg-[#3a3a3c]"
                                  }`}
                                >
                                  <motion.div
                                    animate={{ x: expLowLatency ? 20 : 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    className="relative w-6 h-5 flex items-center justify-center group"
                                  >
                                    <div className="absolute -inset-2 rounded-full bg-white/15 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 pointer-events-none" />
                                    <div className="w-full h-full rounded-full bg-white shadow-md z-10" />
                                  </motion.div>
                                </button>
                              </div>
                            )}

                            {/* Option 2: Stream Cache */}
                            {matchCache && (
                              <div className="p-5 rounded-[15px] bg-white/5 border border-white/10 flex items-center justify-between text-left">
                                <div className="space-y-1 pr-4">
                                  <h4 className="text-sm font-semibold text-white">Bộ đệm luồng thử nghiệm (Stream Caching)</h4>
                                  <p className="text-xs text-white/60 leading-relaxed">Tăng cường dung lượng RAM đệm trước luồng phát sóng nhằm ngăn chặn gián đoạn.</p>
                                </div>
                                <button
                                  onClick={() => setExpCache(!expCache)}
                                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none relative cursor-pointer flex items-center shrink-0 ${
                                    expCache ? "bg-[#34c759]" : "bg-[#3a3a3c]"
                                  }`}
                                >
                                  <motion.div
                                    animate={{ x: expCache ? 20 : 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    className="relative w-6 h-5 flex items-center justify-center group"
                                  >
                                    <div className="absolute -inset-2 rounded-full bg-white/15 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 pointer-events-none" />
                                    <div className="w-full h-full rounded-full bg-white shadow-md z-10" />
                                  </motion.div>
                                </button>
                              </div>
                            )}

                            {/* Option 3: Ambient Glow */}
                            {matchAmbient && (
                              <div className="p-5 rounded-[15px] bg-white/5 border border-white/10 flex items-center justify-between text-left">
                                <div className="space-y-1 pr-4">
                                  <h4 className="text-sm font-semibold text-white">Ánh sáng viền động (Dynamic Ambient Glow)</h4>
                                  <p className="text-xs text-white/60 leading-relaxed">Sử dụng thuật toán phân tích màu video thời gian thực để chiếu sáng viền trình phát.</p>
                                </div>
                                <button
                                  onClick={() => setExpAmbientGlow(!expAmbientGlow)}
                                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none relative cursor-pointer flex items-center shrink-0 ${
                                    expAmbientGlow ? "bg-[#34c759]" : "bg-[#3a3a3c]"
                                  }`}
                                >
                                  <motion.div
                                    animate={{ x: expAmbientGlow ? 20 : 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    className="relative w-6 h-5 flex items-center justify-center group"
                                  >
                                    <div className="absolute -inset-2 rounded-full bg-white/15 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 pointer-events-none" />
                                    <div className="w-full h-full rounded-full bg-white shadow-md z-10" />
                                  </motion.div>
                                </button>
                              </div>
                            )}

                            {/* Custom Playground */}
                            {matchPlayground && (
                              <div className="p-5 rounded-[15px] bg-white/5 border border-white/10 space-y-4 text-left">
                                <div className="space-y-1">
                                  <h4 className="text-sm font-semibold text-white">Bàn thử nghiệm luồng phát (HLS Stream Playground)</h4>
                                  <p className="text-xs text-white/60 leading-relaxed">Phát trực tiếp bất kỳ luồng video .m3u8 nào để kiểm tra hiệu năng trình phát.</p>
                                </div>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={testStreamUrl}
                                    onChange={(e) => setTestStreamUrl(e.target.value)}
                                    placeholder="Nhập đường dẫn luồng phát .m3u8 hoặc .mp4..."
                                    className="flex-1 px-4 py-2.5 rounded-[10px] bg-white/10 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-left"
                                  />
                                  <button
                                    onClick={() => {
                                      if (testStreamUrl) {
                                        const tempChannel: Channel = {
                                          id: "exp-test",
                                          name: "Luồng Thử Nghiệm",
                                          url: testStreamUrl,
                                          group: "Thử nghiệm",
                                          logoText: "TEST",
                                          logoBg: "bg-gradient-to-br from-indigo-600 to-indigo-900"
                                        };
                                        setSelectedChannel(tempChannel);
                                        setActiveTab("live");
                                      }
                                    }}
                                    className="px-4 py-2.5 rounded-[10px] bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs transition-colors duration-200 active:scale-95 flex items-center gap-1 shrink-0"
                                  >
                                    <Play className="w-3.5 h-3.5 fill-white" />
                                    Phát thử
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {activeSettingSection === "design_system" && (() => {
                    const isMatched = (text: string) => {
                      const q = settingDetailSearchQuery.trim().toLowerCase();
                      if (!q) return true;
                      return text.toLowerCase().includes(q);
                    };

                    const matchButtons = isMatched("Button") || isMatched("nút") || isMatched("placeholder") || isMatched("bouncy-btn");
                    const matchSlider = isMatched("Slider") || isMatched("thanh trượt") || isMatched("âm lượng") || isMatched("volume");
                    const matchSwitch = isMatched("Switch") || isMatched("Pilled Toggle") || isMatched("công tắc") || isMatched("gạt") || isMatched("demoToggleState");
                    const matchDropdown = isMatched("Dropdown Menu") || isMatched("trình đơn") || isMatched("clock") || isMatched("check") || isMatched("placeholder item");
                    const matchDock = isMatched("Dock") || isMatched("thanh dock") || isMatched("home") || isMatched("trực tiếp") || isMatched("compass") || isMatched("activeDockDemoTab");
                    const matchModal = isMatched("Modal Pop-up") || isMatched("hộp thoại") || isMatched("popup") || isMatched("alert") || isMatched("backdrop") || isMatched("ios-blue") || isMatched("đồng ý") || isMatched("showDemoDesignSystemModal");
                    const matchBadges = isMatched("Icon Badges") || isMatched("nhãn biểu tượng") || isMatched("badge") || isMatched("icon");
                    const matchCheckbox = isMatched("Checkbox") || isMatched("hộp kiểm") || isMatched("tick") || isMatched("check");
                    const matchDivider = isMatched("Divider") || isMatched("phần tách") || isMatched("đường kẻ") || isMatched("vạch");
                    const matchProgress = isMatched("Progress") || isMatched("thanh tiến trình") || isMatched("xoay") || isMatched("loading");
                    const matchSnackbar = isMatched("Snackbar") || isMatched("notification toast") || isMatched("thông báo") || isMatched("toast");
                    const matchInput = isMatched("Input Field") || isMatched("ô nhập liệu") || isMatched("nhập") || isMatched("văn bản");
                    const matchTooltip = isMatched("Tooltip") || isMatched("chú giải") || isMatched("hover") || isMatched("giải thích");

                    const hasResults = matchButtons || matchSlider || matchSwitch || matchDropdown || matchDock || matchModal || matchBadges || matchCheckbox || matchDivider || matchProgress || matchSnackbar || matchInput || matchTooltip;

                    return (
                      <div className="space-y-8 animate-fade-in pb-12">
                        {/* Section Header with Search Bar */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                          <div className="flex items-center gap-3 text-left">
                            <div className="w-12 h-12 flex items-center justify-center shrink-0 text-white">
                              <Layers className="w-6 h-6 animate-pulse" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">Vplay Design components</h3>
                              <p className="text-xs text-white/60">Hệ thống ngôn ngữ thiết kế, tương tác và thành phần giao diện của Vplay.</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
                            {/* Color Picker Button */}
                            <label className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 hover:bg-white/15 transition-all duration-300 text-xs font-semibold text-white cursor-pointer select-none h-8.5 shrink-0">
                              <Palette className="w-3.5 h-3.5 text-white" />
                              <span className="text-[10px] font-mono leading-none">{designSystemThemeColor.toUpperCase()}</span>
                              <div 
                                className="w-3 h-3 rounded-full border border-white/20 shadow-sm shrink-0" 
                                style={{ backgroundColor: designSystemThemeColor }}
                              />
                              <input 
                                type="color" 
                                value={designSystemThemeColor} 
                                onChange={(e) => setDesignSystemThemeColor(e.target.value)} 
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" 
                              />
                            </label>

                            {/* Search bar */}
                            <div className="relative w-full md:w-[240px]">
                              <input
                                type="text"
                                value={settingDetailSearchQuery}
                                onChange={(e) => setSettingDetailSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm cài đặt..."
                                className="w-full pl-10 pr-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-white placeholder-white/45 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.3)] focus:outline-none focus:bg-white/15 focus:border-white/20 transition-all duration-300 text-left h-8.5"
                              />
                              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                                <img 
                                  src="https://static.wikia.nocookie.net/ftv/images/d/dc/Ass_glass.svg/revision/latest?cb=20260612062405&path-prefix=vi" 
                                  className="w-4 h-4 brightness-0 invert opacity-60" 
                                  referrerPolicy="no-referrer"
                                  alt="Search"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {!hasResults ? (
                          <div className="py-12 text-center text-white/50 space-y-2">
                            <AlertCircle className="w-10 h-10 mx-auto opacity-40 text-rose-400" />
                            <p className="text-sm font-semibold">Không tìm thấy kết quả phù hợp</p>
                            <p className="text-xs opacity-60">Hãy thử nhập từ khóa khác để tìm kiếm lại.</p>
                          </div>
                        ) : (
                          <div className="space-y-8">
                        
                            {/* 1. BUTTONS */}
                            {matchButtons && (
                              <div className="rounded-[20px] bg-[#1a162b] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.3)] p-6 space-y-4">
                                <div className="text-left">
                                  <h4 className="text-sm font-semibold text-white tracking-wide border-b border-white/5 pb-2">Button</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
                                  {/* Primary Button */}
                                  <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-[120px] p-4 text-left">
                                    <div>
                                      <span className="text-[11px] font-semibold text-amber-400 block">Primary button</span>
                                    </div>
                                    <div className="flex items-center justify-center h-full pt-3">
                                      <button className="px-4 py-2 rounded-full bg-[#ff9502] hover:bg-[#ffa31a] active:bg-[#e08300] text-white text-xs font-semibold select-none shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.3)] cursor-default transition-all duration-200 bouncy-btn">
                                        Interact me!
                                      </button>
                                    </div>
                                  </div>

                                  {/* Secondary Button */}
                                  <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-[120px] p-4 text-left">
                                    <div>
                                      <span className="text-[11px] font-semibold text-blue-400 block">Secondary button</span>
                                    </div>
                                    <div className="flex items-center justify-center h-full pt-3">
                                      <button className="px-4 py-2 rounded-full bg-[#007aff] hover:bg-[#0066d6] text-white text-xs font-semibold select-none shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.45)] cursor-default transition-all duration-200 bouncy-btn">
                                        Interact me!
                                      </button>
                                    </div>
                                  </div>

                                  {/* Quaternary Button (Swapped to 3rd position) */}
                                  <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-[120px] p-4 text-left">
                                    <div>
                                      <span className="text-[11px] font-semibold text-purple-400 block">Quaternary button</span>
                                    </div>
                                    <div className="flex items-center justify-center h-full pt-3">
                                      <button className="px-4 py-2 rounded-full bg-[#d0bcff] hover:bg-[#c2a8f9] active:bg-[#b093f4] text-[#381e72] text-xs font-bold select-none cursor-default transition-all duration-200 bouncy-btn">
                                        Interact me!
                                      </button>
                                    </div>
                                  </div>

                                  {/* Tertiary Button (Swapped to 4th position) */}
                                  <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-[120px] p-4 text-left">
                                    <div>
                                      <span className="text-[11px] font-semibold text-white/60 block">Tertiary button</span>
                                    </div>
                                    <div className="flex items-center justify-center h-full pt-3">
                                      <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 active:bg-white/20 text-white text-xs font-semibold select-none border border-white/10 cursor-default transition-all duration-200 bouncy-btn">
                                        Interact me!
                                      </button>
                                    </div>
                                  </div>

                                  {/* Destructive Button */}
                                  <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-[120px] p-4 text-left">
                                    <div>
                                      <span className="text-[11px] font-semibold text-red-400 block">Destructive button</span>
                                    </div>
                                    <div className="flex items-center justify-center h-full pt-3">
                                      <button className="px-4 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/25 text-red-400 border border-red-500/20 text-xs font-semibold select-none cursor-default transition-all duration-200 bouncy-btn">
                                        Interact me!
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                {/* Component Specs */}
                                <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Độ mờ (Blur)</div>
                                    <div className="text-xs font-semibold text-white/95 mt-1">0% (Không áp dụng)</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Độ trong (Opacity)</div>
                                    <div className="text-xs font-semibold text-white/95 mt-1">100% (Màu đặc) | 10% (Tertiary)</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Màu nền (Background)</div>
                                    <div className="text-xs font-semibold text-white/95 mt-1 font-mono text-[11px] select-all">#ff9502 | #007aff | #d0bcff</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Viền phản chiếu (Shiny Border)</div>
                                    <div className="text-xs font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                                      <Check className="w-4 h-4 stroke-[3]" /> Có (Shadow inset trắng 30%-45%)
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* 2. SLIDER */}
                            {matchSlider && (
                              <div className="rounded-[20px] bg-[#1a162b] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.3)] p-6 space-y-4">
                                <div className="text-left">
                                  <h4 className="text-sm font-semibold text-white tracking-wide border-b border-white/5 pb-2">Slider</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                                  {/* State: Default */}
                                  <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between h-28 p-4">
                                    <span className="text-[11px] font-semibold text-white/50 text-left">Default</span>
                                    <div className="flex items-center justify-center h-full px-2">
                                      <div className="relative w-full h-1 bg-white/10 rounded-full">
                                        <div className="bg-[#0084ff] h-full w-[45%] rounded-full" />
                                        <div className="absolute top-1/2 left-[45%] -translate-y-1/2 -translate-x-1/2 w-6 h-2 rounded-full bg-white shadow-md border border-white/70" />
                                      </div>
                                    </div>
                                  </div>

                                  {/* State: Hover */}
                                  <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between h-28 p-4">
                                    <span className="text-[11px] font-semibold text-teal-400 text-left">Hover</span>
                                    <div className="flex items-center justify-center h-full px-2">
                                      <div className="relative w-full h-1 bg-white/15 rounded-full">
                                        <div className="bg-[#0084ff] h-full w-[45%] rounded-full" />
                                        <div className="absolute top-1/2 left-[45%] -translate-y-1/2 -translate-x-1/2 w-7 h-2.5 rounded-full bg-white shadow-lg scale-110 transition-all" />
                                      </div>
                                    </div>
                                  </div>

                                  {/* State: Pressed */}
                                  <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between h-28 p-4">
                                    <span className="text-[11px] font-semibold text-indigo-400 text-left">Pressed</span>
                                    <div className="flex items-center justify-center h-full px-2">
                                      <div className="relative w-full h-1 bg-white/20 rounded-full">
                                        <div className="bg-[#0084ff] h-full w-[45%] rounded-full" />
                                        <div className="absolute top-1/2 left-[45%] -translate-y-1/2 -translate-x-1/2 w-8 h-3 rounded-full bg-white shadow-2xl scale-120 transition-all" />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Live Playground */}
                                  <div className="rounded-[12px] bg-indigo-500/10 border border-indigo-500/20 flex flex-col justify-between h-28 p-4">
                                    <span className="text-[11px] font-semibold text-indigo-300 text-left">Live interaction</span>
                                    <div className="flex items-center justify-center h-full">
                                      <div className="flex items-center w-full justify-center px-2">
                                        <input
                                          type="range"
                                          min="0"
                                          max="1"
                                          step="0.01"
                                          value={demoSliderVal}
                                          onChange={(e) => setDemoSliderVal(Number(e.target.value))}
                                          className="w-full h-1 rounded-lg appearance-none cursor-default transition-all range-slider-pill outline-none"
                                          style={{
                                            background: `linear-gradient(to right, #0084ff ${demoSliderVal * 100}%, rgba(255, 255, 255, 0.2) ${demoSliderVal * 100}%)`
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Component Specs */}
                                <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Độ mờ (Blur)</div>
                                    <div className="text-xs font-semibold text-white/95 mt-1">0% (Không áp dụng)</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Độ trong (Opacity)</div>
                                    <div className="text-xs font-semibold text-white/95 mt-1">10% (Track) | 100% (Thumb)</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Màu nền (Background)</div>
                                    <div className="text-xs font-semibold text-white/95 mt-1 font-mono text-[11px] select-all">#0084ff (Active) | rgba(255,255,255,0.1)</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Viền phản chiếu (Shiny Border)</div>
                                    <div className="text-xs font-semibold text-red-400 mt-1 flex items-center gap-1">
                                      <span className="font-bold">✕</span> Không
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* 3. TOGGLE SWITCH */}
                            {matchSwitch && (
                              <div className="rounded-[20px] bg-[#1a162b] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.3)] p-6 space-y-4">
                                <div className="text-left">
                                  <h4 className="text-sm font-semibold text-white tracking-wide border-b border-white/5 pb-2">Toggle Switch</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                                  {/* State: Default / Off */}
                                  <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between h-28 p-4">
                                    <span className="text-[11px] font-semibold text-white/50 text-left">Default</span>
                                    <div className="flex items-center justify-center h-full">
                                      <div className="w-12 h-6 rounded-full p-0.5 bg-[#3a3a3c] flex items-center">
                                        <div className="relative w-6 h-5 flex items-center justify-center">
                                          <div className="w-full h-full rounded-full bg-white shadow-md" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* State: Hover */}
                                  <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between h-28 p-4">
                                    <span className="text-[11px] font-semibold text-teal-400 text-left">Hover</span>
                                    <div className="flex items-center justify-center h-full">
                                      <div className="w-12 h-6 rounded-full p-0.5 bg-[#3a3a3c] flex items-center">
                                        <div className="relative w-6 h-5 flex items-center justify-center scale-110 transition-all">
                                          <div className="absolute -inset-2 rounded-full bg-white/15 scale-100 transition-all pointer-events-none" />
                                          <div className="w-full h-full rounded-full bg-transparent border-white border backdrop-blur-md shadow-md" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* State: Pressed / On */}
                                  <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between h-28 p-4">
                                    <span className="text-[11px] font-semibold text-indigo-400 text-left">Pressed</span>
                                    <div className="flex items-center justify-center h-full">
                                      <div className="w-12 h-6 rounded-full p-0.5 bg-[#34c759] flex items-center justify-end">
                                        <div className="relative w-6 h-5 flex items-center justify-center">
                                          <div className="w-full h-full rounded-full bg-white shadow-md" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Live Playground */}
                                  <div className="rounded-[12px] bg-indigo-500/10 border border-indigo-500/20 flex flex-col justify-between h-28 p-4">
                                    <span className="text-[11px] font-semibold text-indigo-300 text-left">Live interaction</span>
                                    <div className="flex items-center justify-center h-full">
                                      <button
                                        onClick={() => setDemoToggleState(!demoToggleState)}
                                        className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none relative cursor-pointer flex items-center ${
                                          demoToggleState ? "bg-[#34c759]" : "bg-[#3a3a3c]"
                                        }`}
                                      >
                                        <motion.div
                                          animate={{ x: demoToggleState ? 20 : 0 }}
                                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                          className="relative w-6 h-5 flex items-center justify-center group"
                                        >
                                          <div className="absolute -inset-2 rounded-full bg-white/15 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 pointer-events-none" />
                                          <div className="w-full h-full rounded-full bg-white border border-transparent transition-all duration-300 shadow-md z-10 group-hover:scale-110 group-hover:bg-transparent group-hover:backdrop-blur-md group-hover:border-white/95" />
                                        </motion.div>
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                {/* Component Specs */}
                                <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Độ mờ (Blur)</div>
                                    <div className="text-xs font-semibold text-white/95 mt-1">0% (Không áp dụng)</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Độ trong (Opacity)</div>
                                    <div className="text-xs font-semibold text-white/95 mt-1">100% (Màu đặc)</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Màu nền (Background)</div>
                                    <div className="text-xs font-semibold text-white/95 mt-1 font-mono text-[11px] select-all">#3a3a3c (Tắt) | #34c759 (Bật)</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Viền phản chiếu (Shiny Border)</div>
                                    <div className="text-xs font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                                      <Check className="w-4 h-4 stroke-[3]" /> Có (Viền trắng 95% ở thumb hover)
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* 4. DROPDOWN MENU */}
                            {matchDropdown && (
                              <div className="rounded-[20px] bg-[#1a162b] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.3)] p-6 space-y-4">
                                <div className="text-left">
                                  <h4 className="text-sm font-semibold text-white tracking-wide border-b border-white/5 pb-2">Dropdown Menu</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                                  {/* State: Default */}
                                  <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                    <span className="text-[11px] font-semibold text-white/50 text-left">Default</span>
                                    <div className="py-2.5 px-4 rounded-xl bg-white/5 text-xs text-white/80 flex items-center gap-2.5 select-none text-left mt-2">
                                      <Clock className="w-4 h-4 text-white/60" />
                                      <span>Placeholder Item</span>
                                    </div>
                                  </div>

                                  {/* State: Hover */}
                                  <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                    <span className="text-[11px] font-semibold text-teal-400 text-left">Hover</span>
                                    <div className="py-2.5 px-4 rounded-xl bg-white/15 text-xs text-white flex items-center justify-between gap-2.5 select-none shadow-sm text-left mt-2">
                                      <div className="flex items-center gap-2.5">
                                        <Clock className="w-4 h-4 text-white" />
                                        <span>Placeholder Item</span>
                                      </div>
                                      <Check className="w-4 h-4 text-teal-400 stroke-[3]" />
                                    </div>
                                  </div>

                                  {/* State: Pressed */}
                                  <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                    <span className="text-[11px] font-semibold text-indigo-400 text-left">Pressed</span>
                                    <div className="py-2.5 px-4 rounded-xl bg-white/25 text-xs text-white/70 flex items-center gap-2.5 scale-97 select-none text-left mt-2">
                                      <Clock className="w-4 h-4 text-white/40" />
                                      <span>Placeholder Item</span>
                                    </div>
                                  </div>

                                  {/* Live Playground */}
                                  <div className="rounded-[12px] bg-indigo-500/10 border border-indigo-500/20 flex flex-col justify-between min-h-28 p-4 relative">
                                    <span className="text-[11px] font-semibold text-indigo-300 text-left">Live interaction</span>
                                    <div className="relative mt-2 z-30">
                                      <button 
                                        onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                                        className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/15 active:bg-white/25 text-xs text-white/95 hover:text-white flex items-center justify-between gap-2.5 transition-all duration-150 active:scale-97 cursor-pointer text-left border border-white/5"
                                      >
                                        <span className="flex items-center gap-2.5">
                                          <Clock className="w-4 h-4 text-indigo-300" />
                                          <span>Chọn thời gian</span>
                                        </span>
                                        <ChevronDown className={`w-4 h-4 text-indigo-300 transition-transform duration-200 ${demoDropdownOpen ? "rotate-180" : ""}`} />
                                      </button>
                                      
                                      <AnimatePresence>
                                        {demoDropdownOpen && (
                                          <motion.div
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute left-0 right-0 mt-1.5 rounded-xl bg-[#211f26] border border-white/10 shadow-xl overflow-hidden py-1"
                                          >
                                            {["Bản tin Sáng", "Bản tin Trưa", "Bản tin Chiều", "Bản tin Tối"].map((item, idx) => (
                                              <button
                                                key={item}
                                                onClick={() => setDemoDropdownOpen(false)}
                                                className="w-full py-2 px-3 text-left text-xs text-white/80 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors cursor-pointer"
                                              >
                                                <span>{item}</span>
                                                {idx === 0 && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                                              </button>
                                            ))}
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </div>
                                </div>

                                {/* Component Specs */}
                                <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Độ mờ (Blur)</div>
                                    <div className="text-xs font-semibold text-white/95 mt-1">0% (Không áp dụng)</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Độ trong (Opacity)</div>
                                    <div className="text-xs font-semibold text-white/95 mt-1">5% (Default) | 15% (Hover)</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Màu nền (Background)</div>
                                    <div className="text-xs font-semibold text-white/95 mt-1 font-mono text-[11px] select-all">rgba(255,255,255,0.05)</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Viền phản chiếu (Shiny Border)</div>
                                    <div className="text-xs font-semibold text-red-400 mt-1 flex items-center gap-1">
                                      <span className="font-bold">✕</span> Không
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* 5. DOCK */}
                            {matchDock && (
                              <div className="rounded-[20px] bg-[#1a162b] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.3)] p-6 space-y-4">
                                <div className="text-left">
                                  <h4 className="text-sm font-semibold text-white tracking-wide border-b border-white/5 pb-2">Dock</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                                  {/* State: Default */}
                                  <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                    <span className="text-[11px] font-semibold text-white/50 text-left">Default</span>
                                    <div className="flex items-center justify-center py-2 h-full">
                                      <div className="relative flex flex-col items-center justify-center h-12 w-20 text-white/65">
                                        <Home className="w-6 h-6 stroke-[1.8]" />
                                      </div>
                                    </div>
                                  </div>

                                  {/* State: Hover */}
                                  <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                    <span className="text-[11px] font-semibold text-teal-400 text-left">Hover</span>
                                    <div className="flex items-center justify-center py-2 h-full">
                                      <div className="relative flex flex-col items-center justify-center h-12 w-20 text-white scale-[1.18] transition-transform duration-300">
                                        <Home className="w-6 h-6 stroke-[2]" />
                                      </div>
                                    </div>
                                  </div>

                                  {/* State: Pressed */}
                                  <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                    <span className="text-[11px] font-semibold text-indigo-400 text-left">Pressed</span>
                                    <div className="flex items-center justify-center py-2 h-full">
                                      <div className="relative flex flex-col items-center justify-center h-12 w-20 text-indigo-950 font-medium z-10 scale-[1.05] transition-all">
                                        <div className="absolute inset-0 bg-white/50 rounded-full shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.8),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.3),0_4px_12px_rgba(0,0,0,0.15)] -z-10" />
                                        <Home className="w-6 h-6 stroke-[2.2] text-indigo-950" />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Live Playground */}
                                  <div className="rounded-[12px] bg-indigo-500/10 border border-indigo-500/20 flex flex-col justify-between min-h-28 p-4">
                                    <span className="text-[11px] font-semibold text-indigo-300 text-left">Live interaction</span>
                                    <div className="flex items-center justify-center h-full">
                                      <div className="h-14 rounded-full bg-white/[0.12] backdrop-blur-[25px] saturate-[185%] border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-around px-2 py-1 relative w-full max-w-[200px]">
                                        {[
                                          { id: "home", icon: Home, label: "Home" },
                                          { id: "live", icon: Compass, label: "Trực tiếp" }
                                        ].map((tab) => {
                                          const isActive = activeDockDemoTab === tab.id;
                                          const Icon = tab.icon;
                                          return (
                                            <button
                                              key={tab.id}
                                              onClick={() => setActiveDockDemoTab(tab.id)}
                                              className={`relative flex flex-col items-center justify-center flex-1 h-full cursor-pointer z-10 bouncy-btn px-2 transition-all duration-300 ${
                                                isActive ? "text-indigo-950 font-normal" : "text-white/65 hover:text-white"
                                              }`}
                                            >
                                              {isActive && (
                                                <motion.div
                                                  layoutId="demoActiveTabPill"
                                                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                                  className="absolute inset-y-1 inset-x-1 bg-white/50 rounded-full shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.8),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.3),0_4px_12px_rgba(0,0,0,0.15)] -z-10"
                                                />
                                              )}
                                              <Icon className="w-5.5 h-5.5" />
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Component Specs */}
                                <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Độ mờ (Blur)</div>
                                    <div className="text-xs font-semibold text-white/95 mt-1">25px (backdrop-blur-[25px])</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Độ trong (Opacity)</div>
                                    <div className="text-xs font-semibold text-white/95 mt-1">12% background | 65% icon</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Màu nền (Background)</div>
                                    <div className="text-xs font-semibold text-white/95 mt-1 font-mono text-[11px] select-all">rgba(255,255,255,0.12)</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Viền phản chiếu (Shiny Border)</div>
                                    <div className="text-xs font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                                      <Check className="w-4 h-4 stroke-[3]" /> Có (Border trắng opacity 20%)
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                             {/* 6. MODAL POP-UP */}
                             {matchModal && (
                               <div className="rounded-[20px] bg-[#1a162b] shadow-[0_12px_40px_rgba(0,0,0,0.3)] p-6 space-y-4">
                                 <div className="text-left">
                                   <h4 className="text-sm font-semibold text-white tracking-wide border-b border-white/5 pb-2">Modal Pop-up</h4>
                                 </div>
                                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                                   {/* State: Alert Container */}
                                   <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-white/50 text-left">Alert Container</span>
                                     <div className="my-auto p-3 rounded-[20px] bg-[#211f26] text-white shadow-xl text-left space-y-2">
                                       <div>
                                         <div className="text-[11px] font-bold text-white/95">Vplay Alert</div>
                                         <div className="text-[9px] text-white/60 mt-0.5 line-clamp-1">Trải nghiệm giao diện đồng bộ</div>
                                       </div>
                                       <div className="py-1 px-3.5 rounded-full bg-[#d0bcff] text-[#381e72] font-bold text-[9px] text-center">
                                         Đồng ý
                                       </div>
                                     </div>
                                   </div>

                                   {/* State: Alert Backdrop */}
                                   <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-teal-400 text-left">Backdrop Blur</span>
                                     <div className="my-auto p-2 rounded-[12px] bg-black/40 backdrop-blur-[20px] border border-white/5 text-center text-white text-[10px] select-none">
                                       backdrop-blur-[20px]
                                     </div>
                                   </div>

                                   {/* State: Purple Button */}
                                   <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-purple-400 text-left">Purple Button</span>
                                     <div className="my-auto py-1.5 px-3 rounded-full bg-[#d0bcff] text-[#381e72] font-bold text-[11px] text-center shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.45)] select-none">
                                       Đồng ý
                                     </div>
                                   </div>

                                   {/* Live Playground */}
                                   <div className="rounded-[12px] bg-indigo-500/10 border border-indigo-500/20 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-indigo-300 text-left">Live interaction</span>
                                     <div className="flex items-center justify-center h-full">
                                       <button
                                         onClick={() => setShowDemoDesignSystemModal(true)}
                                         className="w-full py-2 px-3 rounded-full bg-[#d0bcff] hover:bg-[#c2a8f9] active:scale-95 transition-all text-[#381e72] font-bold text-xs text-center cursor-pointer shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.45)]"
                                       >
                                         Hiện thử nghiệm Popup
                                       </button>
                                     </div>
                                   </div>
                                 </div>

                                 {/* Component Specs */}
                                 <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                                   <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                     <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Độ mờ (Blur)</div>
                                     <div className="text-xs font-semibold text-white/95 mt-1">20px (backdrop-blur-[20px])</div>
                                   </div>
                                   <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                     <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Độ trong (Opacity)</div>
                                     <div className="text-xs font-semibold text-white/95 mt-1">100% container | 40% backdrop</div>
                                   </div>
                                   <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                     <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Màu nền (Background)</div>
                                     <div className="text-xs font-semibold text-white/95 mt-1 font-mono text-[11px] select-all">#211f26 (Hộp thoại) | #000000 (Backdrop)</div>
                                   </div>
                                   <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                     <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Viền phản chiếu (Shiny Border)</div>
                                     <div className="text-xs font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                                       <Check className="w-4 h-4 stroke-[3]" /> Có (Border trắng opacity 10%)
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             )}

                             {/* 7. ICON BADGES */}
                             {matchBadges && (
                               <div className="rounded-[20px] bg-[#1a162b] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.3)] p-6 space-y-4 text-left">
                                 <div>
                                   <h4 className="text-sm font-semibold text-white tracking-wide border-b border-white/5 pb-2">Icon Badges</h4>
                                 </div>
                                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                                   {/* Style 1: Live badge */}
                                   <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-white/50">Trực tiếp (Live)</span>
                                     <div className="flex items-center justify-center h-full">
                                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-[10px] font-bold text-red-400 select-none uppercase tracking-wider">
                                         <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                         Trực tiếp
                                       </span>
                                     </div>
                                   </div>

                                   {/* Style 2: Tech Badge */}
                                   <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-teal-400">Độ phân giải (HD)</span>
                                     <div className="flex items-center justify-center h-full">
                                       <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-white/90 select-none tracking-wide">
                                         1080P HD
                                       </span>
                                     </div>
                                   </div>

                                   {/* Style 3: Crown Premium */}
                                   <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-amber-400">Đặc quyền (Premium)</span>
                                     <div className="flex items-center justify-center h-full">
                                       <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-400 select-none">
                                         <Crown className="w-3 h-3 text-amber-400" />
                                         Premium
                                       </span>
                                     </div>
                                   </div>

                                   {/* Live Playground */}
                                   <div className="rounded-[12px] bg-indigo-500/10 border border-indigo-500/20 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-indigo-300">Live interaction</span>
                                     <div className="flex items-center justify-center h-full gap-2">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d0bcff]/20 text-[#d0bcff] font-bold text-[10px] select-none shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.15)] animate-bounce">
                                          <Sparkles className="w-3 h-3 text-[#d0bcff]" />
                                          Tương tác
                                        </span>
                                     </div>
                                   </div>
                                 </div>

                                 {/* Component Specs */}
                                 <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                                   <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                     <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Độ mờ (Blur)</div>
                                     <div className="text-xs font-semibold text-white/95 mt-1">0% (Không áp dụng)</div>
                                   </div>
                                   <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                     <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Độ trong (Opacity)</div>
                                     <div className="text-xs font-semibold text-white/95 mt-1">5% - 15% Nền</div>
                                   </div>
                                   <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                     <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Màu nền (Background)</div>
                                     <div className="text-xs font-semibold text-white/95 mt-1 font-mono text-[11px] select-all">rgba(255,255,255,0.05)</div>
                                   </div>
                                   <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                     <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Viền phản chiếu</div>
                                     <div className="text-xs font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                                       <Check className="w-4 h-4 stroke-[3]" /> Có (Border mảnh opacity 10%)
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             )}

                             {/* 8. CHECKBOX */}
                             {matchCheckbox && (
                               <div className="rounded-[20px] bg-[#1a162b] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.3)] p-6 space-y-4 text-left">
                                 <div>
                                   <h4 className="text-sm font-semibold text-white tracking-wide border-b border-white/5 pb-2">Checkbox</h4>
                                 </div>
                                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                                   {/* Unchecked */}
                                   <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-white/50">Default Off</span>
                                     <div className="flex items-center justify-center h-full">
                                       <div className="w-5 h-5 rounded bg-white/5 border border-white/20" />
                                     </div>
                                   </div>

                                   {/* Checked */}
                                   <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-teal-400">Default On</span>
                                     <div className="flex items-center justify-center h-full">
                                       <div className="w-5 h-5 rounded bg-[#d0bcff] flex items-center justify-center text-[#381e72]">
                                         <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                                       </div>
                                     </div>
                                   </div>

                                   {/* Disabled */}
                                   <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-indigo-400">Disabled Checked</span>
                                     <div className="flex items-center justify-center h-full opacity-40">
                                       <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center text-white/40">
                                         <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                                       </div>
                                     </div>
                                   </div>

                                   {/* Live Playground */}
                                   <div className="rounded-[12px] bg-indigo-500/10 border border-indigo-500/20 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-indigo-300">Live interaction</span>
                                     <div className="flex items-center justify-center h-full">
                                       <button 
                                         onClick={() => setDemoCheckboxState(!demoCheckboxState)}
                                         className="flex items-center gap-2.5 group cursor-pointer focus:outline-none select-none"
                                       >
                                         <div className={`w-5 h-5 rounded flex items-center justify-center transition-all duration-200 bouncy-btn ${
                                           demoCheckboxState ? "bg-[#d0bcff] text-[#381e72]" : "bg-white/5 border border-white/25 group-hover:bg-white/10 group-hover:border-white/40"
                                         }`}>
                                           {demoCheckboxState && (
                                             <motion.div
                                               initial={{ scale: 0.4, opacity: 0 }}
                                               animate={{ scale: 1, opacity: 1 }}
                                               transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                             >
                                               <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                                             </motion.div>
                                           )}
                                         </div>
                                         <span className="text-xs text-white/80 group-hover:text-white transition-colors">Chọn mục này</span>
                                       </button>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             )}

                             {/* 9. DIVIDER */}
                             {matchDivider && (
                               <div className="rounded-[20px] bg-[#1a162b] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.3)] p-6 space-y-4 text-left">
                                 <div>
                                   <h4 className="text-sm font-semibold text-white tracking-wide border-b border-white/5 pb-2">Divider (horizontal & vertical)</h4>
                                 </div>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                   {/* Horizontal Divider */}
                                   <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-white/50">Horizontal Divider</span>
                                     <div className="flex flex-col justify-center h-full gap-2">
                                       <span className="text-[10px] text-white/40">Khung trên</span>
                                       <div className="h-px bg-white/10 w-full" />
                                       <span className="text-[10px] text-white/40">Khung dưới</span>
                                     </div>
                                   </div>

                                   {/* Vertical Divider */}
                                   <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-teal-400">Vertical Divider</span>
                                     <div className="flex items-center justify-center h-full gap-4">
                                       <span className="text-[10px] text-white/40">Kênh 1</span>
                                       <div className="w-px h-6 bg-white/10" />
                                       <span className="text-[10px] text-white/40">Kênh 2</span>
                                       <div className="w-px h-6 bg-white/10" />
                                       <span className="text-[10px] text-white/40">Kênh 3</span>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             )}

                             {/* 10. PROGRESS */}
                             {matchProgress && (
                               <div className="rounded-[20px] bg-[#1a162b] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.3)] p-6 space-y-4 text-left">
                                 <div>
                                   <h4 className="text-sm font-semibold text-white tracking-wide border-b border-white/5 pb-2">Progress</h4>
                                 </div>
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                                   {/* Progress Bar */}
                                   <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-white/50">Progress Bar (75%)</span>
                                     <div className="flex items-center justify-center h-full px-1">
                                       <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden relative">
                                         <div className="h-full bg-[#d0bcff] rounded-full" style={{ width: "75%" }} />
                                       </div>
                                     </div>
                                   </div>

                                   {/* Spinning Animation */}
                                   <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-teal-400">Spinning Animation</span>
                                     <div className="flex items-center justify-center h-full">
                                       <Loader2 className="w-6 h-6 text-[#d0bcff] animate-spin" />
                                     </div>
                                   </div>

                                   {/* Live Playground */}
                                   <div className="rounded-[12px] bg-indigo-500/10 border border-indigo-500/20 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-indigo-300">Live interaction</span>
                                     <div className="flex flex-col justify-center h-full gap-3">
                                       <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden relative">
                                         <motion.div 
                                           animate={{ width: `${demoSliderVal * 100}%` }}
                                           transition={{ type: "spring", stiffness: 120, damping: 15 }}
                                           className="h-full bg-[#d0bcff] rounded-full" 
                                         />
                                       </div>
                                       <div className="text-[10px] text-white/60 text-center font-mono">
                                         Tiến độ: {Math.round(demoSliderVal * 100)}%
                                       </div>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             )}

                             {/* 11. SNACKBAR */}
                             {matchSnackbar && (
                               <div className="rounded-[20px] bg-[#1a162b] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.3)] p-6 space-y-4 text-left">
                                 <div>
                                   <h4 className="text-sm font-semibold text-white tracking-wide border-b border-white/5 pb-2">Snackbar (Notification Toast)</h4>
                                 </div>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                   {/* Design Specs */}
                                   <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-white/50">Giao diện mẫu</span>
                                     <div className="my-auto py-2.5 px-4 rounded-full bg-[#211f26] border border-white/10 text-white text-[11.5px] font-medium tracking-wide shadow-lg flex items-center justify-between gap-3 max-w-[280px] mx-auto select-none">
                                       <span className="flex items-center gap-1.5">
                                         <Bell className="w-3.5 h-3.5 text-amber-400" />
                                         Đã kết nối máy chủ
                                       </span>
                                       <X className="w-3 h-3 text-white/45" />
                                     </div>
                                   </div>

                                   {/* Live Playground */}
                                   <div className="rounded-[12px] bg-indigo-500/10 border border-indigo-500/20 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-indigo-300">Live interaction</span>
                                     <div className="flex items-center justify-center h-full">
                                       <button 
                                         onClick={() => {
                                           setDemoSnackbarVisible(true);
                                           setTimeout(() => setDemoSnackbarVisible(false), 3000);
                                         }}
                                         className="px-4 py-2 rounded-full bg-[#d0bcff] hover:bg-[#c2a8f9] text-[#381e72] font-bold text-xs select-none cursor-pointer bouncy-btn"
                                       >
                                         Kích hoạt Snackbar
                                       </button>
                                     </div>
                                   </div>
                                 </div>

                                 {/* Floating Real Demonstration */}
                                 <AnimatePresence>
                                   {demoSnackbarVisible && (
                                     <motion.div
                                       initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                       animate={{ opacity: 1, y: 0, scale: 1 }}
                                       exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                       transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                       className="fixed bottom-26 left-1/2 -translate-x-1/2 z-[150] px-4 py-2.5 rounded-full bg-black/85 backdrop-blur-md border border-white/10 text-white text-[12px] font-semibold tracking-wide shadow-2xl flex items-center gap-2 select-none pointer-events-auto"
                                     >
                                       <Bell className="w-4 h-4 text-[#d0bcff] animate-bounce" />
                                       <span>Chào mừng đến với Vplay Design System!</span>
                                       <button 
                                         onClick={() => setDemoSnackbarVisible(false)}
                                         className="ml-1 w-5 h-5 rounded-full hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white"
                                       >
                                         <X className="w-3.5 h-3.5" />
                                       </button>
                                     </motion.div>
                                   )}
                                 </AnimatePresence>
                               </div>
                             )}

                             {/* 12. INPUT FIELD */}
                             {matchInput && (
                               <div className="rounded-[20px] bg-[#1a162b] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.3)] p-6 space-y-4 text-left">
                                 <div>
                                   <h4 className="text-sm font-semibold text-white tracking-wide border-b border-white/5 pb-2">Input Field</h4>
                                 </div>
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                                   {/* Default */}
                                   <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-white/50">Default state</span>
                                     <div className="mt-2 py-2 px-3 rounded-xl bg-white/5 text-xs text-white/40 border border-white/5 select-none">
                                       Nhập nội dung...
                                     </div>
                                   </div>

                                   {/* Warning / Error */}
                                   <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-red-400">Error state</span>
                                     <div className="mt-2 py-2 px-3 rounded-xl bg-red-500/5 text-xs text-red-400 border border-red-500/30 select-none">
                                       Lỗi nhập liệu
                                     </div>
                                   </div>

                                   {/* Live Playground */}
                                   <div className="rounded-[12px] bg-indigo-500/10 border border-indigo-500/20 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-indigo-300">Live interaction</span>
                                     <div className="relative mt-2">
                                       <input 
                                         type="text"
                                         value={demoInputText}
                                         onChange={(e) => setDemoInputText(e.target.value)}
                                         placeholder="Gõ gì đó..."
                                         className="w-full py-2 pl-3 pr-8 rounded-xl bg-white/5 hover:bg-white/10 focus:bg-white/15 focus:outline-none border border-white/15 focus:border-[#d0bcff] text-xs text-white transition-all text-left"
                                       />
                                       {demoInputText && (
                                         <button 
                                           onClick={() => setDemoInputText("")}
                                           className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full hover:bg-white/10 flex items-center justify-center text-white/45 hover:text-white"
                                         >
                                           <X className="w-3.5 h-3.5" />
                                         </button>
                                       )}
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             )}

                             {/* 13. TOOLTIP */}
                             {matchTooltip && (
                               <div className="rounded-[20px] bg-[#1a162b] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.3)] p-6 space-y-4 text-left">
                                 <div>
                                   <h4 className="text-sm font-semibold text-white tracking-wide border-b border-white/5 pb-2">Tooltip</h4>
                                 </div>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                   {/* Visual Style */}
                                   <div className="rounded-[12px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-28 p-4">
                                     <span className="text-[11px] font-semibold text-white/50">Visual Design Spec</span>
                                     <div className="my-auto px-3 py-1.5 rounded-lg bg-[#211f26] border border-white/10 shadow-lg text-[10px] text-white/90 max-w-[150px] mx-auto select-none relative text-center">
                                       Đây là chú giải Tooltip
                                       <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[5px] border-t-[#211f26]" />
                                     </div>
                                   </div>

                                   {/* Live Playground */}
                                   <div className="rounded-[12px] bg-indigo-500/10 border border-indigo-500/20 flex flex-col justify-between min-h-28 p-4 relative">
                                     <span className="text-[11px] font-semibold text-indigo-300">Live interaction</span>
                                     <div className="flex items-center justify-center h-full">
                                       <div 
                                         onMouseEnter={() => setDemoTooltipVisible(true)}
                                         onMouseLeave={() => setDemoTooltipVisible(false)}
                                         className="relative inline-block"
                                       >
                                         <button className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs select-none cursor-default">
                                           Rê chuột vào tôi
                                         </button>
                                         <AnimatePresence>
                                           {demoTooltipVisible && (
                                             <motion.div
                                               initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                               animate={{ opacity: 1, y: 0, scale: 1 }}
                                               exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                               transition={{ duration: 0.15 }}
                                               className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-[#211f26] border border-white/10 shadow-lg text-[11px] text-white select-none whitespace-nowrap z-50 text-center"
                                             >
                                               Chú giải hiển thị chi tiết!
                                               <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[5px] border-t-[#211f26]" />
                                             </motion.div>
                                           )}
                                         </AnimatePresence>
                                       </div>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             )}

                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {activeSettingSection === "plugin_store" && (
                    <div className="space-y-6 animate-fade-in pb-12">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 flex items-center justify-center shrink-0 text-white">
                            <Puzzle className="w-6 h-6 animate-pulse text-amber-400" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg font-semibold text-white">Cửa hàng tiện ích</h3>
                            <p className="text-xs text-white/60">Cài đặt và quản lý các gói tiện ích mở rộng cao cấp của Vplay.</p>
                          </div>
                        </div>
                        {/* Search Bar Styled like Design System with custom glass icon */}
                        <div className="relative w-full md:max-w-[280px]">
                          <input
                            type="text"
                            value={pluginSearchQuery}
                            onChange={(e) => setPluginSearchQuery(e.target.value)}
                            placeholder="Tìm kiếm tiện ích..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-white placeholder-white/40 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.3)] focus:outline-none focus:bg-white/15 focus:border-white/20 transition-all duration-300 text-left"
                          />
                          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                            <img 
                              src="https://static.wikia.nocookie.net/ftv/images/d/dc/Ass_glass.svg/revision/latest?cb=20260612062405&path-prefix=vi" 
                              className="w-4 h-4 brightness-0 invert opacity-60" 
                              referrerPolicy="no-referrer"
                              alt="Search"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {(() => {
                          const pluginsList = [
                            {
                              id: "export_stream",
                              title: "Xuất luồng",
                              subtitle: "Hỗ trợ xuất bản danh sách phát m3u8",
                              desc: "Xuất lưu toàn bộ danh sách kênh truyền hình được cung cấp bởi Vplay thành tệp tin đuôi .m3u8 để sử dụng bất cứ lúc nào.",
                              icon: Download,
                              color: "from-blue-500/10 to-indigo-500/5 hover:border-blue-500/20"
                            },
                            {
                              id: "multiview",
                              title: "Multiview Grid",
                              subtitle: "Hỗ trợ xem tối đa 4 kênh cùng lúc",
                              desc: "Hỗ trợ chia nhỏ các luồng kênh, xem đồng thời lên tới 9 kênh cùng lúc.",
                              icon: Grid,
                              color: "from-amber-500/10 to-orange-500/5 hover:border-amber-500/20"
                            },
                            {
                              id: "pip",
                              title: "Picture in Picture",
                              subtitle: "Hỗ trợ chế độ cửa sổ nổi thu nhỏ",
                              desc: "Kích hoạt chế độ cửa sổ nổi, cho phép tiếp tục theo dõi chương trình TV yêu thích ở góc màn hình khi đang làm việc hoặc lướt web.",
                              icon: Layers,
                              color: "from-teal-500/10 to-emerald-500/5 hover:border-teal-500/20"
                            },
                            {
                              id: "open_native",
                              title: "Mở luồng gốc",
                              subtitle: "Hỗ trợ phát luồng trực tiếp bên ngoài",
                              desc: "Hỗ trợ sao chép URL phát sóng và mở xem trực tiếp luồng stream gốc (.m3u8/hls).",
                              icon: Tv,
                              color: "from-pink-500/10 to-rose-500/5 hover:border-pink-500/20"
                            },
                            {
                              id: "quick_switch",
                              title: "Chuyển kênh nhanh",
                              subtitle: "Bàn phím ảo chuyển kênh bằng phím số",
                              desc: "Kích hoạt tính năng bàn phím ảo cho phép chuyển kênh nhanh bằng cách nhập số vị trí kênh (VD: 001, 002, 003, v.v...)",
                              icon: Puzzle,
                              color: "from-purple-500/10 to-fuchsia-500/5 hover:border-purple-500/20"
                            },
                            {
                              id: "add_custom",
                              title: "Thêm kênh mới",
                              subtitle: "Hỗ trợ dán liên kết luồng phát m3u8 ngoài",
                              desc: "Hỗ trợ nhập và lưu trữ danh sách các kênh truyền hình riêng tư từ luồng m3u8 bên ngoài một cách thuận tiện.",
                              icon: Plus,
                              color: "from-orange-500/10 to-amber-500/5 hover:border-orange-500/20"
                            }
                          ];

                          // Sort alphabetically (A-Z) by title
                          const sortedList = [...pluginsList].sort((a, b) => a.title.localeCompare(b.title, 'vi'));

                          // Filter by pluginSearchQuery
                          const filteredList = sortedList.filter((p) => {
                            const query = pluginSearchQuery.trim().toLowerCase();
                            if (!query) return true;
                            return p.title.toLowerCase().includes(query) || 
                                   p.subtitle.toLowerCase().includes(query) || 
                                   p.desc.toLowerCase().includes(query);
                          });

                          if (filteredList.length === 0) {
                            return (
                              <div className="text-center py-12 text-white/40 text-sm">
                                Không tìm thấy tiện ích phù hợp với từ khóa tìm kiếm.
                              </div>
                            );
                          }

                          return filteredList.map((plugin) => {
                            const Icon = plugin.icon;
                            const status = installedPlugins[plugin.id] || "idle";
                            const maxTime = status === "installing" ? 30 : 10;
                            const timeLeft = pluginProgress[plugin.id] ?? maxTime;

                            return (
                              <div 
                                key={plugin.id}
                                className={`rounded-[20px] bg-gradient-to-r ${plugin.color} border border-white/10 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all duration-300 relative overflow-hidden`}
                              >
                                {/* Left / Center Info */}
                                <div className="flex items-start gap-4 flex-1 text-left">
                                  {/* Enlarged Icon, No background container */}
                                  <div className="w-14 h-14 flex items-center justify-center text-white shrink-0 bg-transparent border-none p-0">
                                    {plugin.id === "quick_switch" ? (
                                      <img 
                                        src="https://static.wikia.nocookie.net/ep-deo/images/a/a3/Remote.png/revision/latest?cb=20260629015905" 
                                        className="w-10 h-10 object-contain filter brightness-0 invert opacity-90"
                                        alt="Remote"
                                        referrerPolicy="no-referrer"
                                      />
                                    ) : (
                                      <Icon className="w-10 h-10" />
                                    )}
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2.5 flex-wrap">
                                      <h4 className="text-base font-bold text-white tracking-tight">{plugin.title}</h4>
                                      {status === "installed" && (
                                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[9px] font-bold text-emerald-400 font-mono tracking-wider uppercase">
                                          Đã cài đặt
                                        </span>
                                      )}
                                      {status === "installing" && (
                                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-[9px] font-bold text-amber-400 font-mono tracking-wider uppercase animate-pulse">
                                          Đang cài đặt ({timeLeft}s)
                                        </span>
                                      )}
                                      {status === "uninstalling" && (
                                        <span className="px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-[9px] font-bold text-red-400 font-mono tracking-wider uppercase animate-pulse">
                                          Đang gỡ bỏ ({timeLeft}s)
                                        </span>
                                      )}
                                      {status === "idle" && (
                                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-white/50 font-mono tracking-wider uppercase">
                                          Chưa cài đặt
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-white/40">{plugin.subtitle}</p>
                                    <p className="text-xs text-white/75 leading-relaxed mt-1">{plugin.desc}</p>
                                  </div>
                                </div>

                                {/* Action Right Button */}
                                <div className="shrink-0 w-full md:w-56 text-right relative z-10 flex flex-col gap-2">
                                  {status === "idle" && (
                                    <button
                                      onClick={() => startInstallPlugin(plugin.id)}
                                      className="w-full py-2.5 px-4 rounded-full bg-white/10 hover:bg-white/15 active:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1.5 border border-white/10 bouncy-btn transition-all cursor-pointer"
                                    >
                                      <Download className="w-4 h-4" />
                                      Cài đặt gói tiện ích
                                    </button>
                                  )}
                                  {status === "installing" && (
                                    <button
                                      disabled
                                      className="w-full py-2.5 px-4 rounded-full bg-white/5 text-white/40 font-semibold text-xs text-center border border-white/10 cursor-not-allowed animate-pulse"
                                    >
                                      Đang cài đặt...
                                    </button>
                                  )}
                                  {status === "uninstalling" && (
                                    <button
                                      disabled
                                      className="w-full py-2.5 px-4 rounded-full bg-white/5 text-white/40 font-semibold text-xs text-center border border-white/10 cursor-not-allowed animate-pulse"
                                    >
                                      Đang gỡ bỏ...
                                    </button>
                                  )}
                                  {status === "installed" && (
                                    <button
                                      onClick={() => {
                                        setPluginToUninstall(plugin);
                                      }}
                                      className="w-full py-2.5 px-4 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer bouncy-btn"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      Gỡ bỏ gói tiện ích
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  )}

                  {activeSettingSection !== "appearance" && activeSettingSection !== "profile" && activeSettingSection !== "accessibility" && activeSettingSection !== "experimental" && activeSettingSection !== "design_system" && activeSettingSection !== "plugin_store" && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Sparkles className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-black text-white uppercase tracking-widest mb-2">Coming Soon</h3>
                      <p className="text-xs text-white/60 max-w-xs mx-auto leading-relaxed">
                        Tính năng này đang được phát triển tích cực và sẽ sớm ra mắt trong phiên bản tiếp theo của Vplay.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </main>

      {/* High-fidelity progressive vintage blur backplate for Bottom Navigation Dock */}
      <div className="fixed bottom-0 inset-x-0 h-28 pointer-events-none z-40">
        <div className="progressive-blur-dock" />
      </div>

      <nav id="bottom-dock-container" className={`fixed bottom-6 inset-x-0 mx-auto w-11/12 ${!mergeSearchToDock && dockItems.find(it => it.id === "search")?.enabled ? "max-w-[480px]" : "max-w-[420px]"} z-50 h-16 transform-gpu`}>
        <AnimatePresence mode="wait">
          {activeTab === "search" ? (
            <motion.div
              key={`search-bar-dock-${mergeSearchToDock}`}
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="w-full h-16 rounded-full bg-white/[0.12] backdrop-blur-[25px] saturate-[185%] border border-white/20 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.65),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.3),0_25px_50px_-12px_rgba(0,0,0,0.9)] flex items-center px-4 gap-2 relative transform-gpu"
            >
              <img 
                src="https://static.wikia.nocookie.net/ftv/images/d/dc/Ass_glass.svg/revision/latest?cb=20260612062405&path-prefix=vi" 
                className="w-5.5 h-5.5 brightness-0 invert opacity-95 z-20 pointer-events-none object-contain ml-1" 
                referrerPolicy="no-referrer"
                alt="Search"
              />
              <input
                type="text"
                placeholder="Search channels"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder-white/40 px-1 font-sans"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 text-white/40 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab(prevTab);
                }}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.65),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.3)] flex items-center justify-center text-white cursor-default shrink-0 bouncy-btn"
                title="Hủy"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`main-bar-dock-${mergeSearchToDock}`}
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="flex items-center gap-2.5 w-full h-16 transform-gpu"
            >
              {/* Main Tab Dock (Pill) */}
              <div className="flex-1 h-full rounded-full bg-white/[0.12] backdrop-blur-[25px] saturate-[185%] border border-white/20 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.65),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.3),0_25px_50px_-12px_rgba(0,0,0,0.9)] flex items-center justify-around px-2 py-1 relative transform-gpu">
                {showCopiedNotify ? (
                  <div
                    className="flex items-center justify-center gap-2.5 text-white font-normal text-sm tracking-wide select-none animate-fade-in"
                  >
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span>Copied to clipboard</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-around w-full h-full gap-0.5">
                    {dockItems
                      .filter((item) => item.enabled && (mergeSearchToDock || item.id !== "search"))
                      .map((tab) => {
                        const isActive = isDockItemActive(tab.id);
                        const config = getDockItemConfig(tab.id);
                        const filterStyle = config.isImg 
                          ? { filter: isActive ? "brightness(0) saturate(100%) invert(10%) sepia(95%) saturate(3474%) hue-rotate(235deg) brightness(83%) contrast(142%)" : "brightness(0) invert(1) opacity(0.8)" } 
                          : {};

                        return (
                          <button 
                            key={tab.id}
                            onClick={() => handleDockItemClick(tab.id)}
                            className={`relative flex flex-col items-center justify-center flex-1 h-full cursor-default z-10 bouncy-btn px-1 sm:px-2 transition-all transform-gpu ${
                              isActive 
                                ? "text-indigo-950 font-bold" 
                                : "text-white/65 hover:text-white"
                            }`}
                            title={config.label}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="activeTabPill"
                                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                className="absolute inset-y-1 inset-x-1 bg-white/50 rounded-full shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.8),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.3),0_4px_12px_rgba(0,0,0,0.15)] -z-10"
                              />
                            )}
                            {config.isImg ? (
                              <img 
                                src={config.icon} 
                                className={`w-6.5 h-6.5 sm:w-7 sm:h-7 object-contain transition-all duration-300 ${isActive ? "scale-105" : "hover:scale-105 hover:opacity-100"}`}
                                style={filterStyle}
                                alt={config.label}
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              (() => {
                                const IconComponent = config.icon;
                                return <IconComponent className={`w-6.5 h-6.5 sm:w-7 sm:h-7 transition-all duration-300 ${isActive ? "scale-105 stroke-[2.2]" : "hover:scale-105 stroke-[1.8]"}`} />;
                              })()
                            )}
                          </button>
                        );
                      })}
                  </div>
                )}
              </div>

              {/* Separate Search Button */}
              {!mergeSearchToDock && dockItems.find(it => it.id === "search")?.enabled && (() => {
                const searchTab = dockItems.find(it => it.id === "search")!;
                const isActive = isDockItemActive("search");
                const config = getDockItemConfig("search");
                return (
                  <button
                    key="search-separate-btn"
                    onClick={() => handleDockItemClick("search")}
                    className={`w-16 h-16 rounded-full bg-white/[0.12] backdrop-blur-[25px] saturate-[185%] border border-white/20 shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.65),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.3),0_25px_50px_-12px_rgba(0,0,0,0.9)] flex items-center justify-center text-white/65 hover:text-white transition-all duration-300 bouncy-btn shrink-0 relative ${
                      isActive ? "text-indigo-950 bg-white/50" : "hover:scale-105"
                    }`}
                    title={config.label}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className="absolute inset-y-1 inset-x-1 bg-white/50 rounded-full shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.8),inset_-0.5px_-0.5px_0px_rgba(255,255,255,0.3),0_4px_12px_rgba(0,0,0,0.15)] -z-10"
                      />
                    )}
                    {config.isImg ? (
                      <img 
                        src={config.icon} 
                        className={`w-6.5 h-6.5 sm:w-7 sm:h-7 object-contain transition-all duration-300 ${isActive ? "scale-105" : "hover:scale-105 hover:opacity-100"}`}
                        style={config.isImg && isActive ? { filter: "brightness(0) saturate(100%) invert(10%) sepia(95%) saturate(3474%) hue-rotate(235deg) brightness(83%) contrast(142%)" } : { filter: "brightness(0) invert(1) opacity(0.8)" }}
                        alt={config.label}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      (() => {
                        const IconComponent = config.icon;
                        return <IconComponent className={`w-6.5 h-6.5 sm:w-7 sm:h-7 transition-all duration-300 ${isActive ? "scale-105 stroke-[2.2] text-indigo-950" : "hover:scale-105 stroke-[1.8]"}`} />;
                      })()
                    )}
                  </button>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playback Error Toast Alert */}
        <AnimatePresence>
          {playbackError && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mt-3 mx-auto w-fit px-5 py-2.5 rounded-full bg-red-600/25 backdrop-blur-[12px] border border-red-500/35 text-red-200 text-xs font-normal flex items-center gap-2 shadow-[0_12px_32px_rgba(239,68,68,0.25)] select-none"
            >
              <AlertCircle className="w-4.5 h-4.5 text-red-400 animate-pulse" />
              <span className="flex items-center gap-1">
                Playback Error. Try to watch directly using <Tv className="w-3.5 h-3.5 text-red-300 inline" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Channel Change Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-26 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white text-[11.5px] font-medium tracking-wide shadow-lg select-none pointer-events-none font-sans text-center whitespace-nowrap"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CUSTOM CHANNEL LINK ADDER MODAL */}
      <AnimatePresence>
        {showCustomModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white/30 backdrop-blur-[20px] z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[350px] rounded-[30px] bg-[#211f26] p-6 shadow-[0_24px_48px_rgba(0,0,0,0.5)] relative text-white text-left transform-gpu"
            >
              <h3 className="text-[18px] font-semibold text-white tracking-tight leading-snug">
                Tạo kênh
              </h3>
              <p className="text-[12px] text-white/60 mb-4 leading-relaxed px-1 mt-1">
                Thêm luồng kênh mới vào danh sách kênh bằng cách nhập đường dẫn URL của luồng kênh đó
              </p>

              <form onSubmit={handleAddCustomChannel} className="space-y-3.5 text-sm">
                <div className="space-y-1 text-left">
                  <label className="text-[11.5px] font-semibold text-white/70 block px-1">Nhập tên kênh</label>
                  <input
                    required
                    type="text"
                    placeholder="Kênh của tôi"
                    value={customChannelName}
                    onChange={(e) => setCustomChannelName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full bg-white/5 text-white placeholder-white/30 border border-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-xs font-normal"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[11.5px] font-semibold text-white/70 block px-1">Nhập đường dẫn</label>
                  <input
                    required
                    type="url"
                    placeholder="https://example.com/live/stream.m3u8"
                    value={customChannelUrl}
                    onChange={(e) => setCustomChannelUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full bg-white/5 text-white placeholder-white/30 border border-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-xs font-normal font-mono"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[11.5px] font-semibold text-white/70 block px-1">Chọn nhóm kênh</label>
                  <select
                    value={customChannelGroup}
                    onChange={(e) => setCustomChannelGroup(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full bg-[#2d2a35] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-xs font-normal appearance-none cursor-pointer pr-10 relative"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 14px center',
                      backgroundSize: '14px',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    <option value="VTV" className="bg-[#211f26]">Kênh VTV</option>
                    <option value="VTVcab" className="bg-[#211f26]">Kênh VTVcab</option>
                    <option value="HTV" className="bg-[#211f26]">Kênh HTV</option>
                    <option value="SCTV" className="bg-[#211f26]">Kênh SCTV</option>
                    <option value="Địa phương" className="bg-[#211f26]">Kênh địa phương & Thiết yếu</option>
                    <option value="Quốc tế" className="bg-[#211f26]">Kênh Quốc Tế & Đặc Sắc</option>
                    <option value="Radio" className="bg-[#211f26]">Kênh Phát Thanh (Radio)</option>
                    <option value="Thử nghiệm" className="bg-[#211f26]">Kênh Thử Nghiệm</option>
                    <option value="NEW_GROUP" className="bg-[#211f26] font-semibold text-purple-300">+ Tự tạo nhóm mới...</option>
                  </select>
                </div>

                {customChannelGroup === "NEW_GROUP" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-1 text-left"
                  >
                    <label className="text-[11.5px] font-semibold text-white/70 block px-1">Nhập tên nhóm mới</label>
                    <input
                      required
                      type="text"
                      placeholder="Ví dụ: Kênh Riêng"
                      value={customGroupInput}
                      onChange={(e) => setCustomGroupInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-full bg-white/5 text-white placeholder-white/30 border border-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-xs font-normal"
                    />
                  </motion.div>
                )}

                <div className="flex items-center gap-3.5 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowCustomModal(false)}
                    className="flex-1 py-3 px-4 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-[#ff453a] font-semibold text-[14px] text-center border border-white/5 cursor-default"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-full bg-[#d0bcff] hover:bg-[#c2a8f9] active:scale-95 transition-all text-[#381e72] font-bold text-[14px] text-center cursor-default shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.45)]"
                  >
                    Tạo kênh
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REMOTE CHANNEL SWITCHING KEYPAD MODAL */}
      <AnimatePresence>
        {showRemoteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white/30 backdrop-blur-[20px] z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[320px] rounded-[30px] bg-[#211f26] p-6 shadow-[0_24px_48px_rgba(0,0,0,0.5)] relative text-white text-center transform-gpu"
            >
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => setShowRemoteModal(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 flex items-center justify-center transition-all cursor-pointer text-white/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-[17px] font-bold text-white tracking-tight leading-snug">
                Nhập số kênh
              </h3>

              {/* DIGITAL DISPLAY PANEL */}
              <div className="bg-white/5 rounded-2xl p-4 text-center font-mono text-3xl tracking-widest font-black text-white h-16 flex items-center justify-center border border-white/10 mb-4 relative overflow-hidden">
                {remoteInputValue ? (
                  <motion.span 
                    key={remoteInputValue}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-white"
                  >
                    {remoteInputValue}
                  </motion.span>
                ) : (
                  <span className="text-white/20">_ _ _</span>
                )}
              </div>

              {/* KEYPAD GRID */}
              <div className="grid grid-cols-3 gap-3 justify-items-center mb-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <motion.button
                    key={num}
                    onClick={() => {
                      if (remoteInputValue.length < 3) {
                        setRemoteInputValue(prev => prev + num);
                      }
                    }}
                    whileHover={{ scale: 1.18 }}
                    whileTap={{ scale: 1.28 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="w-13 h-13 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center font-bold text-lg text-white shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.15)] cursor-pointer select-none bouncy-btn"
                  >
                    {num}
                  </motion.button>
                ))}
                
                {/* CLEAR BUTTON */}
                <motion.button
                  onClick={() => setRemoteInputValue("")}
                  whileHover={{ scale: 1.18 }}
                  whileTap={{ scale: 1.28 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-13 h-13 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 flex items-center justify-center text-red-400 font-bold text-lg cursor-pointer select-none bouncy-btn"
                  title="Clear"
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>

                {/* ZERO BUTTON */}
                <motion.button
                  onClick={() => {
                    if (remoteInputValue.length < 3) {
                      setRemoteInputValue(prev => prev + "0");
                    }
                  }}
                  whileHover={{ scale: 1.18 }}
                  whileTap={{ scale: 1.28 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-13 h-13 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center font-bold text-lg text-white shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.15)] cursor-pointer select-none bouncy-btn"
                >
                  0
                </motion.button>

                {/* OK BUTTON */}
                <motion.button
                  onClick={() => {
                    if (!remoteInputValue) return;
                    
                    // Search matching channel
                    const formatted = remoteInputValue.padStart(3, "0");
                    const matchedCh = flattenedChannels.find(
                      ch => ch.channelNumber === formatted || (ch.channelNumber && parseInt(ch.channelNumber, 10) === parseInt(remoteInputValue, 10))
                    );

                    if (matchedCh) {
                      setSelectedChannel(matchedCh);
                      setActiveTab("live");
                      setShowRemoteModal(false);
                    } else {
                      setToastMessage("Không tìm thấy kênh số " + remoteInputValue);
                      setRemoteInputValue("");
                      setTimeout(() => {
                        setToastMessage(null);
                      }, 2500);
                    }
                  }}
                  whileHover={{ scale: 1.18 }}
                  whileTap={{ scale: 1.28 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-13 h-13 rounded-full bg-[#d0bcff] hover:bg-[#c2a8f9] border border-white/10 flex items-center justify-center font-black text-xs text-[#381e72] shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.45)] cursor-pointer select-none bouncy-btn"
                >
                  <Check className="w-5.5 h-5.5 text-[#381e72] stroke-[3.5]" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESIGN SYSTEM DEMO POPUP */}
      <AnimatePresence>
        {showDemoDesignSystemModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white/30 backdrop-blur-[20px] z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[350px] rounded-[30px] bg-[#211f26] p-6 shadow-[0_24px_48px_rgba(0,0,0,0.5)] relative text-white text-left transform-gpu"
            >
              <h3 className="text-[18px] font-semibold text-white tracking-tight leading-snug">
                Thử nghiệm Modal Pop-up
              </h3>
              <p className="text-[12px] text-white/60 mb-5 leading-relaxed mt-2">
                Đây là hộp thoại thông báo mẫu trong hệ thống thiết kế Vplay Refresh, được đồng bộ hóa với phong cách phẳng, mượt mà và trực quan của toàn bộ ứng dụng.
              </p>
              
              <button
                onClick={() => setShowDemoDesignSystemModal(false)}
                className="w-full py-3 px-4 rounded-full bg-[#d0bcff] hover:bg-[#c2a8f9] hover:scale-[1.03] active:scale-95 transition-all duration-300 text-[#381e72] font-bold text-[15px] text-center cursor-default shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.45)] transform-gpu"
              >
                Đóng thử nghiệm
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ABOUT VPLAY REFRESH MODAL */}
      <AnimatePresence>
        {showAboutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white/30 backdrop-blur-[20px] z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[350px] rounded-[30px] bg-[#211f26] p-6 shadow-[0_24px_48px_rgba(0,0,0,0.5)] relative text-white text-left transform-gpu"
            >
              <h3 className="text-[18px] font-bold text-white tracking-tight leading-snug">
                Vplay Refresh
              </h3>
              
              <div className="space-y-3.5 my-4 text-[12.5px] text-white/75 font-sans leading-relaxed">
                <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                  <span className="font-semibold text-white/80">Phiên bản</span>
                  <span className="font-mono bg-white/5 px-2 py-0.5 rounded text-[11px] font-bold text-white">
                    26.8.3 (Beta)
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                  <span className="font-semibold text-white/80">Tác giả</span>
                  <span className="font-medium text-white/90">VNRT</span>
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-white/80 block">Đồng hành & Hỗ trợ</span>
                  <div className="text-[11.5px] text-white/65 bg-white/5 rounded-2xl p-2.5 leading-normal max-h-[110px] overflow-y-auto scrollbar-thin">
                    FTV Official, HMG, DHA, Bsod999, Myyer, Nquinanh, TV Archive Official, VNTV Official
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowAboutModal(false)}
                className="w-full py-3 px-4 rounded-full bg-[#d0bcff] hover:bg-[#c2a8f9] hover:scale-[1.03] active:scale-95 transition-all duration-300 text-[#381e72] font-bold text-[15px] text-center cursor-default shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.45)] transform-gpu"
              >
                Đóng
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VTV5 VERSION SELECTION POPUP */}
      <AnimatePresence>
        {showVtv5Popup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white/30 backdrop-blur-[20px] z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[380px] rounded-[30px] bg-[#211f26] p-6 shadow-[0_24px_48px_rgba(0,0,0,0.5)] relative text-white text-left transform-gpu"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-semibold text-white tracking-tight leading-snug">
                  Chọn kênh
                </h3>
                <button
                  onClick={() => setShowVtv5Popup(false)}
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors bouncy-btn border border-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5">
                {vtv5Options.map((opt) => {
                  const isCurrentPlaying = selectedChannel.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        handleSelectChannel(opt, true);
                        setActiveTab("live");
                        setShowVtv5Popup(false);
                      }}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left border cursor-pointer transition-colors duration-200 bouncy-btn relative group overflow-hidden ${
                        isCurrentPlaying
                          ? "bg-white/10 border-[#d0bcff]/40 text-white shadow-sm"
                          : "bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/10"
                      }`}
                    >
                      {/* Content Middle */}
                      <div className="flex items-center gap-1.5 min-w-0">
                        <h4 className="font-semibold text-white text-[14px] tracking-tight group-hover:text-[#d0bcff] transition-colors truncate">
                          {opt.name}
                        </h4>
                        {isCurrentPlaying && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d0bcff] animate-pulse shrink-0" />
                        )}
                      </div>

                      {/* Right Indicator */}
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/10 transition-colors shrink-0">
                        {isCurrentPlaying ? (
                          <Check className="w-3.5 h-3.5 text-[#d0bcff]" />
                        ) : (
                          <Play className="w-3 h-3 fill-white text-white translate-x-0.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 pt-1">
                <button
                  type="button"
                  onClick={() => setShowVtv5Popup(false)}
                  className="w-full py-3 px-4 rounded-full bg-[#d0bcff] hover:bg-[#c2a8f9] active:scale-95 transition-all text-[#381e72] font-bold text-[15px] text-center cursor-default"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VTVGO EVENT FEED STANDBY POPUP */}
      <AnimatePresence>
        {showEventFeedPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white/30 backdrop-blur-[20px] z-[120] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[420px] rounded-[30px] bg-[#211f26] p-6 shadow-[0_24px_48px_rgba(0,0,0,0.5)] relative text-white text-left transform-gpu border border-white/5"
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <h3 className="text-[18px] font-bold text-white tracking-tight leading-snug">
                    Chọn kênh
                  </h3>
                </div>
                <button
                  onClick={() => setShowEventFeedPopup(false)}
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors bouncy-btn border border-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[12.5px] text-white/70 leading-relaxed mb-4 px-1">
                Theo dõi trọn vẹn 104 trận đấu đỉnh cao của giải vô địch bóng đá thế giới <strong>FIFA World Cup 2026</strong> trên sóng của Đài Truyền Hình Việt Nam. Vui lòng chọn một kênh sóng để theo dõi trận cầu trực tiếp.
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                {["vtv2", "vtv3", "vtv6", "vtv7", "vtv9", "vtv10"].map((id) => {
                  const ch = processedChannels.find(c => c.id === id);
                  if (!ch) return null;
                  
                  // Custom logos based on user-provided ones
                  const customLogos: Record<string, string> = {
                    vtv2: "https://upload.wikimedia.org/wikipedia/commons/d/d5/VTV2_logo_2013_final.svg",
                    vtv3: "https://upload.wikimedia.org/wikipedia/commons/4/48/VTV3_logo_2013_final.svg",
                    vtv6: "https://static.wikia.nocookie.net/logos/images/5/58/VTV6_logo_%282026-nay%29_%282%29.png/revision/latest/scale-to-width-down/1000?cb=20260608140603&path-prefix=vi",
                    vtv7: "https://static.wikia.nocookie.net/logos/images/a/a9/VTV7_logo_06.02.2016.png/revision/latest/scale-to-width-down/1000?cb=20221213075109&path-prefix=vi",
                    vtv9: "https://static.wikia.nocookie.net/logos/images/3/35/VTV9_logo_%282013-nay%29.png/revision/latest/scale-to-width-down/1000?cb=20201228131939&path-prefix=vi",
                    vtv10: "https://static.wikia.nocookie.net/logos/images/4/47/VTV10_%282026-nay%29.png/revision/latest/scale-to-width-down/1000?cb=20260422054705&path-prefix=vi"
                  };
                  const logoUrl = customLogos[id] || ch.logoImg;
                  const isCurrentPlaying = selectedChannel.id === id;

                  return (
                    <button
                      key={id}
                      onClick={() => {
                        handleSelectChannel(ch, true);
                        setActiveTab("live");
                        setShowEventFeedPopup(false);
                      }}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border cursor-pointer text-center transition-all duration-200 bouncy-btn group relative overflow-hidden h-[72px] ${
                        isCurrentPlaying
                          ? "bg-white/10 border-[#d0bcff]/40 text-white shadow-sm ring-1 ring-[#d0bcff]/30"
                          : "bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/10"
                      }`}
                    >
                      <div className="h-full w-full flex items-center justify-center">
                        <img 
                          src={logoUrl} 
                          alt={ch.name} 
                          referrerPolicy="no-referrer"
                          className="max-h-8 max-w-[85%] object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      {isCurrentPlaying && (
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#d0bcff] animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setShowEventFeedPopup(false)}
                  className="w-full py-3 px-4 rounded-full bg-[#d0bcff] hover:bg-[#c2a8f9] active:scale-95 transition-all text-[#381e72] font-bold text-[15px] text-center cursor-default shadow-md"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MULTIVIEW SELECTOR POPUP */}
      <AnimatePresence>
        {showMultiviewSelectorPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white/30 backdrop-blur-[20px] z-[110] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[420px] rounded-[30px] bg-[#120e24]/90 p-6 shadow-[0_24px_48px_rgba(0,0,0,0.5)] relative text-white text-left transform-gpu"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Grid className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-[18px] font-semibold text-white tracking-tight leading-snug">
                    Xem Multiview
                  </h3>
                </div>
                <button
                  onClick={() => setShowMultiviewSelectorPopup(false)}
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors bouncy-btn border border-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[12px] text-white/60 mb-5 leading-relaxed">
                Chọn số lượng luồng kênh bạn muốn xem cùng một lúc (từ 2 đến 9 kênh). Màn hình sẽ được chia đều tương ứng.
              </p>

              <div className="grid grid-cols-4 gap-3 mb-6">
                {[2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      handleSelectMultiviewCount(num);
                      setShowMultiviewSelectorPopup(false);
                    }}
                    className="aspect-square flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-400/50 hover:text-indigo-300 transition-all cursor-pointer bouncy-btn"
                  >
                    <span className="text-xl font-bold">{num}</span>
                    <span className="text-[10px] text-white/50 font-sans font-normal">ô kênh</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-end gap-2.5">
                <button
                  onClick={() => setShowMultiviewSelectorPopup(false)}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-[13px] text-center cursor-default transition-all"
                >
                  Hủy bỏ
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MULTIVIEW CHANNEL PICKER POPUP */}
      <AnimatePresence>
        {showMultiviewChannelPickerPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white/30 backdrop-blur-[20px] z-[120] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl max-h-[85vh] rounded-[30px] bg-[#120e24]/95 p-6 shadow-[0_24px_48px_rgba(0,0,0,0.5)] relative text-white flex flex-col text-left transform-gpu overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 shrink-0">
                <div className="flex items-center gap-2">
                  <Tv className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-[18px] font-semibold text-white tracking-tight leading-snug">
                    Chọn kênh cho Khung {activeMultiviewSlotIndex !== null ? activeMultiviewSlotIndex + 1 : ""}
                  </h3>
                </div>
                <button
                  onClick={() => setShowMultiviewChannelPickerPopup(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors bouncy-btn border border-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search bar inside picker */}
              <div className="mb-4 relative shrink-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Tìm kiếm kênh muốn thêm..."
                  value={pickerSearchQuery}
                  onChange={(e) => setPickerSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:outline-none text-white text-xs transition-all placeholder:text-white/30"
                />
              </div>

              {/* Scrollable Categories & Channel list */}
              <div className="flex-1 overflow-y-auto space-y-6 pr-1 pb-4">
                {/* Categorized channel list */}
                {filteredCategoriesForPicker.map((cat) => {
                  if (cat.channels.length === 0) return null;
                  return (
                    <div key={cat.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-semibold text-white/80 tracking-tight uppercase">
                          {cat.name}
                        </h4>
                        <span className="text-[10px] sm:text-xs text-white/40 font-mono font-normal">
                          {cat.channels.length} Kênh
                        </span>
                      </div>

                      {/* Channel Card list - identical to live tab style */}
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-2.5">
                        {cat.channels.map((ch) => {
                          const isDacBiet = ch.group === "Đặc biệt";
                          return (
                            <button
                              key={ch.id}
                              onClick={() => {
                                handleSelectChannelForSlot(ch);
                                setShowMultiviewChannelPickerPopup(false);
                              }}
                              className={`group relative rounded-xl p-0.5 sm:p-1 cursor-pointer flex items-center justify-center h-[64px] sm:h-[80px] select-none text-left w-full transition-all duration-300 transform hover:scale-[1.02] ${
                                isDacBiet
                                  ? "bg-amber-500/5 border border-amber-400/30 hover:border-amber-400 hover:bg-amber-500/10"
                                  : "bg-white/5 border border-white/10 hover:border-white hover:bg-white/10"
                              }`}
                              title={ch.name}
                            >
                              {/* Logo Graphic Container - with vertical split for channel position number */}
                              <div className="w-full h-full flex items-center select-none overflow-hidden rounded-lg">
                                {/* Left Part: Channel Number */}
                                <div className="w-[28%] sm:w-[26%] h-full flex items-center justify-center text-white/80 text-[11px] xs:text-[13px] sm:text-base md:text-lg font-bold tracking-tight font-sans">
                                  {ch.channelNumber || "000"}
                                </div>
                                {/* Vertical Divider */}
                                <div className="w-[1px] h-[45%] sm:h-[55%] bg-white/15 flex-shrink-0" />
                                {/* Right Part: Logo Container */}
                                <div className="flex-1 h-full flex justify-center items-center overflow-hidden p-0.5 sm:p-1">
                                  {ch.logoImg ? (
                                    <img
                                      src={ch.logoImg}
                                      alt={ch.name}
                                      referrerPolicy="no-referrer"
                                      className={`object-contain filter drop-shadow-md select-none pointer-events-none ${
                                        ch.id === "vietnam-wild-live" ? "w-[115%] h-[115%]" : ch.id.startsWith("vinh_long") ? "w-[88%] h-[88%]" : ch.group === "SCTV" ? "w-[82%] h-[82%]" : ch.group === "VTVcab" ? "w-[94%] h-[94%]" : "w-[125%] h-[125%] sm:w-[135%] sm:h-[135%]"
                                      }`}
                                    />
                                  ) : (
                                    <div className={`w-full h-full flex items-center justify-center rounded-lg ${ch.logoBg || "bg-indigo-600"} shadow-inner border border-white/10 font-bold text-white text-[9px] sm:text-[10px] tracking-wider text-center px-1`}>
                                       {ch.logoText}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {filteredCategoriesForPicker.every(c => c.channels.length === 0) && (
                  <div className="py-12 text-center text-white/40 text-xs">
                    Không tìm thấy kênh nào khớp với từ khóa của bạn.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DRAGGABLE PICTURE-IN-PICTURE (PiP) FLOATING WINDOW */}
      <AnimatePresence>
        {isPiPActive && (
          <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.05}
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed right-4 bottom-24 z-[100] w-[280px] xs:w-[320px] sm:w-[380px] aspect-video rounded-2xl border border-white/20 bg-black/95 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-md overflow-hidden flex flex-col select-none cursor-grab active:cursor-grabbing transform-gpu"
          >
            {/* PiP header with drag bar */}
            <div className="h-9 bg-black/60 px-3.5 flex items-center justify-between border-b border-white/10 text-white/80 shrink-0">
              <div className="flex items-center gap-1.5 truncate">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[11px] font-semibold truncate max-w-[160px] sm:max-w-[220px]">PiP: {selectedChannel.name}</span>
              </div>
              <div className="flex items-center gap-1 pointer-events-auto">
                <button
                  onClick={() => setIsPiPActive(false)}
                  className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Khôi phục về trình phát chính"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsPiPActive(false)}
                  className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Đóng PiP"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* PiP Player */}
            <div className="flex-1 w-full h-full relative overflow-hidden pointer-events-auto">
              <ChannelPlayer
                channel={selectedChannel}
                volume={volume}
                onVolumeChange={setVolume}
                muted={muted}
                onMutedChange={setMuted}
                onPlaybackError={() => {}}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REQUIRED PLUGIN MODAL */}
      <AnimatePresence>
        {showPluginRequiredModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white/30 backdrop-blur-[20px] z-[120] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[350px] rounded-[30px] bg-[#211f26] p-6 shadow-[0_24px_48px_rgba(0,0,0,0.5)] relative text-white text-left transform-gpu"
            >
              <h3 className="text-[18px] font-bold text-white tracking-tight leading-snug">
                Chưa cài đặt Gói tiện ích
              </h3>
              <p className="text-[12.5px] text-white/65 mb-5 leading-relaxed mt-2">
                Để sử dụng tính năng <strong className="text-white font-semibold">{requiredPluginFeatureName}</strong>, vui lòng cài đặt từ Cửa hàng tiện ích.
              </p>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setShowPluginRequiredModal(false);
                    setActiveTab("settings");
                    setActiveSettingSection("plugin_store");
                  }}
                  className="w-full py-3 px-4 rounded-full bg-[#d0bcff] hover:bg-[#c2a8f9] hover:scale-[1.02] active:scale-95 transition-all duration-300 text-[#381e72] font-bold text-[15px] text-center cursor-default shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.45)] transform-gpu"
                >
                  Đi đến cửa hàng
                </button>
                <button
                  onClick={() => setShowPluginRequiredModal(false)}
                  className="w-full py-3.5 px-4 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all duration-300 text-white/80 font-semibold text-[14px] text-center border border-white/5 cursor-default transform-gpu"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UNINSTALL CONFIRMATION MODAL */}
      <AnimatePresence>
        {pluginToUninstall && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white/30 backdrop-blur-[20px] z-[120] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[350px] rounded-[30px] bg-[#211f26] p-6 shadow-[0_24px_48px_rgba(0,0,0,0.5)] relative text-white text-left transform-gpu"
            >
              <h3 className="text-[18px] font-bold text-white tracking-tight leading-snug">
                Gỡ bỏ gói tiện ích?
              </h3>
              <p className="text-[12.5px] text-white/65 mb-5 leading-relaxed mt-2">
                Bạn có muốn gỡ bỏ gói tiện ích <strong className="text-white font-semibold">{pluginToUninstall.title}</strong> không? Đừng lo, bạn vẫn có thể cài đặt lại sau trong cửa hàng tiện ích.
              </p>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    const id = pluginToUninstall.id;
                    setPluginToUninstall(null);
                    startUninstallPlugin(id);
                  }}
                  className="w-full py-3 px-4 rounded-full bg-[#d0bcff] hover:bg-[#c2a8f9] hover:scale-[1.02] active:scale-95 transition-all duration-300 text-[#381e72] font-bold text-[15px] text-center cursor-default transform-gpu"
                >
                  Xác nhận
                </button>
                <button
                  onClick={() => setPluginToUninstall(null)}
                  className="w-full py-3.5 px-4 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all duration-300 text-white/80 font-semibold text-[14px] text-center border border-white/5 cursor-default transform-gpu"
                >
                  Hủy
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INSTALLING & UNINSTALLING PROGRESS POPUP MODAL */}
      <AnimatePresence>
        {(() => {
          const activePluginId = Object.keys(installedPlugins).find(
            id => installedPlugins[id] === "installing" || installedPlugins[id] === "uninstalling"
          );
          if (!activePluginId) return null;

          const status = installedPlugins[activePluginId];
          const isInstalling = status === "installing";

          const pluginName = (() => {
            switch(activePluginId) {
              case "export_stream": return "Xuất luồng";
              case "multiview": return "Multiview Grid";
              case "pip": return "Picture in Picture";
              case "open_native": return "Mở luồng gốc";
              case "quick_switch": return "Chuyển kênh nhanh";
              case "add_custom": return "Thêm kênh mới";
              default: return "Gói tiện ích";
            }
          })();

          const maxTime = isInstalling ? 30 : 10;
          const timeLeft = pluginProgress[activePluginId] ?? maxTime;
          const percent = Math.round(((maxTime - timeLeft) / maxTime) * 100);

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 bg-white/30 backdrop-blur-[20px] z-[130] flex items-center justify-center p-4"
            >
            <motion.div
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[350px] rounded-[30px] bg-[#211f26] p-6 shadow-[0_24px_48px_rgba(0,0,0,0.5)] relative text-white text-left transform-gpu"
            >
              <h3 className="text-[18px] font-bold text-white tracking-tight leading-snug flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${isInstalling ? 'bg-[#d0bcff]' : 'bg-red-500'} animate-ping shrink-0`} />
                Vui lòng đợi
              </h3>
              <p className="text-[12.5px] text-white/65 mb-5 leading-relaxed mt-2">
                {isInstalling ? (
                  <>Đang cài đặt gói tiện ích <strong className="text-white font-semibold">{pluginName}</strong>...</>
                ) : (
                  <>Đang gỡ bỏ gói tiện ích <strong className="text-white font-semibold">{pluginName}</strong>...</>
                )}
              </p>

              {/* Progress Bar */}
              <div className="w-full space-y-2 mb-6">
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden border border-white/5">
                  <motion.div 
                    className={`h-full ${isInstalling ? 'bg-[#d0bcff]' : 'bg-red-500'} rounded-full`}
                    style={{ width: `${percent}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className={`flex justify-between text-[11px] ${isInstalling ? 'text-[#d0bcff]' : 'text-red-400'} font-mono font-bold`}>
                  <span>{isInstalling ? 'Đang cài đặt...' : 'Đang gỡ bỏ...'}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  // Cancel action: restore back to previous state
                  setInstalledPlugins(prev => ({
                    ...prev,
                    [activePluginId]: isInstalling ? "idle" : "installed"
                  }));
                  setPluginProgress(p => {
                    const cp = { ...p };
                    delete cp[activePluginId];
                    return cp;
                  });
                }}
                className="w-full py-3 px-4 rounded-full bg-[#d0bcff] hover:bg-[#c2a8f9] active:scale-95 transition-all duration-300 text-[#381e72] font-bold text-[14px] text-center cursor-default transform-gpu"
              >
                {isInstalling ? 'Hủy cài đặt gói' : 'Hủy gỡ bỏ gói'}
              </button>
            </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
