export {
  profileActions,
  profileReducer
} from './model/slice/profileSlice'

export type {
  Profile,
  ProfileSchema
} from './model/types/profile'

export {
  fetchProfileData
} from './model/services/fetchProfileData/fetchProfileData'

export {
  ProfileCard
} from './ui/ProfileCard/ProfileCard'
