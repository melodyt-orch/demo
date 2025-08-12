import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {
    priorityOptions,
    AssignToOptions,
    componentOptions,
    milestoneOptions,
    severityOptions,
    statusOptions,
    versionOptions,
    patchOptions,
    categoryOptions,
} from './options.jsx';
import CommentSection from './commentsection.jsx';


//function to generate dropdown menu from array of objects 
const LabeledSelect = ({ label, name, options, defaultValue }) => {
    //initially selected value is default value to display, if nothing provided then use first value, if nothing, then keep empty 
    const selectedValue = defaultValue || options?.[0]?.value || '';
    return (
        <label>
            <div>{label}</div>
            <select name={name} defaultValue={selectedValue}>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

//function to allow for inline editing of select 
const EditableSelect = ({ fieldName, options, value, editingField, onChange, setEditingField }) => {
    //if field if currently being edited 
    return editingField === fieldName ? (
        //renders dropdown menu
        <select
            value={value}
            //When something else is selected, sends value back to parent 
            onChange={(e) => onChange(fieldName, e.target.value)}
            autoFocus
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    ) : (
        // If this field is NOT being edited, show the label as plain text
        //on cilck, editingField is set to fieldName, rerender 
        <span onClick={() => setEditingField(fieldName)}>
            {options.find((opt) => opt.value === value)?.label || "N/A"}
        </span>
    );
};

//function to allow for inline editing of text values 
const EditableText = ({ value, onSave, placeholder }) => {
    //bool to keep track of editing state
    const [editing, setEditing] = useState(false);
    //intermediate value to that users can continuously make changes
    const [draft, setDraft] = useState(value);
    //reference to input element 
    const inputRef = useRef(null);

    //autofocus and selects all text 
    //runs when editing bool changes
     useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [editing]);

    //update draft value every time there are changes to value 
    //runs when value changes 
    useEffect(() => {
        setDraft(value);  
    }, [value]);

    //calls onSave (in parent component) to save value if draft is different than original, then exit editing state 
    const handleSave = () => {
        if (draft !== value) {
            onSave(draft);
        }
        setEditing(false);
    };

    //sets draft value back to original, then exits editing state 
    const handleCancel = () => {
        setDraft(value);
        setEditing(false);
    };

    //keyboard event handler
    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            handleCancel();
        }
    };

    //if in editing state
    if (editing) {
        return (
            <input
                ref={inputRef}   
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}      //update draft on input change
                onBlur={handleSave}                             //saves changes when input loses focus (click away)
                onKeyDown={onKeyDown}   
                placeholder={placeholder}
            />
        );
    }

    // If not editing, render a span displaying the current value (or placeholder if empty)
    // Clicking the span switches to editing mode
    return <span onClick={() => setEditing(true)} >{value || placeholder}</span>;
}

