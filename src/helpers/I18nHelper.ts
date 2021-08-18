/**
 * Checks the browser navigator for the browser language
 * @returns The language code (e.g. en) of the browser
 */
export const getLanguage = function (): string {
    let nav = window.navigator, i, language: string;

    if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            if (language && language.length) {
                return language.split("-")[0];
            }
        }
    }

    if (nav.language && nav.language.length) {
        return nav.language.split("-")[0];
    }

    return 'en'; //Default language is english
};

export function formatString(text: string, args: {[id: string]: any} = {}): string {
    return text.replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] != 'undefined'? args[number]: match;
    });
}

const I18nHelper = {
    getLanguage,
    formatString
}

export default I18nHelper;