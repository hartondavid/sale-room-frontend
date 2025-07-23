import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    Button,
    IconButton,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Pagination,
    TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { apiDeleteProduct } from '../api/products';
import { showErrorToast, showSuccessToast } from '../utils/utilFunctions';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import StartedEventClock from './StartedEventClock'; // adjust path as needed

import { apiCreateCart, apiAddProductToCart, apiGetCartIdByUserId } from "../api/carts";
import UnstartedEventClock from './UnstartedEventClock';
import { apiGetUserRights } from '../api/rights';
import { apiIncreaseProductPrice, apiGetAllProducts } from '../api/products';
import { addStyleToTextField } from '../utils/utilFunctions';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { getImageUrl, handleImageError, getImageSource } from '../utils/imageUtils';
import ImageDebug from './ImageDebug';

const ProductCards = ({ products, setProducts, editButton = false, deleteButton = false, increasePriceButton = false,
    addButton = false, title = false }) => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;
    const [rightCode, setRightCode] = useState('');
    const [userId, setUserId] = useState(null);

    const [formData, setFormData] = useState({
        new_price: '',
        current_price: '',
    });



    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleOpenDialog = (productId) => {
        setProductToDelete(productId);
        setOpenDialog(true);


    };

    const handleDeleteProduct = () => {
        apiDeleteProduct(
            (response) => {
                showSuccessToast(response.message);
                setProducts(products => products.filter(product => product.id !== productToDelete));
                setOpenDialog(false);
            },
            showErrorToast,
            productToDelete,
        );
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        apiGetUserRights(
            (response) => {

                setRightCode(response[0]?.right_code);

                setUserId(response[0]?.user_id);


            },
        )
    }, [userId])


    // Calculate pagination
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const [now, setNow] = useState(Date.now());


    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    const [productToDetails, setProductToDetails] = useState(null);
    const [openProductDetailsDialog, setOpenProductDetailsDialog] = useState(false);

    const [openAddOfferDialog, setOpenAddOfferDialog] = useState(false);
    const [productId, setProductId] = useState(null);

    function getCardOnClick(product) {
        if (product.status === 'inactive') return undefined;

        return () => handleOpenProductDetailsDialog(product);
    }



    const handleOpenProductDetailsDialog = (product) => {
        setProductToDetails(product);
        setOpenProductDetailsDialog(true);
    };

    const handleCloseProductDetailsDialog = () => {
        setOpenProductDetailsDialog(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();


        if (formData.new_price <= formData.current_price || formData.new_price === '') {
            showErrorToast("Oferta noua trebuie sa fie mai mare decat oferta actuala");
            return;
        }


        apiIncreaseProductPrice((response) => {

            showSuccessToast(response.message);

            apiGetAllProducts((response) => {
                setProducts(response.data);
            }, showErrorToast);
        }, showErrorToast, productId, formData)
        setOpenAddOfferDialog(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCloseAddOfferDialog = () => {
        setOpenAddOfferDialog(false);
    };


    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>

                {title && (
                    <Typography variant="h4">{title}</Typography>
                )}
                {addButton && (
                    <Button
                        variant="contained"
                        onClick={() => navigate('/dashboard/createEditProduct/0')}
                        sx={{
                            backgroundColor: 'rgb(133, 20, 20)',
                            color: 'white', '&:hover': { backgroundColor: 'rgb(133, 20, 20)' }
                        }}
                    >
                        Adauga produs
                    </Button>
                )}
            </Box>

            <Grid container spacing={3}>
                {currentItems.map((product) => (
                    <Grid item xs={12} sm={3} md={3} lg={3} key={product.id}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',

                                position: 'relative',
                                '&:hover': {
                                    boxShadow: product.status === 'inactive' ? 1 : 6,
                                    cursor: product.status === 'inactive' ? 'not-allowed' : 'pointer'
                                }
                            }}
                            onClick={getCardOnClick(product, editButton, navigate)}
                        >
                            {process.env.NODE_ENV === 'development' && (
                                <ImageDebug imagePath={product.photo} />
                            )}


                            <CardMedia
                                component="img"
                                height="200"
                                image={process.env.NODE_ENV === 'development' ? product.photo : getImageUrl(product.photo)}
                                alt={product.name}
                                sx={{
                                    objectFit: 'cover',
                                    filter: product.status === 'inactive' ? 'grayscale(50%)' : 'none'
                                }}
                                onError={(e) => handleImageError(e, getImageUrl(product.photo))}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="black" sx={{ mb: 1, fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                                    {product.description && product.description.length > 30
                                        ? <>
                                            {product.description.slice(0, 30)}<MoreHorizIcon fontSize="small" sx={{ ml: 0.5 }} />
                                        </>
                                        : product.description}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', mt: 2, mb: 2 }}>
                                    <Typography variant="body2" color="black" sx={{ fontSize: '25px', fontWeight: 'bold' }}>
                                        Oferta initiala:
                                    </Typography>

                                    <Typography variant="body2" color="black" sx={{ fontSize: '25px', fontWeight: 'bold' }}>
                                        {product.initial_price} LEI
                                    </Typography>
                                    {product.initial_price !== product.current_price && (
                                        <>
                                            <Typography variant="body2" sx={{ fontSize: '25px', fontWeight: 'bold', color: 'rgb(133, 20, 20)' }}>
                                                Oferta curenta:
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontSize: '25px', fontWeight: 'bold', color: 'rgb(133, 20, 20)' }}>
                                                {product.current_price} LEI
                                            </Typography>
                                        </>
                                    )}
                                </Box>

                                {/* '2020-01-01T00:00:00' */}
                                {product.end_date && !isNaN(new Date(product.end_date)) &&
                                    product.start_date && !isNaN(new Date(product.start_date)) ? (

                                    new Date() < new Date(product.start_date) && product.status === 'active' ? (
                                        <>
                                            <Typography fontWeight="bold" sx={{ mt: 2, color: '#6d071a', mb: 1 }}>
                                                Oferta incepe in:
                                            </Typography>
                                            <UnstartedEventClock startDate={product.start_date} />

                                        </>
                                    ) : new Date() >= new Date(product.start_date) && new Date() <= new Date(product.end_date) ? (
                                        <>
                                            <Typography color="error" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
                                                Oferta expira in:
                                            </Typography>

                                            <StartedEventClock endDate={product.end_date} startDate={product.start_date} />

                                        </>
                                    ) : (

                                        <Box
                                            sx={{
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                zIndex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            <EmojiEventsIcon sx={{ fontSize: '30px', color: 'yellow' }} />
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: 'black',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                    padding: '4px 12px',
                                                    borderRadius: '4px',
                                                    fontWeight: 'bold',
                                                    transform: 'rotate(-15deg)'
                                                }}
                                            >
                                                WINNER
                                            </Typography>
                                            <EmojiEventsIcon sx={{ fontSize: '30px', color: 'yellow' }} />
                                        </Box>

                                    )
                                ) : null}

                                {product.current_user_id && <Typography variant="body2" sx={{ mt: 2, fontSize: '20px', fontWeight: 'bold', color: 'black' }}>
                                    Licitat de: {product.current_user_name}
                                </Typography>}
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                                {editButton && product.initial_price === product.current_price &&
                                    (
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/dashboard/createEditProduct/${product.id}`);
                                            }}
                                            sx={{ color: 'black' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                {deleteButton && product.initial_price === product.current_price && new Date(product.start_date) > new Date() && (
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenDialog(product.id);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                                {increasePriceButton && new Date() >= new Date(product.start_date) && new Date() <= new Date(product.end_date) && (

                                    <Button
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setProductId(product.id);
                                            setFormData(prev => ({
                                                ...prev,
                                                current_price: product.current_price
                                            }));
                                            setOpenAddOfferDialog(true);

                                        }}
                                        sx={{ fontSize: '15px', fontWeight: 'bold', backgroundColor: '#6d071a', color: 'white' }}
                                        variant='contained'

                                    >
                                        {'Adauga oferta'}
                                    </Button>

                                )}


                                {userId === product.current_user_id && new Date(product.start_date) < new Date() && new Date(product.end_date) < new Date() && (<IconButton
                                    size="small"
                                    color="success"
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        try {
                                            let cartId = null;

                                            await apiGetCartIdByUserId((response) => {

                                                cartId = response.data.cart_id;
                                            }, showErrorToast, userId);


                                            if (!cartId) {
                                                // If no cart, create one
                                                await apiCreateCart((response) => {

                                                    cartId = response.data.id;
                                                    navigate(`/dashboard/shoppingCard`);
                                                }, showErrorToast, userId);

                                            } else {
                                                apiAddProductToCart(
                                                    (response) => {
                                                        showSuccessToast(response.message);
                                                    },
                                                    showErrorToast,
                                                    cartId,
                                                    product.id
                                                )
                                                navigate(`/dashboard/shoppingCard`);

                                            }
                                        } catch (error) {
                                            showErrorToast("Failed to create cart");
                                        }
                                        // navigate(`/dashboard/addProductToCard`);
                                    }}
                                >

                                    <AddShoppingCartIcon sx={{ fontSize: '40px', color: '#6d071a' }} />

                                </IconButton>
                                )}



                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {
                totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                )
            }

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Stergere produs</DialogTitle>
                <DialogContent>
                    Esti sigur ca vrei sa stergi acest produs?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" variant="contained">
                        Anuleaza
                    </Button>
                    <Button onClick={handleDeleteProduct} color="error" variant="contained" startIcon={<DeleteIcon />}>
                        Sterge
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog open={openProductDetailsDialog} onClose={handleCloseProductDetailsDialog}>
                <DialogTitle>Detalii produs</DialogTitle>
                <DialogContent sx={{ width: '100%', height: '50%' }}>
                    <Typography variant="body2" color="black" sx={{ fontSize: '25px', fontWeight: 'bold' }}>
                        {productToDetails?.name}
                    </Typography>
                    <Typography variant="body2" color="black" sx={{ fontSize: '25px' }}>
                        {productToDetails?.description}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseProductDetailsDialog} sx={{ backgroundColor: '#6d071a', color: 'white' }}>
                        Inchide
                    </Button>
                </DialogActions>

            </Dialog>




            <Dialog open={openAddOfferDialog} onClose={handleCloseAddOfferDialog}>
                <DialogTitle>Adauga oferta</DialogTitle>
                <DialogContent sx={{ width: '100%', height: '50%' }}>
                    <TextField
                        label='Oferta noua'
                        name="new_price"
                        type="number"
                        value={formData.new_price}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        sx={addStyleToTextField(formData.new_price)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddOfferDialog} variant="contained" color="error">
                        Inchide
                    </Button>
                    <Button onClick={handleSubmit} sx={{ backgroundColor: '#6d071a', color: 'white' }}>
                        Adauga oferta
                    </Button>
                </DialogActions>

            </Dialog>

        </Box >
    );
};

export default ProductCards; 