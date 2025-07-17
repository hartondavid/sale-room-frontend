import { Box, Button, Typography, IconButton } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import { apiGetCartIdByUserId, apiRemoveProductFromCart } from "../../api/carts";

import { apiGetCartItemsByCartId } from "../../api/carts";
import DeleteIcon from '@mui/icons-material/Delete';


const ShoppingCard = ({ user }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const loggedUser = user?.data;

  useEffect(() => {

    apiGetCartIdByUserId(
      (response) => {
        const cartId = response.data.cart_id;

        apiGetCartItemsByCartId(
          (response) => {
            setData(response.data.items);
          },
          showErrorToast,
          cartId
        );
      },
      showErrorToast,
      loggedUser?.id
    )
  }, [loggedUser?.id])


  const handleRemoveProductFromCart = async (productId) => {
    try {
      let cartId = null;
      await apiGetCartIdByUserId(
        (response) => {
          cartId = response.data.cart_id;
        },
        showErrorToast,
        loggedUser.id
      );

      if (cartId) {
        await apiRemoveProductFromCart(
          (response) => {
            showSuccessToast("Product removed from cart");
            // Remove the product from the local state immediately
            setData((prevData) => prevData.filter((item) => item.id !== productId));
          },
          showErrorToast,
          cartId,
          productId
        );
      } else {
        showErrorToast("No cart found for user");
      }
    } catch (error) {
      showErrorToast("Failed to remove product from cart");
    }
  };

  // Calculeaza suma totala a produselor din cos
  const totalPrice = data.reduce((sum, item) => sum + Number(item.current_price), 0);

  return (
    <>

      <Typography variant="h5" sx={{
        mb: 3, fontWeight: 'bold',
        color: 'black', letterSpacing: 1, pl: 2, pt: 2
      }}>
        Coșul tău de cumpărături
      </Typography>

      {data && data.length > 0 ? (
        <Box
          sx={{
            // background: '#fff',
            // borderRadius: 3,
            // boxShadow: 3,
            maxWidth: 600,
            m: 2
          }}
        >

          {data.map((item, idx) => (
            <Box
              key={item.id || idx}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
                p: 2,
                background: '#f5faff',
                borderRadius: 2,
                boxShadow: 1,
                transition: 'box-shadow 0.2s',
                '&:hover': {
                  boxShadow: 4,
                  background: '#e3f2fd'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Box
                  component="img"
                  src={item.photo ? `${process.env.REACT_APP_API_URL}/${item.photo}` : '/no-image.png'}
                  onError={(e) => {
                    console.error('Image failed to load:', `${process.env.REACT_APP_API_URL}/${item.photo}`);
                    e.target.src = '/no-image.svg';
                  }}
                  alt={item.name}
                  sx={{
                    width: 64,
                    height: 64,
                    objectFit: 'cover',
                    borderRadius: 2,
                    mr: 2,
                    border: '1px solid #e0e0e0',
                    background: '#fff'
                  }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'black' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black', mb: 0.5 }}>
                    {item.description}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ minWidth: 100, textAlign: 'right' }}>
                <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
                  {item.current_price} LEI
                </Typography>
              </Box>
              <IconButton
                size="small"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveProductFromCart(item.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>

          ))}

          <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold', textAlign: 'right', mt: 2 }}>Total: {totalPrice} LEI</Typography>


        </Box>
      ) : (
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: 'black', letterSpacing: 1, pl: 2 }}>
          Coșul tău este gol
        </Typography>
      )}


      {data && data.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4, mb: 4, ml: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: 'rgb(133, 20, 20)', color: 'white' }} onClick={() => navigate('/dashboard/createOrder')} >
            Adauga comanda
          </Button>
        </Box>
      )}

    </>
  )
}

export default ShoppingCard;