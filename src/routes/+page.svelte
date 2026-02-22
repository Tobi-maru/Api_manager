<script lang="ts">
    import KeyCard from "$lib/components/KeyCard.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import { fade, fly } from "svelte/transition";

    type ApiKey = {
        id: string;
        service: string;
        projectName: string;
        modelName?: string;
        currentUsage: number;
        usageLimit?: number;
        key: string;
        createdAt: string;
    };

    let keys = $state<ApiKey[]>([]);
    let showModal = $state(false);
    let loading = $state(true);
    let error = $state<string | null>(null);

    // Form state
    let newKey = $state({
        service: "",
        projectName: "",
        modelName: "",
        key: "",
        usageLimit: "",
    });

    async function loadKeys() {
        try {
            loading = true;
            const res = await fetch("/api/keys");
            if (!res.ok) throw new Error("Failed to load keys");
            keys = await res.json();
        } catch (e) {
            error = e instanceof Error ? e.message : "An error occurred";
        } finally {
            loading = false;
        }
    }

    async function addKey() {
        try {
            const res = await fetch("/api/keys", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...newKey,
                    usageLimit: newKey.usageLimit
                        ? parseFloat(newKey.usageLimit)
                        : null,
                }),
            });
            if (!res.ok) throw new Error("Failed to add key");
            const addedKey = await res.json();
            keys = [...keys, addedKey];
            showModal = false;
            newKey = {
                service: "",
                projectName: "",
                modelName: "",
                key: "",
                usageLimit: "",
            };
        } catch (e) {
            error = e instanceof Error ? e.message : "Failed to add key";
        }
    }

    async function deleteKey(id: string) {
        try {
            const res = await fetch(`/api/keys/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete key");
            keys = keys.filter((k) => k.id !== id);
        } catch (e) {
            error = e instanceof Error ? e.message : "Failed to delete key";
        }
    }

    $effect(() => {
        loadKeys();
    });
</script>

<svelte:head>
    <title>API Vault</title>
    <meta
        name="description"
        content="Securely manage and store your API keys"
    />
</svelte:head>

<div class="min-h-screen bg-obsidian-dark p-8">
    <header class="max-w-6xl mx-auto mb-12">
        <div class="flex justify-between items-center">
            <div>
                <h1
                    class="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
                >
                    API Vault
                </h1>
                <p class="text-gray-400">
                    Securely manage and store your API keys
                </p>
            </div>
            <button
                class="bg-obsidian-accent hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/20 flex items-center gap-2"
                onclick={() => (showModal = true)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                    />
                </svg>
                Add New Key
            </button>
        </div>
    </header>

    <main class="max-w-6xl mx-auto">
        {#if error}
            <div
                class="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6"
                transition:fade
            >
                {error}
                <button class="ml-4 underline" onclick={() => (error = null)}
                    >Dismiss</button
                >
            </div>
        {/if}

        {#if loading}
            <div class="flex justify-center items-center py-20">
                <div
                    class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-obsidian-accent"
                ></div>
            </div>
        {:else if keys.length === 0}
            <div class="text-center py-20 text-gray-500" in:fade>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-16 w-16 mx-auto mb-4 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                </svg>
                <p class="text-lg">No API keys stored yet</p>
                <p class="text-sm mt-2">Click "Add New Key" to get started</p>
            </div>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each keys as keyData (keyData.id)}
                    <div in:fly={{ y: 20, duration: 300 }}>
                        <KeyCard {keyData} onDelete={deleteKey} />
                    </div>
                {/each}
            </div>
        {/if}
    </main>
</div>

<Modal
    isOpen={showModal}
    title="Add New API Key"
    onClose={() => (showModal = false)}
>
    <form
        onsubmit={(e) => {
            e.preventDefault();
            addKey();
        }}
        class="space-y-4"
    >
        <div>
            <label
                for="service"
                class="block text-sm font-medium text-gray-300 mb-1"
                >Service Name</label
            >
            <input
                type="text"
                id="service"
                bind:value={newKey.service}
                required
                class="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-obsidian-accent focus:outline-none transition-colors"
                placeholder="e.g., OpenAI, Anthropic"
            />
        </div>
        <div>
            <label
                for="projectName"
                class="block text-sm font-medium text-gray-300 mb-1"
                >Project Name</label
            >
            <input
                type="text"
                id="projectName"
                bind:value={newKey.projectName}
                required
                class="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-obsidian-accent focus:outline-none transition-colors"
                placeholder="e.g., My Chat App"
            />
        </div>
        <div>
            <label
                for="modelName"
                class="block text-sm font-medium text-gray-300 mb-1"
                >Model Name (optional)</label
            >
            <input
                type="text"
                id="modelName"
                bind:value={newKey.modelName}
                class="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-obsidian-accent focus:outline-none transition-colors"
                placeholder="e.g., gpt-4, claude-3"
            />
        </div>
        <div>
            <label
                for="key"
                class="block text-sm font-medium text-gray-300 mb-1"
                >API Key</label
            >
            <input
                type="password"
                id="key"
                bind:value={newKey.key}
                required
                class="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-obsidian-accent focus:outline-none transition-colors font-mono"
                placeholder="sk-..."
            />
        </div>
        <div>
            <label
                for="usageLimit"
                class="block text-sm font-medium text-gray-300 mb-1"
                >Usage Limit $ (optional)</label
            >
            <input
                type="number"
                id="usageLimit"
                bind:value={newKey.usageLimit}
                step="0.01"
                min="0"
                class="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-obsidian-accent focus:outline-none transition-colors"
                placeholder="e.g., 100.00"
            />
        </div>
        <button
            type="submit"
            class="w-full bg-obsidian-accent hover:bg-purple-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 mt-4"
        >
            Save Key
        </button>
    </form>
</Modal>
