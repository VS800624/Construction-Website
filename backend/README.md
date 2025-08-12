# Flow Of the Image

[User Uploads Image] 
       ↓
[Temp Upload API] → Save in /uploads/temp + Insert in temp_images (id=12)
       ↓
[Return imageId=12 to Frontend]
       ↓
[User Submits Form with imageId=12]
       ↓
[Save Project API] → TempImage::find(12)
       ↓
Move + Resize Image → Save in final folder → Link to project


Frontend Upload → Backend Save Temp Record → Return {id, name}
   ↓
Frontend setImageId(id) in state
   ↓
Frontend Submit Full Form (with imageId)
   ↓
Backend Retrieve TempImage using $request->imageId
   ↓
Move image to final location & save in main table
