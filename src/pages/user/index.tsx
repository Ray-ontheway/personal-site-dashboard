import { defineComponent, ref, reactive } from 'vue'
import axiosClient from '@/utils/http/axios'
import { UserApiPath } from '@api/paths'
import { ElCard, ElTable, ElTableColumn, ElImage, ElAvatar, ElButton, ElInput } from 'element-plus'
import { UserResp } from '@api/models/userModel'
import { PageObject } from '@api/models/common'
import truncate from 'lodash/truncate'

// style
import styles from './index.module.scss'

export default defineComponent({
  name: 'UserManager',
  setup() {
    interface UserTable {
      data: UserResp[]
      total: number
      pageIdx: number
      pageSize: number
    }
    console.log('UserManager')
    const userTableState = reactive<UserTable>({})

    // 后续的操作分离出去
    const pageUsers = axiosClient
      .get(UserApiPath.PAGE, { params: { pageIdx: 1, pageSize: 10 } })
      .then(newUsers => {
        console.log(newUsers)
        userTableState.data = newUsers.data
      })
      .catch(err => {
        console.log(err)
      })

    const handleEdit = (user: UserResp) => {}
    const handleDelete = (user: UserResp) => {}
    const handleDetail = (user: UserResp) => {}
    const handleSearch = () => {
      console.log('search')
      axiosClient
        .get(UserApiPath.SEARCH, { params: { username: searchText.value } })
        .then(res => {
          console.log(res)
          userTableState.data = res
        })
        .catch(err => {
          console.log(err)
        })
    }

    const renderTableColumn = (label: string, render: (scope: UserResp) => JSX.Element) => (
      <ElTableColumn
        label={label}
        v-slots={{
          default: render,
        }}
      />
    )

    const renderTable = () => (
      <div>
        <ElTable data={userTableState.data as UserResp[]} stripe>
          {renderTableColumn('头像', (scope: UserResp) => (
            <ElAvatar src={scope.row.avatar} size="default" />
          ))}
          {renderTableColumn('用户名', (scope: UserResp) => (
            <span>{truncate(scope.row.username, { length: 8, omission: '' })}</span>
          ))}
          {renderTableColumn('角色', (scope: UserResp) => {
            const roles = scope.row.roles.map(role => role.name).join(',')
            return <span>{roles}</span>
          })}

          {renderTableColumn('操作', (scope: UserResp) => (
            <>
              <ElButton type="primary"> 修改角色 </ElButton>
              <ElButton type="danger"> 拉黑 </ElButton>
            </>
          ))}
        </ElTable>
      </div>
    )

    const searchText = ref('fadsfdas')
    const renderTableOperator = () => (
      <div class={styles['option-container']}>
        <ElInput
          v-model={searchText.value}
          clearable
          placeholder="请输入用户名或用户ID"
          onKeydown={(event: KeyboardEvent) => {
            if (event.key === 'Enter') {
              handleSearch()
            }
          }}
        />
        <ElButton type="primary" onClick={handleSearch}>
          查询
        </ElButton>
      </div>
    )

    return () => (
      <ElCard class={styles['main-card']}>
        {renderTableOperator()}
        {userTableState.data && renderTable()}
      </ElCard>
    )
  },
})
