<p align="center">
  <img  height="200" src="static/icon_255x255_clear.svg">
</p>

# Satsuma - the helpful shopping list

> Are you adding the same staples to you shopping list week after week? There should be a template function for this!
>
> Are you wandering back and forth in the supermarket because the things on your list are not group by section? That shouldn't be too hard.
>
> Are frustrated with how many clicks it can take to add an item to a list or how hard it is to invite your partner to share the same list?
>
> Relax, have a satsuma and enjoy the next trip to the supermarket.
>

That's at least the vision for this little helper app.

Try it out live 👉 [here](https://main--satsuma-shopping.netlify.app) 👈

## Roadmap

- [ ] Add Sharing-feature
- [ ] Add email-service for password reset and email verification
- [ ] Protect signup and signin with ReCaptcha
- [ ] Add GoatCounter analytics
- [ ] Improve DevOps and hosting
- [ ] Launch Party 🚀

After that, we'll focus on improvements, new ideas and possibly explore a paid-plan. We welcome your suggestions.

## Setup

1. Run `nvm use` in the project root to ensure the right node version is used.
2. Install with `npm install`.
3. **OPTIONAL** Install [PocketBase.io](https://pocketbase.io/) and run it with `./pocketbase serve`.
Create an admin account to log in. You can then import the `pb_schema.json` in Settings > Import collections.
4. Create a local `.env` file with `cp .env.template .env`.
5. Run with `npm run dev`.

The pocketbase executable should be run in a separate folder.

## Links

- 🎨 [Color Scheme](https://coolors.co/cdf0ea-f9f9f9-f7dbf0-beaee2-513956)
- 🛢️ [Host PB for free on Fly.io](https://github.com/pocketbase/pocketbase/discussions/537)
- 📱 [Icons](https://icones.js.org/)

