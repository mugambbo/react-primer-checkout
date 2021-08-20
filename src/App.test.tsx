import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from './App';
import { PaymentTokenizationResponse } from './helpers/PaymentToken';

describe("<App />", () => {
    it("Renders the App component", () => {
        const wrapper = mount(<App />);
        expect(wrapper).toMatchSnapshot();
    })
})