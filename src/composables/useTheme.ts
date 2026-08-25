import { ref } from 'vue'

const currentTheme = ref<'light' | 'dark'>(
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
)

export function useTheme() {
  const apply = (theme: 'light' | 'dark') => {
    currentTheme.value = theme
    document.documentElement.dataset.theme = theme
    localStorage.setItem('shahd-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#22201f' : '#f4efe7')
  }

  const toggle = () => apply(currentTheme.value === 'dark' ? 'light' : 'dark')
  return { currentTheme, toggle }
}
