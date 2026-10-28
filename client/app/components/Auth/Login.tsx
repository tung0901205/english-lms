"use client";
import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { styles } from "../../styles/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

interface Props { setRoute: (route: string) => void; setOpen: (open: boolean) => void; }

const schema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
  password: Yup.string().min(6, "Tối thiểu 6 ký tự").required("Bắt buộc"),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async (v) => await login(v),
  });

  useEffect(() => {
    if (isSuccess) { 
        toast.success("Đăng nhập thành công"); 
        setOpen(false); 
    }
    if (error) {
        if ("data" in error) toast.error((error as any).data.message);
        else toast.error(`Lỗi hệ thống: ${(error as any).error || "Không thể kết nối Server"}`);
    }
  }, [isSuccess, error, setOpen]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-Josefin font-bold text-black dark:text-white mb-2">Chào mừng trở lại</h1>
        <p className="text-sm text-neutral-500">Đăng nhập vào không gian học tập của bạn</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={styles.label}>Email</label>
          <input type="email" name="email" value={values.email} onChange={handleChange} className={styles.input} placeholder="name@example.com" />
          {errors.email && touched.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
        </div>
        <div className="relative">
          <div className="flex justify-between items-center">
            <label className={styles.label}>Mật khẩu</label>
            <span className="text-xs text-blue-500 hover:underline cursor-pointer mb-2 font-medium" onClick={() => setRoute("Forgot-Password")}>Quên mật khẩu?</span>
          </div>
          <input type={show ? "text" : "password"} name="password" value={values.password} onChange={handleChange} className={styles.input} placeholder="••••••••" />
          <div className="absolute right-3 top-10 cursor-pointer text-neutral-500 hover:text-black dark:hover:text-white" onClick={() => setShow(!show)}>
            {show ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
          </div>
          {errors.password && touched.password && <span className="text-red-500 text-xs mt-1 block">{errors.password}</span>}
        </div>
        <button type="submit" className={styles.button + " !mt-8"}>Đăng nhập</button>
      </form>
      <p className="text-center text-sm text-neutral-500 mt-6">
        Chưa có tài khoản? <span className="text-blue-500 font-semibold cursor-pointer hover:underline" onClick={() => setRoute("Sign-Up")}>Đăng ký ngay</span>
      </p>
    </div>
  );
};

export default Login;