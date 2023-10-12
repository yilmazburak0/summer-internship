const { supportedLanguages, defaultLanguage } = require('../config')

module.exports = async (app) => {
  const languageDetect = (req, res, next) => {
    let userLang

    const languageHeader = req.get('Accept-Language')

    if (languageHeader) {
      const langShortCode = languageHeader.substr(0, 2)
      const isLangSupported = supportedLanguages.includes(langShortCode)

      if (isLangSupported) {
        userLang = langShortCode
      }
    }

    req.language = userLang || defaultLanguage

    next()
  }

  app.use(languageDetect)
}
