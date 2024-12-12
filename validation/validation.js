const EmailValidation = (email) => {
  const emailval = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailval.test(email);
};
export default EmailValidation;
