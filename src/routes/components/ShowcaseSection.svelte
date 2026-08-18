<script lang="ts">
	import { onMount } from "svelte";
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
	import { urlFor } from "$lib/sanity/client";

	gsap.registerPlugin(ScrollTrigger);

	interface Showcase {
		id: string;
		title: string;
		image: any;
		category?: string;
		url?: string;
	}

	export let showcases: Showcase[] = [];

	// Fallback jika data belum ada atau kosong
	const defaultShowcases: Showcase[] = [
		{
			id: "project-1",
			title: "E-Commerce Platform",
			image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
			category: "SaaS Solution",
			url: "#",
		},
		{
			id: "project-2",
			title: "Corporate Branding",
			image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
			category: "Corporate Website",
			url: "#",
		},
		{
			id: "project-3",
			title: "Personal Portfolio",
			image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
			category: "Personal Website",
			url: "#",
		},
		{
			id: "project-4",
			title: "Custom Dashboard",
			image: "https://images.unsplash.com/photo-1551288049-bbda6465fba1?auto=format&fit=crop&q=80&w=800",
			category: "Custom Web App",
			url: "#",
		},
	];

	$: displayShowcases =
		showcases && showcases.length > 0 ? showcases : defaultShowcases;

	// Split showcases into two rows if there are enough
	$: row1Showcases =
		displayShowcases.length >= 4
			? displayShowcases.slice(0, Math.ceil(displayShowcases.length / 2))
			: displayShowcases;
	$: row2Showcases =
		displayShowcases.length >= 4
			? displayShowcases.slice(Math.ceil(displayShowcases.length / 2))
			: [...displayShowcases].reverse();

	// Duplicate showcases for infinite scroll effect
	$: duplicatedRow1 = [...row1Showcases, ...row1Showcases, ...row1Showcases];
	$: duplicatedRow2 = [...row2Showcases, ...row2Showcases, ...row2Showcases];

	let row1Container: HTMLElement;
	let row2Container: HTMLElement;
	let sectionHeader: HTMLElement;
	let row1Tween: gsap.core.Tween | null = null;
	let row2Tween: gsap.core.Tween | null = null;

	function startAutoScroll(
		container: HTMLElement,
		direction: "left" | "right",
		duration: number = 40,
	) {
		if (!container) return null;

		const totalWidth = container.scrollWidth;
		const scrollDistance = totalWidth / 3;

		if (direction === "left") {
			return gsap.to(container, {
				scrollLeft: scrollDistance,
				duration: duration,
				ease: "none",
				repeat: -1,
				onRepeat: () => {
					container.scrollLeft = 0;
				},
			});
		} else {
			// Start from middle and scroll backwards
			container.scrollLeft = scrollDistance;
			return gsap.to(container, {
				scrollLeft: 0,
				duration: duration,
				ease: "none",
				repeat: -1,
				onRepeat: () => {
					container.scrollLeft = scrollDistance;
				},
			});
		}
	}

	onMount(() => {
		// Entrance Animation for Header
		gsap.from(sectionHeader.children, {
			scrollTrigger: {
				trigger: sectionHeader,
				start: "top 85%",
			},
			y: 50,
			opacity: 0,
			duration: 1,
			stagger: 0.2,
			ease: "power3.out",
		});

		// Initialize animations
		setTimeout(() => {
			row1Tween = startAutoScroll(row1Container, "left", 50);
			row2Tween = startAutoScroll(row2Container, "right", 50);
		}, 100);

		// Hover controls for Row 1
		row1Container?.addEventListener("mouseenter", () => row1Tween?.pause());
		row1Container?.addEventListener("mouseleave", () =>
			row1Tween?.resume(),
		);
		row1Container?.addEventListener("touchstart", () => row1Tween?.pause());
		row1Container?.addEventListener("touchend", () => row1Tween?.resume());

		// Hover controls for Row 2
		row2Container?.addEventListener("mouseenter", () => row2Tween?.pause());
		row2Container?.addEventListener("mouseleave", () =>
			row2Tween?.resume(),
		);
		row2Container?.addEventListener("touchstart", () => row2Tween?.pause());
		row2Container?.addEventListener("touchend", () => row2Tween?.resume());

		return () => {
			row1Tween?.kill();
			row2Tween?.kill();
		};
	});

	function getImageUrl(image: any) {
		if (typeof image === "string") return image;
		try {
			return urlFor(image).url();
		} catch (e) {
			return "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800"; // fallback
		}
	}

	function handleCardClick(url?: string) {
		if (url && url !== "#") {
			window.open(url, "_blank", "noopener,noreferrer");
		}
	}
</script>

