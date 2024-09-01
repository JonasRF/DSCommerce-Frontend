export default function FormInput(props: any) {

    const { validation,  ...inputPros } = props;

    return (
        <input {...inputPros} />
    )
}