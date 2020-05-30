import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd'
import { RootState, actions } from '@/store'
import { bindActionCreators } from 'redux'
import { SketchPicker } from 'react-color'
import classnames from 'classnames'
import styles from './style.less'

type Props = {}
const ChartPopup: React.FC<Props> = (props:any) => {
  const [state, setState] = useState({
    visible: false,
    chartParams: null,
    isShowColorPickers: false,
    background: '#fff',
    seriesIndex: 0
  })

  useEffect(()=>{
  	if (props.globalChart !== null) {
  		let myChart = props.globalChart
  		myChart.on('contextmenu', (params:any)=> {
        params.event.event.preventDefault()
	      setState(state => ({
		      ...state,
		      visible: true,
          chartParams: params
		    }))
	    })
  	}
	},[props.globalChart])

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
  // 点击折线线宽
  const handleClickLineWidth = ()=> {
    console.log('handleClickLineWidth')
  }
  // 点击折线颜色
  const handleClickColour = ()=> {
    let chartParams:any = state.chartParams
    setState(state => ({
      ...state,
      visible: false,
      isShowColorPickers: true,
      seriesIndex: chartParams.seriesIndex
    }))
  }
  // 点击坐标大小值
  const handleClickSizeValue = ()=> {
    console.log('handleClickSizeValue')
  }

  // 修改chart颜色函数方法
  const handleCloseColorPickers = ()=> {
    setState(state => ({
      ...state,
      isShowColorPickers: false
    }))
  }
  const handleChangeColor = (color:any)=> {
    setState(state => ({
      ...state,
      background: color.hex
    }))
    let chartColor = ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42']
    chartColor[state.seriesIndex] = `${color.hex}`
    props.setChartColorList(chartColor)
  }

  return(
    <>
      <Modal title="设置图表属性" visible={state.visible} onOk={handleModalOk} onCancel={handleModalCancel} footer={null} bodyStyle={{background:'#f4f4f4'}}>
        <ul className={styles.setProperty}>
        	<li className={styles.listItem} onClick={handleClickLineWidth}>
        		<i className='iconfont icon-xiansuo'></i>
        		<section>
        			<h2>折线线宽</h2>
        			<p>设置当前折线线宽，显示更明显</p>
        		</section>
        	</li>
	        <li className={styles.listItem} onClick={handleClickColour}>
	        	<i className='iconfont icon-tiaose'></i>
	        	<section>
        			<h2>折线颜色</h2>
        			<p>设置当前折线的颜色，对比更突出</p>
        		</section>
	        </li>
	        <li className={styles.listItem} onClick={handleClickSizeValue}>
	        	<i className='iconfont icon-chart'></i>
	        	<section>
        			<h2>坐标大小值</h2>
        			<p>设置当前坐标大小值，调整坐标轴</p>
        		</section>
	        </li>
        </ul>
      </Modal>

      {/*ColorPickers*/}
      <div className={classnames(styles.colorPickers, {[`${styles.showColorPickers}`]: state.isShowColorPickers})}>
        <div className={styles.cover} onClick={ handleCloseColorPickers }/>
        <SketchPicker color={state.background} onChange={ handleChangeColor }/>
      </div>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
	globalChart: state.globalChart.globalChart,
  chartColorList: state.chartColorList.chartColorList
})

const mapDispatchToProps = (dispatch:any)=> ({
  ...bindActionCreators({
    setChartColorList: (chartColor: string[]) => actions.chartColorList.setChartColorList(chartColor)
  },dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartPopup)