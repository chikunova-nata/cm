import {mount} from '@vue/test-utils';
import StarRating from "@/components/StarRatings.vue";

describe("StarRating Component", () => {
  const defaultProps = {
    activeColor: "#FDA01E",
    inactiveColor: "#AAAEB3",
    starSize: "24",
    numberOfStars: 5,
    modelValue: 4,
    step: 0.5
  };
  let wrapper = null;

  afterEach(() => {
    wrapper.destroy();
  });

  it("should set the props", () => {
    wrapper = mount(StarRating, {
      propsData: { ...defaultProps }
    });
    const props = wrapper.props();

    expect(props.activeColor).toEqual(defaultProps.activeColor);
    expect(props.inactiveColor).toEqual(defaultProps.inactiveColor);
    expect(props.starSize).toEqual(defaultProps.starSize);
    expect(props.numberOfStars).toEqual(defaultProps.numberOfStars);
    expect(props.modelValue).toEqual(defaultProps.modelValue);
    expect(props.step).toEqual(defaultProps.step);
  });

  it("should set the correct rating if modelValue was not provided", () => {
    const zeroModelValue = 0;
    defaultProps.modelValue = zeroModelValue;
    wrapper = mount(StarRating, {
      propsData: { ...defaultProps }
    });
    const props = wrapper.props();
    expect(props.modelValue).toEqual(zeroModelValue);
    expect(wrapper.vm.rating).toEqual(zeroModelValue);
  });
});
