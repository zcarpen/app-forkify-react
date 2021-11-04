// const [recipeData, setRecipeData] = useState([]);
// const [appCtx, setAppCtx] = useContext(appContext);
// const [search, setSearch] = useState("");

const fetchingResults = async (input) => {
  if (input === "") return;
  console.log(input);
  const result = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${input}`
  );
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
};

export const fetchingRecipe = async (input = 47746) => {
  const recipePromise = await fetch(
    `https://forkify-api.herokuapp.com/api/get?rId=${input}`
  );

  const { recipe } = await recipePromise.json();
  console.log(recipe);

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
