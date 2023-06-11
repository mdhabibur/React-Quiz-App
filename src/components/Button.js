import clasess from "../styles/Button.module.css";

export default function Button({children}) {
    return(

        <div className={clasess.button}>
        <span> {children} </span>
        </div>

    );
}