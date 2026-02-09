// Email Regex
const emailRegex = /^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/;
const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[^\s]*)?$/i;
// Will return true if no email provided or is valid email
const isValidEmail = (email: string | null): boolean => {
	if (!email) return true;
	return emailRegex.test(email);
};

const isValidUrl = (url: string | null): boolean => {
	if (!url) return true;
	return urlRegex.test(url);
};

const isValidDateRange = (
	value: [Date | null, Date | null] | null | undefined
): boolean => {
	if (!value || !value[0] || !value[1]) {
		return false;
	}
	return true;
};

export const isValidNumber = (
	value: number,
	mustBeInt: boolean,
	minValue?: number,
	maxValue?: number
): boolean => {
	if (value && value.toString().includes(" ")) {
		return false;
	}
	minValue = minValue === 0 ? 0 : minValue;
	return !(
		(mustBeInt && value && value.toString().includes(".")) ||
		Number.isNaN(value) ||
		(minValue && value < minValue) ||
		(maxValue && maxValue < value)
	);
};

// returns true if url is valid
export const isValidHttpUrl = (urlString: string): boolean => {
	let url: URL;
	try {
		url = new URL(urlString);
	} catch {
		return false;
	}
	return url.protocol === "http:" || url.protocol === "https:";
};

export function isValidPANNo(number: string): boolean {
	const Regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
	return Regex.test(number);
}
export {
	isValidDateRange,
	emailRegex,
	isValidEmail,
	isValidUrl,
};