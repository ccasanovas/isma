import SpinnerTemplate from './SpinnerTemplate';

export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    error: {
      type: Boolean,
      required: true,
    },
  },
  functional: true,
  render(h, ctx) {
    if (ctx.props.error) {
      return ctx.slots().error
    }
    if (ctx.props.loading) {
      return h(SpinnerTemplate);
    }
    return ctx.slots().default;
  },
}
