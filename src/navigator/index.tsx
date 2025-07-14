import { getProviders } from "../actions/ai/providers";
import { getChats } from "../actions/chat/chats";
import {
	createTerminalNavigator,
	TerminalNavigator,
	useNavigation as useCoreNavigation,
	useNavigatorLoaderData as useCoreNavigatorLoaderData,
	useNavigatorStatus as useCoreNavigatorStatus,
} from "../lib/terminal-navigator";
import Auth from "../screens/auth";
import Chat from "../screens/chat";
import Settings from "../screens/settings";
import { AuthenticatedNavigation, UnauthenticatedNavigation } from "./guard";

const navigator = createTerminalNavigator([
	{
		keybind: "0",
		screen: (
			<UnauthenticatedNavigation>
				<Auth />
			</UnauthenticatedNavigation>
		),
		default: true,
	},
	{
		keybind: "1",
		screen: (
			<AuthenticatedNavigation>
				<Chat />
			</AuthenticatedNavigation>
		),
		loader: async () => await getChats(),
	},
	{
		keybind: "2",
		screen: (
			<AuthenticatedNavigation>
				<Settings />
			</AuthenticatedNavigation>
		),
		loader: async () => await getProviders(),
	},
]);

function Navigator() {
	return <TerminalNavigator navigator={navigator} />;
}

function useNavigation() {
	const navigate = useCoreNavigation(navigator);

	return navigate;
}

function useNavigatorStatus() {
	const value = useCoreNavigatorStatus(navigator);

	return value;
}

function useNavigatorLoaderData<T>() {
	const value = useCoreNavigatorLoaderData(navigator);

	return value as T;
}

export { Navigator, useNavigation, useNavigatorStatus, useNavigatorLoaderData };
