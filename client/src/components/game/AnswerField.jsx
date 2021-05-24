import React from 'react';

function AnswerField() {
  return (
    <form className="form-with-inp-but">
      <input type="text" className="input" placeholder="Ваши догадки..."/>
      <button className="button-short-filled" type="submit">Ок</button>
    </form>
  );
}

export default AnswerField;
