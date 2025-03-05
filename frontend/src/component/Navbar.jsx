import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        paddingX: 40,
        backgroundColor: "#3E81FF",
        height: "90px",
        mt: 2,
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "150px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
        sx={{
          width: "150px",
          height: "50px",
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
          width: "150px",
          height: "50px",
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
          Giới Thiệu
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;