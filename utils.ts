import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FormDataToObject = (formData: FormData) => {
  const obj: Record<string, any> = {};
  for (const [key, value] of Array.from(formData.entries())) {
    if (obj[key] === undefined) {
      // If the key doesn't exist in the object, set it to the value
      obj[key] = value;
    } else {
      // If the key already exists, convert it to an array if needed
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      obj[key].push(value);
    }
  }

  return obj;
};
