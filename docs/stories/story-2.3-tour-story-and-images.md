# Story 2.3 Add "Guide's Story" and Images to Tour

- **Epic:** [Epic 2: Tour Guide Onboarding & Tour Creation MVP](https://www.notion.so/Epic-2-Tour-Guide-Onboarding-Tour-Creation-MVP-4db9520f3b464b5f8541334c6792f4a4)
- **Status:** To Do
- **Points:** 8

---

As an authenticated Tour Guide, I want to enhance my tour listing by adding a compelling "Guide's Story" using a rich-text editor and uploading multiple images, so that I can attract more tourists with a visually rich and personal presentation.

### Acceptance Criteria

- [ ] In the tour editing interface, a rich-text editor (e.g., Tiptap, TinyMCE) is available for the "Guide's Story" field.
- [ ] The rich-text content is sanitized and stored securely in the `story_html` column of the `tours` table.
- [ ] An image upload interface allows the guide to select and upload multiple image files.
- [ ] Uploaded images are stored in Supabase Storage in a bucket with appropriate access policies.
- [ ] The URLs of the uploaded images are stored in the `images` JSONB column of the `tours` table.
- [ ] Guides can remove previously uploaded images. 