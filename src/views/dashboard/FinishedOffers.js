import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetFinishedOffers } from "../../api/products";
import { showErrorToast } from "../../utils/utilFunctions";
import GenericTable from "../../components/GenericTable";

const columns = [
    { field: 'name', headerName: 'Nume', type: 'string' },
    { field: 'photo', headerName: 'Photo', type: 'filepath' },
    {
        field: 'initial_price', headerName: 'Pret initial', type: 'number', renderCell: ({ value }) => {
            return ` ${value} lei`;
        }
    },
    {
        field: 'current_price', headerName: 'Pret vandut', type: 'number', renderCell: ({ value }) => {
            return ` ${value} lei`;
        }
    },
    { field: 'description', headerName: 'Descriere', type: 'string' },
    { field: 'current_user_name', headerName: 'Nume client', type: 'string' },
    { field: 'date_start', headerName: 'Data de inceput', type: 'date' },
    { field: 'date_end', headerName: 'Data de sfarsit', type: 'date' },

]

const FinishedOffers = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {

        apiGetFinishedOffers(
            (response) => {
                if (response.data) {
                    setData(response.data);
                }
            },
            showErrorToast
        );

    }, []);

    return (
        <>
            <GenericTable
                title={"Oferte terminate"}
                columns={columns}
                data={data}
            >

            </GenericTable>

        </>
    );
};

export default FinishedOffers;