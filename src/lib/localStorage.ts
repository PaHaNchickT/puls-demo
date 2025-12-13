export const safeLocalGet = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);

    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (error) {
    console.error("LS get error", error);

    return fallback;
  }
};

export const safeLocalSet = (key: string, data: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("LS set error", error);
  }
};
