import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState, actions } from '@/store'
import { bindActionCreators } from 'redux'
import { Modal, Button  } from 'antd'
import styles from './style.less'

type Props = {}
const ChartPopup: React.FC<Props> = (globalChart:any) => {
  const [state, setState] = useState({
    visible: false
  })

  useEffect(()=>{
  	if (globalChart.globalChart !== null) {
  		let myChart = globalChart.globalChart
  		myChart.on('contextmenu', (params:any)=> {
	      console.log(params,'-----------1111111111111********------')
	      setState(state => ({
		      ...state,
		      visible: true
		    }))
	    })
  	}
	},[globalChart])

  const handleModalOk = ()=> {
		setState(state => ({
      ...state,
      visible: false
    }))
  }

	const handleModalCancel = ()=> {
		setState(state => ({
      ...state,
      visible: false
    }))
	}

  return(
    <>
      <Modal title="设置图表属性" visible={state.visible} onOk={handleModalOk} onCancel={handleModalCancel} footer={null}>
        <div className={styles.wrapper}>
        	<Button>设置当前折线线宽</Button>
	        <Button>设置当前折线颜色</Button>
	        <Button>设置当前坐标大小</Button>
        </div>
      </Modal>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
	globalChart: state.globalChart.globalChart,
})

const mapDispatchToProps = (dispatch:any)=> ({
  ...bindActionCreators({
    setSelectData: (selectData: string) => actions.selectData.setSelectData(selectData)
  },dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartPopup)