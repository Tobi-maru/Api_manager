<script lang="ts">
    import { fade, scale } from "svelte/transition";
    import type { Snippet } from "svelte";

    let {
        isOpen = false,
        title = "",
        onClose,
        children,
    }: {
        isOpen?: boolean;
        title?: string;
        onClose: () => void;
        children: Snippet;
    } = $props();
</script>

{#if isOpen}
    <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        transition:fade
    >
        <div
            class="bg-obsidian-bg border border-gray-700 rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
            transition:scale={{ start: 0.95 }}
        >
            <div
                class="flex justify-between items-center p-4 border-b border-gray-800"
            >
                <h2 class="text-xl font-bold text-white">{title}</h2>
                <button
                    onclick={onClose}
                    class="text-gray-400 hover:text-white transition-colors"
                    aria-label="Close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <div class="p-6">
                {@render children()}
            </div>
        </div>
    </div>
{/if}
