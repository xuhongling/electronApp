import React from 'react'
import AddFile from 'components/AddFile'
import styles from './style.less'

export default class HomePage extends React.Component<Props,State> {
  constructor(props: any) {
    super(props)
    this.state = {
      
    }
  }

  public render() {
    return (
      <div className={styles.homePage}>
        <AddFile/>
      </div>
    )
  }
}