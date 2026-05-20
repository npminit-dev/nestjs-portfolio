import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, message } = body

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'All fields are required' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' })
  }

  if (!process.env.CONTACT_EMAIL_USER || !process.env.CONTACT_EMAIL_PASSWORD) {
    console.warn('Email credentials not configured — simulating send')
    return { success: true }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.CONTACT_EMAIL_USER,
        pass: process.env.CONTACT_EMAIL_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.CONTACT_EMAIL_FROM || process.env.CONTACT_EMAIL_USER,
      to: process.env.CONTACT_EMAIL_TO,
      subject: `Portfolio Contact — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
    })

    return { success: true }
  } catch (e) {
    console.error('Failed to send email:', e)
    throw createError({ statusCode: 500, statusMessage: 'Failed to send message' })
  }
})
