const API = import.meta.env.VITE_API_URL

export const signupUser = async ({email, password, confirmPassword}) => {
    try {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)
        formData.append('confirm_password', confirmPassword)

        const res = await fetch(API+'signup', {
            method: 'POST',
            body: formData
        })
        const json = await res.json();
        return json;
    } catch (error) {
        console.log(error)
    }
}

export const signinUser = async ({email, password}) => {
    try {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)

        const res = await fetch(API+'signin', {
            method: 'POST',
            body: formData
        })
        const json = await res.json();
        return json;
    } catch (error) {
        console.log(error)
    }
}