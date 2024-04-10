export const getMatch = async () => {
  try {
    const res = await fetch("/match", { method: "get" });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

export const postMatch = async () => {
  try {
    const res = await fetch("/match", { method: "post" });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};
