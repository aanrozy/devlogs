<script lang="ts">
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
    import Card from '$lib/components/ui/card.svelte';
    import Badge from '$lib/components/ui/badge.svelte';

    gsap.registerPlugin(ScrollTrigger);

    interface DevLog {
        id: string;
        title: string;
        date: string;
        content: string;
        category?: string;
        tags?: string[];
    }

    export let devlogs: DevLog[] = [];

    let sectionHeader: HTMLElement;
    let logsContainer: HTMLElement;

    onMount(() => {
        gsap.from(sectionHeader.children, {
            scrollTrigger: {
                trigger: sectionHeader,
                start: 'top 85%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });

        gsap.from('.log-card', {
            scrollTrigger: {
                trigger: logsContainer,
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    });

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
</script>

<section id="devlogs" class="bg-black py-24 relative overflow-hidden">
    <div class="container mx-auto px-4 relative z-10">
        <div bind:this={sectionHeader} class="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <div class="text-yellow-200/80 text-sm font-bold tracking-[0.2em] uppercase">Development Activity</div>
            <h3 class="text-3xl md:text-5xl font-extrabold text-white leading-tight font-['Playfair_Display']">
                Dev Logs
            </h3>
            <p class="text-sm md:text-lg text-white/60 leading-relaxed">
                Real-time development activity logs and system updates.
            </p>
        </div>

        <div bind:this={logsContainer} class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#if devlogs && devlogs.length > 0}
                {#each devlogs as log}
                    <div class="log-card">
                        <Card class="bg-white/5 border-white/10 hover:border-yellow-200/30 transition-all duration-300 h-full flex flex-col">
                            <div class="p-6 space-y-4 flex-grow">
                                <div class="flex justify-between items-start">
                                    <span class="text-yellow-200/60 text-xs font-mono">{formatDate(log.date)}</span>
                                    {#if log.category}
                                        <Badge variant="outline" class="border-yellow-200/20 text-yellow-200 text-[10px] uppercase tracking-wider">
                                            {log.category}
                                        </Badge>
                                    {/if}
                                </div>
                                <h4 class="text-xl font-bold text-white font-['Playfair_Display']">{log.title}</h4>
                                <p class="text-white/60 text-sm leading-relaxed line-clamp-4">
                                    {log.content}
                                </p>
                            </div>
                            {#if log.tags && log.tags.length > 0}
                                <div class="px-6 pb-6 flex flex-wrap gap-2">
                                    {#each log.tags as tag}
                                        <span class="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded">#{tag}</span>
                                    {/each}
                                </div>
                            {/if}
                        </Card>
                    </div>
                {/each}
            {:else}
                <div class="col-span-full text-center py-12">
                    <p class="text-white/40 italic">No log entries at the moment.</p>
                </div>
            {/if}
        </div>
    </div>
</section>

<style>
    :global(.log-card .card) {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(10px);
    }
</style>
