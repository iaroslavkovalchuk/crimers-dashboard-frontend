const API = import.meta.env.VITE_API_URL

export const getIpTable = async () => {
    try{
        const token = localStorage.getItem("access_token") || "";
        return await fetch(API+"get-iptable", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`

            }
        })
    } catch (error){
        console.log(error);
    }
}

export const UpdateUserStatus = async (data) => {
    try{
        const token = localStorage.getItem("access_token") || "";
        return await fetch(API+"user-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
    } catch (error){
        console.log(error);
    }
}