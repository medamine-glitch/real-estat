export async function getProperties() {
  const res = await fetch('http://localhost:8000/api/properties/');
  const items = await res.json();

  return (items)
}

export async function getProperty(id: number) {
  const res = await fetch(`http://localhost:8000/api/properties/${id}/`);
  const item = await res.json();

  return (item)
}

export async function getFeaturedProperties() {
  // const res = await fetch('http://localhost:8000/api/properties/featured/');
  const res = await fetch('http://localhost:8000/api/properties/');
  const items = await res.json();

  return (items)
}