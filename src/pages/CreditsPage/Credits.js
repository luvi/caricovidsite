import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next'

const Credits = (props) => {
  const { t,i18n } = useTranslation()

  useEffect(() => {
    document.body.style.backgroundColor = "#1A2637";
  }, [])

  return (
    <div>
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          color: "white",
        }}
        className="sourcesContainer"
      >
        <div>
          {t('developer')}: <a href="https://twitter.com/JaniquekaJohn">{t('twitter_handle')}</a>
        </div>

        <div>
          {t('data_sources')}
          , Mathieu, E., Ritchie, H., Ortiz-Ospina, E. et al. A global database of COVID-19 vaccinations. Nat Hum Behav (2021). https://doi.org/10.1038/s41562-021-01122-8
        </div>
        <div>
          <a href="https://github.com/luvi/caricoviddata">
          {t('own_data_set')}
          </a>
        </div>
        <div>{t('bvi_news')}</div>
        <div> </div>
        <div></div>
        <div class="disclaimer">
          {t('credits_disclaimer')}
        </div>
      </div>

      <div style={{
        display: "flex",
        margin: "auto",
        flexDirection: "column",
        position: "relative",
        color: "white",

      }}>
      </div>
    </div>
  );
}

export default Credits
