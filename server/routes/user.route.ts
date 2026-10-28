import express from "express";
import {
    activateUser,
    getUserInfo,
    loginUser,
    logoutUser,
    registrationUser,
    updateAccessToken,
    updatePassword,
    updateProfilePicture,
    updateUserInfo,
    forgotPassword,
    resetPassword,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", isAuthenticated, getUserInfo);
userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);
userRouter.put("/update-user-password", isAuthenticated, updatePassword);
userRouter.put("/update-user-avatar", isAuthenticated, updateProfilePicture);

// US-05 Phân quyền: middleware authorizeRoles(...) trong middleware/auth.ts dùng để chặn theo vai trò.
// Các API quản trị người dùng (get-users, update-user, lock-user, delete-user) thuộc US-07 – Sprint 2.

export default userRouter;