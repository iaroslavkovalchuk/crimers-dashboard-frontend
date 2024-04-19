const API = import.meta.env.VITE_API_URL

export const getNotifications = async () => {
    try {
        const token = localStorage.getItem('access_token') || '';
        const res = await fetch(API+'table', {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const json = await res.json();
        return json;
    } catch (error) {
        console.log(error)
    }
}