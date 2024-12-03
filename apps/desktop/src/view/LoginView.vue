<script setup>
import { ref } from 'vue'
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

const isLoading = ref(false)
const formSchema = toTypedSchema(z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
}));

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
    console.log(values)
})
</script>

<template>
    <LayoutWrapper>
        <div class="py-12">
            <div class="mx-auto flex w-full flex-col justify-center px-2 space-y-6 sm:max-w-md">
                <div class="flex flex-col space-y-2 text-center">
                    <h1 class="text-2xl font-semibold tracking-tight">
                        Create an account
                    </h1>
                    <p class="text-sm text-muted-foreground">
                        Enter your email below to create your account
                    </p>
                </div>
                <div class="space-y-6">
                    <form @submit.prevent="onSubmit">
                        <div class="grid gap-4">
                            <div class="w-full space-y-2">
                                <FormField v-slot="{ componentField }" name="email" class="grid gap-1">
                                    <FormItem>
                                        <FormLabel class="sr-only" for="email"> Email</FormLabel>
                                        <FormControl>
                                            <div class="grid gap-1">
                                                <Label class="sr-only" for="email">
                                                    Email
                                                </Label>
                                                <Input id="email" placeholder="name@example.com" type="email"
                                                    auto-capitalize="none" auto-complete="email" auto-correct="off"
                                                    :disabled="isLoading" v-bind="componentField" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </FormField>
                                <FormField v-slot="{ componentField }" name="password" class="grid gap-1">
                                    <FormItem>
                                        <FormLabel class="sr-only" for="password"> Password</FormLabel>
                                        <FormControl>
                                            <div class="grid gap-1">
                                                <Label class="sr-only" for="password">
                                                    Password
                                                </Label>
                                                <Input id="password" placeholder="Password" type="password"
                                                    auto-capitalize="none" auto-complete="password" auto-correct="off"
                                                    :disabled="isLoading" v-bind="componentField" />
                                                <FormMessage />
                                                <RouterLink to="/auth/forgot-password"
                                                    class="underline underline-offset-4 hover:text-primary text-sm text-muted-foreground text-end">
                                                    Forget Password?
                                                </RouterLink>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                </FormField>
                            </div>
                            <Button :disabled="isLoading">
                                <Icon icon="ri:loader-4-line" v-if="isLoading" class="h-4 w-4 animate-spin" />
                                Login
                            </Button>
                        </div>
                    </form>
                    <Separator label="Or continue with" />
                    <div class="space-y-2">
                        <Button variant="outline" type="button" class="w-full" :disabled="isLoading">
                            <Icon icon="ri:loader-4-line" v-if="isLoading" class="h-4 w-4 animate-spin" />
                            <Icon icon="mdi:github" v-else class="!h-5 !w-5" />
                            GitHub
                        </Button>
                        <Button variant="outline" type="button" class="w-full" :disabled="isLoading" as-child>
                            <RouterLink to="/auth/sign-up" class="flex items-center">
                                <Icon icon="ri:loader-4-line" v-if="isLoading" class="h-4 w-4 animate-spin" />
                                <Icon icon="line-md:plus" v-else class="h-4 w-4" />
                                Create Account
                            </RouterLink>
                        </Button>
                    </div>
                </div>
                <p class="px-8 text-center text-sm text-muted-foreground">
                    By clicking Login, you agree to our
                    <RouterLink to="/" class="underline underline-offset-4 hover:text-primary">
                        Terms of Service
                    </RouterLink>
                    and
                    <RouterLink to="/" class="underline underline-offset-4 hover:text-primary">
                        Privacy Policy.
                    </RouterLink>
                </p>
            </div>
        </div>
    </LayoutWrapper>
</template>