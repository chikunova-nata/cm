<template>
  <div id="app">
    <h2>Non rounded start rating:{{rating}}</h2>
    <star-rating :modelValue="rating" :round-start-rating="false"></star-rating>
    <div class="cm-container">
      <div class="cm-logo-wrapper">
        <img alt="Carb Manager" src="./assets/cm-logo.svg" class="cm-logo" />
      </div>
      <h2>Carb Manager Dev Assignment</h2>
      <p>See the README file for assignment requirements.</p>

      <ul>
        <li v-for="recipe in recipes" :key="recipe" class="premium-recipe">
          <PremiumRecipeCard :id="recipe" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PremiumRecipeCard from "./components/PremiumRecipeCard.vue";
import StarRating from "./components/StarRatings.vue";

export default {
  name: "App",
  components: {
    PremiumRecipeCard,
    StarRating
  },
  data: () => ({
    recipes: ["Premium", "recipes", "list", "goes", "here"],
    rating: 3.5
  })
};
</script>

<style>
#app {
  font-family: "proxima-nova", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>
.cm-logo-wrapper {
  margin-bottom: 30px;
}

.cm-logo {
  max-width: 150px;
  height: auto;
}

.cm-container {
  max-width: 960px;
  margin: auto;
}

/** Remove these styles when done */
.premium-recipe {
  margin-top: 24px;
  border: 2px dashed red;
  padding: 16px;
  list-style: none;
}
</style>
