<script>
	export let role, content, onclick, ref, styling, cssClasses;

	const smoothlyRecolor = {
		int: null,
		start(e) {
			const isHovered = e.type === 'mouseover';
			const spans = e.target.children[0].children;

			if (this.int) clearInterval(this.int);

			this.int = setInterval(() => {
				if (isHovered && spans[0].textContent.length < spans[1].textContent.length)
					spans[0].textContent += spans[1].textContent[spans[0].textContent.length];
				else if (!isHovered && spans[0].textContent.length > 0)
					spans[0].textContent = spans[0].textContent.slice(0, -1);
				else clearInterval(this.int);
			}, 10);
		},
	};
</script>

<button
	class="btn btn-fillable transition-10 {cssClasses ? cssClasses.map((c) => c).join(' ') : ''}"
	style={styling}
	on:click={onclick}
	on:mouseover|self={smoothlyRecolor.start.bind(smoothlyRecolor)}
	on:mouseleave|self={smoothlyRecolor.start.bind(smoothlyRecolor)}
	bind:this={ref}
>
	<div class="span-wrapper">
		<span class="span-dynamic" /><span class="span-static">{content}</span>
	</div>
</button>

<style lang="scss" scoped>
	.btn-fillable {
		color: #fff;
		width: $w-base;
		height: 50px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;

		.span-wrapper {
			position: relative;
			height: 100%;
			pointer-events: none;
			display: flex;

			span {
				width: 100%;
				top: 0;
				left: 0%;
				pointer-events: none;
				display: inline;
				text-align: left;
				font-size: $fs-mid;

				@media (min-width: 150px) and (max-width: 750px) {
					font-size: $fs-lg-mob;
					margin-top: 10%;
				}

				@media (min-height: 150px) and (max-height: 450px) {
					font-size: $fs-vsm;
					margin-top: 0;
				}

				&.span-dynamic {
					position: absolute;
					color: $clr-pink;
					z-index: 1;
				}

				&.span-static {
					position: relative;
					color: inherit;
				}
			}
		}
	}
</style>
