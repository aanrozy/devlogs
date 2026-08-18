<script lang="ts">
    import DevLogsSection from '../components/DevLogsSection.svelte';
    import FooterSection from '../components/FooterSection.svelte';
    import Button from '$lib/components/ui/button.svelte';
    import { ArrowLeft } from 'lucide-svelte';

    export let data;
    $: ({ devlogs } = data);
</script>

<svelte:head>
    <title>Dev Logs - Mu Zia Dev</title>
    <meta name="description" content="Real-time development activity logs and system updates." />
</svelte:head>

<main class="bg-black min-h-screen pt-24">
    <div class="container mx-auto px-4 mb-8">
        <a href="/" class="inline-flex items-center gap-2 text-white/60 hover:text-yellow-200 transition-colors group">
            <ArrowLeft size={20} class="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
        </a>
    </div>

    <DevLogsSection {devlogs} />
    
    <FooterSection />
</main>

<style>
    :global(body) {
        background-color: black;
        color: white;
    }
</style>
