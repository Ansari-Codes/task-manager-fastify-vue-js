<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import Card from '../../Widgets/Card.vue'
import Button from '../../Widgets/Button.vue'
import Input from '../../Widgets/Input.vue'
import LinkButton from '../../Widgets/LinkButton.vue'
import CompGlitchTitle from '../../Components/CompGlitchTitle.vue'

import { LoginData } from '../../DataClasses/dataAuth.js'
import { funLogin } from '../../Functions/funAuth.js'

const loginForm = reactive(
    new LoginData()
)
const router = useRouter()
const message = ref('')
const loading = ref(false)

async function login() {

    message.value = ''

    const validation =
        loginForm.isValid()

    if (!validation.success) {

        message.value =
            validation.errors.username[0] ||
            validation.errors.password[0]

        return

    }

    loading.value = true

    const res = await funLogin(
        loginForm.toObject()
    )

    loading.value = false

    if (res.success) {

        message.value =
            'Login successful!'
        setTimeout(() => {
            router.push('/dashboard#Home')
        }, 500)

        return

    }

    message.value =
        res.error || 'Login failed'

    console.log(res)

}
</script>

<template>
    <div class="flex items-center justify-center min-h-screen p-4">
        <Card class="w-full max-w-80 space-y-4 outline-1 outline-(--primary)">

            <template #header>
                <p class="w-full text-center text-4xl font-bold"><CompGlitchTitle text="LogIn"/></p>
            </template>

            <div class="flex flex-col gap-2 mt-0">
                <Input v-model="loginForm.username" id="username" label="Username" placeholder="Enter username" />
                <Input v-model="loginForm.password" id="password" label="Password" type="password"
                    placeholder="Enter password" />
            </div>

            <template #footer>

                <div class="w-full space-y-2">
                    <Button :type="'button'" @click="login" :disabled="loading" class="w-full">
                        {{
                            loading
                                ? 'Logging in...'
                                : 'Log In'
                        }}
                    </Button>
                    <LinkButton to="/signup" class="w-full">
                        Signup
                    </LinkButton>
                </div>
            </template>

            <p v-if="message" class="mt-5 text-sm text-slate-300">
                {{ message }}
            </p>

        </Card>
    </div>
</template>