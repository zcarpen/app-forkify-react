// Fetches a list of recipes that match a given query:
const fetchingResults = async (input) => {
  try {
    const result = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${input}`
    );
    if (!result.ok) throw new Error("search does not exist");
    const recipeData = await result.json();
    const { recipes } = recipeData;
    const recipesArr = recipes.map((recipe) => {
      return {
        image: recipe.image_url,
        publisher: recipe.publisher,
        recipeID: recipe.recipe_id,
        title: recipe.title,
        source: recipe.source_url,
      };
    });
    return recipesArr;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Fetches a specific recipe from the search using the searchItems' ID:
export const fetchingRecipe = async (input = 47746) => {
  const recipePromise = await fetch(
    `https://forkify-api.herokuapp.com/api/get?rId=${input}`
  );

  const { recipe } = await recipePromise.json();

  return {
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    sourceURL: recipe.source_url,
    id: recipe.recipe_id,
    title: recipe.title,
  };
};

export default fetchingResults;
// export default
