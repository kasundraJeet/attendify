<script setup lang="ts">
import Button from '../ui/button/Button.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@iconify/vue';
</script>

<template>
    <li class="w-full border border-border bg-background rounded-lg p-2.5">
        <div class="flex items-center justify-between w-full gap-2">
            <div class="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div class="-space-y-0.5">
                    <h4 class="text-base font-medium">Jeet Kasundra</h4>
                    <p class="text-muted-foreground text-sm hover:underline">jeet@gmail.com</p>
                </div>
            </div>
            <div class="space-x-2 flex items-center h-9">
                <Button variant="outline" class="text-destructive">
                    <span class="relative flex h-2 w-2">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                    </span>
                    In Break
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="outline" size="icon">
                            <Icon icon="solar:menu-dots-outline" class="!w-5 !h-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-52" align="end">
                        <DropdownMenuItem>
                            <Icon icon="solar:pen-line-duotone" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Icon icon="solar:bookmark-square-minimalistic-linear" />
                            View Attendance
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="text-destructive">
                            <Icon icon="solar:trash-bin-minimalistic-2-linear" />
                            Remove
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </li>
</template>