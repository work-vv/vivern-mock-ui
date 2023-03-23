import InputField from "../../components/InputField";
import React, {useState} from "react";
import Button from "../../components/Button";
import {useAppDispatch} from "../../hooks";
import {addProject} from "../../store/projectSlice";
import { v4 as uuidv4 } from 'uuid';


const addProjectInitialState = {
  title: '',
  pathPrefix: '',
}

const CreateProject = () => {
  const dispatch = useAppDispatch();
  const [formInputData, setFormInputData] = useState(addProjectInitialState)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const inputFieldValue = e.target.value;
    const inputFieldName = e.target.name;
    const newInputValue = {...formInputData, [inputFieldName]: inputFieldValue}
    setFormInputData(newInputValue);
  }

  const handleFormSubmit =(e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    const {title, pathPrefix} = formInputData
    dispatch(addProject({id: uuidv4(), title, pathPrefix, projectVariables: []}))
    clearInputs()
  }

  const clearInputs = () => {
    setFormInputData(addProjectInitialState);
  };

  return <>
    <p>New Project</p>
    <InputField inputName="title" inputValue={formInputData.title} inputPlaceholder="Add project name"
                handleInputChange={handleInputChange}/>
    <InputField inputName="pathPrefix" inputValue={formInputData.pathPrefix} inputPlaceholder="Add global route e.g. api"
                handleInputChange={handleInputChange}/>
    <Button handleButtonClick={handleFormSubmit} />
  </>
}
export default CreateProject
