import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState, actions } from '@/store'
import { message } from 'antd'
// import computeFileData from 'utils/computeFileData'
import monitorRule from 'static/monitorRule'
import styles from './style.less'

type Props = ReturnType<typeof bindActionCreators> & {
  history: any
}

// @ts-ignore: 不可达代码错误。 用装饰器简写方式
@connect(
  (state: RootState) => ({ fileData: state.fileData.fileData }),
  dispatch => ({
    ...bindActionCreators(
      {
        setFileData: (fileData: any[]) => actions.fileData.setFileData(fileData)
      },
      dispatch
    )
  })
)
export default class AddFile extends React.Component<Props> {
	myRefInput: React.RefObject<HTMLInputElement>

	constructor(props:Props) {
		super(props)
		this.myRefInput = React.createRef()
	}

	componentDidMount() {
		
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
		reader.readAsText(file, 'GB2312')  //读取csv文件.
		//console.log(reader.readAsText(file,'utf-8'),'reader utf-8')
		//console.log(reader.readAsText(file,'GB2312'),'reader GB2312')
		reader.onload = () => {		//读取成功完成后出发事件
			console.time()
			let fileData:any = reader.result	 //获取读取的数据
			let relArr = fileData.split("\r\n")
			let fileDataArr = []
			if(relArr.length > 1) {
				// fileTiele: ["序号", "传输方向", "时间标识", "名称", "帧ID(靠右对齐)", "帧格式", "帧类型", "数据长度", "数据(HEX)"]
				let fileTiele = relArr[0].split(',')
				for (let i = 0; i < fileTiele.length; i++) {
					if (fileTiele[i].indexOf('时间') !== -1) {
						fileTiele[i] = 'TimeID'
					}
					if (fileTiele[i].indexOf('ID') !== -1 && fileTiele[i] !== 'TimeID') {
						fileTiele[i] = 'CanID'
					}
					if (fileTiele[i].indexOf('数据') !== -1 && fileTiele[i].indexOf('长度') === -1) {
						fileTiele[i] = 'DataHEX'
					}
				}
				for (let i = 1; i < relArr.length; i++) {
					// fileList: ["0", "接收", "15:18:28:508", "", "0x0cf401e8", "数据帧", "扩展帧", "8", "70 17 70 17 58 02 E8 03"]
					let fileList = relArr[i].split(',')
					let obj = {}
					for (let j = 0; j < fileList.length; j++) {
						if (fileList[j].indexOf(':') !== -1 ) {
							// .substr(0,8)
							obj[fileTiele[j]] = fileList[j]
						}else{
							obj[fileTiele[j]] = fileList[j]
						}
					}
					fileDataArr.push(obj)
				}
			}

			// 删选初始数据里的重复数据
			let newArr:any = {}
			let selectFileData = fileDataArr.reduce((item:any, next:any)=> {
				// 如果临时对象中有这个名字，什么都不做
		    if (newArr[next.CanID] && newArr[next.TimeID] && newArr[next.DataHEX]) {
		    	// code...
		    }else{
		    	newArr[next.CanID] = true
		    	newArr[next.TimeID] = true
		    	newArr[next.DataHEX] = true
		    	item.push(next)
		    }
		    return item
			}, [])
			
			// 调用，在Web Worker里面处理计算
			this.setWebWorker(selectFileData, monitorRule)
			// 把 fileData 数据设置全局访问
			this.props.setFileData(selectFileData)
			// 跳转展示图表页面
			this.props.history.push('/wholeCar')
		}
	}

	//在Web Worker里面处理计算
	setWebWorker = (fileData:any[], monitorRule:any)=> {
		if (fileData.length===0) {
			return
		}
		let worker = new Worker('js/WebWorker.js')
		worker.postMessage({fileData, monitorRule})
		worker.onmessage = function (event) {
			console.timeEnd()
			console.log(event.data)
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