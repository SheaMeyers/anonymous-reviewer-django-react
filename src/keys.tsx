const domainUrl = process.env.DOMAIN_URL || 'http://localhost:8000';

// TODO Add recaptcha key here
//   https://developers.google.com/recaptcha/docs/invisible
const googleRecaptchaSiteKey = process.env.GOOGLE_RECAPTCHA_SITE_KEY || '';

export { domainUrl, googleRecaptchaSiteKey };
