export interface ValidateFormInputsProps {
    newUsername: string | undefined,
    newPassword: string | undefined,
    newErrors: string[],
    setErrors: React.Dispatch<React.SetStateAction<string[]>>,
    updatePayload: Record<string, string>,
}
export type FormModeTypes = 'login' | 'register'
export type FormDataType = {
    username: string
    password: string
    mode: string
}