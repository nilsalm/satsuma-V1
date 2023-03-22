# 🍊 Satsuma - the helpful shopping list

> Are you adding the same staples to you shopping list week after week? There should be a template function for this!
>
> Are you wandering back and forth in the supermarket because the things on your list are not group by section? That shouldn't be too hard.
>
> Are frustrated with how many clicks it can take to add an item to a list or how hard it is to invite your partner to share the same list?
>
> Relax, have a satsuma and enjoy the next trip to the supermarket.
>
> 🍊

That's at least my vision for this little helper app.

## Setup

Use Node 18, e.g. with `nvm use` in the project root.

```bash
$ node -v
v18.12.1
```

Install with `npm install`. Run with `npm run dev`.

Install [PocketBase.io](https://pocketbase.io/) and run it with `./pocketbase serve`.
Create an admin account to log in. You can then import the `pb_schema.json` in Settings > Import collections. 

## Todos

- [x] list and pick categories
- [x] sort items in categories
- [x] auto-update list on screen
- [x] update status on item
- [x] add template to list
- [x] add new list
- [x] set permissions policy in database
- [x] signup flow
- [s] refactor pb into hook
- [ ] share list with other users
- [x] increase quantity if a duplicate item is added
- [x] styling & color scheme
- [ ] remove existing categories via profile
- [x] [Host PB for free on Fly.io](https://github.com/pocketbase/pocketbase/discussions/537)
- [ ] Error handling for signin / signup
- [ ] dynamic header
- [ ] redirects
- [ ] 