import Ghe from "../Ghe/index.jsx";

const HangGhe = ({ row }) => {
    if (row.hang === "") {
        return (
            <div className="my-1">
                <span className="firstChar"></span>
                {row.danhSachGhe.map((g, i) => (
                    <button key={i} className="rowNumber">{g.soGhe}</button>
                ))}
            </div>
        );
    }
    return (
        <div className="my-1">
            <span className="firstChar">{row.hang}</span>
            {row.danhSachGhe.map(g => <Ghe key={g.soGhe} ghe={g} />)}
        </div>
    );
};

export default HangGhe;