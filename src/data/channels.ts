import rawChannels from "./channels.json";

export interface Channel {
  id: string;
  name: string;
  url: string;
  group: string;
  logoText: string;
  logoBg: string; // Tailwind class, e.g. "bg-red-600"
  userAgent?: string;
  isRadio?: boolean;
  logoImg?: string;
  channelNumber?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  channels: Channel[];
}

const getLogoText = (name: string): string => {
  let clean = name;
  if (clean.includes(" - ")) {
    clean = clean.split(" - ")[1];
  } else {
    clean = clean.replace(/TRUYỀN HÌNH\s+/i, "");
    clean = clean.replace(/Truyền hình\s+/i, "");
  }
  if (clean.includes(" (")) {
    clean = clean.split(" (")[0];
  }
  return clean.trim();
};

const getGradient = (group: string, name: string): string => {
  const lowerG = group.toLowerCase();
  const lowerN = name.toLowerCase();
  if (lowerG.includes("vtv")) {
    if (lowerN.includes("1")) return "bg-gradient-to-br from-red-600 to-red-800";
    if (lowerN.includes("2")) return "bg-gradient-to-br from-purple-600 to-purple-800";
    if (lowerN.includes("3")) return "bg-gradient-to-br from-blue-600 to-blue-800";
    if (lowerN.includes("4")) return "bg-gradient-to-br from-teal-600 to-teal-800";
    if (lowerN.includes("5")) return "bg-gradient-to-br from-emerald-600 to-emerald-800";
    return "bg-gradient-to-br from-red-500 to-orange-600";
  }
  if (lowerG.includes("vtvcab")) {
    return "bg-gradient-to-br from-fuchsia-600 to-pink-700";
  }
  if (lowerG.includes("htv")) {
    return "bg-gradient-to-br from-blue-600 to-indigo-800";
  }
  if (lowerG.includes("sctv")) {
    return "bg-gradient-to-br from-rose-600 to-blue-800";
  }
  if (lowerG.includes("radio")) {
    return "bg-gradient-to-br from-red-500 to-pink-600";
  }
  if (lowerG.includes("quốc tế") || lowerG.includes("world")) {
    return "bg-gradient-to-br from-neutral-800 to-stone-900";
  }
  return "bg-gradient-to-br from-teal-500 to-cyan-700";
};

// Map raw channels list to our required application structure
export const processedChannels: Channel[] = rawChannels.map((ch: any) => {
  const isRadio = ch.group === "Radio" || !!ch.isRadio;
  return {
    id: ch.id,
    name: ch.name,
    url: ch.url,
    group: ch.group,
    logoText: getLogoText(ch.name),
    logoBg: getGradient(ch.group, ch.name),
    isRadio: isRadio,
    logoImg: ch.logo
  };
});

const vietnamWildLiveChannel: Channel = {
  id: "vietnam-wild-live",
  name: "VTVgo Event Feed",
  url: "https://events.vtvdigital.vn/livestream/wildlife-720p50fps.m3u8",
  group: "Đặc biệt",
  logoText: "VTVgo Event",
  logoBg: "bg-gradient-to-br from-indigo-600 to-purple-800",
  isRadio: false,
  logoImg: "https://static.wikia.nocookie.net/ep-deo/images/6/64/Vtv_s%E1%BB%A7a.png/revision/latest?cb=20260625120702"
};

