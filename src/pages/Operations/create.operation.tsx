import InputField from "../../components/InputField";
import Button from "../../components/Button";
import React, {useState} from "react";
import {useAppDispatch} from "../../hooks";
import {addOperation} from "../../store/projectSlice";
import {v4 as uuidv4} from "uuid";
import {HttpRequestMethods, ResponseBodyTypes} from "../../types";
import {useParams} from "react-router-dom";

const addOperationInitialState = {
  request: {
    route: '/',
    method: HttpRequestMethods.GET,
    parses: []
  },
  responses: [
    {
      body: {
        type: ResponseBodyTypes.INLINE,
        value: ''
      },
      status: 200
    }
  ]
}

const CreateOperation = () => {
  const [formInputData, setFormInputData] = useState(addOperationInitialState)
  const {projectId} = useParams<{ projectId: string }>();
  const [parentProjectId] = useState(projectId)
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const inputFieldValue = e.target.value;
    const inputFieldName = e.target.name;
    const newInputValue = {...formInputData, [inputFieldName]: inputFieldValue}
    setFormInputData(newInputValue);
  }

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addOperation({
        projectId: parentProjectId as string,
        id: uuidv4()
      }
    ))
    clearInputs()
  }

  const clearInputs = () => {
    setFormInputData(addOperationInitialState);
  };
  return <>
    <p>New Operation</p>
    <p>Request</p>
    <InputField inputName="route" inputValue={formInputData.request.route}
                inputPlaceholder="Add route"
                handleInputChange={handleInputChange}/>
    <InputField inputName="method" inputValue={formInputData.request.method} inputPlaceholder="Add method"
                handleInputChange={handleInputChange}/>
    <Button handleButtonClick={handleFormSubmit}/>
    <p>Response</p>
    <InputField inputName="bodyType" inputValue={formInputData.responses[0].body.type}
                inputPlaceholder="Add body type"
                handleInputChange={handleInputChange}/>
    <InputField inputName="value" inputValue={formInputData.responses[0].body.value} inputPlaceholder="Add body value"
                handleInputChange={handleInputChange}/>
    <Button handleButtonClick={handleFormSubmit}/>
  </>
}
export default CreateOperation
