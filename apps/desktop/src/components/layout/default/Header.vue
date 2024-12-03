<script setup>
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useColorMode } from '@vueuse/core'
import { Icon } from '@iconify/vue'
const mode = useColorMode()
</script>

<template>
    <header class="bg-background p-3 space-y-6 border-b border-secondary">
        <div class="flex items-center justify-between w-full">
            <div class="flex items-center gap-2.5 divide-x divide-border">
                <svg width="32" height="32" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path  class="fill-foreground"
                            d="M256 16v72H88l48 48L16 256h72v168l48-48 120 120v-72h168l-48-48 120-120h-72V88l-48 48L256 16zm0 120c66.274 0 120 53.726 120 120s-53.726 120-120 120-120-53.726-120-120 53.726-120 120-120zm1.406 72.03A48 48 0 0 0 208 256a48 48 0 0 0 96 0 48 48 0 0 0-46.594-47.97z" />
                    </svg>
                <div class="pl-2.5">
                    12212
                </div>
            </div>
            <div class="flex items-center gap-3 divide-x divide-border">
                <div class="flex items-center gap-2.5">
                    <Button variant="outline" class="text-sm" as-child>
                        <RouterLink to="/">Help Center</RouterLink>
                    </Button>
                    <Button variant="outline" size="icon" @click="mode = (mode === 'light' ? 'dark' : 'light')">
                        <Icon icon="radix-icons:moon" class="w-4 h-4" v-if="mode === 'light'" />
                        <Icon icon="radix-icons:sun" v-else />
                    </Button>
                </div>
                <div class="pl-3 max-h-10">
                    <Avatar class="max-w-10 max-h-10">
                        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
        <div></div>
    </header>
</template>