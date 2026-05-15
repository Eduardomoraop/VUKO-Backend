
export async function userAdvice(token, setAdvice, Swal){
       try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/advice`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token
            }                
          });
          const result = await response.json();
          if (response.ok) {
            setAdvice(result.msg);
          } else {
            Swal.fire({
              title: 'Error de la IA',
              text: result.msg || 'No pudimos conectar con el asesor en este momento',
              icon: 'error',
              confirmButtonColor: '#dc3545'
            });
          }
        } catch {
          Swal.fire({
            title: 'Fallo de conexión',
            text: 'Revisa tu conexión o intenta mas tarde. VUKO esta fuera de linea',
            icon: 'error',
            confirmButtonColor: '#dc3545'
          })
        }
}


export async function userUpdate(token, newCareer, setNewCareer, Swal ){
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/update`, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
              'x-auth-token': token
            }, 
            body: JSON.stringify({ career: newCareer })
          });
          if (response.ok) {
            Swal.fire({
              title: '¡Genial!',
              text: 'Tu profesión se actualizó correctamente 💪',
              icon: 'success',
              confirmButtonColor:'#007bff',
              timer: 3000
            });
            setNewCareer("");
          } else {
            Swal.fire({
              title: '¡Alerta!',
              text: 'No se pudo actualizar la profesión',
              icon: 'error',
              confirmButtonColor: '#dc3545'
            });
          }
        } catch {
          Swal.fire('Error', 'Hubo un fallo de conexión ❌', 'error'); 
        }
}

export async function userDelete(token, Swal, navigate ){
    try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/delete`, {
            method: 'DELETE',
            headers: { 'x-auth-token': token }
          });
          if (response.ok) {
            Swal.fire('Eliminado', 'Tu cuenta ha sido borrada.', 'success');
            localStorage.removeItem('token');
            navigate('/');
          }
        } catch {
          Swal.fire('Error', 'No pudimos borrar la cuenta', 'error');
        }
}

export async function registerUser(name,email,password, career){
  if (typeof name !== 'string') throw new Error('name is not a string')
    if (name.length < 1) throw new Error('name length is lower than 1')

    if (typeof email !== 'string') throw new Error('email is not a string')
    if (email.length < 6) throw new Error('email length is lower than 6')

    if (typeof name !== 'string') throw new Error('username is not a string')
    if (name.length < 4) throw new Error('username length is lower than 4')

    if (typeof password !== 'string') throw new Error('password is not string')
    if (password.length < 4) throw new Error('password length is lower than 4')
console.log(import.meta.env.VITE_API_URL)
    return fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email,  password, career })
    })
        .catch(error => { throw new Error('conection error') })
        .then(res => {
            if (res.ok)
                return

            return res.json()
                .catch(error => { throw new Error('json parse error')})
                .then(body => {
                    const { message } = body
                    
                    throw new Error(message)
                })
        })
}