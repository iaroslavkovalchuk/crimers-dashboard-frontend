const API = import.meta.env.VITE_API_URL

// Fetch Notification Table data
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

/* ---------------Project--------------- */
// Set Qued Status for the row
export const setQued = async (project_id) => {
    try {
        const token = localStorage.getItem('access_token') || '';
        const res = await fetch(API+`qued?project_id=${project_id}`, {
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

// Remove Qued Status for the row
export const cancelQued = async (project_id) => {
    try {
        const token = localStorage.getItem('access_token') || '';
        const res = await fetch(API+`cancel-qued?project_id=${project_id}`, {
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

// Remove Qued Status for the row
export const setSent = async (project_id) => {
    try {
        const token = localStorage.getItem('access_token') || '';
        const res = await fetch(API+`set-sent?project_id=${project_id}`, {
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

// Update Last Message for the row (Use case: Delete Message, Edit Message)
export const updateLastMessage = async (project_id, message) => {
    try {
        const token = localStorage.getItem('access_token') || '';
        const res = await fetch(API+`update-last-message?project_id=${project_id}&message=${message}`, {
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

// Download project messages
export const downloadProjectMessage = async (project_id) => {
    try {
        const token = localStorage.getItem('access_token') || '';
        const res = await fetch(API+`download-project-message?project_id=${project_id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'message.txt'; // or any other extension
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();

        return true;
    } catch (error) {
        console.log(error)
    }
}

/* ---------------Customer--------------- */
// Download customer messages
export const downloadCustomerMessage = async (customer_id) => {
    try {
        const token = localStorage.getItem('access_token') || '';
        const res = await fetch(API+`download-customer-message?customer_id=${customer_id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'message.txt'; // or any other extension
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();

        return true;
    } catch (error) {
        console.log(error)
    }
}

// Change automatic send status for customer
export const changeCustomerStatus = async (customer_id, method) => {
    try {
        const token = localStorage.getItem('access_token') || '';
        const res = await fetch(API+`change-status?customer_id=${customer_id}&method=${method}`, {
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

// Delete customer
export const deleteCustomer = async (customer_id) => {
    try {
        const token = localStorage.getItem('access_token') || '';
        const res = await fetch(API+`delete-customer?customer_id=${customer_id}`, {
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