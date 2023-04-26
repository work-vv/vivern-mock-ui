import { useNavigate } from 'react-router-dom';
import Input from '../../components/Form/Input';
import React, { useState } from 'react';
import Button from '../../components/Button';
import { useAppDispatch } from '../../hooks';
import { addProject } from '../../store/slices/projectSlice';
import { v4 as uuidv4 } from 'uuid';
import Title from '../../components/Title';
import Textarea from '../../components/Form/Textarea';
import './project.scss';

const addProjectInitialState = {
  title: '',
  description: '',
  pathPrefix: '',
};

const ProjectForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formInputData, setFormInputData] = useState(addProjectInitialState);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputFieldValue = e.target.value;
    const inputFieldName = e.target.name;
    const newInputValue = {
      ...formInputData,
      [inputFieldName]: inputFieldValue,
    };
    setFormInputData(newInputValue);
  };

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { title, pathPrefix, description } = formInputData;
    dispatch(
      addProject({
        id: uuidv4(),
        title,
        pathPrefix,
        description,
        projectVariables: [],
        operations: [],
      }),
    );
    clearInputs();
    navigate('/projects');
  };

  const clearInputs = () => {
    setFormInputData(addProjectInitialState);
  };

  return (
    <section className="container">
      <form className="create-project__form">
        <Title title="Create a Project" />
        <div className="form__group">
          <Input
            inputName="title"
            inputValue={formInputData.title}
            inputPlaceholder="Add project title"
            handleInputChange={handleInputChange}
          />
          <Input
            inputName="pathPrefix"
            inputValue={formInputData.pathPrefix}
            inputPlaceholder="Add global route e.g. api"
            handleInputChange={handleInputChange}
          />
          <Textarea
            textareaName="description"
            textareaValue={formInputData.description}
            textareaPlaceholder="Add project description"
            handleTextareaChange={handleInputChange}
          />
        </div>
        <Button title="Submit" handleButtonClick={handleFormSubmit} />
      </form>
    </section>
  );
};
export default ProjectForm;
