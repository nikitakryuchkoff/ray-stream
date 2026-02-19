type ClassNamePrimitive = string | number | boolean | null | undefined;
type ClassNameObject = Record<string, boolean | null | undefined>;
type ClassNameValue = ClassNamePrimitive | ClassNameObject | ClassNameValue[];

const classNames = (...values: ClassNameValue[]): string =>
  values
    .flatMap((value) => {
      if (!value) return [];

      if (typeof value === "string" || typeof value === "number") {
        return [String(value)];
      }

      if (Array.isArray(value)) {
        return classNames(...value).split(" ").filter(Boolean);
      }

      if (typeof value === "object") {
        return Object.entries(value)
          .filter(([, isEnabled]) => Boolean(isEnabled))
          .map(([className]) => className);
      }

      return [];
    })
    .join(" ");

export { classNames };
