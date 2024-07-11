import { defineComponent, Prop, ref } from 'vue'
import { ElInput, ElButton } from 'element-plus'
import styles from './index.module.scss'

interface SearchProps {
  placeholder: string
  onSearch: (keyword: string) => void
}

export default defineComponent({
  name: 'RSearch',
  props: {
    placeholder: String,
    onSearch: Function as Prop<SearchProps['onSearch']>,
  },
  setup(props, { emit }) {
    const { placeholder } = props
    console.log(placeholder)

    const keyword = ref('')

    const handleSearch = () => {
      emit('search', keyword.value.trim())
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
        />
      </div>
    )
  },
})
