// import React from 'react';
// import { IntlProvider, addLocaleData } from 'react-intl';

// // This is react-intl locale data
// import en from 'react-intl/locale-data/en';

// // This is your translation files
// // In case you are curious about locale - https://gist.github.com/jacobbubu/1836273
// import enUS from 'common/translations/en-US.json';

// // We are adding english here
// addLocaleData([...en]);

// // Creating a map of supported messages
// // It will be used in IntlProvider below
// const messages = {
//   'en-US': enUS,
// };

// export default class I18NProvider extends React.PureComponent {

//   render() {
//     // query the browser for language / locale
//     // feel free to modify this logic to fit your need
//     const language = navigator.language.split(/[-_]/)[0];
//     const locale = navigator.language;

//     const { children } = this.props;

//     return (
//       <IntlProvider locale={language} messages={messages[locale]}>
//         {children}
//       </IntlProvider>
//     );
//   }
// }
