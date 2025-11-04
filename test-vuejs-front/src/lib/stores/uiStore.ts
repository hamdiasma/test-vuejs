import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('uiStore', () => {
  const isLoading = ref(false)

  const setIsLoading = (payload: boolean) => {
    isLoading.value = payload
  }
  
  const isBusy = () => setIsLoading(true)
  const isIdle = () => setIsLoading(false)

  return { isLoading, isBusy, isIdle }
})

