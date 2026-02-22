<script lang="ts">
    import { fade } from "svelte/transition";

    export let keyData: {
        id: string;
        service: string;
        projectName: string;
        modelName?: string | null;
        currentUsage: number;
        usageLimit?: number | null;
        key: string;
        createdAt: string;
    };
    export let onDelete: (id: string) => void;

    let copied = false;

    function copyToClipboard() {
        navigator.clipboard.writeText(keyData.key);
        copied = true;
        setTimeout(() => (copied = false), 2000);
    }
</script>

<div
    class="bg-obsidian-bg border border-gray-700 rounded-lg p-4 shadow-lg hover:border-obsidian-accent transition-colors duration-300 relative group"
>
    <div class="flex justify-between items-start mb-3">
        <div>
            <h3 class="text-xl font-bold text-obsidian-accent">{keyData.service}</h3>
            <p class="text-xs text-gray-400">{keyData.projectName}</p>
            {#if keyData.modelName}
                <p class="text-xs text-gray-500 mt-1">Model: {keyData.modelName}</p>
            {/if}
        </div>
        <button
            class="text-gray-500 hover:text-red-500 transition-colors"
            onclick={() => onDelete(keyData.id)}
            aria-label="Delete key"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>
    </div>

    <div class="bg-black/30 p-2 rounded border border-gray-800 mb-3">
        <p class="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Vault ID</p>
        <code class="text-xs text-purple-400 font-mono break-all">{keyData.id}</code>
    </div>

    <div
        class="bg-black/30 p-2 rounded font-mono text-sm text-gray-300 break-all flex justify-between items-center group-hover:bg-black/50 transition-colors"
    >
        <span>{keyData.key}</span>
        <button
            class="ml-2 text-gray-400 hover:text-white transition-colors focus:outline-none"
            onclick={copyToClipboard}
            title="Copy to clipboard"
        >
            {#if copied}
                <span class="text-green-400" in:fade>Copied!</span>
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path
                        d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
                    />
                </svg>
            {/if}
        </button>
    </div>

    <div class="mt-2 text-xs text-gray-500">
        Created: {new Date(keyData.createdAt).toLocaleDateString()}
    </div>
</div>
