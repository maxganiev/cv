<div class="scrollhint-wrapper z-1">
	<div class="pic"><div class="dot" /></div>
</div>

<style lang="scss" scoped>
	.scrollhint-wrapper {
		display: flex;
		flex-direction: column;
		width: 15px;
		height: 50px;
		justify-content: space-evenly;
		align-items: center;
		background: transparent;
		position: absolute;
		bottom: 0px;
		right: 50%;

		@media (min-height: 150px) and (max-height: 450px), (min-width: 150px) and (max-width: 750px) {
			//right: 80%;
			transform: scale(0.8);
			bottom: unset;
			top: 30px;
		}

		.pic {
			width: inherit;
			height: 40px;
			border-radius: 20px;
			border: 0.8px $clr-pink solid;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			padding-bottom: 5px;

			.dot {
				position: absolute;
				top: 30px;
				background: $clr-pink;
				width: 8px;
				height: 8px;
				animation-name: animate-dot;
				animation-duration: 1s;
				animation-iteration-count: infinite;
				animation-fill-mode: forwards;
				animation-timing-function: ease-out;
				border-radius: 20px;

				@media (min-height: 150px) and (max-height: 450px), (min-width: 150px) and (max-width: 750px) {
					animation-name: animate-dot-mob;
				}
			}
		}
	}

	@keyframes animate-dot {
		from {
			top: 20px;
		}
		to {
			top: 30px;
		}
	}

	@keyframes animate-dot-mob {
		from {
			top: 20px;
		}
		to {
			top: 10px;
		}
	}
</style>
