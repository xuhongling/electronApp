import React from 'react'
import AddFile from 'components/AddFile'
import styles from './style.less'

type Props = {
  history: any
}

export default class SelectFile extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  public render() {
    return (
      <div className={styles.selectFile}>
        <AddFile history={this.props.history}/>
      </div>
    )
  }
}