import { Oval } from 'react-loader-spinner';

function Spinner() {
    return (<Oval
        visible={true}
        height="80"
        width="80"
        color="#cd3e94"
        secondaryColor='#e17fad'
        ariaLabel="oval-loading"
        wrapperStyle={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        wrapperClass=""
    />)
}

export default Spinner;