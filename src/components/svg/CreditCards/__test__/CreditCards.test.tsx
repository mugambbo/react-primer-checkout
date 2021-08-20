import React from 'react';
import { mount } from 'enzyme';
import Amex from '../Amex.svg';
import Diners from '../Diners.svg';
import Discover from '../Discover.svg';
import Generic from '../Generic.svg';
import Hipercard from '../Hipercard.svg';
import JCB from '../JCB.svg';
import Maestro from '../Maestro.svg';
import MasterCard from '../MasterCard.svg';
import UnionPay from '../UnionPay.svg';
import VerveCard from '../VerveCard.svg';
import VisaCard from '../VisaCard.svg';

describe("Renders all credit cards correctly", () => {
    it("Renders the American Express Icon", () => {
        const wrapper = mount(<Amex />);
        expect(wrapper).toMatchSnapshot();
    });

    it("Renders the Diners Icon", () => {
        const wrapper = mount(<Diners />);
        expect(wrapper).toMatchSnapshot();
    });
    
    it("Renders the Discover Card Icon", () => {
        const wrapper = mount(<Discover />);
        expect(wrapper).toMatchSnapshot();
    });
    
    it("Renders the Generic Icon", () => {
        const wrapper = mount(<Generic />);
        expect(wrapper).toMatchSnapshot();
    });
    
    it("Renders the Hipercard Icon", () => {
        const wrapper = mount(<Hipercard />);
        expect(wrapper).toMatchSnapshot();
    });
    
    it("Renders the JCB Icon", () => {
        const wrapper = mount(<JCB />);
        expect(wrapper).toMatchSnapshot();
    });
    
    it("Renders the Maestro Icon", () => {
        const wrapper = mount(<Maestro />);
        expect(wrapper).toMatchSnapshot();
    });
    
    it("Renders the MasterCard Icon", () => {
        const wrapper = mount(<MasterCard />);
        expect(wrapper).toMatchSnapshot();
    });
    
    it("Renders the UnionPay Icon", () => {
        const wrapper = mount(<UnionPay />);
        expect(wrapper).toMatchSnapshot();
    });
    
    it("Renders the VerveCard Icon", () => {
        const wrapper = mount(<VerveCard />);
        expect(wrapper).toMatchSnapshot();
    });
    
    it("Renders the VisaCard Icon", () => {
        const wrapper = mount(<VisaCard />);
        expect(wrapper).toMatchSnapshot();
    });
})