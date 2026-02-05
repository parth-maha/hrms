export function encryptString(text: string): string {
	return btoa(encodeURIComponent(text));
}

export function decryptString(encoded: string): string {
	try {
		return decodeURIComponent(atob(encoded));
	} catch {
		return "";
	}
}