const baseUrl = "http://localhost:8080";
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
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function deleteBook({ id }) {
  console.log(id);
  return fetch(`${baseUrl}/book/${id}`, {
    method: "DELETE",
  });
}
