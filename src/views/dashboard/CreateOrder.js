import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { apiCreateOrder } from "../../api/orders";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import { apiGetCartIdByUserId } from "../../api/carts";
import { apiGetCartItemsByCartId } from "../../api/carts";
import { addStyleToTextField } from "../../utils/utilFunctions";


const CreateEditOrder = ({ user }) => {
    const navigate = useNavigate(); // Initialize navigate function
    const loggedUser = user?.data;

    const [formData, setFormData] = useState({
        country: '',
        city: '',
        street: '',
        house_number: '',
        apartment_number: '',
        floor: '',
        postal_code: '',
        phone: '',
        items: []
    });

    const [items, setItems] = useState([]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();


        const payload = {
            country: formData.country,
            city: formData.city,
            street: formData.street,
            house_number: formData.house_number,
            apartment_number: formData.apartment_number,
            floor: formData.floor,
            postal_code: formData.postal_code,
            phone: formData.phone,
            items: items,
        };

        apiCreateOrder((response) => { navigate('/dashboard/orders'); showSuccessToast(response.message); }, showErrorToast, payload)

    };

    useEffect(() => {


        apiGetCartIdByUserId(
            (response) => {
                const cartId = response.data.cart_id;

                apiGetCartItemsByCartId(
                    (response) => {

                        setItems(response.data.items);
                    },
                    showErrorToast,
                    cartId
                );
            },
            showErrorToast,
            loggedUser?.id
        )
    }, [loggedUser?.id])
    return (
        <>
            <Box sx={{ marginLeft: '10px', marginRight: '10px', p: 2 }}  >
                <Typography variant="h4">
                    <span className="font-bold text-black">{"Adauga comanda"}</span>
                </Typography>

                <form onSubmit={handleSubmit}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}  >
                        <TextField
                            label="Tara"
                            name="country"
                            type='string'
                            value={formData.country || ''}
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            sx={addStyleToTextField(formData.name)}
                        >
                        </TextField>
                        <TextField
                            label='Oras'
                            name="city"
                            type="string"
                            value={formData.city || ''}
                            onChange={handleChange}
                            fullWidth
                            sx={addStyleToTextField(formData.city)}
                        />
                        <TextField
                            label='Strada'
                            name="street"
                            type="string"
                            value={formData.street || ''}
                            onChange={handleChange}
                            fullWidth
                            sx={addStyleToTextField(formData.street)}
                        />
                        <TextField
                            label='Bloc'
                            name="house_number"
                            type="string"
                            value={formData.house_number || ''}
                            onChange={handleChange}
                            fullWidth
                            sx={addStyleToTextField(formData.house_number)}
                        />
                        <TextField
                            label='Apartament'
                            name="apartment_number"
                            type="string"
                            value={formData.apartment_number || ''}
                            onChange={handleChange}
                            fullWidth
                            sx={addStyleToTextField(formData.apartment_number)}
                        />
                        <TextField
                            label='Etaj'
                            name="floor"
                            type="string"
                            value={formData.floor || ''}
                            onChange={handleChange}
                            fullWidth
                            sx={addStyleToTextField(formData.floor)}
                        />
                        <TextField
                            label='Cod postal'
                            name="postal_code"
                            type="string"
                            value={formData.postal_code || ''}
                            onChange={handleChange}
                            fullWidth
                            sx={addStyleToTextField(formData.postal_code)}
                        />
                        <TextField
                            label='Telefon'
                            name="phone"
                            type="string"
                            value={formData.phone || ''}
                            onChange={handleChange}
                            fullWidth
                            sx={addStyleToTextField(formData.phone)}
                        />


                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
                            <Button type="submit" variant="contained" sx={{ mr: 1, mb: 1, backgroundColor: 'rgb(133, 20, 20)', color: 'white' }}>
                                {'Adauga comanda'}
                            </Button>
                            <Button variant="contained" color="error" sx={{ mb: 1 }} onClick={() => navigate(-1)}>
                                Renunta
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default CreateEditOrder;