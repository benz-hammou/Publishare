export async function fetchAPI(url, options) {
  const token = localStorage.getItem("token");
  console.log(options);
  const response = await fetch(url, {
    ...options,
    
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      } else {
        if (res.status === 204) {
          return;
        }
        return res.json().then((responseBody) => {
          return responseBody;
        });
      }
    })
    .catch((error) => {
      throw error;
    });

  return await response;
}
