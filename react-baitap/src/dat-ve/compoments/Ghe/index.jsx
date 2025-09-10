import { useDispatch, useSelector } from 'react-redux';
import { chonGhe } from "../../../store/datVe.js";

const Ghe = ({ghe}) => {
    const dispatch = useDispatch();
    const gheDangChon = useSelector(state => state.datVe.gheDangChon);
    const daChon = gheDangChon.find(g => g.soGhe === ghe.soGhe);

    const isDangChon = daChon?.dangChon === true;

    const classGhe = [
        "ghe",
        ghe.daDat ? "gheDuocChon" : "",
        isDangChon ? "gheDangChon" : ""
    ].join(" ");

    return (
        <button
            className={classGhe}
            disabled={ghe.daDat}
            onClick={() => dispatch(chonGhe(ghe))}
            title={ghe.soGhe}
        >
            {ghe.soGhe}
        </button>
    )
}

export default Ghe;