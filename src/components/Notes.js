import React, { useState, useContext, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import { AddNote } from './AddNote'
import { Noteitem } from './Noteitem'
import { useHistory } from 'react-router-dom'

export const Notes = (props) => {
    const context = useContext(noteContext)
    let history = useHistory()
    const { notes, getNotes, editNote } = context
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else {
            history.push("./login")
        }
        // eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const ref = useRef(null)
    const cref = useRef(null)

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        cref.current.click()
        props.showAlert("success", "Note Updated Successfully!")
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const setWidth = (e) => {
        // console.log(e.target.value.length)
        e.target.style.width = 
            ((e.target.value.length + 4) + 'ch')
    }


    return (
        <>
            {/* <AddNote showAlert={props.showAlert}/> */}
            <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="h1wd modal-title fs-5" id="exampleModalLabel"><input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange} /></h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="eform" className='my'>
                                {/* <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange} />
                                </div> */}
                                <div className="mb-3">
                                    {/* <label htmlFor="edescription" className="form-label">Description</label> */}
                                    <textarea row="7" type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} minLength={5} required />
                                </div>
                                <div id="utag" className="mt-4">
                                    {/* <label htmlFor="etag" className="form-label">Tag</label> */}
                                    <input type="text" className="container text-center form-control" id="etag" name="etag" value={note.etag} onChange={onchange} minLength={5} required onKeyDown={setWidth}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={cref} type="button" className="d-none btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn butt_out" onClick={handleClick}>Edit Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <p className='textgradient'>Your Notes</p>
                {notes.length === 0 && <span className='text-center display-6 my-3'>No notes to display</span>}
                {notes.map((note) => {
                    return (
                        <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                    )
                })}
            </div>
        </>
    )
}
