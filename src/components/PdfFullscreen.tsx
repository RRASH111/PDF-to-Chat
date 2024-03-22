import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Expand, Loader2 } from 'lucide-react'
import SimpleBar from 'simplebar-react'
import { Document, Page } from 'react-pdf'
import { useResizeDetector } from "react-resize-detector"

interface PdfRendererProps {
    fileurl: string
}

const PdfFullscreen = ({fileUrl} : PdfFullscreenProps) => {
    const [isOpen, setIsOpen] = useState()
    const [numPages, setNumPages] = useState<number>()
    const [currPage, setCurrPage] = useState<number>(1)

    const {width, ref} = useResizeDetector()

  return (
    <Dialog
        open={isOpen}
        onOpenChange={(v) => {
        if(!v){
            setIsOpen(v)
        }
    }}
    >
        <DialogTrigger onClick={() => setIsOpen(true)} asChild>
            <Button aria-lable='fullscreen' variant='ghost' className='gap-1.5'>
                <Expand className='h-4 w-4'/>
            </Button>
        </DialogTrigger>
        <DialogContent className='max-w-7xl w-full'>
            <SimpleBar autoHide={false} className='max-h-[calc(100vh-10rem)] mt-6'>
            <div ref={ref}>
            <Document loading={
              <div className="flex justify-center">
                <Loader2 className="my-24 h-6 w-6  animate-spin"/>
              </div>
            } 
            onLoadError={() => {
              <div>Error</div>
            }}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            
              file={fileUrl} className="max-h-full">
              {new Array(numPages).fill(0).map((_, i) => (
                <Page key={i} width={width ? width : 1} pageNumber={i + 1} />
              ))}
            </Document>
          </div>
            </SimpleBar>
        </DialogContent>
    </Dialog>
  )
}

export default PdfFullscreen