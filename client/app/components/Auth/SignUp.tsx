"use client";
import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { styles } from "../../styles/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

interface Props { setRoute: (route: string) => void; }

const schema = Yup.object().shape({
  name: Yup.string().required("Bắt buộc"),
  email: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
  password: Yup.string().min(6, "Tối thiểu 6 ký tự").required("Bắt buộc"),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) { 
        toast.success("Đăng ký thành công, vui lòng xác nhận OTP"); 
        setRoute("Verification"); 
    }
    if (error) {
        // MẸO DEV: In toàn bộ object error ra console để debug
        console.log("🔥 LỖI TẠI SIGNUP:", error);

        if ("data" in error) {
            toast.error((error as any).data.message);
        } else {
            // Nếu là lỗi mạng, CORS, sai URL... nó sẽ lọt vào đây
            toast.error(`Lỗi hệ thống: ${(error as any).error || "Không thể kết nối Server"}`);
        }
    }
  }, [isSuccess, error, setRoute]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async (v) => await register(v),
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-Josefin font-bold text-black dark:text-white mb-2">Tạo tài khoản mới</h1>
        <p className="text-sm text-neutral-500">Gia nhập cộng đồng 500k+ học viên</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={styles.label}>Họ và Tên</label>
          <input type="text" name="name" value={values.name} onChange={handleChange} className={styles.input} placeholder="Nguyễn Thế Vinh" />
          {errors.name && touched.name && <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>}
        </div>
        <div>
          <label className={styles.label}>Email</label>
          <input type="email" name="email" value={values.email} onChange={handleChange} className={styles.input} placeholder="name@example.com" />
          {errors.email && touched.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
        </div>
        <div className="relative">
          <label className={styles.label}>Mật khẩu</label>
          <input type={show ? "text" : "password"} name="password" value={values.password} onChange={handleChange} className={styles.input} placeholder="••••••••" />
          <div className="absolute right-3 top-10 cursor-pointer text-neutral-500 hover:text-black dark:hover:text-white" onClick={() => setShow(!show)}>
            {show ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
          </div>
          {errors.password && touched.password && <span className="text-red-500 text-xs mt-1 block">{errors.password}</span>}
        </div>
        <button type="submit" className={styles.button + " !mt-8"}>Đăng ký</button>
      </form>
      <p className="text-center text-sm text-neutral-500 mt-6">
        Đã có tài khoản? <span className="text-blue-500 font-semibold cursor-pointer hover:underline" onClick={() => setRoute("Login")}>Đăng nhập</span>
      </p>
    </div>
  );
};

export default SignUp;