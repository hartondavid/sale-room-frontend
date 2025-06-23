import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable";
import { apiGetOrders } from "../../api/orders";
import { showErrorToast } from "../../utils/utilFunctions";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { apiCreatePayment } from "../../api/payments";
import { apiGetCartIdByUserId, apiRemoveAllProductFromCart } from "../../api/carts";
import { showSuccessToast } from "../../utils/utilFunctions";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import dayjs from "dayjs";

const columns = [
    { field: 'country', headerName: 'Tara', type: 'string' },
    { field: 'city', headerName: 'Oras', type: 'string' },
    { field: 'street', headerName: 'Strada', type: 'string' },
    { field: 'house_number', headerName: 'Bloc', type: 'string' },
    { field: 'apartment_number', headerName: 'Apartament', type: 'string' },
    { field: 'floor', headerName: 'Etaj', type: 'string' },
    { field: 'postal_code', headerName: 'Cod postal', type: 'string' },
    { field: 'phone', headerName: 'Telefon', type: 'string' },
    {
        field: 'total', headerName: 'Total', type: 'string', renderCell: ({ value }) => {
            return ` ${value} lei`;
        }
    },
    {
        field: 'created_at', headerName: 'Data', type: 'date', renderCell: ({ value }) => {
            return dayjs(value).format('DD.MM.YYYY');
        }
    },

];
const Orders = ({ user }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const loggedUser = user?.data;

    const [id, setId] = useState(null);

    useEffect(() => {

        apiGetOrders((response) => {
            setData(response.data);

        }, showErrorToast);

    }, [data.length]);


    const childrenData = data.reduce((acc, order) => {
        const orderId = order.id;

        if (!acc[orderId]) {
            acc[orderId] = [];
        }
        if (order.products && Array.isArray(order.products)) {
            acc[orderId].push(
                ...order.products.map((product, idx) => ({
                    id: product.id || `${orderId}-${idx}`,
                    name: product.name,
                    photo: product.photo,
                    description: product.description,
                    price: ` ${product.price} lei`
                }))
            );

        }
        return acc;
    }, {});


    const childrenColumns = [
        { field: 'name', headerName: 'Nume' },
        { field: 'photo', headerName: 'Foto' },
        { field: 'description', headerName: 'Descriere' },
        { field: 'price', headerName: 'Pret', type: 'string' }
    ];


    const [dialogOpen, setDialogOpen] = useState(false);  // For the modal

    // Open the dialog
    const handleOpenDialog = (id, row) => {

        if (row.is_paid) {
            showErrorToast('Comanda este deja platita');
            return;
        }
        setDialogOpen(true);
        setId(id);

    };

    // Close the dialog
    const handleCloseDialog = () => {

        setDialogOpen(false);
        //setFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        apiCreatePayment(
            (response) => {
                showSuccessToast(response.message);
            },
            showErrorToast,
            { order_id: id, payment_method: 'cash' }
        )
        let cartId = null;
        await apiGetCartIdByUserId(
            (response) => {
                cartId = response.data.cart_id;
            },
            showErrorToast,
            loggedUser.id
        );

        if (cartId) {
            apiRemoveAllProductFromCart(
                showSuccessToast,
                showErrorToast,
                cartId
            )
        }

        // setData(prevData =>
        //     prevData.map(order =>
        //         order.id === id ? { ...order, is_paid: true } : order
        //     )
        // );

        navigate('/dashboard/payments');



    };

    const actions = [
        {
            label: 'Plateste',
            icon: (row) => row.is_paid ? <CreditScoreIcon color="success" /> : <CreditCardIcon color="error" />,
            onClick: (id, row) => handleOpenDialog(id, row),

        }
    ]


    return (
        <>
            <GenericTable
                title={"Comenzi"}
                columns={columns}
                data={data}
                childrenColumns={childrenColumns}
                childrenData={childrenData}
                isExtendedTable={true}
                actions={actions}
            >

            </GenericTable>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Plateste</DialogTitle>
                <DialogContent>
                    Esti sigur ca vrei sa platesti?
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={handleCloseDialog} >
                        Anuleaza
                    </Button>
                    <Button variant="contained" sx={{ backgroundColor: 'rgb(133, 20, 20)', color: 'white' }} onClick={handleSubmit} >
                        Plateste
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
};
export default Orders;