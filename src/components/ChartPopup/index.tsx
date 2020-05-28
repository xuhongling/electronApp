import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState, actions } from '@/store'
import { bindActionCreators } from 'redux'
import { Modal } from 'antd'
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
      <Modal title="设置图表属性" visible={state.visible} onOk={handleModalOk} onCancel={handleModalCancel} footer={null} bodyStyle={{background:'#f4f4f4'}}>
        <ul className={styles.setProperty}>
        	<li className={styles.listItem}>
        		<i className='iconfont icon-xiansuo'></i>
        		<section>
        			<h2>折线线宽</h2>
        			<p>设置当前折线线宽，显示更明显</p>
        		</section>
        	</li>
	        <li className={styles.listItem}>
	        	<i className='iconfont icon-tiaose'></i>
	        	<section>
        			<h2>折线颜色</h2>
        			<p>设置当前折线的颜色，对比更突出</p>
        		</section>
	        </li>
	        <li className={styles.listItem}>
	        	<i className='iconfont icon-chart'></i>
	        	<section>
        			<h2>坐标大小值</h2>
        			<p>设置当前坐标大小值，调整坐标轴</p>
        		</section>
	        </li>
        </ul>
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