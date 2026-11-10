const GENDERS = [
  { value: "male", label: "مرد" },
  { value: "female", label: "زن" },
];

function fromApi(profile = {}) {
  return {
    email: profile.email || "",
    fullName: `${profile.firstName || ""} ${profile.lastName || ""}`.trim(),
    nationalCode: profile.nationalCode || "",
    gender: profile.gender || "",
    birthDate: profile.birthDate ? new Date(profile.birthDate) : null,
    cardNumber: profile.payment?.debitCard_code || "",
    accountNumber: profile.payment?.accountIdentifier || "",
    sheba: profile.payment?.shaba_code || "",
  };
}

function toApi(values) {
  const body = {};
  const payment = {};

  const [firstName, ...rest] = (values.fullName || "").trim().split(/\s+/);

  if (values.email) body.email = values.email;
  if (firstName) body.firstName = firstName;
  if (rest.length > 0) body.lastName = rest.join(" ");
  if (values.nationalCode) body.nationalCode = values.nationalCode;
  if (values.gender) body.gender = values.gender;

  if (values.birthDate) {
    const date = new Date(values.birthDate);
    date.setHours(12, 0, 0, 0);
    body.birthDate = date.toISOString();
  }

  if (values.cardNumber) payment.debitCard_code = values.cardNumber;
  if (values.accountNumber) payment.accountIdentifier = values.accountNumber;
  if (values.sheba) payment.shaba_code = values.sheba;
  if (Object.keys(payment).length > 0) body.payment = payment;

  return body;
}

export { toApi, fromApi, GENDERS };