<section id="showcase" class="bg-black py-24 relative overflow-hidden">
	<div
		class="absolute inset-0 bg-gradient-to-b from-black/95 via-black/30 to-black/95 z-0 pointer-events-none"
	></div>

	<div class="relative z-10">
		<div
			bind:this={sectionHeader}
			class="max-w-3xl mx-auto text-center mb-4 md:mb-8 space-y-4 px-4"
		>
			<div
				class="text-yellow-200/80 text-sm font-bold tracking-[0.2em] uppercase"
			>
				Showcase Project
			</div>
			<h3
				class="text-3xl md:text-5xl font-extrabold text-white leading-tight font-['Playfair_Display']"
			>
				Crafting Vision <br class="block md:hidden" />to Manifestation
			</h3>
			<p class="text-sm md:text-lg text-white/60 leading-relaxed">
				Boundless creativity shaped by dedication and precision.<br
					class="hidden md:block"
				/> Let every piece we deliver prove the quality we proudly maintain.
			</p>
		</div>

		<div class="carousel-outer-wrapper space-y-8">
			<!-- Row 1: Moves Left -->
			<div
				bind:this={row1Container}
				class="carousel-inner flex gap-6 mb-6 overflow-x-auto scrollbar-hide"
				style="scroll-behavior: auto;"
			>
				{#each duplicatedRow1 as item, index (index)}
					<div
						class="card-wrapper flex-shrink-0"
						on:click={() => handleCardClick(item.url)}
						on:keydown={(e) =>
							e.key === "Enter" && handleCardClick(item.url)}
						role="button"
						tabindex="0"
					>
						<div
							class="relative w-80 md:w-[400px] h-48 md:h-60 rounded-2xl overflow-hidden cursor-pointer bg-white/5 border border-white/10 group"
						>
							<!-- Image Container -->
							<div
								class="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110"
							>
								<img
									src={getImageUrl(item.image)}
									alt={item.title}
									class="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity duration-500"
								/>
							</div>

							<!-- Dark Overlay on Hover -->
							<div
								class="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center"
							>
								<span
									class="text-yellow-200 text-xs font-bold uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75"
								>
									{item.category || "Project"}
								</span>
								<h4
									class="text-xl md:text-2xl font-bold text-white text-center px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
								>
									{item.title}
								</h4>
								<!-- {#if item.url && item.url !== '#'}
									<span class="mt-4 text-white/60 text-xs font-medium border border-white/20 px-3 py-1 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
										View Project
									</span>
								{/if} -->
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Row 2: Moves Right -->
			<div
				bind:this={row2Container}
				class="carousel-inner flex gap-6 overflow-x-auto scrollbar-hide"
				style="scroll-behavior: auto;"
			>
				{#each duplicatedRow2 as item, index (index)}
					<div
						class="card-wrapper flex-shrink-0"
						on:click={() => handleCardClick(item.url)}
						on:keydown={(e) =>
							e.key === "Enter" && handleCardClick(item.url)}
						role="button"
						tabindex="0"
					>
						<div
							class="relative w-80 md:w-[400px] h-48 md:h-60 rounded-2xl overflow-hidden cursor-pointer bg-white/5 border border-white/10 group"
						>
							<!-- Image Container -->
							<div
								class="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110"
							>
								<img
									src={getImageUrl(item.image)}
									alt={item.title}
									class="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity duration-500"
								/>
							</div>

							<!-- Dark Overlay on Hover -->
							<div
								class="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center"
							>
								<span
									class="text-yellow-200 text-xs font-bold uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75"
								>
									{item.category || "Project"}
								</span>
								<h4
									class="text-xl md:text-2xl font-bold text-white text-center px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
								>
									{item.title}
								</h4>
								<!-- {#if item.url && item.url !== '#'}
									<span class="mt-4 text-white/60 text-xs font-medium border border-white/20 px-3 py-1 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
										View Project
									</span>
								{/if} -->
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Side Gradients for smooth fade -->
			<div
				class="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/50 to-transparent z-20 pointer-events-none"
			></div>
			<div
				class="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/50 to-transparent z-20 pointer-events-none"
			></div>
		</div>
	</div>
</section>

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}

	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.carousel-outer-wrapper {
		position: relative;
		overflow: visible;
		padding: 1rem 0;
	}

	.carousel-inner {
		padding-left: 1rem;
		padding-right: 1rem;
	}

	@media (min-width: 768px) {
		.carousel-inner {
			padding-left: 2rem;
			padding-right: 2rem;
		}
	}

	.card-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		will-change: transform;
		outline: none;
	}

	.card-wrapper > div {
		will-change: transform;
		transform-origin: center;
		transition: all 0.3s ease;
	}

	.card-wrapper:hover > div {
		border-color: rgba(254, 240, 138, 0.3);
		box-shadow: 0 0 30px rgba(254, 240, 138, 0.1);
	}
</style>
