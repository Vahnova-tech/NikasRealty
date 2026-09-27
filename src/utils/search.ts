/** Normalize text so property search is case-insensitive and punctuation-tolerant. */
export const normalizeSearchText = (value?: string | number | null): string =>
  String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

type SearchableProperty = {
  title?: string;
  location?: string;
  description?: string;
  type?: string;
  status?: string;
  amenities?: string[];
  features?: string[];
};

export const propertyMatchesSearch = (
  property: SearchableProperty,
  query: string
): boolean => {
  const tokens = normalizeSearchText(query).split(" ").filter(Boolean);
  if (tokens.length === 0) return true;

  const haystack = normalizeSearchText(
    [
      property.title,
      property.location,
      property.description,
      property.type,
      property.status,
      ...(property.amenities || []),
      ...(property.features || []),
    ].join(" ")
  );

  return tokens.every((token) => haystack.includes(token));
};

export const equalsIgnoreCase = (a?: string | null, b?: string | null): boolean =>
  normalizeSearchText(a) === normalizeSearchText(b);

export const includesIgnoreCase = (value?: string | null, query?: string | null): boolean => {
  const haystack = normalizeSearchText(value);
  const needle = normalizeSearchText(query);
  if (!needle) return true;
  return haystack.includes(needle);
};
