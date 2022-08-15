export const getLocationUrl = (params: Record<string, string | null>) => {
  const queryParams = new URLSearchParams();

  for (const param in params) {
    const key = param;
    const value = params[param];

    if (value) {
      queryParams.set(key, value);
    }
  }

  return "/collection?" + queryParams.toString();
};

export const getSubjectUrl = (subject: string) => {
  const queryParams = new URLSearchParams();

  queryParams.set("subjects", subject);

  return "/collection?" + queryParams.toString();
};
