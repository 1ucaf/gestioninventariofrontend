export const getToken = () => {
    const token = getCookie("token");
    return token;
}

export const setToken = (token) => {
    setCookie({
        cname: "token",
        cvalue: token,
        exhours: 4,
    })
}

export const getCookie = cname => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export const setCookie = ({cname, cvalue, exmins, exhours, exdays}) => {
    const d = new Date();
    const dif = 3*60*60*1000;
    d.setTime(d.getTime() - dif);
    if (exmins)     d.setTime(d.getTime() + (exmins*60*1000));
    if (exhours)    d.setTime(d.getTime() + (exhours*60*60*1000));
    if (exdays)     d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    console.log(expires);
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}