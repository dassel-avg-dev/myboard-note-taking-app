import Note from "../model/Notes.js"
export async function getAllNotes(req, res) {
    try {
        const note = await Note.find().sort({createdAt:-1}); // -1 will show the newest note first
        res.status(200).json(note) 
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({ message: "Internal server error"})
    }    
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({message: "Note not found!"});
        res.json(note);
    } catch(error) {
        console.error("Error in getAllNotes controller");
        res.status.json({message: "Internal server error"});
    }
}
export async function createNote(req, res) {
    try {
        const {title, content} = req.body;
        const newNote = new Note({title: title, content: content});
        await newNote.save();
        res.status(201).json({message: "Note created successfully"});

    } catch(error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function updateNote(req, res) {
    try {
      const {title, content} = req.body
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id, 
        {title, content}, 
        {
            new: true,
        }
    ); 

      if (!updatedNote) return res.status(404).json({message: "Note not found"})

      res.status(200).json({message: "Internal server error"});
    } catch (error) {
        console.error("Error in updateNote controller")
        res.status(500).json({message: "Internal server error"});
    }
}
export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) return res.status(404).json({message: "Note not found"});
        res.json({message: "Note deleted succesfully"});
    } catch (error) {
        console.error("Error in delteNote controller");
        res.status(500).json({message: "Internal server error"});
    }
}