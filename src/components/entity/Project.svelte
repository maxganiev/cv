<script>
	import FillableButton from '@components/FillableButton.svelte';
	import { langIndex, screenParams } from '@locale/stores';
	import { onMount } from 'svelte';

	export let info, translateZ, opacity, languageIndex, classname;

	/**@type {HTMLButtonElement}*/
	let btnDefaultFocused;
	let orientationOptions = {
		currentOrientation: 'landscape',
		get videoIndex() {
			return this.currentOrientation === 'landscape' ? 0 : 1;
		},
		setCurrentOrientation(desktopSelected) {
			this.currentOrientation = desktopSelected ? 'landscape' : 'portrait';
			orientationOptions = orientationOptions;
		},
	};

	const breakpoint = {
		width: 760,
	};

	function swipePreviewOrientation(e) {
		const btn = e?.target || btnDefaultFocused;
		const desktopSelected = btn.getAttribute('data-screen-type') === 'desktop';
		const btnParentEl = btn.parentElement;

		//reset styling
		const btnIndexToResetStyle = btnParentEl.children.length > 1 ? (desktopSelected ? 1 : 0) : 0;
		btnParentEl.children[btnIndexToResetStyle].classList.remove('focused');
		btnParentEl.children[btnIndexToResetStyle].style.background = `url(/assets/imgs/${
			btnIndexToResetStyle === 0 ? 'desktop.svg' : 'mobile.svg'
		}) no-repeat center center/contain`;

		//apply styling
		btn.classList.add('focused');
		btn.style.background = `url(/assets/imgs/${
			desktopSelected ? 'desktop-maline.svg' : 'mobile-maline.svg'
		}) no-repeat center center/contain`;

		//set orientation
		orientationOptions.setCurrentOrientation(desktopSelected);
	}

	let tabPanel, currentTab;
	function swipeTabs(e) {
		if (e.target.tagName !== 'BUTTON') return;

		Array.from(tabPanel.children).forEach((child) => {
			if (child === e.target) {
				child.classList.add('focused');
				currentTab = e.target.getAttribute('data-tab');
			} else child.classList.remove('focused');
		});
	}

	onMount(() => {
		currentTab = 'bio';
		swipePreviewOrientation();
	});

	let video;
</script>

<div
	class={'project-item ' + classname}
	style="transform: translateZ({translateZ}px); opacity: {opacity}; pointer-events: {opacity !== 0
		? 'all'
		: 'none'}"
