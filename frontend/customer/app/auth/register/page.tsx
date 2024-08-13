"use client";
import { useAppSelector } from "../../../lib/hooks/hooks";
import { RootState } from "../../../lib/store";
import { RegisterStatus } from "../../../lib/store/auth";
import RegisterComponent from "../../../components/auth/registration";
import VerifyComponent, { VerifyType } from "../../../components/auth/verification";

const RegisterPage = () => {

  const registerStatus = useAppSelector((state: RootState) => state.auth.registerStatus);

  return (
    registerStatus === RegisterStatus.REGISTER ?
      <RegisterComponent /> :
      <VerifyComponent verifyType={VerifyType.REGISTER}/>
  );
};

export default RegisterPage;
