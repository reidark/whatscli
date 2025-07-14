async function delay(time: number = 0) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(true), time);
	});
}

export { delay };
