import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

type Category =
  | "phones"
  | "laptops"
  | "cameras"
  | "books"
  | "clothing"
  | "shoes"
  | "watches"
  | "games"
  | "appliances"
  | "furniture"
  | "restaurants";

export function getKeywords(category: Category): string[] {
  switch (category) {
    case "phones":
      return [
        "price",
        "brand",
        "memory",
        "processor",
        "screen size",
        "camera",
        "battery",
        "OS",
        "connectivity",
        "color",
      ];
    case "laptops":
      return [
        "price",
        "brand",
        "memory",
        "processor",
        "screen size",
        "OS",
        "weight",
        "storage",
        "graphics",
        "battery life",
      ];
    case "cameras":
      return [
        "price",
        "brand",
        "sensor",
        "lens",
        "resolution",
        "zoom",
        "weight",
        "battery",
        "storage",
        "connectivity",
      ];
    case "books":
      return [
        "title",
        "author",
        "genre",
        "publisher",
        "language",
        "pages",
        "format",
        "ISBN",
        "publication date",
        "cover",
      ];
    case "clothing":
      return [
        "brand",
        "size",
        "color",
        "material",
        "gender",
        "style",
        "season",
        "occasion",
        "price",
        "care",
      ];
    case "shoes":
      return [
        "brand",
        "size",
        "color",
        "material",
        "gender",
        "style",
        "season",
        "occasion",
        "price",
        "comfort",
      ];
    case "watches":
      return [
        "brand",
        "material",
        "color",
        "style",
        "gender",
        "price",
        "water resistance",
        "movement",
        "features",
        "strap",
      ];
    case "games":
      return [
        "title",
        "genre",
        "platform",
        "developer",
        "publisher",
        "rating",
        "release date",
        "price",
        "multiplayer",
        "language",
      ];
    case "appliances":
      return [
        "brand",
        "type",
        "energy rating",
        "capacity",
        "price",
        "color",
        "weight",
        "dimensions",
        "features",
        "warranty",
      ];
    case "furniture":
      return [
        "type",
        "brand",
        "material",
        "color",
        "style",
        "price",
        "weight",
        "dimensions",
        "assembly required",
        "warranty",
      ];
    case "restaurants":
      return [
        "cuisine",
        "location",
        "price",
        "hours",
        "rating",
        "delivery",
        "takeout",
        "reservations",
        "parking",
        "alcohol",
      ];
    default:
      return [];
  }
}


