import { Before } from '@wdio/cucumber-framework';
import { config } from '../wdio.conf';

//you can add Base URL and then declare the path here But as i have only a URI given am declaring as baseurl
    Before(async () => {
        await browser.deleteAllCookies();
        await browser.maximizeWindow();
        await browser.url(config.baseUrl as string);
    });



