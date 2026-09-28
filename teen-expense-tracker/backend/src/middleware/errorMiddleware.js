export const notFoundHandler = (request, response) => {
  response.status(404).json({
    success: false,
    message: `Route ${request.method} ${request.originalUrl} was not found`,
    error: 'NOT_FOUND'
  });
};

export const errorHandler = (error, _request, response, _next) => {
  console.error(error);
  const status = error.statusCode || 500;
  response.status(status).json({
    success: false,
    message: status >= 500 ? 'Something went wrong. Please try again.' : error.message,
    error: error.code || 'INTERNAL_SERVER_ERROR'
  });
};
