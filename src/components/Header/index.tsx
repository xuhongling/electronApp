import React from 'react'
import SelectData3 from 'components/SelectData3'
import styles from './style.less'

const Header:React.FC = () => {

  return (
    <div className={styles.header}>
    	<div className={styles.leftWrap}>
    		<div className={styles.logo}></div>
    	</div>
			<div className={styles.rightWrap}>
				<SelectData3/>
			</div>
		</div>
  )
}


export default Header
