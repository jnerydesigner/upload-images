import React from 'react';
import { DropzoneOptions, DropzoneRootProps, DropzoneState } from 'react-dropzone';
import { DropzoneArea, Container, UploadMessage } from './styles';

interface DragProps extends DropzoneOptions {

}

interface DropRootProps extends DropzoneRootProps {

}

export function Upload(
  { ...restDropzone }: DragProps,
  { ...restRoot }: DropRootProps,
  // { isDragActive }: DropzoneState
) {

  function handleDragMessage(isDragActive = false) {
    if (!isDragActive) {
      return <UploadMessage>Arraste os arquivos para cá</UploadMessage>
    }
  }

  return (
    <DropzoneArea
      {...restDropzone}
      {...restRoot}
      onDrop={acceptedFiles => console.log(acceptedFiles)}
    >
      {({ getRootProps, getInputProps, isDragReject }) => (
        <Container
          {...getRootProps()}
          isDragReject={isDragReject}
        // isDragActive={isDragActive}
        >
          <input {...getInputProps()} />
          <UploadMessage>Arraste os arquivos para cá</UploadMessage>
        </Container>
      )}
    </DropzoneArea>
  )
}