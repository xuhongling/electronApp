import React from 'react'
import Header from 'components/Header'
import ChartExplanation from 'components/ChartExplanation'
import CreateChart from 'components/CreateChart'
import ColorPickers from 'components/ColorPickers'
import ChartPopup from 'components/ChartPopup'
import styles from './style.less'

export default class HomePage extends React.Component {

  constructor(props:any) {
    super(props)
  }

  public render() {
    return (
      <div className={styles.homePage}>
        <Header/>
        <div className={styles.childrenCommon}>
          <CreateChart/>
          <ColorPickers/>
          <ChartPopup/>
        </div>
        <ChartExplanation/>
      </div>
    )
  }
}