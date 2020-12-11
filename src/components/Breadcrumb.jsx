import PropTypes from "prop-types";
import commonPropTypes from "~/lib/commonPropTypes";

export default function Breadcrumb({ location }) {}

Breadcrumb.PropTypes = {
  ...commonPropTypes,
  location: PropTypes.object.isRequired,
};
