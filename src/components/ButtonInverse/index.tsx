import './styles.css';

type Props = {
    name: string;
  }

export default function ButtonInverse({name}: Props) {

    return(
        <div className="btn dsc-btn-white">{name}</div>
    );

}