// Category template definitions
const categoryTemplates = [
  { id: "dac-biet", name: "Đặc biệt", description: "Các sự kiện và luồng phát đặc biệt" },
  { id: "vtv", name: "Kênh VTV", description: "Các kênh sóng truyền hình quốc gia VTV" },
  { id: "vtvcab", name: "Kênh VTVcab", description: "Kênh giải trí thể thao, phim ảnh tổng hợp đặc sắc" },
  { id: "htv", name: "Kênh HTV", description: "Các kênh sóng truyền hình Đài Thành phố Hồ Chí Minh" },
  { id: "sctv", name: "Kênh SCTV", description: "Các kênh giải trí, khoa học và phim truyện SCTV cáp" },
  { id: "thiet-yeu", name: "Kênh Thiết yếu", description: "Truyền hình thiết yếu quốc gia" },
  { id: "dia-phuong-bac", name: "Kênh địa phương miền Bắc", description: "Truyền hình địa phương khu vực phía Bắc" },
  { id: "dia-phuong-trung", name: "Kênh địa phương miền Trung", description: "Truyền hình địa phương khu vực miền Trung & Tây Nguyên" },
  { id: "dia-phuong-nam", name: "Kênh địa phương miền Nam", description: "Truyền hình địa phương khu vực phía Nam & Tây Nam Bộ" },
  { id: "quoc-te", name: "Kênh Quốc Tế & Đặc Sắc", description: "Kênh tin tức thời sự thế giới, phim hoạt hình nổi tiếng nước ngoài" },
  { id: "phat-thanh-radio", name: "Kênh Phát Thanh (Radio)", description: "Các đài phát thanh VOV, VOH, FM Giao thông đặc sắc" },
  { id: "thu-nghiem", name: "Kênh Thử Nghiệm", description: "Kênh truyền hình thử nghiệm luồng phát kỹ thuật" }
];

const REGION_BAC_IDS = [
  "bac_ninh", "cao_bang", "dien_bien", "ha_noi_1", "ha_noi_2", "hai_phong", "hai_phong_3", 
  "hung_yen", "lai_chau", "lang_son", "lao_cai", "ninh_binh", "phu_tho", "quang_ninh_1", 
  "quang_ninh_3", "son_la", "tuyen_quang", "thanh_hoa", "thai_nguyen"
];

const REGION_TRUNG_IDS = [
  "da_nang_1", "da_nang_2", "dak_lak", "gia_lai", "ha_tinh", "hue", "khanh_hoa", 
  "khanh_hoa_1", "lam_dong_1", "lam_dong_2", "nghe_an", "quang_tri", "quang_ngai_1", "quang_ngai_2"
];

const REGION_NAM_IDS = [
  "atv1", "atv2", "atv3", "can_tho_1", "can_tho_2", "can_tho_3", "ca_mau", "dong_nai_1", 
  "dong_nai_2", "dong_thap_1", "dong_thap_2", "tay_ninh", "vinh_long_1", "vinh_long_2", 
  "vinh_long_3", "vinh_long_4", "vinh_long_5"
];

