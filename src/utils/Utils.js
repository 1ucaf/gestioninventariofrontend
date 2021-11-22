export const getToken = () => {
    const allCookies = document.cookie;
    return allCookies;
}