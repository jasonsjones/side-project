import React, { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { makeGraphQLFileUpload } from '../../dataservice';
import { Button } from '../common';

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
export default FileUpload;
