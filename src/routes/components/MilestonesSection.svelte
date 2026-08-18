<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

    gsap.registerPlugin(ScrollTrigger);

    interface Milestone {
        id: string;
        title: string;
        date: string;
        description: string;
        status: string;
    }

    export let milestones: Milestone[] = [];

    let sectionHeader: HTMLElement;
    let timelineContainer: HTMLElement;
    let scrollContent: HTMLElement;
    let timelineProgress: HTMLElement;

    onMount(() => {
        gsap.from(sectionHeader.children, {
            scrollTrigger: {
                trigger: sectionHeader,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
        });

        // Timeline items entrance animation
        const items = gsap.utils.toArray(".milestone-item");
        items.forEach((item: any, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    scroller: timelineContainer,
                    start: "top 95%",
                },
                y: 50,
                x: i % 2 === 0 ? -50 : 50, // Slide from alternating sides
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });
        });

        // Timeline progress line animation
        if (timelineProgress && scrollContent) {
            gsap.to(timelineProgress, {
                scrollTrigger: {
                    trigger: scrollContent,
                    scroller: timelineContainer,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                },
                height: "100%",
                ease: "none",
            });
        }
    });

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    function getStatusBadgeClass(status: string) {
        switch (status) {
            case "completed":
                return "bg-green-500/10 border-green-500/30 text-green-400";
            case "in-progress":
                return "bg-yellow-500/10 border-yellow-500/30 text-yellow-400";
            case "planned":
                return "bg-yellow-200/10 border-yellow-200/30 text-yellow-200";
            default:
                return "bg-white/5 border-white/10 text-white/60";
        }
    }

    function sortedMilestones() {
        return [...milestones].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
    }
</script>

<section id="milestones" class="bg-black py-24 relative overflow-hidden">
    <div class="container mx-auto px-4 relative z-10">
        <div
            bind:this={sectionHeader}
            class="max-w-3xl mx-auto text-center mb-20 space-y-4"
        >
            <div
                class="text-yellow-200/80 text-sm font-bold tracking-[0.2em] uppercase"
            >
                Project Journey
            </div>
            <h3
                class="text-3xl md:text-5xl font-extrabold text-white leading-tight font-['Playfair_Display']"
            >
                Roadmap
            </h3>
            <p class="text-sm md:text-lg text-white/60 leading-relaxed">
                Project development journey with key milestones and future
                targets.
            </p>
        </div>

        <!-- Timeline Container -->
        <div class="relative max-w-5xl mx-auto mt-12">
            <!-- Fade masks for scroll area -->
            <div class="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black to-transparent z-30 pointer-events-none"></div>
            <div class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black to-transparent z-30 pointer-events-none"></div>

            <div bind:this={timelineContainer} class="timeline-scroller max-h-[600px] overflow-y-auto overflow-x-hidden px-4 py-8">
                <div bind:this={scrollContent} class="space-y-8 relative">
                    <!-- Vertical timeline line -->
                    <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 transform -translate-x-1/2">
                        <div bind:this={timelineProgress} class="w-full bg-gradient-to-b from-yellow-200/50 via-yellow-200 to-yellow-200/50" style="height: 0%"></div>
                    </div>
                {#if sortedMilestones() && sortedMilestones().length > 0}
                    {#each sortedMilestones() as milestone, index}
                        {@const isLeft = index % 2 === 0}
                        <div class="milestone-item relative group">
                            <!-- Timeline Dot -->
                            <div class="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 z-20">
                                <div class="w-full h-full bg-black border-2 border-white/20 rounded-full group-hover:border-yellow-200 group-hover:bg-yellow-200/20 group-hover:scale-125 transition-all duration-500 shadow-[0_0_0_0_rgba(254,240,138,0)] group-hover:shadow-[0_0_20px_rgba(254,240,138,0.5)]"></div>
                            </div>

                            <div
                                class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                            >
                                <!-- Left column -->
                                <div
                                    class={`${isLeft ? "md:col-span-1" : "md:col-span-1 md:order-2"}`}
                                >
                                    <div
                                        class="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-yellow-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(254,240,138,0.2)] relative overflow-hidden"
                                    >
                                        <!-- Glow Background on Hover -->
                                        <div class="absolute -inset-2 bg-gradient-to-r from-yellow-200/0 via-yellow-200/5 to-yellow-200/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none"></div>

                                        <div class="space-y-4 relative z-10">
                                            <div
                                                class="flex items-start justify-between gap-4"
                                            >
                                                <h4
                                                    class="text-xl md:text-2xl font-bold text-white font-['Playfair_Display'] group-hover:text-yellow-200 transition-colors duration-300"
                                                >
                                                    {milestone.title}
                                                </h4>
                                                <span
                                                    class={`text-[10px] font-bold px-3 py-1.5 rounded-full border uppercase tracking-wider whitespace-nowrap ${getStatusBadgeClass(milestone.status)}`}
                                                >
                                                    {milestone.status.replace(
                                                        "-",
                                                        " ",
                                                    )}
                                                </span>
                                            </div>
                                            <p
                                                class="text-yellow-200/60 text-xs font-mono tracking-widest uppercase"
                                            >
                                                {formatDate(milestone.date)}
                                            </p>
                                            <p
                                                class="text-white/70 text-sm md:text-base leading-relaxed"
                                            >
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Right column (empty for spacing) -->
                                <div
                                    class={`${isLeft ? "md:col-span-1 md:order-2" : "md:col-span-1"} hidden md:block`}
                                ></div>
                            </div>
                        </div>
                    {/each}
                {:else}
                    <div class="text-center py-12">
                        <p class="text-white/40 italic">
                            No milestones recorded yet.
                        </p>
                    </div>
                {/if}
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    /* Custom Scrollbar for Timeline */
    .timeline-scroller::-webkit-scrollbar {
        width: 6px;
    }
    .timeline-scroller::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.02);
        border-radius: 10px;
    }
    .timeline-scroller::-webkit-scrollbar-thumb {
        background: rgba(254, 240, 138, 0.3);
        border-radius: 10px;
    }
    .timeline-scroller::-webkit-scrollbar-thumb:hover {
        background: rgba(254, 240, 138, 0.6);
    }

    :global(.milestone-item) {
        position: relative;
    }

    @media (max-width: 768px) {
        :global(.milestone-item) {
            padding-left: 2.5rem;
        }

        :global(.milestone-item::before) {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background-color: rgba(255, 255, 255, 0.1);
        }

        :global(.milestone-item::after) {
            content: "";
            position: absolute;
            left: -6px;
            top: 50%;
            transform: translateY(-50%);
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: #000;
            border: 2px solid rgba(255, 255, 255, 0.2);
            transition: all 0.5s ease;
        }

        :global(.milestone-item:hover::after) {
            border-color: rgba(254, 240, 138, 1);
            background-color: rgba(254, 240, 138, 0.2);
            transform: translateY(-50%) scale(1.2);
            box-shadow: 0 0 10px rgba(254, 240, 138, 0.5);
        }
    }
</style>
