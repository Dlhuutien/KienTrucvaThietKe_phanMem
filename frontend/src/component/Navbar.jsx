import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };
  const handleCategoryClick = () => {
    navigate("/category");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        paddingX: 40,
        backgroundColor: "#FF6F00",
        height: "90px",
        mt: 2,
        alignItems: "center",
      }}
    >
      <Box
        onClick={handleHomeClick}
        sx={{
          width: "170px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: 5,
          "&:hover": {
            backgroundColor: "#fff",
            "& .text": {
              color: "black",
            },
            cursor: "pointer",
          },
        }}
      >
        <Typography
          className="text"
          variant="h5"
          sx={{
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Trang Chủ
        </Typography>
      </Box>
      <Box
        onClick={handleCategoryClick}
        sx={{
          width: "170px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: 5,
          "&:hover": {
            backgroundColor: "#fff",
            "& .text": {
              color: "black",
            },
            cursor: "pointer",
          },
        }}
      >
        <Typography
          className="text"
          variant="h5"
          sx={{
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Danh Mục
        </Typography>
      </Box>
      <Box
        sx={{
          width: "170px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: 5,
          px: 2,
          "&:hover": {
            backgroundColor: "#fff",
            "& .text": {
              color: "black",
            },
            cursor: "pointer",
          },
        }}
      >
        <Typography
          className="text"
          variant="h5"
          sx={{
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Khuyến Mãi
        </Typography>
      </Box>
      <Box
        sx={{
          width: "170px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: 5,
          "&:hover": {
            backgroundColor: "#fff",
            "& .text": {
              color: "black",
            },
            cursor: "pointer",
          },
        }}
      >
        <Typography
          component={Link}
          className="text"
          variant="h5"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            textDecoration: 'none'
          }}
        >
          Giới Thiệu
        </Typography>
      </Box>
      <Box
        sx={{
          width: "170px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: "#fff",
            "& .text": {
              color: "black",
            },
          },
        }}
      >
        <Typography
          component={Link}
          className="text"
          variant="h5"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            textDecoration: 'none'
          }}
        >
          Liên hệ
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;