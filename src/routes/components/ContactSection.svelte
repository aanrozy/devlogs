<script lang="ts">
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
    import { Mail, Phone, MapPin, MessageSquare } from 'lucide-svelte';
    import Button from '$lib/components/ui/button.svelte';

    gsap.registerPlugin(ScrollTrigger);

    let sectionHeader: HTMLElement;
    let contactCards: HTMLElement;

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

        gsap.from('.contact-card', {
            scrollTrigger: {
                trigger: contactCards,
                start: 'top 80%',
            },
            x: -30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
    });

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'info@muzia.online',
            link: 'mailto:info@muzia.online'
        },
        {
            icon: MessageSquare,
            label: 'WhatsApp',
            value: '+62 812 3456 7890',
            link: 'https://wa.me/6281234567890'
        },
        {
            icon: MapPin,
            label: 'Location',
            value: 'Jakarta, Indonesia',
            link: '#'
        }
    ];
</script>

<section id="contact" class="bg-black py-24 relative overflow-hidden">
    <div class="container mx-auto px-4 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div bind:this={sectionHeader} class="space-y-8">
                <div class="space-y-4">
                    <div class="text-yellow-200/80 text-sm font-bold tracking-[0.2em] uppercase">Get In Touch</div>
                    <h3 class="text-4xl md:text-6xl font-extrabold text-white leading-tight font-['Playfair_Display']">
                        Contact Us
                    </h3>
                    <p class="text-lg text-white/60 leading-relaxed max-w-md">
                        Have questions or want to start a project? We are ready to help bring your digital vision to life.
                    </p>
                </div>

                <div bind:this={contactCards} class="space-y-6">
                    {#each contactInfo as item}
                        <a href={item.link} class="contact-card flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-200/30 transition-all duration-300 group">
                            <div class="w-12 h-12 rounded-full bg-yellow-200/10 flex items-center justify-center text-yellow-200 group-hover:scale-110 transition-transform duration-300">
                                <svelte:component this={item.icon} size={24} />
                            </div>
                            <div>
                                <div class="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{item.label}</div>
                                <div class="text-white font-medium">{item.value}</div>
                            </div>
                        </a>
                    {/each}
                </div>
            </div>

            <div class="relative">
                <div class="absolute -inset-4 bg-yellow-200/5 blur-3xl rounded-full"></div>
                <div class="relative bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm">
                    <form class="space-y-6">
                        <div class="space-y-2">
                            <label for="name" class="text-white/60 text-sm font-medium">Full Name</label>
                            <input type="text" id="name" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-200/50 outline-none transition-colors" placeholder="Enter your name" />
                        </div>
                        <div class="space-y-2">
                            <label for="email" class="text-white/60 text-sm font-medium">Email</label>
                            <input type="email" id="email" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-200/50 outline-none transition-colors" placeholder="email@example.com" />
                        </div>
                        <div class="space-y-2">
                            <label for="message" class="text-white/60 text-sm font-medium">Message</label>
                            <textarea id="message" rows="4" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-200/50 outline-none transition-colors resize-none" placeholder="How can we help you?"></textarea>
                        </div>
                        <Button class="w-full bg-yellow-200 hover:bg-yellow-300 text-black font-bold py-4 rounded-xl transition-all duration-300">
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
