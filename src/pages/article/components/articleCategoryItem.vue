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
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  min-height: 13rem;
  padding: 2rem;

  &:hover {
    cursor: pointer;
    background-color: #e7e8e9;
  }

  .category-img-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12rem;
    height: 100%;
    object-fit: cover;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .category-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    padding: 0 1.6rem;

    .category-name {
      height: 1.8rem;
      font-size: 1.6rem;
      font-weight: bold;
    }

    .category-summary {
      display: block;
      flex: 1;
      font-size: 1.4rem;
      line-height: 1.5rem;
      color: #666;
      text-align: left;
    }

    .category-meta {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 1.3rem;
      font-size: 1.2rem;
      color: blue;
      text-align: left;
      cursor: pointer;
    }
  }

  .category_option {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 2rem;
  }
}
</style>
