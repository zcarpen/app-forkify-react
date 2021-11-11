const servingsIncrementer = (ingredient) => {
  const Fraction = require("fractional").Fraction;
  const arrayOfIngredients = ingredient.split(" ");
  // incrementing servings:

  // if first is an interval of values
  if (arrayOfIngredients[0].indexOf("-") !== -1) {
    const splitWord = arrayOfIngredients[0].split("-");
    const [first, second] = [
      new Fraction(splitWord[0]),
      new Fraction(splitWord[1]),
    ];
    const combined = `${first} - ${second}`;
    return combined + " " + arrayOfIngredients.slice(1).join(" ");
  }

  // if first is and second is not number
  if (
    isFinite(arrayOfIngredients[0][0]) &&
    !isFinite(arrayOfIngredients[1][0])
  ) {
    const fracToDecimal = eval(arrayOfIngredients[0]);
    const frac = new Fraction(fracToDecimal);

    // This conditional is for repeating decimals only:
    if (frac.toString().length > 8) {
      return ingredient;
    }

    return frac.toString() + " " + arrayOfIngredients.slice(1).join(" ");
  }

  // if both are numbers

  if (
    isFinite(arrayOfIngredients[0][0]) &&
    isFinite(arrayOfIngredients[1][0])
  ) {
    const decimaledNumber = Number(arrayOfIngredients[0]);
    const fracToDecimal = eval(arrayOfIngredients[1]);
    const combined = decimaledNumber + fracToDecimal;
    const frac = new Fraction(combined);
    return frac.toString() + " " + arrayOfIngredients.slice(2).join(" ");
  }
  return ingredient;
};
export default servingsIncrementer;
