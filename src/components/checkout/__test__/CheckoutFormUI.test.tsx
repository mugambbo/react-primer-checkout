import React from 'react';
import { shallow } from 'enzyme';
import CheckoutFormUI from '../CheckoutFormUI';
import { CardTypes } from '../../../helpers/CardTypes';

describe('<CheckoutFormUI />', () => {
    const onCardChange = jest.fn();
    const onCardNameChange = jest.fn();

    test('renders the checkout ui', () => {    
        const component = shallow(<CheckoutFormUI cardType={CardTypes.GENERIC} cardNumber="" cardExpiry="" cardCVC="" loading={false} cardName="" cardErrors={{}} cardNameError="" onCardNameChange={onCardNameChange} onCardChange={onCardChange} />);  
        expect(component).toMatchSnapshot();
    });
});