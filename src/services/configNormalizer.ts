import {normalize, denormalize, schema} from 'normalizr';
import data from '../test.json';

export const parseEntity = new schema.Entity('parses', {});
export const requestEntity = new schema.Entity('requests', {
    parses: parseEntity,
});
export const responseEntity = new schema.Entity('responses', {
    parses: parseEntity,
});
export const operationEntity = new schema.Entity('operations', {
    request: requestEntity,
    responses: [responseEntity]
});

export const projectEntity = new schema.Entity('projects', {
    operations: [operationEntity],
});


export const normalizeConfig = () => {
     const config = normalize(data, projectEntity);
     console.log(config);
}

const denormalizeConfig = (input: string[], entities: any) => {
    return denormalize(input, projectEntity, entities );
}
