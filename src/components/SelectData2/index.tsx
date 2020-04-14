import React, {useState, useCallback, useMemo, useEffect} from 'react'
import { Modal, Button, Radio } from 'antd'
import styles from './style.less'

const SelectData2: React.FC = () => {
	const [state, setState] = useState({
    visible: false,
    value: 1
  })

  const showModal = ()=>{
		setState(state => ({
      ...state,
      visible: true
    }))
  }
	const handleOkModal = ()=>{
		setState(state => ({
      ...state,
      visible: false
    }))
	}
	const handleCancelModal = ()=>{
		setState(state => ({
      ...state,
      visible: false
    }))
	}

	const onChangeRadio = e => {
    console.log('radio checked', e.target.value)
    setState(state => ({
      ...state,
       value: e.target.value
    }))
  }
  const radioStyle = {
    display: 'block',
    height: '40px',
    lineHeight: '40px',
  }

  return (
    <div className={styles.selectData}>
      <Button type="primary" onClick={showModal}>增加展示数据</Button>
      <Modal title="选择展示栏数" visible={state.visible} onOk={handleOkModal} onCancel={handleCancelModal} okText={'确定'} cancelText={'取消'}>
        <Radio.Group onChange={onChangeRadio} value={state.value}>
	        <Radio value={1} style={radioStyle}>一栏数据</Radio>
	        <Radio value={2} style={radioStyle}>二栏数据</Radio>
	        <Radio value={3} style={radioStyle}>三栏数据</Radio>
	        <Radio value={4} style={radioStyle}>四栏数据</Radio>
	        <Radio value={5} style={radioStyle}>五栏数据</Radio>
	      </Radio.Group>
      </Modal>
    </div>
  )
}

export default SelectData2