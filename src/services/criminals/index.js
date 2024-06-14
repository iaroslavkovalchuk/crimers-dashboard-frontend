const API = import.meta.env.VITE_API_URL

// Fetch Notification Table data
export const getCrimers = async (data) => {
    try {
        const token = localStorage.getItem('access_token') || '';
        return await fetch(API+'get-crimers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    } catch (error) {
        console.log(error)
    }
}
