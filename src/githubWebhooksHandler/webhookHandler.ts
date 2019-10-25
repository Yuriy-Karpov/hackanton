import createHandler from 'github-webhook-handler';

export const RunHandler = (token: string, endpoint: string): any => {
    const hndlr = createHandler({path: endpoint, secret: token});

    hndlr.on('error', function (err) {
        console.error('Error:', err.message)
    });

    hndlr.on('push', function (event) {
        console.log('Received a push event for %s to %s',
            event.payload.repository.name,
            event.payload.ref)
    });

    hndlr.on('pull_request', function (event) {
        console.log('Received a new pull request action %s to %s',
            event.payload.repository.name,
            event.payload.action);

    });

    hndlr.on('issues', function (event) {
        console.log('Received an issue event for %s action=%s: #%d %s',
            event.payload.repository.name,
            event.payload.action,
            event.payload.issue.number,
            event.payload.issue.title)
    });
    return hndlr;
};

