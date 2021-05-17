import React from 'react'

function NotFoundPage() {
  return (
    <div style={{ height: window.innerHeight }} className="NotFoundPage">
     <div className="logo-small"/>
     <div className="error-404"/>
     <div className="text-big">Страница не найдена</div>
     <div>
       <button className="button-short-unfilled">
      Назад
      </button>
     </div>
    </div>
  )
}

export default NotFoundPage
