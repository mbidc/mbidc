# mbidc

More Beautiful IDC System

## Project Authors

- Chenyang Cui(Yoshino-s) Coding & Deployment
- Rongjun Xu Design & Documentation
- Junhua Feng Testing & Monitoring

## Developments

```bash
sudo apt install nodejs yarnpkg
yarn
```

## Deployment

### Directly Run

```bash
sudo apt install nodejs yarnpkg
git clone https://github.com/mbidc/mbidc
cd mbidc
yarn
yarn build
cp -r dist /opt/mbidc
cp config.yml /opt/mbidc
cd /opt/mbidc
# edit config.yml
yarn install --production
yarn start:prod
```

### Docker-compose

```bash
# edit config.yml
cd docker
docker-compose up -d
```

### Dokku

```bash
git remote add dokku https://git.to.your.dokku.app.com/mbidc.git
git checkout -B deploy
# edit config.yml
git add . && git commit -m "deploy"
git push dokku deploy
```

See more in [Dokku](https://dokku.viewdocs.io/dokku/getting-started/).

Also compatible with [Dokku Postgres](https://github.com/dokku/dokku-postgres).
