const domainUrl = 'https://anonymous-reviewer-app.herokuapp.com/'

// TODO Add recaptcha key here
//   https://developers.google.com/recaptcha/docs/invisible
const googleRecaptchaSiteKey = process.env.GOOGLE_RECAPTCHA_SITE_KEY;

export { domainUrl, googleRecaptchaSiteKey };
