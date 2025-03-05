import React from "react";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {
  Box,
  Typography,
  Button,
  Divider,
  InputBase,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#3E81FF",
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "700",
            }}
          >
            Email Quảng Cáo
          </Typography>
          <InputBase placeholder="Nhập email của bạn" sx={{ mt: 5 }} />
          <Divider
            sx={{
              width: "200px",
              height: 2,
              backgroundColor: "#fff",
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#000",
              mt: 5,
            }}
          >
            Nhận thông tin
          </Button>
        </Box>
        <Box>
          <List
            sx={{
              mr: 5,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                fontWeight: "700",
              }}
            >
              Thông Tin
            </Typography>
            <ListItem>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Điên thoại"
                secondary="090-909-090"
                sx={{
                  "& .MuiTypography-root": {
                    color: "#fff",
                  },
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EmailOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Email"
                secondary="abc123@gmail.com"
                sx={{
                  "& .MuiTypography-root": {
                    color: "#fff",
                  },
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText
                primary="Địa chỉ"
                secondary="100 abc St"
                sx={{
                  "& .MuiTypography-root": {
                    color: "#fff",
                  },
                }}
              />
            </ListItem>
          </List>
        </Box>
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "700",
            }}
          >
            Liên hệ
          </Typography>
          <Box mt={2} width={"100px"} sx={{ display: "flex", mr: 2 }}>
            <XIcon sx={{ width: 40, height: 40 }} />
            <YouTubeIcon sx={{ width: 40, height: 40 }} />
            <InstagramIcon sx={{ width: 40, height: 40 }} />
            <FacebookIcon sx={{ width: 40, height: 40 }} />
          </Box>
        </Box>
      </Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "700",
          color: "#fff",
          mt: 2,
        }}
      >
        © Copyright 2018 - All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
