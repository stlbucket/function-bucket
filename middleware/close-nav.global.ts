
export default defineNuxtRouteMiddleware((to, from) => {
  const appStateStore = useAppStateStore()
  if (!appStateStore.navCollapsed) {
    appStateStore.toggleNavCollapsed()
  }
})
