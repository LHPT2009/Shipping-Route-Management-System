"use client";
import { useAppSelector } from "../../../lib/hooks/hooks";
import { RootState } from "../../../lib/store";
import { ForgotPasswordStatus, RegisterStatus } from "../../../lib/store/auth";
import RegisterComponent from "../../../components/auth/registration";
import VerifyComponent, { VerifyType } from "../../../components/auth/verification";
import EnterEmailComponent from "../../../components/auth/forgot-password/enter-email";
import NewPasswordComponent from "../../../components/auth/forgot-password/new-password";

const ForgotPasswordPage = () => {

  const forgotPasswordStatus = useAppSelector((state: RootState) => state.auth.forgotPasswordStatus);

  return (
    forgotPasswordStatus === ForgotPasswordStatus.ENTER_EMAIL ?
      <EnterEmailComponent /> :
      forgotPasswordStatus === ForgotPasswordStatus.VERIFY ?
        <VerifyComponent verifyType={VerifyType.FORGOT_PASSWORD}/> :
        <NewPasswordComponent />
  );
};

export default ForgotPasswordPage;
