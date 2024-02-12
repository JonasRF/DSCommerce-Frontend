import './styles.css';

type Props = {
    name: string;
  }
  
export default function ButtonPrimary({name}: Props) {

    return(
        <div className="btn dsc-btn-blue">{name}</div>
    );
}