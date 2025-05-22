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
  Modal,
  Snackbar,
  Alert
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import noImageAvailable from "../assets/no_image_available.png";
import LoadingModal from "../component/LoadingModal";
import image01 from "../assets/phone_url01.png";
import image02 from "../assets/phone_url02.png";
import image03 from "../assets/phone_url03.png";
import image04 from "../assets/phone_url04.png";
import { getProductById } from "../services/ProductService";
import { createCart } from "../services/AddCartDetailService";
import CircularProgress from "@mui/material/CircularProgress";

const Product_detail = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({
    discountedPrice: 0,
    percentDiscount: 0,
    id: -1,
    name: "",
    url: noImageAvailable,
    brand: "",
    category: "",
    quantity: 1,
    salePrice: 0,
    purchasePrice: 0,
    batteryLife: 0,
    chip: "",
    ram: "",
    rom: "",
    os: "",
    screenSize: 0.0,
    capacity: 0,
    input: "",
    output: "",
    cableType: "",
    connectionType: "",
  });
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [addCartLoading, setAddCartLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState("");

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      getProductById(productId)
        .then((response) => setProduct(response.data.data))
        .catch(() => { })
        .finally(() => setIsLoading(false));
    }
  }, [productId]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    setComments((prev) => [
      ...prev,
      { id: Date.now(), name: "Guest", content: newComment, rating: newRating },
    ]);
    setNewComment("");
    setNewRating(0);
  };

  const formatCapacity = (value) =>
    !value ? "N/A" : value.split("_")[0] === "GB" ? `${value.split("_")[1]} GB` : value;

  const formatCurrency = (value) =>
    value ? new Intl.NumberFormat("vi-VN").format(value) + " VND" : "0 VND";

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setOpenModal(true);
      return;
    }

    try {
      setAddCartLoading(true);
      const cartDTO = {
        userId: parseInt(userId),
        cartDetails: [{ productId: product.id, quantity }],
      };
      await createCart(cartDTO);
      setSnackbarOpen(true);
    } catch (error) {
      const backendMsg =
        error?.response?.data?.message || "Đã có lỗi xảy ra, vui lòng thử lại sau.";
      setSnackbarErrorMessage(backendMsg);
      setSnackbarErrorOpen(true);
    } finally {
      setAddCartLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", backgroundColor: "white", padding: "20px" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: "20px", display: "flex", justifyContent: "flex-start", mr: "700px" }}>
        <Link color="inherit" href="/" component={RouterLink}>Home</Link>
        <Link color="inherit" href="/category" component={RouterLink}>Category</Link>
        <Typography color="textPrimary">{product.name}</Typography>
      </Breadcrumbs>
      <LoadingModal isLoading={isLoading} />
      <Box display="flex">
        <Box sx={{ mt: "35px", textAlign: "center", mr: "180px" }}>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "10px", mb: 2 }}>
            <img src={product.url} style={{ width: "350px", height: "350px", borderRadius: "5px", backgroundColor: "#e0e0e0" }} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "10px", mb: 2 }}>
            <img src={image01} style={{ width: "60px", height: "60px", borderRadius: "5px", backgroundColor: "#e0e0e0" }} />
            <img src={image02} style={{ width: "60px", height: "60px", borderRadius: "5px", backgroundColor: "#e0e0e0" }} />
            <img src={image03} style={{ width: "60px", height: "60px", borderRadius: "5px", backgroundColor: "#e0e0e0" }} />
            <img src={image04} style={{ width: "60px", height: "60px", borderRadius: "5px", backgroundColor: "#e0e0e0" }} />
          </Box>
        </Box>
        <Box>
          <h1>{product.name}</h1>
          <Box sx={{ display: "flex", mt: 1 }}>
            <Typography sx={{ textDecorationLine: "line-through", color: "gray" }}>
              {product.discountedPrice !== product.salePrice && formatCurrency(product.salePrice)}
            </Typography>
            <Typography sx={{ color: "red", mr: 2, fontWeight: "700", fontSize: 20 }}>
              {formatCurrency(product.discountedPrice)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "left", gap: "20px", mb: 2 }}>
            <p style={{ fontSize: "16px", margin: 0 }}>Số lượng</p>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Button size="small" sx={{ border: "1px black solid", minWidth: "30px", height: "30px", fontSize: "18px" }} onClick={handleDecrement}>-</Button>
              <Typography sx={{ fontSize: "18px", padding: "0 10px", minWidth: "40px", textAlign: "center" }}>{quantity}</Typography>
              <Button size="small" sx={{ border: "1px black solid", minWidth: "30px", height: "30px", fontSize: "18px" }} onClick={handleIncrement}>+</Button>
            </Box>
          </Box>
          <Button variant="contained" color="primary" onClick={handleAddToCart} disabled={addCartLoading} sx={{ minWidth: 160 }}>
            {addCartLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Thêm vào giỏ hàng"}
          </Button>
        </Box>
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", borderRadius: 2, boxShadow: 24, p: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>Vui lòng đăng nhập!</Typography>
          <Typography sx={{ mb: 2 }}>Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" onClick={() => setOpenModal(false)}>Đóng</Button>
            <Button variant="contained" onClick={() => { setOpenModal(false); navigate("/login"); }}>Đăng nhập ngay</Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          Sản phẩm đã được thêm vào giỏ hàng!
        </Alert>
      </Snackbar>
      <Snackbar open={snackbarErrorOpen} autoHideDuration={4000} onClose={() => setSnackbarErrorOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={() => setSnackbarErrorOpen(false)} severity="error" sx={{ width: "100%" }}>
          {snackbarErrorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Product_detail;
