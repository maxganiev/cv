<script>
	import { onMount } from 'svelte';

	export let src;
	let video = {
		elem: null,
		loaded: false,
		setLoaded(readyState) {
			this.loaded = readyState === 4;
			video = video;
		},
	};

	onMount(() => {
		video.setLoaded(video.elem.readyState);
		console.log(video.elem.readyState);
		// const int = setInterval(() => {
		// 	if (!video.elem) return;
		// 	video.setLoaded(video.elem.readyState);
		// 	console.log(video.elem.readyState);
		// 	clearInterval(int);
		// }, 100);
	});
</script>

<!-- <div class="loader">
			<img src="/assets/imgs/loader.gif" alt="loader" />
		</div> -->

<video autoplay muted loop playsinline {src} bind:this={video.elem} />
