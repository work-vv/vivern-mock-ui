import Input from "../Form/Input";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {updateParse, selectParseById} from "../../store/slices/parseSlice";

type ParseProps = {
  parseId: string
}

const Parse = ({parseId}: ParseProps) => {
  const dispatch = useAppDispatch();
  // @ts-ignore
  const parse = useAppSelector((state) => selectParseById(state, parseId as string));
  if (!parse) {
    throw new Error('Not Found');
  }

  const {variable, value, sample} = parse;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name:inputFieldName, value:inputFieldValue} = e.target;

    let payload = {[inputFieldName]: inputFieldValue}

    if (inputFieldName.includes(".")) {
      const [nestedObjectName, innerInputFieldName] = inputFieldName.split('.');

      // @ts-ignore
      payload = {[nestedObjectName]: {...sample, ...{[innerInputFieldName]: inputFieldValue}}}
    }
    // @ts-ignore
    dispatch(updateParse({id: parseId, changes: payload}));
  }

  return <>
    <p>Parse</p>
    <Input inputName="variable" inputValue={variable}
           inputPlaceholder="Add variable name"
           handleInputChange={handleInputChange}/>
    <Input inputName="value" inputValue={value as string}
           inputPlaceholder="Add value or wildcard in dot notation e.g. request.query.textParam"
           handleInputChange={handleInputChange}/>
    <Input inputName="sample.value" inputValue={sample?.value as string}
           inputPlaceholder="Add default value or wildcard in dot notation e.g. sample.faker.iban"
           handleInputChange={handleInputChange}/>
    <Input inputName="sample.args" inputValue={sample?.args as string}
           inputPlaceholder="Add comma separated wildcard arguments if required"
           handleInputChange={handleInputChange}/>
  </>
}
export default Parse
