export const AdminToken = () => {
  return localStorage.getItem("access_token_admin");
};
export const UserToken = () => {
  return localStorage.getItem("access_token_User");
};
export const LogoutAdminHandler = () => {
  try {
    localStorage.removeItem("access_token_admin");
    localStorage.removeItem("access_token_User");

    window.location.reload(true);
    window.location.href = "/";
  } catch (error) {
    console.error("Logout error:", error);
  }
};
