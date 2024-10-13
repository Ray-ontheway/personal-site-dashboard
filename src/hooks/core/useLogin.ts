import { UserLogin } from '@/api/models/userModel'
import { useAppStore } from '@/store/modules/app'

export const useLogin = () => {
  const appStore = useAppStore()

  const accessToken = appStore.getAccessToken

  const doLogin = appStore.doLogin

  return {
    accessToken,
    doLogin,
  }
}
