import { writable, derived, readable } from 'svelte/store';
import { bioItemsList } from 'public/data/bio';
import { projectItemsList } from 'public/data/projects';

export const langIndex = (function () {
	const { subscribe, set } = writable(0);

	return {
		subscribe,
		select: (index) => set(index),
	};
})();

export const bioItems = derived(langIndex, ($langIndex) => bioItemsList[$langIndex]);
export const projectItems = derived(langIndex, ($langIndex) => projectItemsList[$langIndex]);

export const screenParams = (function () {
	const { subscribe, set } = writable({});

	return {
		subscribe,
		setParams: (window) => {
			function setScreenParams() {
				set({ width: window.innerWidth, height: window.innerHeight });
			}

			if (window) {
				setScreenParams();
				window.addEventListener('resize', setScreenParams);
			} else {
				window.removeEventListener('resize', setScreenParams);
			}
		},
	};
})();
