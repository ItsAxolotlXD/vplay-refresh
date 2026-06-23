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

export const CATEGORIES: Category[] = [
  {
    id: "vtv",
    name: "Kênh VTV",
    description: "Các kênh sóng truyền hình quốc gia VTV",
    channels: [
      {
        id: "vtv1",
        name: "VTV1 HD",
        url: "https://live.fptplay53.net/fnxhd1/vtv1hd_vhls.smil/chunklist_b5000000.m3u8",
        group: "VTV",
        logoText: "VTV 1",
        logoBg: "bg-gradient-to-br from-red-600 to-red-800",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/a/ac/1vv.png/revision/latest/scale-to-width-down/1000?cb=20260604052331&path-prefix=vi"
      },
      {
        id: "vtv2",
        name: "VTV2 HD",
        url: "https://live.fptplay53.net/fnxhd1/vtv2hd_vhls.smil/chunklist_b5000000.m3u8",
        group: "VTV",
        logoText: "VTV 2",
        logoBg: "bg-gradient-to-br from-purple-600 to-purple-800",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/5/5b/2f.png/revision/latest/scale-to-width-down/1000?cb=20260604052625&path-prefix=vi"
      },
      {
        id: "vtv3",
        name: "VTV3 HD",
        url: "https://live.fptplay53.net/fnxhd1/vtv3hd_vhls.smil/chunklist_b5000000.m3u8",
        group: "VTV",
        logoText: "VTV 3",
        logoBg: "bg-gradient-to-br from-blue-600 to-blue-800",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/3/32/V3.png/revision/latest/scale-to-width-down/1000?cb=20260601093014&path-prefix=vi"
      },
      {
        id: "vtv4",
        name: "VTV4 HD",
        url: "https://live.fptplay53.net/fnxhd1/vtv4hd_vhls.smil/chunklist_b5000000.m3u8",
        group: "VTV",
        logoText: "VTV 4",
        logoBg: "bg-gradient-to-br from-teal-600 to-teal-800",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/0/02/Imagei4.png/revision/latest/scale-to-width-down/1000?cb=20260601093135&path-prefix=vi"
      },
      {
        id: "vtv5",
        name: "VTV5 HD",
        url: "https://live.fptplay53.net/fnxhd1/vtv5hd_vhls.smil/chunklist_b5000000.m3u8",
        group: "VTV",
        logoText: "VTV 5",
        logoBg: "bg-gradient-to-br from-emerald-600 to-emerald-800",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/7/79/Imagej42.png/revision/latest/scale-to-width-down/1000?cb=20260601093345&path-prefix=vi"
      },
      {
        id: "vtv5-tnb",
        name: "VTV5 Tây Nam Bộ",
        url: "https://live.fptplay53.net/live/media/vtv5tnb/live-hls-avc/index.m3u8",
        group: "VTV",
        logoText: "VTV 5 TNB",
        logoBg: "bg-gradient-to-br from-emerald-600 to-teal-800"
      },
      {
        id: "vtv5-tn",
        name: "VTV5 Tây Nguyên HD",
        url: "https://live.fptplay53.net/live/media/vtv5tn/live-hls-avc/index.m3u8",
        group: "VTV",
        logoText: "VTV 5 TN",
        logoBg: "bg-gradient-to-br from-amber-600 to-emerald-800"
      },
      {
        id: "vtv6",
        name: "VTV6 HD",
        url: "https://live.fptplay53.net/fnxhd1/vtv6hd_vhls.smil/chunklist_b5000000.m3u8",
        group: "VTV",
        logoText: "VTV 6",
        logoBg: "bg-gradient-to-br from-pink-600 to-purple-800",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/c/c1/V6.png/revision/latest/scale-to-width-down/1000?cb=20260601093700&path-prefix=vi"
      },
      {
        id: "vtv7",
        name: "VTV7 HD",
        url: "https://live.fptplay53.net/live/media/vtv7/live247-hls-avc/index.m3u8",
        group: "VTV",
        logoText: "VTV 7",
        logoBg: "bg-gradient-to-br from-cyan-600 to-blue-800",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/4/43/Image7.png/revision/latest/scale-to-width-down/1000?cb=20260601093859&path-prefix=vi"
      },
      {
        id: "vtv8",
        name: "VTV8 HD",
        url: "https://live.fptplay53.net/fnxhd1/vtv8hd_vhls.smil/chunklist_b5000000.m3u8",
        group: "VTV",
        logoText: "VTV 8",
        logoBg: "bg-gradient-to-br from-amber-600 to-orange-850",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/b/b1/Imagea8.png/revision/latest/scale-to-width-down/1000?cb=20260601094212&path-prefix=vi"
      },
      {
        id: "vtv9",
        name: "VTV9 HD",
        url: "https://live.fptplay53.net/fnxhd1/vtv9hd_vhls.smil/chunklist_b5000000.m3u8",
        group: "VTV",
        logoText: "VTV 9",
        logoBg: "bg-gradient-to-br from-rose-600 to-red-900",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/8/8c/Imagei9.png/revision/latest/scale-to-width-down/1000?cb=20260601094610&path-prefix=vi"
      },
      {
        id: "vtv10",
        name: "VTV10 HD",
        url: "https://liveh34.vtvprime.vn/hls/SCTV10/01.m3u8",
        group: "VTV",
        logoText: "VTV 10",
        logoBg: "bg-gradient-to-br from-blue-700 to-indigo-900",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/a/a0/I10.png/revision/latest/scale-to-width-down/1000?cb=20260601094723&path-prefix=vi"
      },
      {
        id: "vntoday",
        name: "Vietnam Today",
        url: "https://live.fptplay53.net/fnxhd1/vntoday_vhls.smil/chunklist_b5000000.m3u8",
        group: "VTV",
        logoText: "VN Today",
        logoBg: "bg-gradient-to-br from-red-500 to-orange-600",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/7/7f/Vtd.png/revision/latest/scale-to-width-down/1000?cb=20260601094859&path-prefix=vi"
      }
    ]
  },
  {
    id: "vtvcab",
    name: "Kênh VTVcab",
    description: "Kênh thể thao điện ảnh, giải trí tổng hợp",
    channels: [
      {
        id: "on-vie-giaritri",
        name: "ON Vie Giải Trí",
        url: "https://vpsttt.vietanhtv.top/tv360/tv360.php?id=180",
        group: "VTVCAB",
        logoText: "ON Vie GLITRI",
        logoBg: "bg-gradient-to-br from-fuchsia-600 to-rose-700"
      },
      {
        id: "on-phimviet",
        name: "ON Phim Việt",
        url: "https://vpsttt.vietanhtv.top/tv360/tv360.php?id=175",
        group: "VTVCAB",
        logoText: "ON Phim Việt",
        logoBg: "bg-gradient-to-br from-rose-600 to-pink-800"
      },
      {
        id: "on-movies",
        name: "ON Movies",
        url: "https://vpsttt.vietanhtv.top/tv360/tv360.php?id=181",
        group: "VTVCAB",
        logoText: "ON Movies",
        logoBg: "bg-gradient-to-br from-slate-700 to-slate-900"
      },
      {
        id: "on-e-channel",
        name: "ON E-Channel",
        url: "https://vpsttt.vietanhtv.top/tv360/tv360.php?id=182",
        group: "VTVCAB",
        logoText: "ON E-Channel",
        logoBg: "bg-gradient-to-br from-teal-500 to-cyan-700"
      },
      {
        id: "on-o2tv",
        name: "ON O2TV",
        url: "https://vpsttt.vietanhtv.top/tv360/tv360.php?id=136",
        group: "VTVCAB",
        logoText: "ON O2TV",
        logoBg: "bg-gradient-to-br from-blue-500 to-teal-600"
      },
      {
        id: "on-bibi",
        name: "ON BiBi",
        url: "https://vpsttt.vietanhtv.top/tv360/tv360.php?id=178",
        group: "VTVCAB",
        logoText: "ON BiBi",
        logoBg: "bg-gradient-to-br from-amber-400 to-orange-600"
      },
      {
        id: "on-infotv",
        name: "ON Info TV",
        url: "https://vpsttt.vietanhtv.top/tv360/tv360.php?id=189",
        group: "VTVCAB",
        logoText: "ON Info TV",
        logoBg: "bg-gradient-to-br from-indigo-500 to-blue-700"
      },
      {
        id: "on-cine",
        name: "ON Cine",
        url: "https://vpsttt.vietanhtv.top/tv360/tv360.php?id=176",
        group: "VTVCAB",
        logoText: "ON Cine",
        logoBg: "bg-gradient-to-br from-red-700 to-zinc-900"
      },
      {
        id: "on-styletv",
        name: "ON Style TV",
        url: "https://vpsttt.vietanhtv.top/tv360/tv360.php?id=184",
        group: "VTVCAB",
        logoText: "ON Style",
        logoBg: "bg-gradient-to-br from-pink-500 to-purple-700"
      },
      {
        id: "on-homeshopping",
        name: "ON HOMESHOPPING",
        url: "https://liveh34.vtvprime.vn/hls/SCTV10/01.m3u8",
        group: "VTVCAB",
        logoText: "ON H.Shopping",
        logoBg: "bg-gradient-to-br from-yellow-500 to-orange-600"
      },
      {
        id: "on-music",
        name: "ON Music",
        url: "https://vpsttt.vietanhtv.top/tv360/tv360.php?id=185",
        group: "VTVCAB",
        logoText: "ON Music",
        logoBg: "bg-gradient-to-br from-violet-600 to-indigo-800"
      },
      {
        id: "on-trending",
        name: "ON Trending TV",
        url: "https://vpsttt.vietanhtv.top/tv360/tv360.php?id=186",
        group: "VTVCAB",
        logoText: "ON Trending",
        logoBg: "bg-gradient-to-br from-emerald-500 to-teal-700"
      },
      {
        id: "on-vie-dramas",
        name: "ON Vie DRAMAS",
        url: "http://dvrfl05.bozztv.com/vch_vchannel18/tracks-v1a1/mono.m3u8",
        group: "VTVCAB",
        logoText: "ON Dramas",
        logoBg: "bg-gradient-to-br from-rose-500 to-pink-700"
      },
      {
        id: "on-vfamily",
        name: "ON VFamily",
        url: "https://vpsttt.vietanhtv.top/tv360/tv360.php?id=187",
        group: "VTVCAB",
        logoText: "ON Family",
        logoBg: "bg-gradient-to-br from-orange-500 to-amber-700"
      },
      {
        id: "on-kids",
        name: "ON KIDS",
        url: "https://vpsttt.vietanhtv.top/tv360/tv360.php?id=179",
        group: "VTVCAB",
        logoText: "ON Kids",
        logoBg: "bg-gradient-to-br from-sky-400 to-blue-600"
      },
      {
        id: "on-life",
        name: "ON Life",
        url: "https://vpsttt.vietanhtv.top/tv360/tv360.php?id=188",
        group: "VTVCAB",
        logoText: "ON Life",
        logoBg: "bg-gradient-to-br from-lime-500 to-emerald-600"
      },
      {
        id: "on-golf",
        name: "ON Golf",
        url: "https://vpsttt.vietanhtv.top/tv360/tv360.php?id=169",
        group: "VTVCAB",
        logoText: "ON Golf",
        logoBg: "bg-gradient-to-br from-green-600 to-teal-800"
      }
    ]
  },
  {
    id: "sctv",
    name: "Kênh SCTV",
    description: "Kênh truyền hình cáp SCTV đặc sắc",
    channels: [
      {
        id: "sctv2-todaytv",
        name: "SCTV2 - TodayTV HD",
        url: "https://liveh12.vtvprime.vn/hls/SCTV2/03.m3u8",
        group: "SCTV",
        logoText: "SCTV 2",
        logoBg: "bg-gradient-to-br from-red-600 to-blue-800"
      },
      {
        id: "sctv6-fim360",
        name: "SCTV6 - FIM 360 HD",
        url: "https://live.fptplay53.net/epzhd2/film360_vhls.smil/chunklist_b5000000.m3u8",
        group: "SCTV",
        logoText: "SCTV 6",
        logoBg: "bg-gradient-to-br from-amber-600 to-rose-700"
      }
    ]
  },
  {
    id: "htv",
    name: "Kênh HTV",
    description: "Kênh sóng truyền hình thành phố Hồ Chí Minh",
    channels: [
      {
        id: "htv1",
        name: "HTV1 HD",
        url: "https://live.fptplay53.net/epzhd1/htv1_hls.smil/chunklist_b2500000.m3u8",
        group: "HTV",
        logoText: "HTV 1",
        logoBg: "bg-gradient-to-br from-indigo-600 to-blue-800",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/0/04/HTV1.png/revision/latest/scale-to-width-down/1000?cb=20260601104705&path-prefix=vi"
      },
      {
        id: "htv2-vie",
        name: "HTV2 - Vie Channel",
        url: "https://live.fptplay53.net/epzhd1/htv2hd_vhls.smil/chunklist_b5000000.m3u8",
        group: "HTV",
        logoText: "HTV 2",
        logoBg: "bg-gradient-to-br from-pink-600 to-rose-700",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/9/99/HTV2.png/revision/latest/scale-to-width-down/1000?cb=20260601105845&path-prefix=vi"
      },
      {
        id: "htv3",
        name: "HTV3 HD",
        url: "https://live.fptplay53.net/epzhd1/htv3_hls.smil/chunklist_b2500000.m3u8",
        group: "HTV",
        logoText: "HTV 3",
        logoBg: "bg-gradient-to-br from-orange-400 to-rose-600",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/2/26/H3.png/revision/latest/scale-to-width-down/1000?cb=20260601110041&path-prefix=vi"
      },
      {
        id: "htv4",
        name: "HTV4 HD",
        url: "https://live.fptplay53.net/epzhd1/htv4_hls.smil/chunklist_b2500000.m3u8",
        group: "HTV",
        logoText: "HTV 4",
        logoBg: "bg-gradient-to-br from-emerald-600 to-teal-800",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/d/d4/H4.png/revision/latest/scale-to-width-down/1000?cb=20260601110245&path-prefix=vi"
      },
      {
        id: "htv5",
        name: "HTV5 HD",
        url: "https://live.fptplay53.net/fnxsd1/btv9_hls.smil/chunklist_b2500000.m3u8",
        group: "HTV",
        logoText: "HTV 5",
        logoBg: "bg-gradient-to-br from-amber-500 to-red-600",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/e/ec/H5.png/revision/latest/scale-to-width-down/1000?cb=20260601110811&path-prefix=vi"
      },
      {
        id: "htv7",
        name: "HTV7 HD",
        url: "https://live.fptplay53.net/epzhd1/htv7hd_vhls.smil/chunklist_b5000000.m3u8",
        group: "HTV",
        logoText: "HTV 7",
        logoBg: "bg-gradient-to-br from-blue-600 to-indigo-800",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/6/60/H7.png/revision/latest/scale-to-width-down/1000?cb=20260601112033&path-prefix=vi"
      },
      {
        id: "htv9",
        name: "HTV9 HD",
        url: "https://live.fptplay53.net/epzhd1/htv9hd_vhls.smil/chunklist_b5000000.m3u8",
        group: "HTV",
        logoText: "HTV 9",
        logoBg: "bg-gradient-to-br from-red-600 to-indigo-900",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/e/e4/H9.png/revision/latest/scale-to-width-down/1000?cb=20260601111956&path-prefix=vi"
      },
      {
        id: "htv-thethao",
        name: "HTV Thể Thao",
        url: "https://live.fptplay53.net/epzhd1/htvcthethao_vhls.smil/chunklist_b5000000.m3u8",
        group: "HTV",
        logoText: "HTV Sport",
        logoBg: "bg-gradient-to-br from-sky-500 to-blue-700",
        logoImg: "https://static.wikia.nocookie.net/ftv/images/5/5c/H6.png/revision/latest/scale-to-width-down/1000?cb=20260601112653&path-prefix=vi"
      },
      {
        id: "htvc-canhac",
        name: "HTVC Ca Nhạc",
        url: "https://live.fptplay53.net/epzhd1/htvcmusic_vhls.smil/chunklist_b5000000.m3u8",
        group: "HTVC",
        logoText: "HTVC Music",
        logoBg: "bg-gradient-to-br from-purple-500 to-fuchsia-700"
      },
      {
        id: "htvc-dulich",
        name: "HTVC Du Lịch",
        url: "https://live.fptplay53.net/epzhd1/htvcdulich_vhls.smil/chunklist_b5000000.m3u8",
        group: "HTVC",
        logoText: "HTVC Tour",
        logoBg: "bg-gradient-to-br from-emerald-500 to-cyan-600"
      },
      {
        id: "htvc-giadinh",
        name: "HTVC Gia Đình",
        url: "https://live.fptplay53.net/epzhd1/htvcgiadinh_vhls.smil/chunklist_b5000000.m3u8",
        group: "HTVC",
        logoText: "HTVC Family",
        logoBg: "bg-gradient-to-br from-orange-500 to-rose-600"
      },
      {
        id: "htvc-phim",
        name: "HTVC Phim HD",
        url: "https://live.fptplay53.net/epzhd1/htvcmovieshd_vhls.smil/chunklist_b5000000.m3u8",
        group: "HTVC",
        logoText: "HTVC Phim",
        logoBg: "bg-gradient-to-br from-rose-500 to-slate-900"
      },
      {
        id: "htvc-phunu",
        name: "HTVC Phụ Nữ",
        url: "https://live.fptplay53.net/epzhd1/htvcphunu_vhls.smil/chunklist_b5000000.m3u8",
        group: "HTVC",
        logoText: "HTVC Lady",
        logoBg: "bg-gradient-to-br from-pink-400 to-rose-600"
      },
      {
        id: "htvc-thuanviet",
        name: "HTVC Thuần Việt HD",
        url: "https://live.fptplay53.net/epzhd1/htvcthuanviethd_vhls.smil/chunklist_b5000000.m3u8",
        group: "HTVC",
        logoText: "Thuần Việt",
        logoBg: "bg-gradient-to-br from-amber-600 to-red-800"
      },
      {
        id: "htvc-plus",
        name: "HTVC+ HD",
        url: "https://live.fptplay53.net/epzhd1/htvcplus_vhls.smil/chunklist_b5000000.m3u8",
        group: "HTVC",
        logoText: "HTVC +",
        logoBg: "bg-gradient-to-br from-violet-600 to-purple-800"
      }
    ]
  },
  {
    id: "dia-phuong",
    name: "Kênh địa phương",
    description: "Kênh truyền hình Vĩnh Long và các tỉnh thành khác",
    channels: [
      {
        id: "vl1",
        name: "TH Vĩnh Long 1 HD",
        url: "https://live.fptplay53.net/epzhd2/vinhlong1_vhls.smil/chunklist_b5000000.m3u8",
        group: "THVL",
        logoText: "THVL 1",
        logoBg: "bg-gradient-to-br from-red-600 to-orange-500"
      },
      {
        id: "vl2",
        name: "TH Vĩnh Long 2 HD",
        url: "https://live.fptplay53.net/epzhd2/vinhlong2_vhls.smil/chunklist_b5000000.m3u8",
        group: "THVL",
        logoText: "THVL 2",
        logoBg: "bg-gradient-to-br from-purple-600 to-red-500"
      },
      {
        id: "vl3",
        name: "TH Vĩnh Long 3 HD",
        url: "https://live.fptplay53.net/epzhd2/vinhlong3_vhls.smil/chunklist_b5000000.m3u8",
        group: "THVL",
        logoText: "THVL 3",
        logoBg: "bg-gradient-to-br from-blue-700 to-red-500"
      },
      {
        id: "vl4",
        name: "TH Vĩnh Long 4 HD",
        url: "https://live.fptplay53.net/epzhd2/vinhlong4hd_vhls.smil/chunklist_b5000000.m3u8",
        group: "THVL",
        logoText: "THVL 4",
        logoBg: "bg-gradient-to-br from-emerald-600 to-red-500"
      },
      {
        id: "antv",
        name: "ANTV - An Ninh TV",
        url: "https://live.fptplay53.net/fnxhd2/anninhtv_vhls.smil/chunklist_b5000000.m3u8",
        group: "Tổng Hợp",
        logoText: "ANTV",
        logoBg: "bg-gradient-to-br from-red-700 to-red-950"
      },
      {
        id: "qpvn",
        name: "QPVN - Quốc Phòng VN HD",
        url: "https://live.fptplay53.net/fnxhd2/quocphongvnhd_vhls.smil/chunklist_b5000000.m3u8",
        group: "Tổng Hợp",
        logoText: "QPVN",
        logoBg: "bg-gradient-to-br from-emerald-700 to-green-950"
      },
      {
        id: "hanoi1",
        name: "HanoiTV 1 HD",
        url: "https://live.fptplay53.net/fnxhd2/hanoitv1_vhls.smil/chunklist_b5000000.m3u8",
        group: "Hà Nội",
        logoText: "HN 1",
        logoBg: "bg-gradient-to-br from-blue-600 to-sky-700"
      },
      {
        id: "hanoi2",
        name: "HanoiTV 2 HD",
        url: "https://live.fptplay53.net/fnxhd1/hntv2_vhls.smil/chunklist_b5000000.m3u8",
        group: "Hà Nội",
        logoText: "HN 2",
        logoBg: "bg-gradient-to-br from-blue-500 to-emerald-600"
      },
      {
        id: "cantho1",
        name: "TH TP. Cần Thơ",
        url: "https://live.fptplay53.net/epzsd1/cantho_hls.smil/chunklist_b2500000.m3u8",
        group: "Cần Thơ",
        logoText: "THTCT",
        logoBg: "bg-gradient-to-br from-rose-500 to-amber-500"
      },
      {
        id: "dongnai1",
        name: "Đồng Nai 1 HD",
        url: "https://live.fptplay53.net/epzsd1/dongnai1_hls.smil/chunklist_b2500000.m3u8",
        group: "Đồng Nai",
        logoText: "ĐN 1",
        logoBg: "bg-gradient-to-br from-teal-500 to-cyan-700"
      },
      {
        id: "dongthap",
        name: "TH Đồng Tháp",
        url: "https://live.fptplay53.net/epzsd1/dongthap_vhls.smil/chunklist_b5000000.m3u8",
        group: "Đồng Tháp",
        logoText: "ĐT",
        logoBg: "bg-gradient-to-br from-emerald-600 to-rose-600"
      },
      {
        id: "haiphong",
        name: "TH Hải Phòng HD",
        url: "https://live.fptplay53.net/fnxsd1/haiphong_hls.smil/chunklist_b2500000.m3u8",
        group: "Hải Phòng",
        logoText: "THP",
        logoBg: "bg-gradient-to-br from-blue-600 to-indigo-900"
      },
      {
        id: "danang1",
        name: "TH Đà Nẵng 1",
        url: "https://live.fptplay53.net/epzsd1/danang1_hls.smil/chunklist_b2500000.m3u8",
        group: "Đà Nẵng",
        logoText: "DaNang 1",
        logoBg: "bg-gradient-to-br from-violet-600 to-blue-700"
      },
      {
        id: "tayninh",
        name: "TH Tây Ninh HD",
        url: "https://live.fptplay53.net/epzsd1/tayninh01_hls.smil/chunklist_b2500000.m3u8",
        group: "Tây Ninh",
        logoText: "TTV11",
        logoBg: "bg-gradient-to-br from-amber-600 to-orange-700"
      },
      {
        id: "hitv",
        name: "HiTV HD",
        url: "https://vpsttt.vietanhtv.top/tv360/tv360.php?id=32",
        group: "Tổng Hợp",
        logoText: "HiTV",
        logoBg: "bg-gradient-to-br from-pink-500 to-indigo-600"
      },
      {
        id: "youtv",
        name: "YouTV HD",
        url: "https://vpsttt.vietanhtv.top/tv360/tv360.php?id=31",
        group: "Tổng Hợp",
        logoText: "YouTV",
        logoBg: "bg-gradient-to-br from-fuchsia-500 to-pink-600"
      }
    ]
  },
  {
    id: "quoc-te",
    name: "Kênh Quốc Tế & Đặc Sắc",
    description: "Các kênh tin tức, tài liệu và hoạt hình quốc tế",
    channels: [
      {
        id: "cartoon-network",
        name: "Cartoon Network HD",
        url: "http://cdn4.skygo.mn/live/disk1/Cartoon_Network/HLSv3-FTA/Cartoon_Network.m3u8",
        group: "Quốc Tế",
        logoText: "CN",
        logoBg: "bg-gradient-to-br from-neutral-800 to-neutral-950"
      },
      {
        id: "cartoonito",
        name: "Cartoonito HD",
        url: "http://cdn4.skygo.mn/live/disk1/Boomerang/HLSv3-FTA/Boomerang.m3u8",
        group: "Quốc Tế",
        logoText: "Toonito",
        logoBg: "bg-gradient-to-br from-sky-400 to-amber-400"
      },
      {
        id: "discovery-asia",
        name: "Discovery Asia",
        url: "http://cdn4.skygo.mn/live/disk1/Discovery_Asia/HLSv3-FTA/Discovery_Asia.m3u8",
        group: "Quốc Tế",
        logoText: "Disc. Asia",
        logoBg: "bg-gradient-to-br from-teal-700 to-emerald-900"
      },
      {
        id: "discovery-channel",
        name: "Discovery Channel",
        url: "http://cdn4.skygo.mn/live/disk1/SoutheastAsia/HLSv3-FTA/SoutheastAsia.m3u8",
        group: "Quốc Tế",
        logoText: "Discovery",
        logoBg: "bg-gradient-to-br from-sky-700 to-emerald-800"
      },
      {
        id: "love-nature",
        name: "Love Nature 4K",
        url: "https://pb-ehs1glsha1juy.akamaized.net/Love_Nature_4K.m3u8",
        group: "Quốc Tế",
        logoText: "Love Nature",
        logoBg: "bg-gradient-to-br from-lime-600 to-emerald-800"
      },
      {
        id: "afn",
        name: "Asian Food Network",
        url: "https://live.fptplay53.net/fnxhd2/afchd_vhls.smil/chunklist_b5000000.m3u8",
        group: "Quốc Tế",
        logoText: "AFN",
        logoBg: "bg-gradient-to-br from-amber-500 to-orange-600"
      },
      {
        id: "kbs-world",
        name: "KBS World",
        url: "https://live.fptplay53.net/epzhd2/kbs_vhls.smil/chunklist_b5000000.m3u8",
        group: "Quốc Tế",
        logoText: "KBS",
        logoBg: "bg-gradient-to-br from-blue-600 to-cyan-500"
      },
      {
        id: "nhk-world",
        name: "NHK World Japan",
        url: "https://live.fptplay53.net/fnxhd2/nhkworld_vhls.smil/chunklist_b5000000.m3u8",
        group: "Quốc Tế",
        logoText: "NHK",
        logoBg: "bg-gradient-to-br from-sky-600 to-sky-850"
      },
      {
        id: "arirang",
        name: "Arirang HD",
        url: "https://live.fptplay53.net/fnxhd2/arirang_hls.smil/chunklist_b2500000.m3u8",
        group: "Quốc Tế",
        logoText: "Arirang",
        logoBg: "bg-gradient-to-br from-indigo-600 to-indigo-850"
      },
      {
        id: "cnn",
        name: "CNN International",
        url: "https://d3bp6dwmpbdajl.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-ury0meh5m4nzm/index.m3u8",
        group: "Quốc Tế_TinTuc",
        logoText: "CNN",
        logoBg: "bg-gradient-to-br from-red-650 to-red-800"
      },
      {
        id: "bbc-news",
        name: "BBC News",
        url: "https://stream8.cinerama.uz/1251/tracks-v1a1/mono.m3u8",
        group: "Quốc Tế_TinTuc",
        logoText: "BBC",
        logoBg: "bg-gradient-to-br from-red-800 to-stone-900"
      },
      {
        id: "al-jazeera",
        name: "Al Jazeera English",
        url: "https://live-hls-apps-aje-fa.getaj.net/AJE/01.m3u8",
        group: "Quốc Tế_TinTuc",
        logoText: "Jazeera",
        logoBg: "bg-gradient-to-br from-amber-600 to-amber-900"
      }
    ]
  },
  {
    id: "phat-thanh-radio",
    name: "Kênh Phát Thanh (Radio)",
    description: "Các đài phát thanh VOV, VOH chất lượng cao",
    channels: [
      {
        id: "vov1",
        name: "VOV1 - Thời sự, Chính trị",
        url: "https://audio-lss.vov.vn/han/live/vov1/audio/haudio-eng.m3u8",
        group: "Radio VOV",
        logoText: "VOV 1",
        logoBg: "bg-gradient-to-br from-red-650 to-red-800",
        isRadio: true,
        logoImg: "https://static.wikia.nocookie.net/ep-deo/images/c/c9/V0v1.png/revision/latest/scale-to-width-down/1000?cb=20260622072449"
      },
      {
        id: "vov2",
        name: "VOV2 - Đòisống, Văn hóa",
        url: "https://audio-lss.vov.vn/han/live/vov2/audio/haudio-eng.m3u8",
        group: "Radio VOV",
        logoText: "VOV 2",
        logoBg: "bg-gradient-to-br from-blue-600 to-indigo-800",
        isRadio: true,
        logoImg: "https://static.wikia.nocookie.net/ep-deo/images/3/31/V0v2.png/revision/latest/scale-to-width-down/1000?cb=20260622072053"
      },
      {
        id: "vov3",
        name: "VOV3 - Âm nhạc Giải trí",
        url: "https://audio-lss.vov.vn/han/live/vov3/audio/haudio-eng.m3u8",
        group: "Radio VOV",
        logoText: "VOV 3",
        logoBg: "bg-gradient-to-br from-pink-500 to-rose-700",
        isRadio: true,
        logoImg: "https://static.wikia.nocookie.net/ep-deo/images/8/8c/Vov03.png/revision/latest/scale-to-width-down/1000?cb=20260622071720"
      },
      {
        id: "vov-giao-thong-hn",
        name: "VOV Giao Thông Hà Nội",
        url: "https://play.vovgiaothong.vn/live/gthn/playlist.m3u8",
        group: "Radio Giao Thông",
        logoText: "VOV GT.HN",
        logoBg: "bg-gradient-to-br from-orange-600 to-red-700",
        isRadio: true,
        logoImg: "https://static.wikia.nocookie.net/ep-deo/images/6/6a/VOV_GT.png/revision/latest/scale-to-width-down/1000?cb=20260622072341"
      },
      {
        id: "vov-giao-thong-hcm",
        name: "VOV Giao Thông TP.HCM",
        url: "https://play.vovgiaothong.vn/live/gthcm/playlist.m3u8",
        group: "Radio Giao Thông",
        logoText: "VOV GT.SG",
        logoBg: "bg-gradient-to-br from-orange-500 to-amber-700",
        isRadio: true,
        logoImg: "https://static.wikia.nocookie.net/ep-deo/images/6/6a/VOV_GT.png/revision/latest/scale-to-width-down/1000?cb=20260622072341"
      },
      {
        id: "voh-999p",
        name: "VOH FM 99.9 MHz",
        url: "https://strm.voh.com.vn/radio/channel3/chunklist.m3u8",
        group: "Radio VOH",
        logoText: "VOH 99.9",
        logoBg: "bg-gradient-to-br from-indigo-600 to-pink-700",
        isRadio: true
      },
      {
        id: "voh-956",
        name: "VOH FM 95.6 MHz",
        url: "https://strm.voh.com.vn/radio/channel1/chunklist.m3u8",
        group: "Radio VOH",
        logoText: "VOH 95.6",
        logoBg: "bg-gradient-to-br from-teal-500 to-emerald-600",
        isRadio: true
      }
    ]
  }
];

// Dynamically append " HD" to channel title / name if not already present
CATEGORIES.forEach(category => {
  category.channels.forEach(ch => {
    const nameUpper = ch.name.toUpperCase();
    if (!nameUpper.endsWith("HD") && !nameUpper.includes(" HD")) {
      ch.name = `${ch.name.trim()} HD`;
    }
  });
});
