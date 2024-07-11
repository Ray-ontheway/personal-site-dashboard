import { defineComponent, ref } from 'vue'
import { ElCard, ElTable, ElTableColumn, ElAvatar, ElButton, ElPagination, ElDialog, ElCheckboxGroup, ElCheckboxButton } from 'element-plus'
import RSearch from '@/components/search'
import { UserResp } from '@api/models/userModel'
import truncate from 'lodash/truncate'
import { useUserManager } from './useUserManager'

// style
import styles from './index.module.scss'

export default defineComponent({
  name: 'UserManager',
  setup() {
    const { userTableState, allRoles, fetchAllRoles, fetchUsers, handleCurrentPageChange, handlePageSizeChange, searchUsers, denyUser, updateUserRoles } =
      useUserManager()
    fetchUsers()
    fetchAllRoles()

    const dialogEnabled = ref(false)

    const curUser = ref<UserResp | null>(null)
    const curRoleIds = ref<string[]>([])
    const renderRolesEditorDialog = (user: UserResp) => {
      curUser.value = user
      user.roles.map(role => curRoleIds.value.push(role.id))
      dialogEnabled.value = true
    }
    const handleUpdateRoles = () => {
      updateUserRoles(curUser.value.id, curRoleIds.value)
      dialogEnabled.value = false
    }

    const renderTableOperator = () => <RSearch class={styles['operation-container']} placeholder="placeholder" onSearch={searchUsers} />
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
              <ElButton type="primary" onClick={() => renderRolesEditorDialog(scope.row)}>
                修改角色
              </ElButton>
              <ElButton type="danger" onClick={() => denyUser(scope.row)}>
                拉黑
              </ElButton>
            </>
          ))}
        </ElTable>
      </div>
    )
    const renderPagination = () => (
      <ElPagination
        v-model:currentPage={userTableState.pageIdx}
        v-model:pageSize={userTableState.pageSize}
        pageSizes={[8, 12, 16, 20]}
        size={'default'}
        layout={'total, sizes, prev, pager, next'}
        total={userTableState.total}
        onSize-change={handlePageSizeChange}
        onCurrent-change={handleCurrentPageChange}
      />
    )
    const renderEditorDialog = () => (
      <ElDialog
        title={`修改的角色`}
        v-model={dialogEnabled.value}
        v-slots={{
          footer: () => (
            <div>
              <ElButton type="primary" onClick={handleUpdateRoles}>
                确定
              </ElButton>
            </div>
          ),
        }}
      >
        <div class={styles['dialog-group']}>
          <ElCheckboxGroup size="large" v-model={curRoleIds.value}>
            {allRoles.value.map(role => (
              <ElCheckboxButton label={role.id} key={role.id} value={role.id}>
                {role.name}
              </ElCheckboxButton>
            ))}
          </ElCheckboxGroup>
        </div>
      </ElDialog>
    )

    return () => (
      <ElCard class={styles['main-card']}>
        {renderTableOperator()}
        {renderTable()}
        {renderPagination()}
        {dialogEnabled.value && renderEditorDialog()}
      </ElCard>
    )
  },
})
