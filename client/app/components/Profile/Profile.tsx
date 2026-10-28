"use client";
import React, { FC, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { apiSlice } from "@/redux/features/api/apiSlice";
import { useRouter } from "next/navigation";

type Props = { user: any; };

const Profile: FC<Props> = ({ user }) => {
  const [active, setActive] = useState(1);
  
  // Khởi tạo dispatch để dùng Redux
  const dispatch = useDispatch();

  // Next.js router
  const router = useRouter();

  // Logout mutation
  const [
    logout,
    { isLoading: isLoggingOut },
  ] = useLogoutMutation();

  // Logout handler
  // Logout handler
  const logOutHandler = async () => {
    if (isLoggingOut) {
      return;
    }

    try {
      // 1. Báo cho Server biết để xóa HttpOnly Cookies (access_token, refresh_token)
      await logout({}).unwrap();

      // 2. Xóa trạng thái đăng nhập phía client rồi tải lại trang chủ để Redux sạch hoàn toàn
      dispatch(userLoggedOut());
      dispatch(apiSlice.util.resetApiState());
      window.location.href = "/";

    } catch (error: any) {
      console.error("Logout failed:", error);
      toast.error(
        error?.data?.message ||
        error?.message ||
        "Đăng xuất thất bại, vui lòng thử lại!"
      );
    }
  };


  return (
    <div className="bg-[#FAFAFA] dark:bg-[#050505] min-h-[85vh] pt-24 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-[250px] shrink-0">
          <div className="sticky top-28">
            <SideBarProfile user={user} active={active} avatar={user?.avatar?.url} setActive={setActive} logOutHandler={logOutHandler} />
          </div>
        </div>
        
        <div className="flex-1">
          {active === 1 && <ProfileInfo avatar={user?.avatar?.url} user={user} />}
          {active === 2 && <ChangePassword />}
        </div>
      </div>
    </div>
  );
};

export default Profile;