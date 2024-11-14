export default function FormInput(props: any) {

    const { validation, invalid, ...inputPros } = props;

    return (
        <input {...inputPros} data-invalid={invalid} />
    )
}