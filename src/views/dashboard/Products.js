import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetProductsByUserId } from "../../api/products";
import { showErrorToast } from "../../utils/utilFunctions";
import ProductCards from "../../components/ProductCards";
import { apiGetUserRights } from "../../api/rights";
import { RIGHTS_MAPPING } from "../../utils/utilConstants";

const Products = (user) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const loggedUser = user?.user?.data;
    const [rightCode, setRightCode] = useState('');

    useEffect(() => {
        apiGetUserRights(
            (response) => {

                setRightCode(response);


            },
        )
    }, [loggedUser?.id])


    useEffect(() => {
        apiGetProductsByUserId(
            (response) => {
                if (response.data) {

                    setData(response.data);
                }
            },
            showErrorToast,
            loggedUser?.id
        );
    }, [loggedUser?.id]);



    return (
        <>
            <ProductCards
                data={data}
                user={user}
                showAddButton={true}
                products={data}
                setProducts={setData}
                editButton={true}
                deleteButton={true}
                title="Produsele mele"
                addButton={rightCode[0]?.right_code === RIGHTS_MAPPING.SELLER}

            />
        </>
    );
};

export default Products;