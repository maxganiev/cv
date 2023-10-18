<script>
	import { onMount } from 'svelte';
	import Project from '@components/entity/Project.svelte';
	import { langIndex, bioItems, projectItems, screenParams } from '@locale/stores';
	import { fade } from 'svelte/transition';
	import FillableButton from '@components/FillableButton.svelte';
	import SwitchGroup from '@components/SwitchGroup.svelte';
	import ScrollHint from '@components/ScrollHint.svelte';
	import Loader from '@components/Loader.svelte';

	export let region;
	let isMobile = false,
		initIndex = (region.country || region.country_name) === 'Russia' ? 1 : 0;
	langIndex.select(initIndex);

	//BIO//
	let bgVideo = {
		elem: null,
		loaded: false,
		setLoaded(readyState) {
			this.loaded = readyState === 4;
			bgVideo = bgVideo;
		},
	};

	let avatarWrapper,
		bioContentList,
		bioListNested,
		isSafariBrowser,
		astro,
		tStart,
		prevT,
		startAnimation,
		showHint = false,
		currentPageNum;

	const transformCount = {
		x: 0,
		y: 0,
	};

	const ref = {
		FillableButton: null,
	};

	const moveTo = {
		down: true,
		right: true,
		deg: 0,
	};

	function animateAstro(timeStamp) {
		if (tStart === undefined) {
			tStart = timeStamp;
		}

		//const elapsed = timeStamp - tStart;

		if (prevT !== timeStamp) {
			const astroRect = astro.getBoundingClientRect();
			const parentRect = astro.parentElement.getBoundingClientRect();

			if (astroRect.top <= parentRect.top - astroRect.height / 8) {
				moveTo.down = true;
				moveTo.deg = 0;
			}

			if (
				astroRect.top >= parentRect.height - astroRect.height / 2 &&
				parentRect.top !== document.documentElement.scrollHeight
			) {
				moveTo.down = false;
				moveTo.deg = -45;
			}

			if (astroRect.left <= -astroRect.width / 2) {
				moveTo.right = true;
				moveTo.deg = -15;
			}

			if (astroRect.left >= parentRect.width - astroRect.width / 2) {
				moveTo.right = false;
				moveTo.deg = 25;
			}

			const iterate = 1.5;
			if (moveTo.down) transformCount.y += iterate;
			else transformCount.y -= iterate;

			if (moveTo.right) transformCount.x += iterate;
			else transformCount.x -= iterate;

			astro.style.transform = `translateX(${transformCount.x}px) translateY(${transformCount.y}px)`;

			//rotate astronaut image
			astro.firstElementChild.style.transform = `rotate(${moveTo.deg}deg)`;
		}

		prevT = timeStamp;

		if (startAnimation && !showProjects) window.requestAnimationFrame(animateAstro);
		else window.cancelAnimationFrame(animateAstro);
	}

	onMount(() => {
		screenParams.setParams(window);
		isSafariBrowser =
			(navigator.userAgent.toLowerCase().includes('safari') &&
				!navigator.userAgent.toLowerCase().includes('chrome')) ||
			window.hasOwnProperty('safari');

		const int = setInterval(() => {
			if (!bgVideo.elem) return;
			clearInterval(int);
			bgVideo.setLoaded(bgVideo.elem.readyState);

			setTimeout(() => {
				avatarWrapper.classList.replace('translate-y-top-100', 'translate-y-0');

				Array.from(bioContentList.children).forEach(
					async (child, index, arr) =>
						await new Promise((resolve) =>
							setTimeout(() => {
								child.classList.replace(
									index % 2 === 0
										? 'translate-x-left-100'
										: 'translate-x-right-100',
									'translate-x-0'
								);

								if (index === arr.length - 1) resolve(true);
							}, 200 * index + 1)
						).then((res) => {
							if (res) {
								Array.from(bioListNested.children).forEach(
									async (child, index, arr) =>
										await new Promise((resolve) =>
											setTimeout(() => {
												child.classList.replace(
													'translate-y-bottom-200',
													'translate-y-0'
												);

												if (index === arr.length - 1) resolve(true);
											}, 200 * index + 1)
										).then(
											(res) =>
												res &&
												setTimeout(() => {
													ref.FillableButton.$$.ctx[0].classList.replace(
														'translate-y-bottom-200',
														'translate-y-0'
													);
												}, 400)
										)
								);
							}
						})
				);
			}, 600);
		}, 100);
	});

	//PROJECTS//
	let frames = [],
		projectWrapper;

	class Scrollable {
		static zSpacing = -1600;
		static zVals = [];

		constructor(speed, currTop, lastPos, delta) {
			this.speed = speed;
			this.start = 350;
			this.clientTop = this.start || this.currTop;
			this.currTop = currTop;
			this.lastPos = lastPos;
			this.delta = delta;
			this.isDown = false;
		}

		swipePages(e) {
			const distanceKoefficient = isMobile ? -3.5 : -4.5;
			const isWheelEvent = e.type === 'wheel' || e.type == undefined;
			this.isDown = isWheelEvent ? e.deltaY < 0 : this.currTop < e.changedTouches[0].clientY;

			currentPageNum = (() => {
				const projectsEls = Array.from(document.getElementsByClassName('project-item'));
				const scrolledProjectsElsLength = projectsEls.filter((item) => item.style.opacity != 1).length;
				return scrolledProjectsElsLength + 1 > projectsEls.length
					? scrolledProjectsElsLength
					: scrolledProjectsElsLength + 1;
			})();

			if (this.isDown) this.clientTop -= this.speed;
			else this.clientTop += this.speed;

			showHint = currentPageNum === 1;

			if (!isWheelEvent) {
				this.currTop = e.changedTouches[0].clientY;
			}

			this.delta = this.lastPos - this.clientTop;
			this.lastPos = this.clientTop;

			Scrollable.zVals = Scrollable.zVals.slice(0, frames.length);

			for (let i = 0; i < frames.length; i++) {
				Scrollable.zVals.push(i * Scrollable.zSpacing + Scrollable.zSpacing);
				Scrollable.zVals[i] += this.delta * distanceKoefficient;
			}
		}
	}

	const wheely = new Scrollable(6, null, 0, 0);
	const touchy = new Scrollable(12, null, 0, 0);
	let bindedFunc = new Function();

	$: showProjects = false;
	const toggleProjects = async () => {
		showProjects = !showProjects;

		Array.from(document.getElementsByTagName('section')).forEach((section) => {
			if (section.classList.contains('deep')) return;
			else section.style.display = showProjects ? 'none' : 'block';
		});

		if (showProjects) {
			await new Promise((resolve) => {
				const int = setInterval(() => {
					if (!projectWrapper) return;
					frames = Array.from(projectWrapper.children);
					clearInterval(int);
					resolve(true);
				}, 100);
			}).then((res) => {
				if (res) {
					isMobile = window.matchMedia('(pointer: coarse)').matches;

					if (!isMobile) {
						bindedFunc = wheely.swipePages.bind(wheely);
						window.addEventListener('wheel', bindedFunc, {
							passive: false,
						});
						wheely.swipePages(window);
					} else {
						bindedFunc = touchy.swipePages.bind(touchy);
						window.addEventListener('touchmove', bindedFunc, {
							passive: false,
						});
					}

					bindedFunc(window);
				}
			});
		} else {
			window.removeEventListener('wheel', bindedFunc);
			window.removeEventListener('touchmove', bindedFunc);
		}
	};

	onMount(() => {
		return () => {
			window.removeEventListener('wheel', bindedFunc);
			window.removeEventListener('touchmove', bindedFunc);
		};
	});

	let sectionDetails;
	function onMainScroll() {
		startAnimation = sectionDetails.getBoundingClientRect().top <= document.documentElement.scrollTop;
		animateAstro(Date.now());
	}
