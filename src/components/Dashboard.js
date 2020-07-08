import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import 'primeicons/primeicons.css';
import $ from 'jquery'

export default (props) => {

    const [notes, setNotes] = React.useState(null)
    const [formData, updateFormData] = React.useState(null);
    const [value, setValue] = useState('');
    const [showSidebar, setshowSidebar] = React.useState(true)
    let [noteTitle, setNoteTitle] = React.useState(null);
    let [noteBody, setNoteBody] = React.useState(null);
    let [noteId, setNoteId] = React.useState("");
    const [edit, setEdit] = React.useState(false);
    const [newNote, setnewNote] = React.useState(true);

    // Get all of the users notes from the API
    const getNotes = async () => {
        const response = await fetch('http://backend-scribe.herokuapp.com/notes', {
            headers: { Authorization: `bearer ${userData.token}` }
        })
        const result = await response.json();
        if (result.length > 0) {
            setNotes(result)
        } else {
            setNotes(null);
        }

    }

    //update form data with change in the editor
    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };

    //add note to users collection
    const addNote = async (e) => {
        console.log(value)
        console.log(userData)
        console.log(formData);

        e.preventDefault()

        let finalData = formData;
        finalData.notes = value;
        console.log(finalData)

        const response = await fetch(`http://backend-scribe.herokuapp.com/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                Authorization: `bearer ${userData.token}`
            },
            body: JSON.stringify(finalData)
        });

        console.log(response)
        getNotes()
        setshowSidebar(true);
        newMode();

    }

    //edit note to users collection
    const editNote = async (event, id) => {

        event.preventDefault()
        
        console.log(noteBody)
        console.log(userData)
        console.log(formData);



        let finalData1 = {title: noteTitle, notes: noteBody}

        await fetch(`http://backend-scribe.herokuapp.com/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                Authorization: `bearer ${userData.token}`
            },
            body: JSON.stringify(finalData1)
        });

        getNotes()
        setshowSidebar(true);
        newMode();

    }

    //set mode of editor to edit mode
    const editData = (string, head, body, identification) => {
        setEdit(true)
        setnewNote(false)
        setNoteTitle(head);
        setNoteBody(body);
        setNoteId(identification);

    }

    const newMode = () => {
        $("#title").val("");
        setValue("")
        setEdit(false)
        setnewNote(true)

        
    }

    //Delete Note from users collection
    const handleDelete = async (id) => {
        await fetch(`http://backend-scribe.herokuapp.com/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json",
                Authorization: `bearer ${userData.token}`
            }
        })
        getNotes();
        newMode();
    }

    //functionality for the logout button
    const { userData, setUserData } = useContext(UserContext)
    const history = useHistory();

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.removeItem("auth-token")
        history.push('/')
    }

    //styling for the editor
    const divStyle = {
        'height': '50vh',
        'overflow': 'hidden',
        'width': '100%',
        'borderBottom': '1px solid #d8d8d8',
    }

    //toggle sidebar visibility
    const toggleSidebar = () => {
        if (showSidebar === true) {
            setshowSidebar(false)
        } else {
            setshowSidebar(true)
        }
        console.log(showSidebar);
    }

    //pull in users notes 
    React.useEffect(() => {
        getNotes()
    });

    return (
        <>
            <div className="Dashboard">
                <div className="Dashboard__main-content">
                    <div className="Dashboard__main-content__sidebar">
                        <div className="Dashboard__main-content__sidebar__slider">
                            <div className="Dashboard__main-content__sidebar__slider__icon" onClick={() => { toggleSidebar() }}>
                                <i className="pi pi-list"></i>
                            </div>
                        </div>
                        {showSidebar ?
                            <div className="Dashboard__main-content__sidebar__content">
                                <div className="Dashboard__main-content__sidebar__content__addnote" >
                                    <div className="item-add" onClick={newMode}> <i className="pi pi-plus-circle" ></i> <h4>Create a new note: </h4></div>
                                </div>
                                {notes ?
                                    notes.map((note, index) => {
                                        return (
                                            <div className="Dashboard__main-content__sidebar__content__item" key={index}>
                                                <div className="item-title" key={index}>{note.title}</div>
                                                <div className="tooltip">
                                                <i class="pi pi-pencil" onClick={() => { editData("edit", note.title, note.notes, note._id)}}></i>
                                                <i class="pi pi-trash" onClick={() => {
                                                        handleDelete(note._id)
                                                    }}></i> 
                                                </div>
                                            </div>
                                        )
                                    })
                                    : ""
                                }
                            </div> : ""
                        }
                    </div>
                    <div className="Dashboard__main-content__note-container">
                        <div className="Dashboard__main-content__note-container__logo">
                            <div></div>
                            <img src="scribe-main-logo.png" alt="scribe-logo"></img>
                            <div className="dashnav__links">
                                <Link to="" style={{ textDecoration: 'none' }}><span id="logout" onClick={logout}>Logout</span></Link>
                            </div>
                        </div>
                        {newNote ?
                        <div className="Dashboard__main-content__note-container__note">
                            <form>
                                <label htmlFor="title">Title:</label>
                                <input type="text" name="title" id="title" placeholder="Type in your title here..."onChange={handleChange} /><br />
                                <div className="editor-area">
                                    <ReactQuill id="notes" theme="snow" value={value} placeholder="Here is where your notes go..." style={divStyle} onChange={setValue} />
                                </div><br />
                                <button type="submit" onClick={addNote}> Create Note</button>
                            </form>
                        </div>
                        : ""}
                        {edit ?
                        <div className="Dashboard__main-content__note-container__note">
                            <form>
                                <label htmlFor="title">Title:</label>
                                <input type="text" name="title" id="title" value={noteTitle} onChange={() => {
                                    setNoteTitle($('#title').val())
                                    }} /><br />
                                <div className="editor-area">
                                    <ReactQuill id="notes" theme="snow" value={noteBody} style={divStyle} onChange={setNoteBody}/>
                                </div><br />
                                <button type="submit" onClick={(event) => {editNote(event, noteId)}}> Edit Note</button>
                            </form>
                        </div>
                        : ""}
                    </div>
                </div>
            </div>
        </>
    );
};
