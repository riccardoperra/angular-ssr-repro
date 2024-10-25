Repro:

1. We are using the `providers` property of the CommonEngine to provide some configurations and methods (those should be called only during ssr render). Configurations could arrive from an internal fetch call, headers, cookies etc and we may prefer to read those only in `server.ts`.

2. In the 18-ssr app example, going to the /error page you can see that we're updating the status of the page imperatively. The real use case is doing that after an http call. During client routing we just update a signal in order to display a different template (e.g. resource not found etc.)

3. The provided tokens are **always** present in the application (during ssr only, of course). In order to let them available in the client, we could use transferState (is the approach in `app.config.ts` good?) 
The API_URL token must be available in both server and client and **must** be used in other app config providers/initializers.

---

I tried to reproduce those features in the 19-ssr app with the new engine. I may use the `request_context` token, but it's not always present. It seems that there are some times that it's always null, or maybe after a refresh it's evaluated.

It also seems that calling the `res.status` given via REQUEST_CONTEXT doesn't work, the status is not updated.