import { defineStore } from 'pinia'

interface AppState {
  navCollapsed: boolean,
  loggedIn: boolean,
  screenWidth: number | undefined
}

export const useAppStateStore = defineStore('appState', {
  persist: true,
  state: (): AppState => ({
    navCollapsed: false,
    loggedIn: false,
    screenWidth: undefined
  }),
  getters: {
    
  },
  actions: {
    toggleNavCollapsed () {
      this.navCollapsed = !this.navCollapsed
    },
    async setLoggedIn (loggedIn: boolean) {
      this.loggedIn = loggedIn
    },
    setScreenWidth (screenWidth: number | undefined) {
      this.screenWidth = screenWidth
    },
  },
})