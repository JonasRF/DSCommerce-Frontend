export default function FormInput(props: any) {

    const { validation, invalid = "false", dirty = "false", onTurnDurty, ...inputPros } = props;

    function handleBlur() {
        onTurnDurty(props.name);
    }

    return (
        <input 
        {...inputPros} 
        onBlur={handleBlur}
        data-invalid={invalid} 
        data-dirty={dirty}
        />
    )
}