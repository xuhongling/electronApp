import React from 'react'
import { Link } from 'react-router-dom'
import { Popover } from 'antd'
import SelectData3 from 'components/SelectData3'
import styles from './style.less'

const Header:React.FC = () => {

  return (
    <div className={styles.header}>
    	<div className={styles.leftWrap}>
    		<div className={styles.logo}></div>
    	</div>
			<div className={styles.rightWrap}>
        <Popover placement="bottom" content={<div className={styles.tips}>重新选择新CSV数据文件</div>}>
          <Link to='/selectFile'>
            <div className={styles.button}><i className='iconfont icon-tianjia'></i><span>选择文件</span></div>
          </Link>
        </Popover>
				<SelectData3/>
			</div>
		</div>
  )
}


export default Header
