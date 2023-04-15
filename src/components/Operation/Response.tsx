import Input from "../Form/Input";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectResponseById, updateResponse} from "../../store/slices/responseSlice";
import Select from "../Form/Select";
import React from "react";
import Textarea from "../Form/Textarea";
import {ResponseBodyTypes} from "../../types";

type ResponseProps = {
  responseId: string
}

const Response = ({responseId}: ResponseProps) => {
  const dispatch = useAppDispatch();
  // @ts-ignore
  const response = useAppSelector((state) => selectResponseById(state, responseId as string));

  if (!response) {
    throw new Error('Not Found');
  }

  // @ts-ignore
  const {status, body} = response

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {

    const {name:inputFieldName, value:inputFieldValue} = e.target;

    let payload = {[inputFieldName]: inputFieldValue}

    if (inputFieldName.includes(".")) {
      const [nestedObjectName, innerInputFieldName] = inputFieldName.split('.');

      // @ts-ignore
      payload = {[nestedObjectName]: {...body, ...{[innerInputFieldName]: inputFieldValue}}}
    }

    dispatch(updateResponse({id: responseId, changes: payload}));
  }

  return <>
    <p>Response</p>
    <form>
      <Input inputName="status" inputValue={status as number}
             inputPlaceholder="Add route"
             handleInputChange={handleInputChange}/>
    </form>
    <form>
      <Select selectName="body.type" selectValue={body?.type as string} selectOptions={ResponseBodyTypes} handleSelectChange={handleInputChange}/>
      <Textarea textareaName="body.value" textareaValue={body?.value as string} textareaPlaceholder="Add template"
                handleTextareaChange={handleInputChange}/>
    </form>
  </>
}
export default Response
