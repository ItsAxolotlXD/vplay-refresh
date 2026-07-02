import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Load channels from JSON for searching grounding
let cachedChannels: any[] = [];
try {
  const channelsPath = path.join(process.cwd(), "src/data/channels.json");
  if (fs.existsSync(channelsPath)) {
    cachedChannels = JSON.parse(fs.readFileSync(channelsPath, "utf-8"));
  }
} catch (err) {
  console.error("Failed to load channels for V-Intelligence:", err);
}

// API endpoint for V-Intelligence
app.post("/api/vintelligence", async (req, res) => {
  try {
    const { messages, mode } = req.body; // messages: Array<{role: string, content: string}>, mode: 'chat' | 'search'
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    
    // Prepare channels context
    const channelsContext = cachedChannels.map(ch => ({
      id: ch.id,
      name: ch.name,
      group: ch.group
    }));
    
    const systemInstruction = `Bạn là V-Intelligence, trợ lý trí tuệ nhân tạo đắc lực và thân thiện của Vplay - ứng dụng xem truyền hình mượt mà chất lượng cao.
Nhiệm vụ của bạn là trò chuyện, tư vấn kênh truyền hình, giải đáp thắc mắc và tự động kích hoạt các thao tác hệ thống theo yêu cầu của người dùng.

Dưới đây là danh sách các kênh truyền hình có trên Vplay:
${JSON.stringify(channelsContext)}

HÃY PHẢN HỒI THEO ĐỊNH DẠNG JSON CÓ CẤU TRÚC NHƯ SAU:
{
  "reply": "Câu trả lời của bạn",
  "recommendedChannels": ["vtv1", "vtv3"],
  "action": {
    "type": "open_channel | switch_tab | open_settings",
    "target": "vtv1 | home | live | settings",
    "section": "profile | appearance | accessibility | experimental | design_system | plugin_store"
  }
}

HƯỚNG DẪN CHI TIẾT & QUY TẮC:
1. ĐỊNH DẠNG VĂN BẢN & EMOJI:
   - Hãy dùng định dạng Markdown phong phú (ví dụ: in đậm bằng **nội dung**, gạch đầu dòng, xuống dòng hợp lý) để làm nổi bật tên kênh, tên chức năng hoặc thông tin quan trọng.
   - Hãy lồng ghép nhiều biểu tượng cảm xúc (emoji) vui tươi, phù hợp ngữ cảnh (ví dụ: 📺, ⚽, 🍿, 🎵, ✨, ⚙️, 🚀, 😍, 😉) để câu trả lời thật đa dạng, sinh động và tràn đầy năng lượng!

2. ĐỀ XUẤT KÊNH (recommendedChannels):
   - Chứa mảng các "id" kênh phù hợp với nhu cầu của người dùng từ danh sách kênh ở trên. Nếu không có hoặc không cần đề xuất, hãy trả về mảng rỗng [].
   - Không tự bịa ra ID kênh không có trong danh sách.

3. HÀNH ĐỘNG HỆ THỐNG (action):
   - Bạn có thể điều khiển ứng dụng trực tiếp bằng cách trả về đối tượng "action". Nếu người dùng không yêu cầu bất kỳ hành động nào dưới đây, hãy đặt "action": null.
   - Khi người dùng muốn MỞ KÊNH, XEM KÊNH, BẬT KÊNH (ví dụ: "mở kênh vtv1 hd", "bật htv7", "cho tôi xem bóng đá trên vtchd"):
     + Hãy tìm kênh phù hợp nhất trong danh sách, đặt "action": { "type": "open_channel", "target": "<id_kenh_phu_hop>" }
     + Đưa id kênh đó vào mảng "recommendedChannels" luôn.
   - Khi người dùng muốn CHUYỂN TAB, ĐI TỚI TAB, VỀ TRANG CHỦ, MỞ TRANG CHỦ (ví dụ: "chuyển sang tab trực tiếp", "về trang chủ", "mở cài đặt", "đi tới trang live"):
     + Đặt "action": { "type": "switch_tab", "target": "home | live | settings" } (chọn 1 trong 3 tab thích hợp).
   - Khi người dùng muốn MỞ CÁC MỤC CÀI ĐẶT CỤ THỂ (ví dụ: "mở mục tài khoản", "cho tôi đổi giao diện", "mở cài đặt trợ năng", "mở phần thử nghiệm", "mở kho tiện ích", "mở cài đặt vplay refresh"):
     + Đặt "action": { "type": "open_settings", "section": "profile | appearance | accessibility | experimental | design_system | plugin_store" } (chọn section tương ứng).
     + Nếu họ muốn xem chung về cài đặt, hãy chuyển tab "settings" với action "switch_tab".

CHẾ ĐỘ HIỆN TẠI: Chế độ ${mode === 'search' ? 'Tìm kiếm thông minh (AI) - Ưu tiên tìm và đề xuất các kênh phù hợp nhất với yêu cầu' : 'Trò chuyện tâm sự - Thoải mái giao lưu, giải đáp thắc mắc và điều khiển app theo yêu cầu'}.`;

    // Map roles: 'user' -> 'user', 'assistant' or 'model' -> 'model'
    const contents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    // Use a direct REST fetch request to Google Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const apiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              reply: { type: "STRING" },
              recommendedChannels: {
                type: "ARRAY",
                items: { type: "STRING" }
              },
              action: {
                type: "OBJECT",
                properties: {
                  type: { type: "STRING" },
                  target: { type: "STRING" },
                  section: { type: "STRING" }
                }
              }
            },
            required: ["reply", "recommendedChannels"]
          }
        }
      })
    });

    if (!apiResponse.ok) {
      const errText = await apiResponse.text();
      throw new Error(`Gemini API returned status ${apiResponse.status}: ${errText}`);
    }

    const data = await apiResponse.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("V-Intelligence API Error:", error);
    res.status(500).json({ 
      error: "Không thể kết nối đến V-Intelligence. Vui lòng kiểm tra lại cấu hình API Key.",
      details: error.message 
    });
  }
});

// Serve Vite in development, static files in production
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
