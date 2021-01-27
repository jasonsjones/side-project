import React, { useRef, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useMutation, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { makeGraphQLQuery, makeGraphQLFileUpload } from './dataservice';
import secureLogo from './assets/secure.svg';
import innovativeLogo from './assets/innovative.svg';
import { Button } from './components/common';
import Footer from './components/Footer';
import Nav from './components/Nav';
import LoginPage from './containers/LoginPage';
import UserRegisterPage from './containers/UserRegisterPage';

const queryClient = new QueryClient();

// #region User Card *******

type UserCardProps = {
    user: {
        id?: string;
        displayName?: string;
        email?: string;
    };
};

function UserCard({ user }: UserCardProps): JSX.Element {
    return (
        <div className="flex p-4 transition duration-200 ease-in-out border-2 border-purple-600 rounded-md shadow-md transform hover:bg-purple-100 hover:scale-105 hover:shadow-lg">
            <img
                src="http://localhost:3000/default/avatar.png"
                alt="default avatar"
                className="w-24 rounded-full border-2 border-purple-300"
            />
            <div className="flex flex-col justify-center ml-4 text-purple-900">
                <span>{user.displayName}</span>
                <span>{user.email}</span>
            </div>
        </div>
    );
}

// #endregion

// #region User List *******

type UserListProps = { className: string };

function UserList({ className }: UserListProps): JSX.Element {
    const statusQuery = 'query { users { id displayName email } }';
    const { data, isLoading } = useQuery(['users', { query: statusQuery }], makeGraphQLQuery);
    if (isLoading) return <Spinner />;
    return (
        <div className={className}>
            <h2 className="text-3xl text-gray-600 text-center border-b-2">User List</h2>

            <div className="px-8 py-4 md:p-4">
                {data?.data?.users?.length > 0 ? (
                    <div className="flex text-gray-500 text-lg">
                        <span className="w-1/2 px-2">Id</span>
                        <span className="w-1/2 px-2">Name</span>
                        <span className="w-1/2 px-2">Email</span>
                    </div>
                ) : (
                    <p className="mt-4 text-gray-800"> No users currently registered </p>
                )}

                {data &&
                    data.data?.users?.map(
                        (user: { id: string; displayName: string; email: string }) => {
                            return (
                                <div key={user.id} className="flex mb-2">
                                    <span className="w-1/2 px-2 text-sm text-purple-900 md:text-base">
                                        {user.id}
                                    </span>
                                    <span className="w-1/2 px-2 text-sm text-gray-800 md:text-base">
                                        {user.displayName}
                                    </span>
                                    <span className="w-1/2 px-2 text-sm text-gray-800 md:text-base">
                                        {user.email}
                                    </span>
                                </div>
                            );
                        }
                    )}
            </div>
            <h2 className="mb-2 text-3xl text-gray-600 text-center">User Cards</h2>
            <div className="grid grid-flow-rows grid-col-1 mx-8 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {data &&
                    data.data?.users?.map(
                        (user: { id: string; displayName: string; email: string }) => {
                            return <UserCard key={user.id} user={user} />;
                        }
                    )}
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

// #region Hero Banner *******

function HeroBanner(): JSX.Element {
    return (
        <div className="flex flex-col justify-center text-center border-2 rounded-lg shadow-md px-4 py-6">
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
    );
}

// #endregion

// #region Server Status *******

function ServerStatus(): JSX.Element {
    const statusQuery = 'query { status }';
    const { data: status, isLoading } = useQuery(
        ['status', { query: statusQuery }],
        makeGraphQLQuery
    );

    if (isLoading) return <Spinner />;

    return (
        <>
            {!isLoading && (
                <div className="text-lg text-gray-600 border-2 border-gray-600 rounded-md py-2 text-center">
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
        </>
    );
}

// #endregion

// #region Features Section ********

function Features(): JSX.Element {
    return (
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
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci illum
                            laborum libero maxime mollitia, amet consequuntur odit id? Neque quo
                            quaerat numquam minima blanditiis? Inventore, et quos? Optio, nesciunt
                            maiores.
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
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci illum
                            laborum libero maxime mollitia, amet consequuntur odit id? Neque quo
                            quaerat numquam minima blanditiis? Inventore, et quos? Optio, nesciunt
                            maiores.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// #endregion

// #region File upload *******

function FileUpload(): JSX.Element {
    const imgRef = useRef<HTMLImageElement>(null);
    const [highlight, setHighlight] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState('');

    const mutation = useMutation(makeGraphQLFileUpload);

    const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (e) => {
        setHighlight(true);
    };
    const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
        setHighlight(false);
    };
    const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
    };

    const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setHighlight(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            processFile(file);
        }
    };

    const handleChooseFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target && e.target.files) {
            processFile(e.target.files[0]);
        }
    };

    const handleFileUpload = (e: React.MouseEvent) => {
        const AvatarUploadOp = `
mutation AvatarUpload ($image: Upload!) {
    avatarUpload(image: $image)
}
`;
        const variables = { image: null, operationName: 'UploadAvatar' };

        mutation.mutate(
            { query: AvatarUploadOp, variables, file: image as File },
            {
                onSuccess: () => {
                    clearFile();
                }
            }
        );

        // update to use the useMutation hook from react-query
        // makeGraphQLFileUpload({ query: AvatarUploadOp, variables }, image as File).then(
        //     ({ data }) => {
        //         if (data.avatarUpload) {
        //             clearFile();
        //         }
        //     }
        // );
    };

    const processFile = (file: File): void => {
        if (file.type === 'image/png') {
            setImage(file);
            setError('');
            const reader = new FileReader();
            reader.onloadend = function () {
                if (imgRef.current) {
                    imgRef.current.src = reader.result as string;
                }
            };
            if (file) {
                reader.readAsDataURL(file);
            } else {
                if (imgRef.current) {
                    imgRef.current.src = '';
                }
            }
        } else {
            setError('Invalid file extension');
        }
    };

    const clearFile = (): void => {
        setImage(null);
    };

    return (
        <div className="text-gray-700">
            <h3 className="text-center text-2xl mb-2">Upload Image</h3>
            <p className="italic text-center mb-2">
                Note: Currently, the API drops this on the floor...
            </p>
            {!image && (
                <div>
                    <div
                        className={`p-6 border-2 border-dashed rounded-lg text-center ${
                            highlight ? 'border-green-600 bg-green-100' : 'border-gray-400'
                        }`}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        Drop Zone <em>(.png only)</em>
                    </div>
                    {error && <p className="mt-2 text-red-700">Error: {error}</p>}
                    <div className="mt-8">
                        <label
                            htmlFor="file-upload"
                            className="border-2 rounded-lg p-4 cursor-pointer"
                        >
                            Choose File
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            accept="image/png"
                            onChange={handleChooseFile}
                        />
                    </div>
                </div>
            )}
            {image && (
                <div>
                    <div className="mt-4 p-4 flex border-2 rounded-lg">
                        <img
                            src=""
                            className="h-24 w-24 rounded-full"
                            alt="Avatar preview"
                            ref={imgRef}
                        />
                        <div className="ml-8 pt-4 text-gray-700 flex justify-between w-full">
                            <span className="">{image.name}</span>
                            <span>{image.size / 1000} Kb</span>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button className="my-4 mr-6" variant="secondary" clickAction={clearFile}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            className="my-4"
                            variant="primary"
                            clickAction={handleFileUpload}
                        >
                            Upload
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

// #endregion

// #region Home *******

function Home(): JSX.Element {
    return (
        <>
            <div className="mt-8 mx-12">
                <HeroBanner />
            </div>

            <div className="mt-12 max-w-md mx-auto">
                <ServerStatus />
            </div>

            <Features />
            <UserList className="w-full mx-auto mt-12 py-6 md:w-3/4 md:py-0" />

            <div className="my-4 mx-auto max-w-md">
                <FileUpload />
            </div>
        </>
    );
}

// #endregion

// #region Layout *******

function Layout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="flex flex-col h-screen">
            <Nav />
            <div className="flex-grow flex-shrink-0 pb-6">{children}</div>
            <Footer />
        </div>
    );
}

// #endregion

// #region App *******

function App(): JSX.Element {
    return (
        <BrowserRouter>
            <Layout>
                <QueryClientProvider client={queryClient}>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/login">
                            <LoginPage />
                        </Route>
                        <Route exact path="/register">
                            <UserRegisterPage />
                        </Route>
                    </Switch>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </Layout>
        </BrowserRouter>
    );
}

// #endregion

export default App;
