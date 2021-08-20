import React from 'react';
import { mount } from 'enzyme';
import CardName from '../CardName';

describe('<CardName />', () => {
    const onCardNameChange = jest.fn();

    test('renders the card name input', () => {    
        const loading = false;
        const cardName = "Abdulmajid";
        const component = mount(<CardName cardName={cardName} loading={loading} onCardNameChange={onCardNameChange} />);  
        expect(component).toMatchSnapshot();
    });

    test('renders the card name input: changed', () => {
        const loading = false;
        const cardName = "Abdulmajid";
        const wrapper = mount(<CardName cardName={cardName} loading={loading} onCardNameChange={onCardNameChange} />);  
        const cardNameInputComponent = wrapper.find("input").first();
        cardNameInputComponent.simulate('focus').simulate('change', { target: { value: cardName } });
        cardNameInputComponent.simulate('blur');
        const cardNameInputElement: React.ReactElement<HTMLInputElement>  = cardNameInputComponent.getElement();
        expect(cardNameInputElement.props.value).toEqual(cardName);
    });
});