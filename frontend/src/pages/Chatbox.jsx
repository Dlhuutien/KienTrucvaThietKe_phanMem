import React, { useState, useEffect } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { processUserQuery } from "../services/ProductService";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { message: "Chào Quý Khách! Bạn cần hỗ trợ gì hôm nay?", sender: "bot" },
    {
      message:
        "Bạn có thể hỏi những câu như:\n" +
        "- Điện thoại giá từ 5 triệu đến 10 triệu\n" +
        "- Mới nhất theo hãng Apple\n" +
        "- Hỗ trợ khác hàng\n",
      sender: "bot",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [answers, setAnswers] = useState({});

  // Load sẵn một số câu trả lời để xử lý nhanh
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const [res1, res2, res3, res4] = await Promise.all([
          processUserQuery("Điện thoại giá từ 5 triệu đến 10 triệu"),
          processUserQuery("Điện thoại giá từ 10 triệu đến 20 triệu"),
          processUserQuery("mới nhất theo hãng APPLE"),
          processUserQuery("mới nhất theo hãng SAMSUNG"),
        ]);

        setAnswers({
          price_5_10: res1,
          price_10_20: res2,
          brand_apple: res3,
          brand_samsung: res4,
        });
      } catch (err) {
        console.error("Lỗi khi preload dữ liệu:", err);
      }
    };

    fetchAnswers();
  }, []);

  // Tạo phản hồi của bot theo input
  const getBotResponse = async (input) => {
    const lower = input.toLowerCase();

    // Match theo mức giá cụ thể
    const priceBelowMatch = lower.match(/(dưới|<)\s*(\d+)[^\d]?triệu/);
    const priceAboveMatch = lower.match(/(trên|>|\btrên\b)\s*(\d+)[^\d]?triệu/);
    const categoryMap = {
      "điện thoại": "PHONE",
      "cáp sạc": "CHARGING_CABLE",
      "sạc dự phòng": "POWER_BANK",
      "tai nghe": "EARPHONE",
    };

    const foundCategory = Object.keys(categoryMap).find((key) =>
      lower.includes(key)
    );

    const brandMatch = lower.match(/\btất cả sản phẩm (.*)/);

    // Trả về từ cache nếu khớp
    if (lower.includes("5 đến 10"))
      return answers.price_5_10 || "Đang xử lý...";
    if (lower.includes("10 đến 20"))
      return answers.price_10_20 || "Đang xử lý...";
    if (lower.includes("apple")) return answers.brand_apple || "Đang xử lý...";
    if (lower.includes("samsung"))
      return answers.brand_samsung || "Đang xử lý...";

    // Dưới mức giá
    if (priceBelowMatch) {
      const price = priceBelowMatch[2];
      return await processUserQuery(`Tìm sản phẩm dưới ${price} triệu`);
    }

    // Trên mức giá
    if (priceAboveMatch) {
      const price = priceAboveMatch[2];
      return await processUserQuery(`Tìm sản phẩm trên ${price} triệu`);
    }

    // Theo loại sản phẩm
    if (foundCategory) {
      const categoryEnum = categoryMap[foundCategory];
      return await processUserQuery(`Tìm theo loại sản phẩm ${categoryEnum}`);
    }

    // Liệt kê theo hãng
    if (brandMatch) {
      const brand = brandMatch[1];
      return await processUserQuery(`Tất cả sản phẩm theo hãng ${brand}`);
    }

    // Một số câu hỗ trợ khác
    if (lower.includes("tư vấn") || lower.includes("liên hệ")) {
      return "Vui lòng gọi hotline 1900-1234 hoặc gửi email đến support@temg.vn để được hỗ trợ.";
    }

    if (lower.includes("hỗ trợ")) {
      return "Hiện tại hệ thống chưa hỗ trợ kỹ thuật trực tiếp qua chat. Vui lòng liên hệ qua hotline 1900-1234 hoặc gửi email đến support@temg.vn để được hỗ trợ.";
    }

    // Không khớp gì thì gửi backend xử lý
    try {
      return await processUserQuery(input);
    } catch (err) {
      console.error("Lỗi xử lý tại backend:", err);
      return "Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.";
    }
  };

  // Xử lý khi người dùng gửi tin nhắn
  const handleSend = async (userInput) => {
    const userMessage = { message: userInput, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    const botReply = await getBotResponse(userInput);
    setMessages((prev) => [...prev, { message: botReply, sender: "bot" }]);
    setIsTyping(false);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "80vh",
        width: "100%",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <MainContainer>
        <ChatContainer>
          <MessageList
            typingIndicator={
              isTyping ? <TypingIndicator content="Đang gõ..." /> : null
            }
          >
            {messages.map((msg, i) => (
              <Message
                key={i}
                model={{
                  message: msg.message,
                  sentTime: "now",
                  sender: msg.sender,
                  direction: msg.sender === "user" ? "outgoing" : "incoming",
                }}
              />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Nhập câu hỏi..."
            onSend={handleSend}
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatBox;