>
	<div
		class="tab-panel"
		on:click={swipeTabs}
		bind:this={tabPanel}
		style="display: {$screenParams.width < breakpoint.width ? 'flex' : 'none'}"
	>
		<button class="btn tab transition-02 focused" data-tab="bio">{['Content', 'Описание'][$langIndex]}</button>
		<button class="btn tab transition-02" data-tab="video">{['Preview', 'Превью'][$langIndex]}</button>
	</div>

	<div
		class="bio"
		style="display: {$screenParams.width >= breakpoint.width ||
		($screenParams.width < breakpoint.width && currentTab === 'bio')
			? 'block'
			: 'none'}"
	>
		<h3>{info.name}</h3>
		<div>
			{#if info.desc.indexOf('\n') !== -1}
				<ul>
					{#each info.desc.split('\n') as listItem}
						<li>{listItem}</li>
					{/each}
				</ul>
			{:else}
				<p>{info.desc}</p>
			{/if}
		</div>

		<div class="tags-wrapper">
			{#each info.tags as tag}
				<span class="tag">{tag}</span>
			{/each}
		</div>
	</div>

	<div class="separator" style="display: {$screenParams.width >= breakpoint.width ? 'block' : 'none'};" />

	<div
		class={'video-wrapper' + ' ' + orientationOptions.currentOrientation}
		style="display: {$screenParams.width >= breakpoint.width ||
		($screenParams.width < breakpoint.width && currentTab === 'video')
			? 'block'
			: 'none'}"
	>
		<div class="video-overlay">
			<div class="layer z-1" />
			<video
				autoplay
				muted
				loop
				playsinline
				src={info.video_urls[orientationOptions.videoIndex]}
				bind:this={video}
			/>
		</div>

		{#if !video}
			<div class="loader">
				<img src="/assets/imgs/loader.gif" alt="loader" />
			</div>
		{/if}

		<div class="orientation-switch">
			{#if info.available_orientations.includes('landscape')}
				<button
					class="transition-02 focused"
					data-screen-type="desktop"
					on:click={swipePreviewOrientation}
					bind:this={btnDefaultFocused}
				/>
			{/if}
			{#if info.available_orientations.includes('portrait')}
				<button class="transition-02" data-screen-type="mobile" on:click={swipePreviewOrientation} />
			{/if}
		</div>
	</div>

	<div class="link-wrapper">
		<FillableButton
			role="button"
			content={['Go to page', 'Перейти на страничку'][languageIndex]}
			onclick={(e) => e.target.nextElementSibling.click()}
			styling="width: 40%; min-width: 180px; margin: 0 auto;"
		/>
		<a href={info.link} target="_blank" style="display: none" />
	</div>
</div>

<style lang="scss" scoped>
	video {
		width: 100%;
		height: 100%;
		object-fit: contain;
		border-radius: $border-radius-main;
		pointer-events: none;
		user-select: none;
	}

	.project-item {
		width: 70%;
		height: 60vh;
		top: 20vh;
		left: 15%;
		position: absolute;
		background-color: #000;
		will-change: transform;
		transform-style: preserve-3d;
		transition: transform 0.4s ease-out;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-items: center;
		row-gap: 2.6rem;

		@media (min-width: 150px) and (max-width: 750px), (min-height: 150px) and (max-height: 450px) {
			height: 90vh;
			top: 5vh;
			justify-content: center;
			align-items: center;
			text-align: center;
			width: 95%;
			left: 2.5%;
			row-gap: 0;
		}

		.tab-panel {
			display: flex;
			width: 100%;
			justify-content: center;
			height: 5%;

			.tab {
				flex: 0.4;
				background-color: #fff;
				min-height: 30px;
				max-height: 5%;
				font-size: $fs-mid-mob;

				&.focused {
					transform: scale(1.1);
					background-color: $clr-pink;
				}

				&:first-of-type {
					border-radius: $border-radius-main 0px 0px $border-radius-main;
				}

				&:nth-of-type(2) {
					border-radius: 0px $border-radius-main $border-radius-main 0px;
				}
			}
		}

		.bio {
			width: 50%;
			text-align: left;

			@media (min-width: 150px) and (max-width: 750px) {
				width: 100%;
			}

			h3 {
				font-size: $fs-lg;
				text-align: center;
				margin-bottom: 10px;

				@media (min-width: 150px) and (max-width: 750px) {
					font-size: $fs-lg-mob;
				}

				@media (min-height: 150px) and (max-height: 450px) {
					margin-top: 40px;
				}
			}

			ul > li {
				padding-left: 1.2rem;
				line-height: $lh-mid;
				font-size: $fs-mid;

				@media (min-width: 150px) and (max-width: 750px) {
					font-size: $fs-mid-mob;
					line-height: $lh-mid-mob;
				}

				&::before {
					content: '⊕';
					margin-right: 5px;
					color: $clr-pink;
				}
			}

			p {
				line-height: $lh-mid;
				font-size: $fs-mid;

				@media (min-width: 150px) and (max-width: 750px) {
					font-size: $fs-mid-mob;
					line-height: $lh-mid-mob;
				}
			}

			.tags-wrapper {
				margin-top: 4%;
				display: flex;
				flex-wrap: wrap;
				padding-left: 1.2rem;

				.tag {
					background-color: $clr-pink;
					border-radius: $border-radius-main;
					font-size: $fs-mid;
					text-align: center;
					min-width: 100px;
					min-height: 20px;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 1.5%;

					@media (min-width: 150px) and (max-width: 750px) {
						font-size: $fs-mid-mob;
					}
				}
			}
		}

		.separator {
			width: 4.5%;
		}

		.video-wrapper {
			width: 45%;
			position: relative;
			transform: perspective(0px);
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.video-overlay {
				width: 100%;
				height: 85%;
				position: relative;
				padding: 10px;

				.layer {
					background: rgba(20, 1, 20, 0.3);
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					border-radius: $border-radius-main;
				}
			}

			.orientation-switch {
				height: 10%;
				display: flex;
				justify-content: center;
				max-height: 20px;
				margin-top: 20px;
				transform: unset;

				.focused {
					transform: scale(1.3);
				}

				button {
					flex: 0.125;
					border: none;
					outline: none;
					transform: unset;

					&:nth-of-type(2) {
						margin-left: 5%;
					}
				}
			}

			&.portrait {
				aspect-ratio: 3/4;
				padding: 10px 0;
				height: 100%;
				max-width: 300px;
				min-height: 600px;

				@media (min-width: 150px) and (max-width: 750px) {
					width: 100%;
					height: 80%;
					min-height: unset;
					justify-content: flex-start;
					margin-top: 3%;
				}
			}

			&.landscape {
				aspect-ratio: 3/2;
				padding: 0 10px;

				@media (min-width: 150px) and (max-width: 750px) {
					width: 100%;
					height: 70%;
					justify-content: flex-start;

					.video-overlay > video {
						object-fit: cover;
					}
				}

				@media (min-height: 150px) and (max-height: 450px) {
					width: 60%;
					height: 60%;
					margin-top: 3%;

					.video-overlay > video {
						object-fit: contain;
					}
				}
			}
		}

		&.even {
			flex-direction: row;
		}

		&.odd {
			flex-direction: row-reverse;
		}
	}

	.link-wrapper {
		width: 100%;

		@media (min-width: 150px) and (max-width: 750px), (min-height: 150px) and (max-height: 450px) {
			margin-top: 3%;
		}
	}
</style>
