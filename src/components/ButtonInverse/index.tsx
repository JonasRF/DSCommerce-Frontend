import './styles.css';

type Props = {
    text: string;
  }

export default function ButtonInverse({text}: Props) {

    return(
        <div className="btn dsc-btn-white">{text}</div>
    );

}