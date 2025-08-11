// import React, { useState } from 'react';
// import './App.css';
// import {
//     priorityOptions,
//     AssignToOptions,
//     componentOptions,
//     milestoneOptions,
//     severityOptions,
//     statusOptions,
//     versionOptions,
//     patchOptions,
//     categoryOptions,
// } from './options.jsx';


// function LabeledSelect({ label, name, options, defaultValue }) {
//     const selectedValue = defaultValue || options?.[0]?.value || '';
//     return (
//         <label>
//             <div>{label}:</div>
//             <select name={name} defaultValue={selectedValue}>
//                 {options.map((opt) => (
//                     <option key={opt.value} value={opt.value}>
//                         {opt.label}
//                     </option>
//                 ))}
//             </select>
//         </label>
//     );
// }
// export default function App() {
//     const [formSubmitted, setFormSubmitted] = useState(false);

//     const [formData, setFormData] = useState(null);

//     const [selectedProject, setSelectedProject] = useState('selectProject');
//     const [activeScreen, setActiveScreen] = useState(null); // Track which screen is active

//     const handleProjectChange = (e) => {
//         setSelectedProject(e.target.value);
//     };

//     const handleMenuClick = (screen) => {
//         setActiveScreen(screen);
//     };

//     const [description, setDescription] = useState('');

//     return (
//         <div>

//             {/*<nav className="mainnav">*/}
//             {/*    <ul className="head">*/}
//             {/*        <ul className="navbar-links">*/}
//             {/*            <li><a href="#home">Orchestra</a></li>*/}
//             {/*            <li><a href="#features">User</a></li>*/}
//             {/*            <li><a href="#pricing">Help</a></li>*/}
                       
//             {/*        </ul>*/}
//             {/*    </ul>*/}
//             {/*</nav>*/}

//             <nav className="navbar">
//                 <ul className="menu">
//                     <li className="menu-item" onClick={() => handleMenuClick('resource')} title="Add Resource" />
//                     <li className="menu-item" onClick={() => handleMenuClick('ticketReport')} title="Add Ticket Report" />
//                     <li className="menu-item" onClick={() => handleMenuClick('newTicket')} title="Add New Ticket" />
//                 </ul>
//             </nav>

//             <main className="main-content">
          
//                 {activeScreen === 'newTicket' && (
//                     <div>
//                     <div className="form-container">
//                         <form onSubmit={(e) => {
//                             e.preventDefault();

//                             const data = {
//                                 project: selectedProject,
//                                 shortSummary: e.target.shortsummary.value,
//                                 fullDescription: description,
//                                 priority: e.target.Priority?.value,
//                                 assignTo: e.target['Assign To']?.value,
//                                 dueOn: e.target?.due?.value,
//                                 releasenotes: e.target.releasenotes?.value,
//                                 hours: e.target.hours?.value,
//                                 status: e.target.Status?.value,
//                                 milestone: e.target.Milestone?.value,
//                                 severity: e.target.Severity?.value,
//                                 component: e.target.Component?.value,
//                                 version: e.target.Version?.value,
//                                 needPatch: e.target.NeedPatch?.value,
//                                 category: e.target.Category?.value,
//                                 // add more fields if needed
//                             };

//                             setFormData(data);

//                         }}>
//                             {/* your full form content here, unchanged */}
//                             <div className="tickethead">
//                                 <label>
//                                     <span>New Ticket in:</span>
//                                     <select name="Projects" value={selectedProject} onChange={handleProjectChange}>
//                                         <option value="selectProject">SelectProject</option>
//                                         <option value="Orchestrade">Orchestrade</option>
//                                     </select>
//                                 </label>
//                             </div>

//                             <div className="body">
//                                 <div className="columns first">


//                                     {/* Extra Fields for Orchestrade */}

//                                     {selectedProject === 'Orchestrade' && (

//                                         <label>
//                                             <div>Association to current ticket : </div>
//                                             <select name="Associations">
//                                                 <option value="none">none</option>
//                                                 <option value="Parent">Parent</option>
//                                             </select>
//                                         </label>

//                                         //</div>
//                                         //</div>
//                                     )}


//                                     <div>
//                                         <label>
//                                             <div>Short Summary : </div>
//                                             <input type="text" name="shortsummary" />
//                                         </label>
//                                         <br />
//                                         <label>
//                                             <div  >
                                                
//                                                 <div>Full Description:</div>
//                                                 <div className="description-container">
//                                                     <textarea
//                                                         name="fulldescription"
//                                                         value={description}
//                                                         onChange={(e) => setDescription(e.target.value)}
                                                        
//                                                     />
                                            

//                                                     <div className="preview-panel">

//                                                         <div className="preview-box">
//                                                             {description || 'Preview'}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                         </label>

//                                     </div>


