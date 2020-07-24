import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, InputNumber, message } from 'antd'
import { RootState, actions } from '@/store'
import { bindActionCreators } from 'redux'
import { SketchPicker } from 'react-color'
import classnames from 'classnames'
import styles from './style.less'

type Props = {}
let chartColourValue = ['#4260ff', '#fc7194', '#08c05e', '#f02354', '#673af6', '#fc853f','#00acdc','#61a94f']
let chartLineWidthValue = [1,1,1,1,1,1,1,1]
let chartSizeValueValue:any[] = []
const ChartPopup: React.FC<Props> = (props:any) => {
  const [state, setState] = useState({
    visible: false,
    chartParams: null,
    seriesName: '设置图表属性',
    isShowProperty: true,
    isShowLineWidth: false,
    isShowSizeValue: false,
    isShowColorPickers: false,
    sizeValueMin: 0,
    sizeValueMax: 1,
    background: '#fff',
    lineWidthInputValue: 1,
    seriesIndexColour: 0,
    seriesIndexLineWidth: 0,
    seriesIndexSizeValue: 0
  })

  useEffect(()=>{
  	if (props.globalChart !== null) {
  		let myChart = props.globalChart
  		myChart.on('click', (params:any)=> {
        if (params.componentType === "yAxis") {
          // eCharts 里面的最大最小值
          let yAxisScale = myChart.getModel()._componentsMap.data.yAxis[params.yAxisIndex].axis.scale._extent
          let leng = myChart.getModel()._componentsMap.data.yAxis.length
          for (let i = 0; i < leng; i++) {
            let yAxisScaleValue = myChart.getModel()._componentsMap.data.yAxis[i].axis.scale._extent
            chartSizeValueValue.push(yAxisScaleValue)
          }
          let seriesName:any[] = []
          if (params.name.indexOf('  ') !== -1) {
            seriesName = params.name.split('  ')
          }else{
            seriesName = [params.name]
          }
          setState(state => ({
            ...state,
            visible: true,
            chartParams: params,
            seriesName:`设置 ${seriesName[0]} 属性`,
            sizeValueMin: yAxisScale[0],
            sizeValueMax: yAxisScale[1],
            isShowProperty: true,
            isShowLineWidth: false,
            isShowSizeValue: false
          }))
        }
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
    setState(state => ({
      ...state,
      isShowProperty: false,
      isShowLineWidth: true,
      lineWidthInputValue: 1,
      seriesIndexLineWidth: chartParams.yAxisIndex
    }))
  }
  // 点击折线颜色
  const handleClickColour = ()=> {
    let chartParams:any = state.chartParams
    setState(state => ({
      ...state,
      visible: false,
      isShowColorPickers: true,
      seriesIndexColour: chartParams.yAxisIndex
    }))
  }
  // 点击坐标大小值
  const handleClickSizeValue = ()=> {
    let chartParams:any = state.chartParams
    setState(state => ({
      ...state,
      isShowProperty: false,
      isShowSizeValue: true,
      seriesIndexSizeValue: chartParams.yAxisIndex
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
    if (value !== undefined) {
      setState(state => ({
        ...state,
        sizeValueMin: value
      }))
    }
  }
  const handleChangeSizeValueMax = (value: number|undefined)=> {
    if (value !== undefined && value <= state.sizeValueMin) {
      message.warning('不能设置最大值小于最小值！')
      return
    }
    if (value !== undefined) {
      setState(state => ({
        ...state,
        sizeValueMax: value
      }))
    }
  }
  const handleClickSaveSizeValue = ()=> {
    setState(state => ({
      ...state,
      visible: false
    }))
    let sizeValue = [state.sizeValueMin, state.sizeValueMax]
    let chartSizeValue:any[] = chartSizeValueValue
    chartSizeValue[state.seriesIndexSizeValue] = sizeValue
    let changeChartSizeValue = [...chartSizeValue]
    props.setChartSizeValue(changeChartSizeValue)
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
            <InputNumber size='large' min={1} max={5} value={state.lineWidthInputValue} onChange={handleChangeInputNumber} />
          </section>
        </div>
        {/*设置当前图表坐标大小值*/}
        <div className={classnames(styles.sizeValue, {[`${styles.showSizeValue}`]: state.isShowSizeValue})}>
          <ul className={styles.sizeValueList}>
            <li className={styles.sizeValueListItem}>
              <span className={styles.title}>当前图表坐标最大值：</span>
              <InputNumber size='large' value={state.sizeValueMax} onChange={handleChangeSizeValueMax} />
            </li>
            <li className={styles.sizeValueListItem}>
              <span className={styles.title}>当前图表坐标最小值：</span>
              <InputNumber size='large' value={state.sizeValueMin} onChange={handleChangeSizeValueMin} />
            </li>
          </ul>
          <Button type="primary" size='large' onClick={handleClickSaveSizeValue}>确定设置</Button>
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
    setChartLineWidth: (chartLineWidth: number[]) => actions.chartLineWidth.setChartLineWidth(chartLineWidth),
    setChartSizeValue: (chartSizeValue: number[]) => actions.chartSizeValue.setChartSizeValue(chartSizeValue)
  },dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartPopup)