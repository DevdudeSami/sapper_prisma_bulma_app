# sapper_prisma_bulma_app
A wrapper to quickly start a [Sapper](https://sapper.svelte.dev) web app, with a [Prisma](https://www.prisma.io) database (with a [GraphQL](https://graphql.org) API), and the [Bulma](http://bulma.io) UI framework.

## Getting started

1. Clone this repo: `npx degit https://github.com/DevdudeSami/sapper_prisma_bulma_app.git myApp`
2. `cd myApp`
3. Run sapper:
    1. `cd sapper`
    2. Install npm dependencies: `npm install`
    3. Run: `npm run dev`
    4. Verify it's running by going to `http://localhost:3000`
4. Start the Prisma server
    1. Install prisma: `npm install -g prisma`
    2. Make sure docker is set up (follow the [instructions on their website](https://www.docker.com/products/docker-desktop))
    3. `cd db`
    4. Install npm dependencies: `npm install`
    5. Start docker: `docker-compose up -d`
    6. Deploy and generate prisma: `prisma deploy; prisma generate`
    7. Start the GraphQL server: `node index.js`
    8. Verify prisma is running by going to `http://localhost:4000` (you should see a GraphQL playground)
        1. You can now also go to `http://localhost:4466` to access the internal prisma GraphQL playground
        2. You can access the prisma admin panel at `http://localhost:4466/_admin`
