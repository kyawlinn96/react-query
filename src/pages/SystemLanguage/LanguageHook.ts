import React from 'react';

const languageOption = [
  {
    id: 1,
    label: 'ဤစာကိုျမင္ရသည္',
    desc: '(Zawgyi)',
    value: 'zawgyi',
  },
  {
    id: 2,
    label: 'ဤစာကိုမြင်ရသည်',
    desc: '(Unicode)',
    value: 'unicode',
  },
  {
    id: 3,
    label: 'Use English',
    desc: '(English)',
    value: 'en-US',
  },
];
const LanguageHook = () => {
  return {
    languageOption,
  };
};
export default LanguageHook;
