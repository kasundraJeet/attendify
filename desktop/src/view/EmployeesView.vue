<script setup>
import LayoutWrapper from '@/components/layout/default/LayoutWrapper.vue';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/vue';
import EmployeesCard from '@/components/custom/EmployeeCard.vue';
import EmployeesSheet from '@/components/custom/EmployeesSheet.vue';
import { ref } from 'vue';

const sheet = ref(false)
</script>

<template>
    <LayoutWrapper>
        <div class="py-8 border-b border-border bg-background">
            <div class="flex items-center justify-between container">
                <div class="space-y-1.5">
                    <h1 class="font-semibold text-2xl">Employee Management</h1>
                    <h4 class="text-sm text-muted-foreground">Manage your employee records and details efficiently</h4>
                </div>
                <div class="space-x-2">
                    <Button variant="outline">
                        <Icon icon="solar:import-broken" />
                        Import Employee Data
                    </Button>
                    <Button variant="default" @click="sheet = !sheet">
                        <Icon icon="line-md:plus" />
                        Add Employee
                    </Button>
                </div>
            </div>
        </div>
        <div class="py-4 container space-y-6">
            <div class="flex items-stretch gap-2.5 justify-end">
                <div class="relative w-full max-w-64 items-center">
                    <Input id="search" type="text" placeholder="Search..." class="pl-8" />
                    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                        <Icon icon="icon-park-outline:search" class="size-4 text-muted-foreground" />
                    </span>
                </div>
                <Button variant="outline" class="h-auto ">
                    <Icon icon="uil:filter" class="!size-4 text-muted-foreground" />
                    Filter
                </Button>
            </div>
            <ul class="grid grid-cols-3 gap-5">
                <EmployeesCard />
            </ul>
        </div>
        <EmployeesSheet :open="sheet" />
    </LayoutWrapper>
</template>
