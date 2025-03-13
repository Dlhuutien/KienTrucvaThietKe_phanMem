import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Divider ,Menu, MenuItem , IconButton} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import iphone from '../assets/iphone.png'
import huawei from '../assets/huawei.png'
import realme from '../assets/Realme.png'
import samsung from '../assets/samsung.png'
import macbook from '../assets/macbook.png'
import Item from "../component/Item";
import { listProduct } from "../services/ProductService";

import hinhanh from '../assets/iphone15.jpeg'

const banners = [iphone,samsung,macbook,realme,huawei];

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
  

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
//   const [dataTest, setDataTest] = useState([]);
  const [dataTest, setDataTest] = useState(fakeData);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    listProduct()
      .then((response) => {
        setDataTest(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + banners.length) % banners.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
  };
  console.log(dataTest);
    
  return (
    <Box p={4}>
      <Box
      sx={{
        position: 'relative',
        width: '50%',
        margin: 'auto',
        overflow: 'hidden',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Hình ảnh banner */}
      <Box
        component="img"
        src={banners[currentSlide]}
        alt={`Banner ${currentSlide + 1}`}
        sx={{
          width: '100%',
          height: 'auto',
          transition: 'transform 0.5s ease-in-out',
        }}
      />

      {/* button */}
      <IconButton
        onClick={handlePrevSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}
      >
        <ArrowBackIos />
      </IconButton>

      {/* button */}
      <IconButton
        onClick={handleNextSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 5,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "700",
              color: "red",
            }}
          >
            SẢN PHẨM MỚI
          </Typography>
          <Divider
            sx={{
              width: "300px",
              backgroundColor: "red",
              height: 2,
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          flexWrap: "wrap",
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          mt: 2,
        }}
      >
        {dataTest.data &&
          dataTest.data.slice(0, 8).map((item, index) => (
            <Item
              name={item.name}
              image={item.url}//change to item.url when have
              new_price={item.purchasePrice}
              old_price={item.salePrice}
              sale={item.percentDiscount}
              id={item.id}
              key={index}
            />
          ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 5,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "700",
              color: "red",
            }}
          >
            SIÊU ƯU ĐÃI
          </Typography>
          <Divider
            sx={{
              width: "300px",
              backgroundColor: "red",
              height: 2,
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          flexWrap: "wrap",
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          mt: 2,
        }}
      >
        {dataTest.data &&
          dataTest.data.slice(8, 16).map((item, index) => (
            <Item
              name={item.name}
              image={item.url}//change to item.url when have
              new_price={item.purchasePrice}
              old_price={item.salePrice}
              sale="10"
              id={item.id}
              key={index}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Home;
