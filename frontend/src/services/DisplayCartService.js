import axios from "axios";

const CART_API_URL = "http://localhost:8000/cart";
const PRODUCT_API_URL = "http://localhost:8000/api/products";

// Lấy cart
export const getCartByUserId = async (userId) => {
  const response = await axios.get(CART_API_URL);
  const carts = response.data.data;

  // Tìm cart có userId và trạng thái PENDING
  const userCart = carts.find((cart) => cart.userId === parseInt(userId) && cart.state === "PENDING");

  if (!userCart) return [];

  const cartDetailsWithProduct = await Promise.all(
    userCart.cartDetails.map(async (item) => {
      try {
        const productRes = await axios.get(`${PRODUCT_API_URL}/${item.productId}`);
        const productData = productRes.data.data;

        return {
          ...item,
          name: productData.name,
          url: productData.url,
          salePrice: productData.salePrice,
          totalPrice: item.quantity * productData.salePrice,
        };
      } catch (err) {
        console.error("Không tìm thấy sản phẩm:", item.productId);
        return null;
      }
    })
  );

  return cartDetailsWithProduct.filter((item) => item !== null);
};
