import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/apiFetch";
import { type Profile } from "@/types";
import { capitalizeStr } from "@/utils/capitalizeStr";
import placeholderProfileImg from '../assets/images/placeholder.png'

const Dashboard = () => {

  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiFetch('/api/profile')

        if (res.ok) {
          const data = await res.json()
          setProfile(data)
        }
      } catch (error) {
        console.log('error fetching profile', error)
      }
    }
    fetchProfile()

  }, [])

  console.log('profile data: ', profile);

  if (!profile) return

  return (
    <>
      <section className="flex items-center gap-x-2">
        <div>
          <h2>
            {capitalizeStr(profile?.username)}
          </h2>
        </div>

        <div>
          <img
            src={profile.profileImage || placeholderProfileImg}
            alt={profile.username}
            className="rounded-full w-10 h-10"
          />
        </div>
      </section>
    </>
  );
};

export default Dashboard;