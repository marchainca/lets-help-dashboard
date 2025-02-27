'use client';

import React from 'react';
import i18n from '@/i18n';

export default function LanguageSwitcher() {
  const changeLanguage = (lng: string) => {
    void i18n.changeLanguage(lng);
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button onClick={() => changeLanguage('es')}>ES</button>
      <button onClick={() => changeLanguage('en')}>EN</button>
    </div>
  );
}
