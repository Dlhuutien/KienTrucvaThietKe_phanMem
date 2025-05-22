import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  ListItemText,
  InputBase,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import shop_logo from "../assets/logo-title.png";
import { useNavigate } from "react-router-dom";
import { searchProduct } from "../services/ProductService";
import { Link } from "react-router-dom";
import phone from "../assets/phone.png";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleShoppingCartShoppingCartClick = () => {
    navigate("/cart");
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  useEffect(()=>{
    if (searchTerm.trim()) {
      searchProduct(searchTerm)
        .then(response => {
          if (response.data.length === 0) {
            alert("No products found for your search term.");
          }
          setResults(response.data);
        })
        .catch(error => {
          console.error("Error searching for products:", error);
          setResults([]);
        });
    } else {
      setResults([]);
    }
  }, [searchTerm])

  const handleProductClick = () => {
    setSearchTerm('');
    setResults([]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F5F5F5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={shop_logo} alt="" style={{ width: 300, height: 200 }} />
        {/* <Typography variant="h4" fontWeight={700}>
          Dang lam logo voi dat ten lai
        </Typography> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid black",
          width: "600px",
          pl: 2,
          borderRadius: 20,
          borderColor: "#4a5395",
        }}
      >
        <InputBase
          placeholder="Tìm Kiếm..."
          size="small"
          sx={{ width: "90%", mt: "4px" }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <SearchIcon sx={{ ml: 2 }} />
        {results?.data?.length > 0 && (
          <List
            sx={{
              position: "absolute",
              top: "8%",
              left: "414px",
              width: "600px",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 1000,
              border: "1px solid #ccc",
            }}
          >
            {results.data.map((product) => (
              <ListItem
                key={product.id}
                component={Link}
                to={`/products/${product.id}`}
                sx={{
                  transition: "background-color 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar src={product.url} alt={product.name} />
                </ListItemAvatar>
                <ListItemText primary={product.name} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          onClick={handleLoginClick}
          sx={{
            display: "flex",
            mr: 3,
          }}
        >
          <AccountCircleIcon />
          <Button sx={{ top: -5, right: 10 }} variant="body1">
            Tài khoản
          </Button>
        </Box>
        <Box
          onClick={handleShoppingCartShoppingCartClick}
          sx={{
            display: "flex",
            mr: 3,
          }}
        >
          <ShoppingCartIcon />
          <Button sx={{ top: -5, right: 10 }} variant="body1">
            Giỏ hàng
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
