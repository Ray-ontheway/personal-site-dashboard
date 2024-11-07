import { faker } from '@faker-js/faker'
import { BaseResult } from '@/api/models/common'
import { DashboardData } from '@/api/models/dashboardModel'

export const generateDashboardData = (): BaseResult<DashboardData> => {
  return {
    status: 200,
    msg: 'success',
    data: {
      pv: faker.number.int(100) + 100,
      uv: faker.number.int(100),
      articleCount: faker.number.int(100) + 100,
      essaysCount: faker.number.int(100),
    },
  }
}
