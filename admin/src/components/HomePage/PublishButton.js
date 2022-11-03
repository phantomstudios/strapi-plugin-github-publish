import React from "react";

import { Button, Loader, Typography } from "@strapi/design-system";
import { Upload } from "@strapi/icons";
import PropTypes from "prop-types";

const PublishButton = ({ loading, loadingMessage, buttonLabel, onClick }) =>
  loading ? (
    <div>
      <Loader />
      <Typography variant="omega">{loadingMessage}</Typography>
    </div>
  ) : (
    <Button size="L" startIcon={<Upload />} onClick={onClick}>
      {buttonLabel}
    </Button>
  );

PublishButton.propTypes = {
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  buttonLabel: PropTypes.string,
  onClick: PropTypes.func,
};

export default PublishButton;
