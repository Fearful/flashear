# flashear

This is the repository of [`flashear.app`](https://flashear.app), a decentralized social webapp.
Este es el repositorio de [`flashear.app`](https://flashear.app), una web app social decentralizada.

## Features tecnicas / Technical features:
- Typescript
- Cypress testing
- Sveltekit
- Svelte
- Gun db
- WebRTC
- i18n
- Tailwindcss
- PostCSS

Powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);

## Functionality list:
- ~~Encrypted one to one message channels with key generation per conversation~~
- ~~Automatic generated tags based on "#"~~
- ~~Automatic purge of posts after three hours~~ ?
- Automatic purge of any message that is reported
- Lists all relevant content on the homepage

## Developing/Desarrollo

Once you've downloaded the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

Una vez descargues el proyecto e instalado dependencias con 'npm install' (o 'pnpm install' o 'yarn'), inicie un servidor de desarrollo:

```bash
npm run dev # o yarn dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Testing

We can use the cypress app to manage, test and create new test scenarios.
Podemos usar la app de cypress para manejar, testear y crear nuevos escenarios de test.

```bash
npm run cypress # o yarn cypress
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Technical Debt

v 0.1

- mayor redesign for mobile, needs testing
- clean and repair ui in /my
- clean and repair ui in /chat
- refactor and delete repeating code
- fix flashing content on page transition on desktop


v 0.2

- add like functionality and remember it
- add report function, if the report sums more than 5/5 distribution in less than 100 votes, it will be propagated as null, if the votes are larger the ratio changes to 2/8
- add filters component to the grid that uses tha all page
- add counter to each tag to then use it to prioritize order
- agregar mas e2e tests


v 0.3

- service  worker that implements the decryption of messages when they arrive via push notifications
- clean css classes and make composite classes with tailwind
- agregar aun mas tests
