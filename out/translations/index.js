// Generated by CoffeeScript 1.9.3
(function() {
  var languages;

  languages = {
    'de_DE': function() {
      return require('./de_DE');
    },
    'en_US': function() {
      return require('./en_US');
    }
  };

  module.exports.availableLanguages = function() {
    return Object.keys(languages);
  };

  module.exports.getPhrases = function(languageCode, key) {
    return languages[languageCode]();
  };

}).call(this);
