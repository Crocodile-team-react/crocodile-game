import React from 'react';
import Logo from '../components/Logo';

function NotFoundPage() {
  return (
    <div className="not-found-page-block">
      <Logo>
        <span className="logo-small"></span>
      </Logo>
      <div className="error-404"></div>
      <p className="text-big">Страница не найдена</p>
      <button className="button-short-unfilled">Назад</button>
    </div>
  );
}

export default NotFoundPage;
