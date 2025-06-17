import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetAllProducts } from "../../api/products";
import { showErrorToast } from "../../utils/utilFunctions";
import ProductCards from "./ProductCards";

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);


    useEffect(() => {
        apiGetAllProducts(
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
            increasePriceButton={true}
            setProducts={setData}
        />
    );
};

export default Home;