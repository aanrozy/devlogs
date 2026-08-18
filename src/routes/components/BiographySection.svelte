<script lang="ts">
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
    import { User, Award, Code, Coffee } from 'lucide-svelte';

    gsap.registerPlugin(ScrollTrigger);

    let sectionHeader: HTMLElement;
    let bioContent: HTMLElement;

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

        gsap.from('.bio-item', {
            scrollTrigger: {
                trigger: bioContent,
                start: 'top 80%',
            },
            x: -30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
    });

    const stats = [
        { icon: Code, label: 'Projects', value: '50+' },
        { icon: Award, label: 'Experience', value: '5 Years' },
        { icon: Coffee, label: 'Coffee', value: '∞' }
    ];
</script>

<section id="biography" class="bg-black py-24 relative overflow-hidden">
    <div class="container mx-auto px-4 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div bind:this={sectionHeader} class="space-y-8">
                <div class="space-y-4">
                    <div class="text-yellow-200/80 text-sm font-bold tracking-[0.2em] uppercase">About Me</div>
                    <h3 class="text-4xl md:text-6xl font-extrabold text-white leading-tight font-['Playfair_Display']">
                        Biography
                    </h3>
                    <p class="text-lg text-white/60 leading-relaxed max-w-md">
                        I am a web developer dedicated to creating innovative and efficient digital solutions. With a focus on user experience and high performance.
                    </p>
                </div>

                <div bind:this={bioContent} class="grid grid-cols-3 gap-4">
                    {#each stats as stat}
                        <div class="bio-item p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                            <div class="flex justify-center text-yellow-200 mb-2">
                                <svelte:component this={stat.icon} size={24} />
                            </div>
                            <div class="text-white font-bold text-xl">{stat.value}</div>
                            <div class="text-white/40 text-xs uppercase tracking-widest">{stat.label}</div>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="relative">
                <div class="absolute -inset-4 bg-yellow-200/5 blur-3xl rounded-full"></div>
                <div class="relative bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm space-y-6">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-20 h-20 rounded-full bg-yellow-200/20 flex items-center justify-center text-yellow-200">
                            <User size={40} />
                        </div>
                        <div>
                            <h4 class="text-2xl font-bold text-white">Mu Zia Dev</h4>
                            <p class="text-yellow-200/60 font-mono text-sm">Fullstack Developer</p>
                        </div>
                    </div>
                    <p class="text-white/70 leading-relaxed">
                        My journey in the tech world began with a deep curiosity about how the internet works. Now, I help businesses and individuals build their digital presence through modern technologies like SvelteKit, TypeScript, and Tailwind CSS.
                    </p>
                    <p class="text-white/70 leading-relaxed">
                        I believe that every line of code should have a purpose and provide real value to its users.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
