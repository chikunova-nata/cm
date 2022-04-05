<script>
export default {
  name: "StarIcon",
  props: {
    activeColor: {
      type: String,
      required: false
    },
    inactiveColor: {
      type: String,
      required: false
    },
    rating: {
      type: Number,
      required: false
    },
    order: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      mainStarColor: this.setMainColor(),
      halfStarColor: this.setHalfStarColor()
    }
  },
  methods: {
    setMainColor: function() {
      if (!this.rating) {
        return this.inactiveColor;
      }
      if (this.rating >= this.order) {
        return this.activeColor;
      } else {
        return this.inactiveColor;
      }
    },
    setHalfStarColor: function() {
      if (this.rating >= this.order) {
        return this.activeColor;
      } else {
        return this.order - this.rating < 1 ? this.activeColor : this.inactiveColor;
      }
    }
  }
};
</script>
<template>
  <svg width="24"
       height="24"
       viewBox="0 0 24 24"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 18.0737L18.18 22L16.54 14.6L22 9.62105L14.81 8.97895L12 2L9.19 8.97895L2 9.62105L7.46 14.6L5.82 22L12 18.0737Z"
          :fill="mainStarColor"/>
    <path d="M12 18.0737V2L9.19 8.97895L2 9.62105L7.46 14.6L5.82 22L12 18.0737Z"
          :fill="halfStarColor"/>
  </svg>
</template>

