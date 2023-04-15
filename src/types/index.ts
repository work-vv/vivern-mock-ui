type ISample = {
  type: string
  args: never[]
}

type IParse = {
  name: string
  path: string | null
  sample: ISample
}

type IProject = {
  id: string
  title: string
  pathPrefix: string
  description?: string
  projectVariables: string[]
  operations: IOperation[]
}

type IOperation = {

  id: string
  projectId: string
  request: IOperationRequest
  requestTaskGroups: ITaskGroup[]
  responses: IOperationResponse[]
  operationTaskGroups: ITaskGroup[]
}

type ITaskGroup = {
  operationId: string
  type: string
  tasks: ITask[]
}

type ITask = {
  type: string
  parses: IParse[]
}

type IHttpRequestTask = ITask & {
  host: string
  route: string
  method: string
  body: string
}

type IOperationRequest = {
  id: string
  route: string
  method: HttpRequestMethods
  parses: IParse[]
}

type IOperationResponse = {
  id: string
  body: {
    type: string
    value: string
  }
  status: number
}

enum HttpRequestMethods {
  'GET' = 'GET',
  'POST' = "POST",
  'PUT' = "PUT",
  'PATCH' = "PATCH",
  'DELETE' = 'DELETE'
}

enum ResponseBodyTypes {
  'INLINE' = 'INLINE',
  'FILE' = 'FILE'
}

export type {
  IParse,
  ISample,
  IProject,
  IOperation,
  IOperationRequest,
  IOperationResponse,
  ITaskGroup,
  ITask,
  IHttpRequestTask,
}

export {HttpRequestMethods, ResponseBodyTypes}
