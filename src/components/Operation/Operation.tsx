import './operation.scss';
import Request from './Request';
import Response from './Response';
import React, { useState } from 'react';
import Button from '../Button';

enum Tabs {
  'REQUEST' = 'REQUEST',
  'RESPONSE' = 'RESPONSE',
}

type OperationProps = {
  operation: { request: string; responses: string[] };
};

const Operation = ({ operation }: OperationProps) => {
  const [selectedTab, setSelectedTab] = useState(Tabs.REQUEST);
  const { request, responses } = operation;

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // @ts-ignore
    setSelectedTab(e.target.innerText);
  };

  const requestTab = <Request requestId={request} />;
  const responsesTab = responses.map((responseId) => <Response key={responseId} responseId={responseId} />);
  const content = selectedTab === Tabs.REQUEST ? requestTab : responsesTab;

  return (
    <div>
      <div className="tab">
        <Button title={Tabs.REQUEST} handleButtonClick={handleTabClick} />
        <Button title={Tabs.RESPONSE} handleButtonClick={handleTabClick} />
      </div>
      <div className="tabcontent">{content}</div>
    </div>
  );
};
export default Operation;
