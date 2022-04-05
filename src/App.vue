<template>
  <div id="app">
    <div class="cm-container">
      <div class="cm-logo-wrapper">
        <img alt="Carb Manager" src="./assets/cm-logo.svg" class="cm-logo" />
      </div>
      <h2>Carb Manager Dev Assignment</h2>
      <ul>
        <li v-for="recipe in recipes"
            :key="recipe.id"
            class="premium-recipe"
        >
          <PremiumRecipeCard :id="recipe.id"
                             :title="recipe.title"
                             :rating="recipe.rating"
                             :preparationTimeMinutes="recipe.preparationTimeMinutes"
                             :isPremium="recipe.isPremium"
                             :images="recipe.images"
                             :details="recipe.details"
                             :user="user"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PremiumRecipeCard from "@/components/PremiumRecipeCard.vue";

export default {
  name: "App",
  components: {
    PremiumRecipeCard
  },
  created() {
    this.fetchData()
  },
  data: () => ({
    recipes: [],
    user: {},
    rating: 3.5
  }),
  methods: {
    async fetchData() {
      const url = "http://127.0.0.1:3000/";
      this.recipes = await (await fetch(`${url}recipes`)).json();
      this.user = await (await fetch(`${url}user`)).json();
      console.log("__ this.commits", this.recipes)
      console.log("__ this.user", this.user)
    }
  }
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
