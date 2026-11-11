import * as yup from "yup";
const mobileSchema = yup.object({
  mobile: yup
    .string()
    .required("شماره موبایل را وارد کنید")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});

export { mobileSchema };
