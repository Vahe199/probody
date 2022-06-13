import React, {useEffect, useRef, useState} from 'react';

const ControlledInput = (props) => {
    const {value, onChange, ...rest} = props;
    const [cursor, setCursor] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        const input = ref.current;

        if (input && input.type !== 'number') input.setSelectionRange(cursor, cursor);
    }, [ref, cursor, value]);

    const handleChange = async (e) => {
        if (ref.current.getAttribute('data-type') === 'phone') {
            const selectionStart = e.target.selectionStart,
                value = e.target.value,
                finalValue = await onChange(e)

            setCursor(selectionStart + finalValue.length - value.length);
        } else {
            onChange && onChange(e);
            setCursor(e.target.selectionStart);
        }
    };

    return <input ref={ref} value={value} onChange={handleChange} {...rest} />;
};

export default ControlledInput;
