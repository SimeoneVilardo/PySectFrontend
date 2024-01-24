const Spinner = ({ className = "" }) => {

    return (<div className="flex my-20">
        <div className="m-auto">
            <span className={`loading loading-spinner ${className}`}></span>
        </div>
    </div>)
}

export default Spinner