</script>

<main on:scroll={onMainScroll}>
	<section class="deep bg-contrast-black">
		<video
			class="bg-video z-1"
			autoplay
			muted
			loop
			playsinline
			src="/assets/video/ship.mp4"
			bind:this={bgVideo.elem}
		/>

		{#if !bgVideo.elem}
			<Loader />
		{/if}

		{#if bgVideo.elem && !bgVideo.loaded}
			<img class="bg-img z-0" src="/assets/imgs/bg-1.jpg" alt="background" />
		{/if}

		<div class="lang-panel">
			<SwitchGroup values={[0, 1]} {initIndex} onChange={(e) => langIndex.select(e.target.value)} />
		</div>
		<div class="content z-3">
			<div class="bio">
				<div class="avatar-wrapper translate-y-top-100 transition-02" bind:this={avatarWrapper}>
					<div class="avatar z-1">
						<img src="/assets/imgs/Max.png" alt="Max" />
					</div>
				</div>

				<ul class="bio-content" bind:this={bioContentList}>
					{#each $bioItems as bioItem, index}
						{#if !['Stack', 'Стэк'].includes(bioItem.key)}
							<li
								class="{index % 2 === 0
									? 'translate-x-left-100'
									: 'translate-x-right-100'} transition-06"
							>
								<strong>{bioItem.key}:</strong>
								{bioItem.value}
							</li>
						{:else}
							<li
								class="{index % 2 === 0
									? 'translate-x-left-100'
									: 'translate-x-right-100'} transition-06"
							>
								<strong>{bioItem.key}:</strong>
								<ul class="bio-list-nested" bind:this={bioListNested}>
									{#each bioItem.value.split(';') as nestedItem}
										<li class="translate-y-bottom-200 transition-08">
											{nestedItem}
										</li>
									{/each}
								</ul>
							</li>
						{/if}
					{/each}
				</ul>
				<FillableButton
					role="button"
					cssClasses={['translate-y-bottom-200']}
					content={['Check out project examples', 'Посмотреть примеры проектов'][$langIndex]}
					onclick={toggleProjects}
					styling="margin: 2.5% auto; height: 5vh;"
					bind:this={ref.FillableButton}
				/>
			</div>

			{#if showProjects}
				<div transition:fade class="project-container-root-fixed">
					<div class="pagination z-1">
						<span class="page"
							>{['Project', 'Проект'][$langIndex]}
							<span class="page-num">{currentPageNum}</span>
						</span>

						<span class="page"
							>{['out of ', 'из '][$langIndex]}
							<span class="page-num">{$projectItems.length}</span></span
						>
					</div>

					{#if showHint}
						<ScrollHint />
					{/if}
					<p class="para-details">Telegram: @maxganiev</p>
					<div class="project-container-fixed">
						<button on:click={toggleProjects} class="btn btn-projects-off">&#10006;</button>
						<div class="project-wrapper" bind:this={projectWrapper}>
							{#each $projectItems as project, index}
								<Project
									info={project}
									translateZ={Scrollable.zVals[index]}
									opacity={Scrollable.zVals[index] >=
										Math.abs(Scrollable.zSpacing) / 3 &&
									Scrollable.zVals[index] < Math.abs(Scrollable.zSpacing) / 1.4
										? 0.6
										: Scrollable.zVals[index] >=
										  Math.abs(Scrollable.zSpacing) / 1.4
										? 0
										: 1}
									languageIndex={$langIndex}
									classname={index % 2 === 0 ? 'even' : 'odd'}
									loadVideo={index + 1 === currentPageNum}
								/>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		</div>
	</section>
	<section class="bg-contrast-white z-4" bind:this={sectionDetails}>
		<div class="astro" bind:this={astro}><img src="/assets/imgs/bg-2.png" alt="astronaut" /></div>

		<div class="details">
			<strong
				>Telegram:
				<FillableButton
					styling="height: auto; color: #000"
					role="button"
					content="@maxganiev"
					onclick={(e) => e.target.nextElementSibling.click()}
				/>
				<a href="https://t.me/maxganiev" target="_blank" style="display: none;" />
			</strong>
			<br />
			<strong
				>Github:
				<FillableButton
					styling="height: auto; color: #000"
					role="button"
					content="maxganiev"
					onclick={(e) => e.target.nextElementSibling.click()}
				/>
				<a href="https://github.com/maxganiev" target="_blank" style="display: none;" /></strong
			>
		</div>

		<footer class="z-4">
			<div class="content">
				<div>
					<p>
						{['Built with ❤️ using Astro and Svelte', 'Собрано с ❤️ на Astro и Svelte'][
							$langIndex
						]}
					</p>
				</div>

				<div>
					<p>{['References:', 'Референс:'][$langIndex]}</p>
					<ul class="list">
						{#each [['Bg video->https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=71654', 'Avatar->https://instagram.com/ganieva.anastasia?igshid=NTc4MTIwNjQ2YQ=='], ['Фоновое видео->https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=71654', 'Аватар->https://instagram.com/ganieva.anastasia?igshid=NTc4MTIwNjQ2YQ==']][$langIndex] as listItem}
							<li>
								<FillableButton
									styling="height: auto; width: 100%;"
									role="button"
									content={listItem.split('->')[0]}
									onclick={(e) => e.target.nextElementSibling.click()}
								/>
								<a href={listItem.split('->')[1]} target="_blank" style="display: none;"
									>.</a
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<div class="qr">
				<img src="/assets/imgs/qrcode_github.com.png" alt="qr_github" />
				<img src="/assets/imgs/qrcode_t.me.png" alt="qr_tme" />
			</div>
		</footer>
	</section>
</main>

<style lang="scss" scoped>
	main {
		width: 100%;
		height: 100vh;
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;
		overflow: scroll;
		overflow-x: hidden;

		@media (min-height: 150px) and (max-height: 450px) {
			scroll-snap-type: unset;
		}

		section {
			width: 100%;
			min-height: 100vh;
			scroll-snap-align: end;

			&.deep {
				position: relative;

				&::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: rgba(20, 1, 20, 0.7);
					z-index: 2;
				}

				.bg-video,
				.bg-img {
					position: absolute;
					top: 0;
					left: 0;
					height: 100vh;
					width: 100vw;
					object-fit: cover;
					pointer-events: none;
				}

				.lang-panel {
					display: flex;
					justify-content: center;
					padding: 5px;
					position: fixed;
					top: 10px;
					right: 20px;
					width: auto;
					z-index: 5;

					button {
						width: 1.8em;
						height: 2.2em;
						border: none;
						z-index: 1;

						&:first-of-type {
							background: url(/assets/imgs/en.svg) center center/cover;
							border-radius: 2.5px;
						}

						&:nth-of-type(2) {
							background: url(/assets/imgs/ru.svg) center center/cover;
							border-radius: 2.5px;
						}

						&.lang-selected {
							transform: scale(1.1);
						}
					}
				}

				.content {
					position: relative;

					.bio {
						margin-left: 15%;
						width: $w-base;
						height: 100vh;
						display: flex;
						flex-direction: column;
						justify-content: space-evenly;
						position: relative;

						@media (min-width: 150px) and (max-width: 750px) {
							margin-left: 5%;
							width: 90%;
							display: inline-block;
						}

						.avatar-wrapper {
							position: relative;
							display: flex;
							justify-content: center;
							align-items: center;
							min-height: 20vh;
							margin-top: 2vh;

							&::after {
								content: '';
								position: absolute;
								top: 0;
								left: 0%;
								width: 100%;
								height: 90%;
								border-bottom: 1px #fff solid;
							}

							.avatar {
								border: 1px #fff solid;
								border-radius: 130px;
								max-width: 220px;
								width: 22.5%;
								background: #fff;
								aspect-ratio: 1/1;
								overflow: hidden;

								@media (min-height: 150px) and (max-height: 450px) {
									max-width: 10%;
								}

								img {
									width: 100%;
									height: 100%;
									object-fit: contain;
								}
							}
						}

						.bio-content {
							width: 100%;
							min-height: 50vh;
							line-height: $lh-mid;
							font-size: $fs-mid;

							.bio-list-nested {
								padding-left: 1.5rem;
								line-height: $lh-mid;
								font-size: $fs-mid;

								@media (min-width: 150px) and (max-width: 750px) {
									font-size: $fs-sm-mid-mob;
									line-height: $lh-sm-mob;
								}

								@media (min-height: 150px) and (max-height: 450px) {
									font-size: $fs-vsm;
									line-height: $lh-sm-mob;
								}

								li::before {
									content: '\25BB';
									margin-right: 5px;
									color: $clr-pink;
								}
							}

							&,
							li {
								@media (min-width: 150px) and (max-width: 750px) {
									font-size: $fs-sm-mid-mob;
									line-height: $lh-sm-mob;
								}

								@media (min-height: 150px) and (max-height: 450px) {
									font-size: $fs-vsm;
									line-height: $lh-sm-mob;
								}
							}
						}

						.btn-projects-on {
							color: #fff;
							font-size: 1.2rem;
							position: absolute;
							width: 100%;
							top: 92.5%;
							height: 50px;

							span {
								width: 50%;
								position: absolute;
								top: 0;
								left: 25%;
								pointer-events: none;
								display: inline;
								text-align: left;
								font-size: $fs-mid;

								&.span-dynamic {
									color: $clr-pink;
									z-index: 1;
								}

								&.span-static {
									color: #fff;
								}
							}
						}
					}

					.project-container-root-fixed {
						position: fixed;
						top: 0%;
						left: 0;
						width: 100%;
						height: 100%;
						background-color: #000;

						.pagination {
							position: absolute;
							bottom: 10vh;
							left: 5vw;
							line-height: 0.8rem;

							.page {
								display: block;

								&:nth-of-type(2) {
									position: absolute;
									right: -10px;
								}

								span.page-num {
									font-size: 2rem;
									color: $clr-pink;
								}
							}

							@media (min-height: 150px) and (max-height: 450px),
								(min-width: 150px) and (max-width: 750px) {
								& {
									left: unset;
									right: 10vw;
									font-size: 0.8rem;

									.page {
										& > span.page-num {
											font-size: 1rem;
										}
									}
								}
							}
						}

						.para-details {
							margin-top: 50vh;
							text-align: center;
						}

						.project-container-fixed {
							width: 100%;
							height: 100%;
							position: fixed;
							perspective: 1000px;
							top: 0;

							.btn-projects-off {
								font-size: 1.6rem;
								position: relative;
								top: 15px;
								left: 15px;
								color: $clr-pink;
								z-index: 100;

								&:hover {
									transform: scale(1.1);
									transition: transform 0.4s ease-out;
								}
							}

							.project-wrapper {
								width: 100%;
								height: 100%;
								transform-style: preserve-3d;
							}
						}
					}
				}
			}

			&:nth-of-type(2) {
				position: relative;
				background-color: #fff;
				height: 80vh;

				.astro {
					position: absolute;
					top: 0;
					left: 0;
					width: 40%;
					height: 40%;
					z-index: 5;
					overflow: hidden;

					@media (min-width: 150px) and (max-width: 750px) {
						width: 60%;
						height: 60%;
					}

					img {
						width: 100%;
						height: 100%;
						object-fit: contain;
						transition: transform 0.4s ease-out;
					}
				}
			}

			.details {
				position: relative;
				z-index: 6;
				font-size: $fs-lg-mob;
				width: 40%;
				height: 30%;
				top: 20%;
				left: 30%;
				display: flex;
				flex-direction: column;
				text-align: center;
				justify-content: center;
			}

			footer {
				width: 100%;
				position: absolute;
				top: 80vh;
				min-height: 20vh;
				background: #000;
				display: flex;
				align-items: center;
				padding: 0 5%;
				justify-content: space-between;

				@media (min-width: 150px) and (max-width: 750px) {
					top: 65vh;
					min-height: 35vh;
				}

				.content {
					width: 40%;
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					justify-content: center;
					column-gap: 3rem;

					@media (min-width: 150px) and (max-width: 750px) {
						width: 80%;
					}

					.list {
						display: flex;
						flex-direction: column;
						align-items: flex-start;
					}

					p,
					span {
						color: #fff;
						font-size: $fs-mid;

						@media (min-width: 150px) and (max-width: 750px) {
							font-size: $fs-sm-mid-mob;
						}
					}
				}

				.qr {
					img {
						display: inline-block;
						object-fit: contain;
						height: 15vh;

						&:first-of-type {
							margin-right: 20px;
						}
					}

					@media (min-width: 150px) and (max-width: 750px) {
						display: none;
					}
				}
			}
		}
	}
</style>
