export const apiLogin = async (user: any) => {
  const res = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const apiRegister = async (user: any) => {
  console.log('working')
  const res = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Register failed');
  return data;
};

export const apiGoogleLogin = async (user: any) => {
  const res = await fetch('http://localhost:3000/auth/signInWithGoogle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Google login failed');
  return data;
};
