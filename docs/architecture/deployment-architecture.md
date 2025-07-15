# Deployment Architecture and CI/CD

This section describes the infrastructure, deployment strategy, and CI/CD pipeline for the platform.

### Hosting Environment

*   **Platform:** Vercel
*   **Rationale:** Vercel is the creator of Next.js and provides a seamlessly integrated, zero-configuration hosting environment. Its serverless architecture, global CDN, and automatic CI/CD are perfectly suited for this project's requirements for speed, scalability, and ease of use.

### CI/CD Pipeline

The CI/CD process is fully managed by Vercel's Git integration.

1.  **Trigger:** A `git push` or `git merge` to a connected branch in the GitHub repository.
2.  **Build:** Vercel automatically pulls the latest code, installs dependencies (`npm install`), and runs the Next.js build command (`next build`).
3.  **Deploy:**
    *   **Preview Deployments:** Pushes to any branch other than `main` result in a unique "Preview Deployment." This allows for reviewing and testing changes in a production-like environment before merging.
    *   **Production Deployment:** Merging a branch into `main` automatically triggers a deployment to the production environment.
4.  **Post-Deployment:** Vercel handles DNS, SSL certificate provisioning, and cache invalidation automatically.

### Environment Management

*   **Development:** Local machine running `next dev`. Environment variables are managed in a `.env.local` file (which is not committed to Git).
*   **Preview:** Vercel's preview environments. Environment variables are configured securely in the Vercel project settings.
*   **Production:** The live Vercel deployment. Production environment variables are also managed in the Vercel project settings.

**Key Environment Variables:**

*   `NEXT_PUBLIC_SUPABASE_URL`: The public URL for the Supabase project.
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The public anonymous key for Supabase.
*   `SUPABASE_SERVICE_ROLE_KEY`: The secret service role key for admin-level backend operations (used only in server-side API routes). 