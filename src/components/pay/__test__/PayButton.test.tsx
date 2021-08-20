import React from 'react';
import { shallow, mount } from 'enzyme';
import PayButton from '../PayButton';

describe('<PayButton />', () => {
    test('renders the pay button: default', () => {
        const loading = false;
        const component = shallow(<PayButton loading={loading} />);  
        expect(component).toMatchSnapshot();
    });

    test('renders the pay button: loading', () => {
        const loading = true;
        const component = shallow(<PayButton loading={loading} />);  
        expect(component).toMatchSnapshot();
    });

    test('Displays the pay button correctly', () => {
        const loading = false;
        const amount = 50;
        const currency = "$";
        const wrapper = shallow(<PayButton amount={amount} currency={currency} loading={loading} />);  
        const text = wrapper.find("button").first().text();
        expect(text).toEqual(`PAY ${currency}${amount}`);
    });

    test('Displays the image beside pay button correctly', () => {
        const loading = false;
        const expectedImageSrc = "https://react-checkout-primer.com/logo.png";
        const wrapper = shallow(<PayButton btnStyles={{logoSrc: expectedImageSrc}} loading={loading} />);  
        const actualImageSrc = wrapper.find("img").first().prop("src");
        expect(actualImageSrc).toEqual(expectedImageSrc);
    });
});