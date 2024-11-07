import MockAdapter from 'axios-mock-adapter'
import { generateDashboardData } from './result'
import { DashboardApiPath } from '@/api/paths'

export function mockDashboardApi(mock: MockAdapter) {
  mock.onGet(DashboardApiPath.META_DATA).reply(200, generateDashboardData())
}
