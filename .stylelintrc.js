module.exports = {
  /**
   * stylelint-config-standard
   * extends 'stylelint-config-recommended'
   * additional rules to enforce the common stylistic conventions found within a handful of CSS styleguides
   * ? Idiomatic CSS Principles: https://github.com/necolas/idiomatic-css
   * ? Google's CSS Style Guide: https://google.github.io/styleguide/htmlcssguide.html#CSS_Formatting_Rules
   * ? Airbnb's Styleguide: https://github.com/airbnb/css#css
   * ? @mdo's Code Guide: https://codeguide.co/#css
   * ? see the rules that this config uses: https://github.com/stylelint/stylelint-config-standard/blob/master/index.js
   */

  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-sass-guidelines',
  ],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    // disallow vendor prefixes when using autoprefixer
    'at-rule-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,

    'selector-no-qualifying-type': [true, { ignore: 'attribute' }],
  },
};
