import React from 'react'
import { Button } from 'antd'
import SelectData3 from 'components/SelectData3'
import styles from './style.less'

const Header:React.FC = () => {

  return (
    <div className={styles.header}>
    	<div className={styles.leftWrap}>
    		<svg className="icon" aria-hidden="true">
          <use href="#icon-jiexi"></use>
        </svg>
        <h3>车辆诊断解析</h3>
    	</div>
			<div className={styles.rightWrap}>
        <Button type="primary">Primary</Button>
				<SelectData3/>
			</div>
		</div>
  )
}


export default Header
