export function applyFilters<T>(
  data: T[],
  filters: Partial<Record<keyof T, string>>
): T[] {
  return data.filter((item) =>
    (Object.entries(filters) as [keyof T, string | undefined][]).every(
      ([key, value]) =>
        value
          ? String(item[key]).toLowerCase().includes(value.toLowerCase())
          : true
    )
  );
}
