<script lang="ts">
    import { Instagram, Twitter, Github, Linkedin, Download } from 'lucide-svelte';
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
    import Button from '$lib/components/ui/button.svelte';


    gsap.registerPlugin(ScrollTrigger);

    let footerRef: HTMLElement;

    onMount(() => {
        gsap.from(footerRef.children, {
            scrollTrigger: {
                trigger: footerRef,
                start: 'top 90%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });
    });
</script>

<footer id="footer" bind:this={footerRef} class="bg-black border-t border-white/10 pt-24 pb-12 overflow-hidden">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <!-- Brand Column -->
            <div class="space-y-6">
                <h2 class="text-2xl font-bold text-white font-['Playfair_Display']">Mu Zia Dev Log</h2>
                <p class="text-white/60 text-sm leading-relaxed">
                    Documenting the web development journey with precision and dedication. Building the digital future one line of code at a time.
                </p>
                <div class="flex gap-4">
                    <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-yellow-200 hover:text-black transition-all duration-300">
                        <Instagram size={18} />
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-yellow-200 hover:text-black transition-all duration-300">
                        <Twitter size={18} />
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-yellow-200 hover:text-black transition-all duration-300">
                        <Github size={18} />
                    </a>
                </div>
            </div>

            <!-- Links Column 1 -->
            <div class="space-y-6">
                <h4 class="text-white font-bold uppercase tracking-widest text-xs">Navigation</h4>
                <ul class="space-y-4">
                    <li><a href="/#hero" class="text-white/60 hover:text-yellow-200 text-sm transition-colors">Home</a></li>
                    <li><a href="/#showcase" class="text-white/60 hover:text-yellow-200 text-sm transition-colors">Showcase</a></li>
                    <li><a href="/#interactive" class="text-white/60 hover:text-yellow-200 text-sm transition-colors">Playground</a></li>
                    <li><a href="/devlog" class="text-white/60 hover:text-yellow-200 text-sm transition-colors">Dev Logs</a></li>
                    <li><a href="/#biography" class="text-white/60 hover:text-yellow-200 text-sm transition-colors">Biography</a></li>
                </ul>
            </div>

            <!-- Links Column 2 (Social Media) -->
            <div class="space-y-6">
                <h4 class="text-white font-bold uppercase tracking-widest text-xs">Social Media</h4>
                <ul class="space-y-4">
                    <li>
                        <a href="#" class="text-white/60 hover:text-yellow-200 text-sm transition-colors flex items-center gap-2">
                            <Instagram size={16} /> Instagram
                        </a>
                    </li>
                    <li>
                        <a href="#" class="text-white/60 hover:text-yellow-200 text-sm transition-colors flex items-center gap-2">
                            <Twitter size={16} /> Twitter
                        </a>
                    </li>
                    <li>
                        <a href="#" class="text-white/60 hover:text-yellow-200 text-sm transition-colors flex items-center gap-2">
                            <Github size={16} /> GitHub
                        </a>
                    </li>
                    <li>
                        <a href="#" class="text-white/60 hover:text-yellow-200 text-sm transition-colors flex items-center gap-2">
                            <Linkedin size={16} /> LinkedIn
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Resume Column -->
            <div class="space-y-6">
                <h4 class="text-white font-bold uppercase tracking-widest text-xs">Resume</h4>
                <p class="text-white/60 text-sm">Download my full resume to learn more about my experience and skills.</p>
                <a href="#" class="block w-full">
                    <Button class="w-full bg-yellow-200 hover:bg-yellow-300 text-black font-bold flex items-center justify-center gap-2">
                        <Download size={16} />
                        Download CV
                    </Button>
                </a>
            </div>
        </div>

        <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p class="text-white/40 text-xs">
                © 2026 Mu Zia Dev Log. All rights reserved.
            </p>
            <div class="flex items-center gap-2 text-white/40 text-xs">
                <span>Built with</span>
                <span class="text-red-500">❤️</span>
                <span>using SvelteKit & Sanity</span>
            </div>
        </div>
    </div>
</footer>
