import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { RIGHTS_MAPPING } from "../../utils/utilConstants";

const Dashboard = ({ userRights }) => {
    const navigate = useNavigate();

    const rightCode = userRights[0]?.right_code;

    console.log('userRights', userRights);


    return (
        <>

            {rightCode === RIGHTS_MAPPING.SELLER && (
                <Navigate to="/dashboard/products" />
            )}
            {rightCode === RIGHTS_MAPPING.CUSTOMER && (
                <Navigate to="/dashboard/allProducts" />
            )}
        </>
    );
};

export default Dashboard;