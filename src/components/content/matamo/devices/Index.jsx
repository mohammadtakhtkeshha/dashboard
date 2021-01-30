import React, {useEffect, useState, useContext} from "react"
import {withNamespaces} from "react-i18next"
import DevicesComponent from "./partials/DevicesComponent.jsx"
import ModelsComponent from "./partials/ModelsComponent.jsx"
import ResolutionsComponent from "./partials/ResolutionsComponent.jsx"

function Index({t}) {
  return (<>
      <DevicesComponent/>
      <ModelsComponent/>
      <ResolutionsComponent/>
  </>)
}

export default withNamespaces('translation,matamo')(Index)
