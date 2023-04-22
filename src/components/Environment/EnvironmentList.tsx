import {normalizeConfig} from "../../services/configNormalizer";
import Environment from './Environment';

const EnvironmentList = () => {
  const environments: any[] = [];
  normalizeConfig();

  return (<div>
    Project Envs
    {environments.map(environmentId => <Environment key={environmentId} environmentId={environmentId}/>)}
  </div>)
}
export default EnvironmentList
