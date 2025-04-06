document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("recipeSearch");
  const filterButton = document.getElementById("filterButton");
  const recipeContainer = document.getElementById("recipeContainer");
  const modal = document.getElementById("recipeModal");
  const modalContent = document.getElementById("modalRecipeContent");
  const closeModal = document.getElementById("closeModal");

  let recipes = [];

  async function loadRecipes() {
    try {
      const response = await fetch("recipes.csv"); // Adjust path if needed
      if (!response.ok) {
        throw new Error("CSV file not found");
      }
      const data = await response.text();
      const rows = data.split("\n").slice(1); // skip header

      recipes = rows
        .map(row => {
          const [title, description, type, time, image, ...contentParts] = row.split(",");
          if (!title) return null; // skip empty lines
          return {
            title: title.trim(),
            description: description?.trim() || "",
            type: type?.trim() || "",
            time: time?.trim() || "",
            image: image?.trim() || "placeholder.jpg",
            content: contentParts.join(",").trim() || ""
          };
        })
        .filter(Boolean); // remove nulls

      displayRecipes(recipes);
    } catch (err) {
      console.error("Error loading recipes:", err);
      recipeContainer.innerHTML = "<p>Failed to load recipes.</p>";
    }
  }

  function displayRecipes(filteredRecipes) {
    recipeContainer.innerHTML = "";
    filteredRecipes.forEach(recipe => {
      const recipeElement = document.createElement("div");
      recipeElement.classList.add("recipe");
      recipeElement.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
      `;
      recipeElement.addEventListener("click", () => {
        openRecipe(recipe);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      recipeContainer.appendChild(recipeElement);
    });
  }

  function openRecipe(recipe) {
    modalContent.innerHTML = `
      <h2>${recipe.title}</h2>
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe-full-image">
      <p>${recipe.description}</p>
      <p><strong>Type:</strong> ${recipe.type}</p>
      <p><strong>Time:</strong> ${recipe.time} minutes</p>
      <p>${recipe.content}</p>
    `;
    modal.classList.remove("hidden");
  }

  function filterRecipes() {
    const query = searchInput.value.toLowerCase();
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query)
    );
    displayRecipes(filtered);
  }

  searchInput.addEventListener("input", filterRecipes);
  filterButton.addEventListener("click", filterRecipes);
  closeModal.addEventListener("click", () => modal.classList.add("hidden"));

  loadRecipes();
});

