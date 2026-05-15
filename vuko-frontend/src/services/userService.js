export async function userAdvice(token) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/advice`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    }
  );
  const result = await response.json();
  return result;
}

export async function userUpdate(token, newCareer) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/update`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ career: newCareer }),
      }
    );
    return response;
  } catch {
    return { ok: false, msg: "Error de conexión" };
  }
}

export async function userDelete(token) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/delete`,
      {
        method: "DELETE",
        headers: { "x-auth-token": token },
      }
    );
    return response;
  } catch {
    return { ok: false, msg: "Error de conexión" };
  }
}

export async function registerUser(name, email, password, career) {
  if (typeof name !== "string") throw new Error("name is not a string");
  if (name.length < 1) throw new Error("name length is lower than 1");

  if (typeof email !== "string") throw new Error("email is not a string");
  if (email.length < 6) throw new Error("email length is lower than 6");

  if (typeof career !== "string") throw new Error("career is not a string");
  if (career.length < 1) throw new Error("career length is lower than 1");

  if (typeof password !== "string") throw new Error("password is not string");
  if (password.length < 4) throw new Error("password length is lower than 4");

  return fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, career }),
  })
    .catch(() => {
      throw new Error("conection error");
    })
    .then((res) => {
      if (res.ok) return res;

      return res
        .json()
        .catch(() => {
          throw new Error("json parse error");
        })
        .then((body) => {
          const { message } = body;
          throw new Error(message);
        });
    });
}