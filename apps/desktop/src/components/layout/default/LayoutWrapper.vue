<script setup>
import Header from './Header.vue';
import { ScrollArea } from '@/components/ui/scroll-area'
</script>

<template>
    <div class="w-full flex flex-col h-dvh overflow-hidden">
        <Header />
        <ScrollArea class="h-full bg-secondary" as="main">
                <slot />
        </ScrollArea>
    </div>
</template>