import mixpanel from 'mixpanel-browser';
import Config from '../config';

try {
    mixpanel.init(Config.MIXPANEL_TOKEN);
} catch(err) {
    console.error(err);
}

function track(title: string, data: object){
    try {
        mixpanel.track(title, data);
    } catch(err) {
        console.error(err);
    }
}

const Analytics = {
    track
}

export const Events = {
    PAY: 'Pay',
    START: 'Start'
}

export default Analytics;