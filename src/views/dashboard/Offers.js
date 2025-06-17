import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetOffers, } from "../../api/products";
import { showErrorToast } from "../../utils/utilFunctions";
import ProductCards from "../../components/ProductCards";

const Offers = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        apiGetOffers(
            (response) => {
                if (response.data) {
                    console.log('response', response);
                    setData(response.data);
                }
            },
            showErrorToast
        );
    }, []);


    return (
        <ProductCards
            data={data}
            products={data}
            title="Oferte castigate"
        />
    );
};

export default Offers;