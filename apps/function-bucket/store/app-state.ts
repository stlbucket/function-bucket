import { defineStore } from 'pinia'

interface AppState {
  navCollapsed: boolean,
  loggedIn: boolean,
  screenWidth: number | undefined
  currentProfileClaims: any | undefined
}

// export const useAppStateStore = defineStore('appState', () => {
//   const navCollapsed = ref(false)
//   const currentProfileClaims = ref()

//   const toggleNavCollapsed = () => { navCollapsed.value === !navCollapsed.value}
//   const getCurrentProfileClaims = async () => {
//     return {displayName: 'tacos'}
//   }

//   return {
//     navCollapsed,
//     currentProfileClaims,
//     toggleNavCollapsed,
//     getCurrentProfileClaims
//   }
// })

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
    storeAppUserClaims (claims: any) {
      this.currentProfileClaims = claims
    },
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
        // this.currentProfileClaims = {displayName: 'tacos'}
        // const {data, error} = await useCurrentProfileClaimsQuery()
        // this.currentProfileClaims = data.value?.currentProfileClaims
      }
      return this.currentProfileClaims
    }
  },
})