export default function App() {

    //declared variables and setter functions 
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState(null);
    const [selectedProject, setSelectedProject] = useState('selectProject');
    const [activeScreen, setActiveScreen] = useState(null);
    const [description, setDescription] = useState('');
    const [editingField, setEditingField] = useState(null);

    //function to handle form changes for specific project 
    const handleProjectChange = (e) => {
        setSelectedProject(e.target.value);
    };

    //function to handle UI for specific menu button 
    const handleMenuClick = (screen) => {
        setActiveScreen(screen);
    };

    //function to handle cancel button on ticket screen 
    const handleCancel = () => {
        setSelectedProject('selectProject');
        setDescription('');
        setFormData(null);
        setActiveScreen(null);
        setFormSubmitted(false);
        setEditingField(null);
    };

    /// Handles form submission: gathers all form field values into an object and stores it in state
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const data = {
            project: selectedProject,
            shortSummary: e.target.shortsummary.value || "null",
            fullDescription: description,
            priority: e.target.Priority?.value,
            assignTo: e.target.AssignTo?.value,
            dueOn: e.target.dueOn?.value,
            releasenotes: e.target.releasenotes?.value || "null",
            hours: e.target.hours?.value,
            status: e.target.Status?.value,
            milestone: e.target.Milestone?.value,
            severity: e.target.Severity?.value,
            component: e.target.Component?.value,
            version: e.target.Version?.value,
            needPatch: e.target.NeedPatch?.value,
            category: e.target.Category?.value,
            attachment: e.target.attachment?.files[0] || null,
        };
        setFormData(data);
        setFormSubmitted(true);
        setActiveScreen(null);
        setEditingField(null);
     
    };

    //handles changes made to form after it is submitted, called from onSave 
    //Uses previous state, spreads it into a new object, then dynamically updates the specific field with new value 
    const handleEditChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setEditingField(null);
    };

    const [ticketId, setTicketId] = useState(null);

    useEffect(() => {
        // Generate a random 5-digit ID only once
        const randomId = Math.floor(10000 + Math.random() * 90000);
        setTicketId(randomId);
    }, []);



    return (
        <div>

            <nav className="navbar">
                <ul className="menu">
                    <li className="menu-item" onClick={() => handleMenuClick('resource')}>
                        <button type="button">Add Resource</button>
                    </li>
                    <li className="menu-item" onClick={() => handleMenuClick('ticketReport')}>
                        <button type="button">Add Ticket Report</button>
                    </li>
                    <li className="menu-item" onClick={() => handleMenuClick('newTicket')}>
                        <button type="button">Add New Ticket</button>
                    </li>
                </ul>
            </nav>


            <main className="main-content">
                {activeScreen === 'newTicket' && (
                    <div className="form-container">
                        <form onSubmit={handleFormSubmit}>
                            <div className="tickethead">
                                <label>
                                    <span>New Ticket in</span>
                                    <select name="Projects" value={selectedProject} onChange={handleProjectChange}>
                                        <option value="selectProject">Select Project</option>
                                        <option value="Orchestrade">Orchestrade</option>
                                    </select>
                                </label>
                            </div>

                            <div className="body">
                                <div className="columns first">
                                    {selectedProject === 'Orchestrade' && (
                                        <label>
                                            <div>Association to current ticket</div>
                                            <select name="Associations">
                                                <option value="none">none</option>
                                                <option value="Parent">Parent</option>
                                            </select>
                                        </label>
                                    )}

                                    <label>
                                        <div>Short Summary </div>
                                        <input type="text" name="shortsummary" />
                                    </label>
                                    <br />
                                    <label>
                                        <div>Full Description:</div>
                                        <div className="description-container">
                                            <textarea
                                                name="fullDescription"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                            <div className="preview-panel">
                                                <div className={`preview-box ${!description ? 'empty' : ''}`}>
                                                    {description || 'Preview'}
                                                </div>
                                            </div>
                                        </div>
                                    </label>

                                    {selectedProject === 'Orchestrade' && (
                                        <div className="rows">
                                            <div className="row">
                                                <LabeledSelect label="Priority" name="Priority" options={priorityOptions} defaultValue={priorityOptions[2]?.value} />
                                            </div>
                                            <div className="row">
                                                <LabeledSelect label="AssignTo" name="AssignTo" options={AssignToOptions} />
                                            </div>
                                            <div className="row">
                                                <label>
                                                    <div>Due On</div>
                                                    <input type="date" name="dueOn" />
                                                </label>
                                            </div>
                                        </div>
                                    )}

                                    <label>
                                        <div> Attachments</div>
                                        <input
                                            type="file"
                                            name="attachment"
                                        />
                                    </label>
                                </div>

                                <div className="columns second">
                                    {selectedProject === 'Orchestrade' && (
                                        <div>
                                            <LabeledSelect label="Status" name="Status" options={statusOptions} />
                                            <LabeledSelect label="Milestone" name="Milestone" options={milestoneOptions} />
                                            <LabeledSelect label="Severity" name="Severity" options={severityOptions} />
                                            <LabeledSelect label="Component" name="Component" options={componentOptions} />
                                            <LabeledSelect label="Version" name="Version" options={versionOptions} />
                                            <LabeledSelect label="NeedPatch" name="NeedPatch" options={patchOptions} />
                                            <label>
                                                <div>Release Notes:</div>
                                                <input type="text" name="releasenotes" />
                                            </label>
                                            <LabeledSelect label="Category" name="Category" options={categoryOptions} />
                                            <label>
                                                <div>Hours</div>
                                                <input type="text" name="hours" />
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="buttons">
                                <button type="submit" className="submit-btn">Create Ticket</button>
                                <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}

                {formSubmitted && formData && (
                    <div className="submitted-comment-container">
                        {/* Left side: submitted form data */}
                        <div className="submitted-table" >

                        <div className= "form-row" id="headrow">
                            <h2>
                                    <span className="ticketid"> #{ticketId} </span> {" "} 
                                <EditableText
                                    value={formData.shortSummary}
                                    onSave={(val) => handleEditChange("shortSummary", val)}
                              
                                />
                            </h2>

                            <div className="field" >
                                <EditableSelect
                                    fieldName="status"
                                    options={statusOptions}
                                    value={formData.status}
                                    editingField={editingField}
                                    onChange={handleEditChange}
                                    setEditingField={setEditingField}
                                />
                                </div>
                            </div>

                            <div className="form-row" id="toprow" >
                                <div className="field-group" >
                                    <div className="field">
                                        <EditableSelect
                                            fieldName="priority"
                                            options={priorityOptions}
                                            value={formData.priority}
                                            editingField={editingField}
                                            onChange={handleEditChange}
                                            setEditingField={setEditingField}
                                        />
                                    </div>
                                    <div className="field">
                                        <EditableSelect
                                            fieldName="severity"
                                            options={severityOptions}
                                            value={formData.severity}
                                            editingField={editingField}
                                            onChange={handleEditChange}
                                            setEditingField={setEditingField}
                                        />
                                    </div>
                                    <div className="field">
                                        {editingField === "dueOn" ? (
                                            <input
                                                type="date"
                                                value={formData.dueOn || ""}
                                                onChange={(e) => handleEditChange("dueOn", e.target.value)}
                                                autoFocus
                                            />
                                        ) : (
                                            <span onClick={() => setEditingField("dueOn")}>
                                                {formData.dueOn || "No Due Date"}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="assign-to">
                                    <EditableSelect
                                        fieldName="assignTo"
                                        options={AssignToOptions}
                                        value={formData.assignTo}
                                        editingField={editingField}
                                        onChange={handleEditChange}
                                        setEditingField={setEditingField}
                                    />
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="form-row">
                                    <div className="row-title">Milestone</div>
                                    <div className="row-value">
                                        <EditableSelect
                                            fieldName="milestone"
                                            options={milestoneOptions}
                                            value={formData.milestone}
                                            editingField={editingField}
                                            onChange={handleEditChange}
                                            setEditingField={setEditingField}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="row-title">Component</div>
                                    <div className="row-value">
                                        <EditableSelect
                                            fieldName="component"
                                            options={componentOptions}
                                            value={formData.component}
                                            editingField={editingField}
                                            onChange={handleEditChange}
                                            setEditingField={setEditingField}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="row-title">Version</div>
                                    <div className="row-value">
                                        <EditableSelect
                                            fieldName="version"
                                            options={versionOptions}
                                            value={formData.version}
                                            editingField={editingField}
                                            onChange={handleEditChange}
                                            setEditingField={setEditingField}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="row-title">Need Patch</div>
                                    <div className="row-value">
                                        <EditableSelect
                                            fieldName="needPatch"
                                            options={patchOptions}
                                            value={formData.needPatch}
                                            editingField={editingField}
                                            onChange={handleEditChange}
                                            setEditingField={setEditingField}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="row-title">Release Notes</div>
                                    <div className="row-value">

                                        <EditableText
                                            value={formData.releasenotes}
                                            onSave={(val) => handleEditChange("releasenotes", val)}
                                           
                                        />
                                    </div>
                                </div>
                           

                            <div className="form-row">
                                <div className="row-title">Category</div>
                                <div className="row-value">
                                    <EditableSelect
                                        fieldName="category"
                                        options={categoryOptions}
                                        value={formData.category}
                                        editingField={editingField}
                                        onChange={handleEditChange}
                                        setEditingField={setEditingField}
                                    />
                                </div>
                                </div>
                            </div>

                            <div className="full-description-container" >
                              
                                <EditableText
                                    value={formData.fullDescription}
                                    placeholder = "Edit Description"
                                    onSave={(val) => handleEditChange("fullDescription", val)}
                                    
                                    
                                />
                            </div>

                            <div className="form-row attachment-row">
                                <div className="row-value">
                                    {editingField === "attachment" ? (
                                        <input
                                            type="file"
                                            onChange={(e) => handleEditChange("attachment", e.target.files[0])}
                                            autoFocus
                                        />
                                    ) : (
                                        <span onClick={() => setEditingField("attachment")}>
                                            {formData.attachment ? formData.attachment.name : "Attach files"}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/*<div className="form-row2">*/}
                            {/*    <h4>Associated Tickets</h4>*/}
                            {/*    <EditableText*/}
                            {/*        value={formData.fullDescription}*/}
                            {/*        placeholder="Edit Description"*/}
                            {/*        onSave={(val) => handleEditChange("fullDescription", val)}*/}


                            {/*    />*/}
                            {/*</div>*/}


                        </div>

                     

                        <CommentSection />
                    </div>
                )}
            </main>
        </div>
    );
}


