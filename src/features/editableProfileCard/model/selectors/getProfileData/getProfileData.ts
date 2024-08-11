import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileData = (state: StateSchema) => state.profile?.data
export const getProfile = (state: StateSchema) => state.profile?.data?.id
