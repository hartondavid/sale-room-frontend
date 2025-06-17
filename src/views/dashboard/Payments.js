import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable";
import { apiGetPaymentsByCustomerId, apiGetPaymentsByMonth } from "../../api/payments";
import { showErrorToast } from "../../utils/utilFunctions";
import { Chip, Typography } from "@mui/material";
import dayjs from "dayjs";
import { RIGHTS_MAPPING } from "../../utils/utilConstants";
import { BarChart } from "@mui/x-charts";

const colorMap = {
    pending: 'orange',
    completed: 'green',
    failed: 'red'
};

const columns = [
    { field: 'payment_method', headerName: 'Metoda de plata', type: 'string' },
    {
        field: 'status', headerName: 'Status', type: 'string', renderCell: ({ value }) => {
            const statusMap = {
                pending: 'In asteptare',
                completed: 'Finalizata',
                failed: 'Esuata'
            };

            const statusLabel = statusMap[value] || value;
            const color = colorMap[value] || 'default';

            return (
                <Chip
                    label={statusLabel}
                    variant="outlined"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color: color,
                        borderColor: color,

                    }}
                    onClick={() => {

                    }}

                />
            );
        }
    },
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
const Payments = ({ user, userRights }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const rightCode = userRights[0]?.right_code;

    useEffect(() => {

        if (rightCode === RIGHTS_MAPPING.CUSTOMER) {
            apiGetPaymentsByCustomerId((response) => {
                setData(response.data);
            }, showErrorToast);
        } else if (rightCode === RIGHTS_MAPPING.SELLER) {
            apiGetPaymentsByMonth((response) => {
                setData(response.data);
            }, showErrorToast);
        }


    }, [data.length, rightCode]);


    const childrenData = data.reduce((acc, payment) => {
        const orderId = payment.order_id;

        if (!acc[orderId]) {
            acc[orderId] = [];
        }
        if (payment.products && Array.isArray(payment.products)) {
            acc[orderId].push(
                ...payment.products.map((product, idx) => ({
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

    const chartSetting = {
        xAxis: [
            {
                label: 'Total (lei)',
            },
        ],
        height: 400,
    };

    function valueFormatter(value) {
        return `${value} lei`;
    }

    return (
        <>
            {rightCode === RIGHTS_MAPPING.CUSTOMER && <GenericTable

                title={"Plati"}
                columns={columns}
                data={data}
                childrenColumns={childrenColumns}
                childrenData={childrenData}
                isExtendedTable={true}
            >

            </GenericTable>}


            {rightCode === RIGHTS_MAPPING.SELLER &&
                <>
                    <Typography variant="h6" sx={{ ml: 2, mt: 2, fontSize: '30px' }}>Plati</Typography>
                    <BarChart
                        dataset={data}
                        yAxis={[{ scaleType: 'band', dataKey: 'month_name' }]}
                        series={[{ dataKey: 'total', label: 'Total', valueFormatter }]}
                        layout="horizontal"
                        {...chartSetting}
                    />
                </>
            }


        </>
    );
};
export default Payments;