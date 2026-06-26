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
}

export interface Category {
  id: string;
  name: string;
  description: string;
  channels: Channel[];
}

const getLogoText = (name: string): string => {
  let clean = name.replace(/TRUYỀN HÌNH\s+/i, "");
  clean = clean.replace(/Truyền hình\s+/i, "");
  if (clean.includes(" (")) {
    clean = clean.split(" (")[0];
  }
  return clean.substring(0, 10).trim();
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
  name: "Vietnam Wild LIVE",
  url: "https://events.vtvdigital.vn/livestream/wildlife-720p50fps.m3u8",
  group: "Đặc biệt",
  logoText: "Wild LIVE",
  logoBg: "bg-gradient-to-br from-emerald-600 to-green-800",
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
  { id: "dia-phuong", name: "Kênh địa phương & Thiết yếu", description: "Truyền hình địa phương, kênh liên tỉnh bản quyền" },
  { id: "quoc-te", name: "Kênh Quốc Tế & Đặc Sắc", description: "Kênh tin tức thời sự thế giới, phim hoạt hình nổi tiếng nước ngoài" },
  { id: "phat-thanh-radio", name: "Kênh Phát Thanh (Radio)", description: "Các đài phát thanh VOV, VOH, FM Giao thông đặc sắc" },
  { id: "thu-nghiem", name: "Kênh Thử Nghiệm", description: "Kênh truyền hình thử nghiệm luồng phát kỹ thuật" }
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
  } else if (tpl.id === "dia-phuong") {
    matchedChannels = processedChannels.filter(c => c.group === "Địa phương" || c.group === "Thiết yếu");
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

  return {
    ...tpl,
    channels: formattedChannels
  };
});
