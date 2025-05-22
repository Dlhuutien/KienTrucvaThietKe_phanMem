import React, { useState, useEffect } from "react";
import { processUserQuery } from "../services/ProductService";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const ChatBox = () => {
  // Tùy chỉnh giao diện của chatbot
  const theme = {
    background: "#f5f8fb",
    headerBgColor: "#64b5f6",
    headerFontColor: "#fff",
    headerFontSize: "16px",
    botBubbleColor: "#64b5f6",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };

  // State để lưu câu trả lời
  const [answer_1, setAnswer1] = useState("");
  const [answer_2, setAnswer2] = useState("");
  const [answer_3, setAnswer3] = useState("");
  const [answer_4, setAnswer4] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Track if data is loaded

  // Fetch answers when component is loaded
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        // Giả sử bạn có một API hoặc hàm lấy dữ liệu cho các câu trả lời
        const response_1 = await processUserQuery(
          "Điện thoại giá từ 5 triệu đến 10 triệu"
        );
        const response_2 = await processUserQuery(
          "Điện thoại giá từ 10 triệu đến 20 triệu"
        );
        const response_3 = await processUserQuery("mới nhất theo hãng APPLE");
        const response_4 = await processUserQuery("mới nhất theo hãng SAMSUNG");

        // Set dữ liệu cho các câu trả lời
        setAnswer1(response_1);
        setAnswer2(response_2);
        setAnswer3(response_3);
        setAnswer4(response_4);

        // Đánh dấu là dữ liệu đã được tải
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching answers:", error.message);
        setIsDataLoaded(true); // Data is loaded even if there's an error
      }
    };

    fetchAnswers();
  }, []); // Chạy một lần khi component được mount

  // Các bước của chatbot
  const steps = [
    {
      id: "1",
      message: "Chào Quý Khách! Bạn cần hỗ trợ gì hôm nay?",
      trigger: "2",
    },
    {
      id: "2",
      options: [
        { value: "priceRange", label: "Tìm kiếm theo mức giá", trigger: "3.1" },
        {
          value: "latestByBrand",
          label: "Mẫu mới nhất theo hãng",
          trigger: "3.2",
        },
        { value: "support", label: "Hỗ trợ kỹ thuật", trigger: "5.5" },
      ],
    },
    {
      id: "3.1",
      message: "Nhập mức giá.",
      trigger: "4.2",
    },
    {
      id: "3.2",
      message: "Nhập tên hãng bạn muốn tìm mẫu mới nhất.",
      trigger: "4.1",
    },
    {
      id: "4.1",
      options: [
        { label: "Apple", trigger: "5.1" },
        { label: "Samsung", trigger: "5.2" },
      ],
    },
    {
      id: "4.2",
      options: [
        { label: "Từ 5 đến 10 triệu", trigger: "5.3" },
        { label: "Từ 10 đến 20 triệu", trigger: "5.4" },
      ],
    },
    {
      id: "5.5",
      message:
        "Chúng tôi hiện tại chưa hỗ trợ kỹ thuật. Vui lòng liên hệ qua email hoặc điện thoại.",
        trigger: "6", // Điều hướng đến bước hiển thị phản hồi
    },
    {
      id: "5.1",
      message: () => {
        return `${answer_1}`;
      },
      trigger: "6", // Điều hướng đến bước hiển thị phản hồi
    },
    {
      id: "5.2",
      message: () => {
        return `${answer_2}`;
      },
      trigger: "6", // Điều hướng đến bước hiển thị phản hồi
    },
    {
      id: "5.3",
      message: () => {
        return `${answer_3}`;
      },
      trigger: "6", // Điều hướng đến bước hiển thị phản hồi
    },
    {
      id: "5.4",
      message: () => {
        return `${answer_4}`;
      },
      trigger: "6", // Điều hướng đến bước hiển thị phản hồi
    },
    {
      id: "6",
      message: "Bạn cần giúp gì khác không?",
      trigger: "2", // Điều hướng đến bước hiển thị phản hồi
    },
  ];

  // Chỉ hiển thị ChatBot khi dữ liệu đã được tải
  if (!isDataLoaded) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <ThemeProvider theme={theme}>
        <ChatBot
          speechSynthesis={{ enable: true, lang: "vn" }}
          steps={steps}
          headerTitle="Liên hệ hỗ trợ"
        />
      </ThemeProvider>
    </div>
  );
};

export default ChatBox;
