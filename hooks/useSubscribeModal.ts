import { create } from 'zustand'

interface SubscribeModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useSubscribeModal = create<SubscribeModalStore>(set => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }
})

export default useSubscribeModal
