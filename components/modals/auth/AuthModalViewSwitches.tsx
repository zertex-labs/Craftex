import { useAuthModal } from "@/hooks/modals";
import { ViewType } from "..";

interface AuthModalViewProps {
  views: ViewType[];
}

interface ModalViewProps {}

interface GenericSwitchProps extends ModalViewProps {
  view: ViewType;
  text: {
    title?: string;
    button: string;
  };
}

const GenericSwitch: React.FC<GenericSwitchProps> = ({
  view,
  text: { button, title },
}) => {
  const { setView } = useAuthModal();
  return (
    <div className="flex gap-x-1">
      {title && <p>{title}</p>}
      <button
        className="text-sky-400 font-semibold"
        onClick={() => setView(view)}
      >
        {button}
      </button>
    </div>
  );
};

const switches: Record<ViewType, React.FC<ModalViewProps>> = {
  sign_in: () => (
    <GenericSwitch
      view="sign_in"
      text={{
        title: "Already have an account?",
        button: "Sign In",
      }}
    />
  ),
  sign_up: () => (
    <GenericSwitch
      view="sign_up"
      text={{
        title: "Don't have an account?",
        button: "Sign Up",
      }}
    />
  ),
  forgotten_password: () => (
    <GenericSwitch
      view="forgotten_password"
      text={{
        title: "Forgot your password?",
        button: "Reset Password",
      }}
    />
  ),
  update_password: () => (
    <GenericSwitch
      view="update_password"
      text={{
        title: "Forgot your password?",
        button: "Change Password",
      }}
    />
  ),
  magic_link: () => (
    <GenericSwitch
      view="magic_link"
      text={{
        button: "Sign in with magic link",
      }}
    />
  ),
  verify_otp: () => (
    <GenericSwitch
      view="verify_otp"
      text={{
        button: "Verify your email",
      }}
    />
  ),
};

const AuthModalView: React.FC<AuthModalViewProps> = ({ views }) => {
  const { setView } = useAuthModal();
  return (
    <div className="text-sm text-gray-400">
      {views.map((view) => {
        const Component = switches[view];
        return <Component key={view} />;
      })}
    </div>
  );
};

export default AuthModalView;
