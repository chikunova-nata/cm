<template>
  <div class="premium-card--container">
    <div class="premium-card--curtain"></div>
    <div class="premium-card--icon-heart">
      <img v-if="!isIconHighlighted(id)"
           src="../assets/heart.svg" />
      <img v-if="isIconHighlighted(id)"
           src="../assets/heart-filled-in.svg" />
    </div>
    <div v-if="isPremium">
      <div class="premium-card--recipe">
        <img class="premium-card--recipe-icon"
             src="../assets/trophy.svg" />
        <span class="premium-card--recipe-content">Premium Recipe</span>
      </div>
      <div class="premium-card--recipe-bg"></div>
    </div>
    <div class="premium-card--title">{{ title }}</div>
    <div class="premium-card--rating">
      <star-rating :modelValue="rating.score"></star-rating>
      <span class="premium-card--rating-content">{{ rating.count }} ratings</span>
    </div>
    <div class="premium-card--details">
      <span class="premium-card--details-info">
        <img class="premium-card--recipe-icon"
                 src="../assets/clock.svg" />
        {{ setMinutes(preparationTimeMinutes) }}
      </span>
      <span class="premium-card--details-info">
        <img class="premium-card--recipe-icon"
             src="../assets/cals.svg" />
        {{ convertEnergyUnits(details.units.energy) }} {{ user.energyUnits }}
      </span>
    </div>
    <div class="premium-card--nutrients">
        <span class="premium-card--nutrients-details">
          <span class="premium-card--nutrients-carbs"></span>{{ details.nutrients.carbs }} {{ details.units.carbs }}
        </span>
      <span class="premium-card--nutrients-details">
          <span class="premium-card--nutrients-proteins"></span>{{ details.nutrients.proteins }} {{ details.units.proteins }}
        </span>
      <span class="premium-card--nutrients-details">
          <span class="premium-card--nutrients-fats"></span>{{ details.nutrients.fats }} {{ details.units.fats }}
        </span>
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
    },
    isIconHighlighted: function(id) {
      return this.user && this.user.likedRecipes && this.user.likedRecipes.includes(id);
    },
    convertEnergyUnits: function(unitsEnergy) {
      if (this.user.energyUnits === "calories" && unitsEnergy === "kcal") {
        return this.details.energy;
      }

      if (this.user.energyUnits === "calories" && unitsEnergy === "kJ") {
        return (this.details.energy * 0.239).toFixed(0);
      }

      if (this.user.energyUnits === "kJ" && unitsEnergy === "kcal") {
        return (this.details.energy * 4.184).toFixed(0);
      }
    }
  }
};
</script>
<style scoped>
.premium-card--container {
  background: #ffffff url("../assets/card-preview-image.png") no-repeat 0 0;
  height: 318px;
  width: 343px;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 13px 35px rgba(0, 30, 47, 0.1);
  margin: 10px;
}

.premium-card--curtain {
  visibility: hidden;
  position: absolute;
  width: 343px;
  height: 200px;
  background: #ffffff;
  opacity: 0.2;
  z-index: 5;
  cursor: pointer;
}

.premium-card--container:hover .premium-card--curtain {
  visibility: visible;
}

.premium-card--icon-heart {
  height: 23px;
  width: 23px;
  position: absolute;
  top: 16px;
  right: 16px;
}

.premium-card--icon-heart img {
  height: 23px;
  width: 23px;
  display: block;
}

.premium-card--recipe {
  display: flex;
  align-items: center;
  position: absolute;
  top: 172px;
  left: 8px;
  width: 117px;
  height: 20px;
}

.premium-card--recipe-bg {
  position: absolute;
  top: 172px;
  left: 8px;
  width: 117px;
  height: 20px;
  background: #ffffff;
  opacity: 0.3;
  border-radius: 10px;
}

.premium-card--recipe-content {
  font-family: Proxima Nova;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  color: #ffffff;
  z-index: 5;
  white-space: nowrap;
}

.premium-card--recipe-icon {
  margin: 0 6px 0 0;
}

.premium-card--title {
  position: absolute;
  bottom: 70px;
  left: 16px;
  color: #0c0c0a;
  font-family: Proxima Nova;
  font-size: 18px;
  font-weight: 700;
  line-height: 20px;
  width: 311px;
  height: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: left;
}

.premium-card--rating {
  position: absolute;
  bottom: 40px;
  left: 16px;
  white-space: nowrap;
  display: flex;
  align-items: center;
}

.premium-card--rating-content {
  color: #1ca677;
  font-family: 'Proxima Nova';
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  margin-left: 8px;
}

.premium-card--details {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 14px;
  left: 16px;
  color: #393c40;
  font-family: 'Proxima Nova';
  font-size: 12px;
  line-height: 14px;
}

.premium-card--details-info {
  margin-right: 10px;
}

.premium-card--details span,
.premium-card--nutrients {
  display: flex;
  align-items: center;
  justify-content: end;
}

.premium-card--nutrients {
  position: absolute;
  bottom: 16px;
  right: 16px;
}

.premium-card--nutrients-details {
  width: 46px;
  white-space: nowrap;
  color: #393c40;
  font-family: 'Proxima Nova';
  font-size: 12px;
  line-height: 14px;
}

.premium-card--nutrients-carbs,
.premium-card--nutrients-proteins,
.premium-card--nutrients-fats {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin: 0 4px;
  display: inline-block;
}

.premium-card--nutrients-carbs {
  background: #f94642;
}

.premium-card--nutrients-proteins {
  background: #3177bb;
}

.premium-card--nutrients-fats {
  background: #fda120;
}
</style>
