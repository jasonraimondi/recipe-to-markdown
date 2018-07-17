# Recipe to Markdown (in Node)

Currently I only have a parser for AllRecipes.com. 

You can convert whatever recipes you find to markdown by running:

```bash
# ID=<ALL_RECIPE_ID> npm run fetch
ID=234592 npm run fetch

# OR 

# ts-node src/main.ts <ALL_RECIPE_ID>
ts-node src/main.ts 234592
```

### Web Server via Express

This will just let you view the recipes in your browser. It is just raw markdown at this point. Start up the web server, it will be listening on port 3000.

```bash
npm run serve
```

The following will display the markdown for "Greek Lemon Chicken and Potato Bake"

```bash
# http://localhost:3000/<ALL_RECIPE_ID>
http://localhost:3000/242402
```
