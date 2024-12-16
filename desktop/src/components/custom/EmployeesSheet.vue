<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { toTypedSchema } from '@vee-validate/zod';
import { Icon } from '@iconify/vue';
import { ApiWrapper } from '@/utils/apiWrapper';
import { useForm } from 'vee-validate'
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
    fName: z.string().min(2, 'First name must have at least 2 characters').max(50, 'First name cannot exceed 50 characters'),
    lName: z.string().min(2, 'Last name must have at least 2 characters').max(50, 'Last name cannot exceed 50 characters'),
    email: z.string().email('Enter a valid email address'),
    dob: z.string().refine(
        (value) => !isNaN(Date.parse(value)),
        'Enter a valid date of birth (YYYY-MM-DD)'
    ),
    phone: z.string().regex(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number'),
}))

const { isFieldDirty, handleSubmit } = useForm({
    validationSchema: formSchema,
})

const isLoading = ref(false)

const props = defineProps({
    open:Boolean
})


const onSubmit = handleSubmit(async (values) => {
    isLoading.value = true
    const form_data = new FormData();
    form_data.append("email", values.email);
    form_data.append("password", values.password);

    try {
        const response = await ApiWrapper(`${import.meta.env.VITE_API_COMPANY_URL}/auth/login`, form_data);

        if (response.success == 1) {
            toast.success(response.message)
        }
        else {
            toast.error(response.message)
        }

    } catch (e) {
        console.error(e);
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <Sheet :open="open">
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Employee Manage</SheetTitle>
                <SheetDescription>
                    Make changes to your Employee here. Click save when you're done.
                </SheetDescription>
            </SheetHeader>
            <form class="w-full space-y-6 py-6" @submit="onSubmit">
                <div class="space-y-4">
                    <FormField v-slot="{ componentField }" name="fName" :validate-on-blur="!isFieldDirty">
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Enter First Name" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="lName" :validate-on-blur="!isFieldDirty">
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Enter Last Name" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Enter Email" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="dob" :validate-on-blur="!isFieldDirty">
                        <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                                <Input type="date" placeholder="YYYY-MM-DD" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="phone" :validate-on-blur="!isFieldDirty">
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Enter 10-digit Phone Number" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </div>
                <SheetFooter>
                    <Button type="submit" :disabled="isLoading">
                        <Icon icon="ri:loader-4-line" v-if="isLoading" class="h-4 w-4 animate-spin" />
                        Save changes
                    </Button>
                </SheetFooter>
            </form>
        </SheetContent>
    </Sheet>
</template>
