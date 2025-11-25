export type Profile = {
    username: string
    onBoarded: boolean
    timezone: string
    selectedClass: string
    customDescription: string
    profileImage: File | null
    createdAt: string
    lastActive: string
    theme: "light" | "dark" | 'rogue'
    balance: number
}