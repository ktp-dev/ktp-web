module.exports = {
  start_server: parseBool(process.env.START_SERVER, true),
  app_name: process.env.APP_NAME || 'Kappa Theta Pi',
  env: process.env.NODE_ENV || 'development',
  development: process.env.NODE_ENV !== 'production',
  production: process.env.NODE_ENV === 'production',
  service: process.env.SERVICE || 'web',
  host: process.env.HOST || 'https://kappathetapi.com',
  secret: process.env.SECRET || 'dollabillz',
  mongo_hostname: process.env.MONGO_HOSTNAME || 'ktp_db',
  backend_db: process.env.BACKEND_DB || 'ktp_backend',
  sessions_db: process.env.SESSIONS_DB || 'ktp_sessions',
  api_work: parseBool(process.env.APIWORK, false),
  server_port: process.env.PORT || 4000,
  max_tokens: process.env.MAX_TOKENS || 10,
  token_expiration: process.env.TOKEN_EXPIRATION || 28, // days
  mailchimp_token: process.env.MAILCHIMP_TOKEN || '',
  mailchimp_listid: process.env.MAILCHIMP_LISTID || '',
  mandrill_token: process.env.MANDRILL_TOKEN || '',
  email_from: process.env.EMAIL_FROM || 'eboard@kappathetapi.com',
  deployment_secret: process.env.DEPLOYMENT_SECRET || 'dollabillz',
  deployment_users: (process.env.DEPLOYMENT_USERS || 'ktp_user').split(','),
  deploy: {
    staging: {
      host: process.env.STAGING_HOST || 'staging0.aws.kappathetapi.com',
      user: process.env.STAGING_USER || 'core',
      privateKey: process.env.STAGING_PRIVATEKEY || '',
    },
    production: {
      host: process.env.PRODUCTION_HOST || 'prod0.aws.kappathetapi.com',
      user: process.env.PRODUCTION_USER || 'core',
      privateKey: process.env.PRODUCTION_PRIVATEKEY || '',
    },
  },
  slack_token: process.env.SLACK_TOKEN || '',
  slack_notifications_channel:
    process.env.SLACK_NOTIFICATIONS_CHANNEL || '#notifications',
  color_dark: process.env.COLOR_DARK || '#2F7BF3',
  color_light: process.env.COLOR_LIGHT || '#E84359',
  admin_name: process.env.ADMIN_NAME || 'Administrator',
  admin_email: process.env.ADMIN_EMAIL || 'admin@kappathetapi.com',
  admin_password: process.env.ADMIN_PASSWORD || 'ninja',
};

function parseBool(value, default_value) {
  if (typeof value === 'undefined') {
    return default_value;
  }
  return value === 'true';
}
