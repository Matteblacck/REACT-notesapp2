import styled from "styled-components"
import NotesList from "./components/NotesList";
import Header from '../../widgets/Header';
//Styled
const Container = styled.div`
    padding-top: 0.5rem;
`
const NotesContainer = styled.div`

`
//styled
export default function MainPage(){
    return (
        <>
        <Header/>
        <Container className="container">    
            <NotesContainer className='row'>
                {/* <div className="col-3">
                    <h1>Side menu</h1>
                </div>  */}
                <div className="col-12">
                    <NotesList/>
                </div>
            </NotesContainer>

        </Container>
        
        </>
    )
}