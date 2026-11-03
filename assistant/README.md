# Portfolio assistant test branch

This branch does not deploy to the live GitHub Pages site. Keep it unmerged until the owner has reviewed a working preview.

## What works

The accessible dialog provides suggested questions, links to source evidence, email and WhatsApp. It opens on demand and uses textContent for all model output. With no configured backend, it explicitly displays saved facts and says AI is not connected. The rest of the portfolio works independently.

The Worker calls the OpenAI Responses API with a curated factual knowledge base. It does not browse or run tools. Answers cite only server-owned source URLs. It never receives the API key from the browser. Request sizes and model output are bounded; timeouts and provider errors produce a contact fallback. Questions are not stored by this application; API requests set store:false. Provider retention policy still applies.

## Activate a test backend

1. Install OpenAI Developers in ChatGPT for secure project/key setup. Do not paste an API key in chat or commit it.
2. Provision a separate Cloudflare Worker with the Durable Object binding in wrangler.toml. Set secure OPENAI_API_KEY and a supported OPENAI_MODEL. Set ALLOWED_ORIGINS to the exact test site origin. No wildcard origins.
3. Deploy the backend and set dist/assistant-config.js to its verified HTTPS /api/ask URL. That URL is public configuration, never a secret.
4. The Durable Object allows at most 50 requests per UTC day and 5 per IP per minute. Set a provider project budget/alert as an additional control. Origin checking is not authentication; non-browser clients can forge Origin, but the global gate still limits calls. Hashed daily IP counters expire during maintenance; no raw IP or questions are persisted.
5. Test real answers, timeout/error behaviour, mobile layout and keyboard focus in the private preview. Then ask the owner to review before merging.
6. Only after approval add https://lefamalatji.co.za to ALLOWED_ORIGINS and merge. The main-only workflow will deploy. Rollback by reverting the merge; the backend can also be disabled without affecting the portfolio.

## Checks

Run `node --test tests/assistant.test.mjs` and `node --check dist/assistant.js` from the repository root. Tests mock the AI provider; they do not claim model answer quality or deployed integration coverage. A live API test remains required.

The existing scripts/generate_cv.py predates the latest uploaded CV; do not regenerate the production PDF from it during assistant development.
