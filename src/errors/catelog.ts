export enum ErrorTypes {
  NotFound = 'NotFound',
  InvalidId = 'InvalidId',
  EmptyBody = 'EmptyBody',
}

type ErrorResponseObject = {
  message: string;
  httpStatus: number;
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject;
};

export const errorCatalog: ErrorCatalog = {
  NotFound: {
    message: 'Object not found',
    httpStatus: 404,
  },
  InvalidId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  EmptyBody: {
    message: 'Request body is empty',
    httpStatus: 400,
  },
};
