import mixpanel from 'mixpanel-browser';
import Config from '../config';

mixpanel.init(Config.MIXPANEL_TOKEN);

function track(title: string, data: object){
    mixpanel.track(title, data);
}

const Analytics = {
    track
}

export const Events = {
    PAY: 'Pay',
    START: 'Start'
}

export default Analytics;