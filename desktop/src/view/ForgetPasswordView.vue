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
import { toast } from 'vue-sonner';
import { ApiWrapper } from '@/utils/apiWrapper';

const isLoading = ref(false)
const isVerify = ref(false)

const formSchema = toTypedSchema(z.object({
    email: z.string().email(),
}));

const { isFieldDirty, handleSubmit } = useForm({
    validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
    isLoading.value = true
    const form_data = new FormData();
    form_data.append("email", values.email);

    try {
        const response = await ApiWrapper(`${import.meta.env.VITE_API_COMPANY_URL}/auth/forget-password`, form_data);

        if (response.success == 1) {
            isVerify.value = true
        }
        else {
            isVerify.value = false
            toast.error(response.message)
        }

    } catch (e) {
        console.error(e);
        isVerify.value = false
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <LayoutWrapper>
        <div class="py-44">
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
                    <form v-if="!isVerify" @submit.prevent="onSubmit">
                        <div class="grid gap-4">
                            <div class="w-full space-y-2">
                                <FormField v-slot="{ componentField }" name="email" class="grid gap-1"
                                    :validate-on-blur="!isFieldDirty">
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
                            </div>
                            <Button :disabled="isLoading">
                                <Icon icon="ri:loader-4-line" v-if="isLoading" class="h-4 w-4 animate-spin" />
                                Send Email
                            </Button>
                        </div>
                    </form>
                    <div class="space-y-2.5 py-8" v-else>
                        <p class="text-xl font-semibold tracking-tight text-center">Password Send successfuly in email.
                        </p>
                        <Button class="w-full" as-child>
                            <RouterLink to="/login">Go Back Login</RouterLink>
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