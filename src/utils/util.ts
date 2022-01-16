interface Result {
  success: boolean;
  data: any;
  errMsg?: string;
}

export const getResponseData = (data: any, errMsg?: string): Result => {
  if (errMsg) {
    return {
      success: false,
      data,
      errMsg,
    };
  } else {
    return {
      success: true,
      data,
    };
  }
};
