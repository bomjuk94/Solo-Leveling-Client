import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import { validateFormInputs } from "@/utils/validateFormInputs"
import type { FormModeTypes } from "@/types"
import { useSubmitFormData } from "./useSubmitFormData"

export const useHandleFormSubmit = () => {
    const navigate = useNavigate()
    const usernameRef = useRef<HTMLInputElement>(null)
    const userPasswordRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const [errors, setErrors] = useState<string[]>([])
    const updatePayload: Record<string, string> = {}
    const { handleUserFormSubmit } = useSubmitFormData()

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = formRef.current
        if (!form) return

        const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null
        const mode = (submitter?.value as FormModeTypes) || "login"

        const newErrors: string[] = []
        const newUsername = usernameRef.current?.value.trim()
        const newPassword = userPasswordRef.current?.value.trim()

        validateFormInputs({
            newUsername,
            newPassword,
            newErrors,
            setErrors,
            updatePayload,
        })

        if (newErrors.length === 0 && Object.keys(updatePayload).length > 0) {
            const data = {
                username: newUsername!,
                password: newPassword!,
                mode,
            }

            const response = await handleUserFormSubmit(data)
            form.reset()

            if (response === 200) {

                try {
                    const token = localStorage.getItem("token")
                    if (!token) throw new Error("No token found")

                    // const fetches = [
                    //     // profile
                    //     { key: "profile", store: useRegisteredUserGameStore.getState().setRegisteredProfile, promise: apiFetch('/api/profile').then(r => r.json()), transform: (data) => stripMongoId(data), },
                    // ];

                    // const results = await Promise.allSettled(fetches.map(f => f.promise));

                    // results.forEach((result, index) => {
                    //     const { key, store, transform } = fetches[index];
                    //     if (result.status === "fulfilled") {
                    //         store(transform(result.value));
                    //     } else {
                    //         console.error(`❌ ${key} fetch failed`, result.reason);
                    //     }
                    // });

                    navigate("/")
                } catch (error) {
                    console.error("Error hydrating inventory after login:", error)
                    navigate("/")
                }
            }
        }
    }

    return {
        handleFormSubmit,
        usernameRef,
        userPasswordRef,
        formRef,
    }
}