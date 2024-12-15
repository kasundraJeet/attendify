<script setup>
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/vue'
import { ref } from 'vue';

const socialLink = ref([
    {
        link: '/',
        icon: 'ri:instagram-line',
        name: '@instagram'
    },
    {
        link: '/',
        icon: 'ri:github-line',
        name: '@github'
    },
    {
        link: '/',
        icon: 'ri:facebook-line',
        name: '@facebook'
    }
])
</script>

<template>
    <aside class="w-full bg-secondary h-full rounded-xl max-w-64 p-2.5">
        <div class="w-full h-full flex flex-col justify-between">
            <div class="space-y-1">
                <Button variant="link" class="px-0 h-auto w-full justify-start" as-Child>
                    <RouterLink to="/">
                        <Icon icon="ep:back" />
                        Back to demo
                    </RouterLink>
                </Button>
                <svg width="32" height="32" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill-foreground"
                        d="M256 16v72H88l48 48L16 256h72v168l48-48 120 120v-72h168l-48-48 120-120h-72V88l-48 48L256 16zm0 120c66.274 0 120 53.726 120 120s-53.726 120-120 120-120-53.726-120-120 53.726-120 120-120zm1.406 72.03A48 48 0 0 0 208 256a48 48 0 0 0 96 0 48 48 0 0 0-46.594-47.97z" />
                </svg>
            </div>
            <ul class="space-y-1">
                <li v-for="(item, i) in socialLink" :key="i">
                    <Button variant="link" class="px-0 h-auto py-0.5 w-full justify-start text-primary" as-Child>
                        <RouterLink :to="item.link">
                            <Icon :icon="item.icon" />
                            {{ item.name }}
                        </RouterLink>
                    </Button>
                </li>
            </ul>
        </div>
    </aside>
</template>