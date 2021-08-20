import React from 'react';
import { mount } from 'enzyme';
import CardField from '../CardField';
import { CardTypes } from '../../../helpers/CardTypes';
import { act } from 'react-dom/test-utils';

describe('<CardField />', () => {
    const onCardChange = jest.fn();

    test('renders the card field input', () => {    
        const component = mount(<CardField cardType={CardTypes.GENERIC} cardNumber="" cardExpiry="" cardCVC="" loading={false} onCardChange={onCardChange} />);  
        expect(component).toMatchSnapshot();
    });

    test('renders the card field input on changed', () => {
        const loading = false;
        const cardNumber = "1212121212121212";
        const cardExpiry = "0330";
        const cardCVC = "345";
        const wrapper = mount(<CardField cardType={CardTypes.GENERIC} cardNumber={cardNumber} cardExpiry={cardExpiry} cardCVC={cardCVC} loading={loading} onCardChange={onCardChange} />);
        const cardNumberInput = wrapper.find("input").at(0).first();
        const cardExpiryInput = wrapper.find("input").at(1).first();
        const cardCVCInput = wrapper.find("input").at(2).first();
        cardNumberInput.simulate('focus').simulate('change', { target: { value: cardNumber } });
        cardExpiryInput.simulate('focus').simulate('change', { target: { value: cardExpiry } });
        cardCVCInput.simulate('focus').simulate('change', { target: { value: cardCVC } });
        cardCVCInput.simulate('blur');
     
        expect(cardNumberInput.getElement().props.value).toEqual(cardNumber);
        expect(cardExpiryInput.getElement().props.value).toEqual(cardExpiry);
        expect(cardCVCInput.getElement().props.value).toEqual(cardCVC);
        expect(onCardChange).toBeCalledTimes(3);
    });
});

describe('<CardField />: Window Change Small', () => {

    const onCardChange = jest.fn();
    let defaultWidth: number;

    beforeEach(() => {
        // Change the viewport to 500px.
        act(() => {
            defaultWidth = global.innerWidth;
            global.innerWidth = 480;
            // Trigger the window resize event.
            global.dispatchEvent(new Event('resize'));
        })
    })

    afterEach(() => {
        global.innerWidth = defaultWidth;
    })

    test('Render the card field component on window change', async () => {

        const container = document.createElement("div");
        document.body.appendChild(container);

        const loading = false;
        const cardNumber = "1212121212121212";
        const cardExpiry = "0330";
        const cardCVC = "345";
        await act(async () => {
            mount(<CardField cardType={CardTypes.GENERIC} cardNumber={cardNumber} cardExpiry={cardExpiry} cardCVC={cardCVC} loading={loading} onCardChange={onCardChange} />, { attachTo: container});
        });

        const cardFieldInput = container.querySelectorAll("input");
        expect(cardFieldInput.length).toEqual(3);
    })
})

describe('<CardField />: Window Change Large', () => {

    const onCardChange = jest.fn();
    let defaultWidth: number;

    beforeEach(() => {
        // Change the viewport to 500px.
        act(() => {
            defaultWidth = global.innerWidth;
            global.innerWidth = 1200;
            // Trigger the window resize event.
            global.dispatchEvent(new Event('resize'));
        })
    })

    afterEach(() => {
        global.innerWidth = defaultWidth;
    })

    test('Render the card field component on window change', async () => {

        const container = document.createElement("div");
        document.body.appendChild(container);

        const loading = false;
        const cardNumber = "1212121212121212";
        const cardExpiry = "0330";
        const cardCVC = "345";
        await act(async () => {
            mount(<CardField cardType={CardTypes.GENERIC} cardNumber={cardNumber} cardExpiry={cardExpiry} cardCVC={cardCVC} loading={loading} onCardChange={onCardChange} />, { attachTo: container});
        });
        // const cardFieldInputs = wrapper?.find("input");

        const cardFieldInput = container.querySelectorAll("input");
        expect(cardFieldInput.length).toEqual(3);
    })
})