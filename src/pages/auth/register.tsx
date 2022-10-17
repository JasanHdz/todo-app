import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from 'next-auth/react';
import { XCircleIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react';
import { useForm } from '@/hooks';
import { AuthContext } from 'context/auth'
import { validatorSignUpForm } from '@/utils';
import { Button, Input, OpenGraph } from '@/components'

function RegisterPage() {
    const { signUp, errorAuth } = useContext(AuthContext)
    const { onChange, onSubmit, isDisabled, errors } = useForm({ handleSubmit: signUp, validator: validatorSignUpForm })

    return (
        <>
            <OpenGraph title='Registrate a TodoAPP' description='Crea un cuenta en TODO APP y comienza a organizar tu agenda de una manera divertida' />
            <div className='min-h-screen flex justify-center md:px-4 lg:px-0'>
                <section className='bg-white relative flex justify-center items-center z-10 min-w-full md:min-w-max shadow-2xl py-10 md:px-28'>
                    <div className='w-full mx-auto max-w-md px-4 md:w-96 md:max-w-sm md:px-0'>
                        <div className='mb-10'>
                            <div className='mb-20'>
                                <p>LOGO</p>
                            </div>
                            <h2 className='text-lg font-bold mb-2'>Registrate Ahora</h2>
                            <p>¿Ya tienes cuenta?
                                <Link href="/auth/login">
                                    <a className='text-blue-600 font-semibold'> Iniciar sesión</a>
                                </Link>
                            </p>
                        </div>

                        {!!errorAuth.length && (
                            <div className='mb-10 bg-gray-200 rounded-lg p-2 text-red-500 flex items-center justify-center gap-3'>
                                <XCircleIcon className='w-5 h-5 text-red-500' />
                                <p>{errorAuth}</p>
                            </div>
                        )}

                        <form className='flex flex-col gap-y-8' onSubmit={onSubmit}>
                            <div className='grid grid-cols-2 gap-4'>
                                <Input hintText={errors?.name} hasError={Object.hasOwn(errors, 'name')} label='Nombre' name='name' type='text' onChange={onChange} />
                                <Input hintText={errors?.lastName} hasError={Object.hasOwn(errors, 'lastName')} label='Apellido (Opcional)' type='text' name='lastName' onChange={onChange} />
                            </div>
                            <Input hintText={errors?.email} hasError={Object.hasOwn(errors, 'email')} label='Dirección de correo electrónico' type='email' name='email' onChange={onChange} />
                            <Input hintText={errors?.password} hasError={Object.hasOwn(errors, 'password')} label='Contraseña' type='password' name='password' onChange={onChange} />
                            <Button disabled={isDisabled} className='gap-3'>Registrarme <span>→</span></Button>
                        </form>
                    </div>
                </section>
                <div className='hidden sm:contents lg:relative lg:block lg:flex-1' id='background'>
                    <Image width="1664" height="1866" layout='fill' className='absolute inset-0 h-full w-full object-cover' src="/background-auth.jpg" alt="background" />
                </div>
            </div>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req })

    const { redirect = '/' } = query

    if (session) {
        return {
            props: {},
            redirect: {
                destination: redirect,
                permanent: false
            },
        }
    }

    return {
        props: {}
    }
}

export default RegisterPage