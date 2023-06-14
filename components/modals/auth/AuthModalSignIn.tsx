import { CommonAuthModalProps } from ".";
import AuthModalViewSwitches from "./AuthModalViewSwitches";

const AuthModalSignIn: React.FC<CommonAuthModalProps> = ({ client }) => {
  return (
    <div>
      <p>Sign In</p>
      <AuthModalViewSwitches views={["sign_up", "forgotten_password"]} />
    </div>
  );
};

export default AuthModalSignIn;
