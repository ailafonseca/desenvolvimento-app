import PropTypes from "prop-types";

const findFirst = (comp, p) => comp.find(p).first();
findFirst.propTypes = {
  comp: PropTypes.elementType.isRequired,
  p: PropTypes.string.isRequired
};

const getProps = (comp, p) => findFirst(comp, p).props();
getProps.propTypes = {
  comp: PropTypes.elementType.isRequired,
  p: PropTypes.string.isRequired
};

export { findFirst, getProps };
