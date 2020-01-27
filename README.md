DEVELOPMENT LOG
---------------
MDH@27JAN2020
-------------
- changed port from default (3000) to 500 by prefixing PORT=5000 in front of react-scripts start in package.json
- proxy attribute in package.json is the automatic prefix to any backend request (fetch and axios[?]) so essentially you could also solve that by having a setting for that in .env.development (preferred?????)

- starting on login (auth) stuff i.e. connecting to the backend (web server) and having a session on there
* installed react-router-dom for setting up different front-end 'routes' (pages) [using exercise-ironbeers-auth]
