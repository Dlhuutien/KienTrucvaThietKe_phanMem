import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  Link,
  TextField,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Rating,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useParams, Link as RouterLink } from "react-router-dom";
import noImageAvailable from "../assets/no_image_available.png";
import LoadingModal from "../component/LoadingModal";
import hinhanh from '../assets/iphone15.jpeg'
import { getProductById } from "../services/ProductService";

const fakeData = {
  data: [
    { id: 1, name: "iPhone 14", url: hinhanh, purchasePrice: 22000000, salePrice: 25000000, percentDiscount: 12 },
    { id: 2, name: "Samsung Galaxy S23", url: hinhanh, purchasePrice: 20000000, salePrice: 23000000, percentDiscount: 13 },
    { id: 3, name: "MacBook Pro", url: hinhanh, purchasePrice: 35000000, salePrice: 40000000, percentDiscount: 10 },
    { id: 4, name: "Realme GT Neo", url: hinhanh, purchasePrice: 10000000, salePrice: 12000000, percentDiscount: 15 },
    { id: 5, name: "Huawei P50", url: hinhanh, purchasePrice: 15000000, salePrice: 18000000, percentDiscount: 14 },
    { id: 6, name: "iPhone 13", url: hinhanh, purchasePrice: 18000000, salePrice: 20000000, percentDiscount: 10 },
    { id: 7, name: "Samsung Z Fold 4", url: hinhanh, purchasePrice: 35000000, salePrice: 40000000, percentDiscount: 12 },
    { id: 8, name: "MacBook Air M2", url: hinhanh, purchasePrice: 28000000, salePrice: 30000000, percentDiscount: 7 },
    { id: 9, name: "Realme C55", url: hinhanh, purchasePrice: 5000000, salePrice: 6000000, percentDiscount: 8 },
    { id: 10, name: "Huawei Mate 40", url: hinhanh, purchasePrice: 20000000, salePrice: 23000000, percentDiscount: 13 },
    { id: 11, name: "iPhone 12", url: hinhanh, purchasePrice: 16000000, salePrice: 18000000, percentDiscount: 11 },
    { id: 12, name: "Samsung A73", url: hinhanh, purchasePrice: 9000000, salePrice: 10000000, percentDiscount: 10 },
    { id: 13, name: "MacBook Pro M1", url: hinhanh, purchasePrice: 30000000, salePrice: 32000000, percentDiscount: 6 },
    { id: 14, name: "Realme 9 Pro", url: hinhanh, purchasePrice: 7000000, salePrice: 8000000, percentDiscount: 9 },
    { id: 15, name: "Huawei Nova 9", url: hinhanh, purchasePrice: 12000000, salePrice: 14000000, percentDiscount: 12 },
    { id: 16, name: "iPhone 11", url: hinhanh, purchasePrice: 13000000, salePrice: 15000000, percentDiscount: 10 },
  ],
};

const Product_detail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      const foundProduct = fakeData.data.find(p => p.id.toString() === productId);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [productId]);

  const handleIncrement = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const handleDecrement = () =>
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));

  // Format functions
  const formatCapacity = (value) =>
    !value
      ? "N/A"
      : value.split("_")[0] === "GB"
        ? `${value.split("_")[1]} GB`
        : value;
  const formatCurrency = (value) =>
    value ? new Intl.NumberFormat("vi-VN").format(value) + " VNĐ" : "0 VNĐ";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        backgroundColor: "white",
        padding: "20px",
      }}
    >
      <LoadingModal isLoading={isLoading} />
      <Box display="flex" sx={{ maxWidth: "1000px", width: "100%" }}>
        <Box sx={{ mt: "35px", textAlign: "center", mr: "180px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              mb: 2,
            }}
          >
            <img
              src={product.url}
              style={{
                width: "350px",
                height: "350px",
                borderRadius: "5px",
                backgroundColor: "#e0e0e0",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              mb: 2,
            }}
          >
            <img
              src={product.url}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "5px",
                backgroundColor: "#e0e0e0",
              }}
            />
            <img
              src={product.url}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "5px",
                backgroundColor: "#e0e0e0",
              }}
            />
            <img
              src={product.url}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "5px",
                backgroundColor: "#e0e0e0",
              }}
            />
            <img
              src={product.url}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "5px",
                backgroundColor: "#e0e0e0",
              }}
            />
          </Box>
        </Box>

        <Box>
          <h1>{product.name}</h1>

          <Box sx={{ display: "flex", my: 1, gap: "25px", alignItems: "center" }}>
            <Typography
              sx={{ textDecorationLine: "line-through", color: "gray" }}
            >
              {product.discountedPrice !== product.salePrice &&
                formatCurrency(product.salePrice)}
            </Typography>
            <Typography
              sx={{ color: "red", mr: 2, fontWeight: "700", fontSize: 20 }}
            >
              {formatCurrency(product.purchasePrice)}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "left", gap: "20px", mb: 2 }}
          >
            <p style={{ fontSize: "16px", margin: 0 }}>Số lượng</p>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                size="small"
                sx={{
                  border: "1px black solid",
                  minWidth: "30px",
                  height: "30px",
                  fontSize: "18px",
                }}
                onClick={handleDecrement}
              >
                -
              </Button>
              <Typography
                sx={{
                  fontSize: "18px",
                  padding: "0 10px",
                  minWidth: "20px",
                  textAlign: "center",
                }}
              >
                {quantity}
              </Typography>
              <Button
                size="small"
                sx={{
                  border: "1px black solid",
                  minWidth: "30px",
                  height: "30px",
                  fontSize: "18px",
                }}
                onClick={handleIncrement}
              >
                +
              </Button>
            </Box>
          </Box>

          <Button variant="contained"
            sx={{
              backgroundColor: "#5FC1FF",
              '&:hover': { backgroundColor: "#4DA9E0" },
              borderRadius: "20px",
            }}
          >
            Thêm vào giỏ hàng
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
          mb: 5,
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <Box
          sx={{
            flex: 1,
            border: 1,
            borderColor: "black.300",
            paddingX: 5,
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
        >
          <h3 style={{ color: "#FF0000", textAlign: "center" }}>
            Thông số kỹ thuật
          </h3>
          <Box>
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px",
                  backgroundColor: "#E2EEFF",
                }}
              >
                <span>Màn hình</span>
                <span style={{ marginRight: "15px", }}>......</span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px",
                }}
              >
                <span>Thiết kế</span>
                <span style={{ marginRight: "15px", }}>......</span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px",
                  backgroundColor: "#E2EEFF",
                }}
              >
                <span>Camera</span>
                <span style={{ marginRight: "15px", }}>......</span>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px",
                }}
              >
                <span>CPU</span>
                <span style={{ marginRight: "15px", }}>......</span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px",
                  backgroundColor: "#E2EEFF",
                }}
              >
                <span>RAM</span>
                <span style={{ marginRight: "15px", }}>......</span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px",
                }}
              >
                <span>Dung lượng Pin</span>
                <span style={{ marginRight: "15px", }}>......</span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px",
                  backgroundColor: "#E2EEFF",
                }}
              >
                <span>Kết nối</span>
                <span style={{ marginRight: "15px", }}>......</span>
              </Box>
            </>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            border: 1,
            borderColor: "black.300",
            paddingX: 5,
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <h3 style={{ color: "#FF0000", textAlign: "center" }}>
            Đặc điểm nổi bật
          </h3>
          <p>
            {product.name} Lorem Ipsum is simply dummy text of the printing and typeset
            ting
            industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries,
            vbut also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default Product_detail;
