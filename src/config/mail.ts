interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'mailjet';
  defaults: {
    from: {
      email: string,
      name: string,
    },
  },
  mailjet_api_key: string,
  mailjet_secret_key: string,
}

export default {
  driver: process.env.MAIL_DRIVER || 'mailjet',
  defaults: {
    from: {
      email: process.env.DEFAULT_EMAIL_ADDRESS || 'admin@gmail.com',
      name: process.env.DEFAULT_MAILER_NAME || 'Administrador',
    },
  },
  mailjet_api_key: process.env.MAILJET_API_KEY || '',
  mailjet_secret_key: process.env.MAILJET_API_SECRET || '',
} as IMailConfig;
