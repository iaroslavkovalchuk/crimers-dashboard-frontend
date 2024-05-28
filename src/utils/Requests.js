const getFullUrl = (url) => {
    return process.env.REACT_APP_API_HOST + url;
};
  
export function sendRequest(url, config) {
    console.log(url);
    return fetch(getFullUrl(url), {
        method: "POST",
        headers: {
        Authorization: `Bearer `,
        },
        ...config,
    });
}