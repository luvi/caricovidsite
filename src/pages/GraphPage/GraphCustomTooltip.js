import React from "react";
import { withTranslation, useTranslation } from "react-i18next";

function CustomTooltip({ active, payload, label }) {
  const { t } = useTranslation();

  if (active) {
    return (
      <div>
        {" "}
        {!!payload ? (
          <div className="custom-tooltip">
            <p className="label">{`${label}`}</p>
            <p className="desc">{`${payload[0].value} ${t(
              "confirmed_cases"
            )}, ${payload[1].value
              } ${t("deaths")}`}</p>
          </div>
        ) : (
          <div> </div>
        )}{" "}
      </div>
    );
  }

  return null;
}

export default withTranslation()(CustomTooltip);
