export const FileContextMenu = ({
    x,
    y,
    path
}) => {

    function handleFileDelete(e){
        e.preventDefault();
        console.log("Deleted file : ",path);
    }


    return(
        <div style={
            {
                width: "120px",
                position: "absolute",
                top: y,
                left: x,
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: "5px"
            }
        }>
            <button 
             onClick={handleFileDelete}
             >
                Delete File
            </button>
            <button>
                Rename File
            </button>
        </div>
    )
}