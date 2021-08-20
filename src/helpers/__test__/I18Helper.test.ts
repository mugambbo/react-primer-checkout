import enzyme from 'enzyme';
import I18nHelper from '../I18nHelper';

describe('I18Helper: getLanguage', () => {
    
    let languageGetter: jest.SpyInstance;
    let languagesGetter: jest.SpyInstance;
    beforeEach(() => {
        languageGetter = jest.spyOn(window.navigator, 'language', 'get');
        languagesGetter = jest.spyOn(window.navigator, 'languages', 'get');
    });

    it('Returns the current browser language', () => {
        languagesGetter.mockReturnValue([]);
        languageGetter.mockReturnValue('de-GB');
        const lang = I18nHelper.getLanguage();
        expect(lang).toEqual('de');
    });

    it('Returns "en" as the browser language when language and languages are empty', () => {
        languagesGetter.mockReturnValue([]);
        languageGetter.mockReturnValue('');
        const lang = I18nHelper.getLanguage();
        expect(lang).toEqual('en');
    });
});