//                                     {selectedProject === 'Orchestrade' && (
//                                         <div className="rows">
//                                             <div className="row">
//                                                 <LabeledSelect label="Priority" name="Priority" options={priorityOptions} defaultValue={priorityOptions[2]?.value} />
//                                             </div>

//                                             <div className="row">
//                                                 <LabeledSelect label="AssignTo" name="AssignTo" options={AssignToOptions} />
//                                             </div>

//                                             <div className="row">
//                                                 <label>
//                                                     <div>Due On</div>
//                                                     <input
//                                                         type="date"
//                                                     />
//                                                 </label>
//                                             </div>
//                                         </div>

//                                     )}


//                                     <div >
//                                         <label>
//                                             <div> Attachments:</div>
//                                             <input
//                                                 type="file"
//                                                 name="attachment"
//                                                 onChange={(e) => console.log(e.target.files[0])} // Handle the file
//                                             />
//                                         </label>
//                                     </div>



//                                 </div>
//                                 <div className="columns second">
//                                     {selectedProject === 'Orchestrade' && (

//                                         <div>
//                                             <LabeledSelect label="Status" name="Status" options={statusOptions} />

//                                             <LabeledSelect label="Milestone" name="Milestone" options={milestoneOptions} />

//                                             <LabeledSelect label="Severity" name="Severity" options={severityOptions} />

//                                             <LabeledSelect label="Component" name="Component" options={componentOptions} />

//                                             <LabeledSelect label="Version" name="Version" options={versionOptions} />

//                                             <LabeledSelect label="NeedPatch" name="NeedPatch" options={patchOptions} />

//                                             <label>
//                                                 <div>Release Notes:</div>
//                                                 <input type="text" name="releasenotes" />
//                                             </label>

//                                             <LabeledSelect label="Category" name="Categoryh" options={categoryOptions} />

//                                             <label>
//                                                 <div>Hours</div>
//                                                 <input type="text" name="hours" />
//                                             </label>
//                                         </div>

//                                     )}
//                                 </div>
//                             </div>
//                             <div className="buttons">
//                                 <button type="submit" className="submit-btn">Create Ticket</button>
//                                 <button type="button" className="cancel-btn">Cancel</button>
//                             </div>
//                         </form>
//                         </div>


//                         {/*{*/}
//                         {/*    formData && (*/}
//                         {/*        <div className="submitted-table">*/}
//                         {/*            <h3>Submitted Ticket Info</h3>*/}
//                         {/*            <table>*/}
//                         {/*                <tbody>*/}
//                         {/*                    {Object.entries(formData).map(([key, value]) => (*/}
//                         {/*                        <tr key={key}>*/}
//                         {/*                            <td><strong>{key}</strong></td>*/}
//                         {/*                            <td>{value}</td>*/}
//                         {/*                        </tr>*/}
//                         {/*                    ))}*/}
//                         {/*                </tbody>*/}
//                         {/*            </table>*/}
//                         {/*        </div>*/}
//                         {/*    )*/}
//                         {/*}*/}


//                         {formData && (
//                             <div className="submitted-table">
//                                 {/* Short Summary as Heading */}
//                                 <h2>{formData.shortSummary}</h2>

//                                 {/* First row: Priority, Severity, Due Date */}
//                                 <table>
//                                     {/*<thead>*/}
//                                     {/*    <tr>*/}
//                                     {/*        <th>Priority</th>*/}
//                                     {/*        <th>Severity</th>*/}
//                                     {/*        <th>Due Date</th>*/}
//                                     {/*    </tr>*/}
//                                     {/*</thead>*/}
//                                     <tbody>
//                                         <tr>
//                                             <td>{formData.priority}</td>
//                                             <td>{formData.severity}</td>
//                                             <td>{formData.dueOn || 'N/A'}</td>
//                                         </tr>
//                                     </tbody>
//                                 </table>

//                                 <table style={{ marginTop: '1rem' }}>
//                                     <tbody>
//                                         <tr>
//                                             <td><strong>Milestone</strong></td>
//                                             <td>{formData.milestone}</td>
//                                         </tr>
//                                         <tr>
//                                             <td><strong>Component</strong></td>
//                                             <td>{formData.component}</td>
//                                         </tr>
//                                         <tr>
//                                             <td><strong>Version</strong></td>
//                                             <td>{formData.version}</td>
//                                         </tr>
//                                         <tr>
//                                             <td><strong>Need Patch</strong></td>
//                                             <td>{formData.needPatch}</td>
//                                         </tr>
//                                         <tr>
//                                             <td><strong>Release Notes</strong></td>
//                                             <td>{formData.releasenotes}</td>
//                                         </tr>
//                                         <tr>
//                                             <td><strong>Category</strong></td>
//                                             <td>{formData.category}</td>
//                                         </tr>
//                                     </tbody>
//                                 </table>


