import { showToast } from "@/utils/showToast";
import type { FormDataType } from "@/types";
import { apiFetch } from "@/utils/apiFetch";
import { useAuthStore } from "@/stores/useAuthStore";

export const useSubmitFormData = () => {
    const { login } = useAuthStore();

    const handleUserFormSubmit = async (data: FormDataType) => {
        try {
            const res = await apiFetch(`/api/${data.mode}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                }),
            });

            const returnedData = await res.json();

            if (returnedData.token) {
                login(returnedData.token);
            }

            return res.status;
        } catch (error: any) {
            console.error("API error:", error);
            console.log('error', error)
            showToast("error", error.message || "An unexpected error occurred");
        }
    };

    return { handleUserFormSubmit };
};
