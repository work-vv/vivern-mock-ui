import {normalize, denormalize, schema} from 'normalizr';
import {v4 as uuidv4} from 'uuid';

export const parseEntity = new schema.Entity('parses');
export const requestEntity = new schema.Entity('requests', {
  parses: [parseEntity],
});
export const responseEntity = new schema.Entity('responses');
export const operationEntity = new schema.Entity('operations', {
  request: requestEntity,
  responses: [responseEntity]
});

export const projectEntity = new schema.Entity('projects', {
  operations: [operationEntity],
});

const transformConfig = (item: any, toId = true) => {
  const clonedItem = structuredClone(item);
  const transform = (clonedItem: any) => {
    if (clonedItem instanceof Array) {
      clonedItem.forEach((inner: any) => transform(inner))
    } else if (clonedItem instanceof Object) {
      if (toId) {
        clonedItem.id = clonedItem.id || uuidv4()
      } else {
        delete (clonedItem.id)
      }
      for (const key in clonedItem) {
        transform(clonedItem[key])
      }
    }
  }
  transform(clonedItem)

  return clonedItem
}

export const normalizeConfig = (input: any) => {
  const data = transformConfig(input)
  return normalize(data, projectEntity);
}

export const denormalizeConfig = (input: any, entities: any) => {
  const data = denormalize(input, projectEntity, entities);
  return transformConfig(data, false)
}
