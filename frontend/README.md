# Full Flow Summary
User uploads image → backend saves it to temp_images table → returns id → frontend calls setImageId(id).

User fills form fields + editor content.

User clicks submit.

onSubmit merges:

Form data (data)

Rich text content (content)

Uploaded image reference (imageId)

Sends all to backend in one POST request.

Backend uses imageId to fetch the actual image from temp_images and link it to the new projects record.

User sees toast message and gets redirected.

#  File Upload Flow
[ User Selects File in Browser ]
              │
              ▼
 [ handleFile(e) Function Triggered ]
              │
              ▼
 Create FormData Object → Append File ("image", file)
              │
              ▼
   Disable Upload Button (setIsDisable(true))
              │
              ▼
 Send HTTP POST Request
   URL: apiUrl + 'temp-images'
   Headers: Accept + Authorization Token
   Body: formData (multipart/form-data)
              │
              ▼
 [ Server Receives Request ]
              │
              ▼
  1. Laravel Controller Validates File
       - Check "image" field exists
       - Check file type & size
  2. Move File to Temporary Storage (e.g., storage/temp/)
  3. Store File Info in Database (id, path, name)
  4. Return JSON Response:
        {
          "status": true,
          "data": { "id": 123, "path": "storage/temp/photo.jpg" }
        }
              │
              ▼
 [ Browser Receives Response ]
              │
              ├── If status == false → Show Error Toast
              │
              └── If status == true → Save Image ID in State
                   (setImageId(result.data.id))
              │
              ▼
   Enable Upload Button (setIsDisable(false))
              │
              ▼
   File ID later used when saving the full form
   (Backend links the file with the final record)


