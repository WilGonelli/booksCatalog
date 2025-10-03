const baseUrl = "http://localhost:8081";
export async function getData() {
  try {
    const response = await fetch(`${baseUrl}/books`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

export async function insertBook({ book }) {
  const formData = new FormData();
  formData.append("title", book.title);
  formData.append("autor", book.autor);
  formData.append("publish_date", book.publishDate);
  formData.append("description", book.description);
  formData.append("image", book.image, book.image.name);

  return fetch(`${baseUrl}/book`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Nok");
      }
      return response.json();
    })
    .then((data) => {
      // console.log("Success:", data);
    })
    .catch((error) => {
      // console.error("Error:", error);
    });
}

export async function deleteBook({ id }) {
  return fetch(`${baseUrl}/book/${id}`, {
    method: "DELETE",
  });
}

export async function updateBook({ id, book }) {
  console.log(id, book);
  const formData = new FormData();
  formData.append("title", book.title);
  formData.append("autor", book.autor);
  formData.append("publish_date", book.publishDate);
  formData.append("description", book.description);
  book.image && formData.append("image", book.image, book.image.name);

  return fetch(`${baseUrl}/book/${id}`, {
    method: "PUT",
    body: formData,
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Nok2");
      }
      return response;
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
