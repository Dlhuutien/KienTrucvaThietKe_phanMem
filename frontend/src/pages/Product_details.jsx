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
import { useParams, Link as RouterLink } from "react-router-dom";
import noImageAvailable from "../assets/no_image_available.png";
import LoadingModal from "../component/LoadingModal";
import image01 from "../assets/phone_url01.png";
import image02 from "../assets/phone_url02.png";
import image03 from "../assets/phone_url03.png";
import image04 from "../assets/phone_url04.png";
import { getProductById } from "../services/ProductService";
import { message } from "antd";
import { createCart } from "../services/AddCartDetailService";
import { useNavigate } from "react-router-dom";
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
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "John Doe",
      content: "Bài viết rất hay, cảm ơn bạn!",
      rating: 4,
    },
    {
      id: 2,
      name: "Jane Smith",
      content: "Mình thích nội dung này, chờ bài tiếp theo nhé!",
      rating: 5,
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [addCartLoading, setAddCartLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      getProductById(productId)
        .then((response) => setProduct(response.data.data))
        .catch((error) => console.error("Error fetching product:", error))
        .finally(() => setIsLoading(false));
    }
  }, [productId]);

  const handleIncrement = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const handleDecrement = () =>
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    setComments((prev) => [
      ...prev,
      { id: Date.now(), name: "Guest", content: newComment, rating: newRating },
    ]);
    setNewComment("");
    setNewRating(0);
  };

  // Format functions
  const formatCapacity = (value) =>
    !value
      ? "N/A"
      : value.split("_")[0] === "GB"
      ? `${value.split("_")[1]} GB`
      : value;
  const formatCurrency = (value) =>
    value ? new Intl.NumberFormat("vi-VN").format(value) + " VND" : "0 VND";

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");
    if (userId == null) {
      setOpenModal(true);
      return;
    }
  
    try {
      setAddCartLoading(true);
      const cartDTO = {
        userId: parseInt(userId),
        cartDetails: [
          {
            productId: product.id,
            quantity: quantity,
          },
        ],
      };
  
      await createCart(cartDTO);
  
      setSnackbarOpen(true); // show snackbar
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      message.error("Thêm vào giỏ hàng thất bại.");
    } finally {
      setAddCartLoading(false);
    }
  };

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
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          mb: "20px",
          display: "flex",
          justifyContent: "flex-start",
          mr: "700px",
        }}
      >
        <Link color="inherit" href="/" component={RouterLink}>
          Home
        </Link>
        <Link color="inherit" href="/category" component={RouterLink}>
          Category
        </Link>
        <Typography color="textPrimary">{product.name}</Typography>
      </Breadcrumbs>
      <LoadingModal isLoading={isLoading} />
      <Box display="flex">
        <Box sx={{ mt: "35px", textAlign: "center", mr: "180px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
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
              gap: "10px",
              mb: 2,
            }}
          >
            <img
              src={image01}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "5px",
                backgroundColor: "#e0e0e0",
              }}
            />
            <img
              src={image02}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "5px",
                backgroundColor: "#e0e0e0",
              }}
            />
            <img
              src={image03}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "5px",
                backgroundColor: "#e0e0e0",
              }}
            />
            <img
              src={image04}
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

          <Box sx={{ display: "flex", mt: 1 }}>
            {/* <Typography
              sx={{ textDecorationLine: "line-through", color: "gray" }}
            >
              {product.discountedPrice !== product.salePrice &&
                formatCurrency(product.salePrice)}
            </Typography> */}
            <Typography
              sx={{ color: "red", mr: 2, fontWeight: "700", fontSize: 20 }}
            >
              {formatCurrency(product.salePrice)}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "left", gap: "20px", mb: 2 }}
          >
            <p style={{ fontSize: "16px", margin: 0 }}>Số lượng</p>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
                  minWidth: "40px",
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            disabled={addCartLoading}
            sx={{ minWidth: 160 }}
          >
            {addCartLoading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Thêm vào giỏ hàng"
            )}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          mt: 4,
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <Box
          sx={{
            flex: 1,
            border: 1,
            borderColor: "grey.300",
            padding: 2,
            borderRadius: "5px",
          }}
        >
          <h3 style={{ color: "#FF0000", textAlign: "center" }}>
            Thông số kỹ thuật
          </h3>
          <Box>
            {/* Render nội dung dựa trên category */}
            {product.category === "PHONE" && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                    backgroundColor: "#E2EEFF",
                  }}
                >
                  <span>Chip</span>
                  <span>{product.chip}</span>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                  }}
                >
                  <span>RAM</span>
                  <span>{formatCapacity(product.ram)}</span>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                    backgroundColor: "#E2EEFF",
                  }}
                >
                  <span>ROM</span>
                  <span>{formatCapacity(product.rom)}</span>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                  }}
                >
                  <span>Hệ điều hành</span>
                  <span>{product.os}</span>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                    backgroundColor: "#E2EEFF",
                  }}
                >
                  <span>Kích thước màn hình</span>
                  <span>{product.screenSize} inch</span>
                </Box>
              </>
            )}
            {product.category === "POWER_BANK" && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                    backgroundColor: "#E2EEFF",
                  }}
                >
                  <span>Dung lượng</span>
                  <span>{product.capacity} mAh</span>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                  }}
                >
                  <span>Input</span>
                  <span>{product.input}</span>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                    backgroundColor: "#E2EEFF",
                  }}
                >
                  <span>Output</span>
                  <span>{product.output}</span>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                  }}
                >
                  <span>Sạc nhanh</span>
                  <span>{product.fastCharging}W</span>
                </Box>
              </>
            )}
            {product.category === "EARPHONE" && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                    backgroundColor: "#E2EEFF",
                  }}
                >
                  <span>Thời lượng pin</span>
                  <span>{product.batteryLife} giờ</span>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                  }}
                >
                  <span>Loại kết nối</span>
                  <span>{product.connectionType}</span>
                </Box>
              </>
            )}
            {product.category === "CHARGING_CABLE" && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                    backgroundColor: "#E2EEFF",
                  }}
                >
                  <span>Loại cáp</span>
                  <span>{product.cableType}</span>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                  }}
                >
                  <span>Chiều dài</span>
                  <span>{product.length} cm</span>
                </Box>
              </>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            border: 1,
            borderColor: "grey.300",
            padding: 2,
            borderRadius: "5px",
          }}
        >
          <h3 style={{ color: "#FF0000", textAlign: "center" }}>
            Đặc điểm nổi bật
          </h3>
          <p style={{ textIndent: "20px" }}>
            {product.name} là một lựa chọn hoàn hảo cho những ai đang tìm kiếm
            một thiết bị kết hợp giữa hiệu năng mạnh mẽ và thiết kế tinh tế. Với
            màn hình sắc nét và độ phân giải cao, bạn sẽ có những trải nghiệm
            tuyệt vời khi xem phim, chơi game hoặc lướt web. Màn hình lớn, sắc
            nét mang đến những hình ảnh chân thực, sống động, giúp người dùng có
            thể tận hưởng mọi khoảnh khắc giải trí một cách trọn vẹn.
          </p>
        </Box>
      </Box>
      <Box
        sx={{
          width: "950px",
          margin: "10px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: "20px", fontWeight: "bold" }}
        >
          Bình luận
        </Typography>
        <List
          sx={{ maxHeight: "300px", overflow: "auto", marginBottom: "20px" }}
        >
          {comments.map((comment) => (
            <ListItem
              key={comment.id}
              alignItems="flex-start"
              sx={{ marginBottom: "10px" }}
            >
              <Avatar sx={{ bgcolor: deepPurple[500], marginRight: "10px" }}>
                {comment.name.charAt(0).toUpperCase()}
              </Avatar>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "bold" }}>
                    {comment.name}
                  </Typography>
                }
                secondary={
                  <>
                    {comment.content}
                    <br />
                    <Rating
                      name={`rating-${comment.id}`}
                      value={comment.rating}
                      readOnly
                      precision={0.5}
                    />
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Nhập bình luận của bạn..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="caption">Đánh giá của bạn</Typography>
            <Rating
              name="new-comment-rating"
              value={newRating}
              onChange={(e, newValue) => setNewRating(newValue)}
              precision={0.5}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComment}
          >
            Gửi
          </Button>
        </Box>
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Vui lòng đăng nhập!
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" onClick={() => setOpenModal(false)}>
              Đóng
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setOpenModal(false);
                navigate("/login");
              }}
            >
              Đăng nhập ngay
            </Button>
          </Box>
        </Box>
      </Modal>;
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Sản phẩm đã được thêm vào giỏ hàng!
          </Alert>
        </Snackbar>
    </Box>  
);
};

export default Product_detail;
