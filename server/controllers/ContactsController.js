import user from "../models/UserModel.js";

export const searchContacts = async (req, res, next) => {
    try { 
        const { searchTerm } = req.body;

        if(searchTerm == undefined || searchTerm == null){
            return res.status(400).json({ message: "SearchTerm is required" });
        }

        const sanitizedSearchTerm = searchTerm.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
          );
          
          const regex = new RegExp(sanitizedSearchTerm, "i");
          
          const contacts = await user.find({
            $and: [
              { _id: { $ne: req.userId } },
              {
                $or: [
                  { firstName: regex },
                  { lastName: regex },
                  { email: regex }
                ]
              }
            ]
          });
          
          return res.status(200).json({ contacts });
          
    } catch (error) {
        console.error("Error in searchContacts:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};