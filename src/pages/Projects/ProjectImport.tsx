import { useNavigate } from 'react-router-dom';
import Input from '../../components/Form/Input';
import React, { useState } from 'react';
import Button from '../../components/Button';
import { useAppDispatch } from '../../hooks';
import Title from '../../components/Title';

const addImportInitialState = {
  url: '',
};

const ProjectImport = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formInputData, setFormInputData] = useState(addImportInitialState);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputFieldValue = e.target.value;
    const inputFieldName = e.target.name;
    const newInputValue = { ...formInputData, [inputFieldName]: inputFieldValue };
    setFormInputData(newInputValue);
  };

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { url } = formInputData;
    clearInputs();
    navigate('/projects');
  };

  const clearInputs = () => {
    setFormInputData(addImportInitialState);
  };

  return (
    <section className="container">
      <Title title="Import a Project" />
      <form className="project-form form">
        <div className="form__group">
          <Input
            inputName="url"
            inputValue={formInputData.url}
            inputPlaceholder="Add server url"
            handleInputChange={handleInputChange}
          />
        </div>
        <Button title="Submit" handleButtonClick={handleFormSubmit} />
      </form>
    </section>
  );
};
export default ProjectImport;
