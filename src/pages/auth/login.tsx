import type { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { getSession } from 'next-auth/react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { Button, Input } from '@/components'
import { useForm } from '@/hooks'
import { AuthContext } from '@/context'
import { validatorSignInForm } from '@/utils'


function SignInPage() {
    const { loginWithCredentials, loginWithSocials, errorAuth } = useContext(AuthContext)
    const { onChange, onSubmit, isDisabled, values, errors } = useForm({ handleSubmit: loginWithCredentials, validator: validatorSignInForm })
    return (
        <div className='min-h-screen flex justify-center md:px-4 lg:px-0'>
            <section className='bg-white relative z-10 flex justify-center items-center min-w-full md:min-w-max shadow-2xl py-10 md:px-28'>
                <div className='w-full mx-auto max-w-md px-4 md:w-96 md:max-w-sm md:px-0'>
                    <div className='mb-10'>
                        <div className='mb-20'>
                            <p>LOGO</p>
                        </div>
                        <h2 className='text-lg font-bold mb-2'>Iniciar sesión en su cuenta</h2>
                        <p>¿No tengo una cuenta?
                            <Link href="/auth/register">
                                <a className='text-blue-600 font-semibold'> Registrarme</a>
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
                        <Input hintText={errors?.email} hasError={Object.hasOwn(errors, 'email')} label='Dirección de correo electrónico' type='email' name='email' onChange={onChange} />
                        <Input hintText={errors?.password} hasError={Object.hasOwn(errors, 'password')} label='Contraseña' type='password' name='password' onChange={onChange} />
                        <Button disabled={isDisabled || !values?.password?.length} className='gap-3'>Login <span>→</span></Button>
                        <hr />
                        <div className='flex flex-col gap-4'>
                            <Button type='button' variant='secondary' className='gap-3' onClick={() => loginWithSocials('google')}>
                                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fillRule="evenodd" fillOpacity="1" fill="#4285f4" stroke="none"></path><path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fillRule="evenodd" fillOpacity="1" fill="#34a853" stroke="none"></path><path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fillRule="evenodd" fillOpacity="1" fill="#fbbc05" stroke="none"></path><path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fillRule="evenodd" fillOpacity="1" fill="#ea4335" stroke="none"></path></svg>
                                <p>Continuar con Google</p>
                            </Button>
                            <Button type='button' variant='secondary' className='gap-3' onClick={() => loginWithSocials('github')}>
                                <svg height="20" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="20" data-view-component="true" className="octicon octicon-mark-github">
                                    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                                </svg>
                                <p>Continuar con Github</p>
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
            <div className='hidden sm:contents lg:relative lg:block lg:flex-1' id='background'>
                <Image width="1664" height="1866" layout='fill' className='absolute inset-0 h-full w-full object-cover' src="/background-auth.jpg" alt="background" />
            </div>
        </div>
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

export default SignInPage