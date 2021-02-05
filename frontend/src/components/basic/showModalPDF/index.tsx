import React from 'react';
import { useState } from 'react';
import { Container, Modal, Button, Image } from 'semantic-ui-react';

interface Props {
  title: string;
  pdfUrl: string;
  modalOpen: boolean;
  onClose: () => void;
}

export const ShowModalPDF = ({ title, pdfUrl, modalOpen, onClose }: Props) => {
  const [actPage, setactPage] = useState<number>(1);
  const [maxPage, setmaxPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [pageToShow, setPageToShow] = useState<string>('');

  console.log('show', pdfUrl)
  if (pdfUrl==='') {
    return (
      <></>
    )
  };

  const PDFJS = (window).pdfjsLib;

  const nextPage = () => {
    if (actPage < maxPage) setactPage(actPage+1);
  };

  const prevPage = () => {
    if (actPage > 1) setactPage(actPage-1);
  };

  const smaller = () => {
    if (scale > 0.5) setScale(scale - 0.25);
  };

  const greater = () => {
    if (scale < 1.5) setScale(scale + 0.25);
  };

  let pdfDoc: any = null;

  PDFJS.getDocument(pdfUrl).promise.then(function(pdfDoc_: any) {
    pdfDoc = pdfDoc_;
    const { numPages } = pdfDoc;
    setmaxPage(numPages);
    renderPage(actPage);
  });
  
  const renderPage = (num: number) => {
    pdfDoc.getPage(num).then(function(page: any) {
      const viewport = page.getViewport({scale: scale});
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;  
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };
      const renderTask = page.render(renderContext);
      renderTask.promise.then(function() {
        setPageToShow(canvas.toDataURL());
      });
    });  
  }

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Container textAlign="left">
          <Button type="button" disabled color="blue" style={{ height: '40px', width: '100px' }}>
            {actPage} von {maxPage}
          </Button>
          <Button type="button" onClick={onClose} color="blue" style={{ height: '40px', width: '100px' }}>
            Schliessen
          </Button>
          <Button type="button" onClick={prevPage} color="blue" style={{ height: '40px', width: '100px' }}>
            Zurück
          </Button>
          <Button type="button" onClick={nextPage} color="blue" style={{ height: '40px', width: '100px' }}>
            Vorwärts
          </Button>
          <Button type="button" onClick={smaller} color="blue" style={{ height: '40px', width: '100px' }}>
            Kleiner
          </Button>
          <Button type="button" onClick={greater} color="blue" style={{ height: '40px', width: '100px' }}>
            Größer
          </Button>
          <br></br>
          <br></br>
          {pageToShow!==''&&<Image className="open-new-window" src={pageToShow}/>}
        </Container>   
      </Modal.Content>
    </Modal>
  )};

export default ShowModalPDF;
