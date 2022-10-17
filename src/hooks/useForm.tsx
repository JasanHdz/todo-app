import type { IValidatorForm } from '@/interfaces';
import { useState } from 'react';

interface Props {
    validator?: (props: IValidatorForm) => void
    handleSubmit: (values: { [key: string]: any }) => Promise<void> | void
}

function useForm({ validator, handleSubmit }: Props) {
    const [values, setValues] = useState<{ [key: string]: any }>({})
    const [errors, setErrors] = useState<{ [key: string]: any }>({})

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist()
        const { target } = event
        const { name, value } = target
        validator && validator({ errors, target, setErrors })
        setValues({
            ...values,
            [name]: value
        })

    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!Object.keys(errors).length && Object.keys(values).length) {
            handleSubmit(values)
        }
    }
    
    
    return {
        values,
        errors,
        onChange,
        onSubmit,
        isDisabled: Boolean(!Object.keys(values).length) || Boolean(Object.keys(errors).length)
    }
}

export default useForm