import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  try {
    await dbConnect();
  } catch (error) {
    return response.status(500).json({ message: "Database connection error", error: error.message });
  }

  const { id } = request.query;

  if (!id) {
    return response.status(400).json({ message: "ID is required" });
  }


    if (request.method === "GET") {
      try {
        const place = await Place.findById(id);
        if (!place) {
          return response.status(404).json({ status: "Not found" });
        }
        return response.status(200).json(place);
      } catch (error) {
        return response.status(500).json({ message: "Error fetching place", error: error.message });
      }
    }
    
    if (request.method === "PUT") {
      const placeData = request.body;
      try {
        await Place.findByIdAndUpdate(id, placeData);
        return response.status(200).json({ status: "Place updated!" });
      } catch (error) {
        return response.status(500).json({ message: "Error updating place", error: error.message });
      }
    }
    
    if (request.method === "DELETE") {
      try {
        await Place.findByIdAndDelete(id);
        return response.status(200).json({ message: "Place deleted!" });
      } catch (error) {
        return response.status(500).json({ message: "Error deleting place", error: error.message });
      }
    }
    
    return response.status(405).json({ message: "Method not allowed" });
 
}
