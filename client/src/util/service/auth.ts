import { Register } from '../../interfaces/register';

export default {
  register: async (data: Register) => {
    const payload = {
      name: data.parentName,
      email: data.familyEmail,
      password: data.familyPassword
    }
    let response;
    let error;
    try { 
      response =  await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.status === 200) {
        return response.json();
      } else {
        error = await response.json();
        return Promise.reject(error)
      }
    } catch(err) {
      // #TODO - use generic hard stop modal to stop user from advancing
      console.log('err', 'Something went wrong. Please try again.')
    }
  }
}