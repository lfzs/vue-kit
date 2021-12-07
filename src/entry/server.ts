import { createApp as creater } from '@/helper/app'

async function createApp(url: string) {
  const context = creater()
  await context.router.push(url)
  await context.router.isReady()

  return context
}

export {
  createApp,
}
