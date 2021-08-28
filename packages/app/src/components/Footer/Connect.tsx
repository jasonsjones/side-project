function Connect(): JSX.Element {
    return (
        <section className="sm:ml-6">
            <h3 className="text-xl font-semibold my-4 sm:mt-0 text-center sm:text-left">Connect</h3>
            <div className="flex justify-around sm:flex-col">
                <a
                    href="https://github.com/jasonsjones"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 hover:text-purple-200"
                    data-testid="connect on github"
                >
                    <svg
                        className="inline-block fill-current"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="24"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                        ></path>
                    </svg>
                    <span className="ml-2">github</span>
                </a>

                <a
                    href="https://twitter.com/_jasonsjones"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-6 sm:ml-0 hover:text-purple-200"
                    data-testid="connect on twitter"
                >
                    <svg
                        className="inline-block fill-current"
                        viewBox="0 0 24 24"
                        width="24"
                        aria-hidden="true"
                    >
                        <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                    </svg>
                    <span className="ml-2">twitter</span>
                </a>
            </div>
        </section>
    );
}

export default Connect;
