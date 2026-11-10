import {
  digitsArToEn,
  digitsFaToEn,
  verifyIranianNationalId,
} from "@persian-tools/persian-tools";
import * as yup from "yup";

const toEn = (v) =>
  typeof v === "string" ? digitsFaToEn(digitsArToEn(v)).trim() : v;
const emailSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("ایمیل وارد شده معتبر نیست.")
    .required("لطفا ایمیل خود را وارد کنید"),
});
const personalSchema = yup.object({
  fullName: yup.string().trim().min(3, "نام و نام خانوادگی کوتاه است"),
  nationalCode: yup
    .string()
    .transform(toEn)
    .required("کدملی را وارد کنید.")
    .test(
      "national-id",
      "کدملی معتبر نیست.",
      (v) => !v || verifyIranianNationalId(v),
    ),
  birthDate: yup
    .date()
    .nullable()
    .typeError("تاریخ تولد معتبر نیست.")
    .max(new Date(), "تاریخ تولد نمی‌تواند در آینده باشد.")
    .required("تاریخ تولد را وارد کنید."),
  gender: yup.string().required("جنسیت را انتخاب کنید."),
});

const bankShema = yup.object({
  cardNumber: yup
    .string()
    .transform(toEn)
    .matches(/^\d{16}$/, {
      message: "شماره کارت باید ۱۶ رقم باشد.",
      excludeEmptyString: true,
    }),
  accountNumber: yup.string().transform(toEn).matches(/^\d+$/, {
    message: "شماره حساب فقط شامل عدد است.",
    excludeEmptyString: true,
  }),
  sheba: yup
    .string()
    .transform(toEn)
    .transform((v) => (typeof v === "string" ? v.toUpperCase() : v))
    .matches(/^IR\d{24}$/, {
      message: "شماره شبا باید با IR شروع شود و ۲۴ رقم داشته باشد.",
      excludeEmptyString: true,
    }),
});
export { emailSchema, personalSchema, bankShema };
