import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { makeGraphQLQuery, makeGraphQLMutation } from './dataservice';
import secureLogo from './assets/secure.svg';
import innovativeLogo from './assets/innovative.svg';

// #region User Registration Form *******

type UserRegisterFormProps = { className: string };

function UserRegisterForm({ className }: UserRegisterFormProps): JSX.Element {
    const registerUserOp = `
                mutation RegisterUser($userData: RegisterUserInput!) {
                    registerUser(userData: $userData) {
                        user {
                            id
                            email
                        }
                    }
                }`;
    const [formValues, setFormValues] = useState({ email: '', password: '' });
    const [mutate] = useMutation(makeGraphQLMutation);

    const clearForm = () => {
        setFormValues({
            email: '',
            password: ''
        });
    };

    const updateField: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value
        });
    };

    const handleCancel: React.MouseEventHandler<HTMLButtonElement> = () => {
        clearForm();
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        console.log(formValues);
        if (formValues.email.length > 0 && formValues.password.length > 0) {
            console.log('submitting form...');
            try {
                await mutate({ query: registerUserOp, variables: { userData: formValues } });
                clearForm();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className={className}>
            <h2 className="text-3xl text-gray-600 text-center">Register for Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-2 text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="px-4 text-gray-700 border-2 border-gray-300 h-12 rounded-lg"
                        value={formValues.email}
                        onChange={updateField}
                    />
                </div>
                <div className="flex flex-col mt-4">
                    <label htmlFor="password" className="mb-2 text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="px-4 text-gray-700 border-2 border-gray-300 h-12 rounded-lg"
                        value={formValues.password}
                        onChange={updateField}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="mr-6 text-gray-900 border-2 border-purple-800 bg-gray-100 rounded-md py-2 px-4 my-4"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="text-gray-900 border-2 border-purple-800 bg-purple-200 rounded-md py-2 px-4 my-4"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}
// #endregion

// #region User List *******

type UserListProps = { className: string };

function UserList({ className }: UserListProps): JSX.Element {
    const statusQuery = 'query { users { id email } }';
    const { data, isLoading } = useQuery(['users', { query: statusQuery }], makeGraphQLQuery);
    if (isLoading) return <Spinner />;
    return (
        <div className={className}>
            <h2 className="text-3xl text-gray-600 text-center border-b-2">User List</h2>

            <div className="px-8 py-4 md:p-4">
                {data?.data?.users?.length > 0 ? (
                    <div className="flex text-gray-500 text-lg">
                        <span className="w-1/2 px-2">Id</span>
                        <span className="w-1/2 px-2">Email</span>
                    </div>
                ) : (
                    <p className="mt-4 text-gray-800"> No users currently registered </p>
                )}

                {data &&
                    data.data?.users?.map((user: { id: string; email: string }) => {
                        return (
                            <div key={user.id} className="flex mb-2">
                                <span className="w-1/2 px-2 text-sm text-purple-900 md:text-base">
                                    {user.id}
                                </span>
                                <span className="w-1/2 px-2 text-sm text-gray-800 md:text-base">
                                    {user.email}
                                </span>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

// #endregion

// #region Spinner *******

function Spinner(): JSX.Element {
    return (
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-900"></div>
        </div>
    );
}

/*
function SmallSpinner(): JSX.Element {
    return (
        <div className="relative z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-900"></div>
        </div>
    );
}
*/

// #endregion

// #region App *******

function App(): JSX.Element {
    const statusQuery = 'query { status }';
    const { data: status, isLoading } = useQuery(
        ['status', { query: statusQuery }],
        makeGraphQLQuery
    );

    if (isLoading) return <Spinner />;

    return (
        <>
            <div className="mt-8 mx-12 flex flex-col justify-center text-center border-2 rounded-lg shadow-md px-4 py-6">
                <h1 className="text-4xl text-purple-900">Hello React!</h1>
                <p className="text-lg text-gray-600">
                    A simple React app built with Typescript and Tailwind CSS
                </p>
                <a
                    className="mx-auto text-gray-900 border-2 border-purple-800 bg-purple-200 rounded-md py-2 px-4 my-4"
                    href="https://github.com/jasonsjones/side-project"
                >
                    View Source
                </a>
            </div>
            {!isLoading && (
                <div className="mt-12 max-w-md mx-auto text-lg text-gray-600 border-2 border-gray-600 rounded-md py-2 text-center">
                    GraphQL server status:
                    <svg
                        className={`w-6 h-6 ml-2 inline-block stroke-current ${
                            status?.data ? 'text-green-500' : 'text-red-600'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {status?.data ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            ></path>
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        )}
                    </svg>
                    {status?.data ? 'All Good!' : 'Ah snap... 😔 '}
                </div>
            )}
            <div className="w-full mx-auto mt-12 px-8 bg-gray-100">
                <h2 className="text-3xl text-purple-900 text-center py-6">Features</h2>
                <div className="flex flex-col justify-around pb-6 lg:flex-row">
                    <div className="flex flex-col justify-center lg:w-1/2">
                        <h3 className="text-2xl text-gray-800 text-center">Secure</h3>
                        <div className="flex flex-col p-4 lg:flex-row">
                            <img
                                src={secureLogo}
                                width="200"
                                alt="secure illustration"
                                className="self-center lg:self-start"
                            />
                            <p className="mt-6 text-gray-600 lg:ml-4 lg:mt-0">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
                                illum laborum libero maxime mollitia, amet consequuntur odit id?
                                Neque quo quaerat numquam minima blanditiis? Inventore, et quos?
                                Optio, nesciunt maiores.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center mt-8 lg:mt-0 lg:w-1/2">
                        <h3 className="text-2xl text-gray-800 text-center">Innovative</h3>
                        <div className="flex flex-col p-4 lg:flex-row">
                            <img
                                src={innovativeLogo}
                                width="200"
                                alt="innovative illustration"
                                className="self-center lg:self-start"
                            />
                            <p className="mt-6 text-gray-600 lg:ml-4 lg:mt-0">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
                                illum laborum libero maxime mollitia, amet consequuntur odit id?
                                Neque quo quaerat numquam minima blanditiis? Inventore, et quos?
                                Optio, nesciunt maiores.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <UserRegisterForm className="w-3/4 mx-auto mt-12 md:w-1/3" />
            <UserList className="w-full mx-auto mt-12 py-6 md:w-3/4 md:py-0" />

            <ReactQueryDevtools initialIsOpen />
        </>
    );
}

// #endregion

export default App;