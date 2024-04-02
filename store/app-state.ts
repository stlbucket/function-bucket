import { defineStore } from 'pinia'

interface AppState {
  navCollapsed: boolean,
  loggedIn: boolean,
  screenWidth: number | undefined
  currentProfileClaims: any | undefined
}

export const useAppStateStore = defineStore('appState', {
  persist: true,
  state: (): AppState => ({
    navCollapsed: false,
    loggedIn: false,
    screenWidth: undefined,
    currentProfileClaims: undefined
  }),
  getters: {
    
  },
  actions: {
    toggleNavCollapsed () {
      this.navCollapsed = !this.navCollapsed
    },
    async setLoggedIn (loggedIn: boolean) {
      this.loggedIn = loggedIn
      this.currentProfileClaims = undefined
    },
    setScreenWidth (screenWidth: number | undefined) {
      this.screenWidth = screenWidth
    },
    async getCurrentProfileClaims (refresh?: boolean) {
      if (refresh || !this.currentProfileClaims) {
        const result = await GqlCurrentProfileClaims()
        this.currentProfileClaims = result.currentProfileClaims
      }
      return this.currentProfileClaims
    }
  },
})