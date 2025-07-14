import { useInput } from "ink";
import { useEffect, useState } from "react";
import { useEffectOnce } from "../../hooks/use-effect-once";
import { createNotifier } from "../notifier";
import { useNotifierState } from "../notifier/adapters/react/hooks/use-notifier-state";
import { createFiber } from "../notifier/fiber";
import { asyncTryCatch } from "../try-catch";

type Navigation<T = unknown> = {
	keybind: string;
	screen: React.ReactElement;
	default?: boolean;
	loader?: () => Promise<T>;
};

function createTerminalNavigator<E, const T extends Navigation<E>[]>(
	navigations: T,
) {
	const current = createNotifier<Navigation | null>(null);
	const loading = createNotifier(false);
	const loaderData = createNotifier<unknown | null>(null);

	return {
		navigations,
		state: {
			current,
			loading,
			loaderData,
		},
	} as const;
}

function TerminalNavigator({
	navigator,
}: {
	navigator: ReturnType<typeof createTerminalNavigator>;
}) {
	const { navigations, state } = navigator;
	const [activeNavigation, setActiveNavigation] = useNotifierState(
		state.current,
	);
	const [activeScreen, setActiveScreen] = useState<Navigation["screen"] | null>(
		null,
	);

	useInput((input) => {
		for (const navigation of navigations) {
			if (input === navigation.keybind) {
				setActiveNavigation(navigation);
			}
		}
	});

	useEffect(() => {
		const fiber = createFiber();

		async function _loader() {
			state.loading.setValue(true);

			state.loaderData.setValue(null);

			if (activeNavigation?.loader) {
				const loaderClone = activeNavigation.loader;
				const loaderResult = await asyncTryCatch(() =>
					fiber.execute(loaderClone),
				);

				if (loaderResult.error && loaderResult.error === "aborted") {
					return;
				}

				state.loaderData.setValue(loaderResult.data ?? loaderResult.error);
			}

			setActiveScreen(activeNavigation?.screen ?? null);

			state.loading.setValue(false);
		}

		_loader();

		return () => {
			fiber.abort();
		};
	}, [state, activeNavigation]);

	useEffectOnce(() => {
		const defaultNavigation =
			navigations.find((navigation) => navigation.default) ?? navigations[0];

		setActiveNavigation(defaultNavigation);
	});

	return activeScreen;
}

function useNavigation<T extends ReturnType<typeof createTerminalNavigator>>(
	navigator: T,
) {
	function navigate(keybind: T["navigations"][number]["keybind"]) {
		const matchedNavigation = navigator.navigations.find(
			(navigation) => navigation.keybind === keybind,
		);

		if (matchedNavigation) {
			navigator.state.current.setValue(matchedNavigation);
		}
	}

	return navigate;
}

function useNavigatorStatus(
	navigator: ReturnType<typeof createTerminalNavigator>,
) {
	const [loading] = useNotifierState(navigator.state.loading);

	return { loading };
}

function useNavigatorLoaderData(
	navigator: ReturnType<typeof createTerminalNavigator>,
) {
	return navigator.state.loaderData.getValue();
}

export {
	createTerminalNavigator,
	TerminalNavigator,
	useNavigation,
	useNavigatorStatus,
	useNavigatorLoaderData,
	type Navigation,
};
