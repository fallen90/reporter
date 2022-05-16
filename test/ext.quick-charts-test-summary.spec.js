const { mock } = require('pactum');
const assert = require('assert');
const { publish } = require('../src');

describe('extensions - quick-charts-test-summary', () => {

  it('should send test-summary with links to teams', async () => {
    const id = mock.addInteraction('post test-summary to teams with qc-test-summary');
    await publish({
      config: {
        "reports": [
          {
            "targets": [
              {
                "name": "teams",
                "inputs": {
                  "url": "http://localhost:9393/message"
                },
                "extensions": [
                  {
                    "name": "quick-charts-test-summary"
                  }
                ]
              }
            ],
            "results": [
              {
                "type": "testng",
                "files": [
                  "test/data/testng/single-suite-failures.xml"
                ]
              }
            ]
          }
        ]
      }
    });
    assert.equal(mock.getInteraction(id).exercised, true);
  });

  it('should send test-summary with links to slack', async () => {
    const id = mock.addInteraction('post test-summary to slack with qc-test-summary');
    await publish({
      config: {
        "reports": [
          {
            "targets": [
              {
                "name": "slack",
                "inputs": {
                  "url": "http://localhost:9393/message"
                },
                "extensions": [
                  {
                    "name": "quick-charts-test-summary"
                  }
                ]
              }
            ],
            "results": [
              {
                "type": "testng",
                "files": [
                  "test/data/testng/single-suite-failures.xml"
                ]
              }
            ]
          }
        ]
      }
    });
    assert.equal(mock.getInteraction(id).exercised, true);
  });

  afterEach(() => {
    mock.clearInteractions();
  });

});