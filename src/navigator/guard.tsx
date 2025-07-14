import { useEffectOnce } from "../hooks/use-effect-once";
import { isAuthenticated } from "../services/auth";
import { useNavigation } from ".";

type AuthenticatedNavigationProps = {
	children: React.ReactNode;
};

type UnauthenticatedNavigationProps = {
	children: React.ReactNode;
};

function AuthenticatedNavigation({ children }: AuthenticatedNavigationProps) {
	const navigate = useNavigation();

	useEffectOnce(() => {
		if (!isAuthenticated()) {
			navigate("0");
		}
	});

	if (!isAuthenticated()) {
		return null;
	}

	return children;
}

function UnauthenticatedNavigation({
	children,
}: UnauthenticatedNavigationProps) {
	const navigate = useNavigation();

	useEffectOnce(() => {
		if (isAuthenticated()) {
			navigate("1");
		}
	});

	if (isAuthenticated()) {
		return null;
	}

	return children;
}

export { AuthenticatedNavigation, UnauthenticatedNavigation };
