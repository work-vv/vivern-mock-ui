import './form.scss'
import React, {ChangeEvent} from "react";

type TextareaProps = {
  textareaName: string,
  textareaValue: string,
  textareaPlaceholder: string
  handleTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

function Textarea({textareaName, textareaValue, textareaPlaceholder, handleTextareaChange}: TextareaProps){

  return (
        <textarea className="form__input form__input--textarea"
          name={textareaName}
          value={textareaValue}
          placeholder={textareaPlaceholder}
          onChange={handleTextareaChange}
        />
  );
}
export default Textarea
