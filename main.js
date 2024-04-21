async function search() {
    const query = document.querySelector(".searchInput").value;
  
    function ajax(options) {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method, options.url);
      xhr.setRequestHeader('Content-Type', options.contentType);
      if (options.headers) {
        Object.entries(options.headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }
      xhr.onload = () => {
        if (xhr.status === 200) {
          options.success(JSON.parse(xhr.responseText));
        } else {
          options.error(xhr);
        }
      };
      xhr.send();
    }
  
    ajax({
      method: 'GET',
      url: `https://api.api-ninjas.com/v1/recipe?query=${query}`,
      headers: { 'X-Api-Key': 'hMtePcL+5/H57jbsJ5pXcg==2hf5VzaMHmVLveXw' },
      contentType: 'application/json',
      success: function (result) {
        displayResults(result);
      },
      error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
      }
    });
  }
  
  function displayResults(data) {
    const resultsContainer = document.querySelector(".replies");
    resultsContainer.innerHTML = ""; // Clear previous results
  
    if (data.length === 0) {
      resultsContainer.innerHTML = "<p>No results found</p>";
      return;
    }
  
    data.forEach((recipe) => {
      const recipeElement = document.createElement("div");
      recipeElement.classList.add("recipe");
      recipeElement.innerHTML = `
            <h2>${recipe.title}</h2>
            <li>${recipe.ingredients}</li>
            <li>${recipe.servings}</li>
            <li>${recipe.instructions}</li>
            `;
  
      resultsContainer.appendChild(recipeElement);
    });
  }