function Err(props) {

    function renderErr() {
        let { err } = props

        if (Object.keys(err).length > 0) {
            return Object.keys(err).map((key, index) => {
                return (
                    <li key={index}>
                        {err[key]}
                    </li>
                )
            })
        }
    }

    return (
        <>
            {renderErr()}
        </>
    );
}

export default Err;