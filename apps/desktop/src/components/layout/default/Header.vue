<script setup>
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useColorMode } from '@vueuse/core'
const mode = useColorMode()
</script>

<template>
    <header class="bg-background p-3 space-y-6 border-b border-secondary">
        <div class="flex items-center justify-between w-full">
            <div></div>
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2.5">
                    <Button variant="outline" class="text-sm" as-child>
                        <RouterLink to="/">Help Center</RouterLink>
                    </Button>
                    <Avatar>
                        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <Button variant="outline" size="icon" @click="mode = (mode === 'light' ? 'dark' : 'light')">
                    <Icon icon="radix-icons:moon" v-if="mode === 'light'" />
                    <Icon icon="radix-icons:sun" v-else />
                </Button>
            </div>
        </div>
        <div></div>
    </header>
</template>