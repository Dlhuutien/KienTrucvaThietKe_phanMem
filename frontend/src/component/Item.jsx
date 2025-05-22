import React from "react";
import {
  Box,
  Card,
  Typography,
  CardMedia,
  CardContent,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";

const Item = ({
  id,
  name,
  image,
  sale,
  new_price,
  old_price,
  rating = 5,
  ratingCount = 0,
}) => {
  // Đặt rating mặc định là 5 và ratingCount là 0 nếu không có giá trị
  function formatCurrency(value) {
    if (!value) return "0 VND"; // Trường hợp không có giá trị
    return new Intl.NumberFormat("vi-VN").format(value) + " VND";
  }

  return (
    <Link
      to={`/products/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box sx={{ cursor: "pointer" }}>
        <Card
          sx={{
            width: 300,
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              "& .product-name": {
                color: "aqua",
              },
            },
          }}
        >
          <CardMedia
  component="img"
  image={image || require("../assets/no_image_available.png")} // Nếu không có image thì sử dụng hình mặc định
  onError={(e) => { e.target.onerror = null; e.target.src = require("../assets/no_image_available.png"); }} // Sử dụng hình mặc định nếu không tải được ảnh
  sx={{
    width: "100%",
    height: "300px",
    objectFit: "contain",
  }}
/>


          {/* {sale !== 0 && (
            <Box
              sx={{
                position: "absolute",
                width: 60,
                height: 30,
                borderRadius: 2,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                backgroundColor: "red",
                color: "#fff",
                ml: 30,
                mt: -35,
              }}
            >
              <Typography>{sale}%</Typography>
            </Box>
          )} */}
          <CardContent sx={{ width: 350 }}>
            <Typography
              className="product-name" // Add a class to identify the name
              sx={{
                fontSize: 20,
                transition: "color 0.3s",
              }}
            >
              {name}
            </Typography>{" "}
            {/* <Typography
              sx={{
                textDecorationLine: "line-through",
                color: "gray",
              }}
            >
              {old_price !== new_price && formatCurrency(old_price)}
            </Typography> */}
            <Typography
              sx={{
                color: "red",
                mr: 2,
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              {formatCurrency(new_price)}
            </Typography>
            <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
              <Rating
                name="product-rating"
                value={rating} // Rating value can be passed dynamically
                readOnly // Make it read-only since it's just displaying the rating
                precision={0.5} // You can change this to allow half-star precision
              />
              <Typography
                sx={{
                  ml: 1,
                  fontSize: 14,
                  color: "gray",
                }}
              >
                ({ratingCount} đánh giá){" "}
                {/* Hiển thị số lượng đánh giá với chữ tiếng Việt */}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Link>
  );
};

export default Item;
