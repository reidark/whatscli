import { useEffect, useRef } from "react";

function useEffectOnce<T extends () => void>(effect: T) {
	const mounted = useRef(false);

	useEffect(() => {
		if (mounted.current) {
			return;
		}

		mounted.current = true;

		effect();
	}, [effect]);
}

export { useEffectOnce };
