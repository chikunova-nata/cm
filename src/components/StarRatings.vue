<script>
import StarIcon from "./StarIcon.vue";

export default {
  components: { StarIcon },
  name: "StarRating",
  props: {
    activeColor: {
      type: String,
      default: "#FDA01E"
    },
    inactiveColor: {
      type: String,
      default: "#AAAEB3"
    },
    starSize: {
      type: String,
      default: "24"
    },
    numberOfStars: {
      type: Number,
      default: 5
    },
    modelValue: {
      type: Number
    },
    step: {
      type: Number,
      default: 0.5
    }
  },
  data() {
    return {
      rating: this.modelValue || 0
    };
  },
  methods: {
    generateSameWidthAndHeight: function(size) {
      return {
        width: `${size}px`,
        height: `${size}px`
      };
    }
  }
}
</script>

<template>
  <div class="star-rating__wrapper">
    <div class="star-rating">
      <div class="stars">
        <star-icon
          :activeColor="activeColor"
          :inactiveColor="inactiveColor"
          :order="i"
          :rating="rating"
          v-for="i in numberOfStars"
          :key="i"
          :style="{
              ...generateSameWidthAndHeight(starSize)
            }"
        >
        </star-icon>
      </div>
    </div>
  </div>
</template>

<style scoped>
.star-rating__wrapper {
  display: block;
  margin: 25px auto;
  text-align: center;
  padding: 25px;
}

.star-rating {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.star-rating button {
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
}

.star-rating button svg {
  fill: currentColor;
}

.stars {
  display: inline-block;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
}

.stars svg {
  display: inline-block;
  fill: currentColor;
  cursor: pointer;
}
</style>
