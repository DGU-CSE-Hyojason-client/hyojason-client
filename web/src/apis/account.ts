export const login = async ({
  id,
  name,
  role,
}: {
  id: string;
  name: string;
  role: string;
}) => {
  try {
    const res = await fetch("/login", {
      method: "post",
      body: JSON.stringify({ id, name, role }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log("login error" + e);
  }
};

export const me = async () => {
  try {
    const res = await fetch("/me", {
      method: "get",
    });
    return await res.json();
  } catch (e) {
    console.log("login error" + e);
  }
};
