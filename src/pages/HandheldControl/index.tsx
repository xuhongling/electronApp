import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '@/store'
import CreateChart from 'components/CreateChart'
import ColorPickers from 'components/ColorPickers'
import getColumnData from 'utils/getColumnData'
import getMsgData from 'utils/getMsgData'
import fileData from 'static/fileData'
import styles from './style.less'

type Props = ReturnType<typeof bindActionCreators>
type State = {}

// @ts-ignore: 不可达代码错误。 用装饰器简写方式
@connect(
  (state: RootState) => ({
    fileData: state.fileData.fileData
  }),
  dispatch => ({
    ...bindActionCreators(
      {},
      dispatch
    )
  })
)
export default class HandheldControl extends React.Component<Props,State> {

	constructor(props:any) {
		super(props)
	}

	componentDidMount() {
		let columnData = getColumnData('手持遥控',fileData)
		console.log(columnData,'columnData')
		let aaa = []
		for (let i = 0; i < columnData.length; i++) {
			let data = getMsgData(columnData[i])
			aaa.push(data)
		}
		console.log(aaa,'23452342342')
	}

	public render() {
		return (
			<div className={styles.handheldControl}>
				<CreateChart/>
				<ColorPickers/>
			</div>
		)
	}
}