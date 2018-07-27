import { expect } from 'chai';
import * as rp from 'request-promise';

const rpOptions = {
    // we don't want to follow redirects,
    // because that is the whole purpose of this test
    followRedirect: false,

    // include the full response object (which includes the
    // response code), not just the response body
    resolveWithFullResponse: true,

    // don't reject the promise on 301s.
    simple: false
};

async function test(): Promise<any> {
    const protocols = ['http', 'https'];
    const subdomains = ['www.', ''];
    const domains = ['nathanfriend.com', 'nathanfriend.io'];

    // test every combination of protocols, subdomains, and domains
    for (const protocol of protocols) {
        for (const subdomain of subdomains) {
            for (const domain of domains) {
                const url = `${protocol}://${subdomain}${domain}/`;
                const response = await rp.get(url, rpOptions);

                if (
                    protocol === 'https' &&
                    subdomain === '' &&
                    domain === 'nathanfriend.io'
                ) {
                    // if the URL is 'https://nathanfriend.io/', then
                    // we should just get back a 200
                    expect(response.statusCode).to.equal(200);
                } else {
                    // any other URL should return a 301
                    // with a redirection to 'https://nathanfriend.io/'
                    expect(response.statusCode).to.equal(301);
                    expect(response.headers.location).to.equal(
                        'https://nathanfriend.io/'
                    );
                }
            }
        }
    }
}

export default test();
