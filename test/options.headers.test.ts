import assert from 'assert/strict';
import urllib from '../src';
import { startServer } from './fixtures/server';

describe('options.headers.test.ts', () => {
  let close: any;
  let _url: string;
  beforeAll(async () => {
    const { closeServer, url } = await startServer();
    close = closeServer;
    _url = url;
  });

  afterAll(async () => {
    await close();
  });

  it('should auto set default user-agent and accept request headers', async () => {
    const { status, headers, data, url } = await urllib.request(_url, {
      dataType: 'json',
      headers: {
        'X-Upper-Case': 'orginal value',
      },
      timeout: [],
    });
    assert.equal(status, 200);
    assert.equal(headers['x-foo'], 'bar');
    assert.match(data.headers['user-agent'], /node-urllib\/3\.0\.0 Node\.js\//);
    assert.equal(data.headers['accept-encoding'], 'gzip, deflate');
    assert.equal(data.headers.connection, 'keep-alive');
    assert.equal(data.headers.accept, 'application/json');
    assert.equal(data.headers['x-upper-case'], 'orginal value');
    assert.equal(url, _url);
  });
});