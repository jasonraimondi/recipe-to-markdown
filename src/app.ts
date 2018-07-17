import { RecipeToMarkdownScraper } from './RecipeToMarkdownScraper';

const express = require('express');
const app = express();
const rescraper = new RecipeToMarkdownScraper();

app.get('/:recipeId', (req, res) => {
  rescraper.allRecipes(req.params.recipeId).then(scraper => {
    scraper.write();
    res.send(scraper.render)
  }).catch(err => {
    res.send('Invalid Recipe Id');
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
