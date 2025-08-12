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