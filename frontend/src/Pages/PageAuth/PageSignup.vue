<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { SignupData } from '../../DataClasses/dataAuth.js'
import { funSignup } from '../../Functions/funAuth.js'

import Card from '../../Widgets/Card.vue'
import Button from '../../Widgets/Button.vue'
import Input from '../../Widgets/Input.vue'
import LinkButton from '../../Widgets/LinkButton.vue'
import CompGlitchTitle from '../../Components/CompGlitchTitle.vue'

const router = useRouter()
const signupForm = reactive(
    new SignupData()
)

const message = ref('')
const loading = ref(false)

async function signup() {

    message.value = ''

    const validation =
        signupForm.isValid()

    if (!validation.success) {

        message.value =
            validation.errors.username[0] ||
            validation.errors.email[0] ||
            validation.errors.password[0] ||
            validation.errors.confirm[0]

        return

    }

    loading.value = true

    const res = await funSignup(
        signupForm.toObject()
    )

    loading.value = false

    if (res.success) {

        message.value =
            'Signup successful!'
        setTimeout(() => {
            router.push('/dashboard#Home')
        }, 500)
        return

    }

    message.value =
        res.error || 'Signup failed'

}
</script>

<template>
    <div class="flex items-center justify-center min-h-screen p-4">
        <Card class="w-full max-w-80 space-y-4 outline-1 outline-(--primary)">

            <template #header>
                <p class="w-full text-center text-4xl font-bold">
                    <CompGlitchTitle text="SignUp" />
                </p>
            </template>

            <div class="flex flex-col gap-2">
                <Input v-model="signupForm.username" id="su-username" placeholder="Enter Username" label="Username" />
                <Input v-model="signupForm.email" id="su-email" type="email" placeholder="Enter Email" label="Email" />
                <Input v-model="signupForm.password" id="su-password" type="password" placeholder="Enter Password"
                    label="Password" />
                <Input v-model="signupForm.confirm" id="su-confirm" type="password"
                    placeholder="Enter Confirm Password" />
            </div>


            <template #footer>

                <div class="w-full space-y-2">
                    <Button :type="'button'" @click="signup" :disabled="loading" class="w-full">
                        {{
                            loading
                                ? 'Creating Account...'
                                : 'Signup'
                        }}
                    </Button>
                    <LinkButton to="/login" class="w-full">
                        Login
                    </LinkButton>
                </div>
            </template>


            <p v-if="message" class="message">
                {{ message }}
            </p>

        </Card>
    </div>
</template>