//                                 {/* Full Description */}
//                                 <div style={{ marginTop: '1.5rem' }}>
//                                     <h4>Full Description</h4>
//                                     <div style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f4f4f4', padding: '1rem', border: '1px solid #ccc' }}>
//                                         {formData.fullDescription}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}


//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// }


import React, { useState } from 'react';
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

function LabeledSelect({ label, name, options, defaultValue }) {
    const selectedValue = defaultValue || options?.[0]?.value || '';
    return (
        <label>
            <div>{label}:</div>
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
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const data = {
            project: selectedProject,
            shortSummary: e.target.shortsummary.value,
            fullDescription: description,
            priority: e.target.Priority?.value,
            assignTo: e.target.AssignTo?.value,
            dueOn: e.target.dueOn?.value,
            releasenotes: e.target.releasenotes?.value,
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
    };

    const handleEditChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setEditingField(null);
    };

    return (
        <div>
            <nav className="navbar">
                <ul className="menu">
                    <li className="menu-item" onClick={() => handleMenuClick('resource')} title="Add Resource" />
                    <li className="menu-item" onClick={() => handleMenuClick('ticketReport')} title="Add Ticket Report" />
                    <li className="menu-item" onClick={() => handleMenuClick('newTicket')} title="Add New Ticket" />
                </ul>
            </nav>

            <main className="main-content">
                {activeScreen === 'newTicket' && (
                    <div className="form-container">
                        <form onSubmit={handleFormSubmit}>
                            <div className="tickethead">
                                <label>
                                    <span>New Ticket in:</span>
                                    <select name="Projects" value={selectedProject} onChange={handleProjectChange}>
                                        <option value="selectProject">SelectProject</option>
                                        <option value="Orchestrade">Orchestrade</option>
                                    </select>
                                </label>
                            </div>

                            <div className="body">
                                <div className="columns first">
                                    {selectedProject === 'Orchestrade' && (
                                        <label>
                                            <div>Association to current ticket : </div>
                                            <select name="Associations">
                                                <option value="none">none</option>
                                                <option value="Parent">Parent</option>
                                            </select>
                                        </label>
                                    )}

                                    <label>
                                        <div>Short Summary : </div>
                                        <input type="text" name="shortsummary" />
                                    </label>
                                    <br />
                                    <label>
                                        <div>Full Description:</div>
                                        <div className="description-container">
                                            <textarea
                                                name="fulldescription"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                            <div className="preview-panel">
                                                <div className="preview-box">
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
                                        <div> Attachments:</div>
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
                    <div className="submitted-table">
                        <h2>
                            {editingField === "shortSummary" ? (
                                <input
                                    type="text"
                                    value={formData.shortSummary}
                                    onChange={(e) => handleEditChange("shortSummary", e.target.value)}
                                    autoFocus
                                />
                            ) : (
                                <span onClick={() => setEditingField("shortSummary")}>{formData.shortSummary}</span>
                            )}
                        </h2>

                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        {editingField === "priority" ? (
                                            <select
                                                value={formData.priority}
                                                onChange={(e) => handleEditChange("priority", e.target.value)}
                                                autoFocus
                                            >
                                                {priorityOptions.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <span onClick={() => setEditingField("priority")}>
                                                {priorityOptions.find(opt => opt.value === formData.priority)?.label}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {editingField === "severity" ? (
                                            <select
                                                value={formData.severity}
                                                onChange={(e) => handleEditChange("severity", e.target.value)}
                                                autoFocus
                                            >
                                                {severityOptions.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <span onClick={() => setEditingField("severity")}>
                                                {severityOptions.find(opt => opt.value === formData.severity)?.label}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {editingField === "dueOn" ? (
                                            <input
                                                type="date"
                                                value={formData.dueOn || ""}
                                                onChange={(e) => handleEditChange("dueOn", e.target.value)}
                                                autoFocus
                                            />
                                        ) : (
                                            <span onClick={() => setEditingField("dueOn")}>{formData.dueOn || 'N/A'}</span>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="attachment-table">
                            <tbody>
                                <tr>
                                    <td><strong>Attachment</strong></td>
                                    <td>
                                        {editingField === "attachment" ? (
                                            <input
                                                type="file"
                                                onChange={(e) => handleEditChange("attachment", e.target.files[0])}
                                                autoFocus
                                            />
                                        ) : (
                                            <span onClick={() => setEditingField("attachment")}>
                                                {formData.attachment ? formData.attachment.name : "No file"}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="full-description-container">
                            <h4>Full Description</h4>
                            {editingField === "fullDescription" ? (
                                <textarea
                                    value={formData.fullDescription}
                                    onChange={(e) => handleEditChange("fullDescription", e.target.value)}
                                    autoFocus
                                    className="full-description-textarea"
                                />
                            ) : (
                                <div
                                    className="full-description-display"
                                    onClick={() => setEditingField("fullDescription")}
                                >
                                    {formData.fullDescription}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

