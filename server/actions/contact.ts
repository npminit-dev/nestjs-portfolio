export default defineAction({
  async handler(event) {
    const body = await readBody(event)

    const { name, email, message } = body

    return {
      success: true,
      message: 'Message received'
    }
  }
})