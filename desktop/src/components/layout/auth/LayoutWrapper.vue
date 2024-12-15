<script setup>
import SideBar from './SideBar.vue';
import { ScrollArea } from '@/components/ui/scroll-area'
</script>

<template>
    <main class="w-full  h-screen overflow-hidden flex items-stretch gap-2.5 p-2.5">
        <SideBar />
        <div class="w-full bg-secondary h-full rounded-xl p-2.5">
            <ScrollArea class="h-full">
                <slot />
            </ScrollArea>
        </div>
    </main>
</template>