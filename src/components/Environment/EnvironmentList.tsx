import {normalizeConfig} from "../../services/normalizer";
import Environment from './Environment';

const EnvironmentList = () => {
  const environments: any[] = [];

  return (<div>
    Project Envs
    {environments.map(environmentId => <Environment key={environmentId} environmentId={environmentId}/>)}
  </div>)
}
export default EnvironmentList
