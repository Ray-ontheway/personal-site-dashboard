import { UserLogin } from '@/api/models/userModel'
import { useAuthStore } from '@/store/modules/auth'

export const useLogin = () => {
  const authStore = useAuthStore()

  const accessToken = authStore.getAccessToken

  const doLogin = authStore.doLogin

  return {
    accessToken,
    doLogin,
  }
}
