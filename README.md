# dnswap

dnswap (DNS Node.js Swapper With a Purpose) is a tool built to swap out your **macOS** system's DNS servers rapidly.

## Why

I work at what - at the time of writing - is one of the world's largest companies, and the guest / corp WiFi **really** doesn't like it if you have custom DNS.

Instaed of opening `System Preferences > Network > Advacned > DNS > <remove or re-add custom DNS>` every day I am in the office, I instead spent the second hour of a flight from SF to JFK building this tool.

## Usage

Via npm:

```sh
npm i -g dnswap
dnswap # will tell you your current DNS settings
dnswap --google # or -g, will swap to Google Public DNS
dnswap --cloudflare # or -c, will swap to CloudFlare DNS
dnswap --empty # or -e, will remove custom DNS servers
```

Via npx (this won't help if you can't connect to the internet and don't have the module locally cached!):

```sh
npx dnswap # will tell you your current DNS settings
npx dnswap --google # or -g, will swap to Google Public DNS
npx dnswap --cloudflare # or -c, will swap to CloudFlare DNS
npx dnswap --empty # or -e, will remove custom DNS servers
```

## Contributing

Contributions are welcome. I probably won't triage issues rapidly, but if you want to PR stuff and it works on my machine or enhances this documentation, I'm happy to accept it. More high-performance and/or privacy-centric public and free DNS options are welcome.
