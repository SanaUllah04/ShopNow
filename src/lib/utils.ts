/**
 * Format a number as a currency string
 */
export function formatPrice(price: number, currency = "USD"): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(price);
}

/**
 * Truncate a string to a given length
 */
export function truncate(str: string, length: number): string {
    return str.length > length ? str.slice(0, length) + "..." : str;
}

/**
 * Generate a slug from a string
 */
export function slugify(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
