./docker-scripts/wait-for-it.sh -t 30 prisma:4466 -- /home/node/.npm-global/bin/prisma deploy --force
/home/node/.npm-global/bin/prisma generate

node /db/index.js