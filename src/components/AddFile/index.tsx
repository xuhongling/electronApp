import React from 'react'
import { message } from 'antd'
import styles from './style.less'

export default class AddFile extends React.Component {
	myRefInput: React.RefObject<HTMLInputElement>

	constructor(props:any) {
		super(props)
		this.myRefInput = React.createRef()
	}

	uploadCSVFile = ()=> {
		let myRefInput:any = this.myRefInput.current
		let file:any = myRefInput.files[0]	//取到当前上传的文件
		let fileType:any = file.name.split('.') 	//取到文件名并使用“.”进行切割
		if(fileType[fileType.length - 1] !== 'csv') {	 //判断文件类型
			message.warning('文件类型错误，请选择正确的csv文件数据！')  //给用户提示
			return
		}
		let reader = new FileReader() 	//new一个FileReader对象实例
		reader.readAsText(file)  //读取csv文件
		reader.onload = () => {		//读取成功完成后出发事件
			let fileData:any = reader.result	 //获取读取的数据
			let relArr = fileData.split("\r\n")
			let fileDataArr = []
			if(relArr.length > 1) {
				let fileTiele = relArr[0].split(',')
				for (let i = 1; i < relArr.length; i++) {
					let fileList = relArr[i].split(',')
					let obj = {}
					for (let j = 0; j < fileList.length; j++) {
						obj[fileTiele[j]] = fileList[j]
					}
					fileDataArr.push(obj)
				}
			}
			console.log(fileDataArr,'fileDataArr')
		}
	}

	public render() {
		return (
			<div className={styles.addFile}>
				<div className={styles.main}>
					<svg className="icon" aria-hidden="true">
				    <use href="#icon-csv"></use>
					</svg>
					<p>请选择要车辆诊断的数据文件</p>
					<div className={styles.btnWrapper}>
						<button>选择文件</button>
						<input type="file" id="csvFile" ref={this.myRefInput} onChange={this.uploadCSVFile} accept=".csv"/>
					</div>
				</div>
			</div>
		)
	}
}