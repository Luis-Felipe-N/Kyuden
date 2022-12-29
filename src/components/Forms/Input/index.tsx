import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";


interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string,
    label: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = ({error, label, type, placeholder, ...props}: IInputProps) => {
    return (
        <label>
            {label}
            <input 
                // ={!!error}
                {...props}
                type={type}
                placeholder={placeholder}
            />
            {!!error ? (
                <p>{error}</p>

            ) : (
                <p></p>
            )}
        </label>
    )
}

export const Input = forwardRef(InputBase)