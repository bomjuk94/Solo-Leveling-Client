import { useFetchProfile } from '@/hooks/useFetchProfile'
import { showToast } from '@/utils/showToast'
import { capitalizeStr } from '@/utils/capitalizeStr'
import placeholderProfileImg from '../assets/images/placeholder.png'
import { useState } from 'react'

const Profile = () => {
    const { profile, loading, error } = useFetchProfile()

    const [username, setUsername] = useState('')
    const [theme, setTheme] = useState('dark')

    if (loading) return <div>Loading...</div>
    if (!profile) return showToast('error', 'Error retrieving profile data.')
    if (error) return <>{error}</>

    if (username === '') setUsername(profile.username)
    if (theme === '' && profile.theme) setTheme(profile.theme)

    const saveProfile = (e: React.FormEvent) => {
        e.preventDefault()
        showToast('success', 'Profile saved.')
    }

    console.log(profile)

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] px-4 py-8">
            <div className="w-full max-w-sm mx-auto">

                {/* Profile Header Card */}
                <section
                    className="flex items-center gap-4 mb-6 p-4 rounded-[var(--radius-twenty)] shadow-lg border border-[var(--border)]"
                    style={{ background: 'var(--bg-dialog)' }}
                >
                    <img
                        src={profile.profileImage || placeholderProfileImg}
                        alt={profile.username}
                        className="rounded-full w-16 h-16 object-cover"
                        style={{ boxShadow: '0 0 8px var(--accent-blue)' }}
                    />

                    <div>
                        <h2
                            className="text-lg font-semibold"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            {capitalizeStr(profile.username)}
                        </h2>

                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            Edit your profile details
                        </p>
                    </div>
                </section>

                {/* Profile Form Card */}
                <form
                    onSubmit={saveProfile}
                    className="space-y-6 p-6 rounded-[var(--radius-twenty)] border border-[var(--border)] shadow-lg"
                    style={{ background: 'var(--bg-dialog)' }}
                >
                    {/* Username */}
                    <div>
                        <label
                            className="block text-sm mb-2"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 rounded-md outline-none"
                            style={{
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border)',
                                color: 'var(--text-primary)',
                            }}
                        />
                    </div>

                    {/* Theme */}
                    <div>
                        <label
                            className="block text-sm mb-2"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            Theme
                        </label>

                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="w-full p-3 rounded-md outline-none cursor-pointer"
                            style={{
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border)',
                                color: 'var(--text-primary)',
                            }}
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="rogue">Rogue</option>
                        </select>
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-md font-semibold tracking-wide cursor-pointer"
                        style={{
                            background: 'var(--accent-blue)',
                            color: 'white',
                            boxShadow: '0 0 8px var(--accent-blue)',
                        }}
                    >
                        Save Profile
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Profile
