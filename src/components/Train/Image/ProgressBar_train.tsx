import 'components/Train/Image/Image.css';

interface Props {
    id: number;
    completed: any;
    label: any;
}

function ProgressBar_train({ id, completed, label }: Props) {
    let bgcolor;

    // completed = 20;
    // label = "aaaa";

    if (id % 5 === 0) {
        bgcolor = '#3498DB';
    } else if (id % 5 === 1) {
        bgcolor = '#FFA07A';
    } else if (id % 5 === 2) {
        bgcolor = '#00695c';
    } else if (id % 5 === 3) {
        bgcolor = '#6a1b9a';
    } else if (id % 5 === 4) {
        bgcolor = '#ef6c00';
    }

    const outerContainerStyle = {
        border: '1px solid black',
        display: 'flex',
    } as React.CSSProperties;

    const labelStyles = {
        width: '20%',
        border: '1px solid black',
        padding: 0,
        color: bgcolor,
        fontWeight: 'bold',
    } as React.CSSProperties;

    const barContainerStyles = {
        height: 20,
        width: '80%',
        backgroundColor: '#e0e0de',
        borderRadius: 50,
        margin: 3,
    } as React.CSSProperties;

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 1s ease-in-out',
    } as React.CSSProperties;

    const valueStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold',
    } as React.CSSProperties;

    return (
        <div style={outerContainerStyle}>
            <span style={labelStyles}>{`${label}`}</span>
            <div style={barContainerStyles}>
                {/* <input /> */}
                <div style={fillerStyles}>
                    {/* <input /> */}
                    <span style={valueStyles}>{`${completed}%`}</span>
                </div>
            </div>
        </div>
    );
}

export default ProgressBar_train;
