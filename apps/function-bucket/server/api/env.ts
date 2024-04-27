export default defineEventHandler((event) => {
  const env = process.env
  // UNCOMMENT FOR SERVER ERROR
  // const {
  //   supabase: { url, key, cookieName },
  // } = useRuntimeConfig().public
  // console.log(url)

  return env
})
