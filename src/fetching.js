const API_ENDPOINT = "https://witzapi.de/api/joke/";
const API_ENDPOINT_CATEGORY = "https://witzapi.de/api/category/";

export async function fetchJoke(category) {
  let url = API_ENDPOINT;

  if (category.length > 0) {
    url += "?category=" + category;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Witz konnte nicht geladen werden");
  }

  const data = await res.json();

  if (data.length === 0) {
    return null;
  }
  return data[0].text;
}

export async function fetchCategory() {
  const categoryResponse = await fetch(API_ENDPOINT_CATEGORY);

  if (!categoryResponse.ok) {
    throw new Error("Kategorien konnten nicht geladen werden");
  }

  const categories = await categoryResponse.json();

  return categories;
}
