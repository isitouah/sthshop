  
  export const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  export const ifUserLogged = () => {
    const result = JSON.parse(localStorage.getItem("user"));
    return result;
  };
  
  export const logout = () => {
    localStorage.clear()
    localStorage.removeItem("user");
  };