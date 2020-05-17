import React, { useState, useEffect }  from 'react'
import { connect } from 'react-redux'
import { RootState, actions } from '@/store'
import { bindActionCreators } from 'redux'
import { Table, Tag } from 'antd'
import monitorRule from 'static/monitorRule'
import styles from './style.less'

const { Column } = Table

const ChartExplanation = (legendData:any) => {
  const [state, setState] = useState({
    tableData: [{
      key: 0,
      name:'',
      can_id: '',
      value_array: ['']
    }]
  })

  /*bit_size: "1"
  can_id: "0xCF011D1"
  car_type: "11"
  convert_mode: "1"
  display_style: "10"
  error_value: ""
  high_limit: "0"
  id: "1"
  is_custom: ""
  is_used: "1"
  low_limit: "0.0"
  name: "驱动电机1使能MCU"
  scale: "1"
  start_bit: "0"
  type: "1"
  type_name: "整车"
  unit: ""
  value_array: "0:关闭;1:打开"
  value_offset: "0.0"*/


  useEffect(()=>{
    let legendDataArr = legendData.legendData
    let tableDataArr:any[] = []
    let valueArray:any = []
    for (let i = 0; i < legendDataArr.length; i++) {
      for (let j = 0; j < monitorRule.length; j++) {
        if (legendDataArr[i] === monitorRule[j].name) {
          if (monitorRule[j].value_array !== undefined && monitorRule[j].value_array !== '') {
            // @ts-ignore: 不可达代码错误。 用装饰器简写方式
            valueArray = monitorRule[j].value_array.split(';')
          }else{
            valueArray = ['']
          }
          let formatData = {
            key: i,
            name: monitorRule[j].name,
            can_id: monitorRule[j].can_id,
            start_bit: monitorRule[j].start_bit,
            bit_size: monitorRule[j].bit_size,
            scale: monitorRule[j].scale,
            value_offset: monitorRule[j].value_offset,
            value_array: valueArray,
          }
          tableDataArr.push(formatData)
        }
      }
    }
    setState(state => ({
      ...state,
      tableData: tableDataArr
    }))
  },[legendData])

  const handleClickTableRow = (record:any)=> {
    console.log(record)
  }


  return (
    <div className={styles.chartExplanation}>
      <div className={styles.tableMain}>
        <Table 
          dataSource={state.tableData}
          pagination={false}
          size="middle"
          scroll={{ y: 144 }}
          onRow={record => {
            return {
              onClick: () => {handleClickTableRow(record)} // 点击行
            }
          }}
        >
          <Column title="名称" dataIndex="name" width="200px" />
          <Column title="Can Id" dataIndex="can_id" align='center' width="80px" />
          <Column title="起始BIT位" dataIndex="start_bit" align='center' width="80px" />
          <Column title="BIT长度" dataIndex="bit_size" align='center' width="80px" />
          <Column title="缩放比例" dataIndex="scale" align='center' width="80px" />
          <Column title="偏移量" dataIndex="value_offset" align='center' width="80px" />
          <Column
            title="数据状态"
            dataIndex="value_array"
            render={value_array => (
              <>
                {value_array.map(tag => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </>
            )}
          />
        </Table>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  legendData: state.legendData.legendData
})

const mapDispatchToProps = (dispatch:any)=> ({
  ...bindActionCreators({
    setSelectData: (selectData: string) => actions.selectData.setSelectData(selectData)
  },dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartExplanation)