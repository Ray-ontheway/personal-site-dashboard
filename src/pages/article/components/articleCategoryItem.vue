<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import moment from 'moment'
import { ElIcon } from 'element-plus'
import { SvgIcon } from '@/components/Icon'

export default defineComponent({
  name: 'CategoryItem',
  props: {
    uid: { type: String as PropType<string>, required: true },
    name: { type: String as PropType<string>, required: true },
    summary: { type: String as PropType<string>, required: true },
    coverUri: { type: String as PropType<string>, required: true },
    articleCount: { type: Number as PropType<number>, required: true },
    visitCount: { type: Number as PropType<number>, required: true },
    createAt: { type: [String, Date] as PropType<string | Date>, required: true },
  },
  emits: ['edit', 'delete'],
  setup(props, { emit }) {
    const { name, summary, coverUri, articleCount, visitCount } = props
    const createAt = new Date(props.createAt)
    // TODO: 日期格式化
    const metaInfo = `${moment(createAt).format('yyyy-MM-dd HH:mm')} · 文章数 ${articleCount} · 浏览量 ${visitCount}`

    const handleViewDetail = () => {
      console.log('查看专栏详情')
    }
    const handleEdit = (event: MouseEvent) => {
      event.stopPropagation()
      emit('edit', props.uid)
      console.log('编辑专栏')
    }
    const handleDelete = (event: MouseEvent) => {
      event.stopPropagation()
      emit('delete', props.uid)
      console.log('删除专栏')
    }
    return () => (
      <>
        <div class="article-category-container" onClick={handleViewDetail}>
          <div class="category-img-wrapper">
            <img src={coverUri} alt={name} />
          </div>
          <div class="category-info">
            <div class="category-name">{name}</div>
            {/* TODO summary的字数限制  */}
            <p class="category-summary">{summary}</p>
            <a class="category-meta" target="_blank">
              {metaInfo}
            </a>
          </div>
          <div class="category_option">
            <ElIcon class="category_option__item" size="2.4rem">
              <SvgIcon name="edit" color="#000" onClick={handleEdit} />
            </ElIcon>
            <ElIcon class="category_option__item" size="2.4rem">
              <SvgIcon name="delete" color="red" onClick={handleDelete} />
            </ElIcon>
          </div>
        </div>
      </>
    )
  },
})
</script>
<style lang="scss" scoped>
* {
  color: black;
}

.article-category-container {
  width: 100%;
  min-height: 13rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2rem;
  &:hover {
    cursor: pointer;
    background-color: #e7e8e9;
  }

  .category-img-wrapper {
    height: 100%;
    width: 12rem;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .category-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 1.6rem;
    height: 100%;

    .category-name {
      height: 1.8rem;
      font-size: 1.6rem;
      font-weight: bold;
    }

    .category-summary {
      flex: 1;
      display: block;
      text-align: left;
      font-size: 1.4rem;
      line-height: 1.5rem;
      color: #666;
    }

    .category-meta {
      height: 1.3rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 1.2rem;
      text-align: left;
      color: blue;
      cursor: pointer;
    }
  }

  .category_option {
    height: 100%;
    padding: 0 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
}
</style>
