import { useEffect, useState } from "react"
import { apiFetch } from "@/utils/apiFetch"
import type { Profile } from "@/types"

export const useFetchProfile = () => {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await apiFetch("/api/profile")
                if (!res.ok) throw new Error("Failed to fetch profile")

                const data = await res.json()
                setProfile(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [])

    return { profile, loading, error }
}
