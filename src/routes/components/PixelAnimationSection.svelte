<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
    import ParticleBackground from './ParticleBackground.svelte';
    import PongGame from './PongGame.svelte';
    import SnakeGame from './SnakeGame.svelte';
    import TetrisGame from './TetrisGame.svelte';
    import { Terminal, Play, RotateCcw } from 'lucide-svelte';

    gsap.registerPlugin(ScrollTrigger);

    let sectionRef: HTMLElement;
    let activeGame: 'pong' | 'snake' | 'tetris' | null = null;
    let isMobile = false;
    let mediaQuery: MediaQueryList;

    function handleMediaChange(e: MediaQueryListEvent | MediaQueryList) {
        const wasMobile = isMobile;
        isMobile = e.matches;
        
        // Switch game when viewport changes between mobile/desktop
        if (wasMobile !== isMobile) {
            if (isMobile) {
                activeGame = 'tetris';
            } else {
                activeGame = 'pong';
            }
        }
    }

    onMount(() => {
        mediaQuery = window.matchMedia('(max-width: 767px)');
        isMobile = mediaQuery.matches;
        
        // Set default game based on viewport
        activeGame = isMobile ? 'tetris' : 'pong';

        mediaQuery.addEventListener('change', handleMediaChange);

        gsap.from(sectionRef, {
            scrollTrigger: {
                trigger: sectionRef,
                start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });

    onDestroy(() => {
        if (mediaQuery) {
            mediaQuery.removeEventListener('change', handleMediaChange);
        }
    });

    function setGame(game: 'pong' | 'snake' | 'tetris') {
        activeGame = null;
        setTimeout(() => {
            activeGame = game;
        }, 50);
    }
</script>

<section id="interactive" bind:this={sectionRef} class="relative min-h-screen bg-black py-24 overflow-hidden flex items-center justify-center">
    <ParticleBackground />
    
    <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-5xl mx-auto">
            <div class="text-center mb-12 space-y-4">
                <div class="text-yellow-200/80 text-sm font-bold tracking-[0.2em] uppercase">Interactive Experience</div>
                <h3 class="text-3xl md:text-5xl font-extrabold text-white leading-tight font-['Playfair_Display']">
                    Pixel Playground
                </h3>
                <p class="text-sm md:text-lg text-white/60 leading-relaxed">
                    Take a short break with our classic retro games.
                </p>
            </div>

            <div class="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <!-- Terminal Header -->
                <div class="bg-white/5 border-b border-white/10 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
                    <div class="flex items-center gap-2 md:gap-4">
                        <div class="flex gap-1.5 md:gap-2">
                            <div class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/50"></div>
                            <div class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/50"></div>
                            <div class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <div class="flex items-center gap-1.5 md:gap-2 text-white/40 text-[10px] md:text-xs font-mono">
                            <Terminal size={isMobile ? 12 : 14} />
                            <span class="hidden md:inline">dev-playground — 80x24</span>
                            <span class="md:hidden">playground</span>
                        </div>
                    </div>
                    <div class="flex gap-2 md:gap-4">
                        <!-- Desktop only: Pong & Snake buttons -->
                        {#if !isMobile}
                            <button 
                                on:click={() => setGame('pong')}
                                class="text-xs font-mono px-3 py-1 rounded border transition-colors {activeGame === 'pong' ? 'bg-yellow-200 text-black border-yellow-200' : 'text-white/40 border-white/10 hover:text-white hover:border-white/30'}"
                            >
                                PONG
                            </button>
                            <button 
                                on:click={() => setGame('snake')}
                                class="text-xs font-mono px-3 py-1 rounded border transition-colors {activeGame === 'snake' ? 'bg-yellow-200 text-black border-yellow-200' : 'text-white/40 border-white/10 hover:text-white hover:border-white/30'}"
                            >
                                SNAKE
                            </button>
                        {/if}
                        <!-- Mobile only: Tetris button -->
                        {#if isMobile}
                            <button 
                                on:click={() => setGame('tetris')}
                                class="text-[10px] font-mono px-2.5 py-1 rounded border transition-colors {activeGame === 'tetris' ? 'bg-yellow-200 text-black border-yellow-200' : 'text-white/40 border-white/10 hover:text-white hover:border-white/30'}"
                            >
                                TETRIS
                            </button>
                        {/if}
                    </div>
                </div>

                <!-- Game Area: vertical on mobile, landscape on desktop -->
                <div class="relative bg-black flex items-center justify-center overflow-hidden game-area" class:game-area--mobile={isMobile}>
                    {#if activeGame === 'pong' && !isMobile}
                        <PongGame />
                    {:else if activeGame === 'snake' && !isMobile}
                        <SnakeGame />
                    {:else if activeGame === 'tetris' && isMobile}
                        <TetrisGame />
                    {/if}

                    <!-- Scanline Effect -->
                    <div class="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%]"></div>
                </div>

                <!-- Footer Info -->
                <div class="bg-white/5 border-t border-white/10 px-4 md:px-6 py-3 md:py-4">
                    <div class="flex flex-wrap items-center justify-between gap-2 md:gap-4">
                        <div class="flex items-center gap-2 md:gap-4 text-white/40 text-[9px] md:text-[10px] font-mono uppercase tracking-widest">
                            {#if isMobile}
                                <span class="flex items-center gap-1"><Play size={10} /> Tap Controls</span>
                                <span class="flex items-center gap-1"><RotateCcw size={10} /> Use On-Screen Buttons</span>
                            {:else}
                                <span class="flex items-center gap-1"><Play size={10} /> Use WASD Keys to Play</span>
                                <span class="flex items-center gap-1"><RotateCcw size={10} /> Press R to Reset</span>
                            {/if}
                        </div>
                        <div class="text-yellow-200/40 text-[9px] md:text-[10px] font-mono">
                            SYSTEM STATUS: OPTIMAL
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .game-area {
        aspect-ratio: 21 / 9;
    }

    .game-area--mobile {
        aspect-ratio: 3 / 4;
    }
</style>
