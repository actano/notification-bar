languages = 
    'de_DE': -> require './de_DE'
    'en_US': -> require './en_US'

module.exports.availableLanguages = ->
    Object.keys languages

module.exports.getPhrases = (languageCode, key) ->
    languages[languageCode]()