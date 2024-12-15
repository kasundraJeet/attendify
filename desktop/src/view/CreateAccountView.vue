<script setup>
import { onMounted, ref } from 'vue'
import LayoutWrapper from '@/components/layout/auth/LayoutWrapper.vue';
import { Separator } from '@/components/ui/separator'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { Icon } from '@iconify/vue';
import { toast } from 'vue-sonner';
import axios from 'axios';
import { ApiWrapper } from '@/utils/apiWrapper';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useRouter } from 'vue-router';


const isLoading = ref(false)
const router = useRouter()
const countrieList = ref([])

const formSchema = toTypedSchema(z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    fname: z.string().min(1, { message: "First name is required" }),
    lname: z.string().min(1, { message: "Last name is required" })
}));


const { isFieldDirty, handleSubmit } = useForm({
    validationSchema: formSchema,
})

onMounted(() => {
    fetchCountries()
})

const fetchCountries = async () => {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,flag");
        countrieList.value = response.data
    } catch (error) {
        console.error("Error fetching country data:", error);
    }
}


const onSubmit = handleSubmit(async (values) => {
    isLoading.value = true
    const form_data = new FormData();
    form_data.append("email", values.email);
    form_data.append("password", values.password);

    try {
        const response = await ApiWrapper("auth/sign-in", form_data);

        if (response.success == 1) {
            router.push({ name: "home" })
            isLoading.value = false
            toast.success(response.message)
        }
        else {
            isLoading.value = false
        }

    } catch (e) {
        isLoading.value = false
        console.error(e);
    }
})
</script>

<template>
    <LayoutWrapper>
        <div class="py-44">
            <div class="mx-auto flex w-full flex-col justify-center px-2 space-y-6 sm:max-w-lg">
                <div class="flex flex-col space-y-2 text-center">
                    <h1 class="text-2xl font-semibold tracking-tight">
                        Create an account
                    </h1>
                    <p class="text-sm text-muted-foreground">
                        Enter your email below to create your account
                    </p>
                </div>
                <form @submit.prevent="onSubmit">
                    <div class="grid gap-8">
                        <div class="w-full space-y-4">
                            <FormField v-slot="{ componentField }" name="fname" class="grid gap-1"
                                :validate-on-blur="!isFieldDirty">
                                <FormItem>
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <div class="grid gap-1">
                                            <Input placeholder="First Name" type="text" :disabled="isLoading"
                                                v-bind="componentField" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                            <FormField v-slot="{ componentField }" name="email" class="grid gap-1"
                                :validate-on-blur="!isFieldDirty">
                                <FormItem>
                                    <FormLabel> Email</FormLabel>
                                    <FormControl>
                                        <div class="grid gap-1">
                                            <Input placeholder="name@example.com" type="email" :disabled="isLoading"
                                                v-bind="componentField" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                            <div class="grid grid-cols-2 gap-4">
                                <FormField v-slot="{ componentField }" name="teamSize">
                                    <FormItem>
                                        <FormLabel>Team Size</FormLabel>
                                        <Select v-bind="componentField">
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a team size" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="1_5">1 - 5 Member</SelectItem>
                                                    <SelectItem value="5_20">5 - 10 Members</SelectItem>
                                                    <SelectItem value="10_20">10 - 20 Members</SelectItem>
                                                    <SelectItem value="20_50">20 - 50 Members</SelectItem>
                                                    <SelectItem value="50+">50+ Members</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                </FormField>
                                <FormField v-slot="{ componentField }" name="country">
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <Select v-bind="componentField">
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a Country" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent class="max-w-64">
                                                <SelectGroup>
                                                    <SelectItem class="line-clamp-1 text-nowrap"
                                                        :value="item.name.common" v-for="item in countrieList"
                                                        :key="item.flag">{{ item.flag }} {{ item.name.common }}
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                </FormField>
                            </div>
                            <FormField v-slot="{ componentField }" name="password" class="grid gap-1"
                                :validate-on-blur="!isFieldDirty">
                                <FormItem>
                                    <FormLabel> Password</FormLabel>
                                    <FormControl>
                                        <div class="grid gap-1">
                                            <Input placeholder="Password" type="password" :disabled="isLoading"
                                                v-bind="componentField" />
                                            <FormMessage />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            </FormField>
                        </div>
                        <Button :disabled="isLoading">
                            <Icon icon="ri:loader-4-line" v-if="isLoading" class="h-4 w-4 animate-spin" />
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </LayoutWrapper>
</template>