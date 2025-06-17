import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetAllProducts } from "../../api/products";
import { showErrorToast } from "../../utils/utilFunctions";
import ProductCards from "../../components/ProductCards";
import { TextField, Box } from '@mui/material';
import { addStyleToTextField } from "../../utils/utilFunctions";

const AllProducts = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

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

    // Filter products by name or description
    const filteredProducts = data.filter(product => {
        const query = search.toLowerCase();
        return (
            product.name?.toLowerCase().includes(query) ||
            product.description?.toLowerCase().includes(query)
        );
    });

    return (
        <Box sx={{ p: 3 }}>
            <TextField
                label="Cauta produs..."
                variant="outlined"
                fullWidth
                value={search}
                onChange={e => setSearch(e.target.value)}
                sx={{ ...addStyleToTextField(search), mb: 3 }}
            />
            <ProductCards
                data={filteredProducts}
                products={filteredProducts}
                increasePriceButton={true}
                setProducts={setData}
            />
        </Box>
    );
};

export default AllProducts;