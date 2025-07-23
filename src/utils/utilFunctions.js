import { toast } from "react-toastify";
import { menus } from "./menus";

export const NEEDS_UPDATE_STRING = 'needs_update';

export const storeToken = (token) => {
    if (!token) {
        console.error('Attempting to store null/undefined token');
        return;
    }

    // Clean the token (remove any extra spaces or quotes)
    const cleanToken = token.trim().replace(/^["']|["']$/g, '');

    if (!cleanToken) {
        console.error('Token is empty after cleaning');
        return;
    }

    console.log('Storing token:', cleanToken.substring(0, 20) + '...');
    localStorage.setItem('token', cleanToken);
}

export const removeToken = () => {
    localStorage.removeItem('token');
    console.log('Token removed from localStorage');
}

export const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.warn('No token found in localStorage');
        return null;
    }

    // Clean the token when retrieving
    const cleanToken = token.trim().replace(/^["']|["']$/g, '');
    console.log('Retrieved token:', cleanToken.substring(0, 20) + '...');
    return cleanToken;
}

export const isTokenValid = (token) => {
    if (!token) return false;

    // Basic JWT format validation (3 parts separated by dots)
    const parts = token.split('.');
    if (parts.length !== 3) {
        console.error('Invalid JWT format: token should have 3 parts');
        return false;
    }

    // Check if parts are not empty
    if (!parts[0] || !parts[1] || !parts[2]) {
        console.error('Invalid JWT format: empty parts detected');
        return false;
    }

    return true;
}

export const clearAuthData = () => {
    localStorage.removeItem('token');
    console.log('All authentication data cleared');
}

export const showErrorToast = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
}

export const showSuccessToast = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
}


export const shouldShowMenu = (userRights, menu) => {
    let shouldShow = true;

    //    console.log('userRights', userRights);
    if (userRights.length > 0) {
        const right_code = userRights[0].right_code

        if (menu.rights && menu.rights.length !== 0 && !menu.rights.includes(right_code)) {
            shouldShow = false;
        }
    }


    return shouldShow;
}


export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}


export const addStyleToTextField = (hasValue) => {
    return {
        '& .MuiInputLabel-root': {

            '&.Mui-focused': {
                color: ' rgb(133, 20, 20)'
            },
            '&.MuiInputLabel-shrink': {
                color: ' rgb(133, 20, 20)'
            },

        },
        '& .MuiInputBase-input': {
            color: 'black'
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: ' rgb(133, 20, 20)',
            },
            '&:hover fieldset': {
                borderColor: ' rgb(133, 20, 20)'
            }

        },
        ...(hasValue && {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: ' rgb(133, 20, 20)',
            },
            '& .MuiInputLabel-root': {
                color: ' rgb(133, 20, 20)',
            },
        }),
    }
}
