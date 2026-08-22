import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { constructMetadata } from "@/lib/seo";

const slug = "guides/serverless-api";
const page = getDocPage(slug)!;
export const metadata = constructMetadata({
  title: page.title,
  description: page.description,
  path: `/docs/${slug}`,
});

export default function ServerlessAPIGuidePage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <p>
          This guide walks through building a production-ready serverless REST API with object
          storage and background message queue processing.
        </p>

        <h2 id="what-you-build">What You&apos;ll Build</h2>
        <ul>
          <li>An HTTP POST endpoint that accepts order data</li>
          <li>S3 storage for persisting order receipts</li>
          <li>SQS queue for asynchronous order processing</li>
          <li>A health check GET endpoint</li>
        </ul>

        <h2 id="prerequisites">Prerequisites</h2>
        <ul>
          <li>NovaServe CLI installed (<a href="/docs/installation">Installation Guide</a>)</li>
          <li>AWS credentials configured</li>
          <li>Node.js 18+</li>
        </ul>

        <h2 id="implementation">Complete Implementation</h2>
        <CodeBlock
          filename="App.ts"
          language="typescript"
          showLineNumbers
          code={`import { defineApp, api, storage, queue } from "novaserve";

export const app = defineApp({
  name: "order-management-service",
  region: "us-east-1",
});

// 1. Storage bucket for order receipts
export const orderStorage = storage("order-receipts-bucket", {
  public: false,
});

// 2. Message queue for async order processing
export const orderQueue = queue("order-processing-queue");

// 3. Health check endpoint
export const healthApi = api.get("/health", async () => {
  return {
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  };
});

// 4. Create order endpoint
export const createOrderApi = api.post("/api/v1/orders", async (req) => {
  const body = await req.json();

  if (!body.customerEmail || !body.items?.length) {
    return new Response(
      JSON.stringify({ error: "Missing customerEmail or items" }),
      { status: 400 }
    );
  }

  const orderId = \`ord-\${Date.now()}\`;
  const orderPayload = {
    orderId,
    customerEmail: body.customerEmail,
    items: body.items,
    createdAt: new Date().toISOString(),
  };

  // Store receipt in object storage
  await orderStorage.put(
    \`receipts/\${orderId}.json\`,
    JSON.stringify(orderPayload)
  );

  // Dispatch to processing queue
  await orderQueue.push({
    event: "ORDER_CREATED",
    orderId,
    customerEmail: body.customerEmail,
  });

  return { status: 201, orderId };
});`}
        />

        <h2 id="local-testing">Local Development &amp; Testing</h2>
        <CodeBlock code="nova dev" language="bash" filename="Terminal" />
        <p>Test the health check:</p>
        <CodeBlock code="curl http://localhost:3000/health" language="bash" filename="Terminal" />
        <p>Submit a test order:</p>
        <CodeBlock
          code={`curl -X POST http://localhost:3000/api/v1/orders \\
  -H "Content-Type: application/json" \\
  -d '{"customerEmail": "user@example.com", "items": [{"id": "item-1", "price": 49.99}]}'`}
          language="bash"
          filename="Terminal"
        />

        <h2 id="deploy">Deploy to AWS</h2>
        <CodeBlock code="nova deploy --target aws" language="bash" filename="Terminal" />
        <p>
          NovaServe automatically compiles your AST, synthesizes IAM permissions for{" "}
          <code>s3:PutObject</code> and <code>sqs:SendMessage</code>, and provisions API
          Gateway v2 + Lambda endpoints.
        </p>

        <h2 id="next-steps">Next Steps</h2>
        <ul>
          <li><a href="/docs/guides/configuration">Configure environments</a></li>
          <li><a href="/docs/cli/drift">Set up drift detection</a></li>
          <li><a href="/docs/reference/api">Explore the full API reference</a></li>
        </ul>
      </DocPageLayout>
      <DocToc items={[
        { id: "what-you-build", label: "What You'll Build" },
        { id: "prerequisites", label: "Prerequisites" },
        { id: "implementation", label: "Implementation" },
        { id: "local-testing", label: "Local Testing" },
        { id: "deploy", label: "Deploy to AWS" },
        { id: "next-steps", label: "Next Steps" },
      ]} />
    </>
  );
}
