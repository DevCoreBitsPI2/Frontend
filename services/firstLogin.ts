export const checkFirstLogin = async (id: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

  const res = await fetch(`${apiUrl}/employees/firstTimeSetup/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Error verificando primer login" + JSON.stringify(data));
  }


  return data;
};
