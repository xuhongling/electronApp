import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, InputNumber } from 'antd'
import { RootState, actions } from '@/store'
import { bindActionCreators } from 'redux'
import { SketchPicker } from 'react-color'
import classnames from 'classnames'
import styles from './style.less'

type Props = {}
let chartColourValue = ['#4260ff', '#fc7194', '#08c05e', '#f02354', '#673af6', '#fc853f','#00acdc','#61a94f']
let chartLineWidthValue = [1,1,1,1,1,1,1,1]
const ChartPopup: React.FC<Props> = (props:any) => {
  const [state, setState] = useState({
    visible: false,
    chartParams: null,
    seriesName: '设置图表属性',
    isShowProperty: true,
    isShowLineWidth: false,
    isShowSizeValue: false,
    isShowColorPickers: false,
    background: '#fff',
    lineWidthInputValue: 1,
    seriesIndexColour: 0,
    seriesIndexLineWidth: 0,
    seriesIndexSizeValue: 0
  })

  useEffect(()=>{
  	if (props.globalChart !== null) {
  		let myChart = props.globalChart
  		myChart.on('contextmenu', (params:any)=> {
        params.event.event.preventDefault()
	      setState(state => ({
		      ...state,
		      visible: true,
          chartParams: params,
          seriesName:`设置 ${params.seriesName} 属性`,
          isShowProperty: true,
          isShowLineWidth: false,
          isShowSizeValue: false
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
    let chartParams:any = state.chartParams
    console.log(chartParams,'chartParams')
    setState(state => ({
      ...state,
      isShowProperty: false,
      isShowLineWidth: true,
      lineWidthInputValue: 1,
      seriesIndexLineWidth: chartParams.seriesIndex
    }))
  }
  // 点击折线颜色
  const handleClickColour = ()=> {
    let chartParams:any = state.chartParams
    setState(state => ({
      ...state,
      visible: false,
      isShowColorPickers: true,
      seriesIndexColour: chartParams.seriesIndex
    }))
  }
  // 点击坐标大小值
  const handleClickSizeValue = ()=> {
    let chartParams:any = state.chartParams
    setState(state => ({
      ...state,
      isShowProperty: false,
      isShowSizeValue: true,
      seriesIndexSizeValue: chartParams.seriesIndex
    }))
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
    let chartColor:string[] = chartColourValue
    chartColor[state.seriesIndexColour] = `${color.hex}`
    let changeChartColor = [...chartColor]
    props.setChartColorList(changeChartColor)
  }

  // 修改chart折线宽度函数方法
  const handleChangeInputNumber = (value: number|undefined)=> {
    if (value !== undefined) {
      setState(state => ({
        ...state,
        lineWidthInputValue: value
      }))
      let chartLineWidth:number[] = chartLineWidthValue
      chartLineWidth[state.seriesIndexLineWidth] = value
      let changeChartLineWidth = [...chartLineWidth]
      props.setChartLineWidth(changeChartLineWidth)
    }
  }
  const handleChangeSizeValueMin = (value: number|undefined)=> {
    console.log('handleChangeSizeValueMin', value)
  }
  const handleChangeSizeValueMax = (value: number|undefined)=> {
    console.log('handleChangeSizeValueMax', value)
  }

  return(
    <>
      <Modal title={state.seriesName} visible={state.visible} onOk={handleModalOk} onCancel={handleModalCancel} footer={null} bodyStyle={{background:'#f4f4f4'}}>
        <ul className={classnames(styles.setProperty, {[`${styles.showProperty}`]: state.isShowProperty})}>
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
        {/*设置当前图表线宽*/}
        <div className={classnames(styles.lineWidth, {[`${styles.showLineWidth}`]: state.isShowLineWidth})}>
          <section>
            <span className={styles.title}>当前图表线宽：</span>
            <InputNumber size='large' min={1} max={5} defaultValue={1} value={state.lineWidthInputValue} onChange={handleChangeInputNumber} />
          </section>
        </div>
        {/*设置当前图表坐标大小值*/}
        <div className={classnames(styles.sizeValue, {[`${styles.showSizeValue}`]: state.isShowSizeValue})}>
          <ul className={styles.sizeValueList}>
            <li className={styles.sizeValueListItem}>
              <span className={styles.title}>当前图表坐标最小值：</span>
              <InputNumber size='large' defaultValue={1} onChange={handleChangeSizeValueMin} />
            </li>
            <li className={styles.sizeValueListItem}>
              <span className={styles.title}>当前图表坐标最大值：</span>
              <InputNumber size='large' defaultValue={1} onChange={handleChangeSizeValueMax} />
            </li>
          </ul>
          <Button type="primary" size='large'>确定设置</Button>
        </div>
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
    setChartColorList: (chartColor: string[]) => actions.chartColorList.setChartColorList(chartColor),
    setChartLineWidth: (chartLineWidth: number[]) => actions.chartLineWidth.setChartLineWidth(chartLineWidth)
  },dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartPopup)