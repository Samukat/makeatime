import './loader.scss'

interface Props {
    show: Boolean
}

const Loader:React.FC<Props> = (props) => {
    return (
        <>
            <div className='body'>
                <div className={(props.show == true) ? "clock": "hide"}>
                    <span className={(props.show == true) ? "center-dot": "hide"}></span>
                </div>
            </div>
        </>
    )
}

export default Loader