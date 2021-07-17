export class ErrorsConst {
  static readonly REQUEST_ERRORS: any = {
    '400': {
      code: 'BAD_REQUEST',
      name: 'BadRequest',
      message: 'Bad request.'
    },
    '401': {
      code: 'UNAUTHORIZED',
      name: 'Unauthorized',
      message: 'No authorization token was found.'
    },
    '403': {
      code: 'FORBIDDEN',
      name: 'Forbidden',
      message: 'You don\'t have permission to access this resource.'
    },
    '404': {
      code: 'NOT_FOUND',
      name: 'NotFound',
      message: 'The resource you requested was not found.'
    },
    '409': {
      code: 'CONFLICT',
      name: 'Conflict',
      message: 'Missing param'
    },
    '410': {
      code: 'GONE',
      name: 'Gone',
      message: 'Indicates that the resource requested is no longer available and will not be available again'
    },
    '413': {
      code: 'PAYLOAD_TOO_LARGE',
      name: 'PayloadTooLarge',
      message: 'The request is larger than the server is willing or able to process'
    },
    '422': {
      code: 'UNPROCESSABLE_ENTITY',
      name: 'UnprocessableEntity',
      message: `Unprocessable Entity response is when a request was well-formed, `
        + `but the server could not follow the request due to semantic errors within the request.`
    },
    '500': {
      code: 'SERVER_ERROR',
      name: 'ServerError',
      message: 'Internal server error.'
    }
  };

  static readonly SERVER_ERRORS: string[] = [
    'EvalError',
    'InternalError',
    'RangeError',
    'ReferenceError',
    'SyntaxError',
    'TypeError',
    'URIError'
  ];

  static readonly RESPONSE_ERRORS: { [code: string]: string } = {
    ERROR_CREDENTIAL_INVALID: 'Username or password is not correct'
  };
}
