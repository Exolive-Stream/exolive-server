
const errorsMap = {
  USER_EXIST: "User already exists",
}

export const ResponseError = (data) => ({
  data,
  status: 0,
});

export const parseError = (errorId) => {
  const error = errorsMap[errorId];

  if (!error) {
    console.error('Error ID not found: ', errorId);
    return "An error occurred. Please try again.";
  } 
  return error;
}

export const validateEmail = (email) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}