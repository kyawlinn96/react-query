import React from 'react';
import BackStep from '@/components/CommonUi/BackStep';
import LanguageHook from '@/pages/SystemLanguage/LanguageHook';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ChangeLanguage = () => {
  const navigate = useNavigate();
  const { languageOption } = LanguageHook();
  const { t, i18n } = useTranslation();

  const changeLanguageOption = (langType: string) => {
    i18n.changeLanguage(langType);
  };

  const currLang = localStorage.getItem('i18nextLng');

  return (
    <div>
      <div className='flex flex-col'>
        <div className=' relative p-4'>
          <div className='absolute left-3'>
            <BackStep />
          </div>
          <h2 className='text-center text-2xl font-bold text-primary-dark'>
            AYAZay
          </h2>
        </div>
        <div className='my-3 flex flex-col text-center text-xl font-medium'>
          <span>ဘာသာစကား ရွေးချယ်မည်</span>
          <span>(Please select Language)</span>
        </div>
        <div className='grid gap-3 p-3'>
          {languageOption.map((lang) => (
            <label
              className='flex items-center justify-between rounded-xl bg-gray-100 px-4 py-2'
              onChange={() => changeLanguageOption(lang.value)}
            >
              <div className='flex flex-col text-base font-medium leading-10'>
                <span className=''>{lang.label}</span>
                <span className=''>{lang.desc}</span>
              </div>
              <input
                type='radio'
                value={currLang!}
                checked={currLang === lang.value}
                className={cn('h-5 w-5 accent-primary-dark')}
              />
            </label>
          ))}
        </div>
        <button
          className='mx-4 my-2 rounded-xl bg-primary-dark px-4 py-3 text-base font-medium text-white hover:bg-primary-dark/70'
          onClick={() => navigate('/me')}
        >
          {t('ChooseLanguage.confirm')}
        </button>
      </div>
    </div>
  );
};
export default ChangeLanguage;
