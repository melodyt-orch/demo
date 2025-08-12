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


function LabeledSelect({ label, name, options, defaultValue }) {
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

const EditableSelect = ({ fieldName, options, value, editingField, onChange, setEditingField }) => {
    return editingField === fieldName ? (
        <select
            value={value}
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
        <span onClick={() => setEditingField(fieldName)}>
            {options.find((opt) => opt.value === value)?.label || "N/A"}
        </span>
    );
};

function EditableText({ value, onSave, placeholder }) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(value);
    const inputRef = useRef(null);

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [editing]);

    useEffect(() => {
        setDraft(value);  // Update draft if parent value changes externally
    }, [value]);

    const handleSave = () => {
        if (draft !== value) {
            onSave(draft);
        }
        setEditing(false);
    };

    const handleCancel = () => {
        setDraft(value);
        setEditing(false);
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            handleCancel();
        }
    };

    if (editing) {
        return (
            <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={handleSave}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
            />
        );
    }

    return <span onClick={() => setEditing(true)} >{value || placeholder}</span>;
}

export default function App() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState(null);
    const [selectedProject, setSelectedProject] = useState('selectProject');
    const [activeScreen, setActiveScreen] = useState(null);
    const [description, setDescription] = useState('');
    const [editingField, setEditingField] = useState(null);

    const handleProjectChange = (e) => {
        setSelectedProject(e.target.value);
    };

    const handleMenuClick = (screen) => {
        setActiveScreen(screen);
    };

    const handleCancel = () => {
        setSelectedProject('selectProject');
        setDescription('');
        setFormData(null);
        setActiveScreen(null);
        setFormSubmitted(false);
        setEditingField(null);
    };

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


