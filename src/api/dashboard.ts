import axiosClient from '@/utils/http/axios'
import { DashboardData } from './models/dashboardModel'
import { DashboardApiPath } from './paths'

export class DashboardAPI {
  static async getDashboardData(): Promise<DashboardData> {
    return axiosClient.get(DashboardApiPath.META_DATA)
  }
}
