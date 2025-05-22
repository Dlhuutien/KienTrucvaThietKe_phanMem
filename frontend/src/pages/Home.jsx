import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Divider, Menu, MenuItem, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import iphone from '../assets/iphone16e.webp'
import xiaomi from '../assets/xiaomi15.webp'
import sale from '../assets/sale.webp'
import galaxyS25 from '../assets/galaxys25.webp'
import galaxyA56 from '../assets/galaxya56.webp'
import Item from "../component/Item";
import { listProduct, getInventories  } from "../services/ProductService";

const banners = [iphone, xiaomi, sale, galaxyS25, galaxyA56];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
    const [dataTest, setDataTest] = useState([]);
  // const [dataTest, setDataTest] = useState(fakeData);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  // useEffect(() => {
  //   listProduct()
  //     .then((response) => {
  //       setDataTest(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, inventoryRes] = await Promise.all([
          listProduct(),
          getInventories()
        ]);
  
        const products = productRes.data.data;
        const inventories = inventoryRes.data.data;
  
        // Map product với quantity từ inventory
        const merged = products.map(product => {
          const inventory = inventories.find(i => i.productId === product.id);
          return {
            ...product,
            quantity: inventory ? inventory.quantity : 0
          };
        });
  
        // Lọc chỉ lấy sản phẩm có quantity > 0
        const availableProducts = merged.filter(product => product.quantity > 0);
  
        setDataTest({ data: availableProducts });
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };
  
    fetchData();
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
          width: '80%',
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
            SẢN PHẨM
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
              new_price={item.salePrice}
              old_price={item.salePrice}
              sale={item.percentDiscount}
              id={item.id}
              key={index}
            />
          ))}
      </Box>
      {/* <Box
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
      </Box> */}
    </Box>
  );
};

export default Home;
