import {
  digitsFaToEn,
  verifyIranianNationalId,
} from "@persian-tools/persian-tools";
import * as yup from "yup";

const passengerSchema = yup.object({
  fullName: yup.string().trim().required("نام و نام خانوادگی را وارد کنید"),
  nationalCode: yup
    .string()
    .transform((value) => digitsFaToEn(value ?? ""))
    .required("کد ملی را وارد کنید")
    .test("valid", "کد ملی معتبر نیست", (value) =>
      verifyIranianNationalId(value),
    ),
  gender: yup.string().required("جنسیت خود را انتخاب کنید"),
  birthDate: yup.mixed().required("تاریخ تولد خود را انتخاب کنید"),
});

export { passengerSchema };
