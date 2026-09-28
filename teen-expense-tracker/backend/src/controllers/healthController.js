export const getHealth = (_request, response) => {
  response.status(200).json({
    success: true,
    message: 'TeenSpend API is running',
    data: { status: 'ok' }
  });
};
