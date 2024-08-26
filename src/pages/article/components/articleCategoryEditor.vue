<script lang="tsx">
import { defineComponent, toRefs, PropType } from 'vue'
import { ElInput, ElForm, ElFormItem, ElButton } from 'element-plus'

export default defineComponent({
  name: 'ArticleCategoryEditor',
  props: {
    uid: { type: String as PropType<string>, required: true },
    title: { type: String as PropType<string>, required: true },
    description: { type: String as PropType<string>, required: true },
    coverUri: { type: String as PropType<string>, required: true },
  },
  emits: ['save'],
  setup(props, { emit }) {
    const { uid, title, description, coverUri } = toRefs(props)

    const handleSave = () => {
      emit('save', uid.value, title.value, description.value, coverUri.value)
    }

    return () => (
      <>
        <ElForm>
          <ElFormItem>
            <ElInput v-model={title.value} placeholder="请输入专栏名称" />
          </ElFormItem>
          <ElFormItem>
            <ElInput v-model={description.value} type="textarea" placeholder="请输入专栏简介" />
          </ElFormItem>
          <ElFormItem>{coverUri.value && <img src={coverUri.value} alt="cover" />}</ElFormItem>
          <ElFormItem>
            <ElButton type="primary" onClick={handleSave}>
              创建专栏
            </ElButton>
          </ElFormItem>
        </ElForm>
      </>
    )
  },
})
</script>

<style lang="scss" scoped></style>
