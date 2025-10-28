# Selve to Matter Bridge (**WIP**)

Translates Selve Home Server 2 Shutters to the Matter standard.

## How to run

```bash
yarn install
yarn app
```

For local development, you also need to run a matter server and ideally Home Assistant to interact with the devices:

```bash
docker run -d \
  --name matter-server \
  --restart=unless-stopped \
  --network=host \
  --security-opt apparmor=unconfined \
  -v /opt/matter-server/data:/data \
  -v /run/dbus:/run/dbus:ro \
  ghcr.io/home-assistant-libs/python-matter-server:stable \
  --storage-path /data
```

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=Europe/Berlin \
  -v /path/to/ha/config:/config \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```
