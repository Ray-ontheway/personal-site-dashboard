import { defineComponent } from 'vue'
import axiosClient from '@/utils/http/axios'
import { UserApiPath } from '../api/paths'

export default defineComponent({
  name: 'UserManager',
  setup() {
    console.log('UserManager')

    axiosClient
      .get(UserApiPath.PAGE, { params: { pageIdx: 1, pageSize: 10 } })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

    const renderTable = () => (
      <>
        <div>用户表单，表单每一项添加一个查看和修改的操作</div>
      </>
    )

    const renderTableOperator = () => <div>操作： 批量删除，查询</div>

    return () => (
      <div>
        {renderTableOperator()}
        {renderTable()}
      </div>
    )
  },
})
