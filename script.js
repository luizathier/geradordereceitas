async function gerarReceita() {
    const resposta = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const dados = await resposta.json();
    const meal = dados.meals[0];

    const ingredientes = [];
    for (let i = 1; i <= 20; i++) {
      const ingrediente = meal[`strIngredient${i}`];
      const medida = meal[`strMeasure${i}`];
      if (ingrediente && ingrediente.trim()) {
        ingredientes.push(`${medida} ${ingrediente}`);
      }
    }

    document.getElementById('receita').innerHTML = `
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <h3>Categoria: ${meal.strCategory}</h3>
      <h4>Ingredientes:</h4>
      <ul>${ingredientes.map(item => `<li>${item}</li>`).join('')}</ul>
      <h4>Instruções:</h4>
      <p>${meal.strInstructions}</p>
      ${meal.strYoutube ? `<p><a href="${meal.strYoutube}" target="_blank">📺 Ver vídeo</a></p>` : ''}
    `;
  }