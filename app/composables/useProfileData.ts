import { useProfile } from './useProfile'
import type { ProfileDto } from '../types/dto/profile.dto'

export const useProfileData = async () => {
  const { get_profile } = useProfile()

  const { data } = await useAsyncData('global-profile', async () => {
    const res = await get_profile()
    return (res && typeof res !== 'boolean' && res.data) ? res.data : null
  })

  return data as Ref<ProfileDto | null>
}
