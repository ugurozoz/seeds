
interface nodeParams {
    value: number;
    left: null | any;
    right: null | any;
}

const node:React.FC<nodeParams> = ({ value, left, right }) => {
    return (
        <div className="node">
            {value}
        </div>
    );
}

export default node;