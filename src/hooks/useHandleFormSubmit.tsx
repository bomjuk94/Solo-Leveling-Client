import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { validateFormInputs } from "@/utils/validateFormInputs";
import type { FormModeTypes, userProfile } from "@/types";
import { useSubmitFormData } from "./useSubmitFormData";
import { showToast } from "@/utils/showToast";
import { useUserProfileStore } from "@/stores/useUserProfileStore";
import { useUserPurchasesStore } from "@/stores/usePurchasesStore";
import { useUserStore } from "@/stores/useUserStore";
import { apiFetch } from "@/utils/apiFetch";

export const useHandleFormSubmit = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const updatePayload: Record<string, string> = {};
  const { handleUserFormSubmit } = useSubmitFormData();
  const { setUserProfile } = useUserProfileStore();
  const { setUserPurchases } = useUserPurchasesStore();
  const { setUserStore } = useUserStore();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;
    const mode = submitter?.value as FormModeTypes;

    const newErrors: string[] = [];
    const newUsername = usernameRef.current?.value.trim();
    const newPassword = userPasswordRef.current?.value.trim();

    validateFormInputs({
      newUsername,
      newPassword,
      newErrors,
      setErrors,
      updatePayload,
    });

    if (newErrors.length === 0 && Object.keys(updatePayload).length > 0) {
      const data = {
        username: newUsername!,
        password: newPassword!,
        mode,
      };

      const response = await handleUserFormSubmit(data);
      form.reset();
      if (!response) return;

      if (response.res.status === 200) {
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token found");

          if (mode === "login") {
            const fetches = [
              // profile
              {
                key: "profile",
                store: useUserProfileStore.getState().setUserProfile,
                promise: apiFetch("/api/profile").then((r) => r.json()),
              },
              {
                key: "purchases",
                store: useUserPurchasesStore.getState().setUserPurchases,
                promise: apiFetch("/api/purchases").then((r) => r.json()),
              },
              {
                key: "store",
                store: useUserStore.getState().setUserStore,
                promise: apiFetch("/api/store").then((r) => r.json()),
              },
            ];

            const results = await Promise.allSettled(
              fetches.map((f) => f.promise)
            );

            results.forEach((result, index) => {
              const { key, store } = fetches[index];
              if (result.status === "fulfilled") {
                store(result.value);
              } else {
                console.error(`❌ ${key} fetch failed`, result.reason);
              }
            });

            const userOnboarded: userProfile =
              response.returnedData.profile.onBoarded;
            if (userOnboarded) {
              navigate("/");
            } else {
              navigate("/character-creation");
            }
          } else {
            const newProfile: userProfile = response.returnedData.profile;
            setUserProfile(newProfile);
            setUserPurchases([]);
            setUserStore([]);

            // Check if user is onboarded.
            if (newProfile.onBoarded) {
              navigate("/");
            } else {
              navigate("/character-creation");
            }
          }
        } catch (error) {
          console.error("Error hydrating inventory after login:", error);
          navigate("/");
        }
      }
    } else {
      formRef.current?.reset();
      showToast("error", newErrors);
    }
  };

  return {
    handleFormSubmit,
    usernameRef,
    userPasswordRef,
    formRef,
  };
};
