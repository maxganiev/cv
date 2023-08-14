<script>
	export let values, initIndex, onChange;
</script>

<div class="switch-holder">
	<div class="switcher {initIndex === 0 ? 'checked' : ''}" role="switch">
		<input type="radio" bind:group={initIndex} value={values[0]} on:change={onChange} />
		<strong class="content">EN</strong>
		<div
			class="ball {initIndex === 0 ? 'checked' : ''}"
			style="background: url(/assets/imgs/en.svg) center center/cover no-repeat;"
		/>
	</div>

	<div class="switcher {initIndex === 1 ? 'checked' : ''}" role="switch">
		<input type="radio" bind:group={initIndex} value={values[1]} on:change={onChange} />
		<strong class="content">RU</strong>
		<div
			class="ball {initIndex === 1 ? 'checked' : ''}"
			style="background: url(/assets/imgs/ru.svg) center center/cover no-repeat;"
		/>
	</div>
</div>

<style lang="scss" scoped>
	.switch-holder {
		min-height: 4rem;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		.switcher {
			width: 3rem;
			height: 1.5rem;
			border-radius: 50px;
			border: 0.5px $clr-pink solid;
			position: relative;
			background: rgba(250, 250, 250, 0.9);
			display: flex;
			padding-left: 4px;
			overflow: hidden;
			opacity: 0.7;

			&.checked {
				opacity: 1;
			}

			input[type='radio'] {
				z-index: 1;
				opacity: 0;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;

				&:hover {
					cursor: pointer;
				}
			}

			.content {
				color: $clr-pink;
				font-size: $fs-sm;
				vertical-align: middle;
				display: contents;
				position: relative;
			}

			.ball {
				width: 50%;
				height: 100%;
				border-radius: 50px;
				position: absolute;
				left: 0%;
				transition: left 0.2s ease-in;

				&.checked {
					left: 50%;
				}
			}
		}
	}
</style>
