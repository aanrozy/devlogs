<script lang="ts">
    import { Mail, MessageCircle, Phone, MapPin, Send } from 'lucide-svelte';
    import FooterSection from '../components/FooterSection.svelte';
    import Button from '$lib/components/ui/button.svelte';
    import Input from '$lib/components/ui/input.svelte';

    let formData = $state({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    let isSubmitting = $state(false);

    async function handleSubmit(e: Event) {
        e.preventDefault();
        isSubmitting = true;
        // Simulasi pengiriman form
        setTimeout(() => {
            isSubmitting = false;
            formData = { name: '', email: '', subject: '', message: '' };
            alert('Thank you! Your message has been sent.');
        }, 1000);
    }
</script>

<svelte:head>
    <title>Contact - Muzia.online</title>
</svelte:head>

<div class="min-h-screen bg-black text-white pt-32 pb-20">
    <div class="container max-w-6xl">
        <!-- Header -->
        <div class="mb-16">
            <h1 class="text-4xl md:text-5xl font-black mb-4 font-['Playfair_Display']">Contact Us</h1>
            <p class="text-white/60 text-lg">We are ready to help you. Contact our team through the various communication channels available.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <!-- Contact Info Cards -->
            <div class="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
                <div class="w-12 h-12 bg-yellow-200/20 rounded-xl flex items-center justify-center mb-4">
                    <Mail class="text-yellow-200" size={24} />
                </div>
                <h3 class="text-xl font-bold mb-2">Email</h3>
                <p class="text-white/60 mb-4">Send us an email for general inquiries or technical support.</p>
                <a href="mailto:info@muzia.online" class="text-yellow-200 font-semibold hover:text-yellow-100 transition-colors">
                    info@muzia.online
                </a>
            </div>

            <div class="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
                <div class="w-12 h-12 bg-yellow-200/20 rounded-xl flex items-center justify-center mb-4">
                    <MessageCircle class="text-yellow-200" size={24} />
                </div>
                <h3 class="text-xl font-bold mb-2">WhatsApp</h3>
                <p class="text-white/60 mb-4">Chat directly with our team for a faster response.</p>
                <a href="https://wa.me/6281234567890" class="text-yellow-200 font-semibold hover:text-yellow-100 transition-colors">
                    +62 812 3456 7890
                </a>
            </div>

            <div class="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
                <div class="w-12 h-12 bg-yellow-200/20 rounded-xl flex items-center justify-center mb-4">
                    <Phone class="text-yellow-200" size={24} />
                </div>
                <h3 class="text-xl font-bold mb-2">Phone</h3>
                <p class="text-white/60 mb-4">Contact us by phone for direct consultation.</p>
                <a href="tel:+6281234567890" class="text-yellow-200 font-semibold hover:text-yellow-100 transition-colors">
                    +62 812 3456 7890
                </a>
            </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
            <h2 class="text-2xl font-bold mb-8 font-['Playfair_Display']">Send Message</h2>
            <form onsubmit={handleSubmit} class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="name" class="block text-sm font-medium mb-2">Full Name</label>
                        <Input 
                            id="name"
                            type="text" 
                            placeholder="Your Name" 
                            bind:value={formData.name}
                            required
                            class="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-yellow-200/50 transition-colors w-full"
                        />
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium mb-2">Email</label>
                        <Input 
                            id="email"
                            type="email" 
                            placeholder="Your Email" 
                            bind:value={formData.email}
                            required
                            class="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-yellow-200/50 transition-colors w-full"
                        />
                    </div>
                </div>

                <div>
                    <label for="subject" class="block text-sm font-medium mb-2">Subject</label>
                    <Input 
                        id="subject"
                        type="text" 
                        placeholder="Message subject" 
                        bind:value={formData.subject}
                        required
                        class="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-yellow-200/50 transition-colors w-full"
                    />
                </div>

                <div>
                    <label for="message" class="block text-sm font-medium mb-2">Message</label>
                    <textarea 
                        id="message"
                        placeholder="Write your message here..." 
                        bind:value={formData.message}
                        required
                        rows="6"
                        class="bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-yellow-200/50 transition-colors w-full resize-none"
                    ></textarea>
                </div>

                <div class="flex justify-end">
                    <Button 
                        type="submit"
                        disabled={isSubmitting}
                        class="bg-yellow-200 hover:bg-yellow-100 text-black font-bold px-8 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                    >
                        <Send size={18} />
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                </div>
            </form>
        </div>

        <!-- Map Section (Optional) -->
        <div class="mt-16">
            <h2 class="text-2xl font-bold mb-8 font-['Playfair_Display']">Our Location</h2>
            <div class="bg-white/5 border border-white/10 rounded-2xl p-8 flex items-center justify-center h-64">
                <div class="text-center">
                    <MapPin class="text-yellow-200 mx-auto mb-4" size={32} />
                    <p class="text-white/60">Our office is located in Jakarta, Indonesia</p>
                </div>
            </div>
        </div>
        
        <div class="mt-16 pt-8 border-t border-white/10">
            <a href="/" class="text-yellow-200 font-bold hover:text-yellow-100 transition-colors">← Back to Home</a>
        </div>
    </div>
</div>

<FooterSection />
