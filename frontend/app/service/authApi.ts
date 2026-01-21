
export const login = async (user:any ) => {
    console.log(user)

const response = await fetch('http://localhost:3000/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
      return response.json()  
};

export const register = async (user:any ) => {
    console.log(user)

const response = await fetch('http://localhost:3000/auth/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
      return response.json()  
};

export const siginwithgoogle = async (user:any ) => {
    console.log(user)

const response = await fetch('http://localhost:3000/auth/signInWithGoogle', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
      return response.json()  
};