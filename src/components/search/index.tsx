import { defineComponent, ref } from 'vue'
import { ElInput, ElButton } from 'element-plus'
import styles from './index.module.scss'

// interface SearchProps {
//   placeholder: string
//   onSearch: (keyword: string) => void
// }

export default defineComponent({
  name: 'RSearch',
  props: {
    placeholder: {
      type: String,
      default: '请输入关键字',
    },
  },
  setup(props, { emit }) {
    const { placeholder } = props

    const keyword = ref('')

    const handleSearch = () => {
      emit('search', keyword.value.trim())
    }
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearch()
      }
    }

    const onInput = (newVal: string) => {
      keyword.value = newVal
    }

    return () => (
      <div class={[styles['search-container']]}>
        <ElInput
          class={'search-input'}
          clearable
          placeholder={placeholder}
          v-model={keyword.value}
          onInput={onInput}
          v-slots={{
            append: () => (
              <ElButton type="primary" onClick={() => handleSearch()}>
                SEARCH
              </ElButton>
            ),
          }}
          onKeydown={handleEnter}
        />
      </div>
    )
  },
})