// Dynamically construct and populate categories based on channel groups
export const CATEGORIES: Category[] = categoryTemplates.map(tpl => {
  let matchedChannels: Channel[] = [];
  
  if (tpl.id === "dac-biet") {
    matchedChannels = [vietnamWildLiveChannel];
  } else if (tpl.id === "vtv") {
    matchedChannels = processedChannels.filter(c => c.group === "VTV" && c.id !== "vtv5_tn" && c.id !== "vtv5_tnb");
  } else if (tpl.id === "vtvcab") {
    matchedChannels = processedChannels.filter(c => c.group === "VTVcab");
  } else if (tpl.id === "htv") {
    matchedChannels = processedChannels.filter(c => c.group === "HTV" || c.group === "HTVC");
  } else if (tpl.id === "sctv") {
    matchedChannels = processedChannels.filter(c => c.group === "SCTV");
  } else if (tpl.id === "thiet-yeu") {
    matchedChannels = processedChannels.filter(c => c.id === "antv_thiet_yeu" || c.id === "qpvn_thiet_yeu" || c.group === "Thiết yếu");
  } else if (tpl.id === "dia-phuong-bac") {
    matchedChannels = processedChannels.filter(c => REGION_BAC_IDS.includes(c.id));
  } else if (tpl.id === "dia-phuong-trung") {
    matchedChannels = processedChannels.filter(c => REGION_TRUNG_IDS.includes(c.id));
  } else if (tpl.id === "dia-phuong-nam") {
    matchedChannels = processedChannels.filter(c => REGION_NAM_IDS.includes(c.id));
  } else if (tpl.id === "quoc-te") {
    matchedChannels = processedChannels.filter(c => c.group === "Quốc tế" || c.group === "World");
  } else if (tpl.id === "phat-thanh-radio") {
    matchedChannels = processedChannels.filter(c => c.isRadio);
  } else if (tpl.id === "thu-nghiem") {
    matchedChannels = processedChannels.filter(c => c.group === "Thử nghiệm");
  }

  // Auto clean names and append HD appropriately
  const formattedChannels = matchedChannels.map(ch => {
    let cleanName = ch.name;
    const nameUpper = cleanName.toUpperCase();
    if (!nameUpper.endsWith("HD") && !nameUpper.includes(" HD") && !ch.isRadio && tpl.id !== "thu-nghiem" && tpl.id !== "dac-biet") {
      cleanName = `${cleanName.trim()} HD`;
    }
    return { ...ch, name: cleanName };
  });

  // Sort alphabetically from A-Z for local and essential categories
  if (tpl.id.startsWith("dia-phuong-") || tpl.id === "thiet-yeu") {
    formattedChannels.sort((a, b) => a.name.localeCompare(b.name, "vi"));
  }

  return {
    ...tpl,
    channels: formattedChannels
  };
});

// Assign channel position numbers in the format xxx
const SPECIAL_VTV_NUMBERS: Record<string, string> = {
  vtv1: "001",
  vtv2: "002",
  vtv3: "003",
  vtv4: "004",
  vtv5: "005",
  vtv6: "006",
  vtv7: "007",
  vtv8: "008",
  vtv9: "009",
  vtv10: "010",
  vtv5_tnb: "011",
  vtv5_tn: "012",
};

let nextNum = 13;

// First pass: assign numbers to all channels inside categories (except dac-biet)
CATEGORIES.forEach(category => {
  if (category.id === "dac-biet") return;
  category.channels.forEach(ch => {
    if (SPECIAL_VTV_NUMBERS[ch.id]) {
      ch.channelNumber = SPECIAL_VTV_NUMBERS[ch.id];
    } else {
      ch.channelNumber = String(nextNum).padStart(3, '0');
      nextNum++;
    }
  });
});

// Assign numbers to the raw processedChannels for consistency
processedChannels.forEach(ch => {
  if (SPECIAL_VTV_NUMBERS[ch.id]) {
    ch.channelNumber = SPECIAL_VTV_NUMBERS[ch.id];
  } else if (ch.id === "vietnam-wild-live") {
    // Handled separately below
  } else {
    // Match the number already assigned in CATEGORIES
    const matched = CATEGORIES.flatMap(cat => cat.channels).find(c => c.id === ch.id);
    if (matched && matched.channelNumber) {
      ch.channelNumber = matched.channelNumber;
    } else {
      ch.channelNumber = String(nextNum).padStart(3, '0');
      nextNum++;
    }
  }
});

// Explicitly ensure the VTV5 subchannels are correctly numbered in processedChannels
const tnbChan = processedChannels.find(c => c.id === "vtv5_tnb");
if (tnbChan) tnbChan.channelNumber = "011";
const tnChan = processedChannels.find(c => c.id === "vtv5_tn");
if (tnChan) tnChan.channelNumber = "012";

// Assign the last number to dac-biet channel
const lastNumberStr = String(nextNum).padStart(3, '0');
vietnamWildLiveChannel.channelNumber = lastNumberStr;
const dacBietCategory = CATEGORIES.find(cat => cat.id === "dac-biet");
if (dacBietCategory && dacBietCategory.channels[0]) {
  dacBietCategory.channels[0].channelNumber = lastNumberStr;
}
