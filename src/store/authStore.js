import { create } from "zustand";

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(escape(window.atob(base64)));
  return JSON.parse(jsonPayload);
}

const useAuthStore = create((set) => ({
  loggedIn: !!localStorage.getItem("token"),
  userType: null,
  user: null,
  login: (user, token, userType) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ loggedIn: true, user, userType });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ loggedIn: false, user: null, userType: null });
  },
  initialize: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      // set({
      //   loggedIn: true,
      //   user: JSON.parse(user),
      //   userType: JSON.parse(user).type,
      // });
      const decodedToken = parseJwt(token);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();

      if (currentTime > expirationTime) {
        set({ loggedIn: false, user: null, userType: null });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } else {
        set({
          loggedIn: true,
          user: JSON.parse(user),
          userType: JSON.parse(user).type,
        });
      }
    }
  },
}));

export default useAuthStore;
