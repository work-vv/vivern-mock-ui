import Input from '../Form/Input';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateRequest, selectRequestById } from '../../store/slices/requestSlice';
import { addParse, createDefaultParse } from '../../store/slices/parseSlice';
import Select from '../Form/Select';
import { HttpRequestMethods } from '../../types';
import Parse from './Parse';
import Button from '../Button';

type RequestProps = {
  requestId: string;
};

const Request = ({ requestId }: RequestProps) => {
  const dispatch = useAppDispatch();
  // @ts-ignore
  const request = useAppSelector((state) => selectRequestById(state, requestId as string));
  if (!request) {
    throw new Error('Not Found');
  }

  const { route, method, parses } = request;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const inputFieldValue = e.target.value;
    const inputFieldName = e.target.name;
    // @ts-ignore
    dispatch(updateRequest({ id: requestId, changes: { [inputFieldName]: inputFieldValue } }));
  };

  const handleAddParse = () => {
    const parse = dispatch(addParse(createDefaultParse()));
    dispatch(updateRequest({ id: requestId, changes: { parses: [...parses, parse.payload.id] } }));
  };

  return (
    <>
      <p>Request</p>
      <form>
        <Input
          inputName="route"
          inputValue={route}
          inputPlaceholder="Add route"
          handleInputChange={handleInputChange}
        />
        <Select
          selectName="method"
          selectValue={method}
          selectOptions={HttpRequestMethods}
          handleSelectChange={handleInputChange}
        />
      </form>
      <p>Parses</p>
      <Button title="+" handleButtonClick={handleAddParse} />
      {parses.map((parseId) => (
        <Parse key={parseId} parseId={parseId} />
      ))}
    </>
  );
};
export default Request;
