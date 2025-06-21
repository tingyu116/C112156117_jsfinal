import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export function Login({ isLoggedIn, setIsLoggedIn, username, setUsername }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: username || "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("帳號為必填"),
      password: Yup.string()
        .min(5, "密碼至少5個字元")
        .required("密碼為必填"),
    }),
    onSubmit: (values) => {
      alert(`歡迎 ${values.username}！`);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", values.username);
      setUsername(values.username);
      setIsLoggedIn(true);
    },
  });

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="inside">
      <form className="loginform" onSubmit={formik.handleSubmit}>
        <h2>歡迎登入</h2>

        <label>
          帳號：
          <input
            type="text"
            name="username"
            placeholder="請輸入帳號"
            value={formik.values.username}
            onChange={(e) => {
              formik.handleChange(e);
              setUsername(e.target.value); 
            }}
            onBlur={formik.handleBlur}
          />
        </label>
        {formik.touched.username && formik.errors.username ? (
          <div style={{ color: "red" }}>{formik.errors.username}</div>
        ) : null}

        <br />

        <label>
          密碼：
          <input
            type="password"
            name="password"
            placeholder="請輸入密碼"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        ) : null}

        <br />

        <button type="submit">登入</button>
      </form>
    </div>
  );
}
