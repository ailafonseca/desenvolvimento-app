import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function MyDropzone ({ callback }) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new global.FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        if (callback) {
          callback(file.name, file.type, reader.result)
        }
      }
      reader.readAsDataURL(file)
    })
  }, [callback])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Clique ou arraste o aqruivo aqui para enviar</p>
    </div>
  )
}
