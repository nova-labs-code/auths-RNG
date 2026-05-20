// utils.ts

export const clamp = (value: number, min: number, max: number): number => {
	return Math.min(Math.max(value, min), max);
};

export const lerp = (a: number, b: number, t: number): number => {
	return a + (b - a) * t;
};

export const random = (min = 0, max = 1): number => {
	return Math.random() * (max - min) + min;
};

export const randomInt = (min: number, max: number): number => {
	return Math.floor(random(min, max + 1));
};

export const chance = (percent: number): boolean => {
	return Math.random() * 100 < percent;
};

export const pick = <T>(array: T[]): T => {
	return array[Math.floor(Math.random() * array.length)];
};

export const shuffle = <T>(array: T[]): T[] => {
	const copy = [...array];

	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		[copy[i], copy[j]] = [copy[j], copy[i]];
	}

	return copy;
};

export const sleep = (ms: number): Promise<void> =>
	new Promise<void>((resolve) => setTimeout(resolve, ms));

export const debounce = <T extends (...args: any[]) => void>(
	fn: T,
	delay: number
) => {
	let timeout: ReturnType<typeof setTimeout>;

	return (...args: Parameters<T>) => {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			fn(...args);
		}, delay);
	};
};

export const throttle = <T extends (...args: any[]) => void>(
	fn: T,
	delay: number
) => {
	let waiting = false;

	return (...args: Parameters<T>) => {
		if (waiting) return;

		fn(...args);

		waiting = true;

		setTimeout(() => {
			waiting = false;
		}, delay);
	};
};

export const formatNumber = (num: number): string => {
	return new Intl.NumberFormat("en-US").format(num);
};

export const uuid = (): string => {
	return crypto.randomUUID();
};

// might use typescript a bit more someday
// actually no i need to compile this and compile that
// too much of hassleeeeeeeeeeeee
