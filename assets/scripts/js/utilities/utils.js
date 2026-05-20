// utils.ts
export const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
};
export const lerp = (a, b, t) => {
    return a + (b - a) * t;
};
export const random = (min = 0, max = 1) => {
    return Math.random() * (max - min) + min;
};
export const randomInt = (min, max) => {
    return Math.floor(random(min, max + 1));
};
export const chance = (percent) => {
    return Math.random() * 100 < percent;
};
export const pick = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};
export const shuffle = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};
export const throttle = (fn, delay) => {
    let waiting = false;
    return (...args) => {
        if (waiting)
            return;
        fn(...args);
        waiting = true;
        setTimeout(() => {
            waiting = false;
        }, delay);
    };
};
export const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
};
export const uuid = () => {
    return crypto.randomUUID();
};
// might use typescript a bit more someday
// actually no i need to compile this and compile that
// too much of hassleeeeeeeeeeeee
//# sourceMappingURL=utils.js.map