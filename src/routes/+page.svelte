<script lang="ts">
	import HeroSection from './components/HeroSection.svelte';
	import ShowcaseSection from './components/ShowcaseSection.svelte';
	import PixelAnimationSection from './components/PixelAnimationSection.svelte';
	import MilestonesSection from './components/MilestonesSection.svelte';
	import BiographySection from './components/BiographySection.svelte';
	import FooterSection from './components/FooterSection.svelte';
	import PaginationSidebar from './components/PaginationSidebar.svelte';

	export let data;
	$: ({ showcases, milestones } = data);
</script>

<svelte:head>
	<title>Mu Zia Dev Log - Web Development Activity</title>
	<meta name="description" content="Development activity logs and project showcase of Mu Zia Dev." />
</svelte:head>

<PaginationSidebar />

<main class="bg-black">
	<HeroSection />
	
	<ShowcaseSection {showcases} />
		
	<PixelAnimationSection />

	<MilestonesSection {milestones} />

	<BiographySection />
	
	<FooterSection />
</main>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
	
	:global(body) {
		background-color: black;
		color: white;
		overflow-x: hidden;
	}
</style>
