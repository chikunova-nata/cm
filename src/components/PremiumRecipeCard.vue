<template>
  <div v-bind:style="{ backgroundImage: 'url(' + images && images[0].url + ')' }">
    <div v-if="isPremium">Premium Recipe</div>
    <div>{{ title }}</div>
    <div>
      <star-rating :modelValue="rating.score"></star-rating>
      <span>{{ rating.count }} ratings</span>
    </div>
    <div>
      <span>{{ setMinutes(preparationTimeMinutes) }} min</span>
      <span>{{ details.energy }} {{ user.energyUnits }}</span>
      <div>
        <span>{{ details.nutrients.carbs }} {{ details.units.carbs }}</span>
        <span>{{ details.nutrients.proteins }} {{ details.units.proteins }}</span>
        <span>{{ details.nutrients.fats }} {{ details.units.fats }}</span>
      </div>
    </div>
  </div>

</template>

<script>
import StarRating from "@/components/StarRatings";

export default {
  name: "PremiumRecipeCard",
  components: {
    StarRating
  },
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    rating: {
      type: Object,
      required: true
    },
    preparationTimeMinutes: {
      type: Number,
      required: true
    },
    isPremium: {
      type: Boolean,
      required: true
    },
    images: {
      type: Array,
      required: true
    },
    details: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    setMinutes: function(totalMinutes) {
      return totalMinutes < 60 ? `${this.addLeadingZero(totalMinutes)} min` : this.convertToHoursAndMinutes(totalMinutes);
    },
    convertToHoursAndMinutes: function(totalMinutes) {
      const minutes = totalMinutes % 60;
      const hours = Math.floor(totalMinutes / 60);

      return `${this.addLeadingZero(hours)} hr ${this.addLeadingZero(minutes)} min`;
    },
    addLeadingZero: function(value) {
      return value.toString().padStart(2, "0");
    }
  }
};
</script>
