/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function FormTextArea(props: any) {

    const { validation, invalid = "false", dirty = "false", onTurnDurty, ...textareaPros } = props;

    function handleBlur() {
        onTurnDurty(props.name);
    }

    return (
        <textarea
        {...textareaPros} 
        onBlur={handleBlur}
        data-invalid={invalid} 
        data-dirty={dirty}
        />
    )
}