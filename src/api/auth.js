import { getToken } from "../utils/utilFunctions";

export const apiCheckLogin = async (errorCallBack, setUser) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = getToken();

  if (!token) {
    console.error('No token available for authentication check');
    if (errorCallBack) errorCallBack();
    return;
  }

  console.log('Checking login with token:', token.substring(0, 20) + '...');

  try {
    const response = await fetch(`${apiUrl}/api/users/checkLogin`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      console.error('Auth check failed with status:', response.status);
      if (errorCallBack) errorCallBack();
      return;
    }

    const data = await response.json();
    console.log('Auth check response:', data);

    if (!data.success) {
      console.error('Auth check unsuccessful:', data);
      if (errorCallBack) errorCallBack();
    } else {
      console.log('Auth check successful, setting user');
      setUser(data);
    }
  } catch (error) {
    console.error('Auth check error:', error);
    if (errorCallBack) errorCallBack();
  }
}