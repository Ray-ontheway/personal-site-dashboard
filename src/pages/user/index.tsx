import { defineComponent, ref, reactive } from 'vue'
import axiosClient from '@/utils/http/axios'
import { UserApiPath } from '@api/paths'
import { ElCard, ElTable, ElTableColumn, ElAvatar, ElButton, ElInput, ElPagination } from 'element-plus'
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
    const userTableState = reactive<UserTable>({
      data: [],
      total: 0,
      pageIdx: 1,
      pageSize: 10,
    })

    // 后续的操作分离出去
    axiosClient
      .get(UserApiPath.PAGE, { params: { pageIdx: 1, pageSize: 8 } })
      .then(newUsers => {
        console.log(newUsers)
        userTableState.data = newUsers.data
      })
      .catch(err => {
        console.log(err)
      })

    const handleEdit = (user: UserResp) => {}
    const handleDeny = (user: UserResp) => {}
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

    const renderTableColumn = (label: string, render: (scope) => JSX.Element) => (
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
          {renderTableColumn('头像', scope => (
            <ElAvatar src={scope.row.avatar} size="default" />
          ))}
          {renderTableColumn('用户名', scope => (
            <span>{truncate(scope.row.username, { length: 8, omission: '' })}</span>
          ))}
          {renderTableColumn('角色', scope => {
            const roles = scope.row.roles.map(role => role.name).join(',')
            return <span>{roles}</span>
          })}
          {renderTableColumn('操作', scope => (
            <>
              <ElButton type="primary" onClick={() => handleEdit(scope.row)}>
                修改角色
              </ElButton>
              <ElButton type="danger" onClick={() => handleDeny(scope.row)}>
                拉黑
              </ElButton>
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

    const handleSizeChange = (pageSize: number) => {
      console.log(pageSize)
    }
    const handleCurrentPage = (pageIdx: number) => {
      console.log(pageIdx)
    }

    const renderPagination = () => (
      <ElPagination
        defaultCurrentPage={1}
        defaultPageSize={10}
        current-page={userTableState.pageIdx}
        size={'default'}
        pageSizes={[8, 12, 16]}
        total={userTableState.total}
      />
    )

    return () => (
      <ElCard class={styles['main-card']}>
        {renderTableOperator()}
        {userTableState.data && renderTable()}
        {renderPagination()}
      </ElCard>
    )
  },
})
