import {mount} from '@vue/test-utils';
import StarIcon from "@/components/StarIcon.vue";

describe("Star Component", () => {
  const defaultProps = {
    activeColor: "#FDA01E",
    inactiveColor: "#AAAEB3",
    rating: 3,
    order: 3
  };
  let wrapper = null;

  afterEach(() => {
    wrapper.destroy();
  });

  it("should set the props", () => {
    wrapper = mount(StarIcon, {
      propsData: { ...defaultProps }
    });
    const props = wrapper.props();

    expect(props.activeColor).toEqual(defaultProps.activeColor);
    expect(props.inactiveColor).toEqual(defaultProps.inactiveColor);
    expect(props.rating).toEqual(defaultProps.rating);
    expect(props.order).toEqual(defaultProps.order);
  });

  it("should set the correct mainStarColor and halfStarColor for rounded start rating", () => {
    expect(wrapper.vm.mainStarColor).toEqual(defaultProps.activeColor);
    expect(wrapper.vm.halfStarColor).toEqual(defaultProps.activeColor);
  });

  it("should set the correct mainStarColor and halfStarColor for non-rounded start rating", () => {
    const nonRoundedStartRating = 2.5;
    defaultProps.rating = nonRoundedStartRating;
    wrapper = mount(StarIcon, {
      propsData: { ...defaultProps }
    });
    const props = wrapper.props();
    expect(props.rating).toEqual(nonRoundedStartRating);
    expect(wrapper.vm.mainStarColor).toEqual(defaultProps.inactiveColor);
    expect(wrapper.vm.halfStarColor).toEqual(defaultProps.activeColor);
  });
});
