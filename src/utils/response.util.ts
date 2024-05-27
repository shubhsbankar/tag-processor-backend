export const formatResponse = (verificationResult: any): any => {
    const { isValid, points, message } = verificationResult;
    let result;
  
    if (isValid) {
      if (points >= 15) {
        result = { status: 'Authenticated', score: points, security: 'High', message: 'Product is authentic' };
      } else if (points >= 10) {
        result = { status: 'Authenticated', score: points, security: 'Moderate', message: 'Product is likely authentic' };
      } else if (points >= 5) {
        result = { status: 'Authenticated', score: points, security: 'Low', message: 'Product is somewhat authentic' };
      } else {
        result = { status: 'Authenticated', score: points, security: 'Very Low', message: 'Product is marginally authentic' };
      }
    } else {
      result = { status: 'Not Authenticated', score: points, message };
    }
  
    return result;
  };
  