import {mount} from '@vue/test-utils';
import PremiumRecipeCard from "@/components/PremiumRecipeCard";

describe("PremiumRecipeCard.vue", () => {
  const defaultProps = {
    id: "#123",
    title: "Low Carb Thai Chicken Curry With Coconut Cauliflower Rice",
    rating: {
      count: 44,
      score: 4.5
    },
    preparationTimeMinutes: 120,
    isPremium: true,
    images: [{ url: "my-image-url" }],
    details: {
      energy: 421,
      nutrients: {
        ca: 16,
        carbs: 7,
        fats: 8,
        proteins: 30
      },
      units: {
        ca: "mg",
        carbs: "g",
        energy: "kcal",
        fats: "g",
        proteins: "g"
      }
    },
    user: {
      energyUnits: "calories",
      likedRecipes: ["2", "3"]
    }
  };
  let wrapper = null;

  afterEach(() => {
    wrapper.destroy();
  });

  it("should set the props", () => {
    wrapper = mount(PremiumRecipeCard, {
      propsData: { ...defaultProps }
    });
    const props = wrapper.props();

    expect(props.id).toEqual(defaultProps.id);
    expect(props.title).toEqual(defaultProps.title);
    expect(props.rating).toEqual(defaultProps.rating);
    expect(props.preparationTimeMinutes).toEqual(
      defaultProps.preparationTimeMinutes
    );
    expect(props.isPremium).toEqual(defaultProps.isPremium);
    expect(props.images).toEqual(defaultProps.images);
    expect(props.details).toEqual(defaultProps.details);
    expect(props.user).toEqual(defaultProps.user);
  });

  it("should convert minutes into hours and minutes if duration is longer than 60 minutes", () => {
    const props = wrapper.props();
    expect(wrapper.vm.setMinutes(props.preparationTimeMinutes)).toEqual("02 hr 00 min");
  });

  it("should format minutes if duration is less than 60 minutes", () => {
    const lessThan60Minutes = 25;
    defaultProps.preparationTimeMinutes = lessThan60Minutes;
    wrapper = mount(PremiumRecipeCard, {
      propsData: { ...defaultProps }
    });
    const props = wrapper.props();
    expect(wrapper.vm.setMinutes(props.preparationTimeMinutes)).toEqual(`${lessThan60Minutes} min`);
  });

  it("should set isIconHighlighted based on user preferences", () => {
    const nonFavoriteRecipeId = "1";
    const favoriteRecipeId = "2";
    expect(wrapper.vm.isIconHighlighted(nonFavoriteRecipeId)).toBeFalsy();
    expect(wrapper.vm.isIconHighlighted(favoriteRecipeId)).toBeTruthy();
  });

  it("should convert energy if energy units are the same", () => {
    const unitsEnergy = "kcal";
    expect(wrapper.vm.convertEnergyUnits(unitsEnergy)).toEqual(defaultProps.details.energy);
  });

  it("should convert kJ to cal based on user preferences", () => {
    const unitsEnergyKJ = "kJ";
    expect(wrapper.vm.convertEnergyUnits(unitsEnergyKJ)).toEqual("101");
  });

  it("should convert cal to kJ based on user preferences", () => {
    defaultProps.user.energyUnits = "kJ";
    wrapper = mount(PremiumRecipeCard, {
      propsData: { ...defaultProps }
    });

    const unitsEnergyKcal = "kcal";
    expect(wrapper.vm.convertEnergyUnits(unitsEnergyKcal)).toEqual("1761");
  });
});
